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
}

module.exports = new UsuarioControlador();