// Cliente WebSocket compartido: una conexión por backend, no una por
// pantalla. El server empuja { channel } cuando algo cambia — nada de
// preguntar cada rato.
type Listener = () => void;

const sockets = new Map<string, WebSocket>();
const listeners = new Map<string, Set<Listener>>();
const reconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();

function keyOf(url: string, channel: string) {
  return `${url}::${channel}`;
}

function ensureSocket(url: string) {
  if (sockets.has(url)) return;
  let ws: WebSocket;
  try {
    ws = new WebSocket(url);
  } catch {
    scheduleReconnect(url);
    return;
  }
  sockets.set(url, ws);

  ws.onmessage = (e: any) => {
    try {
      const { channel } = JSON.parse(e.data);
      listeners.get(keyOf(url, channel))?.forEach(fn => fn());
    } catch {}
  };
  ws.onclose = () => {
    sockets.delete(url);
    scheduleReconnect(url);
  };
  ws.onerror = () => {
    ws.close();
  };
}

function scheduleReconnect(url: string) {
  if (reconnectTimers.has(url)) return;
  const timer = setTimeout(() => {
    reconnectTimers.delete(url);
    // Solo reconecta si sigue habiendo alguien escuchando algo de esta url.
    const hasListeners = [...listeners.keys()].some(k => k.startsWith(`${url}::`));
    if (hasListeners) ensureSocket(url);
  }, 3000);
  reconnectTimers.set(url, timer);
}

// Se suscribe a un canal de un backend. Devuelve función para desuscribirse.
export function subscribeWS(url: string, channel: string, fn: Listener): () => void {
  if (!url) return () => {};
  ensureSocket(url);
  const key = keyOf(url, channel);
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(fn);
  return () => listeners.get(key)?.delete(fn);
}

// https://host/api -> wss://host/ws (mismo server, mismo puerto, path /ws)
export function toWsUrl(httpBase: string): string {
  if (!httpBase) return '';
  return httpBase.replace(/^http/, 'ws').replace(/\/api\/?$/, '') + '/ws';
}
