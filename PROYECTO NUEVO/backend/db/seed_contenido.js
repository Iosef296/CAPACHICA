// Corre una sola vez para poblar comunidades/festividades/artesania/
// maestros/guias/hospedajes en Postgres a partir de los JSON originales
// (backend/data/*.json) -- pensado para levantar un entorno nuevo desde
// cero. Idempotente (ON CONFLICT DO NOTHING): correrlo de nuevo no
// duplica filas. Ejecutar desde backend/: `node db/seed_contenido.js`.
const fs = require('fs');
const path = require('path');
const { query } = require('../config/postgres');

const RECURSOS = [
  { archivo: 'comunidades.json', tabla: 'comunidades' },
  { archivo: 'festividades.json', tabla: 'festividades' },
  { archivo: 'artesania.json', tabla: 'artesania' },
  { archivo: 'maestros.json', tabla: 'maestros' },
  { archivo: 'guias.json', tabla: 'guias' },
  { archivo: 'hospedajes.json', tabla: 'hospedajes' },
];

async function crearTabla(tabla) {
  await query(`
    CREATE TABLE IF NOT EXISTS ${tabla} (
      id             BIGINT PRIMARY KEY,
      usuario_id     UUID,
      usuario_nombre TEXT,
      data           JSONB NOT NULL,
      created_at     TIMESTAMPTZ DEFAULT now()
    )
  `);
}

async function migrar() {
  for (const { archivo, tabla } of RECURSOS) {
    await crearTabla(tabla);
    const raw = fs.readFileSync(path.join(__dirname, '..', 'data', archivo), 'utf-8');
    const items = JSON.parse(raw);
    let insertados = 0;
    for (const item of items) {
      const { id, ...data } = item;
      const res = await query(
        `INSERT INTO ${tabla} (id, usuario_id, usuario_nombre, data) VALUES ($1, NULL, NULL, $2)
         ON CONFLICT (id) DO NOTHING`,
        [id, JSON.stringify(data)]
      );
      if (res.rowCount > 0) insertados++;
    }
    console.log(`${tabla}: ${insertados}/${items.length} filas insertadas`);
  }
  console.log('Migracion completa.');
  process.exit(0);
}

migrar().catch(err => { console.error('ERROR:', err); process.exit(1); });
