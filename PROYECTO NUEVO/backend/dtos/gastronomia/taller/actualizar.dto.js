// backend/dtos/gastronomia/taller/actualizar.dto.js
const { z } = require('zod');

const ActualizarTallerDTO = z.object({
    nombre: z.string().min(3).optional(),
    descripcion: z.string().optional(),
    duracion: z.string().optional(),
    precio: z.number().positive().optional(),
    capacidad_maxima: z.number().int().positive().optional(),
    horarios: z.array(z.string()).optional(),
    incluye_materiales: z.boolean().optional(),
    plato_principal: z.string().optional(),
    fotos: z.array(z.string()).optional(),
    disponible: z.boolean().optional(),
});

module.exports = { ActualizarTallerDTO };