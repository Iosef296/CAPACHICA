import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import { sendWhatsApp, getWAStatus, connectWhatsApp, disconnectWhatsApp } from './utils/whatsapp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const KNOWLEDGE_PATH     = path.join(__dirname, 'knowledge.json');
const RESERVACIONES_PATH = path.join(__dirname, 'reservaciones.json');
const DESTINOS_PATH      = path.join(__dirname, 'destinos.json');
const PAGINAS_PATH       = path.join(__dirname, 'paginas.json');
const CONTENIDO_PATH     = path.join(__dirname, 'contenido.json');
const ADMIN_PHONE        = process.env.ADMIN_PHONE || '';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
const OR_MODEL = 'openai/gpt-oss-120b:free';

// ── DETECCIÓN DE IDIOMA ───────────────────────────────
// Usar espacios en ambos lados para evitar falsos positivos ("hola" contiene "la")
const EN_MARKERS = [
  [5, 'hello'],[5, 'hi '],[5, 'thank you'],[5, 'thanks'],[5, 'good morning'],[5, 'good afternoon'],
  [3, ' i want'],[3, ' i need'],[3, ' i would'],[3, " i'd like"],[3, 'how much'],[3, 'how many'],
  [2, ' the '],[2, ' and '],[2, ' book '],[2, ' want '],[2, ' my '],[2, ' your '],[2, ' have '],[2, ' stay ']
];
const FR_MARKERS = [
  [5, 'bonjour'],[5, 'merci'],[5, 'bonsoir'],[5, 'je voudrais'],[5, 'je veux'],[5, 'je suis'],
  [5, 'nous sommes'],[5, "s'il vous"],[5, 'combien'],
  [2, ' je '],[2, ' nous '],[2, ' vous '],[2, ' une '],[2, 'voudrais'],[2, 'réserver'],[2, 'séjour'],[2, 'hébergement']
];

function detectLanguage(text = '') {
  const t = ' ' + text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + ' ';
  // Normalizar también los markers al comparar
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const en = EN_MARKERS.reduce((s, [w, k]) => t.includes(norm(k)) ? s + w : s, 0);
  const fr = FR_MARKERS.reduce((s, [w, k]) => t.includes(norm(k)) ? s + w : s, 0);
  if (fr > en && fr > 0) return 'fr';
  if (en > fr && en > 0) return 'en';
  return 'es';
}

// ── MENSAJE DE CONFIRMACIÓN MULTIIDIOMA ───────────────
function buildConfirmMsg(reserva, lang = 'es') {
  const { nombre, fecha_llegada, dias_estancia, personas, hospedaje } = reserva;
  const lines = {
    es: [
      `✅ *Capachica Turismo*`, ``,
      `¡Hola ${nombre}! Tu reserva fue recibida con éxito.`, ``,
      `📅 Llegada: ${fecha_llegada}`,
      `🌙 Días de estancia: ${dias_estancia}`,
      `👥 Personas: ${personas}`,
      `🏠 Hospedaje: ${hospedaje}`, ``,
      `Pronto nos pondremos en contacto contigo. ¡Gracias por elegirnos!`
    ],
    en: [
      `✅ *Capachica Tourism*`, ``,
      `Hi ${nombre}! Your booking has been received successfully.`, ``,
      `📅 Arrival: ${fecha_llegada}`,
      `🌙 Days of stay: ${dias_estancia}`,
      `👥 Guests: ${personas}`,
      `🏠 Accommodation: ${hospedaje}`, ``,
      `We will contact you soon. Thank you for choosing us!`
    ],
    fr: [
      `✅ *Tourisme Capachica*`, ``,
      `Bonjour ${nombre} ! Votre réservation a bien été reçue.`, ``,
      `📅 Arrivée: ${fecha_llegada}`,
      `🌙 Jours de séjour: ${dias_estancia}`,
      `👥 Personnes: ${personas}`,
      `🏠 Hébergement: ${hospedaje}`, ``,
      `Nous vous contacterons bientôt. Merci de nous avoir choisis !`
    ]
  };
  return (lines[lang] || lines.es).join('\n');
}

// ── WHATSAPP ALERTS ───────────────────────────────────
async function notifyAdmin(reserva) {
  if (!ADMIN_PHONE) { console.warn('WA: ADMIN_PHONE no configurado'); return; }
  const origen = reserva.origen === 'chat' ? 'Chat' : 'Formulario';
  const texto = [
    `🔔 *Nueva Reserva - Capachica Turismo* (${origen})`,
    `👤 ${reserva.nombre}`,
    `📞 ${reserva.contacto}`,
    `📅 Llegada: ${reserva.fecha_llegada} | 🌙 ${reserva.dias_estancia} día(s)`,
    `👥 ${reserva.personas} persona(s) | 🏠 ${reserva.hospedaje}`,
    `🌐 Idioma: ${reserva.idioma || 'es'}`,
    `ID: ${reserva.id}`
  ].filter(Boolean).join('\n');
  console.log(`WA: enviando alerta admin a ${ADMIN_PHONE}`);
  sendWhatsApp(ADMIN_PHONE, texto)
    .then(() => console.log('WA admin: enviado OK'))
    .catch(err => console.error('WA admin error:', err.message));
}

async function confirmCustomer(reserva) {
  if (!reserva.contacto) { console.warn('WA: reserva sin contacto, no se envía confirmación'); return; }
  const lang = reserva.idioma || 'es';
  const texto = buildConfirmMsg(reserva, lang);
  console.log(`WA: enviando confirmación (${lang}) a ${reserva.contacto}`);
  sendWhatsApp(reserva.contacto, texto)
    .then(() => console.log('WA customer: enviado OK'))
    .catch(err => console.error('WA customer error:', err.message));
}

function loadKnowledge() {
  return JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, 'utf8'));
}

function loadReservaciones() {
  return JSON.parse(fs.readFileSync(RESERVACIONES_PATH, 'utf8'));
}

const RESERVA_KEYWORDS = [
  // ES
  'reserva','reservar','reservacion','reservación',
  'apartar','separar','hospedaje','hospedarme','quedarme','alojamiento',
  'quiero ir','planear viaje','planificar','contratar',
  // EN
  'reserve','reservation','booking','book','stay','lodge','accommodation','i want to visit','i want to go',
  // FR
  'réserver','réservation','séjour','hébergement','je veux visiter','je voudrais réserver'
];

const MAPA_KEYWORDS = [
  // ES
  'como llego','como llegar','llegar','ruta','camino','direccion','dirección',
  'mapa','ubicacion','ubicación','donde queda','donde esta','donde está',
  'transporte','bus','cómo llegar',
  // EN
  'how to get','directions','map','where is','how do i get','route','location',
  // FR
  'comment arriver','itinéraire','carte','où se trouve','comment aller'
];

function detectIntent(msg) {
  const m = msg.toLowerCase();
  if (RESERVA_KEYWORDS.some(k => m.includes(k))) return 'reserva';
  if (MAPA_KEYWORDS.some(k => m.includes(k)))   return 'mapa';
  return null;
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

const STOPWORDS = new Set([
  'que','como','cuando','donde','cual','quien','cuanto','seria','seria',
  'es','son','hay','tiene','puedo','puedes','quiero','seria','podria',
  'un','una','el','la','los','las','de','del','en','a','al',
  'se','me','te','le','lo','mi','tu','su','por','para',
  'con','sin','sobre','entre','hacia','desde','hasta',
  'mas','pero','sino','aunque','porque','si','no','o','y',
  'esto','eso','este','ese','aqui','alla','tambien','muy'
]);

function keywords(str) {
  return str.split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));
}

function findDirectMatch(mensaje, conocimiento) {
  if (conocimiento.length === 0) return null;

  const freq = {};
  for (const item of conocimiento) {
    const kws = new Set(keywords(normalize(item.pregunta)));
    for (const w of kws) freq[w] = (freq[w] || 0) + 1;
  }
  const total = conocimiento.length;

  const query = normalize(mensaje);
  const qSet = new Set(keywords(query));

  for (const item of conocimiento) {
    const itemNorm = normalize(item.pregunta);
    if (itemNorm === query) return item;

    const specificKws = keywords(itemNorm).filter(w => (freq[w] || 0) / total < 0.5);
    if (specificKws.length === 0) continue;

    const matched = specificKws.filter(w => qSet.has(w)).length;
    const ratio = matched / specificKws.length;
    const threshold = specificKws.length === 1 ? 0.8 : 0.5;
    if (ratio >= threshold) return item;
  }

  return null;
}

const LANG_INSTRUCTION = {
  es: 'Responde siempre en español.',
  en: 'Always respond in English.',
  fr: 'Réponds toujours en français.'
};

function buildSystemPrompt(knowledge, pinnedEntry = null, intent = null, lang = 'es') {
  const facts = knowledge.conocimiento
    .map((item, i) => `${i + 1}. Pregunta: "${item.pregunta}" → Respuesta: "${item.respuesta}"`)
    .join('\n');

  let pinnedBlock = '';
  if (pinnedEntry) {
    pinnedBlock = `
=== RESPUESTA OFICIAL PARA ESTA PREGUNTA ===
El administrador ha definido: "${pinnedEntry.respuesta}"
DEBES construir tu respuesta basándote en esta definición. Úsala como el núcleo de tu respuesta y elabora con contexto natural. No la ignores ni la cambies.
============================================
`;
  }

  const langRule = LANG_INSTRUCTION[lang] || LANG_INSTRUCTION.es;
  const contexto = knowledge.contexto_base
    .replace(/respondes? en español[^.]*\./gi, '')
    .replace(/only respond[^.]*\./gi, '')
    .trim();

  const intentHint = {
    es: intent === 'reserva' ? '\n\nEl usuario quiere hacer una reserva. Invítalo amablemente a completar el formulario que aparecerá en pantalla para registrar su visita.' : intent === 'mapa' ? '\n\nEl usuario quiere saber cómo llegar. Explica la ruta y menciona que puede ver el mapa interactivo que aparecerá debajo.' : '',
    en: intent === 'reserva' ? '\n\nThe user wants to make a booking. Kindly invite them to complete the form that will appear on screen.' : intent === 'mapa' ? '\n\nThe user wants to know how to get there. Explain the route and mention the interactive map below.' : '',
    fr: intent === 'reserva' ? '\n\nL\'utilisateur veut faire une réservation. Invitez-le à compléter le formulaire qui apparaîtra à l\'écran.' : intent === 'mapa' ? '\n\nL\'utilisateur veut savoir comment arriver. Expliquez l\'itinéraire et mentionnez la carte ci-dessous.' : '',
  }[lang] || '';

  return `${contexto}
${pinnedBlock}
=== BASE DE CONOCIMIENTO ===
${facts}
===========================

Respond naturally and concisely. If an official answer is defined above, use it as mandatory base.${intentHint}

LANGUAGE RULE (MANDATORY): ${langRule} Never switch to another language regardless of the knowledge base language.`;
}

// ── EXTRACCIÓN DE RESERVA DESDE CHAT ──────────────────
const LANG_REPLY = {
  es: {
    complete:   'confirmación entusiasta en español con resumen de todos los datos (nombre, celular, fecha llegada, días, personas, hospedaje)',
    incomplete: 'pide amablemente en español los datos faltantes usando lista numerada con emojis, ejemplo:\n"Para completar tu reserva necesito:\n1. 👤 Nombre completo\n2. 📞 Número de celular\n3. 📅 Fecha de llegada\n4. 🌙 Días de estancia\n5. 👥 Número de personas\n6. 🏠 Hospedaje elegido"\nSolo pide los campos que realmente faltan.'
  },
  en: {
    complete:   'enthusiastic confirmation in English with full summary (name, phone, arrival date, days, guests, accommodation)',
    incomplete: 'politely ask in English for the missing info using a numbered list with emojis, example:\n"To complete your booking I need:\n1. 👤 Full name\n2. 📞 Phone number\n3. 📅 Arrival date\n4. 🌙 Days of stay\n5. 👥 Number of guests\n6. 🏠 Chosen accommodation"\nOnly ask for fields that are actually missing.'
  },
  fr: {
    complete:   'confirmation enthousiaste en français avec résumé complet (nom, téléphone, date arrivée, jours, personnes, hébergement)',
    incomplete: 'demande poliment en français les infos manquantes sous forme de liste numérotée avec emojis, exemple:\n"Pour finaliser votre réservation j\'ai besoin de :\n1. 👤 Nom complet\n2. 📞 Numéro de téléphone\n3. 📅 Date d\'arrivée\n4. 🌙 Jours de séjour\n5. 👥 Nombre de personnes\n6. 🏠 Hébergement choisi"\nDemande uniquement les champs vraiment manquants.'
  },
};

async function extractReservaFromChat(mensaje, historial, lang = 'es') {
  const conv = historial.slice(-8).map(m =>
    `${m.role === 'user' ? 'Usuario' : 'Inti'}: ${m.content}`
  ).join('\n');

  const hoy = new Date().toISOString().split('T')[0];
  const lr = LANG_REPLY[lang] || LANG_REPLY.es;

  const prompt = `You are a tourism booking data extractor. Today: ${hoy}.
Analyze the ENTIRE conversation (not just the last message) and extract available data.
The user may write in Spanish, English or French — understand all three.

Previous conversation:
${conv || '(none)'}
User now: ${mensaje}

STEP 1 — Gather from entire conversation:
- nombre: full name mentioned in any message
- contacto: phone number or email mentioned in any message
- fecha_llegada: arrival date. If they say "the 12th", assume next day 12 from today (${hoy}). Always YYYY-MM-DD.
- dias_estancia: number of nights/days of stay (integer)
- personas: number of people/guests (integer)
- hospedaje: name or type of accommodation chosen (lodge, cabin, community house, etc.)

STEP 2:
- "completo": true ONLY if ALL SIX fields have values (not null): nombre, contacto, fecha_llegada, dias_estancia, personas, hospedaje
- If ANY is missing → "completo": false

STEP 3 — Return ONLY this JSON (no extra text, no markdown):
{
  "respuesta": "natural reply",
  "datos": {
    "nombre": "value or null",
    "contacto": "value or null",
    "fecha_llegada": "YYYY-MM-DD or null",
    "dias_estancia": number or null,
    "personas": number or null,
    "hospedaje": "value or null"
  },
  "completo": true or false
}

- If completo=true: respuesta = ${lr.complete}
- If completo=false: respuesta = ${lr.incomplete}`;

  const result = await openai.chat.completions.create({
    model: OR_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
    max_tokens: 600,
  });
  const raw = result.choices[0].message.content.trim();
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) { console.error('extractReserva: no JSON en respuesta:', raw.slice(0, 200)); return null; }
  try {
    return JSON.parse(match[0]);
  } catch (e) {
    console.error('extractReserva: JSON inválido:', match[0].slice(0, 200));
    return null;
  }
}

// ── CHAT ──────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { mensaje, historial = [] } = req.body;

  if (!mensaje || !mensaje.trim()) {
    return res.status(400).json({ error: 'Mensaje vacío' });
  }

  try {
    const knowledge = loadKnowledge();
    const intent = detectIntent(mensaje);

    const hasReservaContext = historial.slice(-8).some(m =>
      m.role === 'user' && RESERVA_KEYWORDS.some(k => m.content.toLowerCase().includes(k))
    );

    const chatText = historial.slice(-8)
      .filter(m => m.role === 'user').map(m => m.content).join(' ') + ' ' + mensaje;
    const lang = detectLanguage(chatText);

    if (intent === 'reserva' || hasReservaContext) {
      let extracted = null;
      try { extracted = await extractReservaFromChat(mensaje, historial, lang); } catch (e) { console.error('extractReserva error:', e.message); }

      if (extracted) {
        if (extracted.completo && extracted.datos) {
          const d = extracted.datos;
          const nueva = {
            id:            Date.now(),
            nombre:        d.nombre,
            contacto:      d.contacto,
            fecha_llegada: d.fecha_llegada,
            dias_estancia: d.dias_estancia || 1,
            personas:      d.personas || 1,
            hospedaje:     d.hospedaje || 'general',
            estado:        'pendiente',
            idioma:        lang,
            creado:        new Date().toISOString(),
            origen:        'chat'
          };
          const reservaciones = loadReservaciones();
          reservaciones.push(nueva);
          fs.writeFileSync(RESERVACIONES_PATH, JSON.stringify(reservaciones, null, 2), 'utf8');
          notifyAdmin(nueva);
          confirmCustomer(nueva);

          return res.json({
            respuesta: extracted.respuesta,
            accion: 'reserva_confirmada',
            reserva_id: nueva.id
          });
        }

        return res.json({
          respuesta: extracted.respuesta,
          accion: 'reserva_incompleta'
        });
      }
    }

    const directMatch = findDirectMatch(mensaje, knowledge.conocimiento);
    const systemPrompt = buildSystemPrompt(knowledge, directMatch, intent, lang);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...historial.slice(-10).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: 'user', content: mensaje }
    ];

    const result = await openai.chat.completions.create({
      model: OR_MODEL,
      messages,
      temperature: directMatch ? 0.3 : 0.4,
      max_tokens: 500,
    });
    const respuesta = result.choices[0].message.content;

    const payload = { respuesta };
    if (intent === 'reserva') payload.accion = 'reserva_form';
    if (intent === 'mapa')    payload.mapa_url = 'https://maps.google.com/maps?q=Capachica,Puno,Peru&z=13';

    res.json(payload);

  } catch (err) {
    console.error('Error IA:', err.message);
    res.status(500).json({ error: 'Error al conectar con la IA. Verifica tu OPENROUTER_API_KEY.' });
  }
});

// ── RESERVACIONES: guardar ─────────────────────────────
app.post('/api/reservar', (req, res) => {
  const { nombre, contacto, fecha_llegada, dias_estancia, personas, hospedaje, idioma } = req.body;
  if (!nombre || !contacto || !fecha_llegada || !dias_estancia || !personas || !hospedaje) {
    return res.status(400).json({ error: 'Faltan campos: nombre, contacto, fecha_llegada, dias_estancia, personas, hospedaje' });
  }
  try {
    const reservaciones = loadReservaciones();
    const nueva = {
      id: Date.now(),
      nombre, contacto, fecha_llegada,
      dias_estancia: Number(dias_estancia),
      personas: Number(personas),
      hospedaje,
      idioma: idioma || 'es',
      estado: 'pendiente',
      creado: new Date().toISOString(),
      origen: 'formulario'
    };
    reservaciones.push(nueva);
    fs.writeFileSync(RESERVACIONES_PATH, JSON.stringify(reservaciones, null, 2), 'utf8');
    notifyAdmin(nueva);
    confirmCustomer(nueva);
    res.json({ mensaje: '¡Reserva recibida! Nos pondremos en contacto pronto.', id: nueva.id });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar reserva' });
  }
});

// ── ADMIN: listar reservaciones ────────────────────────
app.get('/api/admin/reservaciones', (req, res) => {
  try {
    res.json(loadReservaciones());
  } catch (err) {
    res.status(500).json({ error: 'Error al leer reservaciones' });
  }
});

// ── ADMIN: actualizar estado reservación ───────────────
app.put('/api/admin/reservaciones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { estado } = req.body;
  try {
    const reservaciones = loadReservaciones();
    const item = reservaciones.find(r => r.id === id);
    if (!item) return res.status(404).json({ error: 'No encontrada' });
    item.estado = estado;
    fs.writeFileSync(RESERVACIONES_PATH, JSON.stringify(reservaciones, null, 2), 'utf8');
    res.json({ mensaje: 'Estado actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// ── ADMIN: eliminar reservación ────────────────────────
app.delete('/api/admin/reservaciones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let reservaciones = loadReservaciones();
    const antes = reservaciones.length;
    reservaciones = reservaciones.filter(r => r.id !== id);
    if (reservaciones.length === antes) return res.status(404).json({ error: 'No encontrada' });
    fs.writeFileSync(RESERVACIONES_PATH, JSON.stringify(reservaciones, null, 2), 'utf8');
    res.json({ mensaje: 'Reservación eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// ── ADMIN: listar conocimiento ─────────────────────────
app.get('/api/admin/conocimiento', (req, res) => {
  try {
    const knowledge = loadKnowledge();
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer base de conocimiento' });
  }
});

// ── ADMIN: agregar entrada ─────────────────────────────
app.post('/api/admin/conocimiento', (req, res) => {
  const { categoria, pregunta, respuesta } = req.body;
  if (!categoria || !pregunta || !respuesta) {
    return res.status(400).json({ error: 'Faltan campos: categoria, pregunta, respuesta' });
  }
  try {
    const knowledge = loadKnowledge();
    const newId = knowledge.conocimiento.length > 0
      ? Math.max(...knowledge.conocimiento.map(k => k.id)) + 1
      : 1;
    knowledge.conocimiento.push({ id: newId, categoria, pregunta, respuesta });
    fs.writeFileSync(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2), 'utf8');
    res.json({ mensaje: 'Conocimiento agregado', id: newId });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

// ── ADMIN: eliminar entrada ────────────────────────────
app.delete('/api/admin/conocimiento/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const knowledge = loadKnowledge();
    const antes = knowledge.conocimiento.length;
    knowledge.conocimiento = knowledge.conocimiento.filter(k => k.id !== id);
    if (knowledge.conocimiento.length === antes) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }
    fs.writeFileSync(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2), 'utf8');
    res.json({ mensaje: 'Entrada eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// ── ADMIN: actualizar contexto base ───────────────────
app.put('/api/admin/contexto', (req, res) => {
  const { contexto_base, nombre_ia, descripcion } = req.body;
  try {
    const knowledge = loadKnowledge();
    if (contexto_base) knowledge.contexto_base = contexto_base;
    if (nombre_ia) knowledge.nombre_ia = nombre_ia;
    if (descripcion) knowledge.descripcion = descripcion;
    fs.writeFileSync(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2), 'utf8');
    res.json({ mensaje: 'Contexto actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar contexto' });
  }
});

// ── DESTINOS ─────────────────────────────────────────
function loadDestinos() {
  try { return JSON.parse(fs.readFileSync(DESTINOS_PATH, 'utf8')); }
  catch { return []; }
}

app.get('/api/destinos', (req, res) => {
  res.json(loadDestinos());
});

app.post('/api/admin/destinos', (req, res) => {
  try {
    const destinos = loadDestinos();
    const maxId = destinos.reduce((m, d) => Math.max(m, d.id || 0), 0);
    const nuevo = { id: maxId + 1, emoji: '📍', imagen: '', nombre: '', comunidad: '', desc: '', tags: [], color: '#38bdf8', highlight: '', ...req.body };
    destinos.push(nuevo);
    fs.writeFileSync(DESTINOS_PATH, JSON.stringify(destinos, null, 2), 'utf8');
    res.json(nuevo);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/admin/destinos/:id', (req, res) => {
  try {
    const destinos = loadDestinos();
    const idx = destinos.findIndex(d => d.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    destinos[idx] = { ...destinos[idx], ...req.body, id: destinos[idx].id };
    fs.writeFileSync(DESTINOS_PATH, JSON.stringify(destinos, null, 2), 'utf8');
    res.json(destinos[idx]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/destinos/:id', (req, res) => {
  try {
    let destinos = loadDestinos();
    const antes = destinos.length;
    destinos = destinos.filter(d => d.id !== parseInt(req.params.id));
    if (destinos.length === antes) return res.status(404).json({ error: 'No encontrado' });
    fs.writeFileSync(DESTINOS_PATH, JSON.stringify(destinos, null, 2), 'utf8');
    res.json({ mensaje: 'Eliminado' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── WIDGET: config pública ───────────────────────────
app.get('/api/widget/config', (req, res) => {
  try {
    const knowledge = loadKnowledge();
    const defaults = {
      bot_name:     'Inti · Asistente IA',
      bot_subtitle: 'Capachica Turismo',
      welcome_msg:  '¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?',
      quick_prompts: ['¿Qué es Capachica?', '¿Cómo llegar?', 'Quiero reservar'],
      placeholder:  'Escribe tu pregunta...',
    };
    res.json({ ...defaults, ...(knowledge.widget || {}) });
  } catch (err) {
    res.status(500).json({ error: 'Error al cargar config' });
  }
});

// ── ADMIN: guardar config widget ─────────────────────
app.put('/api/admin/widget', (req, res) => {
  try {
    const knowledge = loadKnowledge();
    if (!knowledge.widget) knowledge.widget = {};
    const { bot_name, bot_subtitle, welcome_msg, quick_prompts, placeholder } = req.body;
    if (bot_name     !== undefined) knowledge.widget.bot_name     = bot_name;
    if (bot_subtitle !== undefined) knowledge.widget.bot_subtitle = bot_subtitle;
    if (welcome_msg  !== undefined) knowledge.widget.welcome_msg  = welcome_msg;
    if (quick_prompts !== undefined) {
      knowledge.widget.quick_prompts = Array.isArray(quick_prompts)
        ? quick_prompts
        : String(quick_prompts).split('\n').map(s => s.trim()).filter(Boolean);
    }
    if (placeholder  !== undefined) knowledge.widget.placeholder  = placeholder;
    fs.writeFileSync(KNOWLEDGE_PATH, JSON.stringify(knowledge, null, 2), 'utf8');
    res.json({ mensaje: 'Widget actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar widget' });
  }
});

// ── CONTENIDO: overrides para páginas estáticas ──────
function loadContenido() {
  try {
    if (!fs.existsSync(CONTENIDO_PATH)) { fs.writeFileSync(CONTENIDO_PATH, '{}', 'utf8'); return {}; }
    return JSON.parse(fs.readFileSync(CONTENIDO_PATH, 'utf8'));
  } catch { return {}; }
}

function saveContenido(data) {
  fs.writeFileSync(CONTENIDO_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/contenido/:slug', (req, res) => {
  const c = loadContenido();
  const page = c[req.params.slug];
  if (!page) return res.status(404).json({ error: 'Sin contenido' });
  res.json(page);
});

app.get('/api/admin/contenido/:slug', (req, res) => {
  const c = loadContenido();
  res.json(c[req.params.slug] || { secciones: [] });
});

app.put('/api/admin/contenido/:slug', (req, res) => {
  try {
    const c = loadContenido();
    c[req.params.slug] = req.body;
    saveContenido(c);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── PÁGINAS: CRUD ────────────────────────────────────
function loadPaginas() {
  try {
    if (!fs.existsSync(PAGINAS_PATH)) { fs.writeFileSync(PAGINAS_PATH, '[]', 'utf8'); return []; }
    return JSON.parse(fs.readFileSync(PAGINAS_PATH, 'utf8'));
  } catch { return []; }
}

function savePaginas(data) {
  fs.writeFileSync(PAGINAS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/paginas', (req, res) => {
  res.json(loadPaginas().filter(p => p.publicado));
});

app.get('/api/paginas/:slug', (req, res) => {
  const p = loadPaginas().find(x => x.slug === req.params.slug && x.publicado);
  if (!p) return res.status(404).json({ error: 'No encontrado' });
  res.json(p);
});

app.get('/api/admin/paginas', (req, res) => {
  res.json(loadPaginas());
});

app.post('/api/admin/paginas', (req, res) => {
  try {
    const list = loadPaginas();
    const maxId = list.reduce((m, p) => Math.max(m, p.id || 0), 0);
    const nueva = { id: maxId + 1, publicado: true, secciones: [], ...req.body };
    list.push(nueva);
    savePaginas(list);
    res.json(nueva);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/admin/paginas/:id', (req, res) => {
  try {
    const list = loadPaginas();
    const idx = list.findIndex(p => p.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    list[idx] = { ...list[idx], ...req.body, id: list[idx].id };
    savePaginas(list);
    res.json(list[idx]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/admin/paginas/:id', (req, res) => {
  try {
    let list = loadPaginas();
    const antes = list.length;
    list = list.filter(p => p.id !== parseInt(req.params.id));
    if (list.length === antes) return res.status(404).json({ error: 'No encontrado' });
    savePaginas(list);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── ADMIN: WhatsApp status / connect / disconnect ──────
app.get('/api/admin/wa/status', (req, res) => {
  res.json(getWAStatus());
});

app.get('/api/admin/wa/qr', (req, res) => {
  const { status, qr } = getWAStatus();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (status === 'connected') {
    return res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px">
      <h2 style="color:#25D366">✅ WhatsApp conectado</h2>
      <p>Ya puedes cerrar esta página.</p>
      <button onclick="fetch('/api/admin/wa/disconnect',{method:'POST'}).then(()=>location.reload())" style="padding:10px 20px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer">Desconectar</button>
    </body></html>`);
  }
  if (status === 'qr' && qr) {
    return res.send(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="30"></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px">
      <h2>📱 Escanea con WhatsApp</h2>
      <p>Abre WhatsApp → Dispositivos vinculados → Vincular dispositivo</p>
      <img src="${qr}" style="width:280px;height:280px;border:4px solid #25D366;border-radius:12px">
      <p style="color:#888;font-size:13px">Esta página se recarga automáticamente cada 30s</p>
    </body></html>`);
  }
  res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px">
    <h2>⏳ Estado: ${status}</h2>
    <p>Iniciando conexión...</p>
    <script>setTimeout(()=>location.reload(),3000)</script>
    <button onclick="fetch('/api/admin/wa/connect',{method:'POST'}).then(()=>location.reload())" style="padding:10px 20px;background:#25D366;color:#fff;border:none;border-radius:6px;cursor:pointer">Conectar WhatsApp</button>
  </body></html>`);
});

app.post('/api/admin/wa/connect', async (req, res) => {
  const { status } = getWAStatus();
  if (status === 'connected') return res.json({ ok: true, message: 'Ya conectado' });
  connectWhatsApp().catch(err => console.error('WA connect error:', err.message));
  res.json({ ok: true, message: 'Conectando...' });
});

app.post('/api/admin/wa/disconnect', async (req, res) => {
  await disconnectWhatsApp();
  res.json({ ok: true });
});

app.post('/api/admin/wa/test', async (req, res) => {
  const { phone, message } = req.body;
  const target = phone || ADMIN_PHONE;
  if (!target) return res.status(400).json({ error: 'Falta phone o ADMIN_PHONE no configurado' });
  const { status } = getWAStatus();
  if (status !== 'connected') return res.status(503).json({ error: `WhatsApp no conectado (estado: ${status})` });
  try {
    await sendWhatsApp(target, message || '🧪 Test desde Capachica Turismo IA');
    res.json({ ok: true, phone: target });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CHAT STREAM ───────────────────────────────────────
app.post('/api/chat/stream', async (req, res) => {
  const { mensaje, historial = [] } = req.body;
  if (!mensaje?.trim()) return res.status(400).json({ error: 'Mensaje vacío' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  try {
    const knowledge = loadKnowledge();
    const intent    = detectIntent(mensaje);
    const hasReservaContext = historial.slice(-8).some(m =>
      m.role === 'user' && RESERVA_KEYWORDS.some(k => m.content.toLowerCase().includes(k))
    );
    const chatText = historial.slice(-8).filter(m => m.role === 'user').map(m => m.content).join(' ') + ' ' + mensaje;
    const lang = detectLanguage(chatText);

    if (intent === 'reserva' || hasReservaContext) {
      let extracted = null;
      try { extracted = await extractReservaFromChat(mensaje, historial, lang); } catch (e) { console.error('extractReserva error:', e.message); }

      if (extracted) {
        if (extracted.completo && extracted.datos) {
          const d = extracted.datos;
          const nueva = {
            id: Date.now(), nombre: d.nombre, contacto: d.contacto,
            fecha_llegada: d.fecha_llegada, dias_estancia: d.dias_estancia || 1,
            personas: d.personas || 1, hospedaje: d.hospedaje || 'general',
            estado: 'pendiente', idioma: lang, creado: new Date().toISOString(), origen: 'chat'
          };
          const reservaciones = loadReservaciones();
          reservaciones.push(nueva);
          fs.writeFileSync(RESERVACIONES_PATH, JSON.stringify(reservaciones, null, 2), 'utf8');
          notifyAdmin(nueva);
          confirmCustomer(nueva);
          send({ type: 'reserva_confirmada', respuesta: extracted.respuesta, reserva_id: nueva.id });
        } else {
          send({ type: 'reserva_incompleta', respuesta: extracted.respuesta });
        }
        res.write('data: [DONE]\n\n');
        return res.end();
      }
    }

    const directMatch = findDirectMatch(mensaje, knowledge.conocimiento);
    const systemPrompt = buildSystemPrompt(knowledge, directMatch, intent, lang);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...historial.slice(-10).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: 'user', content: mensaje }
    ];

    const meta = {};
    if (intent === 'reserva') meta.accion = 'reserva_form';
    if (intent === 'mapa')    meta.mapa_url = 'https://maps.google.com/maps?q=Capachica,Puno,Peru&z=13';
    send({ type: 'meta', ...meta });

    const stream = await openai.chat.completions.create({
      model: OR_MODEL,
      messages,
      temperature: directMatch ? 0.3 : 0.4,
      max_tokens: 500,
      stream: true,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        fullText += text;
        send({ type: 'token', text });
      }
    }

    send({ type: 'done', fullText });
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (err) {
    console.error('Error stream:', err.message);
    send({ type: 'error', message: 'Error al conectar con la IA.' });
    res.end();
  }
});

// ── HEALTH ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', modelo: 'gpt-oss-120b', wa: getWAStatus().status });
});

app.listen(PORT, () => {
  console.log(`🤖 IA Backend corriendo en http://localhost:${PORT}`);
  connectWhatsApp().catch(err => console.error('WA init error:', err.message));
});
