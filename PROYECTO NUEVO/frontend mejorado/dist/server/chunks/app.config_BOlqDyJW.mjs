import { q as createRenderInstruction, o as renderComponent, h as renderTemplate, m as maybeRenderHead, t as renderSlot } from './server_DrLwvc76.mjs';
import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
	const v = glob$1[path$13];
	if (v) return typeof v === "function" ? v() : Promise.resolve(v);
	return new Promise((_, reject) => {
		(typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
	});
};

const $$GastronomiaLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$GastronomiaLayout;
  const lang = Astro2.cookies.get("lang")?.value || "es";
  let translations;
  try {
    translations = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../i18n/en.json": () => import('./en_DgkWZI3c.mjs'),"../i18n/es.json": () => import('./es_B0J-Kw12.mjs'),"../i18n/fr.json": () => import('./fr_TpDuZsR0.mjs'),"../i18n/ja.json": () => import('./ja_BLpGwHGQ.mjs'),"../i18n/ko.json": () => import('./ko_ChuV9bEW.mjs'),"../i18n/pt.json": () => import('./pt_BS6s2Zsb.mjs'),"../i18n/qu.json": () => import('./qu_J8xx3tX-.mjs'),"../i18n/ru.json": () => import('./ru_CXUoNMir.mjs'),"../i18n/zh.json": () => import('./zh_Ctf9Rthf.mjs')})), `../i18n/${lang}.json`, 3);
  } catch (e) {
    translations = await import('./es_B0J-Kw12.mjs');
  }
  const title = translations.default?.titulo || translations.titulo || "Capachica Gastronomía";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="gastronomia-main"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/layouts/GastronomiaLayout.astro", void 0);

// src/config/app.config.js
const APP_CONFIG = {
    // Ruta completa al login de Angular
    angularLoginUrl: 'http://localhost:4200/auth/login',
    // Ruta del panel de administración después de login
    adminPanelUrl: 'http://localhost:4200/restaurantes',
    // URL del Backend para cargar las imágenes
    backendUrl: 'http://localhost:3000'
};

export { $$GastronomiaLayout as $, APP_CONFIG as A, __variableDynamicImportRuntimeHelper as _, renderScript as r };
