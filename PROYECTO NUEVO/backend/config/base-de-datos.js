// backend/config/base-de-datos.js
const { DataSource } = require('typeorm');
const path = require('path');

// Importar modelos
const Usuario = require('../modelos/auth/usuario.modelo');
const Restaurante = require('../modelos/gastronomia/restaurante.modelo');
const Plato = require('../modelos/gastronomia/plato.modelo');
const Taller = require('../modelos/gastronomia/taller.modelo');
const Receta = require('../modelos/gastronomia/receta.modelo');

const AppDataSource = new DataSource({
    type: 'postgres',
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
    database: process.env.DB_NAME     || 'postgres',
    entities: [Usuario, Restaurante, Plato, Taller, Receta],
    synchronize: true,
    logging: false,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    extra: { family: 4 },
    migrations: ['src/migrations/**/*.js'],
    subscribers: ['src/subscribers/**/*.js'],
});

async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Conexión a PostgreSQL establecida.');
        try {
            await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS postgis;');
            console.log('✅ Extensión PostGIS verificada.');
        } catch {
            console.log('⚠️  PostGIS no disponible, continuando sin ella.');
        }
    } catch (error) {
        console.error('❌ Error inicializando la base de datos:', error);
        throw error;
    }
}

module.exports = { AppDataSource, initializeDatabase };