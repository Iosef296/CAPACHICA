// backend/dtos/usuarios/actualizar.dto.js
const { z } = require('zod');

const ActualizarUsuarioDTO = z.object({
    nombre: z.string().min(2).max(100).optional(),
    telefono: z.string().optional(),
    foto: z.string().optional(),
});

module.exports = { ActualizarUsuarioDTO };