// src/config/app.config.js
export const APP_CONFIG = {
    // Ruta de login propio (Astro)
    loginUrl: '/auth/login',
    // Ruta del panel de administración después de login
    adminPanelUrl: '/admin',
    // URL del Backend para cargar las imágenes
    backendUrl: import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000'
};