// backend/rutas/configuracion.rutas.js
// Etiquetas editables de la grilla "Explora" del mobile (Gastronomía,
// Artesanía, etc) -- antes hardcodeadas en el código, cada cambio de texto
// pedía rebuildear el APK entero. Clave-valor simple, cualquiera puede leer
// (GET público, lo consume la app sin login), solo admin puede escribir.
const { Router } = require('express');
const { query } = require('../config/postgres');
const { broadcast } = require('../ws');
const { autenticacionMiddleware } = require('../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../middleware/autorizacion.middleware');

const router = Router();

const DEFAULTS = {
    comunidades: 'Familias',
    gastronomia: 'Gastronomía',
    artesania: 'Artesanía',
    reservas: 'Reservas',
    ar: 'AR',
    guias: 'Guías',
    mapaGoogle: 'Mapa Google',
    chatInti: 'Chat Inti',
    festividades: 'Festividades',
};

router.get('/', async (_req, res) => {
    try {
        const { rows } = await query('SELECT clave, valor FROM configuracion_app');
        const config = { ...DEFAULTS };
        for (const r of rows) config[r.clave] = r.valor;
        res.json(config);
    } catch (err) {
        res.json(DEFAULTS);
    }
});

// Actualiza varias claves de una -- body { clave: valor, ... }. Solo las
// claves conocidas en DEFAULTS se aceptan, el resto se ignora silenciosamente.
router.put('/', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
    try {
        const entradas = Object.entries(req.body || {}).filter(([clave]) => clave in DEFAULTS);
        for (const [clave, valor] of entradas) {
            await query(
                `INSERT INTO configuracion_app (clave, valor) VALUES ($1, $2)
                 ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor`,
                [clave, String(valor)]
            );
        }
        broadcast('configuracion');
        const { rows } = await query('SELECT clave, valor FROM configuracion_app');
        const config = { ...DEFAULTS };
        for (const r of rows) config[r.clave] = r.valor;
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar configuración' });
    }
});

module.exports = router;
