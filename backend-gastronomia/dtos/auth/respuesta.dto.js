// backend/dtos/auth/respuesta.dto.js
const { z } = require('zod');

const AuthRespuestaDTO = z.object({
    usuario: z.object({
        id: z.string().uuid(),
        nombre: z.string(),
        email: z.string().email(),
        rol: z.string(),
    }),
    accessToken: z.string(),
    refreshToken: z.string(),
});

module.exports = { AuthRespuestaDTO };