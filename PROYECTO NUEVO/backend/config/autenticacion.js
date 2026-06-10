// backend/config/autenticacion.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'otro_secreto_para_refresh';
const JWT_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_IN = '7d';

function generarToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function generarRefreshToken(payload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

function verificarToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

function verificarRefreshToken(token) {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
    generarToken,
    generarRefreshToken,
    verificarToken,
    verificarRefreshToken,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
};