// backend/dtos/gastronomia/plato/filtro.dto.js
const { z } = require('zod');

const FiltroPlatoDTO = z.object({
    categoria: z.enum(['del_lago', 'ancestral', 'bebidas', 'postres']).optional(),
    precio_min: z.string().transform(Number).optional(),
    precio_max: z.string().transform(Number).optional(),
    disponible: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
    es_recomendado: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
});

module.exports = { FiltroPlatoDTO };