const { Router } = require('express');
const { query }  = require('../../config/postgres');

const router = Router();

function authAdmin(req, res, next) {
    const pass = req.headers['x-admin-pass'] || req.query.pass || req.body?.pass;
    if (pass !== process.env.ADMIN_PASS) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    next();
}

router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASS) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
    }
});

router.get('/dashboard', authAdmin, async (_req, res) => {
    try {
        const { rows: stats } = await query(`
            SELECT
                COUNT(*)                                                              AS total_reservas,
                COUNT(*) FILTER (WHERE estado='pendiente')                           AS pendientes,
                COUNT(*) FILTER (WHERE estado='confirmada')                          AS confirmadas,
                COUNT(*) FILTER (WHERE estado='cancelada')                           AS canceladas,
                COALESCE(SUM(precio_total) FILTER (WHERE estado='confirmada'), 0)    AS ingresos_total,
                COALESCE(AVG(personas), 0)                                           AS promedio_personas,
                COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')      AS nuevas_semana
            FROM reservas
        `);

        const { rows: proximas } = await query(`
            SELECT nombre, email, actividad, fecha_visita, personas, precio_total, estado
            FROM reservas
            WHERE fecha_visita >= CURRENT_DATE AND estado != 'cancelada'
            ORDER BY fecha_visita ASC
            LIMIT 5
        `);

        res.json({ stats: stats[0], proximas });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener dashboard' });
    }
});

module.exports = router;
