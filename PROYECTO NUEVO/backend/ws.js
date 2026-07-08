// backend/ws.js
// Push real-time: el mobile se conecta una vez y el server avisa por
// canal (ej. "comunidades") solo cuando alguien escribe algo. Reemplaza
// el polling — el cliente no pregunta, el server empuja.
const { WebSocketServer } = require('ws');

let wss = null;

function attachWS(server) {
    wss = new WebSocketServer({ server, path: '/ws' });
    wss.on('connection', (socket) => {
        socket.on('error', () => {});
    });
}

function broadcast(channel, payload = {}) {
    if (!wss) return;
    const msg = JSON.stringify({ channel, ...payload });
    for (const client of wss.clients) {
        if (client.readyState === client.OPEN) client.send(msg);
    }
}

module.exports = { attachWS, broadcast };
