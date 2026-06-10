// backend/middleware/autenticacion.middleware.js
const { verificarToken } = require('../config/autenticacion');
const { AppDataSource } = require('../config/base-de-datos');
const Usuario = require('../modelos/auth/usuario.modelo');

async function autenticacionMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = verificarToken(token);
        } catch (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        const usuario = await AppDataSource.getRepository(Usuario).findOne({
            where: { id: decoded.id, activo: true },
        });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { autenticacionMiddleware };