const { Router } = require('express');
const { query } = require('../../config/postgres');
const { broadcast } = require('../../ws');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');
const { verificarToken } = require('../../config/autenticacion');

// GET no exige login (lo consumen paginas publicas), pero si viene un
// token igual lo leemos -- sin esto no hay forma de que el dueño o el
// admin vean sus propios items pendientes de aprobar en esa misma
// lista. Invalido/ausente = anonimo, nunca rompe la request.
function identidadSuave(req) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return null;
    try {
        const { id, rol } = verificarToken(header.slice(7));
        return { id, rol };
    } catch {
        return null;
    }
}

// Un item es visible para quien pide si: esta aprobado (o es viejo, de
// antes de que existiera este campo -- undefined cuenta como aprobado
// para no esconder retroactivamente todo lo ya cargado), o el que pide
// es admin, o es el dueño viendo lo suyo (pendiente incluido).
function esVisible(row, yo) {
    if (row.data?.aprobado !== false) return true;
    if (!yo) return false;
    return yo.rol === 'admin' || row.usuario_id === yo.id;
}

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
            const yo = identidadSuave(req);
            const { rows } = await query(
                `SELECT id, usuario_id, usuario_nombre, data FROM ${tabla} ORDER BY id`
            );
            res.json(rows.filter(r => esVisible(r, yo)).map(r => ({
                id: Number(r.id),
                ...(r.usuario_id ? { usuario_id: r.usuario_id, usuario_nombre: r.usuario_nombre } : {}),
                ...r.data,
            })));
        } catch (err) {
            res.status(500).json({ error: `Error al obtener ${nombreRecurso.toLowerCase()}s` });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const yo = identidadSuave(req);
            const { rows } = await query(
                `SELECT id, usuario_id, usuario_nombre, data FROM ${tabla} WHERE id = $1`,
                [req.params.id]
            );
            if (!rows.length || !esVisible(rows[0], yo)) {
                return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
            }
            const r = rows[0];
            res.json({
                id: Number(r.id),
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

    // Solo admin: asigna (o desasigna, usuario_id null) el emprendedor dueño
    // de este item. Separado del PUT normal porque ese ignora usuario_id del
    // body a propósito (un dueño no puede reasignarse el recurso a otro).
    router.put('/:id/asignar', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
        try {
            const { rows: existe } = await query(`SELECT id FROM ${tabla} WHERE id = $1`, [req.params.id]);
            if (!existe.length) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });

            const usuarioId = req.body.usuario_id || null;
            let usuarioNombre = null;
            if (usuarioId) {
                const { rows: u } = await query('SELECT nombre FROM usuarios WHERE id = $1', [usuarioId]);
                if (!u.length) return res.status(404).json({ error: 'Usuario no encontrado' });
                usuarioNombre = u[0].nombre;
            }

            await query(
                `UPDATE ${tabla} SET usuario_id = $1, usuario_nombre = $2 WHERE id = $3`,
                [usuarioId, usuarioNombre, req.params.id]
            );
            broadcast(canal);
            res.json({ id: Number(req.params.id), usuario_id: usuarioId, usuario_nombre: usuarioNombre });
        } catch (err) {
            res.status(500).json({ error: `Error al asignar ${nombreRecurso.toLowerCase()}` });
        }
    });

    router.post('/', autenticacionMiddleware, autorizacionMiddleware(['admin', 'proveedor']), async (req, res) => {
        try {
            const id = Date.now();
            // aprobado nunca viene del body -- lo decide el rol de quien
            // crea, no algo que el cliente pueda falsear. Admin publica
            // directo (como siempre); un emprendedor queda pendiente hasta
            // que un admin lo apruebe.
            const { id: _ignoreId, usuario_id: _i2, usuario_nombre: _i3, aprobado: _i4, ...rest } = req.body;
            const data = { ...rest, aprobado: req.usuario.rol === 'admin' };
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

    // Solo admin: publica un item pendiente (creado por un emprendedor).
    router.put('/:id/aprobar', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
        try {
            const { rows } = await query(`SELECT data FROM ${tabla} WHERE id = $1`, [req.params.id]);
            if (!rows.length) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
            const merged = { ...rows[0].data, aprobado: true };
            await query(`UPDATE ${tabla} SET data = $1 WHERE id = $2`, [JSON.stringify(merged), req.params.id]);
            broadcast(canal);
            res.json({ id: Number(req.params.id), ...merged });
        } catch (err) {
            res.status(500).json({ error: `Error al aprobar ${nombreRecurso.toLowerCase()}` });
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
            // aprobado tampoco se toca desde el PUT normal -- solo admin lo
            // cambia, vía /aprobar (evita que el dueño se autoapruebe).
            const { id: _ignoreId, usuario_id: _i2, usuario_nombre: _i3, aprobado: _i4, ...cambios } = req.body;
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
