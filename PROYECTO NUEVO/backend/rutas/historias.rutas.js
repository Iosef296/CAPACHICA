// backend/rutas/historias.rutas.js
// Historias estilo WhatsApp Status: cualquier usuario autenticado (no solo
// admin/proveedor, por eso no usa el crearRutasSQL genérico) sube una
// foto o video y elige cuánto dura. expires_at se fija una sola vez al
// crear -- el GET filtra por expires_at > now(), así que las vencidas
// simplemente dejan de listarse solas, sin necesidad de un cron/borrado.
const { Router } = require('express');
const { query } = require('../config/postgres');
const { broadcast } = require('../ws');
const { autenticacionMiddleware } = require('../middleware/autenticacion.middleware');

const router = Router();

// 12h, 24h, 1 semana (168h), 1 mes (720h) -- todo en horas para no complicar la columna.
const DURACIONES_VALIDAS = [12, 24, 168, 720];

router.get('/', async (_req, res) => {
    try {
        const { rows } = await query(
            `SELECT id, usuario_id, usuario_nombre, usuario_foto, media_url, tipo, duracion_horas, created_at, expires_at
             FROM historias WHERE expires_at > now() ORDER BY created_at DESC`
        );
        res.json(rows.map(r => ({ ...r, id: Number(r.id) })));
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener historias' });
    }
});

router.post('/', autenticacionMiddleware, async (req, res) => {
    try {
        const { media_url, tipo, duracion_horas } = req.body;
        if (!media_url || !['foto', 'video'].includes(tipo)) {
            return res.status(400).json({ error: 'media_url y tipo (foto|video) son requeridos' });
        }
        const duracion = DURACIONES_VALIDAS.includes(Number(duracion_horas)) ? Number(duracion_horas) : 24;
        if (!req.usuario?.id) {
            return res.status(401).json({ error: 'Usuario no identificado' });
        }
        const id = Date.now();
        const { rows } = await query(
            `INSERT INTO historias (id, usuario_id, usuario_nombre, usuario_foto, media_url, tipo, duracion_horas, expires_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7::int, now() + ($7::int * INTERVAL '1 hour'))
             RETURNING id, usuario_id, usuario_nombre, usuario_foto, media_url, tipo, duracion_horas, created_at, expires_at`,
            [id, req.usuario.id, req.usuario.nombre, req.usuario.foto ?? null, media_url, tipo, duracion]
        );
        broadcast('historias');
        res.status(201).json({ ...rows[0], id: Number(rows[0].id) });
    } catch (err) {
        console.error('Error al crear historia:', err);
        res.status(500).json({ error: 'Error al crear historia', detalle: err.message });
    }
});

router.delete('/:id', autenticacionMiddleware, async (req, res) => {
    try {
        const { rows } = await query('SELECT usuario_id FROM historias WHERE id = $1', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Historia no encontrada' });
        if (req.usuario.rol !== 'admin' && rows[0].usuario_id !== req.usuario.id) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar esta historia' });
        }
        await query('DELETE FROM historias WHERE id = $1', [req.params.id]);
        broadcast('historias');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar historia' });
    }
});

module.exports = router;
