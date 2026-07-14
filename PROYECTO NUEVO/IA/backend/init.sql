-- Tablas para IA Capachica Turismo
-- Ejecutar una vez en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS ia_conocimiento (
    id        SERIAL PRIMARY KEY,
    categoria TEXT NOT NULL DEFAULT 'general',
    pregunta  TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Config global: contexto_base, nombre_ia, widget, etc.
CREATE TABLE IF NOT EXISTS ia_config (
    key   TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'
);

INSERT INTO ia_config (key, value) VALUES
    ('contexto_base', '"Eres Inti, un asistente virtual amable y experto en turismo de Capachica, Puno, Perú. Ayudas a los visitantes con información sobre destinos, actividades, hospedaje, gastronomía y reservas. Responde de forma cálida, concisa y útil."'),
    ('nombre_ia',     '"Inti"'),
    ('descripcion',   '"Asistente de turismo de Capachica"'),
    ('widget',        '{"bot_name":"Inti · Asistente IA","bot_subtitle":"Capachica Turismo","welcome_msg":"¡Hola! Soy Inti, tu guía virtual de Capachica 🌊\n¿En qué te puedo ayudar?","quick_prompts":["¿Qué es Capachica?","¿Cómo llegar?","Quiero reservar"],"placeholder":"Escribe tu pregunta..."}')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS ia_reservaciones (
    id            BIGINT PRIMARY KEY,
    nombre        TEXT,
    contacto      TEXT,
    fecha_llegada DATE,
    dias_estancia INTEGER DEFAULT 1,
    personas      INTEGER DEFAULT 1,
    hospedaje     TEXT,
    estado        TEXT DEFAULT 'pendiente',
    idioma        TEXT DEFAULT 'es',
    origen        TEXT DEFAULT 'formulario',
    creado        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ia_paginas (
    id          SERIAL PRIMARY KEY,
    titulo      TEXT NOT NULL DEFAULT '',
    slug        TEXT UNIQUE NOT NULL DEFAULT '',
    descripcion TEXT DEFAULT '',
    publicado   BOOLEAN DEFAULT true,
    secciones   JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS ia_contenido (
    slug TEXT PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS ia_siteconfig (
    id     INTEGER PRIMARY KEY DEFAULT 1,
    navbar JSONB DEFAULT '{}',
    footer JSONB DEFAULT '{}'
);

INSERT INTO ia_siteconfig (id, navbar, footer) VALUES (1, '{}', '{}')
ON CONFLICT (id) DO NOTHING;
