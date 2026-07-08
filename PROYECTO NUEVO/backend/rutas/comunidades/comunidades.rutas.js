const { Router } = require('express');
const path = require('path');
const fs   = require('fs');

const router = Router();
const dataPath = path.join(__dirname, '../../data/comunidades.json');

function cargarComunidades() {
    try {
        const raw = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function guardarComunidades(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

router.get('/', (_req, res) => {
    res.json(cargarComunidades());
});

router.get('/:id', (req, res) => {
    const comunidad = cargarComunidades().find(c => String(c.id) === req.params.id);
    if (!comunidad) return res.status(404).json({ error: 'Comunidad no encontrada' });
    res.json(comunidad);
});

router.post('/', (req, res) => {
    const data = cargarComunidades();
    const nueva = { id: Date.now(), ...req.body };
    data.push(nueva);
    guardarComunidades(data);
    res.status(201).json(nueva);
});

router.put('/:id', (req, res) => {
    const data = cargarComunidades();
    const idx = data.findIndex(c => String(c.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Comunidad no encontrada' });
    data[idx] = { ...data[idx], ...req.body };
    guardarComunidades(data);
    res.json(data[idx]);
});

router.delete('/:id', (req, res) => {
    let data = cargarComunidades();
    const idx = data.findIndex(c => String(c.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Comunidad no encontrada' });
    data.splice(idx, 1);
    guardarComunidades(data);
    res.json({ success: true });
});

module.exports = router;
