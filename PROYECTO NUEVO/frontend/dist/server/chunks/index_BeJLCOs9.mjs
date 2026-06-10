import { c as createComponent } from './astro-component_D4_SZq4w.mjs';
import { p as renderComponent, h as renderTemplate } from './server_9i1cpG6S.mjs';
import { $ as $$Layout } from './Layout_bSPq0Ktu.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Festividades · Capachica" }, { "default": ($$result2) => renderTemplate`    ${renderComponent($$result2, "FestividadesContent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/festividades/FestividadesContent", "client:component-export": "default" })} `, "head": ($$result2) => renderTemplate`<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles/festividades.css">` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/festividades/index.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/festividades/index.astro";
const $$url = "/festividades";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
