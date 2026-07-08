// IA/backend/ws.js
// Push real-time: el mobile se conecta una vez y el server avisa por
// canal (ej. "widget") solo cuando el admin cambia algo. Reemplaza el
// polling — el cliente no pregunta, el server empuja.
import { WebSocketServer } from 'ws';

let wss = null;

export function attachWS(server) {
  wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (socket) => {
    socket.on('error', () => {});
  });
}

export function broadcast(channel, payload = {}) {
  if (!wss) return;
  const msg = JSON.stringify({ channel, ...payload });
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(msg);
  }
}
