// backend/controladores/auth/auth.controlador.js
const { LoginDTO } = require('../../dtos/auth/login.dto');
const { RegistroDTO } = require('../../dtos/auth/registro.dto');
const { authService } = require('../../servicios/auth/auth.servicio');

class AuthControlador {
    async registro(req, res, next) {
        try {
            const datos = RegistroDTO.parse(req.body);
            const resultado = await authService.registrar(datos);
            res.status(201).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const datos = LoginDTO.parse(req.body);
            const resultado = await authService.iniciarSesion(datos.email, datos.password);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ error: 'Refresh token requerido' });
            }
            const resultado = await authService.refrescarToken(refreshToken);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthControlador();