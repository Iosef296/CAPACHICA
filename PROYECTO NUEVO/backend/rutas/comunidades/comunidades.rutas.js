const { crearRutasSQL } = require('../utilidades/sqlCrud.rutas');

// Tabla/ruta/canal quedan 'comunidades' (no romper el frontend web que ya
// las usa) -- solo el nombre mostrado en mensajes de error pasa a 'Familia'.
module.exports = crearRutasSQL('comunidades', 'Familia', 'comunidades');
