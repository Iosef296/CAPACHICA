import { c as createComponent } from './astro-component_Btt82VVH.mjs';
import 'piccolore';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead } from './server_80AW_iNR.mjs';
import { $ as $$Layout } from './Layout_BxerFJFs.mjs';

const $$Privacidad = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Política de Privacidad — Capachica Turismo" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="legal-page"> <div class="legal-container"> <a href="/" class="legal-back">← Volver al inicio</a> <span class="legal-eyebrow">Legal · Capachica Turismo</span> <h1 class="legal-h1">Política de Privacidad</h1> <div class="legal-body"> <p>En Capachica Turismo nos comprometemos a proteger tu información personal.</p> <h2>¿Qué datos recopilamos?</h2> <p>Recopilamos únicamente tu correo electrónico cuando te suscribes a nuestro newsletter.</p> <h2>¿Cómo usamos tus datos?</h2> <p>Tu email se usa exclusivamente para enviarte novedades y ofertas de Capachica Turismo. Nunca compartimos tu información con terceros.</p> <h2>¿Puedes eliminar tus datos?</h2> <p>Sí, puedes solicitar la eliminación de tus datos en cualquier momento escribiéndonos a <strong style="color:#d4a843;">hola@capachicaturismo.pe</strong></p> <h2>Cookies</h2> <p>Usamos cookies de sesión para recordar tu preferencia de idioma y tema. No rastreamos tu actividad más allá de la sesión actual.</p> </div> </div> </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/privacidad.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/privacidad.astro";
const $$url = "/privacidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Privacidad,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
