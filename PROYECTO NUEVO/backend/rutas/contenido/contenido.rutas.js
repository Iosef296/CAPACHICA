const { crearRutasJSON } = require('../utilidades/jsonCrud.rutas');

module.exports = {
    artesaniaRoutes:  crearRutasJSON('artesania.json',  'Producto de artesanía'),
    maestrosRoutes:   crearRutasJSON('maestros.json',   'Maestro artesano'),
    guiasRoutes:      crearRutasJSON('guias.json',      'Guía'),
    hospedajesRoutes: crearRutasJSON('hospedajes.json', 'Hospedaje'),
};
