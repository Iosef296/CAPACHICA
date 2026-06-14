import { A as APP_CONFIG, r as renderScript, _ as __variableDynamicImportRuntimeHelper, $ as $$GastronomiaLayout } from './app.config_BOlqDyJW.mjs';
import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { m as maybeRenderHead, g as addAttribute, h as renderTemplate, o as renderComponent } from './server_DrLwvc76.mjs';

const $$RestauranteCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RestauranteCard;
  const { restaurante, translations } = Astro2.props;
  const { id, nombre, descripcion, direccion, fotos, tipo_comida, precio_promedio } = restaurante;
  let imagenUrl = fotos && fotos.length > 0 ? fotos[0] : null;
  if (imagenUrl && !imagenUrl.startsWith("http")) {
    const cleanPath = imagenUrl.replace(/\\/g, "/");
    const prefix = cleanPath.startsWith("/") ? "" : "/";
    imagenUrl = `${APP_CONFIG.backendUrl}${prefix}${cleanPath}`;
  }
  return renderTemplate`${maybeRenderHead()}<article class="restaurante-card"> <a${addAttribute(`/gastronomia/${id}`, "href")} class="card-link"> <div class="card-image-wrapper"> <img${addAttribute(imagenUrl || "/images/placeholder.jpg", "src")}${addAttribute(nombre, "alt")} class="card-image"> <div class="image-overlay"></div> <span class="card-badge"> ${tipo_comida ? tipo_comida.replace("_", " ") : "Variado"} </span> </div> <div class="card-content"> <h3 class="card-title">${nombre}</h3> <div class="card-location"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg> <span>${direccion || "Ubicación no disponible"}</span> </div> <p class="card-desc">${descripcion?.substring(0, 80)}...</p> <div class="card-footer"> <span class="price-label">Precio promedio</span> <span class="price-value"> ${precio_promedio ? `S/ ${precio_promedio}` : "No disponible"} </span> </div> </div> </a> </article>`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/gastronomia/RestauranteCard.astro", void 0);

const $$Filtros = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Filtros;
  const { translations = {} } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="filtros-hero-wrapper" data-astro-cid-ui3vowdy> <div class="filtros-glass-container" data-astro-cid-ui3vowdy> <h3 class="filtros-title" data-astro-cid-ui3vowdy>${translations.filtrar_por_tipo || "Filtrar por tipo"}</h3> <form id="filtros-form" class="filtros-grid" data-astro-cid-ui3vowdy> <div class="input-group" data-astro-cid-ui3vowdy> <label for="tipo_comida" data-astro-cid-ui3vowdy>Tipo de comida</label> <div class="select-wrapper" data-astro-cid-ui3vowdy> <select id="tipo_comida" data-astro-cid-ui3vowdy> <option value="" data-astro-cid-ui3vowdy>Todos</option> <option value="del_lago" data-astro-cid-ui3vowdy>Del lago</option> <option value="ancestral" data-astro-cid-ui3vowdy>Ancestral</option> <option value="productos_locales" data-astro-cid-ui3vowdy>Productos locales</option> <option value="bebidas" data-astro-cid-ui3vowdy>Bebidas</option> </select> </div> </div> <div class="input-group" data-astro-cid-ui3vowdy> <label for="precio_min" data-astro-cid-ui3vowdy>${translations.precio_min || "Precio Mínimo"}</label> <input type="number" id="precio_min" min="0" step="0.5" placeholder="S/ 0.00" data-astro-cid-ui3vowdy> </div> <div class="input-group" data-astro-cid-ui3vowdy> <label for="precio_max" data-astro-cid-ui3vowdy>${translations.precio_max || "Precio Máximo"}</label> <input type="number" id="precio_max" min="0" step="0.5" placeholder="S/ 100.00" data-astro-cid-ui3vowdy> </div> <div class="input-group btn-group" data-astro-cid-ui3vowdy> <button type="submit" class="btn-neon" data-astro-cid-ui3vowdy>${translations.aplicar_filtros || "Aplicar Filtros"}</button> </div> </form> </div> </div>  ${renderScript($$result, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/gastronomia/Filtros.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/gastronomia/Filtros.astro", void 0);

const API_URL = "http://localhost:3000/api";
async function fetchAPI(endpoint, options = {}) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }
  const headers = {
    "Content-Type": "application/json",
    ...token && { Authorization: `Bearer ${token}` },
    ...options.headers
  };
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  if (!res.ok) {
    let errorMsg = "Error en la petición";
    try {
      const errorData = await res.json();
      errorMsg = errorData.error || errorMsg;
    } catch (e) {
      errorMsg = res.statusText || errorMsg;
    }
    throw new Error(errorMsg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// src/services/restaurante.service.js

async function obtenerRestaurantes(filtros = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value);
        }
    });
    const response = await fetchAPI(`/restaurantes?${params}`);
    // El backend devuelve { total, data, limit, offset }
    return response.data;
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const lang = Astro2.cookies.get("lang")?.value || "es";
  let translations;
  try {
    translations = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../i18n/en.json": () => import('./en_DgkWZI3c.mjs'),"../../i18n/es.json": () => import('./es_B0J-Kw12.mjs'),"../../i18n/fr.json": () => import('./fr_TpDuZsR0.mjs'),"../../i18n/ja.json": () => import('./ja_BLpGwHGQ.mjs'),"../../i18n/ko.json": () => import('./ko_ChuV9bEW.mjs'),"../../i18n/pt.json": () => import('./pt_BS6s2Zsb.mjs'),"../../i18n/qu.json": () => import('./qu_J8xx3tX-.mjs'),"../../i18n/ru.json": () => import('./ru_CXUoNMir.mjs'),"../../i18n/zh.json": () => import('./zh_Ctf9Rthf.mjs')})), `../../i18n/${lang}.json`, 4);
  } catch (e) {
    translations = await import('./es_B0J-Kw12.mjs');
  }
  let restaurantes = [];
  let error = null;
  try {
    const data = await obtenerRestaurantes();
    restaurantes = data;
  } catch (e) {
    error = e.message;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$GastronomiaLayout, { "lang": lang, "data-astro-cid-k4cyebsn": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-k4cyebsn> <h1 class="page-title" data-astro-cid-k4cyebsn>${translations.todos_los_restaurantes || "Todos los restaurantes"}</h1> <div class="neon-divider" data-astro-cid-k4cyebsn></div> </div>  ${renderComponent($$result2, "Filtros", $$Filtros, { "translations": translations, "data-astro-cid-k4cyebsn": true })} <div id="restaurantes-list" class="list-container" data-astro-cid-k4cyebsn> ${error ? renderTemplate`<div class="error-box" data-astro-cid-k4cyebsn> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-k4cyebsn> <circle cx="12" cy="12" r="10" data-astro-cid-k4cyebsn></circle> <line x1="12" y1="8" x2="12" y2="12" data-astro-cid-k4cyebsn></line> <line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-k4cyebsn></line> </svg> <span data-astro-cid-k4cyebsn>Error al cargar restaurantes: ${error}</span> </div>` : restaurantes.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-k4cyebsn> <p data-astro-cid-k4cyebsn>${translations.no_resultados || "No se encontraron restaurantes."}</p> </div>` : renderTemplate`<div class="restaurants-grid" data-astro-cid-k4cyebsn> ${restaurantes.map((rest) => renderTemplate`${renderComponent($$result2, "RestauranteCard", $$RestauranteCard, { "restaurante": rest, "translations": translations, "data-astro-cid-k4cyebsn": true })}`)} </div>`} </div> ` })}  ${renderScript($$result, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/gastronomia/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/gastronomia/index.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/gastronomia/index.astro";
const $$url = "/gastronomia";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
