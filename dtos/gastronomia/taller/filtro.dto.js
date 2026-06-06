// backend/dtos/gastronomia/taller/filtro.dto.js
const { z } = require('zod');

const FiltroTallerDTO = z.object({
    precio_min: z.string().transform(Number).optional(),
    precio_max: z.string().transform(Number).optional(),
    duracion: z.string().optional(),
    disponible: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
});

module.exports = { FiltroTallerDTO };