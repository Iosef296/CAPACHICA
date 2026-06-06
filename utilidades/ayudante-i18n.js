// backend/utilidades/ayudante-i18n.js
// Función simple para internacionalización (se puede expandir con i18next)
const i18n = {
    es: {
        'auth.emailYaRegistrado': 'El correo ya está registrado',
        'auth.credencialesInvalidas': 'Credenciales inválidas',
        'auth.tokenNoProporcionado': 'Token no proporcionado',
        'auth.tokenInvalido': 'Token inválido',
        'auth.usuarioNoEncontrado': 'Usuario no encontrado',
        'auth.permisoDenegado': 'Permiso denegado',
        'restaurante.noEncontrado': 'Restaurante no encontrado',
        'plato.noEncontrado': 'Plato no encontrado',
        'taller.noEncontrado': 'Taller no encontrado',
        'receta.noEncontrada': 'Receta no encontrada',
    },
    en: {
        'auth.emailYaRegistrado': 'Email already registered',
        'auth.credencialesInvalidas': 'Invalid credentials',
        'auth.tokenNoProporcionado': 'Token not provided',
        'auth.tokenInvalido': 'Invalid token',
        'auth.usuarioNoEncontrado': 'User not found',
        'auth.permisoDenegado': 'Permission denied',
        'restaurante.noEncontrado': 'Restaurant not found',
        'plato.noEncontrado': 'Dish not found',
        'taller.noEncontrado': 'Workshop not found',
        'receta.noEncontrada': 'Recipe not found',
    },
    fr: {
        'auth.emailYaRegistrado': 'Email déjà enregistré',
        'auth.credencialesInvalidas': 'Identifiants invalides',
        'auth.tokenNoProporcionado': 'Token non fourni',
        'auth.tokenInvalido': 'Token invalide',
        'auth.usuarioNoEncontrado': 'Utilisateur non trouvé',
        'auth.permisoDenegado': 'Permission refusée',
        'restaurante.noEncontrado': 'Restaurant non trouvé',
        'plato.noEncontrado': 'Plat non trouvé',
        'taller.noEncontrado': 'Atelier non trouvé',
        'receta.noEncontrada': 'Recette non trouvée',
    },
};

function t(key, lang = 'es') {
    return i18n[lang]?.[key] || i18n.es[key] || key;
}

module.exports = { t };