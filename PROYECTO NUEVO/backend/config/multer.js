const cloudinaryLib = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinaryLib.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer-storage-cloudinary v2 exports a factory function and expects the base cloudinary module
const storage = cloudinaryStorage({
    cloudinary: cloudinaryLib,
    folder: 'capachica',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Storage aparte para historias (foto o video) -- resource_type 'auto' deja
// que Cloudinary detecte el tipo solo. multer-storage-cloudinary v2 IGNORA
// cualquier key top-level que no sea folder/allowedFormats/transformation/etc
// (ver su _handleFile) -- resource_type solo se respeta si va DENTRO de
// `params`, que además reemplaza todas las demás keys (no se mergean). Sin
// esto Cloudinary trataba el video como imagen: por eso "invalid image file"
// y el límite de tamaño de imagen (mucho más chico que el de video).
const storageHistorias = cloudinaryStorage({
    cloudinary: cloudinaryLib,
    params: {
        folder: 'capachica/historias',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mov', 'webm', 'm4v', '3gp'],
    },
});

const uploadHistoria = multer({
    storage: storageHistorias,
    limits: { fileSize: 60 * 1024 * 1024 },
});

module.exports = upload;
module.exports.uploadHistoria = uploadHistoria;
