-- ── Capachica Turismo · DB Schema ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS usuarios (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre      VARCHAR(255),
  role        VARCHAR(50) DEFAULT 'admin',
  activo      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destinos (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url  VARCHAR(500),
  categoria   VARCHAR(100),   -- playa, mirador, isla, comunidad
  comunidad   VARCHAR(100),
  destacado   BOOLEAN DEFAULT false,
  activo      BOOLEAN DEFAULT true,
  orden       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alojamientos (
  id                  SERIAL PRIMARY KEY,
  nombre              VARCHAR(255) NOT NULL,
  descripcion         TEXT,
  imagen_url          VARCHAR(500),
  tipo                VARCHAR(100),   -- lodge, casa_rural, hostal, cabaña
  precio_noche        DECIMAL(10,2),
  capacidad           INTEGER,
  comunidad           VARCHAR(100),
  contacto            VARCHAR(255),
  activo              BOOLEAN DEFAULT true,
  orden               INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gastronomia (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url  VARCHAR(500),
  ingredientes TEXT,
  tipo        VARCHAR(100),   -- plato_principal, sopa, bebida, postre
  activo      BOOLEAN DEFAULT true,
  orden       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS actividades (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url  VARCHAR(500),
  tipo        VARCHAR(100),   -- aventura, cultural, naturaleza, deportes
  duracion    VARCHAR(100),
  dificultad  VARCHAR(50),    -- facil, moderado, dificil
  precio      DECIMAL(10,2),
  activo      BOOLEAN DEFAULT true,
  orden       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artesania (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url  VARCHAR(500),
  tipo        VARCHAR(100),   -- textil, ceramica, tejido, madera
  artesano    VARCHAR(255),
  comunidad   VARCHAR(100),
  precio      DECIMAL(10,2),
  activo      BOOLEAN DEFAULT true,
  orden       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS festividades (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url  VARCHAR(500),
  fecha_texto VARCHAR(100),
  mes         INTEGER CHECK (mes BETWEEN 1 AND 12),
  comunidad   VARCHAR(100),
  activo      BOOLEAN DEFAULT true,
  orden       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vivencial (
  id                    SERIAL PRIMARY KEY,
  nombre                VARCHAR(255) NOT NULL,
  descripcion           TEXT,
  imagen_url            VARCHAR(500),
  familia               VARCHAR(255),
  comunidad             VARCHAR(100),
  actividades_incluidas TEXT,
  precio_por_noche      DECIMAL(10,2),
  activo                BOOLEAN DEFAULT true,
  orden                 INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacto_mensajes (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  telefono    VARCHAR(100),
  asunto      VARCHAR(255),
  mensaje     TEXT NOT NULL,
  leido       BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['destinos','alojamientos','gastronomia','actividades','artesania','festividades','vivencial']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_updated_at ON %I', t);
    EXECUTE format('CREATE TRIGGER trg_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t);
  END LOOP;
END $$;
