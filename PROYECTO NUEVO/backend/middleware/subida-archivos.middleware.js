// backend/middleware/subida-archivos.middleware.js
const upload = require('../config/multer');

// Middleware para subir una sola imagen
function subirImagen(req, res, next) {
    upload.single('foto')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (req.file) {
            req.body.foto = `/uploads/${req.file.filename}`;
        }
        next();
    });
}

// Middleware para subir múltiples imágenes
function subirImagenes(req, res, next) {
    upload.array('fotos', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (req.files) {
            req.body.fotos = req.files.map(f => `/uploads/${f.filename}`);
        }
        next();
    });
}

module.exports = { subirImagen, subirImagenes };