// backend/controladores/gastronomia/restaurante.controlador.js
const { CrearRestauranteDTO } = require('../../dtos/gastronomia/restaurante/crear.dto');
const { ActualizarRestauranteDTO } = require('../../dtos/gastronomia/restaurante/actualizar.dto');
const { FiltroRestauranteDTO } = require('../../dtos/gastronomia/restaurante/filtro.dto');
const { restauranteService } = require('../../servicios/gastronomia/restaurante.servicio');

class RestauranteControlador {
    async crear(req, res, next) {
        try {
            const datos = CrearRestauranteDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await restauranteService.crear(datos, usuarioId);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async obtenerTodos(req, res, next) {
        try {
            const filtros = FiltroRestauranteDTO.parse(req.query);
            const resultados = await restauranteService.obtenerTodos(filtros);
            res.json(resultados);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await restauranteService.obtenerPorId(id);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req, res, next) {
        try {
            const { id } = req.params;
            const datos = ActualizarRestauranteDTO.parse(req.body);
            const usuarioId = req.usuario.id;
            const resultado = await restauranteService.actualizar(id, datos, usuarioId, req.usuario.rol);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req, res, next) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;
            await restauranteService.eliminar(id, usuarioId, req.usuario.rol);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async aprobar(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await restauranteService.aprobar(id);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RestauranteControlador();