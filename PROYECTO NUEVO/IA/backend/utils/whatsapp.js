import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_DIR = path.join(__dirname, '..', 'wa_auth');

const logger = pino({ level: 'silent' });

let sock = null;
let qrBase64 = null;
let waStatus = 'disconnected';
let reconnectAttempts = 0;
let reconnectTimer = null;

const queue = [];
let processingQueue = false;

async function processQueue() {
  if (processingQueue || queue.length === 0) return;
  processingQueue = true;

  while (queue.length > 0) {
    const { jid, text, resolve, reject } = queue.shift();
    try {
      if (!sock || waStatus !== 'connected') throw new Error('WhatsApp no conectado');
      await sock.sendMessage(jid, { text });
      resolve();
    } catch (err) {
      reject(err);
    }
    if (queue.length > 0) {
      const delay = 5000 + Math.floor(Math.random() * 5000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  processingQueue = false;
}

export function sendWhatsApp(rawPhone, message) {
  if (!rawPhone) return Promise.resolve();
  const digits = String(rawPhone).replace(/\D/g, '');
  const phone = digits.startsWith('51') ? digits : `51${digits}`;
  const jid = `${phone}@s.whatsapp.net`;
  return new Promise((resolve, reject) => {
    queue.push({ jid, text: message, resolve, reject });
    processQueue();
  });
}

export function getWAStatus() {
  return { status: waStatus, qr: qrBase64 };
}

export async function connectWhatsApp() {
  if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
  waStatus = 'connecting';
  qrBase64 = null;

  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  sock = makeWASocket({
    version,
    auth: state,
    logger,
    printQRInTerminal: false,
    browser: ['Chrome', 'Chrome', '120.0'],
    getMessage: async () => ({ conversation: '' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      qrBase64 = await QRCode.toDataURL(qr).catch(() => null);
      waStatus = 'qr';
      console.log('WhatsApp: QR generado');
    }

    if (connection === 'open') {
      qrBase64 = null;
      waStatus = 'connected';
      reconnectAttempts = 0;
      console.log('WhatsApp: conectado');
    }

    if (connection === 'close') {
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const loggedOut = code === DisconnectReason.loggedOut;
      waStatus = 'disconnected';
      sock = null;
      console.log(`WhatsApp: desconectado (código ${code})`);

      if (!loggedOut && reconnectAttempts < 5) {
        reconnectAttempts++;
        const delay = Math.min(5000 * reconnectAttempts, 30000);
        console.log(`WhatsApp: reconectando en ${delay / 1000}s`);
        reconnectTimer = setTimeout(connectWhatsApp, delay);
      } else if (loggedOut) {
        fs.rmSync(AUTH_DIR, { recursive: true, force: true });
        console.log('WhatsApp: sesión cerrada, auth eliminada');
      }
    }
  });
}

export async function disconnectWhatsApp() {
  if (sock) {
    await sock.logout().catch(() => {});
    sock = null;
  }
  fs.rmSync(AUTH_DIR, { recursive: true, force: true });
  waStatus = 'disconnected';
  qrBase64 = null;
  reconnectAttempts = 0;
}
