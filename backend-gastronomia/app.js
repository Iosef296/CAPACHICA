// backend/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { initializeDatabase } = require('./config/base-de-datos');
const { errorHandler } = require('./middleware/error-handler'); // crearemos uno simple
const path = require('path');

// Importar rutas
const authRoutes = require('./rutas/auth/auth.rutas');
const restauranteRoutes = require('./rutas/gastronomia/restaurante.rutas');
const platoRoutes = require('./rutas/gastronomia/plato.rutas');
const tallerRoutes = require('./rutas/gastronomia/taller.rutas');
const recetaRoutes = require('./rutas/gastronomia/receta.rutas');
const usuarioRoutes = require('./rutas/usuarios/usuario.rutas');

const app = express();


// Swaawer
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


// Middlewares globales
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Servir archivos estáticos (para subir fotos)
// Agrega este bloque para servir las imágenes saltando el bloqueo de SameOrigin
app.use('/uploads', (req, res, next) => {
    // Estas dos cabeceras son la clave mágica para quitar el error ERR_BLOCKED_BY_RESPONSE
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Registrar rutas
app.use('/api/auth', authRoutes);
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/platos', platoRoutes);
app.use('/api/talleres', tallerRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor de gastronomía funcionando' });
});

// Manejador de errores global (simple)
app.use(errorHandler);

// Inicializar base de datos y arrancar servidor
const PORT = process.env.PORT || 3000;

initializeDatabase()
    .then(() => {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        console.log('📚 Swagger UI disponible en http://localhost:3000/api-docs');

        app.listen(PORT, () => {
            console.log(`🍽️ Servidor de gastronomía corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar con la base de datos:', err);
        process.exit(1);
    });

module.exports = app;