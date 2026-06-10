// backend/dtos/gastronomia/plato/actualizar.dto.js
const { z } = require('zod');

const ActualizarPlatoDTO = z.object({
    nombre: z.string().min(3).optional(),
    descripcion: z.string().optional(),
    precio: z.number().positive().optional(),
    foto: z.string().optional(),
    ingredientes: z.array(z.string()).optional(),
    categoria: z.enum(['del_lago', 'ancestral', 'bebidas', 'postres']).optional(),
    temporada: z.enum(['todo_el_año', 'verano', 'invierno']).optional(),
    disponible: z.boolean().optional(),
    es_recomendado: z.boolean().optional(),
});

module.exports = { ActualizarPlatoDTO };