const { Router } = require('express');
const path   = require('path');
const fs     = require('fs');
const crypto = require('crypto');
const { broadcast } = require('../../ws');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');

// Fabrica un router CRUD sobre un archivo JSON plano en backend/data/.
// Mismo patron usado por festividades y comunidades. `canal` es el
// nombre que se emite por WebSocket cuando se escribe algo, para que
// el mobile sepa que endpoint refrescar (sin tener que preguntar).
//
// Ownership: admin y proveedor pueden crear. Cada item creado queda
// marcado con usuario_id/usuario_nombre — solo el dueño o un admin
// puede editarlo/eliminarlo despues. Lectura (GET) sigue publica.
function crearRutasJSON(nombreArchivo, nombreRecurso, canal) {
    const router = Router();
    const dataPath = path.join(__dirname, '../../data', nombreArchivo);

    // Cache en memoria: el polling del mobile (cada 8s, cientos/miles de
    // usuarios en produccion) NO debe pegarle a disco en cada request.
    // Solo se relee/reescribe cuando alguien realmente escribe (admin).
    let cache = null; // { raw, data, etag }

    function etagDe(raw) {
        return `"${crypto.createHash('sha1').update(raw).digest('hex')}"`;
    }

    function poblarCache() {
        let raw;
        try { raw = fs.readFileSync(dataPath, 'utf-8'); } catch { raw = '[]'; }
        let data;
        try { data = JSON.parse(raw); } catch { data = []; }
        cache = { raw, data, etag: etagDe(raw) };
    }

    function cargar() {
        if (!cache) poblarCache();
        return cache.data;
    }

    function guardar(data) {
        const raw = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataPath, raw, 'utf-8');
        cache = { raw, data, etag: etagDe(raw) };
    }

    // ETag = hash del contenido, servido desde memoria. El cliente manda
    // If-None-Match; si no cambio nada devolvemos 304 (sin body, sin
    // leer disco) en vez del JSON completo.
    router.get('/', (req, res) => {
        if (!cache) poblarCache();
        res.set('ETag', cache.etag);
        if (req.headers['if-none-match'] === cache.etag) {
            return res.status(304).end();
        }
        res.type('application/json').send(cache.raw);
    });

    router.get('/:id', (req, res) => {
        const item = cargar().find(x => String(x.id) === req.params.id);
        if (!item) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        res.json(item);
    });

    function esDuenoOAdmin(item, req) {
        return req.usuario.rol === 'admin' || (item.usuario_id && item.usuario_id === req.usuario.id);
    }

    router.post('/', autenticacionMiddleware, autorizacionMiddleware(['admin', 'proveedor']), (req, res) => {
        const data = cargar();
        const nuevo = {
            id: Date.now(),
            ...req.body,
            usuario_id: req.usuario.id,
            usuario_nombre: req.usuario.nombre,
        };
        data.push(nuevo);
        guardar(data);
        broadcast(canal);
        res.status(201).json(nuevo);
    });

    router.put('/:id', autenticacionMiddleware, (req, res) => {
        const data = cargar();
        const idx = data.findIndex(x => String(x.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        if (!esDuenoOAdmin(data[idx], req)) {
            return res.status(403).json({ error: `No tienes permiso para editar este ${nombreRecurso.toLowerCase()}` });
        }
        // usuario_id/usuario_nombre no se pisan desde el body — el dueño no cambia al editar.
        const { usuario_id, usuario_nombre, ...cambios } = req.body;
        data[idx] = { ...data[idx], ...cambios };
        guardar(data);
        broadcast(canal);
        res.json(data[idx]);
    });

    router.delete('/:id', autenticacionMiddleware, (req, res) => {
        const data = cargar();
        const idx = data.findIndex(x => String(x.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        if (!esDuenoOAdmin(data[idx], req)) {
            return res.status(403).json({ error: `No tienes permiso para eliminar este ${nombreRecurso.toLowerCase()}` });
        }
        data.splice(idx, 1);
        guardar(data);
        broadcast(canal);
        res.json({ success: true });
    });

    return router;
}

module.exports = { crearRutasJSON };
