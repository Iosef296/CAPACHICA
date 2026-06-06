// backend/servicios/gastronomia/receta.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Receta = require('../../modelos/gastronomia/receta.modelo');
const Plato = require('../../modelos/gastronomia/plato.modelo');
const Restaurante = require('../../modelos/gastronomia/restaurante.modelo');

class RecetaService {
    constructor() {
        this.recetaRepo = AppDataSource.getRepository(Receta);
        this.platoRepo = AppDataSource.getRepository(Plato);
        this.restauranteRepo = AppDataSource.getRepository(Restaurante);
    }

    async crear(datos, usuarioId) {
        // Verificar que el usuario sea dueño del plato (a través del restaurante)
        const plato = await this.platoRepo.findOne({ where: { id: datos.plato_id } });
        if (!plato) {
            throw new Error('Plato no encontrado');
        }
        const restaurante = await this.restauranteRepo.findOne({ where: { id: plato.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para crear recetas de este plato');
        }

        const nueva = this.recetaRepo.create(datos);
        const guardada = await this.recetaRepo.save(nueva);
        return this._formatearRespuesta(guardada);
    }

    async obtenerPorPlato(platoId) {
        const receta = await this.recetaRepo.findOne({ where: { plato_id: platoId } });
        if (!receta) {
            return null;
        }
        return this._formatearRespuesta(receta);
    }

    async obtenerPorId(id) {
        const receta = await this.recetaRepo.findOne({ where: { id } });
        if (!receta) {
            throw new Error('Receta no encontrada');
        }
        return this._formatearRespuesta(receta);
    }

    async actualizar(id, datos, usuarioId) {
        const receta = await this.recetaRepo.findOne({ where: { id } });
        if (!receta) {
            throw new Error('Receta no encontrada');
        }
        const plato = await this.platoRepo.findOne({ where: { id: receta.plato_id } });
        const restaurante = await this.restauranteRepo.findOne({ where: { id: plato.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para actualizar esta receta');
        }

        Object.assign(receta, datos);
        receta.updated_at = new Date();
        const actualizada = await this.recetaRepo.save(receta);
        return this._formatearRespuesta(actualizada);
    }

    async eliminar(id, usuarioId) {
        const receta = await this.recetaRepo.findOne({ where: { id } });
        if (!receta) {
            throw new Error('Receta no encontrada');
        }
        const plato = await this.platoRepo.findOne({ where: { id: receta.plato_id } });
        const restaurante = await this.restauranteRepo.findOne({ where: { id: plato.restaurante_id } });
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para eliminar esta receta');
        }
        await this.recetaRepo.remove(receta);
    }

    async obtenerPdfUrl(id) {
        const receta = await this.recetaRepo.findOne({ where: { id } });
        if (!receta || !receta.pdf_url) {
            throw new Error('PDF no encontrado');
        }
        return receta.pdf_url;
    }

    _formatearRespuesta(receta) {
        return { ...receta };
    }
}

module.exports = { recetaService: new RecetaService() };