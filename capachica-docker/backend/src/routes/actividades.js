import { Router } from 'express';
import { query }  from '../db.js';

const router = Router();

// GET — Todas las actividades
router.get('/', async (req, res) => {
    try {
        const { categoria, dificultad, duracion } = req.query;
        let conditions = ['activo = true'];
        let params     = [];
        let i          = 1;

        if (categoria)  { conditions.push(`categoria = $${i++}`);  params.push(categoria); }
        if (dificultad) { conditions.push(`dificultad = $${i++}`); params.push(dificultad); }
        if (duracion)   { conditions.push(`duracion = $${i++}`);   params.push(duracion); }

        const { rows } = await query(
            `SELECT * FROM actividades WHERE ${conditions.join(' AND ')} ORDER BY categoria, precio`,
            params
        );
        res.json({ actividades: rows });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener actividades' });
    }
});

// GET — Una actividad por ID
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await query(
            'SELECT * FROM actividades WHERE id = $1',
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Actividad no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener actividad' });
    }
});

export default router;