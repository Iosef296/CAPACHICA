// backend/rutas/usuarios/usuario.rutas.js
const express = require('express');
const usuarioControlador = require('../../controladores/usuarios/usuario.controlador');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { subirImagen } = require('../../middleware/subida-archivos.middleware');
const { ActualizarUsuarioDTO } = require('../../dtos/usuarios/actualizar.dto');

const router = express.Router();

router.get('/perfil', autenticacionMiddleware, usuarioControlador.obtenerPerfil);
router.put(
    '/perfil',
    autenticacionMiddleware,
    subirImagen,
    validacionMiddleware(ActualizarUsuarioDTO),
    usuarioControlador.actualizarPerfil
);

module.exports = router;