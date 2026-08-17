import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as mock from './mock';
import { toWsUrl } from './ws';

const extra = (Constants.expoConfig?.extra as any) ?? {};
export const API_BASE = extra.apiBaseUrl ?? '';
export const IA_BASE = extra.iaBaseUrl ?? '';
export const API_WS = toWsUrl(API_BASE);

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
  fotos?: string[];
  tipo_comida?: string;
  precio_promedio?: number;
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
  // No hay GET /platos global en el backend -- solo por restaurante. Traemos
  // los restaurantes reales y juntamos sus platos.
  platos: async (): Promise<any[]> => {
    if (!API_BASE) return [];
    try {
      const restRes = await fetch(`${API_BASE}/restaurantes?limit=200`);
      const restData = await restRes.json().catch(() => ({}));
      const restaurantes = Array.isArray(restData?.data) ? restData.data : [];
      const listas = await Promise.all(restaurantes.map(async (r: any) => {
        try {
          const res = await fetch(`${API_BASE}/platos/restaurante/${r.id}`);
          const data = await res.json().catch(() => []);
          return Array.isArray(data) ? data.map((p: any) => ({ ...p, restaurante_nombre: r.nombre })) : [];
        } catch { return []; }
      }));
      return listas.flat();
    } catch { return []; }
  },
  talleres: () => get<any[]>('/talleres', []),
  // Endpoints que aún no responden — fallback a mock
  stories: () => get('/stories', mock.stories),
  recommendations: () => get('/recommendations', mock.recommendations),
  highlights: () => get('/highlights', mock.highlights),
  // Mismo endpoint que consume el frontend web (DestinosGrid) — comparten la fuente real.
  // Spread de los campos crudos (comunidad/highlight/tags/nombre/desc/imagen) ADEMÁS
  // de los normalizados (name/description/image/experiencesCount) -- community-detail.tsx
  // necesita los crudos, communities.tsx (la lista) usa los normalizados.
  communities: () => cachedGet<any[]>('/comunidades', mock.communities, list =>
    (Array.isArray(list) ? list : []).map((c: any) => ({
      ...c,
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
  // Mismo endpoint que consume el frontend web (FamiliasGrid.tsx) -- las
  // familias anfitrionas (tabla comunidades) SON el hospedaje, ya no hay
  // un recurso "hospedajes" separado.
  stays: () => cachedGet<any[]>('/comunidades', mock.stays, list =>
    (Array.isArray(list) ? list : []).map((s: any) => ({
      id: String(s.id), name: s.nombre ?? s.name, community: s.comunidad ?? s.community,
      price: s.precio ?? s.price, img: s.imagen ?? s.foto_url ?? s.img,
    }))
  ),
  // Auth real contra /api/auth/login y /api/auth/registro (espera email/password)
  login: (email: string, password: string) =>
    postAuth<{ usuario?: any; accessToken?: string; refreshToken?: string }>('/auth/login', { email, password }),
  registro: (email: string, password: string, nombre: string) =>
    postAuth<{ usuario?: any; accessToken?: string; refreshToken?: string }>('/auth/registro', { email, password, nombre }),
  google: (idToken: string) =>
    postAuth<{ usuario?: any; accessToken?: string; refreshToken?: string }>('/auth/google', { idToken }),
  // Actualiza el propio perfil (nombre/telefono/foto) -- PUT /usuarios/perfil,
  // cualquier usuario autenticado puede llamarlo (no solo admin).
  actualizarPerfil: (datos: { nombre?: string; telefono?: string; foto?: string }) =>
    authFetch('PUT', '/usuarios/perfil', datos),
};

// ── "Mi negocio" — CRUD autenticado para emprendedores/admin ──
// Mismos 6 recursos que ya se leen arriba, pero aquí con el JWT real
// (guardado en login/registro) para crear/editar/eliminar SOLO lo
// que uno mismo creó (o cualquier cosa, si eres admin — lo valida el
// backend, no el mobile).
export type TipoNegocio = 'comunidades' | 'artesania' | 'festividades' | 'maestros' | 'guias' | 'restaurantes' | 'platos';

// El accessToken dura 1h (ver backend/config/autenticacion.js). Si una
// llamada autenticada vuelve 401, probamos renovarlo con el refreshToken
// (7d) antes de rendirnos -- si no, cualquier pantalla con datos propios
// se queda "vacía" en silencio pasada una hora de sesión.
export async function tryRefreshToken(): Promise<string | null> {
  const refreshToken = await SecureStore.getItemAsync('capachica.refreshToken').catch(() => null);
  if (!refreshToken || !API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.accessToken) return null;
    await SecureStore.setItemAsync('capachica.token', data.accessToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

async function authFetch(method: string, path: string, body?: any) {
  let token = await SecureStore.getItemAsync('capachica.token').catch(() => null);
  if (!token) throw new Error('Debes iniciar sesión');

  const doFetch = (tok: string) => fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let res = await doFetch(token);
  if (res.status === 401) {
    const renovado = await tryRefreshToken();
    if (renovado) res = await doFetch(renovado);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detalle ?? data?.error ?? `Error ${res.status}`);
  return data;
}

// ── Mis reservas — mismas reservas que ve el usuario en el sitio web ──
export type ReservaMia = {
  id: string; nombre: string; fecha_visita: string; personas: number; idioma?: string;
  actividad: string; notas?: string | null; precio_total: number;
  es_paquete: boolean; actividades_paquete?: string[] | null;
  estado: 'pendiente' | 'confirmada' | 'cancelada'; created_at: string;
};

export const reservas = {
  mias: async (): Promise<ReservaMia[]> => {
    const data = await authFetch('GET', '/reservas/mias');
    return data?.reservas ?? [];
  },
  // Mismo endpoint público que consume el formulario de reservas del sitio web.
  crear: (datos: {
    nombre: string; email: string; fecha_visita: string; personas: number;
    idioma?: string; actividad: string; actividad_id?: number | string;
    notas?: string; precio_total: number;
  }): Promise<{ success: boolean; reserva_id: string; estado: string }> => {
    if (!API_BASE) throw new Error('Backend no configurado');
    return fetch(`${API_BASE}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(datos),
    }).then(async res => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? `Error ${res.status}`);
      return data;
    });
  },
  // Solo mientras la reserva sigue "pendiente" — el backend recalcula el
  // precio_total proporcional a la nueva cantidad de personas.
  editar: async (id: string, datos: {
    fecha_visita: string; personas: number; idioma?: string; notas?: string;
  }): Promise<ReservaMia> => {
    const data = await authFetch('PUT', `/reservas/${id}`, datos);
    return data.reserva;
  },
  cancelar: async (id: string): Promise<ReservaMia> => {
    const data = await authFetch('PATCH', `/reservas/${id}/cancelar`);
    return data.reserva;
  },
};

// ── Gestión de usuarios — solo admin ──
export type UsuarioAdmin = {
  id: string; nombre: string; email: string; telefono?: string | null;
  rol: 'admin' | 'proveedor' | 'turista'; activo: boolean; foto?: string | null;
};

export const usuariosAdmin = {
  listar: (): Promise<UsuarioAdmin[]> => authFetch('GET', '/usuarios'),
  actualizar: (id: string, datos: {
    nombre?: string; email?: string; telefono?: string; rol?: string; activo?: boolean; password?: string;
  }) => authFetch('PUT', `/usuarios/${id}`, datos),
};

export const negocios = {
  // Trae TODO el recurso (sin transformar/cachear) y filtra por dueño en el cliente.
  // 'restaurantes' es la excepción -- backend TypeORM real con DTOs propios,
  // no el CRUD genérico sobre JSONB que usan comunidades/artesania/etc.
  listarPropios: async (tipo: TipoNegocio, usuarioId: string): Promise<any[]> => {
    if (!API_BASE) return [];
    try {
      if (tipo === 'restaurantes') {
        const res = await fetch(`${API_BASE}/restaurantes?limit=200`);
        const data = await res.json().catch(() => ({}));
        const lista = Array.isArray(data?.data) ? data.data : [];
        return lista.filter((it: any) => String(it.usuario_id) === String(usuarioId));
      }
      // Los platos no tienen listado global -- solo por restaurante. Buscamos
      // los restaurantes propios y juntamos sus platos.
      if (tipo === 'platos') {
        const misRestaurantes = await negocios.listarPropios('restaurantes', usuarioId);
        const listas = await Promise.all(misRestaurantes.map(async (r: any) => {
          try {
            const res = await fetch(`${API_BASE}/platos/restaurante/${r.id}`);
            const data = await res.json().catch(() => []);
            return Array.isArray(data) ? data : [];
          } catch { return []; }
        }));
        return listas.flat();
      }
      const res = await fetch(`${API_BASE}/${tipo}`);
      const data = await res.json().catch(() => []);
      return (Array.isArray(data) ? data : []).filter((it: any) => String(it.usuario_id) === String(usuarioId));
    } catch {
      return [];
    }
  },
  crear: (tipo: TipoNegocio, datos: any) => authFetch('POST', `/${tipo}`, datos),
  editar: (tipo: TipoNegocio, id: string | number, datos: any) => authFetch('PUT', `/${tipo}/${id}`, datos),
  eliminar: (tipo: TipoNegocio, id: string | number) => authFetch('DELETE', `/${tipo}/${id}`),
};

// Sube una foto (URI local del picker) a Cloudinary via el backend. No
// necesita auth — mismo endpoint publico que ya usa el panel web.
export async function subirFoto(uri: string): Promise<string> {
  if (!API_BASE) throw new Error('Backend no configurado');
  const form = new FormData();
  const filename = uri.split('/').pop() || 'foto.jpg';
  const ext = filename.split('.').pop()?.toLowerCase();
  const type = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  form.append('imagen', { uri, name: filename, type } as any);
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data?.error ?? 'No se pudo subir la foto');
  return data.url;
}

// Foto o video de una historia -- mismo patrón que subirFoto pero pega al
// endpoint aparte (/upload/historia) que sí acepta video (resource_type auto).
export async function subirMediaHistoria(uri: string, tipo: 'foto' | 'video'): Promise<string> {
  if (!API_BASE) throw new Error('Backend no configurado');
  const form = new FormData();
  const filename = uri.split('/').pop() || (tipo === 'video' ? 'video.mp4' : 'foto.jpg');
  const ext = filename.split('.').pop()?.toLowerCase();
  const type = tipo === 'video'
    ? (ext === 'mov' ? 'video/quicktime' : 'video/mp4')
    : (ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg');
  form.append('media', { uri, name: filename, type } as any);
  const res = await fetch(`${API_BASE}/upload/historia`, { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data?.error ?? 'No se pudo subir el archivo');
  return data.url;
}

// Historias estilo WhatsApp Status -- el usuario elige cuánto duran al subirlas.
export type Historia = {
  id: number; usuario_id: string; usuario_nombre: string; usuario_foto?: string | null;
  media_url: string; tipo: 'foto' | 'video'; duracion_horas: number;
  created_at: string; expires_at: string; likes_count: number;
};

export const historias = {
  listar: async (): Promise<Historia[]> => {
    if (!API_BASE) return [];
    try {
      const res = await fetch(`${API_BASE}/historias`);
      const data = await res.json().catch(() => []);
      return Array.isArray(data) ? data : [];
    } catch { return []; }
  },
  // Ids de historias que el usuario logueado ya likeo -- para pintar el
  // corazón lleno al cargar sin depender de auth opcional en el listado.
  misLikes: async (): Promise<number[]> => {
    try {
      const data = await authFetch('GET', '/historias/mis-likes');
      return Array.isArray(data) ? data : [];
    } catch { return []; }
  },
  crear: (datos: { media_url: string; tipo: 'foto' | 'video'; duracion_horas: number }): Promise<Historia> =>
    authFetch('POST', '/historias', datos),
  like: (id: number): Promise<{ liked: boolean; likes_count: number }> =>
    authFetch('POST', `/historias/${id}/like`),
  eliminar: (id: number) => authFetch('DELETE', `/historias/${id}`),
};

// Etiquetas de la grilla "Explora" del Home -- editables desde el admin web
// o la pestaña de admin del propio mobile, sin rebuild del APK.
export type ConfigApp = Record<string, string>;

export const configuracion = {
  listar: async (): Promise<Partial<ConfigApp>> => {
    if (!API_BASE) return {};
    try {
      const res = await fetch(`${API_BASE}/configuracion`);
      return await res.json().catch(() => ({}));
    } catch { return {}; }
  },
  actualizar: (datos: Partial<ConfigApp>): Promise<ConfigApp> =>
    authFetch('PUT', '/configuracion', datos),
};

// Pines del mapa -- el admin los agrega/mueve/borra tocando el mapa
// directamente desde la app, sin rebuild.
export type Ubicacion = { id: number; titulo: string; descripcion?: string | null; latitud: number; longitud: number };

export const ubicaciones = {
  listar: (): Promise<Ubicacion[]> => get('/ubicaciones', []),
  crear: (datos: { titulo: string; descripcion?: string; latitud: number; longitud: number }): Promise<Ubicacion> =>
    authFetch('POST', '/ubicaciones', datos),
  actualizar: (id: number, datos: Partial<{ titulo: string; descripcion: string; latitud: number; longitud: number }>): Promise<Ubicacion> =>
    authFetch('PUT', `/ubicaciones/${id}`, datos),
  eliminar: (id: number) => authFetch('DELETE', `/ubicaciones/${id}`),
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
