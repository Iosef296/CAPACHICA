// backend/rutas/gastronomia/restaurante.rutas.js
const express = require('express');
const restauranteControlador = require('../../controladores/gastronomia/restaurante.controlador');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { subirImagen, subirImagenes } = require('../../middleware/subida-archivos.middleware');
const { CrearRestauranteDTO } = require('../../dtos/gastronomia/restaurante/crear.dto');
const { ActualizarRestauranteDTO } = require('../../dtos/gastronomia/restaurante/actualizar.dto');
const { FiltroRestauranteDTO } = require('../../dtos/gastronomia/restaurante/filtro.dto');

const router = express.Router();

// Rutas públicas
router.get('/', validacionMiddleware(FiltroRestauranteDTO), restauranteControlador.obtenerTodos);
router.get('/:id', restauranteControlador.obtenerPorId);

// Rutas protegidas
router.post(
    '/',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagenes,
    validacionMiddleware(CrearRestauranteDTO),
    restauranteControlador.crear
);

router.put(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagenes,
    validacionMiddleware(ActualizarRestauranteDTO),
    restauranteControlador.actualizar
);

router.delete(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    restauranteControlador.eliminar
);

// Solo admin puede aprobar
router.post(
    '/:id/aprobar',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin']),
    restauranteControlador.aprobar
);

module.exports = router;