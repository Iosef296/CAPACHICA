// backend/controladores/usuarios/usuario.controlador.js
const { PerfilDTO } = require('../../dtos/usuarios/perfil.dto');
const { ActualizarUsuarioDTO } = require('../../dtos/usuarios/actualizar.dto');
const { usuarioService } = require('../../servicios/usuarios/usuario.servicio');

class UsuarioControlador {
    async obtenerPerfil(req, res, next) {
        try {
            const usuarioId = req.usuario.id;
            const perfil = await usuarioService.obtenerPerfil(usuarioId);
            res.json(perfil);
        } catch (error) {
            next(error);
        }
    }

    async actualizarPerfil(req, res, next) {
        try {
            const usuarioId = req.usuario.id;
            const datos = ActualizarUsuarioDTO.parse(req.body);
            const resultado = await usuarioService.actualizarPerfil(usuarioId, datos);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async listarUsuarios(req, res, next) {
        try {
            const usuarios = await usuarioService.listarTodos();
            res.json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    async cambiarRol(req, res, next) {
        try {
            const { id } = req.params;
            const { rol } = req.body;
            const resultado = await usuarioService.cambiarRol(id, rol);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async actualizarComoAdmin(req, res, next) {
        try {
            const { id } = req.params;
            const resultado = await usuarioService.actualizarComoAdmin(id, req.body);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsuarioControlador();