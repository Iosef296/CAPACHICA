-- ── Seed data ────────────────────────────────────────────────────────────
-- Password: admin123  (bcrypt hash — change in prod)
INSERT INTO usuarios (email, password_hash, nombre, role) VALUES
  ('admin@capachica.pe', '$2b$10$X5PxKjNSk.VQxDfr.vqoXeNlZxJxXOgxkgJMhSJGGJOGz.W.8vGGC', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO destinos (nombre, descripcion, imagen_url, categoria, comunidad, destacado, orden) VALUES
  ('Playa de Llachón',     'La playa más hermosa de la península, con aguas cristalinas y vistas al lago Titicaca.',  '', 'playa',   'Llachón',   true, 1),
  ('Mirador del Amaru',    'Vista panorámica de 360° sobre el lago Titicaca y las islas cercanas.',                    '', 'mirador', 'Capachica', true, 2),
  ('Isla Ticonata',        'Isla sagrada accesible desde Capachica. Comunidad aimara con lodge comunitario.',           '', 'isla',    'Ticonata',  true, 3),
  ('Comunidad de Escallani','Tejidos y tradiciones vivas de la comunidad aimara.',                                      '', 'comunidad','Escallani', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO alojamientos (nombre, descripcion, tipo, precio_noche, capacidad, comunidad, orden) VALUES
  ('Lodge Titicaca Sunrise','Lodge con vista directa al lago, desayuno incluido.', 'lodge',     180.00, 4, 'Llachón',   1),
  ('Casa Rural Mamani',     'Hospedaje vivencial con familia local.',               'casa_rural',  80.00, 2, 'Capachica', 2),
  ('Cabaña del Pescador',   'Cabaña rústica frente al lago Titicaca.',             'cabaña',      60.00, 3, 'Escallani', 3)
ON CONFLICT DO NOTHING;

INSERT INTO gastronomia (nombre, descripcion, tipo, orden) VALUES
  ('Trucha al Horno',     'Trucha del Titicaca horneada con hierbas andinas.',    'plato_principal', 1),
  ('Sopa de Quinua',      'Sopa tradicional aimara con quinua y verduras frescas.','sopa',          2),
  ('Chicha Morada',       'Bebida ancestral de maíz morado con canela y clavo.',  'bebida',         3),
  ('Chuño Guisado',       'Papa deshidratada andina en guiso tradicional.',       'plato_principal', 4)
ON CONFLICT DO NOTHING;

INSERT INTO actividades (nombre, descripcion, tipo, duracion, dificultad, precio, orden) VALUES
  ('Kayak en el Titicaca', 'Recorre la bahía de Capachica en kayak.',              'deportes',  '2 horas',  'facil',    40.00, 1),
  ('Senderismo al Mirador','Caminata al mirador del Amaru con guía local.',        'naturaleza','3 horas',  'moderado', 25.00, 2),
  ('Pesca Artesanal',      'Aprende técnicas ancestrales de pesca aimara.',        'cultural',  '4 horas',  'facil',    30.00, 3),
  ('Ciclismo por la Península','Recorrido en bicicleta por comunidades locales.', 'aventura',  'Día completo','moderado',50.00, 4)
ON CONFLICT DO NOTHING;

INSERT INTO artesania (nombre, descripcion, tipo, comunidad, precio, orden) VALUES
  ('Manta Andina',         'Manta tejida a mano con lana de alpaca y motivos aimaras.','textil',  'Escallani', 120.00, 1),
  ('Cerámica Titicaca',    'Cerámica pintada a mano con diseños del lago.',            'ceramica','Capachica',  45.00, 2),
  ('Chullos Tradicionales','Gorros de lana tejidos por artesanas de Capachica.',       'tejido',  'Llachón',    35.00, 3)
ON CONFLICT DO NOTHING;

INSERT INTO festividades (nombre, descripcion, fecha_texto, mes, comunidad, orden) VALUES
  ('Fiesta de la Virgen de la Candelaria','Celebración con danzas y música andina.',  'Febrero',       2, 'Capachica', 1),
  ('Semana Santa Capachiquena',           'Procesiones y tradiciones religiosas únicas.','Abril',      4, 'Capachica', 2),
  ('Festival del Lago',                   'Festival de música, gastronomía y artesanía.','Agosto',    8, 'Capachica', 3),
  ('Inti Raymi',                          'Celebración del sol con rituales aimaras.',   'Junio',      6, 'Capachica', 4)
ON CONFLICT DO NOTHING;

INSERT INTO vivencial (nombre, descripcion, familia, comunidad, actividades_incluidas, precio_por_noche, orden) VALUES
  ('Experiencia Familia Quispe','Vive con familia pescadora. Pesca, cocina y tejido incluidos.','Familia Quispe','Llachón','Pesca artesanal, cocina tradicional, tejido', 95.00, 1),
  ('Casa de la Tejedora',       'Aprende tejido aimara con la familia Mamani.',              'Familia Mamani','Escallani','Tejido, visita a chacra, paseo en bote',    80.00, 2)
ON CONFLICT DO NOTHING;
