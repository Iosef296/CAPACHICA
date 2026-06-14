import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';

const $$Cancelaciones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Política de Cancelaciones — Capachica Turismo" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="legal-page"> <div class="legal-container"> <a href="/" class="legal-back">← Volver al inicio</a> <span class="legal-eyebrow">Legal · Capachica Turismo</span> <h1 class="legal-h1">Política de Cancelaciones</h1> <div class="legal-body"> <p>Entendemos que los planes pueden cambiar. Por eso tenemos una política de cancelaciones flexible.</p> <h2>Cancelación con más de 7 días</h2> <p>Reembolso completo del 100% del monto pagado si cancelas con más de 7 días de anticipación.</p> <h2>Cancelación entre 3 y 7 días</h2> <p>Reembolso del 50% del monto pagado. La diferencia se aplica como crédito para una futura reserva.</p> <h2>Cancelación con menos de 3 días</h2> <p>No se realizan reembolsos. Sin embargo, puedes reprogramar tu estadía dentro de los siguientes 6 meses sin costo adicional.</p> <h2>Fuerza mayor</h2> <p>En casos de emergencia debidamente documentada (salud, desastres naturales), aplicamos reembolso completo o reprogramación sin penalidad.</p> <h2>Contacto</h2> <p>Para solicitar una cancelación escríbenos a <strong style="color:#d4a843;">hola@capachicaturismo.pe</strong> o por WhatsApp al +51 955 949 404.</p> </div> </div> </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/cancelaciones.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/cancelaciones.astro";
const $$url = "/cancelaciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Cancelaciones,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
