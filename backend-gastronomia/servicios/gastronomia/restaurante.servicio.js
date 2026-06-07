// backend/servicios/gastronomia/restaurante.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Restaurante = require('../../modelos/gastronomia/restaurante.modelo');
const { RestauranteRespuestaDTO } = require('../../dtos/gastronomia/restaurante/respuesta.dto');

class RestauranteService {
    constructor() {
        this.restauranteRepo = AppDataSource.getRepository(Restaurante);
    }

    async crear(datos, usuarioId) {
        const { ubicacion, ...rest } = datos;
        const nuevo = this.restauranteRepo.create({
            ...rest,
            usuario_id: usuarioId,
            ubicacion: {
                type: 'Point',
                coordinates: [ubicacion.longitud, ubicacion.latitud],
            },
            aprobado: true, // ✅ Cambiado de false a true
        });

        const guardado = await this.restauranteRepo.save(nuevo);
        return this._formatearRespuesta(guardado);
    }

    async obtenerTodos(filtros) {
        const qb = this.restauranteRepo.createQueryBuilder('r');

        // Filtros
        if (filtros.tipo_comida) {
            qb.andWhere('r.tipo_comida = :tipo', { tipo: filtros.tipo_comida });
        }
        if (filtros.precio_min !== undefined) {
            qb.andWhere('r.precio_promedio >= :min', { min: filtros.precio_min });
        }
        if (filtros.precio_max !== undefined) {
            qb.andWhere('r.precio_promedio <= :max', { max: filtros.precio_max });
        }
        // Filtro por cercanía (PostGIS)
        if (filtros.latitud !== undefined && filtros.longitud !== undefined && filtros.radio) {
            const punto = `ST_SetSRID(ST_MakePoint(${filtros.longitud}, ${filtros.latitud}), 4326)`;
            qb.andWhere(`ST_DWithin(r.ubicacion, ${punto}, ${filtros.radio * 1000})`); // radio en km -> metros
        }

        qb.andWhere('r.activo = true');

        const total = await qb.getCount();
        const resultados = await qb
            .skip(filtros.offset || 0)
            .take(filtros.limit || 10)
            .getMany();

        return {
            total,
            data: resultados.map(r => this._formatearRespuesta(r)),
            limit: filtros.limit || 10,
            offset: filtros.offset || 0,
        };
    }

    async obtenerPorId(id) {
        const restaurante = await this.restauranteRepo.findOne({ where: { id, activo: true } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        return this._formatearRespuesta(restaurante);
    }

    async actualizar(id, datos, usuarioId) {
        const restaurante = await this.restauranteRepo.findOne({ where: { id } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        // Verificar permisos: admin o dueño
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para actualizar este restaurante');
        }

        // Actualizar campos
        if (datos.ubicacion) {
            const puntoGeo = `ST_SetSRID(ST_MakePoint(${datos.ubicacion.longitud}, ${datos.ubicacion.latitud}), 4326)`;
            restaurante.ubicacion = puntoGeo;
        }
        delete datos.ubicacion;

        Object.assign(restaurante, datos);
        restaurante.updated_at = new Date();

        const actualizado = await this.restauranteRepo.save(restaurante);
        return this._formatearRespuesta(actualizado);
    }

    async eliminar(id, usuarioId) {
        const restaurante = await this.restauranteRepo.findOne({ where: { id } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        // Verificar permisos: admin o dueño
        if (restaurante.usuario_id !== usuarioId && req.usuario.rol !== 'admin') {
            throw new Error('No tienes permiso para eliminar este restaurante');
        }
        // Eliminación lógica
        restaurante.activo = false;
        await this.restauranteRepo.save(restaurante);
    }

    async aprobar(id) {
        const restaurante = await this.restauranteRepo.findOne({ where: { id } });
        if (!restaurante) {
            throw new Error('Restaurante no encontrado');
        }
        restaurante.aprobado = true;
        await this.restauranteRepo.save(restaurante);
        return this._formatearRespuesta(restaurante);
    }

    _formatearRespuesta(restaurante) {
        const { ubicacion, ...rest } = restaurante;
        let latitud = null, longitud = null;

        if (ubicacion && ubicacion.type === 'Point' && Array.isArray(ubicacion.coordinates)) {
            longitud = ubicacion.coordinates[0];
            latitud = ubicacion.coordinates[1];
        } else if (ubicacion && typeof ubicacion === 'object' && 'latitud' in ubicacion) {
            latitud = ubicacion.latitud;
            longitud = ubicacion.longitud;
        }

        // ✅ Aseguramos que fotos sea un array (aunque sea vacío)
        const fotos = Array.isArray(restaurante.fotos) ? restaurante.fotos : [];

        return {
            ...rest,
            ubicacion: { latitud, longitud },
            fotos: fotos,   // 🔥 ahora siempre está presente
        };
    }
}

module.exports = { restauranteService: new RestauranteService() };