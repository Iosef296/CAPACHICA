import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate, m as maybeRenderHead, g as addAttribute } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';

const $$Alojamiento = createComponent(($$result, $$props, $$slots) => {
  const opciones = [
    {
      emoji: "🏡",
      tipo: "Familia Anfitriona",
      nombre: "Familia Quispe",
      lugar: "Llachón",
      precio: 80,
      unidad: "persona/noche",
      estrellas: 5,
      desc: "Hospedaje vivencial con desayuno y cena incluidos. Productos del lago y la chacra propia. Vista directa al Titicaca desde el dormitorio.",
      amenities: ["🍽️ Comidas incluidas", "🌅 Vista al lago", "🚣 Paseo en bote", "🌿 Chacra propia"],
      color: "#38bdf8",
      popular: true
    },
    {
      emoji: "🌿",
      tipo: "Familia Anfitriona",
      nombre: "Familia Mamani",
      lugar: "Escallani",
      precio: 70,
      unidad: "persona/noche",
      estrellas: 5,
      desc: "Entre totorales y aves silvestres. La señora Mamani enseña tejido tradicional a sus huéspedes cada mañana antes del desayuno.",
      amenities: ["🎨 Taller de tejido", "🦆 Avistamiento de aves", "🐟 Pesca artesanal", "🌾 Entorno natural"],
      color: "#34d399",
      popular: false
    },
    {
      emoji: "🏘️",
      tipo: "Familia Anfitriona",
      nombre: "Familia Ccama",
      lugar: "Bahía de Chifrón",
      precio: 95,
      unidad: "persona/noche",
      estrellas: 5,
      desc: "A orillas de la bahía. Kayak libre incluido y sesión de pesca artesanal al amanecer. Pensión completa con cocina novoandina.",
      amenities: ["🚣 Kayak libre", "🌅 Pesca al amanecer", "🍽️ Pensión completa", "🏊 Acceso a orilla"],
      color: "#fbbf24",
      popular: false
    },
    {
      emoji: "⛵",
      tipo: "Lodge",
      nombre: "Lodge Titicaca View",
      lugar: "Capachica Centro",
      precio: 150,
      unidad: "habitación/noche",
      estrellas: 4,
      desc: "Cabaña privada con baño propio y terraza con vista panorámica al lago. Ideal para parejas y viajeros que buscan más privacidad.",
      amenities: ["🛁 Baño privado", "🏔️ Terraza panorámica", "☕ Desayuno buffet", "🔒 Habitación privada"],
      color: "#a78bfa",
      popular: false
    },
    {
      emoji: "🌄",
      tipo: "Hostal",
      nombre: "Hostal Amanecer Andino",
      lugar: "Capachica Centro",
      precio: 45,
      unidad: "persona/noche",
      estrellas: 3,
      desc: "Perfecta base para explorar toda la península. Habitaciones compartidas y privadas. Los guías locales del hostal conocen cada sendero.",
      amenities: ["🗺️ Guías locales", "🚲 Alquiler de bici", "📶 Wifi", "👥 Hab. compartida o privada"],
      color: "#f472b6",
      popular: false
    },
    {
      emoji: "⭐",
      tipo: "Casa Rural",
      nombre: "Casa Rural Pachamama",
      lugar: "Llachón Alta",
      precio: 220,
      unidad: "habitación/noche",
      estrellas: 5,
      desc: "La opción premium de la península. Habitaciones amplias, restaurante con cocina novoandina y spa de medicina ancestral andina.",
      amenities: ["💆 Spa andino", "🍷 Restaurante gourmet", "🌿 Medicina ancestral", "🏔️ Vista 360°"],
      color: "#fb923c",
      popular: false
    }
  ];
  function stars(n) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Alojamiento — Capachica Turismo", "description": "Hospedaje auténtico en Capachica: familias anfitrionas quechuas, lodges con vista al Titicaca y hostales para todos los presupuestos." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="min-height:100vh;background:var(--bg-main);padding-top:66px;"> <!-- Hero --> <div style="position:relative;padding:5.5rem 1.5rem 3.5rem;text-align:center;overflow:hidden;"> <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(56,189,248,0.1) 0%,transparent 65%);pointer-events:none;"></div> <div style="position:relative;z-index:1;max-width:660px;margin:0 auto;"> <span class="section-label reveal">🏡 Hospedaje Auténtico</span> <h1 class="section-title reveal" style="font-size:clamp(2.2rem,5.5vw,3.8rem);margin-bottom:1rem;">
Duerme en <span class="gradient-text">Capachica</span> </h1> <p class="reveal" style="font-size:1rem;color:var(--text2);line-height:1.78;max-width:520px;margin:0 auto 2rem;">
Despierta con el lago en tu ventana. Desde familias anfitrionas auténticas hasta lodges con vistas espectaculares, hay un alojamiento perfecto para ti.
</p> <!-- Filtros visuales --> <div class="reveal" style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;"> ${["Todos", "Familia Anfitriona", "Lodge", "Hostal", "Casa Rural"].map((f, i) => renderTemplate`<span${addAttribute(`
              padding:0.45rem 1.1rem;border-radius:999px;font-size:0.82rem;font-weight:500;cursor:default;
              ${i === 0 ? "background:linear-gradient(135deg,#0ea5e9,#0369a1);color:#fff;box-shadow:0 2px 12px rgba(56,189,248,0.3);" : "background:rgba(56,189,248,0.07);border:1px solid rgba(56,189,248,0.2);color:var(--text2);"}
            `, "style")}>${f}</span>`)} </div> </div> </div> <!-- Grid --> <div style="max-width:1200px;margin:0 auto;padding:0 1.5rem 4rem;"> <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;"> ${opciones.map((o, i) => renderTemplate`<div class="reveal card"${addAttribute(`padding:0;overflow:hidden;transition-delay:${i * 0.07}s;position:relative;`, "style")}> ${o.popular && renderTemplate`<div style="position:absolute;top:12px;right:12px;z-index:10;padding:4px 12px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.1em;background:linear-gradient(135deg,#fbbf24,#f97316);color:#fff;box-shadow:0 2px 12px rgba(251,191,36,0.4);">
★ POPULAR
</div>`} <!-- Header --> <div${addAttribute(`
              height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;
              background:linear-gradient(135deg,rgba(6,15,26,0.95),rgba(8,49,80,0.4));
              border-bottom:1px solid var(--border);position:relative;overflow:hidden;
            `, "style")}> <div${addAttribute(`
                position:absolute;inset:0;
                background:radial-gradient(circle at 70% 30%,rgba(${o.color.replace("#", "").match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",")},0.15) 0%,transparent 60%);
              `, "style")}></div> <div style="font-size:3rem;z-index:1;">${o.emoji}</div> <span${addAttribute(`
                margin-top:0.6rem;padding:3px 11px;border-radius:999px;font-size:10px;font-weight:600;
                background:rgba(${o.color.replace("#", "").match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",")},0.15);
                color:${o.color};border:1px solid rgba(${o.color.replace("#", "").match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",")},0.25);
              `, "style")}>${o.tipo}</span> </div> <!-- Body --> <div style="padding:1.4rem;"> <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.3rem;"> <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--text);">${o.nombre}</h3> <span style="font-size:12px;color:#fbbf24;letter-spacing:-1px;flex-shrink:0;margin-left:8px;">${stars(o.estrellas)}</span> </div> <div style="font-size:0.75rem;color:var(--accent);margin-bottom:0.7rem;font-weight:500;">📍 ${o.lugar}</div> <p style="font-size:0.86rem;color:var(--text2);line-height:1.68;margin-bottom:1rem;">${o.desc}</p> <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.35rem;margin-bottom:1.2rem;"> ${o.amenities.map((a) => renderTemplate`<span style="font-size:11px;color:var(--text3);background:rgba(255,255,255,0.04);padding:4px 8px;border-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${a} </span>`)} </div> <div style="display:flex;align-items:center;justify-content:space-between;padding-top:0.8rem;border-top:1px solid var(--border);"> <div> <span${addAttribute(`font-family:var(--font-display);font-size:1.5rem;font-weight:800;color:${o.color};`, "style")}>
S/ ${o.precio} </span> <span style="font-size:0.75rem;color:var(--text3);margin-left:4px;">/ ${o.unidad}</span> </div> <button${addAttribute(`
                  padding:8px 18px;border-radius:999px;border:1px solid rgba(${o.color.replace("#", "").match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",")},0.35);
                  background:rgba(${o.color.replace("#", "").match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",")},0.1);
                  color:${o.color};font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;
                `, "style")}>Consultar →</button> </div> </div> </div>`)} </div> </div> <!-- Info Banner --> <div style="border-top:1px solid var(--border);padding:4rem 1.5rem;background:linear-gradient(to bottom,rgba(56,189,248,0.04),transparent);"> <div style="max-width:900px;margin:0 auto;"> <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;"> ${[
    { icon: "✅", title: "Verificados", desc: "Todos los alojamientos son inspeccionados y verificados por nuestro equipo." },
    { icon: "💬", title: "Sin intermediarios", desc: "Contacto directo con las familias. Tu dinero va directo a la comunidad." },
    { icon: "🔄", title: "Cancelación flexible", desc: "La mayoría permite cancelar hasta 48 horas antes sin penalización." },
    { icon: "🗺️", title: "Soporte local", desc: "Nuestro equipo en Capachica te asiste durante toda tu estadía." }
  ].map((item) => renderTemplate`<div class="reveal" style="text-align:center;padding:1.5rem 1rem;"> <div style="font-size:2rem;margin-bottom:0.75rem;">${item.icon}</div> <div style="font-weight:700;color:var(--text);margin-bottom:0.4rem;font-size:0.95rem;">${item.title}</div> <div style="font-size:0.82rem;color:var(--text3);line-height:1.6;">${item.desc}</div> </div>`)} </div> </div> </div> </div> ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/alojamiento.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/alojamiento.astro";
const $$url = "/alojamiento";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Alojamiento,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
