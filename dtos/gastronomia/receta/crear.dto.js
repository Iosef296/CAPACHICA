// backend/dtos/gastronomia/receta/crear.dto.js
const { z } = require('zod');

const CrearRecetaDTO = z.object({
    plato_id: z.string().uuid('ID de plato inválido'),
    titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    descripcion: z.string().optional(),
    ingredientes_detallados: z.array(z.string()).optional(),
    pasos: z.array(z.string()).optional(),
    tiempo_preparacion: z.string().optional(),
    dificultad: z.enum(['fácil', 'medio', 'difícil']).optional(),
    pdf_url: z.string().url('URL del PDF inválida').optional(),
    video_url: z.string().url('URL del video inválida').optional(),
    foto: z.string().optional(),
});

module.exports = { CrearRecetaDTO };