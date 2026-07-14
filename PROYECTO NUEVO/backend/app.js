require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');
const path     = require('path');

const { initializeDatabase } = require('./config/base-de-datos');
const { waitForDB, query }   = require('./config/postgres');
const { errorHandler }       = require('./middleware/error-handler');
const { attachWS }           = require('./ws');

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

// Rutas — Comunidades
const comunidadesRoutes = require('./rutas/comunidades/comunidades.rutas');

// Rutas — Artesanía / Guías / Hospedajes
const { artesaniaRoutes, maestrosRoutes, guiasRoutes, hospedajesRoutes } = require('./rutas/contenido/contenido.rutas');

// Rutas — Upload
const uploadRoutes = require('./rutas/upload.rutas');

// Rutas — Historias (estilo WhatsApp Status)
const historiasRoutes = require('./rutas/historias.rutas');

// Rutas — Configuración de la app (etiquetas editables sin rebuild)
const configuracionRoutes = require('./rutas/configuracion.rutas');

// Rutas — Ubicaciones del mapa (pines editables por el admin desde la app)
const ubicacionesRoutes = require('./rutas/ubicaciones.rutas');

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

// ── Comunidades ────────────────────────────────────
app.use('/api/comunidades', comunidadesRoutes);

// ── Artesanía / Guías / Hospedajes ─────────────────
app.use('/api/artesania',  artesaniaRoutes);
app.use('/api/maestros',   maestrosRoutes);
app.use('/api/guias',      guiasRoutes);
app.use('/api/hospedajes', hospedajesRoutes);

// ── Upload ─────────────────────────────────────────
app.use('/api/upload', uploadRoutes);

// ── Historias ──────────────────────────────────────
app.use('/api/historias', historiasRoutes);

// ── Configuración de la app ────────────────────────
app.use('/api/configuracion', configuracionRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', mensaje: 'Capachica API unificada', timestamp: new Date() });
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

        // Tabla de historias -- CREATE TABLE IF NOT EXISTS, no rompe si ya existe.
        // No hay sistema de migraciones formal en este backend; el resto de
        // tablas (comunidades, festividades, etc.) se crearon a mano por
        // consola de Railway, esta se autocrea al bootear para no depender de eso.
        await query(`
            CREATE TABLE IF NOT EXISTS historias (
                id             BIGINT PRIMARY KEY,
                usuario_id     UUID NOT NULL,
                usuario_nombre TEXT NOT NULL,
                usuario_foto   TEXT,
                media_url      TEXT NOT NULL,
                tipo           TEXT NOT NULL CHECK (tipo IN ('foto', 'video')),
                duracion_horas INT NOT NULL,
                created_at     TIMESTAMPTZ DEFAULT now(),
                expires_at     TIMESTAMPTZ NOT NULL
            )
        `).catch(err => console.warn('⚠️  No se pudo crear tabla historias:', err.message));

        await query(`
            CREATE TABLE IF NOT EXISTS historia_likes (
                historia_id BIGINT NOT NULL REFERENCES historias(id) ON DELETE CASCADE,
                usuario_id  UUID NOT NULL,
                created_at  TIMESTAMPTZ DEFAULT now(),
                PRIMARY KEY (historia_id, usuario_id)
            )
        `).catch(err => console.warn('⚠️  No se pudo crear tabla historia_likes:', err.message));

        await query(`
            CREATE TABLE IF NOT EXISTS configuracion_app (
                clave TEXT PRIMARY KEY,
                valor TEXT NOT NULL
            )
        `).catch(err => console.warn('⚠️  No se pudo crear tabla configuracion_app:', err.message));

        await query(`
            CREATE TABLE IF NOT EXISTS ubicaciones (
                id          BIGSERIAL PRIMARY KEY,
                titulo      TEXT NOT NULL,
                descripcion TEXT,
                latitud     DOUBLE PRECISION NOT NULL,
                longitud    DOUBLE PRECISION NOT NULL,
                creado_por  UUID,
                created_at  TIMESTAMPTZ DEFAULT now()
            )
        `).catch(err => console.warn('⚠️  No se pudo crear tabla ubicaciones:', err.message));

        // Semilla única: si la tabla está vacía (primera vez), la poblamos con
        // los pines que antes vivían hardcodeados en el mobile (src/data/mock.ts)
        // para que el mapa no arranque vacío. De ahí en más el admin la administra.
        await query(`
            INSERT INTO ubicaciones (titulo, latitud, longitud)
            SELECT * FROM (VALUES
                ('Llachón', -15.7203, -69.7039),
                ('Ccotos', -15.6092, -69.8261),
                ('Capachica Centro', -15.6428, -69.8378),
                ('Siale', -15.6717, -69.7572),
                ('Escallani', -15.5853, -69.8156)
            ) AS semilla(titulo, latitud, longitud)
            WHERE NOT EXISTS (SELECT 1 FROM ubicaciones)
        `).catch(err => console.warn('⚠️  No se pudo sembrar tabla ubicaciones:', err.message));

        const swaggerUi = require('swagger-ui-express');
        const YAML      = require('yamljs');
        const swagger   = YAML.load('./swagger.yaml');
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
        console.log('📚 Swagger: http://localhost:' + PORT + '/api-docs');

        const server = app.listen(PORT, () => {
            console.log('🌍 Capachica API corriendo en puerto ' + PORT);
        });
        attachWS(server);
        console.log('🔌 WebSocket (push real-time) en /ws');
    } catch (err) {
        console.error('❌ Error al iniciar:', err.message);
        process.exit(1);
    }
}

start();

module.exports = app;
