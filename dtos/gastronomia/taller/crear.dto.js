// backend/dtos/gastronomia/taller/crear.dto.js
const { z } = require('zod');

const CrearTallerDTO = z.object({
    restaurante_id: z.string().uuid('ID de restaurante inválido'),
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    descripcion: z.string().optional(),
    duracion: z.string().optional(),
    precio: z.number().positive('El precio debe ser positivo'),
    capacidad_maxima: z.number().int().positive().optional(),
    horarios: z.array(z.string()).optional(),
    incluye_materiales: z.boolean().default(true),
    plato_principal: z.string().optional(),
    fotos: z.array(z.string()).optional(),
});

module.exports = { CrearTallerDTO };