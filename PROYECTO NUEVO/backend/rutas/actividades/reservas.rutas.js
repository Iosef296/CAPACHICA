const { Router } = require('express');
const { query }  = require('../../config/postgres');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const {
            nombre, email, fecha_visita, personas,
            idioma, actividad, actividad_id, notas,
            precio_total, es_paquete, actividades_paquete
        } = req.body;

        if (!nombre?.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });
        if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: 'Email inválido' });
        if (!fecha_visita) return res.status(400).json({ error: 'La fecha es obligatoria' });
        if (!actividad?.trim()) return res.status(400).json({ error: 'La actividad es obligatoria' });

        const { rows } = await query(
            `INSERT INTO reservas
             (nombre, email, fecha_visita, personas, idioma,
              actividad, actividad_id, notas, precio_total,
              es_paquete, actividades_paquete)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
             RETURNING id, estado, created_at`,
            [
                nombre.trim(),
                email.trim().toLowerCase(),
                fecha_visita,
                parseInt(personas) || 1,
                idioma || 'Español',
                actividad.trim(),
                actividad_id || null,
                notas || null,
                parseInt(precio_total) || 0,
                Boolean(es_paquete),
                actividades_paquete ? JSON.stringify(actividades_paquete) : null,
            ]
        );

        res.status(201).json({
            success: true,
            message: '¡Reserva recibida! Te confirmaremos en 2 horas.',
            reserva_id: rows[0].id,
            estado: rows[0].estado,
        });
    } catch (err) {
        console.error('Error creando reserva:', err);
        res.status(500).json({ error: 'Error al guardar la reserva' });
    }
});

router.get('/', async (req, res) => {
    const { pass, estado } = req.query;
    if (pass !== process.env.ADMIN_PASS) return res.status(401).json({ error: 'No autorizado' });

    try {
        let conditions = [];
        let params     = [];
        let i          = 1;

        if (estado && estado !== 'all') {
            conditions.push(`estado = $${i++}`);
            params.push(estado);
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const { rows } = await query(
            `SELECT * FROM reservas ${where} ORDER BY created_at DESC`,
            params
        );

        const { rows: stats } = await query(`
            SELECT
                COUNT(*)                                                           AS total,
                COUNT(*) FILTER (WHERE estado='pendiente')                        AS pendientes,
                COUNT(*) FILTER (WHERE estado='confirmada')                       AS confirmadas,
                COUNT(*) FILTER (WHERE estado='cancelada')                        AS canceladas,
                COALESCE(SUM(precio_total) FILTER (WHERE estado='confirmada'), 0) AS ingresos
            FROM reservas
        `);

        res.json({ reservas: rows, stats: stats[0] });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener reservas' });
    }
});

router.patch('/:id', async (req, res) => {
    const { pass, estado } = req.body;
    if (pass !== process.env.ADMIN_PASS) return res.status(401).json({ error: 'No autorizado' });

    try {
        const { rows } = await query(
            `UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING id, estado`,
            [estado, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.json({ success: true, reserva: rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

module.exports = router;
