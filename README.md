# 🦅 Capachica Turismo — Footer

Componente footer para el proyecto grupal. Hecho con **Astro + React**.

---

## ¿Cómo instalar el proyecto desde cero?

```bash
# 1. Clonar el repo
git clone https://github.com/TU-USUARIO/capachica-footer.git
cd capachica-footer

# 2. Instalar dependencias con pnpm
pnpm install

# 3. Correr en desarrollo
pnpm dev
```

---

## ¿Cómo añadir el footer a tu página?

Solo necesitas **2 líneas** al inicio de tu archivo `.astro`:

```astro
---
import Footer from '../components/Footer.jsx';
---
```

Y luego al **final del body** de tu página:

```astro
<Footer client:load />
```

### Ejemplo completo:

```astro
---
import Footer from '../components/Footer.jsx';
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Artesanía — Capachica</title>
  </head>
  <body>

    <!-- Tu contenido aquí -->
    <main>
      <h1>Artesanía del Titicaca</h1>
    </main>

    <!-- Footer al final -->
    <Footer client:load />

  </body>
</html>
```

---

## Estructura del proyecto

```
capachica-footer/
├── src/
│   ├── components/
│   │   └── Footer.jsx       ← EL COMPONENTE (solo tocar esto)
│   └── pages/
│       └── index.astro      ← Página de ejemplo
├── astro.config.mjs
├── package.json
└── README.md
```

---

## ¿Rompe el diseño de mis compañeros?

**No.** El footer usa:
- Sus propias variables CSS con prefijo `--cap-` → no pisan ningún otro estilo
- Todos los estilos están **dentro del componente** → no hay archivo CSS global
- No toca el `body`, no usa `position: fixed`, no interfiere con nada

---

## Tecnologías

- [Astro](https://astro.build) — framework principal
- [React](https://react.dev) — para la interactividad del newsletter
- [pnpm](https://pnpm.io) — gestor de paquetes
