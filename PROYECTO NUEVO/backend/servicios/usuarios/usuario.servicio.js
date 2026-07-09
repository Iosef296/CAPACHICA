// backend/servicios/usuarios/usuario.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Usuario = require('../../modelos/auth/usuario.modelo');
const bcrypt = require('bcryptjs');
const { broadcast } = require('../../ws');

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

    async listarTodos() {
        const usuarios = await this.usuarioRepo.find({ order: { fecha_registro: 'DESC' } });
        return usuarios.map(({ password_hash, ...u }) => u);
    }

    async cambiarRol(id, rol) {
        if (!['admin', 'proveedor', 'turista'].includes(rol)) {
            throw new Error('Rol inválido');
        }
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        usuario.rol = rol;
        const actualizado = await this.usuarioRepo.save(usuario);
        const { password_hash, ...perfil } = actualizado;
        broadcast('usuarios');
        return perfil;
    }

    // Edicion completa desde el panel admin: nombre/email/telefono/rol y,
    // opcionalmente, resetear la contraseña (por si el usuario la olvido
    // y no tiene forma de recuperarla el mismo todavia).
    async actualizarComoAdmin(id, datos) {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        if (datos.email && datos.email !== usuario.email) {
            const existente = await this.usuarioRepo.findOne({ where: { email: datos.email } });
            if (existente && existente.id !== id) {
                throw new Error('Ese correo ya está en uso por otro usuario');
            }
            usuario.email = datos.email;
        }
        if (datos.nombre) usuario.nombre = datos.nombre;
        if (datos.telefono !== undefined) usuario.telefono = datos.telefono || null;
        if (datos.rol) {
            if (!['admin', 'proveedor', 'turista'].includes(datos.rol)) {
                throw new Error('Rol inválido');
            }
            usuario.rol = datos.rol;
        }
        if (datos.activo !== undefined) usuario.activo = !!datos.activo;
        if (datos.password) {
            if (datos.password.length < 8) {
                throw new Error('La contraseña debe tener al menos 8 caracteres');
            }
            const salt = await bcrypt.genSalt(10);
            usuario.password_hash = await bcrypt.hash(datos.password, salt);
        }
        const actualizado = await this.usuarioRepo.save(usuario);
        const { password_hash, ...perfil } = actualizado;
        broadcast('usuarios');
        return perfil;
    }
}

module.exports = { usuarioService: new UsuarioService() };