// backend/middleware/error-handler.js
const { ZodError } = require('zod');
const logger = require('../utilidades/logger');

function errorHandler(err, req, res, next) {
    logger.error('Error no controlado:', err);

    // Errores de validación Zod
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: err.errors.map(e => ({
                campo: e.path.join('.'),
                mensaje: e.message,
            })),
        });
    }

    // Errores conocidos (mensaje de error)
    if (err.message) {
        return res.status(400).json({ error: err.message });
    }

    // Error interno
    res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { errorHandler };