// Cliente Inti: intenta backend, si falla usa knowledge base local rica.
import Constants from 'expo-constants';
import { toWsUrl } from './ws';

const extra = (Constants.expoConfig?.extra as any) ?? {};
const IA_BASE = (extra.iaBaseUrl ?? '').replace(/\/api\/?$/, '');
export const IA_WS = toWsUrl(IA_BASE);

// Backend real de Inti IA (Railway). Si falla, cae a knowledge base local.
export const FORCE_OFFLINE = false;

export type IntiMsg = {
  role: 'user' | 'assistant';
  content: string;
  accion?: string;
  mapa_url?: string;
};

export type WidgetCfg = {
  bot_name: string;
  bot_subtitle: string;
  welcome_msg: string;
  quick_prompts: string[];
  placeholder: string;
};

export const DEFAULT_CFG: WidgetCfg = {
  bot_name: 'Inti · Asistente IA',
  bot_subtitle: 'Capachica Turismo',
  welcome_msg: '¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?',
  quick_prompts: ['¿Qué es Capachica?', '¿Cómo llegar?', 'Quiero reservar', 'Mejor época'],
  placeholder: 'Escribe tu pregunta...',
};

// Cache por ETag: si nada cambió el backend responde 304 y devolvemos
// la MISMA referencia — así el polling de killa.tsx/killa-chat.tsx no
// re-renderiza la pantalla salvo que el admin haya cambiado algo real.
let widgetCache: { etag: string; value: WidgetCfg } | null = null;

export async function fetchWidgetConfig(): Promise<WidgetCfg> {
  if (FORCE_OFFLINE) return DEFAULT_CFG;
  try {
    const headers: Record<string, string> = {};
    if (widgetCache?.etag) headers['If-None-Match'] = widgetCache.etag;
    const res = await fetch(`${IA_BASE}/api/widget/config`, { headers });
    if (res.status === 304 && widgetCache) return widgetCache.value;
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    if (data?.error) return widgetCache?.value ?? DEFAULT_CFG;
    const value = { ...DEFAULT_CFG, ...data };
    const etag = res.headers.get('ETag');
    if (etag) widgetCache = { etag, value };
    return value;
  } catch {
    return widgetCache?.value ?? DEFAULT_CFG;
  }
}

export async function sendChat(message: string, history: IntiMsg[]): Promise<{ content: string; accion?: string; mapa_url?: string }> {
  if (!FORCE_OFFLINE) {
    try {
      const res = await fetch(`${IA_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: message,
          historial: history.map(h => ({ role: h.role, content: h.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!data?.error) {
        const content = data.respuesta ?? data.reply ?? data.message ?? data.response;
        if (content) return { content, accion: data.accion, mapa_url: data.mapa_url };
      }
    } catch {}
  }
  return localResponse(message);
}

// Knowledge base local — responde como un guía real de Capachica
function localResponse(q: string): { content: string; accion?: string; mapa_url?: string } {
  const m = q.toLowerCase().trim();
  const has = (...words: string[]) => words.some(w => m.includes(w));

  if (has('qué es capachica', 'que es capachica', 'capachica')) {
    return { content: 'Capachica es una península del Lago Titicaca en Puno, Perú. Hogar de 4 comunidades quechua-aimaras (Llachón, Ccotos, Siale, Chifrón) famosas por sus tejidos, navegación tradicional en totora y turismo vivencial.' };
  }
  if (has('cómo llegar', 'como llegar', 'transporte', 'llego')) {
    return {
      content: 'Desde Puno (60 km · 1h30 en auto):\n• Combi desde Terminal Zonal de Puno → S/ 8\n• Taxi privado → S/ 80\n• Tour organizado → S/ 50 (incluye guía)\n\nDesde Juliaca (84 km · 2h): tomas combi a Puno y conectas.',
      mapa_url: 'https://maps.google.com/?q=Capachica,Puno,Peru',
    };
  }
  if (has('reservar', 'reserva', 'hospedaje', 'donde dormir', 'dónde dormir')) {
    return { content: 'Tenemos 3 opciones recomendadas:\n• Posada de Doña Paula (Llachón) – S/ 120/noche\n• Eco-Refugio Ccotos – S/ 185/noche\n• Hospedaje Samary (Chifrón) – S/ 95/noche\n\nTodos incluyen desayuno andino. Reserva desde la pantalla "Reservas".' };
  }
  if (has('mejor época', 'mejor epoca', 'cuándo', 'cuando ir', 'clima')) {
    return { content: 'Mejor época: mayo a octubre (seco, cielos despejados).\n\nClima por estación:\n• Seca (may-oct): 18°C día, 3°C noche. Soleado, ideal para fotos.\n• Lluviosa (nov-abr): 16°C, lluvias por la tarde, vegetación verde.\n\nÉpoca de fiestas: febrero (Candelaria), junio (Inti Raymi), agosto (Pachamama Raymi).' };
  }
  if (has('comida', 'gastronom', 'plato', 'comer')) {
    return { content: 'No te pierdas:\n• Trucha fresca a la plancha (Ccotos)\n• Pachamanca Capachiqueña (cocción ritual bajo tierra)\n• Caldo de Carachi (peces nativos del lago)\n• Sopa de quinua andina\n\nMejor lugar: Asociación Tikarani en Llachón.' };
  }
  if (has('tejido', 'artesan', 'textil', 'chumpi', 'poncho')) {
    return { content: 'Llachón es famosa por sus tejidos de alpaca. Maestros recomendados:\n• Mamá Victoria (Llachón) – Talleres de telar de cintura\n• Mateo Huatta (Chifrón) – Chumpis tradicionales\n\nTaller de 4h cuesta S/ 60 e incluye tu pieza para llevar.' };
  }
  if (has('actividad', 'tour', 'qué hacer', 'que hacer', 'aventura')) {
    return { content: 'Top actividades:\n• Kayak al atardecer en el Titicaca – S/ 45 (2h)\n• Pesca tradicional con balsa de totora – S/ 40 (3h)\n• Caminata al mirador Tikonata – Gratis (4h)\n• Pachamanca ritual + ceremonia – S/ 55 (3h)\n• Taller de tejido – S/ 60 (4h)' };
  }
  if (has('festividad', 'fiesta', 'celebra')) {
    return { content: 'Festividades imperdibles:\n• Virgen de la Candelaria (1-14 feb) – Patrimonio UNESCO\n• Cruz Velacuity (mayo)\n• Inti Raymi (24 jun) – Fiesta del Sol\n• Santiago Apóstol (25 jul)\n• Pachamama Raymi (1 ago)' };
  }
  if (has('presupuesto', 'costo', 'precio', 'cuánto', 'cuanto cuesta')) {
    return { content: 'Presupuesto referencial por día:\n• Mochilero: S/ 120 (hospedaje + 3 comidas)\n• Estándar: S/ 250 (hospedaje + comidas + 1 actividad)\n• Premium: S/ 450 (eco-refugio + tours guiados + experiencias VIP)\n\nPara 3 días: S/ 750 estándar.' };
  }
  if (has('idioma', 'hablan')) {
    return { content: 'Idiomas en Capachica:\n• Español (todos)\n• Quechua y Aymara (mayoría de comunidades)\n• Algunos guías hablan inglés básico\n\nFrase útil: "Sumaq p\'unchay" = "Buen día" en quechua.' };
  }
  if (has('hola', 'hi', 'hello', 'buenas', 'buenos días', 'buenas tardes')) {
    return { content: '¡Sumaq p\'unchay! 🌞 Bienvenido a Capachica. Pregúntame por hospedajes, actividades, gastronomía o cómo llegar.' };
  }
  if (has('gracias', 'thank')) {
    return { content: '¡Con gusto! 🙏 ¿Algo más en lo que pueda ayudarte? Recuerda revisar la sección de Festividades para datos en vivo del backend.' };
  }
  if (has('días', 'cuántos días', 'cuantos dias')) {
    return { content: 'Te recomiendo mínimo 3 días para vivir Capachica:\n• Día 1 (Llachón): Llegada + taller de tejido + cena con familia\n• Día 2 (Ccotos): Pesca + trucha + navegación en totora\n• Día 3 (Siale): Caminata al mirador + Pachamanca ritual\n\nSi tienes 5 días, agrega Amantaní y Taquile.' };
  }
  if (has('aventura', 'extremo', 'adrenalina')) {
    return { content: 'Para aventureros:\n• Kayak al atardecer (rutas de 4-6 km)\n• Caminata Mirador Tikonata (4h, dificultad media)\n• Pesca artesanal al amanecer (madrugar vale la pena)\n• Ciclismo por la península (alquiler S/ 30/día)' };
  }
  if (has('niño', 'familia', 'familiar', 'kids')) {
    return { content: 'Capachica es ideal para familias:\n• Taller de tejido (todas las edades)\n• Paseo en balsa de totora (calmado)\n• Pachamanca (entretenido para niños)\n• Hospedajes familiares con espacio para correr\n\nEvita kayaks largos con niños menores de 8.' };
  }
  return { content: 'Cuéntame más para ayudarte mejor. Puedes preguntar por:\n• Hospedajes y reservas\n• Cómo llegar desde Puno o Juliaca\n• Actividades (kayak, pesca, tejido)\n• Gastronomía típica\n• Festividades del año\n• Presupuesto recomendado' };
}
