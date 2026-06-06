// backend/dtos/auth/registro.dto.js
const { z } = require('zod');

const RegistroDTO = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
    email: z.string().email('Correo electrónico inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    telefono: z.string().optional(),
    rol: z.enum(['turista', 'proveedor']).default('turista'),
});

module.exports = { RegistroDTO };