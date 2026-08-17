// backend/servicios/gastronomia/plato.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Plato = require('../../modelos/gastronomia/plato.modelo');
const Restaurante = require('../../modelos/gastronomia/restaurante.modelo');

class PlatoService {
    constructor() {
        this.platoRepo = AppDataSource.getRepository(Plato);
        this.restauranteRepo = AppDataSource.getRepository(Restaurante);
    }

    async crear(datos, usuarioId, usuarioRol) {
        // Verificar que el usuario sea dueño del restaurante o admin
        const restaurante = await this.restauranteRepo.findOne({ where: { id: datos.restaurante_id } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        if (restaurante.usuario_id !== usuarioId && usuarioRol !== 'admin') {
            throw new Error('No tienes permiso para crear platos en este restaurante');
        }

        const nuevo = this.platoRepo.create(datos);
        const guardado = await this.platoRepo.save(nuevo);
        return this._formatearRespuesta(guardado);
    }

    async obtenerPorRestaurante(restauranteId) {
        const platos = await this.platoRepo.find({
            where: { restaurante_id: restauranteId, disponible: true },
        });
        return platos.map(p => this._formatearRespuesta(p));
    }

    async obtenerPorId(id) {
        const plato = await this.platoRepo.findOne({ where: { id } });
        if (!plato) {
            throw new Error('Plato no encontrado');
        }
        return this._formatearRespuesta(plato);
    }

    async actualizar(id, datos, usuarioId, usuarioRol) {
        const plato = await this.platoRepo.findOne({ where: { id } });
        if (!plato) {
            throw new Error('Plato no encontrado');
        }
        // Verificar dueño o admin
        const restaurante = await this.restauranteRepo.findOne({ where: { id: plato.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && usuarioRol !== 'admin') {
            throw new Error('No tienes permiso para actualizar este plato');
        }

        Object.assign(plato, datos);
        plato.updated_at = new Date();
        const actualizado = await this.platoRepo.save(plato);
        return this._formatearRespuesta(actualizado);
    }

    async eliminar(id, usuarioId, usuarioRol) {
        const plato = await this.platoRepo.findOne({ where: { id } });
        if (!plato) {
            throw new Error('Plato no encontrado');
        }
        const restaurante = await this.restauranteRepo.findOne({ where: { id: plato.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && usuarioRol !== 'admin') {
            throw new Error('No tienes permiso para eliminar este plato');
        }
        await this.platoRepo.remove(plato);
    }

    _formatearRespuesta(plato) {
        return { ...plato };
    }
}

module.exports = { platoService: new PlatoService() };