// backend/servicios/usuarios/usuario.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Usuario = require('../../modelos/auth/usuario.modelo');

class UsuarioService {
    constructor() {
        this.usuarioRepo = AppDataSource.getRepository(Usuario);
    }

    async obtenerPerfil(id) {
        const usuario = await this.usuarioRepo.findOne({ where: { id, activo: true } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const { password_hash, ...perfil } = usuario;
        return perfil;
    }

    async actualizarPerfil(id, datos) {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        Object.assign(usuario, datos);
        const actualizado = await this.usuarioRepo.save(usuario);
        const { password_hash, ...perfil } = actualizado;
        return perfil;
    }
}

module.exports = { usuarioService: new UsuarioService() };