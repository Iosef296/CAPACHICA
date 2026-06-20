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

module.exports = upload;
