// backend/dtos/gastronomia/plato/crear.dto.js
const { z } = require('zod');

const CrearPlatoDTO = z.object({
    restaurante_id: z.string().uuid('ID de restaurante inválido'),
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    descripcion: z.string().optional(),
    precio: z.number().positive('El precio debe ser positivo'),
    foto: z.string().optional(),
    ingredientes: z.array(z.string()).optional(),
    categoria: z.enum(['del_lago', 'ancestral', 'bebidas', 'postres']).optional(),
    temporada: z.enum(['todo_el_año', 'verano', 'invierno']).optional(),
    es_recomendado: z.boolean().default(false),
});

module.exports = { CrearPlatoDTO };