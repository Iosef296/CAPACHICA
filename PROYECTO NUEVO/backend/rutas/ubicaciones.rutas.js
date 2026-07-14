// backend/rutas/ubicaciones.rutas.js
// Pines del mapa (tab "Mapa" del mobile) -- el admin los agrega/edita/borra
// tocando el mapa directamente desde la app, sin tocar código. GET público
// (lo consume el mapa sin login), solo admin puede escribir.
const { Router } = require('express');
const { query } = require('../config/postgres');
const { broadcast } = require('../ws');
const { autenticacionMiddleware } = require('../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../middleware/autorizacion.middleware');

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const { rows } = await query('SELECT * FROM ubicaciones ORDER BY id');
        res.json(rows.map(r => ({
            id: Number(r.id),
            titulo: r.titulo,
            descripcion: r.descripcion,
            latitud: Number(r.latitud),
            longitud: Number(r.longitud),
        })));
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener ubicaciones' });
    }
});

router.post('/', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
    try {
        const { titulo, descripcion, latitud, longitud } = req.body;
        if (!titulo || typeof latitud !== 'number' || typeof longitud !== 'number') {
            return res.status(400).json({ error: 'Faltan datos: titulo, latitud y longitud son obligatorios' });
        }
        const { rows } = await query(
            `INSERT INTO ubicaciones (titulo, descripcion, latitud, longitud, creado_por)
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [titulo, descripcion || null, latitud, longitud, req.usuario.id]
        );
        broadcast('ubicaciones');
        res.status(201).json({ id: Number(rows[0].id), titulo, descripcion: descripcion || null, latitud, longitud });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear ubicación' });
    }
});

router.put('/:id', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
    try {
        const { titulo, descripcion, latitud, longitud } = req.body;
        const { rows } = await query(
            `UPDATE ubicaciones SET
                titulo = COALESCE($1, titulo),
                descripcion = COALESCE($2, descripcion),
                latitud = COALESCE($3, latitud),
                longitud = COALESCE($4, longitud)
             WHERE id = $5 RETURNING *`,
            [titulo ?? null, descripcion ?? null, latitud ?? null, longitud ?? null, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Ubicación no encontrada' });
        broadcast('ubicaciones');
        const r = rows[0];
        res.json({ id: Number(r.id), titulo: r.titulo, descripcion: r.descripcion, latitud: Number(r.latitud), longitud: Number(r.longitud) });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar ubicación' });
    }
});

router.delete('/:id', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
    try {
        await query('DELETE FROM ubicaciones WHERE id = $1', [req.params.id]);
        broadcast('ubicaciones');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar ubicación' });
    }
});

module.exports = router;
