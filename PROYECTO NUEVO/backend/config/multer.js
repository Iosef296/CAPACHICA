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
// que Cloudinary detecte el tipo solo. Sin la transformación de imagen fija
// de arriba porque le rompería el procesamiento a los videos.
const storageHistorias = cloudinaryStorage({
    cloudinary: cloudinaryLib,
    folder: 'capachica/historias',
    resource_type: 'auto',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mov', 'webm'],
});

const uploadHistoria = multer({
    storage: storageHistorias,
    limits: { fileSize: 25 * 1024 * 1024 },
});

module.exports = upload;
module.exports.uploadHistoria = uploadHistoria;
