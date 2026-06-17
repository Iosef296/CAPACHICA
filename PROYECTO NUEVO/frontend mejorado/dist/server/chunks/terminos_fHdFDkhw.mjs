import { c as createComponent } from './astro-component_Btt82VVH.mjs';
import 'piccolore';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead } from './server_80AW_iNR.mjs';
import { $ as $$Layout } from './Layout_BxerFJFs.mjs';

const $$Terminos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Términos y Condiciones — Capachica Turismo" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="legal-page"> <div class="legal-container"> <a href="/" class="legal-back">← Volver al inicio</a> <span class="legal-eyebrow">Legal · Capachica Turismo</span> <h1 class="legal-h1">Términos y Condiciones</h1> <div class="legal-body"> <p>Al usar nuestro sitio web aceptas los siguientes términos y condiciones.</p> <h2>Uso del sitio</h2> <p>Este sitio es de uso exclusivamente informativo sobre los destinos y experiencias turísticas de Capachica, Puno, Perú.</p> <h2>Reservas y servicios</h2> <p>Todas las reservas están sujetas a disponibilidad. Capachica Turismo se reserva el derecho de modificar precios y disponibilidad sin previo aviso.</p> <h2>Responsabilidad</h2> <p>Capachica Turismo no se hace responsable de inconvenientes causados por factores externos como clima, huelgas o situaciones de fuerza mayor.</p> <h2>Propiedad intelectual</h2> <p>Todo el contenido de este sitio (textos, imágenes, logos) es propiedad de Capachica Turismo y no puede ser reproducido sin autorización expresa.</p> </div> </div> </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/terminos.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/terminos.astro";
const $$url = "/terminos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Terminos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
