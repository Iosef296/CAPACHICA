import { c as createComponent } from './astro-component_D4_SZq4w.mjs';
import { o as renderHead, p as renderComponent, h as renderTemplate } from './server_9i1cpG6S.mjs';
import { F as Footer } from './Footer_BYloE1bB.mjs';

const $$Privacidad = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" data-astro-cid-omcsfkg6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Política de Privacidad — Capachica Turismo</title>${renderHead()}</head> <body data-astro-cid-omcsfkg6> <div class="contenido" data-astro-cid-omcsfkg6> <h1 data-astro-cid-omcsfkg6>Política de Privacidad</h1> <p data-astro-cid-omcsfkg6>En Capachica Turismo nos comprometemos a proteger tu información personal.</p> <h2 data-astro-cid-omcsfkg6>¿Qué datos recopilamos?</h2> <p data-astro-cid-omcsfkg6>Recopilamos únicamente tu correo electrónico cuando te suscribes a nuestro newsletter.</p> <h2 data-astro-cid-omcsfkg6>¿Cómo usamos tus datos?</h2> <p data-astro-cid-omcsfkg6>Tu email se usa exclusivamente para enviarte novedades y ofertas de Capachica Turismo. Nunca compartimos tu información con terceros.</p> <h2 data-astro-cid-omcsfkg6>¿Puedes eliminar tus datos?</h2> <p data-astro-cid-omcsfkg6>Sí, puedes solicitar la eliminación de tus datos en cualquier momento escribiéndonos a hola@capachicaturismo.pe</p> </div> ${renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/Footer.tsx", "client:component-export": "default", "data-astro-cid-omcsfkg6": true })} </body></html>`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/privacidad.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/privacidad.astro";
const $$url = "/privacidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacidad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
