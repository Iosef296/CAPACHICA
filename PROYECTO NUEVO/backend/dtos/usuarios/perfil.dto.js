// backend/dtos/usuarios/perfil.dto.js
const { z } = require('zod');

const PerfilDTO = z.object({
    id: z.string().uuid(),
    nombre: z.string(),
    email: z.string().email(),
    rol: z.string(),
    telefono: z.string().nullable(),
    foto: z.string().nullable(),
    activo: z.boolean(),
    fecha_registro: z.date(),
});

module.exports = { PerfilDTO };