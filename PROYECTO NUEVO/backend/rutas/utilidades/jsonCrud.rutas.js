const { Router } = require('express');
const path   = require('path');
const fs     = require('fs');
const crypto = require('crypto');

// Fabrica un router CRUD sobre un archivo JSON plano en backend/data/.
// Mismo patron usado por festividades y comunidades.
function crearRutasJSON(nombreArchivo, nombreRecurso) {
    const router = Router();
    const dataPath = path.join(__dirname, '../../data', nombreArchivo);

    function cargarRaw() {
        try {
            return fs.readFileSync(dataPath, 'utf-8');
        } catch {
            return '[]';
        }
    }

    function cargar() {
        try {
            return JSON.parse(cargarRaw());
        } catch {
            return [];
        }
    }

    function guardar(data) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    }

    // ETag = hash del contenido. El cliente manda If-None-Match; si no
    // cambio nada devolvemos 304 (sin body) en vez del JSON completo —
    // asi el polling del mobile no gasta ancho de banda ni re-renderiza
    // la pantalla cuando no hubo cambios reales en el backend.
    router.get('/', (req, res) => {
        const raw = cargarRaw();
        const etag = `"${crypto.createHash('sha1').update(raw).digest('hex')}"`;
        res.set('ETag', etag);
        if (req.headers['if-none-match'] === etag) {
            return res.status(304).end();
        }
        res.type('application/json').send(raw);
    });

    router.get('/:id', (req, res) => {
        const item = cargar().find(x => String(x.id) === req.params.id);
        if (!item) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        res.json(item);
    });

    router.post('/', (req, res) => {
        const data = cargar();
        const nuevo = { id: Date.now(), ...req.body };
        data.push(nuevo);
        guardar(data);
        res.status(201).json(nuevo);
    });

    router.put('/:id', (req, res) => {
        const data = cargar();
        const idx = data.findIndex(x => String(x.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        data[idx] = { ...data[idx], ...req.body };
        guardar(data);
        res.json(data[idx]);
    });

    router.delete('/:id', (req, res) => {
        const data = cargar();
        const idx = data.findIndex(x => String(x.id) === req.params.id);
        if (idx === -1) return res.status(404).json({ error: `${nombreRecurso} no encontrado` });
        data.splice(idx, 1);
        guardar(data);
        res.json({ success: true });
    });

    return router;
}

module.exports = { crearRutasJSON };
