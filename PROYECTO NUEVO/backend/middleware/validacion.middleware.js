// backend/middleware/validacion.middleware.js
const { ZodError } = require('zod');

function validacionMiddleware(schema) {
    return (req, res, next) => {
        try {
            if (req.method !== 'GET' && req.headers['content-type']?.includes('multipart/form-data')) {
                for (const key in req.body) {
                    const value = req.body[key];

                    // Convertimos solo booleanos, nulos, objetos y arrays (como ubicacion)
                    if (value === 'true') req.body[key] = true;
                    else if (value === 'false') req.body[key] = false;
                    else if (value === 'null') req.body[key] = null;
                    else if (typeof value === 'string' && ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']')))) {
                        try { req.body[key] = JSON.parse(value); } catch(e) {}
                    }
                    // ¡Dejamos los números y teléfonos tranquilos como string!
                }
            }

            const data = req.method === 'GET' ? req.query : req.body;
            req.body = schema.parse(data);
            next();

        } catch (error) {
            if (error instanceof ZodError || error.name === 'ZodError') {
                const erroresArray = error.errors || error.issues || [];
                return res.status(400).json({
                    error: 'Error de validación',
                    detalles: erroresArray.map(e => ({
                        campo: e.path ? e.path.join('.') : 'desconocido',
                        mensaje: e.message,
                    })),
                });
            }
            next(error);
        }
    };
}

module.exports = { validacionMiddleware };