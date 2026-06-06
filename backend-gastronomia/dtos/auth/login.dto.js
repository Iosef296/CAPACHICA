// backend/dtos/auth/login.dto.js
const { z } = require('zod');

const LoginDTO = z.object({
    email: z.string().email('Correo electrónico inválido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});

module.exports = { LoginDTO };