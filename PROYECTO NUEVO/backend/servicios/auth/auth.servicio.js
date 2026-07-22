// backend/servicios/auth/auth.servicio.js
const { AppDataSource } = require('../../config/base-de-datos');
const Usuario = require('../../modelos/auth/usuario.modelo');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { generarToken, generarRefreshToken, verificarRefreshToken } = require('../../config/autenticacion');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
    constructor() {
        this.usuarioRepo = AppDataSource.getRepository(Usuario);
    }

    async registrar(datos) {
        const { nombre, email, password, telefono, rol } = datos;

        const existente = await this.usuarioRepo.findOne({ where: { email } });
        if (existente) {
            throw new Error('El correo ya está registrado');
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const nuevo = this.usuarioRepo.create({
            nombre,
            email,
            password_hash,
            telefono: telefono || null,
            rol: rol || 'turista',
        });

        await this.usuarioRepo.save(nuevo);

        const payload = { id: nuevo.id, email: nuevo.email, rol: nuevo.rol };
        const accessToken = generarToken(payload);
        const refreshToken = generarRefreshToken(payload);

        const { password_hash: _, ...usuarioSinPass } = nuevo;
        return {
            usuario: usuarioSinPass,
            accessToken,
            refreshToken,
        };
    }

    async iniciarSesion(email, password) {
        const usuario = await this.usuarioRepo.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                nombre: true,
                rol: true,
                password_hash: true,
                activo: true,
                telefono: true,
            },
        });

        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }
        if (!usuario.activo) {
            throw new Error('Usuario inactivo');
        }

        const valido = await bcrypt.compare(password, usuario.password_hash);
        if (!valido) {
            throw new Error('Credenciales inválidas');
        }

        const payload = { id: usuario.id, email: usuario.email, rol: usuario.rol };
        const accessToken = generarToken(payload);
        const refreshToken = generarRefreshToken(payload);

        const { password_hash: _, ...usuarioSinPass } = usuario;
        return {
            usuario: usuarioSinPass,
            accessToken,
            refreshToken,
        };
    }

    async iniciarSesionGoogle(idToken) {
        if (!process.env.GOOGLE_CLIENT_ID) {
            throw new Error('Login con Google no configurado');
        }

        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload?.email_verified) {
            throw new Error('Correo de Google no verificado');
        }

        let usuario = await this.usuarioRepo.findOne({ where: { email: payload.email } });

        if (!usuario) {
            const password_hash = await bcrypt.hash(crypto.randomUUID(), 10);
            usuario = this.usuarioRepo.create({
                nombre: payload.name || payload.email.split('@')[0],
                email: payload.email,
                password_hash,
                foto: payload.picture || null,
                rol: 'turista',
            });
            await this.usuarioRepo.save(usuario);
        }

        if (!usuario.activo) {
            throw new Error('Usuario inactivo');
        }

        const tokenPayload = { id: usuario.id, email: usuario.email, rol: usuario.rol };
        const accessToken = generarToken(tokenPayload);
        const refreshToken = generarRefreshToken(tokenPayload);

        const { password_hash: _, ...usuarioSinPass } = usuario;
        return { usuario: usuarioSinPass, accessToken, refreshToken };
    }

    async refrescarToken(token) {
        try {
            const decoded = verificarRefreshToken(token);
            const usuario = await this.usuarioRepo.findOne({ where: { id: decoded.id } });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            const payload = { id: usuario.id, email: usuario.email, rol: usuario.rol };
            const newAccessToken = generarToken(payload);
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new Error('Refresh token inválido o expirado');
        }
    }
}

module.exports = { authService: new AuthService() };