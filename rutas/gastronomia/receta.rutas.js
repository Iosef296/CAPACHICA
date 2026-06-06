// backend/rutas/gastronomia/receta.rutas.js
const express = require('express');
const recetaControlador = require('../../controladores/gastronomia/receta.controlador');
const { autenticacionMiddleware } = require('../../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../../middleware/autorizacion.middleware');
const { validacionMiddleware } = require('../../middleware/validacion.middleware');
const { subirImagen } = require('../../middleware/subida-archivos.middleware');
const { CrearRecetaDTO } = require('../../dtos/gastronomia/receta/crear.dto');
const { ActualizarRecetaDTO } = require('../../dtos/gastronomia/receta/actualizar.dto');

const router = express.Router();

// Rutas públicas
router.get('/plato/:platoId', recetaControlador.obtenerPorPlato);
router.get('/:id', recetaControlador.obtenerPorId);
router.get('/:id/pdf', recetaControlador.descargarPdf);

// Rutas protegidas
router.post(
    '/',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagen,
    validacionMiddleware(CrearRecetaDTO),
    recetaControlador.crear
);

router.put(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    subirImagen,
    validacionMiddleware(ActualizarRecetaDTO),
    recetaControlador.actualizar
);

router.delete(
    '/:id',
    autenticacionMiddleware,
    autorizacionMiddleware(['admin', 'proveedor']),
    recetaControlador.eliminar
);

module.exports = router;