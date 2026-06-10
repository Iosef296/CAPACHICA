// Pool PostgreSQL para rutas de actividades/reservas
const { Pool } = require('pg');

const pool = new Pool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME     || 'capachica',
    user:     process.env.DB_USER     || 'capachica_user',
    password: process.env.DB_PASS     || 'capachica_pass_2026',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('Error en pool PostgreSQL:', err.message);
});

async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
}

async function waitForDB(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            await pool.query('SELECT 1');
            console.log('✅ PostgreSQL conectado');
            return;
        } catch (err) {
            console.log(`⏳ Esperando PostgreSQL... intento ${i + 1}/${retries}`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error('No se pudo conectar a PostgreSQL');
}

module.exports = { pool, query, waitForDB };
