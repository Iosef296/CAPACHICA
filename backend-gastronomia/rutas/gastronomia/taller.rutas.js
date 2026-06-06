// backend/rutas/gastronomia/taller.rutas.js
const express = require('express');
const tallerControlador = require('../../controladores/gastronomia/taller.controlador');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { subirImagenes } = require('../../middleware/subida-archivos.middleware');
const { CrearTallerDTO } = require('../../dtos/gastronomia/taller/crear.dto');
const { ActualizarTallerDTO } = require('../../dtos/gastronomia/taller/actualizar.dto');
const { FiltroTallerDTO } = require('../../dtos/gastronomia/taller/filtro.dto');

const router = express.Router();

// Rutas públicas
router.get('/restaurante/:restauranteId', tallerControlador.obtenerPorRestaurante);
router.get('/:id', tallerControlador.obtenerPorId);

// Rutas protegidas
router.post(
    '/',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagenes,
    validacionMiddleware(CrearTallerDTO),
    tallerControlador.crear
);

router.put(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagenes,
    validacionMiddleware(ActualizarTallerDTO),
    tallerControlador.actualizar
);

router.delete(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    tallerControlador.eliminar
);

module.exports = router;