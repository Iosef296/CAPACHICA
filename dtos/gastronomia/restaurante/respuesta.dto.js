// backend/dtos/gastronomia/restaurante/respuesta.dto.js
const { z } = require('zod');

const RestauranteRespuestaDTO = z.object({
    id: z.string().uuid(),
    nombre: z.string(),
    descripcion: z.string().nullable(),
    ubicacion: z.object({
        latitud: z.number(),
        longitud: z.number(),
    }),
    direccion: z.string(),
    whatsapp: z.string().nullable(),
    telefono: z.string().nullable(),
    email_contacto: z.string().email().nullable(),
    tipo_comida: z.string().nullable(),
    especialidades: z.array(z.string()),
    precio_promedio: z.number().nullable(),
    capacidad_mesas: z.number().nullable(),
    horarios: z.record(z.string()),
    fotos: z.array(z.string()),
    puntuacion_promedio: z.number().optional(),
    total_reseñas: z.number().optional(),
    aprobado: z.boolean(),
    activo: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

module.exports = { RestauranteRespuestaDTO };