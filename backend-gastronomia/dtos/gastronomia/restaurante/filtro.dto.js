// backend/dtos/gastronomia/restaurante/filtro.dto.js
const { z } = require('zod');

const FiltroRestauranteDTO = z.object({
    tipo_comida: z.enum(['del_lago', 'ancestral', 'productos_locales', 'bebidas']).optional(),
    precio_min: z.string().transform(Number).optional(),
    precio_max: z.string().transform(Number).optional(),
    latitud: z.string().transform(Number).optional(),
    longitud: z.string().transform(Number).optional(),
    radio: z.string().transform(Number).optional(), // en km
    solo_aprobados: z.enum(['true', 'false']).transform(v => v === 'true').default('false'),
    limit: z.string().transform(Number).default('10'),
    offset: z.string().transform(Number).default('0'),
});

module.exports = { FiltroRestauranteDTO };