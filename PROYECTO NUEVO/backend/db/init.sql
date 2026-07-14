CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Actividades ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS actividades (
    id          TEXT PRIMARY KEY,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    categoria   TEXT NOT NULL CHECK (categoria IN ('acuatico','terrestre','cultural','gastro')),
    dificultad  TEXT NOT NULL CHECK (dificultad IN ('facil','moderado','exigente')),
    duracion    TEXT NOT NULL CHECK (duracion IN ('2h','medio','completo')),
    precio      INTEGER NOT NULL,
    emoji       TEXT,
    activo      BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT now()
);

INSERT INTO actividades (id, nombre, descripcion, categoria, dificultad, duracion, precio, emoji) VALUES
    ('kayak',      'Kayak en el Titicaca',        'Navega las aguas sagradas del lago más alto del mundo.', 'acuatico',  'moderado', 'medio',  60, '🚣'),
    ('pesca',      'Pesca Artesanal al Amanecer', 'Acompaña a pescadores locales en balsas de totora.',    'acuatico',  'facil',    '2h',     35, '🎣'),
    ('chicha',     'Chicha de Jora Artesanal',    'Elabora la bebida ceremonial andina.',                  'gastro',    'facil',    '2h',     30, '🍺'),
    ('fotografia', 'Tour de Fotografía',          'Miradores secretos con fotógrafo profesional.',         'terrestre', 'facil',    'medio',  45, '📸')
ON CONFLICT (id) DO NOTHING;

-- ── Reservas ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservas (
    id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre              TEXT NOT NULL,
    email               TEXT NOT NULL,
    fecha_visita        DATE NOT NULL,
    personas            INTEGER NOT NULL DEFAULT 1,
    idioma              TEXT DEFAULT 'Español',
    actividad           TEXT NOT NULL,
    actividad_id        TEXT REFERENCES actividades(id) ON DELETE SET NULL,
    notas               TEXT,
    precio_total        INTEGER NOT NULL DEFAULT 0,
    es_paquete          BOOLEAN DEFAULT false,
    actividades_paquete JSONB,
    estado              TEXT DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente','confirmada','cancelada','completada')),
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reservas_email  ON reservas(email);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha  ON reservas(fecha_visita);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reservas_updated_at ON reservas;
CREATE TRIGGER reservas_updated_at
    BEFORE UPDATE ON reservas
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Contenido CMS (comunidades, festividades, artesania, maestros, guias, hospedajes) ──
-- Antes vivian como archivos JSON planos en backend/data/, escritos con
-- fs.writeFileSync -- se perdian en cada redeploy porque el filesystem
-- del contenedor es efimero y se reconstruye desde git. Cada item se
-- guarda como una fila con sus campos propios en `data` (JSONB); ver
-- rutas/utilidades/sqlCrud.rutas.js. Los archivos JSON originales
-- quedan en backend/data/ solo como fuente de seed para entornos
-- nuevos (backend/db/seed_contenido.js).
CREATE TABLE IF NOT EXISTS comunidades (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS festividades (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS artesania (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS maestros (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS guias (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hospedajes (
    id             BIGINT PRIMARY KEY,
    usuario_id     UUID,
    usuario_nombre TEXT,
    data           JSONB NOT NULL,
    created_at     TIMESTAMPTZ DEFAULT now()
);

-- ── Historias (estilo WhatsApp Status) ──────────────────────────────────────
-- El usuario elige cuánto dura su historia (duracion_horas) al subirla;
-- expires_at se calcula una sola vez al crear. El GET filtra por
-- expires_at > now(), así que las vencidas simplemente dejan de listarse
-- (no hace falta un cron que las borre).
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
);
