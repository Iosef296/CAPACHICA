import { c as createComponent } from './astro-component_D4_SZq4w.mjs';
import { p as renderComponent, h as renderTemplate } from './server_9i1cpG6S.mjs';
import { $ as $$Layout, N as Navbar } from './Layout_bSPq0Ktu.mjs';
import { V as VivencialHero } from './VivencialHero_BIW32NeE.mjs';
import { F as Footer } from './Footer_BYloE1bB.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Capachica Turismo" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/Navbar", "client:component-export": "default" })} ${renderComponent($$result2, "VivencialHero", VivencialHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/VivencialHero", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/index.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
