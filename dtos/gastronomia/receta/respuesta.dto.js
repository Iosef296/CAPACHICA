// backend/dtos/gastronomia/receta/respuesta.dto.js
const { z } = require('zod');

const RecetaRespuestaDTO = z.object({
    id: z.string().uuid(),
    plato_id: z.string().uuid(),
    titulo: z.string(),
    descripcion: z.string().nullable(),
    ingredientes_detallados: z.array(z.string()),
    pasos: z.array(z.string()),
    tiempo_preparacion: z.string().nullable(),
    dificultad: z.string().nullable(),
    pdf_url: z.string().nullable(),
    video_url: z.string().nullable(),
    foto: z.string().nullable(),
    created_at: z.date(),
    updated_at: z.date(),
});

module.exports = { RecetaRespuestaDTO };