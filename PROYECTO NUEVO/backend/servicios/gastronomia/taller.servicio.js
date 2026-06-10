// backend/servicios/gastronomia/taller.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Taller = require('../../modelos/gastronomia/taller.modelo');
const Restaurante = require('../../modelos/gastronomia/restaurante.modelo');

class TallerService {
    constructor() {
        this.tallerRepo = AppDataSource.getRepository(Taller);
        this.restauranteRepo = AppDataSource.getRepository(Restaurante);
    }

    async crear(datos, usuarioId) {
        const restaurante = await this.restauranteRepo.findOne({ where: { id: datos.restaurante_id } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para crear talleres en este restaurante');
        }

        const nuevo = this.tallerRepo.create(datos);
        const guardado = await this.tallerRepo.save(nuevo);
        return this._formatearRespuesta(guardado);
    }

    async obtenerPorRestaurante(restauranteId) {
        const talleres = await this.tallerRepo.find({
            where: { restaurante_id: restauranteId, disponible: true },
        });
        return talleres.map(t => this._formatearRespuesta(t));
    }

    async obtenerPorId(id) {
        const taller = await this.tallerRepo.findOne({ where: { id } });
        if (!taller) {
            throw new Error('Taller no encontrado');
        }
        return this._formatearRespuesta(taller);
    }

    async actualizar(id, datos, usuarioId) {
        const taller = await this.tallerRepo.findOne({ where: { id } });
        if (!taller) {
            throw new Error('Taller no encontrado');
        }
        const restaurante = await this.restauranteRepo.findOne({ where: { id: taller.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para actualizar este taller');
        }

        Object.assign(taller, datos);
        taller.updated_at = new Date();
        const actualizado = await this.tallerRepo.save(taller);
        return this._formatearRespuesta(actualizado);
    }

    async eliminar(id, usuarioId) {
        const taller = await this.tallerRepo.findOne({ where: { id } });
        if (!taller) {
            throw new Error('Taller no encontrado');
        }
        const restaurante = await this.restauranteRepo.findOne({ where: { id: taller.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para eliminar este taller');
        }
        await this.tallerRepo.remove(taller);
    }

    _formatearRespuesta(taller) {
        return { ...taller };
    }
}

module.exports = { tallerService: new TallerService() };