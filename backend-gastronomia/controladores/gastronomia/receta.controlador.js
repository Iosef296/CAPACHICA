// backend/controladores/gastronomia/receta.controlador.js
const { CrearRecetaDTO } = require('../../dtos/gastronomia/receta/crear.dto');
const { ActualizarRecetaDTO } = require('../../dtos/gastronomia/receta/actualizar.dto');
const { recetaService } = require('../../servicios/gastronomia/receta.servicio');

class RecetaControlador {
    async crear(req, res, next) {
        try {
            const datos = CrearRecetaDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await recetaService.crear(datos, usuarioId);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorPlato(req, res, next) {
        try {
            const { platoId } = req.params;
            const resultado = await recetaService.obtenerPorPlato(platoId);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await recetaService.obtenerPorId(id);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const datos = ActualizarRecetaDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await recetaService.actualizar(id, datos, usuarioId);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req, res, next) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;
            await recetaService.eliminar(id, usuarioId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async descargarPdf(req, res, next) {
        try {
            const { id } = req.params;
            const pdfUrl = await recetaService.obtenerPdfUrl(id);
            // Redirigir o enviar el archivo
            res.redirect(pdfUrl);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RecetaControlador();