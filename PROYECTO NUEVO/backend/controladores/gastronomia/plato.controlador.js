// backend/controladores/gastronomia/plato.controlador.js
const { CrearPlatoDTO } = require('../../dtos/gastronomia/plato/crear.dto');
const { ActualizarPlatoDTO } = require('../../dtos/gastronomia/plato/actualizar.dto');
const { FiltroPlatoDTO } = require('../../dtos/gastronomia/plato/filtro.dto');
const { platoService } = require('../../servicios/gastronomia/plato.servicio');

class PlatoControlador {
    async crear(req, res, next) {
        try {
            const datos = CrearPlatoDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await platoService.crear(datos, usuarioId, req.usuario.rol);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorRestaurante(req, res, next) {
        try {
            const { restauranteId } = req.params;
            const resultado = await platoService.obtenerPorRestaurante(restauranteId);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await platoService.obtenerPorId(id);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const datos = ActualizarPlatoDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await platoService.actualizar(id, datos, usuarioId, req.usuario.rol);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req, res, next) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;
            await platoService.eliminar(id, usuarioId, req.usuario.rol);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PlatoControlador();