import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import crypto from 'crypto';
import { query } from './db.js';
import { attachWS, broadcast } from './ws.js';
import { sendWhatsApp, getWAStatus, connectWhatsApp, disconnectWhatsApp } from './utils/whatsapp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PHONE = process.env.ADMIN_PHONE || '';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Migracion idempotente: agrega notas a reservaciones si no existe
// todavia. No hay herramienta de migraciones en este proyecto — esto
// corre una vez al boot y no hace nada si la columna ya esta.
query('ALTER TABLE ia_reservaciones ADD COLUMN IF NOT EXISTS notas TEXT')
  .then(() => console.log('✓ Migración ia_reservaciones.notas lista'))
  .catch(err => console.error('Migración notas falló:', err.message));

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
// Modelos gratis de OpenRouter, en orden de preferencia. El free tier se satura
// seguido (429 upstream) — si uno falla por rate-limit probamos el siguiente.
const OR_MODEL_CHAIN = [
  'openai/gpt-oss-120b:free',
  'openai/gpt-oss-20b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

async function chatComplete(messages, opts = {}) {
  let lastErr;
  for (const model of OR_MODEL_CHAIN) {
    try {
      return await openai.chat.completions.create({ model, messages, ...opts });
    } catch (err) {
      lastErr = err;
      const status = err?.status ?? err?.response?.status;
      // 429 = rate-limit del free tier saturado; 404 = OpenRouter dejó de
      // ofrecer ese modelo gratis (les pasa seguido a los ":free"). Ambos
      // casos ameritan probar el siguiente modelo de la cadena en vez de
      // fallar la request entera.
      if (status !== 429 && status !== 404) throw err;
      console.warn(`OpenRouter ${status} en ${model}, probando siguiente modelo...`);
    }
  }
  throw lastErr;
}

// ── DB HELPERS ────────────────────────────────────────
async function loadKnowledge() {
  const [conocRes, cfgRes] = await Promise.all([
    query('SELECT * FROM ia_conocimiento ORDER BY id'),
    query('SELECT key, value FROM ia_config'),
  ]);
  const cfg = {};
  for (const row of cfgRes.rows) cfg[row.key] = row.value;
  return {
    conocimiento:  conocRes.rows,
    contexto_base: cfg.contexto_base || '',
    nombre_ia:     cfg.nombre_ia    || 'Inti',
    descripcion:   cfg.descripcion  || '',
    widget:        cfg.widget       || {},
  };
}

async function loadReservaciones() {
  const res = await query('SELECT * FROM ia_reservaciones ORDER BY creado DESC');
  return res.rows;
}

async function saveReservacion(r) {
  await query(
    `INSERT INTO ia_reservaciones (id,nombre,contacto,fecha_llegada,dias_estancia,personas,hospedaje,estado,idioma,origen,creado,notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
    [r.id, r.nombre, r.contacto, r.fecha_llegada, r.dias_estancia, r.personas, r.hospedaje, r.estado, r.idioma, r.origen, r.creado, r.notas || null]
  );
}

async function loadPaginas() {
  const res = await query('SELECT * FROM ia_paginas ORDER BY id');
  return res.rows.map(r => ({ ...r, secciones: r.secciones || [] }));
}

async function loadContenido(slug) {
  const res = await query('SELECT data FROM ia_contenido WHERE slug=$1', [slug]);
  return res.rows[0]?.data || null;
}

async function saveContenido(slug, data) {
  await query(
    `INSERT INTO ia_contenido (slug, data) VALUES ($1,$2)
     ON CONFLICT (slug) DO UPDATE SET data=$2`,
    [slug, JSON.stringify(data)]
  );
}

async function loadSiteconfig() {
  const res = await query('SELECT navbar, footer FROM ia_siteconfig WHERE id=1');
  return res.rows[0] || { navbar: {}, footer: {} };
}

async function saveSiteconfig(data) {
  await query(
    `INSERT INTO ia_siteconfig (id, navbar, footer) VALUES (1,$1,$2)
     ON CONFLICT (id) DO UPDATE SET navbar=$1, footer=$2`,
    [JSON.stringify(data.navbar||{}), JSON.stringify(data.footer||{})]
  );
}

// ── LANGUAGE DETECTION ───────────────────────────────
const EN_MARKERS = [
  [5,'hello'],[5,'hi '],[5,'thank you'],[5,'thanks'],[5,'good morning'],[5,'good afternoon'],
  [3,' i want'],[3,' i need'],[3,' i would'],[3," i'd like"],[3,'how much'],[3,'how many'],
  [2,' the '],[2,' and '],[2,' book '],[2,' want '],[2,' my '],[2,' your '],[2,' have '],[2,' stay ']
];
const FR_MARKERS = [
  [5,'bonjour'],[5,'merci'],[5,'bonsoir'],[5,'je voudrais'],[5,'je veux'],[5,'je suis'],
  [5,'nous sommes'],[5,"s'il vous"],[5,'combien'],
  [2,' je '],[2,' nous '],[2,' vous '],[2,' une '],[2,'voudrais'],[2,'réserver'],[2,'séjour'],[2,'hébergement']
];

function detectLanguage(text = '') {
  const t = ' ' + text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + ' ';
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const en = EN_MARKERS.reduce((s,[w,k]) => t.includes(norm(k)) ? s+w : s, 0);
  const fr = FR_MARKERS.reduce((s,[w,k]) => t.includes(norm(k)) ? s+w : s, 0);
  if (fr > en && fr > 0) return 'fr';
  if (en > fr && en > 0) return 'en';
  return 'es';
}

function buildConfirmMsg(reserva, lang='es') {
  const { nombre, fecha_llegada, dias_estancia, personas, hospedaje } = reserva;
  const lines = {
    es: [`✅ *Capachica Turismo*`,``,`¡Hola ${nombre}! Tu reserva fue recibida con éxito.`,``,`📅 Llegada: ${fecha_llegada}`,`🌙 Días de estancia: ${dias_estancia}`,`👥 Personas: ${personas}`,`🏠 Hospedaje: ${hospedaje}`,``,`Pronto nos pondremos en contacto contigo. ¡Gracias por elegirnos!`],
    en: [`✅ *Capachica Tourism*`,``,`Hi ${nombre}! Your booking has been received successfully.`,``,`📅 Arrival: ${fecha_llegada}`,`🌙 Days of stay: ${dias_estancia}`,`👥 Guests: ${personas}`,`🏠 Accommodation: ${hospedaje}`,``,`We will contact you soon. Thank you for choosing us!`],
    fr: [`✅ *Tourisme Capachica*`,``,`Bonjour ${nombre} ! Votre réservation a bien été reçue.`,``,`📅 Arrivée: ${fecha_llegada}`,`🌙 Jours de séjour: ${dias_estancia}`,`👥 Personnes: ${personas}`,`🏠 Hébergement: ${hospedaje}`,``,`Nous vous contacterons bientôt. Merci de nous avoir choisis !`],
  };
  return (lines[lang]||lines.es).join('\n');
}

async function notifyAdmin(reserva) {
  if (!ADMIN_PHONE) return;
  const origen = reserva.origen === 'chat' ? 'Chat' : 'Formulario';
  const texto = [`🔔 *Nueva Reserva - Capachica Turismo* (${origen})`,`👤 ${reserva.nombre}`,`📞 ${reserva.contacto}`,`📅 Llegada: ${reserva.fecha_llegada} | 🌙 ${reserva.dias_estancia} día(s)`,`👥 ${reserva.personas} persona(s) | 🏠 ${reserva.hospedaje}`,`🌐 Idioma: ${reserva.idioma||'es'}`,...(reserva.notas ? [`📝 ${reserva.notas}`] : []),`ID: ${reserva.id}`].join('\n');
  sendWhatsApp(ADMIN_PHONE, texto).catch(err => console.error('WA admin error:', err.message));
}

async function confirmCustomer(reserva) {
  if (!reserva.contacto) return;
  const texto = buildConfirmMsg(reserva, reserva.idioma||'es');
  sendWhatsApp(reserva.contacto, texto).catch(err => console.error('WA customer error:', err.message));
}

// ── INTENT & MATCHING ────────────────────────────────
const RESERVA_KEYWORDS = ['reserva','reservar','reservacion','reservación','apartar','separar','hospedaje','hospedarme','quedarme','alojamiento','quiero ir','planear viaje','planificar','contratar','reserve','reservation','booking','book','stay','lodge','accommodation','i want to visit','i want to go','réserver','réservation','séjour','hébergement','je veux visiter','je voudrais réserver'];
const MAPA_KEYWORDS = ['como llego','como llegar','llegar','ruta','camino','direccion','dirección','mapa','ubicacion','ubicación','donde queda','donde esta','donde está','transporte','bus','cómo llegar','how to get','directions','map','where is','how do i get','route','location','comment arriver','itinéraire','carte','où se trouve','comment aller'];

function detectIntent(msg) {
  const m = msg.toLowerCase();
  if (RESERVA_KEYWORDS.some(k => m.includes(k))) return 'reserva';
  if (MAPA_KEYWORDS.some(k => m.includes(k))) return 'mapa';
  return null;
}

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s]/g,'').trim();
}

const STOPWORDS = new Set(['que','como','cuando','donde','cual','quien','cuanto','seria','es','son','hay','tiene','puedo','puedes','quiero','podria','un','una','el','la','los','las','de','del','en','a','al','se','me','te','le','lo','mi','tu','su','por','para','con','sin','sobre','entre','hacia','desde','hasta','mas','pero','sino','aunque','porque','si','no','o','y','esto','eso','este','ese','aqui','alla','tambien','muy']);

function keywords(str) { return str.split(/\s+/).filter(w => w.length>2 && !STOPWORDS.has(w)); }

function findDirectMatch(mensaje, conocimiento) {
  if (!conocimiento.length) return null;
  const freq = {};
  for (const item of conocimiento) {
    const kws = new Set(keywords(normalize(item.pregunta)));
    for (const w of kws) freq[w] = (freq[w]||0) + 1;
  }
  const total = conocimiento.length;
  const query_ = normalize(mensaje);
  const qSet = new Set(keywords(query_));
  for (const item of conocimiento) {
    const itemNorm = normalize(item.pregunta);
    if (itemNorm === query_) return item;
    const specificKws = keywords(itemNorm).filter(w => (freq[w]||0)/total < 0.5);
    if (!specificKws.length) continue;
    const matched = specificKws.filter(w => qSet.has(w)).length;
    const ratio = matched / specificKws.length;
    const threshold = specificKws.length === 1 ? 0.8 : 0.5;
    if (ratio >= threshold) return item;
  }
  return null;
}

const LANG_INSTRUCTION = { es: 'Responde siempre en español.', en: 'Always respond in English.', fr: 'Réponds toujours en français.' };

function buildSystemPrompt(knowledge, pinnedEntry=null, intent=null, lang='es') {
  const facts = knowledge.conocimiento.map((item,i) => `${i+1}. Pregunta: "${item.pregunta}" → Respuesta: "${item.respuesta}"`).join('\n');
  let pinnedBlock = '';
  if (pinnedEntry) pinnedBlock = `\n=== RESPUESTA OFICIAL PARA ESTA PREGUNTA ===\nEl administrador ha definido: "${pinnedEntry.respuesta}"\nDEBES construir tu respuesta basándote en esta definición.\n============================================\n`;
  const langRule = LANG_INSTRUCTION[lang]||LANG_INSTRUCTION.es;
  const contexto = (knowledge.contexto_base||'').replace(/respondes? en español[^.]*\./gi,'').replace(/only respond[^.]*\./gi,'').trim();
  const intentHint = { es: intent==='reserva'?'\n\nEl usuario quiere hacer una reserva. Invítalo amablemente a completar el formulario.':intent==='mapa'?'\n\nEl usuario quiere saber cómo llegar. Explica la ruta y menciona el mapa interactivo.':'', en: intent==='reserva'?'\n\nThe user wants to make a booking. Invite them to complete the form.':intent==='mapa'?'\n\nThe user wants directions. Explain the route and mention the interactive map.':'', fr: intent==='reserva'?'\n\nL\'utilisateur veut réserver. Invitez-le à compléter le formulaire.':intent==='mapa'?'\n\nL\'utilisateur veut savoir comment arriver. Expliquez l\'itinéraire.':'' }[lang]||'';
  return `${contexto}\n${pinnedBlock}\n=== BASE DE CONOCIMIENTO ===\n${facts}\n===========================\n\nRespond naturally and concisely.${intentHint}\n\nLANGUAGE RULE (MANDATORY): ${langRule}`;
}

const LANG_REPLY = {
  es: { complete:'confirmación entusiasta en español con resumen de todos los datos (nombre, celular, fecha llegada, días, personas, hospedaje)', incomplete:'pide amablemente en español los datos faltantes usando lista numerada con emojis. Solo pide los campos que realmente faltan.' },
  en: { complete:'enthusiastic confirmation in English with full summary (name, phone, arrival date, days, guests, accommodation)', incomplete:'politely ask in English for the missing info using a numbered list with emojis. Only ask for fields that are actually missing.' },
  fr: { complete:'confirmation enthousiaste en français avec résumé complet', incomplete:'demande poliment en français les infos manquantes sous forme de liste numérotée avec emojis.' },
};

async function extractReservaFromChat(mensaje, historial, lang='es') {
  const conv = historial.slice(-8).map(m=>`${m.role==='user'?'Usuario':'Inti'}: ${m.content}`).join('\n');
  const hoy = new Date().toISOString().split('T')[0];
  const lr = LANG_REPLY[lang]||LANG_REPLY.es;
  const prompt = `You are a tourism booking data extractor. Today: ${hoy}.\nAnalyze the ENTIRE conversation and extract available data.\n\nPrevious conversation:\n${conv||'(none)'}\nUser now: ${mensaje}\n\nGather from entire conversation:\n- nombre, contacto, fecha_llegada (YYYY-MM-DD), dias_estancia (int), personas (int), hospedaje\n\n"completo": true ONLY if ALL SIX fields have values.\n\nReturn ONLY JSON:\n{"respuesta":"...","datos":{"nombre":"...or null","contacto":"...or null","fecha_llegada":"...or null","dias_estancia":null,"personas":null,"hospedaje":"...or null"},"completo":true or false}\n\n- If completo=true: respuesta = ${lr.complete}\n- If completo=false: respuesta = ${lr.incomplete}`;
  const result = await chatComplete([{role:'user',content:prompt}], { temperature:0.1, max_tokens:900 });
  const raw = result.choices[0].message.content.trim();
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

// ── CHAT ─────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { mensaje, historial=[] } = req.body;
  if (!mensaje?.trim()) return res.status(400).json({ error: 'Mensaje vacío' });
  try {
    const knowledge = await loadKnowledge();
    const intent = detectIntent(mensaje);
    const hasReservaContext = historial.slice(-8).some(m => m.role==='user' && RESERVA_KEYWORDS.some(k => m.content.toLowerCase().includes(k)));
    const chatText = historial.slice(-8).filter(m=>m.role==='user').map(m=>m.content).join(' ') + ' ' + mensaje;
    const lang = detectLanguage(chatText);

    if (intent==='reserva' || hasReservaContext) {
      let extracted = null;
      try { extracted = await extractReservaFromChat(mensaje, historial, lang); } catch(e) { console.error('extractReserva error:', e.message); }
      if (extracted) {
        if (extracted.completo && extracted.datos) {
          const d = extracted.datos;
          const nueva = { id:Date.now(), nombre:d.nombre, contacto:d.contacto, fecha_llegada:d.fecha_llegada, dias_estancia:d.dias_estancia||1, personas:d.personas||1, hospedaje:d.hospedaje||'general', estado:'pendiente', idioma:lang, creado:new Date().toISOString(), origen:'chat' };
          await saveReservacion(nueva);
          notifyAdmin(nueva); confirmCustomer(nueva);
          return res.json({ respuesta:extracted.respuesta, accion:'reserva_confirmada', reserva_id:nueva.id });
        }
        return res.json({ respuesta:extracted.respuesta, accion:'reserva_incompleta' });
      }
    }

    const directMatch = findDirectMatch(mensaje, knowledge.conocimiento);
    const systemPrompt = buildSystemPrompt(knowledge, directMatch, intent, lang);
    const messages = [{ role:'system', content:systemPrompt }, ...historial.slice(-10).map(m=>({ role:m.role==='user'?'user':'assistant', content:m.content })), { role:'user', content:mensaje }];
    const result = await chatComplete(messages, { temperature:directMatch?0.3:0.4, max_tokens:800 });
    const respuesta = result.choices[0].message.content;
    const payload = { respuesta };
    if (intent==='reserva') payload.accion='reserva_form';
    if (intent==='mapa') payload.mapa_url='https://maps.google.com/maps?q=Capachica,Puno,Peru&z=13';
    res.json(payload);
  } catch(err) {
    console.error('Error IA:', err.message);
    res.status(500).json({ error: 'Error al conectar con la IA.' });
  }
});

// ── CHAT STREAM ───────────────────────────────────────
app.post('/api/chat/stream', async (req, res) => {
  const { mensaje, historial=[] } = req.body;
  if (!mensaje?.trim()) return res.status(400).json({ error: 'Mensaje vacío' });
  res.setHeader('Content-Type','text/event-stream'); res.setHeader('Cache-Control','no-cache'); res.setHeader('Connection','keep-alive'); res.setHeader('X-Accel-Buffering','no'); res.flushHeaders();
  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
  try {
    const knowledge = await loadKnowledge();
    const intent = detectIntent(mensaje);
    const hasReservaContext = historial.slice(-8).some(m => m.role==='user' && RESERVA_KEYWORDS.some(k => m.content.toLowerCase().includes(k)));
    const chatText = historial.slice(-8).filter(m=>m.role==='user').map(m=>m.content).join(' ') + ' ' + mensaje;
    const lang = detectLanguage(chatText);

    if (intent==='reserva' || hasReservaContext) {
      let extracted = null;
      try { extracted = await extractReservaFromChat(mensaje, historial, lang); } catch(e) {}
      if (extracted) {
        if (extracted.completo && extracted.datos) {
          const d = extracted.datos;
          const nueva = { id:Date.now(), nombre:d.nombre, contacto:d.contacto, fecha_llegada:d.fecha_llegada, dias_estancia:d.dias_estancia||1, personas:d.personas||1, hospedaje:d.hospedaje||'general', estado:'pendiente', idioma:lang, creado:new Date().toISOString(), origen:'chat' };
          await saveReservacion(nueva);
          notifyAdmin(nueva); confirmCustomer(nueva);
          send({ type:'reserva_confirmada', respuesta:extracted.respuesta, reserva_id:nueva.id });
        } else {
          send({ type:'reserva_incompleta', respuesta:extracted.respuesta });
        }
        res.write('data: [DONE]\n\n'); return res.end();
      }
    }

    const directMatch = findDirectMatch(mensaje, knowledge.conocimiento);
    const systemPrompt = buildSystemPrompt(knowledge, directMatch, intent, lang);
    const messages = [{ role:'system', content:systemPrompt }, ...historial.slice(-10).map(m=>({ role:m.role==='user'?'user':'assistant', content:m.content })), { role:'user', content:mensaje }];
    const meta = {};
    if (intent==='reserva') meta.accion='reserva_form';
    if (intent==='mapa') meta.mapa_url='https://maps.google.com/maps?q=Capachica,Puno,Peru&z=13';
    send({ type:'meta', ...meta });
    const stream = await chatComplete(messages, { temperature:directMatch?0.3:0.4, max_tokens:800, stream:true });
    let fullText='';
    for await (const chunk of stream) { const text=chunk.choices[0]?.delta?.content||''; if(text){ fullText+=text; send({type:'token',text}); } }
    send({ type:'done', fullText }); res.write('data: [DONE]\n\n'); res.end();
  } catch(err) {
    console.error('Error stream:', err.message);
    send({ type:'error', message:'Error al conectar con la IA.' }); res.end();
  }
});

// ── EXPERIENCIA (itinerario real armado con IA) ───────
// El backend principal (Postgres) tiene los datos reales de familias/
// artesania/actividades -- este servicio no tiene esas tablas, asi que
// las trae por su API publica (ya filtra aprobado=true) y le pasa SOLO
// esos ids/precios reales a la IA. Nunca confiamos en que la IA invente
// nombres/precios: el costo final se recalcula acá con los precios
// reales, y cualquier id que la IA devuelva y no exista en los datos
// reales se descarta en vez de mostrarse.
const MAIN_API_URL = process.env.MAIN_API_URL || 'https://capachica-backend-production.up.railway.app/api';

async function fetchJSON(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

app.post('/api/experiencia', async (req, res) => {
  const dias = Number(req.body?.dias);
  const presupuesto = Number(req.body?.presupuesto);
  const personas = Number(req.body?.personas) || 1;
  const intereses = Array.isArray(req.body?.intereses) ? req.body.intereses : [];

  if (!Number.isFinite(dias) || dias < 1 || !Number.isFinite(presupuesto) || presupuesto <= 0) {
    return res.status(400).json({ error: 'Indica días de estancia y presupuesto válidos.' });
  }

  try {
    const [familiasRaw, artesaniaRaw, actividadesRaw] = await Promise.all([
      fetchJSON(`${MAIN_API_URL}/comunidades`),
      fetchJSON(`${MAIN_API_URL}/artesania`),
      fetchJSON(`${MAIN_API_URL}/actividades`),
    ]);
    const familias = Array.isArray(familiasRaw) ? familiasRaw : [];
    const artesania = Array.isArray(artesaniaRaw) ? artesaniaRaw : [];
    const actividades = Array.isArray(actividadesRaw?.actividades)
      ? actividadesRaw.actividades
      : (Array.isArray(actividadesRaw) ? actividadesRaw : []);

    if (!familias.length) {
      return res.status(503).json({ error: 'Todavía no hay familias anfitrionas cargadas para armar una experiencia.' });
    }

    const familiasResumen = familias.map(f => ({
      id: f.id, nombre: f.nombre, comunidad: f.comunidad, precio_por_persona_noche: f.precio ?? null,
      capacidad: f.capacidad ?? null, servicios: f.servicios || [], actividades: f.actividades || [],
    }));
    const actividadesResumen = actividades.map(a => ({
      id: a.id, nombre: a.nombre, precio_por_persona: a.precio ?? null, duracion: a.duracion, categoria: a.categoria,
    }));
    const artesaniaResumen = artesania.map(a => ({
      id: a.id, nombre: a.nombre, precio_unidad: a.precio_soles ?? null, tecnica: a.tecnica || '',
    }));
    const interesesTxt = intereses.length ? intereses.join(', ') : 'sin preferencia particular';

    const prompt = `Sos un planificador experto de turismo vivencial en Capachica, Puno, Perú.
Un viajero quiere una experiencia de ${dias} día(s), para ${personas} persona(s), con presupuesto TOTAL de S/ ${presupuesto}. Intereses: ${interesesTxt}.

SOLO podés usar estas opciones reales -- no inventes nombres, ids ni precios nuevos, usá exactamente los ids que aparecen:

FAMILIAS ANFITRIONAS (hospedaje, precio por persona/noche):
${JSON.stringify(familiasResumen)}

ACTIVIDADES DISPONIBLES (precio por persona):
${JSON.stringify(actividadesResumen)}

ARTESANÍA (recuerdos para comprar, precio por unidad):
${JSON.stringify(artesaniaResumen)}

Elegí UNA familia como hospedaje para toda la estadía (la que mejor se ajuste a presupuesto/capacidad/intereses). Para cada día elegí 0 a 2 actividades reales de la lista (podés repetir actividades entre días, o dejar algún día libre). Sugerí hasta 2 artesanías reales para comprar SOLO si el presupuesto alcanza después de hospedaje + actividades. NUNCA excedas el presupuesto total salvo que sea literalmente imposible con las opciones dadas (avisalo en el resumen si pasa).

Devolvé SOLO este JSON, sin texto antes ni después:
{"resumen":"2-3 frases en español con el plan y por qué","hospedaje_id":"<id de la familia elegida>","dias":[{"numero":1,"actividad_ids":["<id>"],"notas":"breve, en español"}],"artesania_ids":["<id>"]}`;

    const result = await chatComplete([{ role: 'user', content: prompt }], { temperature: 0.4, max_tokens: 1400 });
    const raw = result.choices[0].message.content.trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('La IA no devolvió un plan válido');
    const plan = JSON.parse(match[0]);

    const hospedaje = familias.find(f => String(f.id) === String(plan.hospedaje_id));
    if (!hospedaje) throw new Error('La IA eligió un hospedaje que no existe');

    const actividadesPorId = new Map(actividades.map(a => [String(a.id), a]));
    const artesaniaPorId = new Map(artesania.map(a => [String(a.id), a]));

    const diasResueltos = (Array.isArray(plan.dias) ? plan.dias : []).map(d => ({
      numero: d.numero,
      notas: d.notas || '',
      actividades: (Array.isArray(d.actividad_ids) ? d.actividad_ids : [])
        .map(id => actividadesPorId.get(String(id)))
        .filter(Boolean),
    }));
    const artesaniaResuelta = (Array.isArray(plan.artesania_ids) ? plan.artesania_ids : [])
      .map(id => artesaniaPorId.get(String(id)))
      .filter(Boolean);

    // Costo recalculado acá con precios reales -- no se usa ninguna suma
    // que haya podido devolver la IA.
    const costoHospedaje = (hospedaje.precio || 0) * dias * personas;
    const costoActividades = diasResueltos.reduce(
      (sum, d) => sum + d.actividades.reduce((s2, a) => s2 + (a.precio || 0) * personas, 0), 0
    );
    const costoArtesania = artesaniaResuelta.reduce((sum, a) => sum + (a.precio_soles || 0), 0);
    const costoTotal = costoHospedaje + costoActividades + costoArtesania;

    res.json({
      resumen: plan.resumen || '',
      hospedaje,
      dias: diasResueltos,
      artesania: artesaniaResuelta,
      costo: { hospedaje: costoHospedaje, actividades: costoActividades, artesania: costoArtesania, total: costoTotal },
      presupuesto,
      dentro_de_presupuesto: costoTotal <= presupuesto,
    });
  } catch (err) {
    console.error('Error /api/experiencia:', err.message);
    res.status(500).json({ error: 'No se pudo generar la experiencia. Intenta de nuevo.' });
  }
});

// ── RESERVAR ──────────────────────────────────────────
app.post('/api/reservar', async (req, res) => {
  const { nombre, contacto, fecha_llegada, dias_estancia, personas, hospedaje, idioma, notas } = req.body;
  if (!nombre||!contacto||!fecha_llegada||!dias_estancia||!personas||!hospedaje)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  try {
    const nueva = { id:Date.now(), nombre, contacto, fecha_llegada, dias_estancia:Number(dias_estancia), personas:Number(personas), hospedaje, idioma:idioma||'es', notas:notas||null, estado:'pendiente', creado:new Date().toISOString(), origen:'formulario' };
    await saveReservacion(nueva);
    notifyAdmin(nueva); confirmCustomer(nueva);
    res.json({ mensaje:'¡Reserva recibida! Nos pondremos en contacto pronto.', id:nueva.id });
  } catch(err) { res.status(500).json({ error:'Error al guardar reserva' }); }
});

// ── ADMIN: RESERVACIONES ──────────────────────────────
app.get('/api/admin/reservaciones', async (_req, res) => {
  try { res.json(await loadReservaciones()); } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/reservaciones/:id', async (req, res) => {
  try {
    await query('UPDATE ia_reservaciones SET estado=$1 WHERE id=$2', [req.body.estado, parseInt(req.params.id)]);
    res.json({ mensaje:'Estado actualizado' });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.delete('/api/admin/reservaciones/:id', async (req, res) => {
  try {
    const r = await query('DELETE FROM ia_reservaciones WHERE id=$1', [parseInt(req.params.id)]);
    if (r.rowCount===0) return res.status(404).json({ error:'No encontrada' });
    res.json({ mensaje:'Reservación eliminada' });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});

// ── ADMIN: CONOCIMIENTO ───────────────────────────────
app.get('/api/admin/conocimiento', async (_req, res) => {
  try { res.json(await loadKnowledge()); } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.post('/api/admin/conocimiento', async (req, res) => {
  const { categoria, pregunta, respuesta } = req.body;
  if (!categoria||!pregunta||!respuesta) return res.status(400).json({ error:'Faltan campos' });
  try {
    const r = await query('INSERT INTO ia_conocimiento (categoria,pregunta,respuesta) VALUES ($1,$2,$3) RETURNING id', [categoria, pregunta, respuesta]);
    res.json({ mensaje:'Conocimiento agregado', id:r.rows[0].id });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/conocimiento/:id', async (req, res) => {
  const { categoria, pregunta, respuesta } = req.body;
  if (!categoria||!pregunta||!respuesta) return res.status(400).json({ error:'Faltan campos' });
  try {
    const r = await query('UPDATE ia_conocimiento SET categoria=$1, pregunta=$2, respuesta=$3 WHERE id=$4 RETURNING id', [categoria, pregunta, respuesta, parseInt(req.params.id)]);
    if (r.rowCount===0) return res.status(404).json({ error:'No encontrada' });
    res.json({ mensaje:'Conocimiento actualizado', id:r.rows[0].id });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.delete('/api/admin/conocimiento/:id', async (req, res) => {
  try {
    const r = await query('DELETE FROM ia_conocimiento WHERE id=$1', [parseInt(req.params.id)]);
    if (r.rowCount===0) return res.status(404).json({ error:'No encontrada' });
    res.json({ mensaje:'Entrada eliminada' });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/contexto', async (req, res) => {
  const { contexto_base, nombre_ia, descripcion } = req.body;
  try {
    if (contexto_base!==undefined) await query(`INSERT INTO ia_config(key,value) VALUES('contexto_base',$1) ON CONFLICT(key) DO UPDATE SET value=$1`, [JSON.stringify(contexto_base)]);
    if (nombre_ia!==undefined)     await query(`INSERT INTO ia_config(key,value) VALUES('nombre_ia',$1)     ON CONFLICT(key) DO UPDATE SET value=$1`, [JSON.stringify(nombre_ia)]);
    if (descripcion!==undefined)   await query(`INSERT INTO ia_config(key,value) VALUES('descripcion',$1)   ON CONFLICT(key) DO UPDATE SET value=$1`, [JSON.stringify(descripcion)]);
    res.json({ mensaje:'Contexto actualizado' });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});

// ── WIDGET ────────────────────────────────────────────
const WIDGET_DEFAULTS = { bot_name:'Inti · Asistente IA', bot_subtitle:'Capachica Turismo', welcome_msg:'¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?', quick_prompts:['¿Qué es Capachica?','¿Cómo llegar?','Quiero reservar'], placeholder:'Escribe tu pregunta...' };

// Cache en memoria: el mobile hace polling cada 8s (en produccion,
// potencialmente miles de usuarios) — no queremos pegarle a Postgres
// en cada poll. Solo se relee cuando el admin realmente guarda un cambio.
let widgetCache = null; // { body, etag }

function widgetEtag(body) { return `"${crypto.createHash('sha1').update(body).digest('hex')}"`; }

async function poblarWidgetCache() {
  const r = await query(`SELECT value FROM ia_config WHERE key='widget'`);
  const cfg = { ...WIDGET_DEFAULTS, ...(r.rows[0]?.value||{}) };
  const body = JSON.stringify(cfg);
  widgetCache = { body, etag: widgetEtag(body) };
}

app.get('/api/widget/config', async (req, res) => {
  try {
    if (!widgetCache) await poblarWidgetCache();
    res.set('ETag', widgetCache.etag);
    if (req.headers['if-none-match'] === widgetCache.etag) return res.status(304).end();
    res.type('application/json').send(widgetCache.body);
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/widget', async (req, res) => {
  try {
    const r = await query(`SELECT value FROM ia_config WHERE key='widget'`);
    const current = r.rows[0]?.value || {};
    const { bot_name, bot_subtitle, welcome_msg, quick_prompts, placeholder } = req.body;
    if (bot_name!==undefined)     current.bot_name     = bot_name;
    if (bot_subtitle!==undefined) current.bot_subtitle = bot_subtitle;
    if (welcome_msg!==undefined)  current.welcome_msg  = welcome_msg;
    if (quick_prompts!==undefined) current.quick_prompts = Array.isArray(quick_prompts) ? quick_prompts : String(quick_prompts).split('\n').map(s=>s.trim()).filter(Boolean);
    if (placeholder!==undefined)  current.placeholder  = placeholder;
    await query(`INSERT INTO ia_config(key,value) VALUES('widget',$1) ON CONFLICT(key) DO UPDATE SET value=$1`, [JSON.stringify(current)]);
    widgetCache = null; // fuerza releer en el proximo GET /api/widget/config
    broadcast('widget');
    res.json({ mensaje:'Widget actualizado' });
  } catch(err) { res.status(500).json({ error:'Error' }); }
});

// ── CONTENIDO CMS ─────────────────────────────────────
app.get('/api/contenido/:slug', async (req, res) => {
  try {
    const data = await loadContenido(req.params.slug);
    if (!data) return res.status(404).json({ error:'Sin contenido' });
    res.json(data);
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.get('/api/admin/contenido/:slug', async (req, res) => {
  try { res.json((await loadContenido(req.params.slug)) || { secciones:[] }); } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/contenido/:slug', async (req, res) => {
  try { await saveContenido(req.params.slug, req.body); res.json({ ok:true }); } catch(err) { res.status(500).json({ error:err.message }); }
});

// ── SITECONFIG ────────────────────────────────────────
app.get('/api/siteconfig', async (_req, res) => {
  try { res.json(await loadSiteconfig()); } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.get('/api/admin/siteconfig', async (_req, res) => {
  try { res.json(await loadSiteconfig()); } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.put('/api/admin/siteconfig', async (req, res) => {
  try { await saveSiteconfig(req.body); res.json({ ok:true }); } catch(err) { res.status(500).json({ error:err.message }); }
});

// ── PÁGINAS ───────────────────────────────────────────
app.get('/api/paginas', async (_req, res) => {
  try {
    const r = await query('SELECT * FROM ia_paginas WHERE publicado=true ORDER BY id');
    res.json(r.rows.map(p=>({...p,secciones:p.secciones||[]})));
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.get('/api/paginas/:slug', async (req, res) => {
  try {
    const r = await query('SELECT * FROM ia_paginas WHERE slug=$1 AND publicado=true', [req.params.slug]);
    if (!r.rows.length) return res.status(404).json({ error:'No encontrado' });
    const p=r.rows[0]; res.json({...p,secciones:p.secciones||[]});
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.get('/api/admin/paginas', async (_req, res) => {
  try {
    const r = await query('SELECT * FROM ia_paginas ORDER BY id');
    res.json(r.rows.map(p=>({...p,secciones:p.secciones||[]})));
  } catch(err) { res.status(500).json({ error:'Error' }); }
});
app.post('/api/admin/paginas', async (req, res) => {
  try {
    const { titulo='',slug='',descripcion='',publicado=true,secciones=[] } = req.body;
    const r = await query('INSERT INTO ia_paginas (titulo,slug,descripcion,publicado,secciones) VALUES ($1,$2,$3,$4,$5) RETURNING *', [titulo,slug,descripcion,publicado,JSON.stringify(secciones)]);
    const p=r.rows[0]; res.json({...p,secciones:p.secciones||[]});
  } catch(err) { res.status(500).json({ error:err.message }); }
});
app.put('/api/admin/paginas/:id', async (req, res) => {
  try {
    const { titulo,slug,descripcion,publicado,secciones } = req.body;
    const r = await query('UPDATE ia_paginas SET titulo=$1,slug=$2,descripcion=$3,publicado=$4,secciones=$5 WHERE id=$6 RETURNING *', [titulo,slug,descripcion,publicado,JSON.stringify(secciones||[]),parseInt(req.params.id)]);
    if (!r.rows.length) return res.status(404).json({ error:'No encontrado' });
    const p=r.rows[0]; res.json({...p,secciones:p.secciones||[]});
  } catch(err) { res.status(500).json({ error:err.message }); }
});
app.delete('/api/admin/paginas/:id', async (req, res) => {
  try {
    const r = await query('DELETE FROM ia_paginas WHERE id=$1', [parseInt(req.params.id)]);
    if (r.rowCount===0) return res.status(404).json({ error:'No encontrado' });
    res.json({ ok:true });
  } catch(err) { res.status(500).json({ error:err.message }); }
});

// ── WHATSAPP ──────────────────────────────────────────
app.get('/api/admin/wa/status',  (_req, res) => res.json(getWAStatus()));
app.get('/api/admin/wa/qr', (req, res) => {
  const { status, qr } = getWAStatus();
  res.setHeader('Content-Type','text/html; charset=utf-8');
  if (status==='connected') return res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px"><h2 style="color:#25D366">✅ WhatsApp conectado</h2><button onclick="fetch('/api/admin/wa/disconnect',{method:'POST'}).then(()=>location.reload())" style="padding:10px 20px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer">Desconectar</button></body></html>`);
  if (status==='qr' && qr) return res.send(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="30"></head><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>📱 Escanea con WhatsApp</h2><img src="${qr}" style="width:280px;height:280px;border:4px solid #25D366;border-radius:12px"></body></html>`);
  res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>⏳ Estado: ${status}</h2><script>setTimeout(()=>location.reload(),3000)</script><button onclick="fetch('/api/admin/wa/connect',{method:'POST'}).then(()=>location.reload())" style="padding:10px 20px;background:#25D366;color:#fff;border:none;border-radius:6px;cursor:pointer">Conectar WhatsApp</button></body></html>`);
});
app.post('/api/admin/wa/connect', async (_req, res) => {
  if (getWAStatus().status==='connected') return res.json({ ok:true, message:'Ya conectado' });
  connectWhatsApp().catch(err => console.error('WA connect error:', err.message));
  res.json({ ok:true, message:'Conectando...' });
});
app.post('/api/admin/wa/disconnect', async (_req, res) => { await disconnectWhatsApp(); res.json({ ok:true }); });
app.post('/api/admin/wa/test', async (req, res) => {
  const { phone, message } = req.body;
  const target = phone || ADMIN_PHONE;
  if (!target) return res.status(400).json({ error:'Falta phone' });
  if (getWAStatus().status!=='connected') return res.status(503).json({ error:'WhatsApp no conectado' });
  try { await sendWhatsApp(target, message||'🧪 Test desde Capachica Turismo IA'); res.json({ ok:true }); }
  catch(err) { res.status(500).json({ error:err.message }); }
});

// ── HEALTH ────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status:'ok', modelo:'gpt-oss-120b', wa:getWAStatus().status });
});

const server = app.listen(PORT, () => {
  console.log(`🤖 IA Backend corriendo en http://localhost:${PORT}`);
  connectWhatsApp().catch(err => console.error('WA init error:', err.message));
});
attachWS(server);
console.log('🔌 WebSocket (push real-time) en /ws');
