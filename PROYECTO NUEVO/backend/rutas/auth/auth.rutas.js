// backend/rutas/auth/auth.rutas.js
const express = require('express');
const authControlador = require('../../controladores/auth/auth.controlador');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { LoginDTO } = require('../../dtos/auth/login.dto');
const { RegistroDTO } = require('../../dtos/auth/registro.dto');

const router = express.Router();

router.post('/registro', validacionMiddleware(RegistroDTO), authControlador.registro);
router.post('/login', validacionMiddleware(LoginDTO), authControlador.login);
router.post('/google', authControlador.google);
router.post('/refresh', authControlador.refresh);

module.exports = router;