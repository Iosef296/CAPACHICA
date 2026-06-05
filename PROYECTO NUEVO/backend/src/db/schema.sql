CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS familias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL,
  comunidad VARCHAR(100) NOT NULL,
  descripcion TEXT,
  especialidad VARCHAR(50) CHECK (especialidad IN ('pesca','tejido','agricultura','cocina')),
  foto_url TEXT,
  habitaciones INT DEFAULT 1,
  idiomas TEXT[] DEFAULT ARRAY['español'],
  servicios TEXT[] DEFAULT ARRAY['desayuno'],
  calificacion DECIMAL(2,1) DEFAULT 5.0,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(20) UNIQUE NOT NULL DEFAULT 'RES-' || UPPER(SUBSTR(uuid_generate_v4()::TEXT, 1, 8)),
  familia_id UUID REFERENCES familias(id),
  nombre_huesped VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefono VARCHAR(20),
  fecha_llegada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  num_personas INT NOT NULL DEFAULT 1,
  actividad_preferida VARCHAR(50),
  precio_total DECIMAL(10,2),
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente','confirmada','cancelada','completada')),
  metodo_pago VARCHAR(20) CHECK (metodo_pago IN ('yape','paypal','tarjeta')),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artesanias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(150) NOT NULL,
  tipo VARCHAR(50) CHECK (tipo IN ('textil','bordado','ceramica','joyeria','instrumento')),
  descripcion TEXT,
  tecnica VARCHAR(100),
  materiales TEXT,
  precio_soles DECIMAL(10,2),
  precio_usd DECIMAL(10,2),
  imagen_url TEXT,
  emoji VARCHAR(10),
  artesana_nombre VARCHAR(100),
  artesana_comunidad VARCHAR(100),
  artesana_experiencia INT,
  stock INT DEFAULT 1,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE artesanias ADD COLUMN IF NOT EXISTS emoji VARCHAR(10);

CREATE TABLE IF NOT EXISTS talleres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(50),
  duracion_horas DECIMAL(3,1),
  precio_soles DECIMAL(10,2),
  incluye TEXT,
  max_personas INT DEFAULT 10,
  activo BOOLEAN DEFAULT TRUE
);

-- DATOS DE EJEMPLO
INSERT INTO familias (nombre, comunidad, especialidad, descripcion, habitaciones, idiomas, servicios, calificacion) VALUES
('Familia Quispe', 'Llachón', 'pesca', 'Pescadores artesanales. Pesca artesanal al amanecer en el lago.', 2, ARRAY['español','aimara'], ARRAY['desayuno','almuerzo','cena','pesca'], 4.9),
('Familia Mamani', 'Capachica Centro', 'tejido', 'Artesanas de tejidos. Mejor vista al lago Titicaca.', 2, ARRAY['español','aimara','quechua'], ARRAY['desayuno','almuerzo','cena','tejido'], 5.0),
('Familia Coila', 'Siale', 'agricultura', 'Agricultores orgánicos. Siembra de quinua y papas nativas.', 3, ARRAY['español','quechua'], ARRAY['desayuno','almuerzo','cena','agricultura'], 4.8)
ON CONFLICT DO NOTHING;

INSERT INTO talleres (nombre, tipo, duracion_horas, precio_soles, incluye, max_personas) VALUES
('Taller de Tejido en Telar', 'tejido', 2.5, 35, 'Materiales y pieza terminada', 8),
('Taller de Bordado Andino', 'bordado', 3.0, 40, 'Materiales y pieza terminada', 8),
('Taller de Cerámica Aymara', 'ceramica', 2.0, 30, 'Materiales y pieza terminada', 6),
('Taller de Teñido Natural', 'tenido', 2.0, 35, 'Materiales y prenda teñida', 6)
ON CONFLICT DO NOTHING;
