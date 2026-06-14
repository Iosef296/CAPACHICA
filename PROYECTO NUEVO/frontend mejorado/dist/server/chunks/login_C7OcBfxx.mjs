import { _ as __variableDynamicImportRuntimeHelper, A as APP_CONFIG, $ as $$GastronomiaLayout, r as renderScript } from './app.config_BOlqDyJW.mjs';
import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead, g as addAttribute } from './server_DrLwvc76.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const lang = Astro2.cookies.get("lang")?.value || "es";
  let translations;
  try {
    translations = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../i18n/en.json": () => import('./en_DgkWZI3c.mjs'),"../../i18n/es.json": () => import('./es_B0J-Kw12.mjs'),"../../i18n/fr.json": () => import('./fr_TpDuZsR0.mjs'),"../../i18n/ja.json": () => import('./ja_BLpGwHGQ.mjs'),"../../i18n/ko.json": () => import('./ko_ChuV9bEW.mjs'),"../../i18n/pt.json": () => import('./pt_BS6s2Zsb.mjs'),"../../i18n/qu.json": () => import('./qu_J8xx3tX-.mjs'),"../../i18n/ru.json": () => import('./ru_CXUoNMir.mjs'),"../../i18n/zh.json": () => import('./zh_Ctf9Rthf.mjs')})), `../../i18n/${lang}.json`, 4);
  } catch (e) {
    translations = await import('./es_B0J-Kw12.mjs');
  }
  const redirect = Astro2.url.searchParams.get("redirect") || APP_CONFIG.adminPanelUrl;
  const angularLoginUrl = `${APP_CONFIG.angularLoginUrl}?redirect=${encodeURIComponent(redirect)}`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$GastronomiaLayout, { "lang": lang }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width: 400px; margin: 3rem auto; background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;"> <h2 style="font-size: 1.5rem; font-weight: bold; color: var(--turquesa); margin-bottom: 1rem;"> ${translations.inicio_sesion} </h2> <p style="margin-bottom: 1.5rem; color: #4a5568;">
La autenticación se gestiona desde el sistema de administración.
</p> <a${addAttribute(angularLoginUrl, "href")} class="btn btn-primary" style="font-size: 1rem; padding: 0.75rem 2rem; width: 100%;">
Ir al login de administración
</a> <p style="margin-top: 1rem; font-size: 0.875rem; color: #718096;">
¿No tienes cuenta? Contacta con el administrador.
</p> </div> ` })} ${renderScript($$result, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/auth/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/auth/login.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
