// backend/dtos/gastronomia/restaurante/crear.dto.js
const { z } = require('zod');

const CrearRestauranteDTO = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    descripcion: z.string().optional(),
    ubicacion: z.object({
        latitud: z.number().min(-90).max(90),
        longitud: z.number().min(-180).max(180),
    }),
    direccion: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
    whatsapp: z.string().optional(),
    telefono: z.string().optional(),
    email_contacto: z.string().email('Correo de contacto inválido').optional(),
    tipo_comida: z.enum(['del_lago', 'ancestral', 'productos_locales', 'bebidas']).optional(),
    especialidades: z.array(z.string()).optional(),

    // MAGIA: z.preprocess toma el string de FormData y lo convierte a Número para contentar a Zod
    precio_promedio: z.preprocess((val) => (val === undefined || val === '' ? undefined : Number(val)), z.number().positive('El precio promedio debe ser positivo').optional()),
    capacidad_mesas: z.preprocess((val) => (val === undefined || val === '' ? undefined : Number(val)), z.number().int().positive('La capacidad debe ser un entero positivo').optional()),

    horarios: z.record(z.string()).optional(),

    fotos: z.array(z.string()).optional(),
});

module.exports = { CrearRestauranteDTO };