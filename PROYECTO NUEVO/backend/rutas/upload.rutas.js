const express = require('express');
const upload  = require('../config/multer');
const router  = express.Router();

router.post('/', upload.single('imagen'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se recibió imagen' });
    // Cloudinary devuelve URL completa en req.file.path
    res.json({ url: req.file.path });
});

module.exports = router;
