const { Router } = require('express');
const { query } = require('../../config/postgres');
const { broadcast } = require('../../ws');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');

// Mismo contrato externo que jsonCrud.rutas.js (que escribia a un
// archivo plano en backend/data/ -- se perdia en cada redeploy porque
// el filesystem del contenedor es efimero). Esto guarda cada item como
// una fila con los campos propios en una columna JSONB, en la misma
// Postgres (Supabase) que ya usan reservas/actividades -- sobrevive
// redeploys.
//
// `tabla` SIEMPRE es un literal fijo pasado por el codigo (nunca dato
// de request) en cada llamado de mas abajo -- no hay riesgo de
// inyeccion SQL por interpolarlo en el nombre de tabla.
function crearRutasSQL(tabla, nombreRecurso, canal) {
    const router = Router();

    router.get('/', async (req, res) => {
        try {
            const { rows } = await query(
                `SELECT id, usuario_id, usuario_nombre, data FROM ${tabla} ORDER BY id`
            );
            res.json(rows.map(r => ({
                id: r.id,
                ...(r.usuario_id ? { usuario_id: r.usuario_id, usuario_nombre: r.usuario_nombre } : {}),
                ...r.data,
            })));
        } catch (err) {
            res.status(500).json({ error: `Error al obtener ${nombreRecurso.toLowerCase()}s` });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const { rows } = await query(
                `SELECT id, usuario_id, usuario_nombre, data FROM ${tabla} WHERE id = $1`,
                [req.params.id]
            );
            if (!rows.length) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
            const r = rows[0];
            res.json({
                id: r.id,
                ...(r.usuario_id ? { usuario_id: r.usuario_id, usuario_nombre: r.usuario_nombre } : {}),
                ...r.data,
            });
        } catch (err) {
            res.status(500).json({ error: `Error al obtener ${nombreRecurso.toLowerCase()}` });
        }
    });

    function esDuenoOAdmin(usuarioIdFila, req) {
        return req.usuario.rol === 'admin' || (usuarioIdFila && usuarioIdFila === req.usuario.id);
    }

    router.post('/', autenticacionMiddleware, autorizacionMiddleware(['admin', 'proveedor']), async (req, res) => {
        try {
            const id = Date.now();
            const { id: _ignoreId, usuario_id: _i2, usuario_nombre: _i3, ...data } = req.body;
            await query(
                `INSERT INTO ${tabla} (id, usuario_id, usuario_nombre, data) VALUES ($1,$2,$3,$4)`,
                [id, req.usuario.id, req.usuario.nombre, JSON.stringify(data)]
            );
            broadcast(canal);
            res.status(201).json({ id, usuario_id: req.usuario.id, usuario_nombre: req.usuario.nombre, ...data });
        } catch (err) {
            res.status(500).json({ error: `Error al crear ${nombreRecurso.toLowerCase()}` });
        }
    });

    router.put('/:id', autenticacionMiddleware, async (req, res) => {
        try {
            const { rows } = await query(
                `SELECT usuario_id, data FROM ${tabla} WHERE id = $1`,
                [req.params.id]
            );
            if (!rows.length) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
            if (!esDuenoOAdmin(rows[0].usuario_id, req)) {
                return res.status(403).json({ error: `No tienes permiso para editar este ${nombreRecurso.toLowerCase()}` });
            }
            const { id: _ignoreId, usuario_id: _i2, usuario_nombre: _i3, ...cambios } = req.body;
            const merged = { ...rows[0].data, ...cambios };
            await query(`UPDATE ${tabla} SET data = $1 WHERE id = $2`, [JSON.stringify(merged), req.params.id]);
            broadcast(canal);
            res.json({ id: Number(req.params.id), usuario_id: rows[0].usuario_id, ...merged });
        } catch (err) {
            res.status(500).json({ error: `Error al actualizar ${nombreRecurso.toLowerCase()}` });
        }
    });

    router.delete('/:id', autenticacionMiddleware, async (req, res) => {
        try {
            const { rows } = await query(`SELECT usuario_id FROM ${tabla} WHERE id = $1`, [req.params.id]);
            if (!rows.length) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
            if (!esDuenoOAdmin(rows[0].usuario_id, req)) {
                return res.status(403).json({ error: `No tienes permiso para eliminar este ${nombreRecurso.toLowerCase()}` });
            }
            await query(`DELETE FROM ${tabla} WHERE id = $1`, [req.params.id]);
            broadcast(canal);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: `Error al eliminar ${nombreRecurso.toLowerCase()}` });
        }
    });

    return router;
}

module.exports = { crearRutasSQL };
