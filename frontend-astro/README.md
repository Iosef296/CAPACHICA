# 🌄 Plataforma de Turismo y Gastronomía - Capachica

Este proyecto es una aplicación frontend desarrollada con **Astro** diseñada para promover el turismo comunitario y la riqueza gastronómica de Capachica, Puno. La plataforma permite a los usuarios explorar restaurantes, platos típicos, recetas ancestrales y talleres culinarios.

## ✨ Características Principales

- **Diseño Moderno y Premium:** Interfaz de usuario que utiliza un _Dark Theme_ elegante combinado con efectos de _Glassmorphism_ (cristal esmerilado) y acentos de luz Neón (Turquesa y Dorado).
- **Internacionalización (i18n):** Soporte nativo y dinámico (basado en cookies) para 7 idiomas, permitiendo un alcance global:
  - Español (ES)
  - Inglés (EN)
  - Portugués (PT)
  - Quechua (QU)
  - Francés (FR)
  - Ruso (RU)
  - Chino (ZH)
  - Coreano (KO)
  - Japonés (JA)
- **Filtros Dinámicos:** Búsqueda y filtrado de restaurantes por tipo de comida y rango de precio en tiempo real mediante Vanilla JavaScript.
- **Responsive Design:** Diseño fluido y adaptable al 100% (Mobile-First), garantizando una experiencia de usuario perfecta desde teléfonos móviles hasta monitores de escritorio.

## 🔗 Arquitectura del Sistema: Backend y Angular

El proyecto utiliza una **arquitectura desacoplada** donde Astro actúa como la capa pública (orientada al SEO y rendimiento), un Backend provee los datos, y una aplicación Angular gestiona la administración.

### 📡 Consumo del Backend (API)

La obtención de datos está centralizada en la carpeta `src/services/`.

- **`api.js`**: Configura el cliente HTTP base, interceptores y manejo global de errores.
- **`restaurante.service.js`**: Contiene las funciones específicas (`obtenerRestaurantes`, `obtenerPlatosPorRestaurante`, `obtenerRecetaPorPlato`, etc.) que se comunican con los endpoints del servidor.
- **Doble Entorno de Ejecución:** Astro consume la API de dos maneras:
  1. **En el Servidor (SSR/SSG):** Al cargar las páginas (`index.astro`, `[id].astro`), Astro realiza las peticiones en el servidor para entregar HTML pre-renderizado (excelente para SEO y velocidad).
  2. **En el Cliente (Navegador):** Al usar el componente de `Filtros.astro`, el JavaScript de Vanilla llama dinámicamente a los servicios para actualizar el DOM sin recargar la página.

### 🅰️ Integración y Pase a Angular (Panel Administrativo)

El ecosistema cuenta con un Panel de Administración construido en **Angular**. Astro y Angular coexisten y se comunican a nivel de cliente de la siguiente manera:

- **Archivo de Configuración (`app.config.js`):** Ubicado en `src/config/`, este archivo define las URLs del entorno, incluyendo `angularLoginUrl` y `adminPanelUrl`.
- **Gestión de Sesión Distribuida:** Astro lee el `localStorage` del navegador buscando el token de sesión (`accessToken`) generado originalmente por el sistema de autenticación.
- **Enrutamiento Condicional:** - Si el usuario **no está autenticado**, los botones de "Iniciar Sesión" y "Reservar Mesa" lo redirigen a la ruta de inicio de sesión de la app de Angular.
  - Si el usuario **está autenticado** (existe el token), Astro detecta la sesión y muestra accesos directos ("Administración", "Cerrar sesión") que enrutan al usuario directamente al dashboard privado de Angular.

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build/):** Framework web para construcción de sitios rápidos y optimizados.
- **JavaScript (Vanilla):** Para la interactividad de la UI, filtros dinámicos, acordeones de recetas y manejo de cookies de sesión/idioma.
- **CSS3:** Variables CSS globales (`:root`), Grid, Flexbox y animaciones avanzadas.

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v18 o superior recomendado)
- npm o pnpm

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone
   cd frontend-astro
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configuración de Entorno:**
   Revisar y ajustar el archivo `src/config/app.config.js` para asegurar que las rutas del panel de Angular y las URLs de la API sean correctas. Asegúrate también de que los endpoints en `src/services/api.js` apunten a tu backend local o de producción.

4. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible en `http://localhost:4321`.

## 📂 Estructura del Proyecto

```text
├── 📁 node_modules/   📦 (Node)
├── 📁 public/
│   └── 📁 images/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📄 Filtros.astro
│   │   ├── 📄 Footer.astro
│   │   ├── 📄 Header.astro
│   │   ├── 📄 PlatoCard.astro
│   │   └── 📄 RestauranteCard.astro
│   ├── 📁 config/
│   │   └── 📄 app.config.js
│   ├── 📁 i18n/
│   │   ├── 📄 en.json
│   │   ├── 📄 es.json
│   │   ├── 📄 fr.json
│   │   ├── 📄 ja.json
│   │   ├── 📄 ko.json
│   │   ├── 📄 pt.json
│   │   ├── 📄 qu.json
│   │   ├── 📄 ru.json
│   │   └── 📄 zh.json
│   ├── 📁 layouts/
│   │   └── 📄 BaseLayout.astro
│   ├── 📁 pages/
│   │   ├── 📁 auth/
│   │   │   └── 📄 login.astro
│   │   ├── 📁 gastronomia/
│   │   │   ├── 📄 [id].astro
│   │   │   └── 📄 index.astro
│   │   └── 📄 index.astro
│   ├── 📁 services/
│   │   ├── 📄 api.js
│   │   └── 📄 restaurante.service.js
│   └── 📄 env.d.ts
├── 📄 astro.config.mjs
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md

```
