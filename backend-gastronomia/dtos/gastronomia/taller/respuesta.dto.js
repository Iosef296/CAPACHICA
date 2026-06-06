// backend/dtos/gastronomia/taller/respuesta.dto.js
const { z } = require('zod');

const TallerRespuestaDTO = z.object({
    id: z.string().uuid(),
    restaurante_id: z.string().uuid(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    duracion: z.string().nullable(),
    precio: z.number(),
    capacidad_maxima: z.number().nullable(),
    horarios: z.array(z.string()),
    incluye_materiales: z.boolean(),
    plato_principal: z.string().nullable(),
    fotos: z.array(z.string()),
    disponible: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

module.exports = { TallerRespuestaDTO };