require('dotenv').config();
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

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', mensaje: 'Capachica API unificada', timestamp: new Date() });
});

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(errorHandler);

async function start() {
    try {
        await Promise.all([initializeDatabase(), waitForDB()]);

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
