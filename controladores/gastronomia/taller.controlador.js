// backend/controladores/gastronomia/taller.controlador.js
const { CrearTallerDTO } = require('../../dtos/gastronomia/taller/crear.dto');
const { ActualizarTallerDTO } = require('../../dtos/gastronomia/taller/actualizar.dto');
const { FiltroTallerDTO } = require('../../dtos/gastronomia/taller/filtro.dto');
const { tallerService } = require('../../servicios/gastronomia/taller.servicio');

class TallerControlador {
    async crear(req, res, next) {
        try {
            const datos = CrearTallerDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await tallerService.crear(datos, usuarioId);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorRestaurante(req, res, next) {
        try {
            const { restauranteId } = req.params;
            const resultado = await tallerService.obtenerPorRestaurante(restauranteId);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await tallerService.obtenerPorId(id);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const datos = ActualizarTallerDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await tallerService.actualizar(id, datos, usuarioId);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req, res, next) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;
            await tallerService.eliminar(id, usuarioId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TallerControlador();