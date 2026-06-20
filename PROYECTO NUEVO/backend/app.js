require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');
const path     = require('path');

const { initializeDatabase } = require('./config/base-de-datos');
const { waitForDB }          = require('./config/postgres');
const { errorHandler }       = require('./middleware/error-handler');

// Rutas — Gastronomía
const authRoutes        = require('./rutas/auth/auth.rutas');
const restauranteRoutes = require('./rutas/gastronomia/restaurante.rutas');
const platoRoutes       = require('./rutas/gastronomia/plato.rutas');
const tallerRoutes      = require('./rutas/gastronomia/taller.rutas');
const recetaRoutes      = require('./rutas/gastronomia/receta.rutas');
const usuarioRoutes     = require('./rutas/usuarios/usuario.rutas');

// Rutas — Actividades / Reservas
const actividadesRoutes  = require('./rutas/actividades/actividades.rutas');
const reservasRoutes     = require('./rutas/actividades/reservas.rutas');
const adminRoutes        = require('./rutas/actividades/admin.rutas');

// Rutas — Festividades
const festividadesRoutes = require('./rutas/festividades/festividades.rutas');

// Rutas — Upload
const uploadRoutes = require('./rutas/upload.rutas');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Archivos estáticos — imágenes gastronomía
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}, express.static(path.join(__dirname, 'uploads')));

// ── Gastronomía ────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/platos',       platoRoutes);
app.use('/api/talleres',     tallerRoutes);
app.use('/api/recetas',      recetaRoutes);
app.use('/api/usuarios',     usuarioRoutes);

// ── Actividades ────────────────────────────────────
app.use('/api/actividades',  actividadesRoutes);
app.use('/api/reservas',     reservasRoutes);
app.use('/api/admin',        adminRoutes);

// ── Festividades ───────────────────────────────────
app.use('/api/festividades', festividadesRoutes);

// ── Upload ─────────────────────────────────────────
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', mensaje: 'Capachica API unificada', timestamp: new Date() });
});

// One-time admin seed — protected by secret header
app.post('/api/seed-admin', async (req, res) => {
    if (req.headers['x-seed-secret'] !== 'capachica-seed-2026') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    try {
        const { AppDataSource } = require('./config/base-de-datos');
        const Usuario = require('./modelos/auth/usuario.modelo');
        const bcrypt = require('bcryptjs');
        if (!AppDataSource.isInitialized) await AppDataSource.initialize();
        const repo = AppDataSource.getRepository(Usuario);
        const email = 'admin@capachica.pe';
        const hash = await bcrypt.hash('admin123', 10);
        let user = await repo.findOne({ where: { email } });
        if (user) {
            user.password_hash = hash;
            user.rol = 'admin';
            user.activo = true;
            await repo.save(user);
            return res.json({ ok: true, action: 'updated', email });
        }
        const nuevo = repo.create({ nombre: 'Admin Capachica', email, password_hash: hash, rol: 'admin', activo: true });
        await repo.save(nuevo);
        res.json({ ok: true, action: 'created', email });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(errorHandler);

async function start() {
    try {
        // TypeORM (gastronomía) — no fatal si falla
        initializeDatabase().catch(err =>
            console.warn('⚠️  TypeORM no disponible (gastronomía):', err.message)
        );
        // pg Pool (actividades/reservas) — obligatorio
        await waitForDB();

        const swaggerUi = require('swagger-ui-express');
        const YAML      = require('yamljs');
        const swagger   = YAML.load('./swagger.yaml');
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
        console.log('📚 Swagger: http://localhost:' + PORT + '/api-docs');

        app.listen(PORT, () => {
            console.log('🌍 Capachica API corriendo en puerto ' + PORT);
        });
    } catch (err) {
        console.error('❌ Error al iniciar:', err.message);
        process.exit(1);
    }
}

start();

module.exports = app;
