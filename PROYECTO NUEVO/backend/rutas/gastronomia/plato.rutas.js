// backend/rutas/gastronomia/plato.rutas.js
const express = require('express');
const platoControlador = require('../../controladores/gastronomia/plato.controlador');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { subirImagen } = require('../../middleware/subida-archivos.middleware');
const { CrearPlatoDTO } = require('../../dtos/gastronomia/plato/crear.dto');
const { ActualizarPlatoDTO } = require('../../dtos/gastronomia/plato/actualizar.dto');
const { FiltroPlatoDTO } = require('../../dtos/gastronomia/plato/filtro.dto');

const router = express.Router();

// Rutas públicas
router.get('/restaurante/:restauranteId', platoControlador.obtenerPorRestaurante);
router.get('/:id', platoControlador.obtenerPorId);

// Rutas protegidas
router.post(
    '/',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagen,
    validacionMiddleware(CrearPlatoDTO),
    platoControlador.crear
);

router.put(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagen,
    validacionMiddleware(ActualizarPlatoDTO),
    platoControlador.actualizar
);

router.delete(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    platoControlador.eliminar
);

module.exports = router;