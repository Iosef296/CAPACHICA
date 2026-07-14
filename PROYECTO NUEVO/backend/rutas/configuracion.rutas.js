// backend/rutas/configuracion.rutas.js
// Etiquetas editables de la grilla "Explora" del mobile (Gastronomía,
// Artesanía, etc) -- antes hardcodeadas en el código, cada cambio de texto
// pedía rebuildear el APK entero. Clave-valor simple, cualquiera puede leer
// (GET público, lo consume la app sin login), solo admin puede escribir.
const { Router } = require('express');
const { query } = require('../config/postgres');
const { broadcast } = require('../ws');
const { autenticacionMiddleware } = require('../middleware/autenticacion.middleware');
const { autorizacionMiddleware } = require('../middleware/autorizacion.middleware');

const router = Router();

const DEFAULTS = {
    // Grilla "Explora" del Home (tandas previas)
    comunidades: 'Familias',
    gastronomia: 'Gastronomía',
    artesania: 'Artesanía',
    reservas: 'Reservas',
    ar: 'AR',
    guias: 'Guías',
    mapaGoogle: 'Mapa Google',
    chatInti: 'Chat Inti',
    festividades: 'Festividades',

    // Home -- hero
    'home.heroTitle': 'Vive Capachica, conoce su cultura, comparte experiencias',
    'home.heroSubtitle': 'Descubre el corazón del Titicaca a través de una lente inteligente y ancestral.',
    'home.ctaCrear': 'Crear mi experiencia con IA',
    'home.loginAlertTitle': 'Inicia sesión',
    'home.loginAlertBody': 'Necesitás una cuenta para dar like a las historias.',

    // Killa teaser (aparece en Home, Familias y Gastronomía)
    'killaTeaser.headline': '¿Qué quieres descubrir hoy?',
    'killaTeaser.placeholder': 'Pregunta por climas, rituales o rutas...',

    // Onboarding
    'login.headline': 'Vive el corazón del Titicaca',
    'login.subtitle': 'Inicia sesión para crear tu experiencia con Inti AI.',
    'register.headline': 'Crea tu cuenta',
    'register.subtitle': 'Explora Capachica, guarda favoritos y reserva experiencias.',
    'phone.headline': '¿Cuál es tu número?',
    'phone.subtitle': 'Lo usamos para confirmar tus reservas y avisos importantes.',

    // Encabezados de pantallas (eyebrow + título)
    'booking.eyebrow': 'RESERVAS',
    'booking.title': 'Tu Escapada Ancestral',
    'communities.eyebrow': 'CAPACHICA',
    'communities.title': 'Familias Ancestrales',
    'crafts.eyebrow': 'ARTESANÍA',
    'crafts.title': 'El Arte del Tejido Capachiqueño',
    'gastronomy.eyebrow': 'GASTRONOMÍA',
    'gastronomy.title': 'El Legado de la Tierra',
    'festividades.eyebrow': 'CULTURA VIVA',
    'festividades.title': 'Festividades',
    'favorites.eyebrow': 'GUARDADOS',
    'favorites.title': 'Mis Favoritos',
    'experiences.eyebrow': 'EXPERIENCIAS',
    'experiences.headline': 'Vive Capachica',
    'guides.travelEyebrow': 'GUÍA DE VIAJE',
    'guides.travelTitle': 'Cómo recorrer Capachica',
    'guides.travelIntro': 'Rutas, transporte y consejos prácticos para tu viaje.',
    'guides.culturalEyebrow': 'GUÍA CULTURAL',
    'guides.culturalTitle': 'Capachica Cultural',
    'guides.culturalIntro': 'Historia, mitos y tradiciones vivas de la península.',

    // Ayuda / contacto
    'help.title': 'Centro de Ayuda',
    'help.intro': 'Encuentra respuestas rápidas o contáctanos directamente.',
    'help.whatsappNumber': '+51 999 999 999',
    'help.email': 'hola@capachica.com',
    'help.faqs': JSON.stringify([
        { q: '¿Necesito reservar con anticipación?', a: 'Sí, recomendamos reservar con al menos 48h de anticipación, especialmente en temporada alta (jun-ago).' },
        { q: '¿Las experiencias incluyen comida?', a: 'Los talleres de 4h+ incluyen almuerzo tradicional. Las actividades cortas no — pero te recomendamos lugares cerca.' },
        { q: '¿Hay ATM en Capachica?', a: 'No. Trae soles en efectivo desde Puno. La mayoría de hospedajes y talleres aceptan solo efectivo o Yape.' },
        { q: '¿Necesito permiso para visitar las familias?', a: 'No. Las familias reciben visitantes con turismo vivencial organizado. Inti AI te puede ayudar a coordinarlo.' },
        { q: '¿La app funciona sin internet?', a: 'La navegación y datos básicos sí. El chat con Inti requiere conexión.' },
    ]),

    // Mi negocio -- CTA que convierte turista en emprendedor
    'myBusiness.becomeProviderMsg': 'Todavía eres turista. Pídele a un administrador que te habilite como emprendedor para poder crear y gestionar tu propio negocio en la app.',

    // Home -- historias
    'home.myStoryLabel': 'Tu historia',
    'home.selfStoryLabel': 'Tú',

    // Artesanía
    'crafts.wisdomLabel': 'SABIDURÍA ANCESTRAL · KILLA',
    'crafts.wisdomText': 'Cada símbolo en un tejido cuenta una historia. El Ch\'aska representa la estrella guía.',
    'crafts.sectionMaestros': 'MAESTROS DEL TELAR',
    'crafts.sectionGaleria': 'GALERÍA',
    'crafts.sectionTintes': 'TINTES DE LA TIERRA',

    // Gastronomía
    'gastronomy.tabs': JSON.stringify(['Todo', 'Platos Fuertes', 'Sopas', 'Tradición Viva']),
    'gastronomy.intiTag': 'Inti: Pruébalo en Asoc. Tikarani',
    'gastronomy.sectionRestaurantes': 'RESTAURANTES EN CAPACHICA',

    // Festividades
    'festividades.types': JSON.stringify(['Todas', 'Religiosa', 'Cultural', 'Cívica']),
    'festividades.badgeDestacada': 'DESTACADA',

    // Reservas (pantalla de reservar hospedajes/actividades)
    'booking.locations': JSON.stringify(['Todas', 'Llachón', 'Ccotos', 'Siale', 'Chifrón']),
    'booking.sectionHospedajes': 'HOSPEDAJES FAMILIARES',
    'booking.sectionActividades': 'TOURS Y ACTIVIDADES',
    'booking.ctaReservar': 'Reservar ahora',
    'booking.emptyHospedajes': 'No hay hospedajes en {loc} todavía.',

    // Familias (lista)
    'communities.intro': 'Cuatro pueblos vivos en la península del Titicaca, cada uno con su sabiduría.',
    'communities.badgePopular': 'MÁS POPULAR',
    'communities.sectionAnfitrionas': 'FAMILIAS ANFITRIONAS',

    // Guías
    'guides.readMoreLabel': 'LEER MÁS →',

    // Mapa (tab)
    'map.filters': JSON.stringify(['Todo', 'Familias', 'Gastronomía', 'Aventura', 'Cultura']),
    'map.searchPlaceholder': 'Buscar en Capachica…',
    'map.locationEyebrow': 'UBICACIÓN',

    // Reservas (tab -- "Mis reservas")
    'reservasTab.eyebrow': 'VIAJES',
    'reservasTab.emptyLoginTitle': 'Inicia sesión para ver tus reservas',
    'reservasTab.emptyTitle': 'Sin reservas aún',
    'reservasTab.emptySubtitle': 'Explora experiencias y reserva tu próximo viaje a Capachica.',
    'reservasTab.emptyCta': 'Ver experiencias',
    'reservasTab.viewDetailLabel': 'Ver detalle',

    // Favoritos -- estado vacío
    'favorites.emptyTitle': 'Sin favoritos aún',
    'favorites.emptySubtitle': 'Toca el corazón en cualquier hospedaje, comunidad o experiencia para guardarla aquí.',
    'favorites.emptyCta': 'Explorar',
};

router.get('/', async (_req, res) => {
    try {
        const { rows } = await query('SELECT clave, valor FROM configuracion_app');
        const config = { ...DEFAULTS };
        for (const r of rows) config[r.clave] = r.valor;
        res.json(config);
    } catch (err) {
        res.json(DEFAULTS);
    }
});

// Actualiza varias claves de una -- body { clave: valor, ... }. Solo las
// claves conocidas en DEFAULTS se aceptan, el resto se ignora silenciosamente.
router.put('/', autenticacionMiddleware, autorizacionMiddleware(['admin']), async (req, res) => {
    try {
        const entradas = Object.entries(req.body || {}).filter(([clave]) => clave in DEFAULTS);
        for (const [clave, valor] of entradas) {
            // help.faqs viaja como array/objeto (no string) -- se guarda serializado,
            // el mobile y el admin lo parsean de vuelta con JSON.parse.
            const valorTexto = typeof valor === 'string' ? valor : JSON.stringify(valor);
            await query(
                `INSERT INTO configuracion_app (clave, valor) VALUES ($1, $2)
                 ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor`,
                [clave, valorTexto]
            );
        }
        broadcast('configuracion');
        const { rows } = await query('SELECT clave, valor FROM configuracion_app');
        const config = { ...DEFAULTS };
        for (const r of rows) config[r.clave] = r.valor;
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar configuración' });
    }
});

module.exports = router;
