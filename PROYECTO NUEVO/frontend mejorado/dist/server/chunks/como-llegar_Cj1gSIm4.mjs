import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

const rutas = [
  {
    id: "tierra",
    icon: "🚌",
    titulo: "Por Tierra desde Puno",
    distancia: "55 km",
    tiempo: "1.5 - 2h",
    opciones: [
      {
        nombre: "Minibús",
        detalle: "Terminal Zonal Puno",
        precio: "S/. 10-15",
        horario: "5am - 6pm",
        tiempo: "1.5-2h",
        icon: "🚐"
      },
      {
        nombre: "Taxi privado",
        detalle: "Directo a Capachica",
        precio: "S/. 80-120",
        horario: "Cualquier hora",
        tiempo: "1h",
        icon: "🚕"
      },
      {
        nombre: "Mototaxi",
        detalle: "Dentro de Capachica",
        precio: "S/. 3-8",
        horario: "Todo el día",
        tiempo: "15min",
        icon: "🛺"
      }
    ]
  },
  {
    id: "aire",
    icon: "✈️",
    titulo: "Por Aire hasta Juliaca",
    distancia: "JUL → 30km a Puno",
    tiempo: "1h 20min desde Lima",
    opciones: [
      {
        nombre: "Desde Lima",
        detalle: "LATAM, Sky Airlines",
        precio: "Desde $60",
        horario: "Diario",
        tiempo: "1h 20min",
        icon: "✈️"
      },
      {
        nombre: "Desde Cusco",
        detalle: "Vuelo directo",
        precio: "Desde $45",
        horario: "Diario",
        tiempo: "40min",
        icon: "✈️"
      },
      {
        nombre: "Taxi Aeropuerto",
        detalle: "JUL → Puno",
        precio: "S/. 30",
        horario: "Todo el día",
        tiempo: "30min",
        icon: "🚕"
      }
    ]
  },
  {
    id: "bus",
    icon: "🚌",
    titulo: "Bus Interprovincial",
    distancia: "Varias ciudades",
    tiempo: "5-6h desde Cusco",
    opciones: [
      {
        nombre: "Desde Cusco",
        detalle: "Buses nocturnos disponibles",
        precio: "S/. 30-50",
        horario: "Nocturno",
        tiempo: "5-6h",
        icon: "🚌"
      },
      {
        nombre: "Desde Arequipa",
        detalle: "Directo a Puno",
        precio: "S/. 25-40",
        horario: "Diario",
        tiempo: "5-6h",
        icon: "🚌"
      },
      {
        nombre: "Desde La Paz",
        detalle: "Cruzando Copacabana",
        precio: "S/. 20-35",
        horario: "Diario",
        tiempo: "3h",
        icon: "🚌"
      }
    ]
  },
  {
    id: "lago",
    icon: "⛵",
    titulo: "Por el Lago Titicaca",
    distancia: "Muelle de Puno",
    tiempo: "2-3h en bote",
    opciones: [
      {
        nombre: "Bote desde Puno",
        detalle: "Travesía espectacular",
        precio: "S/. 40-60",
        horario: "Mañanas",
        tiempo: "2-3h",
        icon: "⛵"
      }
    ]
  }
];
const consejos = [
  {
    icon: "🌿",
    titulo: "Soroche (mal de altura)",
    desc: "Toma mate de coca al llegar. Descansa el primer día. Evita alcohol las primeras horas."
  },
  {
    icon: "💊",
    titulo: "Medicación",
    desc: "Consulta a tu médico sobre Acetazolamida (Diamox) si eres sensible a la altitud."
  },
  {
    icon: "💧",
    titulo: "Hidratación",
    desc: "Bebe mínimo 2 litros de agua al día. Capachica está a 3,810 m.s.n.m."
  },
  {
    icon: "🧥",
    titulo: "Ropa",
    desc: "Trae ropa abrigadora. Las noches son frías aunque el día sea cálido."
  },
  {
    icon: "📱",
    titulo: "Conectividad",
    desc: "Movistar y Claro tienen señal. Descarga mapas offline de la zona antes de viajar."
  },
  {
    icon: "💰",
    titulo: "Efectivo",
    desc: "Lleva soles en efectivo. No hay cajeros en Capachica, el más cercano está en Puno."
  }
];
const transportistas = [
  {
    nombre: "Transportes Capachica",
    telefono: "+51 951 234 567",
    servicio: "Minibús Puno-Capachica"
  },
  {
    nombre: "Taxi Don Carlos",
    telefono: "+51 962 345 678",
    servicio: "Taxi privado, recogida en aeropuerto"
  },
  {
    nombre: "Botes del Lago",
    telefono: "+51 973 456 789",
    servicio: "Travesía en bote desde Puno"
  }
];
function ComoLlegar() {
  const [rutaActiva, setRutaActiva] = useState("tierra");
  const [origen, setOrigen] = useState("");
  const rutaSeleccionada = rutas.find((r) => r.id === rutaActiva);
  const calcularRuta = () => {
    if (!origen) return;
    const origenLower = origen.toLowerCase();
    if (origenLower.includes("lima")) setRutaActiva("aire");
    else if (origenLower.includes("cusco") || origenLower.includes("arequipa") || origenLower.includes("paz"))
      setRutaActiva("bus");
    else if (origenLower.includes("puno")) setRutaActiva("tierra");
    else setRutaActiva("tierra");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .llegar-hero {
          padding: 100px 0 60px;
          background: rgba(7,24,38,0.8);
          text-align: center;
        }
        [data-theme="light"] .llegar-hero { background: rgba(168,212,238,0.35); }

        .llegar-section { padding: 80px 0; }
        .llegar-bg { background: rgba(7,24,38,0.5); }
        [data-theme="light"] .llegar-bg { background: rgba(168,212,238,0.2); }
        .llegar-bg2 { background: rgba(11,34,53,0.7); }
        [data-theme="light"] .llegar-bg2 { background: rgba(200,228,245,0.4); }

        .ruta-tab {
          padding: 12px 20px; border-radius: 16px;
          border: 1px solid rgba(120,200,255,0.2);
          background: transparent; color: #7f95aa;
          font-family: var(--font-body); font-size: 14px;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .ruta-tab:hover, .ruta-tab.active {
          background: linear-gradient(135deg,#1ba6d9,#0b6ea8);
          color: #fff; border-color: transparent;
          box-shadow: 0 0 20px rgba(83,211,255,0.25);
        }
        [data-theme="light"] .ruta-tab { color: #5a7a93; border-color: rgba(11,122,181,0.2); }

        .opcion-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px 24px; transition: transform 0.2s, box-shadow 0.2s;
        }
        [data-theme="light"] .opcion-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }
        .opcion-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(83,211,255,0.1);
        }

        .consejo-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px;
        }
        [data-theme="light"] .consejo-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }

        .consejos-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        @media (max-width: 900px) { .consejos-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .consejos-grid { grid-template-columns: 1fr; } }

        .rutas-tabs {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px;
        }

        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .sec-text { color: #b9c8d6; }
        [data-theme="light"] .sec-text { color: #2a4a63; }
        .sec-muted { color: #7f95aa; }
        [data-theme="light"] .sec-muted { color: #5a7a93; }
        .cyan { color: #53d3ff; }
        [data-theme="light"] .cyan { color: #0b7ab5; }
        .gold { color: #f5b32f; }
        [data-theme="light"] .gold { color: #c47d00; }

        .calculadora {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 20px;
          padding: 32px; margin-bottom: 40px;
        }
        [data-theme="light"] .calculadora {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }

        .transportista-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px 24px;
        }
        [data-theme="light"] .transportista-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }
        .transportistas-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        @media (max-width: 768px) { .transportistas-grid { grid-template-columns: 1fr; } }
      ` }),
    /* @__PURE__ */ jsx("section", { className: "llegar-hero", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "badge badge-cyan",
          style: { marginBottom: 20, display: "inline-block" },
          children: "CÓMO LLEGAR · CAPACHICA"
        }
      ),
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
            children: "Planifica tu"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "gold",
            style: {
              display: "block",
              fontSize: "clamp(38px,6.5vw,72px)",
              fontStyle: "italic",
              fontWeight: 400
            },
            children: "Viaje"
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
          children: "Cuentanos tu sueño y lo hacemos realidad. Respondemos en 24 horas."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "llegar-section llegar-bg", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "calculadora", children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 700,
              marginBottom: 8
            },
            children: "🗺️ Calculadora de Ruta"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "sec-muted", style: { fontSize: 14, marginBottom: 24 }, children: "Ingresa tu ciudad de origen y te mostramos la mejor ruta" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              value: origen,
              onChange: (e) => setOrigen(e.target.value),
              placeholder: "¿Desde dónde viajas? Ej: Lima, Cusco, Arequipa...",
              onKeyDown: (e) => e.key === "Enter" && calcularRuta(),
              style: {
                flex: 1,
                minWidth: 200,
                padding: "12px 16px",
                background: "rgba(11,60,96,0.5)",
                border: "1px solid rgba(120,200,255,0.2)",
                borderRadius: 12,
                color: "#f4f7fb",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                outline: "none"
              }
            }
          ),
          /* @__PURE__ */ jsx("button", { onClick: calcularRuta, className: "btn-primary", children: "Ver ruta →" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rutas-tabs", children: rutas.map((r) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `ruta-tab ${rutaActiva === r.id ? "active" : ""}`,
          onClick: () => setRutaActiva(r.id),
          children: [
            /* @__PURE__ */ jsx("span", { children: r.icon }),
            /* @__PURE__ */ jsx("span", { children: r.titulo })
          ]
        },
        r.id
      )) }),
      rutaSeleccionada && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "h3",
                {
                  className: "sec-title",
                  style: {
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 700
                  },
                  children: [
                    rutaSeleccionada.icon,
                    " ",
                    rutaSeleccionada.titulo
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ jsx("span", { className: "badge badge-cyan", children: rutaSeleccionada.distancia }),
                /* @__PURE__ */ jsx("span", { className: "badge badge-gold", children: rutaSeleccionada.tiempo })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
              gap: 20
            },
            children: rutaSeleccionada.opciones.map((op, i) => /* @__PURE__ */ jsxs("div", { className: "opcion-card", children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: 32, marginBottom: 12 }, children: op.icon }),
              /* @__PURE__ */ jsx(
                "h4",
                {
                  className: "sec-title",
                  style: {
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 4
                  },
                  children: op.nombre
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "sec-muted",
                  style: { fontSize: 13, marginBottom: 12 },
                  children: op.detalle
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          background: "rgba(83,211,255,0.08)",
                          borderRadius: 10,
                          padding: "8px 12px"
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "sec-muted",
                              style: {
                                fontSize: 10,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em"
                              },
                              children: "Precio"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "cyan",
                              style: {
                                fontSize: 15,
                                fontWeight: 700,
                                marginTop: 2
                              },
                              children: op.precio
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          background: "rgba(245,179,47,0.08)",
                          borderRadius: 10,
                          padding: "8px 12px"
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "sec-muted",
                              style: {
                                fontSize: 10,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em"
                              },
                              children: "Tiempo"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "gold",
                              style: {
                                fontSize: 15,
                                fontWeight: 700,
                                marginTop: 2
                              },
                              children: op.tiempo
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: "sec-muted",
                  style: { fontSize: 12, marginTop: 10 },
                  children: [
                    "🕐 ",
                    op.horario
                  ]
                }
              )
            ] }, i))
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "llegar-section llegar-bg2", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 32 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "badge badge-cyan",
            style: { marginBottom: 16, display: "inline-block" },
            children: "— UBICACIÓN"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 8
            },
            children: "Encuéntranos en el mapa"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(120,200,255,0.2)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
          },
          children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30587.94!2d-69.8!3d-15.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d6b5e9a4c1e1f%3A0x1234567890abcdef!2sCapachica%2C%20Puno%2C%20Peru!5e0!3m2!1ses!2spe!4v1234567890",
              width: "100%",
              height: "420",
              style: { border: 0, display: "block" },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap"
          },
          children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://maps.google.com/?q=Capachica,Puno,Peru",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn-primary",
                style: { fontSize: 13 },
                children: "📍 Abrir en Google Maps"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://maps.google.com/?q=Capachica,Puno,Peru&travelmode=driving",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn-outline",
                style: { fontSize: 13 },
                children: "🗺️ Cómo llegar en coche"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "llegar-section llegar-bg", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 40 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "badge badge-gold",
            style: { marginBottom: 16, display: "inline-block" },
            children: "— CONTACTOS"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 8
            },
            children: "Transportistas de Confianza"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "transportistas-grid", children: transportistas.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "transportista-card", children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 32, marginBottom: 12 }, children: "📞" }),
        /* @__PURE__ */ jsx(
          "h4",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 4
            },
            children: t.nombre
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "sec-muted",
            style: { fontSize: 13, marginBottom: 12 },
            children: t.servicio
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://wa.me/${t.telefono.replace(/\D/g, "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn-primary",
            style: {
              padding: "10px 20px",
              fontSize: 13,
              display: "inline-flex"
            },
            children: [
              "💬 ",
              t.telefono
            ]
          }
        )
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "llegar-section llegar-bg2", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 40 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "badge badge-cyan",
            style: { marginBottom: 16, display: "inline-block" },
            children: "— TIPS"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 8
            },
            children: "Consejos para tu viaje"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "consejos-grid", children: consejos.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "consejo-card", children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 32, marginBottom: 12 }, children: c.icon }),
        /* @__PURE__ */ jsx(
          "h4",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 8
            },
            children: c.titulo
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "sec-muted",
            style: { fontSize: 13, lineHeight: 1.7 },
            children: c.desc
          }
        )
      ] }, i)) })
    ] }) })
  ] });
}

const $$ComoLlegar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cómo Llegar — Capachica" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComoLlegar", ComoLlegar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/ComoLlegar", "client:component-export": "default" })} ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/como-llegar.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/como-llegar.astro";
const $$url = "/como-llegar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ComoLlegar,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
