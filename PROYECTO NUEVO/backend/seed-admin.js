// One-time script to create admin user in Supabase
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  family: 4,
});

async function seed() {
  const email = 'admin@capachica.pe';
  const password = process.env.ADMIN_PASS || 'admin123';
  const nombre = 'Admin Capachica';

  const hash = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    // Check if table exists (TypeORM may not have migrated yet)
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'usuario'
      )
    `);
    if (!tableCheck.rows[0].exists) {
      console.error('Table "usuario" does not exist. Start the backend first so TypeORM creates it.');
      process.exit(1);
    }

    // Upsert admin user
    const result = await client.query(`
      INSERT INTO usuario (nombre, email, password_hash, rol, activo)
      VALUES ($1, $2, $3, 'admin', true)
      ON CONFLICT (email) DO UPDATE
        SET password_hash = EXCLUDED.password_hash,
            rol = 'admin',
            activo = true
      RETURNING id, email, rol
    `, [nombre, email, hash]);

    console.log('Admin user created/updated:', result.rows[0]);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(e => { console.error(e.message); process.exit(1); });
