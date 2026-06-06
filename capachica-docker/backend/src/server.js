import express from 'express';
import cors    from 'cors';
import { pool, waitForDB } from './db.js';
import reservasRouter    from './routes/reservas.js';
import actividadesRouter from './routes/actividades.js';
import adminRouter       from './routes/admin.js';

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.use('/api/reservas',    reservasRouter);
app.use('/api/actividades', actividadesRouter);
app.use('/api/admin',       adminRouter);

app.get('/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok', db: 'conectada', time: new Date() });
    } catch {
        res.status(500).json({ status: 'error', db: 'desconectada' });
    }
});

app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});

await waitForDB();
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ API corriendo en http://0.0.0.0:${PORT}`);
});