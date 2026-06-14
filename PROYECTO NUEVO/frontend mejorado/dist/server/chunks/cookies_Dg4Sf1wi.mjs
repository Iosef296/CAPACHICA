import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';

const $$Cookies = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Política de Cookies — Capachica Turismo" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="legal-page"> <div class="legal-container"> <a href="/" class="legal-back">← Volver al inicio</a> <span class="legal-eyebrow">Legal · Capachica Turismo</span> <h1 class="legal-h1">Política de Cookies</h1> <div class="legal-body"> <p>Este sitio utiliza cookies para mejorar tu experiencia de navegación.</p> <h2>¿Qué son las cookies?</h2> <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p> <h2>Cookies que usamos</h2> <p><strong style="color:#d4a843;">capachica-theme:</strong> Guarda tu preferencia de modo oscuro/claro. Expira en 1 año.</p> <p><strong style="color:#d4a843;">lang:</strong> Guarda tu idioma preferido (ES, EN o FR). Expira al cerrar el navegador.</p> <h2>Cookies de terceros</h2> <p>No usamos cookies de seguimiento, publicidad ni redes sociales. No compartimos datos con Google Analytics ni servicios similares.</p> <h2>¿Cómo desactivarlas?</h2> <p>Puedes borrar o desactivar cookies desde la configuración de tu navegador. Esto puede afectar algunas funcionalidades del sitio.</p> </div> </div> </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/cookies.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/cookies.astro";
const $$url = "/cookies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Cookies,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
