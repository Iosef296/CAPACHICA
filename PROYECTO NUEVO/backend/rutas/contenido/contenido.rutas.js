const { crearRutasJSON } = require('../utilidades/jsonCrud.rutas');

module.exports = {
    artesaniaRoutes:  crearRutasJSON('artesania.json',  'Producto de artesanía', 'artesania'),
    maestrosRoutes:   crearRutasJSON('maestros.json',   'Maestro artesano',      'maestros'),
    guiasRoutes:      crearRutasJSON('guias.json',      'Guía',                  'guias'),
    hospedajesRoutes: crearRutasJSON('hospedajes.json', 'Hospedaje',             'hospedajes'),
};
