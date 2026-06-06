// backend/dtos/gastronomia/restaurante/actualizar.dto.js
const { z } = require('zod');

const ActualizarRestauranteDTO = z.object({
    nombre: z.string().min(3).optional(),
    descripcion: z.string().optional(),
    ubicacion: z.object({
        latitud: z.number().min(-90).max(90),
        longitud: z.number().min(-180).max(180),
    }).optional(),
    direccion: z.string().min(5).optional(),
    whatsapp: z.string().optional(),
    telefono: z.string().optional(),
    email_contacto: z.string().email().optional(),
    tipo_comida: z.enum(['del_lago', 'ancestral', 'productos_locales', 'bebidas']).optional(),
    especialidades: z.array(z.string()).optional(),

    // Aplicamos la misma magia aquí
    precio_promedio: z.preprocess((val) => (val === undefined || val === '' ? undefined : Number(val)), z.number().positive().optional()),
    capacidad_mesas: z.preprocess((val) => (val === undefined || val === '' ? undefined : Number(val)), z.number().int().positive().optional()),

    horarios: z.record(z.string()).optional(),
    fotos: z.array(z.string()).optional(),
    activo: z.boolean().optional(),
});

module.exports = { ActualizarRestauranteDTO };