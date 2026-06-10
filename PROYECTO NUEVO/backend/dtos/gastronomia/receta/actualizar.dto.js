// backend/dtos/gastronomia/receta/actualizar.dto.js
const { z } = require('zod');

const ActualizarRecetaDTO = z.object({
    titulo: z.string().min(3).optional(),
    descripcion: z.string().optional(),
    ingredientes_detallados: z.array(z.string()).optional(),
    pasos: z.array(z.string()).optional(),
    tiempo_preparacion: z.string().optional(),
    dificultad: z.enum(['fácil', 'medio', 'difícil']).optional(),
    pdf_url: z.string().url().optional(),
    video_url: z.string().url().optional(),
    foto: z.string().optional(),
});

module.exports = { ActualizarRecetaDTO };