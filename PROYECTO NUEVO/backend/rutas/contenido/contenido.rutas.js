const { crearRutasSQL } = require('../utilidades/sqlCrud.rutas');

module.exports = {
    artesaniaRoutes:  crearRutasSQL('artesania',  'Producto de artesanía', 'artesania'),
    maestrosRoutes:   crearRutasSQL('maestros',   'Maestro artesano',      'maestros'),
    guiasRoutes:      crearRutasSQL('guias',      'Guía',                  'guias'),
    hospedajesRoutes: crearRutasSQL('hospedajes', 'Hospedaje',             'hospedajes'),
};
