import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      inicio: "Inicio",
      destinos: "Destinos",
      vivencial: "Vivencial",
      actividades: "Actividades",
      gastronomia: "Gastronomía",
      festividades: "Festividades",
      artesania: "Artesanía",
      alojamiento: "Alojamiento",
      comoLlegar: "Cómo Llegar"
    },
    vivencial: {
      badge: "VIVENCIAL · CAPACHICA",
      titulo: "Turismo",
      subtitulo: "Vivencial",
      descripcion: "Más que turismo: una inmersión real en la vida andina de las familias de Capachica.",
      verFamilias: "Ver familias →",
      reservar: "Reservar ahora",
      quees: "¿Qué es el Turismo Vivencial?",
      queesDesc: "El turismo vivencial es una experiencia única donde te conviertes en parte de una familia andina de la península de Capachica.",
      tuDia: "Tu día en Capachica",
      disponible: "Disponible",
      ocupado: "Ocupado",
      explorar: "Explorar →",
      verTodos: "Ver todos",
      porPersonaNoche: "/persona/noche"
    },
    reserva: {
      titulo: "Reserva tu",
      subtitulo: "Experiencia",
      familia: "Familia anfitriona",
      sorpresa: "Sorpréndeme 🎲",
      nombre: "Nombre completo *",
      email: "Email *",
      telefono: "WhatsApp / Teléfono",
      personas: "Número de personas *",
      llegada: "Fecha de llegada *",
      salida: "Fecha de salida *",
      actividad: "Actividad preferida",
      cualquiera: "Cualquiera",
      pesca: "🎣 Pesca artesanal",
      tejido: "🪡 Tejido en telar",
      agricultura: "🌿 Agricultura orgánica",
      cocina: "🍲 Cocina andina",
      pago: "Método de pago",
      seleccionar: "Seleccionar",
      notas: "Notas o requerimientos especiales",
      notasPlaceholder: "Dietas especiales, niños, celebraciones...",
      btnReservar: "Reservar ahora",
      enviando: "Enviando...",
      exito: "¡Reserva confirmada!",
      codigoMsg: "Tu código es:",
      emailMsg: "Recibirás un email de confirmación pronto.",
      incluye1: "✓ Incluye desayuno, almuerzo y cena",
      incluye2: "✓ Actividades con la familia",
      incluye3: "✓ Cancelación gratuita 48h antes",
      politica: "Al reservar aceptas nuestra política de cancelación.",
      camposObligatorios: "Por favor completa todos los campos obligatorios."
    },
    artesania: {
      badge: "ARTESANÍA · CAPACHICA",
      titulo: "Artesanía",
      subtitulo: "Capachiqueña",
      descripcion: "Tejidos de alpaca, cerámica andina y artesanías hechas a mano centenarias.",
      todos: "Todos",
      comprar: "🛒 Comprar",
      cerrar: "Cerrar",
      verMas: "Ver más",
      verTodos: "Ver todos los productos",
      talleres: "Aprende con las",
      talleresSubtitulo: "Artesanas",
      talleresDesc: "Talleres con maestras artesanas. Te llevas tu propia creación.",
      reservarTaller: "Reservar",
      porPersona: "/persona"
    },
    comoLlegar: {
      badge: "CÓMO LLEGAR · CAPACHICA",
      titulo: "Planifica tu",
      subtitulo: "Viaje",
      descripcion: "Cuentanos tu sueño y lo hacemos realidad. Respondemos en 24 horas.",
      calculadora: "🗺️ Calculadora de Ruta",
      calculadoraDesc: "Ingresa tu ciudad de origen y te mostramos la mejor ruta",
      placeholder: "¿Desde dónde viajas? Ej: Lima, Cusco, Arequipa...",
      verRuta: "Ver ruta →",
      ubicacion: "Encuéntranos en el mapa",
      transportistas: "Transportistas de Confianza",
      consejos: "Consejos para tu viaje"
    },
    footer: {
      tagline: "La joya escondida del Lago Titicaca",
      destinos: "DESTINOS",
      experiencias: "EXPERIENCIAS",
      info: "INFO",
      derechos: "© 2026 Capachica Turismo.",
      hecho: "Hecho con amor a las orillas del lago Titicaca"
    }
  }};

const LangContext = createContext({
  lang: "es",
  setLang: () => {
  },
  t: translations["es"]
});
function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within <LangProvider>");
  }
  return ctx;
}

const API_URL = "http://localhost:4000";
const categorias = [
  { id: "todos", label: { es: "Todos", en: "All", fr: "Tous" } },
  {
    id: "textil",
    label: { es: "🪡 Textiles", en: "🪡 Textiles", fr: "🪡 Textiles" }
  },
  {
    id: "bordado",
    label: { es: "🧵 Bordados", en: "🧵 Embroidery", fr: "🧵 Broderie" }
  },
  {
    id: "ceramica",
    label: { es: "🏺 Cerámica", en: "🏺 Ceramics", fr: "🏺 Céramique" }
  },
  {
    id: "joyeria",
    label: { es: "💍 Joyería", en: "💍 Jewelry", fr: "💍 Bijoux" }
  }
];
const talleres = [
  {
    nombre: {
      es: "Taller de Tejido",
      en: "Weaving Workshop",
      fr: "Atelier Tissage"
    },
    duracion: "2-3h",
    precio: 35,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée"
    },
    emoji: "🪡",
    max: 8
  },
  {
    nombre: {
      es: "Taller de Bordado",
      en: "Embroidery Workshop",
      fr: "Atelier Broderie"
    },
    duracion: "3h",
    precio: 40,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée"
    },
    emoji: "🧵",
    max: 8
  },
  {
    nombre: {
      es: "Taller de Cerámica",
      en: "Ceramics Workshop",
      fr: "Atelier Céramique"
    },
    duracion: "2h",
    precio: 30,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée"
    },
    emoji: "🏺",
    max: 6
  },
  {
    nombre: {
      es: "Taller de Teñido Natural",
      en: "Natural Dyeing Workshop",
      fr: "Atelier Teinture Naturelle"
    },
    duracion: "2h",
    precio: 35,
    incluye: {
      es: "Materiales + prenda teñida",
      en: "Materials + dyed garment",
      fr: "Matériaux + vêtement teint"
    },
    emoji: "🎨",
    max: 6
  }
];
function ArtesaniaPage() {
  const { lang, t } = useLang();
  const [categoria, setCategoria] = useState("todos");
  const [moneda, setMoneda] = useState("soles");
  const [seleccionado, setSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState({});
  useEffect(() => {
    const fetchArtesanias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/artesanias`);
        if (!res.ok) throw new Error("Error al cargar");
        const data = await res.json();
        setProductos(data.data || data);
      } catch (err) {
        console.error("Error fetching artesanías:", err);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtesanias();
    const interval = setInterval(fetchArtesanias, 3e4);
    return () => clearInterval(interval);
  }, []);
  const filtrados = categoria === "todos" ? productos : productos.filter((p) => p.tipo === categoria);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .artesania-hero { padding: 100px 0 60px; background: rgba(7,24,38,0.8); text-align: center; }
        .artesania-catalogo { padding: 80px 0; background: rgba(7,24,38,0.5); }
        .artesania-talleres { padding: 80px 0; background: rgba(11,34,53,0.7); }
        .art-card { background: rgba(18,47,76,0.78); border: 1px solid rgba(120,200,255,0.15); border-radius: 20px; overflow: hidden; cursor: pointer; transition: transform 0.25s; }
        .art-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .art-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 900px) { .art-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .art-grid { grid-template-columns: 1fr; } }
        .taller-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 900px) { .taller-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .taller-grid { grid-template-columns: 1fr; } }
        .taller-card { background: rgba(18,47,76,0.78); border: 1px solid rgba(120,200,255,0.15); border-radius: 20px; padding: 24px; transition: transform 0.2s; }
        .taller-card:hover { transform: translateY(-4px); }
        .filter-btn { padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(120,200,255,0.2); background: transparent; color: #7f95aa; font-size: 13px; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: linear-gradient(135deg,#1ba6d9,#0b6ea8); color: #fff; border-color: transparent; }
        .sec-title { color: #f4f7fb; }
        .sec-muted { color: #7f95aa; }
        .sec-text { color: #b9c8d6; }
        .art-precio { color: #53d3ff; }
        .art-gold { color: #f5b32f; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal-box { background: #0b2235; border: 1px solid rgba(120,200,255,0.2); border-radius: 24px; max-width: 500px; width: 100%; overflow: hidden; max-height: 90vh; overflow-y: auto; }
        .skeleton { background: linear-gradient(90deg, rgba(18,47,76,0.5) 25%, rgba(31,110,156,0.3) 50%, rgba(18,47,76,0.5) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 20px; height: 280px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      ` }),
    /* @__PURE__ */ jsx("section", { className: "artesania-hero", id: "artesania", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("span", { className: "badge badge-gold", children: t?.artesania?.badge || "ARTESANÍA" }),
      /* @__PURE__ */ jsxs("h1", { style: { fontFamily: "var(--font-display)", lineHeight: 0.95 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "sec-title",
            style: {
              display: "block",
              fontSize: "clamp(42px,7vw,80px)",
              fontWeight: 700
            },
            children: t?.artesania?.titulo || "Artesanía"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "art-gold",
            style: {
              display: "block",
              fontSize: "clamp(38px,6.5vw,72px)",
              fontStyle: "italic",
              fontWeight: 400
            },
            children: t?.artesania?.subtitulo || "Capachiqueña"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "sec-text",
          style: {
            marginTop: 20,
            fontSize: 16,
            maxWidth: 500,
            margin: "20px auto 0",
            lineHeight: 1.7
          },
          children: t?.artesania?.descripcion || "Artesanía tradicional de Capachica"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "artesania-catalogo", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 40
          },
          children: [
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: categorias.map((c) => /* @__PURE__ */ jsx(
              "button",
              {
                className: `filter-btn ${categoria === c.id ? "active" : ""}`,
                onClick: () => setCategoria(c.id),
                children: c.label[lang]
              },
              c.id
            )) }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: ["soles", "usd"].map((m) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMoneda(m),
                style: {
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(120,200,255,0.2)",
                  background: moneda === m ? "rgba(245,179,47,0.15)" : "transparent",
                  color: moneda === m ? "#f5b32f" : "#7f95aa",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                },
                children: m === "soles" ? "S/." : "USD"
              },
              m
            )) })
          ]
        }
      ),
      loading ? /* @__PURE__ */ jsx("div", { className: "art-grid", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx("div", { className: "skeleton" }, i)) }) : filtrados.length > 0 ? /* @__PURE__ */ jsx("div", { className: "art-grid", children: filtrados.map((p) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "art-card",
          onClick: () => setSeleccionado(p),
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  height: 200,
                  position: "relative",
                  overflow: "hidden"
                },
                children: [
                  p.imagen_url && !imgErrors[p.id] ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: p.imagen_url,
                      alt: p.nombre,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      },
                      onError: () => setImgErrors((prev) => ({ ...prev, [p.id]: true }))
                    }
                  ) : /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 64,
                        opacity: 0.5
                      },
                      children: "🎨"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "badge badge-gold",
                      style: {
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontSize: 10
                      },
                      children: p.tipo
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { padding: "18px 18px 22px" }, children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "sec-title",
                  style: { fontSize: 17, fontWeight: 700, marginBottom: 4 },
                  children: p.nombre
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: "sec-muted",
                  style: { fontSize: 12, marginBottom: 4 },
                  children: [
                    "Por ",
                    /* @__PURE__ */ jsx("span", { className: "art-gold", children: p.artesana_nombre })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: "sec-muted",
                  style: { fontSize: 11, marginBottom: 14 },
                  children: [
                    "✦ ",
                    p.tecnica
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "art-precio",
                        style: { fontSize: 22, fontWeight: 700 },
                        children: moneda === "soles" ? `S/. ${p.precio_soles}` : `$${p.precio_usd}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "btn-outline",
                        style: { padding: "6px 14px", fontSize: 12 },
                        children: t?.artesania?.verMas || "Ver más"
                      }
                    )
                  ]
                }
              )
            ] })
          ]
        },
        p.id
      )) }) : /* @__PURE__ */ jsx(
        "div",
        {
          style: { textAlign: "center", padding: "40px", color: "#7f95aa" },
          children: /* @__PURE__ */ jsx("p", { children: t?.artesania?.sinProductos || "No hay artesanías disponibles" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "artesania-talleres", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
        /* @__PURE__ */ jsx("span", { className: "badge badge-cyan", children: "— TALLERES" }),
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "sec-title",
            style: {
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 8
            },
            children: [
              t?.artesania?.talleres || "Aprende con las",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { className: "art-gold", style: { fontStyle: "italic" }, children: t?.artesania?.talleresSubtitulo || "Artesanas" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "taller-grid", children: talleres.map((tl, i) => /* @__PURE__ */ jsxs("div", { className: "taller-card", children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 40, marginBottom: 16 }, children: tl.emoji }),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: "sec-title",
            style: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
            children: tl.nombre[lang]
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "sec-muted",
            style: { fontSize: 13, marginBottom: 4 },
            children: [
              "⏱ ",
              tl.duracion
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "sec-muted",
            style: { fontSize: 12, marginBottom: 16 },
            children: [
              "✓ ",
              tl.incluye[lang]
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "art-precio",
                  style: { fontSize: 22, fontWeight: 700 },
                  children: [
                    "S/. ",
                    tl.precio
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn-primary",
                  style: { padding: "8px 16px", fontSize: 12 },
                  children: t?.artesania?.reservarTaller || "Reservar"
                }
              )
            ]
          }
        )
      ] }, i)) })
    ] }) }),
    seleccionado && /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: () => setSeleccionado(null), children: /* @__PURE__ */ jsxs("div", { className: "modal-box", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: { height: 240, position: "relative", overflow: "hidden" },
          children: [
            seleccionado.imagen_url && !imgErrors[seleccionado.id] ? /* @__PURE__ */ jsx(
              "img",
              {
                src: seleccionado.imagen_url,
                alt: seleccionado.nombre,
                style: { width: "100%", height: "100%", objectFit: "cover" }
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80
                },
                children: "🎨"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSeleccionado(null),
                style: {
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer"
                },
                children: "×"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { padding: "24px 28px 28px" }, children: [
        /* @__PURE__ */ jsx("span", { className: "badge badge-gold", children: seleccionado.tipo }),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: "sec-title",
            style: { fontSize: 24, fontWeight: 700, marginBottom: 12 },
            children: seleccionado.nombre
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 20
            },
            children: [
              /* @__PURE__ */ jsxs("p", { className: "sec-muted", children: [
                "🧑‍🎨",
                " ",
                /* @__PURE__ */ jsx("span", { className: "art-gold", children: seleccionado.artesana_nombre })
              ] }),
              seleccionado.tecnica && /* @__PURE__ */ jsxs("p", { className: "sec-muted", children: [
                "🔧 ",
                seleccionado.tecnica
              ] }),
              seleccionado.materiales && /* @__PURE__ */ jsxs("p", { className: "sec-muted", children: [
                "🌿 ",
                seleccionado.materiales
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              padding: "16px",
              background: "rgba(83,211,255,0.06)",
              borderRadius: 12
            },
            children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "art-precio",
                  style: { fontSize: 28, fontWeight: 700 },
                  children: [
                    "S/. ",
                    seleccionado.precio_soles
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "sec-muted", children: [
                "≈ $",
                seleccionado.precio_usd,
                " USD"
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12 }, children: [
          /* @__PURE__ */ jsx("button", { className: "btn-primary", style: { flex: 1 }, children: t?.artesania?.comprar || "Comprar" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "btn-outline",
              onClick: () => setSeleccionado(null),
              style: { flex: 1 },
              children: t?.artesania?.cerrar || "Cerrar"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Artesania = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Artesanía — Capachica" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Artesania", ArtesaniaPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/Artesania", "client:component-export": "default" })} ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/artesania.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/artesania.astro";
const $$url = "/artesania";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Artesania,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
