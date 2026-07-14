const express = require('express');
const upload  = require('../config/multer');
const router  = express.Router();

router.post('/', upload.single('imagen'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se recibió imagen' });
    // multer-storage-cloudinary v2 no llena req.file.path — el resultado
    // de Cloudinary trae secure_url/url. Antes esto quedaba undefined y
    // la respuesta salia como {} sin que el admin viera ningun error.
    const url = req.file.path || req.file.secure_url || req.file.url;
    if (!url) return res.status(500).json({ error: 'Cloudinary no devolvió una URL' });
    res.json({ url });
});

// Foto o video para historias -- mismo contrato, storage con resource_type auto.
router.post('/historia', upload.uploadHistoria.single('media'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' });
    const url = req.file.path || req.file.secure_url || req.file.url;
    if (!url) return res.status(500).json({ error: 'Cloudinary no devolvió una URL' });
    res.json({ url });
});

module.exports = router;
