import { c as createComponent } from './astro-component_Btt82VVH.mjs';
import 'piccolore';
import { o as renderComponent, h as renderTemplate } from './server_80AW_iNR.mjs';
import { $ as $$Layout } from './Layout_BxerFJFs.mjs';

const $$Calendario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Calendario Festivo · Capachica" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CalendarioContent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/festividades/CalendarioContent", "client:component-export": "default" })} `, "head": ($$result2) => renderTemplate`<link rel="stylesheet" href="/styles/festividades.css">` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/festividades/calendario.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/festividades/calendario.astro";
const $$url = "/festividades/calendario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
