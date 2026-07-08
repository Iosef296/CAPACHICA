import Constants from 'expo-constants';
import * as mock from './mock';

const extra = (Constants.expoConfig?.extra as any) ?? {};
export const API_BASE = extra.apiBaseUrl ?? '';
export const IA_BASE = extra.iaBaseUrl ?? '';

export const USE_MOCK = false;

async function get<T>(path: string, fallback: T): Promise<T> {
  if (USE_MOCK || !API_BASE) return fallback;
  try {
    const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`API ${path} failed, using mock:`, (e as Error).message);
    return fallback;
  }
}

// Cache por ETag: si el backend responde 304 (nada cambió), devolvemos
// la MISMA referencia ya transformada de la última vez. Los screens
// hacen setState(mismaReferencia) y React no re-renderiza — el polling
// del useLiveRefresh solo mueve la UI cuando el contenido real cambió.
const etagCache = new Map<string, { etag: string; value: any }>();

async function cachedGet<T>(path: string, fallback: T, transform: (raw: any) => T = raw => raw): Promise<T> {
  if (USE_MOCK || !API_BASE) return fallback;
  const cached = etagCache.get(path);
  try {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (cached?.etag) headers['If-None-Match'] = cached.etag;
    const res = await fetch(`${API_BASE}${path}`, { headers });
    if (res.status === 304 && cached) return cached.value;
    if (!res.ok) throw new Error(`${res.status}`);
    const value = transform(await res.json());
    const etag = res.headers.get('ETag');
    if (etag) etagCache.set(path, { etag, value });
    return value;
  } catch (e) {
    console.warn(`API ${path} failed:`, (e as Error).message);
    return cached?.value ?? fallback;
  }
}

async function post<T>(path: string, body: any, fallback: T): Promise<T> {
  if (USE_MOCK || !API_BASE) return fallback;
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`POST ${path} failed:`, (e as Error).message);
    return fallback;
  }
}

// Como post(), pero no traga errores: los propaga para que el caller
// (login/registro) pueda distinguir credenciales inválidas de éxito.
async function postAuth<T>(path: string, body: any): Promise<T> {
  if (!API_BASE) throw new Error('Backend no configurado');
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? `Error ${res.status}`);
  return data as T;
}

export type Restaurante = {
  id: string;
  nombre: string;
  descripcion?: string;
  direccion?: string;
  imagen?: string;
  galeria?: string[];
  rating?: number;
};

export type Actividad = {
  id: number | string;
  nombre: string;
  descripcion?: string;
  duracion?: string;
  precio?: number;
  imagen?: string;
  ubicacion?: string;
};

export type Festividad = {
  id: number;
  nombre: string;
  fecha: string;
  mes: number;
  tipo: string;
  ubicacion: string;
  descripcion: string;
  actividades: string[];
  imagen: string;
  galeria: string[];
  destacado?: boolean;
};

export const api = {
  // Endpoints reales del backend Railway
  festividades: () => cachedGet<Festividad[]>('/festividades', []),
  // El backend envuelve la lista en { data: [...] } / { actividades: [...] } — desenvolvemos.
  restaurantes: () => cachedGet<Restaurante[]>('/restaurantes', [], r => (Array.isArray(r) ? r : r?.data ?? [])),
  actividades: () => cachedGet<Actividad[]>('/actividades', [], r => (Array.isArray(r) ? r : r?.actividades ?? [])),
  platos: () => get<any[]>('/platos', []),
  talleres: () => get<any[]>('/talleres', []),
  // Endpoints que aún no responden — fallback a mock
  stories: () => get('/stories', mock.stories),
  recommendations: () => get('/recommendations', mock.recommendations),
  highlights: () => get('/highlights', mock.highlights),
  // Mismo endpoint que consume el frontend web (DestinosGrid) — comparten la fuente real.
  communities: () => cachedGet<any[]>('/comunidades', mock.communities, list =>
    (Array.isArray(list) ? list : []).map((c: any) => ({
      id: String(c.id),
      name: c.nombre ?? c.name,
      description: c.desc ?? c.descripcion ?? c.description,
      image: c.imagen || c.image || 'https://picsum.photos/seed/' + c.id + '/800/600',
      experiencesCount: c.experiencias ?? c.experiencesCount ?? 0,
    }))
  ),
  mapPins: () => get('/map/pins', mock.mapPins),
  profile: () => get('/profile/me', mock.profile),
  // Mismo endpoint que consume el frontend web (Artesania.tsx).
  crafts: () => cachedGet<any[]>('/artesania', mock.crafts, list =>
    (Array.isArray(list) ? list : []).map((c: any) => ({
      id: String(c.id),
      name: c.nombre ?? c.name,
      price: c.precio_soles ?? c.precio ?? c.price,
      img: c.imagen_url ?? c.imagen ?? c.img,
    }))
  ),
  masters: () => cachedGet<any[]>('/maestros', mock.masters, list =>
    (Array.isArray(list) ? list : []).map((m: any) => ({
      id: String(m.id), name: m.nombre ?? m.name, craft: m.oficio ?? m.craft, img: m.imagen ?? m.img,
    }))
  ),
  guides: () => cachedGet<any[]>('/guias', mock.guides, list =>
    (Array.isArray(list) ? list : []).map((g: any) => ({
      id: String(g.id), title: g.titulo ?? g.title, excerpt: g.extracto ?? g.excerpt,
      img: g.imagen ?? g.img, type: g.tipo ?? g.type ?? 'cultural',
    }))
  ),
  // Mismo endpoint que consume el frontend web (FamiliasGrid.tsx).
  stays: () => cachedGet<any[]>('/hospedajes', mock.stays, list =>
    (Array.isArray(list) ? list : []).map((s: any) => ({
      id: String(s.id), name: s.nombre ?? s.name, community: s.comunidad ?? s.community,
      price: s.precio ?? s.price, img: s.foto_url ?? s.imagen ?? s.img,
    }))
  ),
  // Auth real contra /api/auth/login y /api/auth/registro (espera email/password)
  login: (email: string, password: string) =>
    postAuth<{ usuario?: any; accessToken?: string; refreshToken?: string }>('/auth/login', { email, password }),
  registro: (email: string, password: string, nombre: string) =>
    postAuth<{ usuario?: any; accessToken?: string; refreshToken?: string }>('/auth/registro', { email, password, nombre }),
};

// Chat con backend IA. Soporta campos en español o inglés.
export async function killaChat(message: string, history: { role: 'user' | 'assistant'; content: string }[] = []) {
  if (!IA_BASE) return { reply: '(Modo offline) ' + cannedReply(message) };
  try {
    const res = await fetch(`${IA_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensaje: message,
        message,
        historial: history.map(h => ({ rol: h.role, contenido: h.content })),
        history,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data?.error) throw new Error(data.error);
    return { reply: data.respuesta ?? data.reply ?? data.message ?? data.response ?? cannedReply(message) };
  } catch (e) {
    console.warn('Inti chat failed:', (e as Error).message);
    return { reply: '(Sin conexión al asistente) ' + cannedReply(message) };
  }
}

function cannedReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes('clima')) return 'En julio en Llachón hace frío (3°C noche, 18°C día). Lleva abrigo.';
  if (lower.includes('día') || lower.includes('días')) return 'Te recomiendo 3 días: día 1 Llachón, día 2 Ccotos, día 3 Amantaní.';
  if (lower.includes('cultura')) return 'No te pierdas el taller de tejido con Mamá Victoria y la pachamanca ritual.';
  if (lower.includes('presupuesto')) return 'Con S/ 250 por día tienes hospedaje familiar + 3 comidas + 1 actividad.';
  return 'Cuéntame más sobre tu viaje: ¿cuántos días, qué te gusta y cuál es tu presupuesto?';
}
