const { Router } = require('express');
const path = require('path');
const fs   = require('fs');

const router = Router();
const dataPath = path.join(__dirname, '../../data/festividades.json');

function cargarFestividades() {
    try {
        const raw = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function guardarFestividades(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

router.get('/', (_req, res) => {
    res.json(cargarFestividades());
});

router.get('/:id', (req, res) => {
    const festividad = cargarFestividades().find(f => String(f.id) === req.params.id);
    if (!festividad) return res.status(404).json({ error: 'Festividad no encontrada' });
    res.json(festividad);
});

router.post('/', (req, res) => {
    const data = cargarFestividades();
    const nueva = { id: Date.now(), ...req.body };
    data.push(nueva);
    guardarFestividades(data);
    res.status(201).json(nueva);
});

router.put('/:id', (req, res) => {
    const data = cargarFestividades();
    const idx = data.findIndex(f => String(f.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Festividad no encontrada' });
    data[idx] = { ...data[idx], ...req.body };
    guardarFestividades(data);
    res.json(data[idx]);
});

router.delete('/:id', (req, res) => {
    let data = cargarFestividades();
    const idx = data.findIndex(f => String(f.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Festividad no encontrada' });
    data.splice(idx, 1);
    guardarFestividades(data);
    res.json({ success: true });
});

module.exports = router;
