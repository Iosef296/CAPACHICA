// backend/dtos/gastronomia/plato/respuesta.dto.js
const { z } = require('zod');

const PlatoRespuestaDTO = z.object({
    id: z.string().uuid(),
    restaurante_id: z.string().uuid(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    precio: z.number(),
    foto: z.string().nullable(),
    ingredientes: z.array(z.string()),
    categoria: z.string().nullable(),
    temporada: z.string().nullable(),
    disponible: z.boolean(),
    es_recomendado: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

module.exports = { PlatoRespuestaDTO };