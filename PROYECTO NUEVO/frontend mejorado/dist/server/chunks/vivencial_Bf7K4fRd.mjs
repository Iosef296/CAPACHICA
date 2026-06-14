import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { o as renderComponent, h as renderTemplate } from './server_DrLwvc76.mjs';
import { $ as $$Layout } from './Layout_DALmKV-_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';

function VivencialHero() {
  const starsRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("capachica-theme") || localStorage.getItem("theme");
    setIsDark(saved !== "light");
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme !== "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!starsRef.current) return;
    starsRef.current.innerHTML = "";
    if (!isDark) return;
    Array.from({ length: 35 }).forEach(() => {
      const s = document.createElement("div");
      const size = Math.random() * 2.5 + 0.5;
      s.style.cssText = `
        position:absolute; width:${size}px; height:${size}px;
        border-radius:50%; background:#fff;
        opacity:${Math.random() * 0.7 + 0.2};
        top:${Math.random() * 60}%; left:${Math.random() * 100}%;
        animation:twinkle ${Math.random() * 2 + 1.5}s ease-in-out infinite alternate;
        animation-delay:${Math.random() * 3}s;
      `;
      starsRef.current.appendChild(s);
    });
  }, [isDark]);
  const heroBg = isDark ? "linear-gradient(to bottom, #0B1426 0%, #0a1628 45%, #070D1A 100%)" : "linear-gradient(to bottom, #0d47a1 0%, #1565c0 45%, #005f73 100%)";
  const lakeBg = isDark ? "#020b14" : "#005f73";
  const moonBg = isDark ? "#F5F0D0" : "#f5b32f";
  const moonShadow = isDark ? "0 0 30px rgba(245,240,208,0.4), 0 0 60px rgba(245,240,208,0.15)" : "0 0 60px rgba(245,179,47,.6), 0 0 120px rgba(245,179,47,.3)";
  const moonSize = isDark ? 90 : 110;
  const badgeColor = isDark ? "#2dd4bf" : "#0f9488";
  const titleColor = isDark ? "#f0ede8" : "#ffffff";
  const subtitleColor = isDark ? "#d4a843" : "#f0c96a";
  const descColor = isDark ? "rgba(240,237,232,0.65)" : "rgba(255,255,255,0.8)";
  const lineColor = isDark ? "#2dd4bf" : "#0f9488";
  const badgeBg = isDark ? "rgba(45,212,191,0.10)" : "rgba(15,148,136,0.12)";
  const badgeBorder = isDark ? "rgba(45,212,191,0.30)" : "rgba(15,148,136,0.35)";
  return /* @__PURE__ */ jsxs(
    "section",
    {
      style: {
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        paddingTop: 120,
        background: heroBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.5s"
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes twinkle { from{opacity:0.2} to{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{opacity:0.3} 50%{opacity:0.7} 100%{opacity:0.3} }
        @keyframes birdfly {
          0%{transform:translateX(0) rotate(0deg)}
          50%{transform:translateX(8px) rotate(-3deg)}
          100%{transform:translateX(0) rotate(0deg)}
        }
      ` }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: starsRef,
            style: { position: "absolute", inset: 0, pointerEvents: "none" }
          }
        ),
        !isDark && [
          [-15, 12],
          [20, 18],
          [-30, 25],
          [30, 15]
        ].map(([x, y], i) => /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: `${50 + x}%`,
              top: `${y}%`,
              width: 80 + i * 20,
              height: 20,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 50,
              filter: "blur(6px)",
              animation: `birdfly ${3 + i}s ease-in-out infinite`
            }
          },
          i
        )),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: moonSize,
              height: moonSize,
              borderRadius: "50%",
              background: moonBg,
              boxShadow: moonShadow,
              animation: "float 5s ease-in-out infinite",
              transition: "all 0.5s"
            }
          }
        ),
        [
          [-20, 15],
          [20, 20],
          [-35, 28],
          [35, 32],
          [-10, 42],
          [18, 48]
        ].map(([x, y], i) => /* @__PURE__ */ jsx(
          "svg",
          {
            style: {
              position: "absolute",
              left: `${50 + x}%`,
              top: `${y}%`,
              opacity: isDark ? 0.25 : 0.4,
              transform: `rotate(${x > 0 ? 5 : -5}deg)`,
              animation: `birdfly ${2 + i * 0.5}s ease-in-out infinite`
            },
            width: "60",
            height: "16",
            viewBox: "0 0 60 16",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M0 8 Q15 0 30 8 Q45 16 60 8",
                stroke: lineColor,
                strokeWidth: "1.5",
                fill: "none"
              }
            )
          },
          i
        )),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              textAlign: "center",
              position: "relative",
              zIndex: 2,
              animation: "fadeUp 0.9s ease",
              padding: "0 1rem"
            },
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: 999,
                    background: badgeBg,
                    border: `1px solid ${badgeBorder}`,
                    color: badgeColor,
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 24
                  },
                  children: "VIVENCIAL · CAPACHICA"
                }
              ),
              /* @__PURE__ */ jsxs("h1", { style: { fontFamily: "var(--font-display)", lineHeight: 0.9 }, children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: {
                      display: "block",
                      fontSize: "clamp(48px,8vw,96px)",
                      fontWeight: 700,
                      color: titleColor,
                      transition: "color 0.4s"
                    },
                    children: "Turismo"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: {
                      display: "block",
                      fontSize: "clamp(44px,7.5vw,88px)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: subtitleColor,
                      transition: "color 0.4s"
                    },
                    children: "Vivencial"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    marginTop: 24,
                    fontSize: "clamp(14px,2vw,16px)",
                    color: descColor,
                    maxWidth: 480,
                    margin: "24px auto 0",
                    lineHeight: 1.7,
                    transition: "color 0.4s"
                  },
                  children: "Más que turismo: una inmersión real en la vida andina de las familias de Capachica."
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    marginTop: 36,
                    flexWrap: "wrap"
                  },
                  children: [
                    /* @__PURE__ */ jsx("a", { href: "#familias", className: "btn-primary", children: "Ver familias →" }),
                    /* @__PURE__ */ jsx("a", { href: "#reservar", className: "btn-outline", children: "Reservar ahora" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: -120,
              left: "-10%",
              width: "120%",
              height: 320,
              background: lakeBg,
              borderRadius: "50% 50% 0 0",
              boxShadow: "inset 0 20px 60px rgba(70,180,255,.15)",
              transition: "background 0.5s"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 80,
              background: isDark ? "linear-gradient(to bottom, rgba(215,228,239,0.6), transparent)" : "linear-gradient(to bottom, rgba(245,179,47,0.7), transparent)",
              borderRadius: 2,
              animation: "shimmer 3s ease-in-out infinite"
            }
          }
        )
      ]
    }
  );
}

const familias = [
  {
    id: 1,
    nombre: "Familia Quispe",
    comunidad: "Llachón",
    especialidad: "pesca",
    descripcion: "Pescadores artesanales. Pesca artesanal al amanecer en el lago.",
    habitaciones: 2,
    disponible: true,
    calificacion: 4.9,
    idiomas: ["Español", "Aimara"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Pesca al amanecer"],
    precio_noche: 120
  },
  {
    id: 2,
    nombre: "Familia Mamani",
    comunidad: "Capachica Centro",
    especialidad: "tejido",
    descripcion: "Artesanas de tejidos. Mejor vista al lago Titicaca.",
    habitaciones: 2,
    disponible: true,
    calificacion: 5,
    idiomas: ["Español", "Aimara", "Quechua"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Taller de tejido"],
    precio_noche: 120
  },
  {
    id: 3,
    nombre: "Familia Coila",
    comunidad: "Siale",
    especialidad: "agricultura",
    descripcion: "Agricultores orgánicos. Siembra de quinua y papas nativas.",
    habitaciones: 3,
    disponible: false,
    calificacion: 4.8,
    idiomas: ["Español", "Quechua"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Siembra de quinua"],
    precio_noche: 120
  }
];
const timeline = [
  {
    hora: "6:00 am",
    icono: "🌅",
    titulo: "Amanecer en el lago",
    desc: "Observa el amanecer sobre el Titicaca junto a la familia"
  },
  {
    hora: "7:30 am",
    icono: "🎣",
    titulo: "Pesca artesanal",
    desc: "Aprende a pescar con técnicas ancestrales de totora"
  },
  {
    hora: "9:00 am",
    icono: "🍽️",
    titulo: "Desayuno andino",
    desc: "Desayuno tradicional con productos locales de la chacra"
  },
  {
    hora: "11:00 am",
    icono: "🪡",
    titulo: "Tejido y artesanía",
    desc: "Aprende tejido en telar de cintura o bordado andino"
  },
  {
    hora: "1:00 pm",
    icono: "🌿",
    titulo: "Almuerzo y chacra",
    desc: "Almuerzo con quinua y papas nativas, visita a los cultivos"
  },
  {
    hora: "7:00 pm",
    icono: "🌟",
    titulo: "Fogón y estrellas",
    desc: "Cena junto al fogón, música andina y cielo estrellado"
  }
];
const PRECIO_POR_PERSONA_NOCHE$1 = 120;

function VivencialTimeline() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .que-es-section {
          padding: 80px 0;
          background: rgba(7,24,38,0.8);
        }
        [data-theme="light"] .que-es-section {
          background: rgba(168,212,238,0.4);
        }
        .timeline-section {
          padding: 80px 0;
          background: transparent;
        }
        .timeline-card {
          background: rgba(18,47,76,0.78);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15);
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .timeline-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(11,122,181,0.2);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .timeline-dot {
          background: rgba(18,47,76,0.9);
          border: 2px solid rgba(83,211,255,0.4);
          box-shadow: 0 0 20px rgba(83,211,255,0.2);
        }
        [data-theme="light"] .timeline-dot {
          background: rgba(255,255,255,0.9);
          border: 2px solid rgba(11,122,181,0.5);
          box-shadow: 0 0 15px rgba(11,122,181,0.15);
        }
        .section-title { color: #f4f7fb; }
        [data-theme="light"] .section-title { color: #071826; }
        .section-subtitle { color: #f5b32f; }
        [data-theme="light"] .section-subtitle { color: #c47d00; }
        .section-text { color: #b9c8d6; }
        [data-theme="light"] .section-text { color: #1a3a52; }
        .timeline-hour { color: #53d3ff; }
        [data-theme="light"] .timeline-hour { color: #0b7ab5; }
        .timeline-title { color: #f4f7fb; }
        [data-theme="light"] .timeline-title { color: #071826; }
        .timeline-desc { color: #b9c8d6; }
        [data-theme="light"] .timeline-desc { color: #2a4a63; }
        .timeline-line {
          background: rgba(83,211,255,0.2);
        }
        [data-theme="light"] .timeline-line {
          background: rgba(11,122,181,0.2);
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .timeline-wrapper { padding: 0 1rem; }
          .timeline-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-left: 56px;
            position: relative;
          }
          .timeline-spacer { display: none !important; }
          .timeline-dot-wrap {
            position: absolute !important;
            left: 0 !important;
          }
          .timeline-card { text-align: left !important; }
          .timeline-line-vert { left: 20px !important; }
        }
      ` }),
    /* @__PURE__ */ jsx("section", { className: "que-es-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 720, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "badge badge-cyan",
          style: { marginBottom: 20, display: "inline-block" },
          children: "— VIVENCIAL"
        }
      ),
      /* @__PURE__ */ jsxs(
        "h2",
        {
          className: "section-title",
          style: {
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px,5vw,52px)",
            fontWeight: 700,
            margin: "12px 0 20px",
            lineHeight: 1.1
          },
          children: [
            "¿Qué es el",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("em", { className: "section-subtitle", style: { fontStyle: "italic" }, children: "Turismo Vivencial?" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "section-text",
          style: { fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8 },
          children: "El turismo vivencial es una experiencia única donde te conviertes en parte de una familia andina de la península de Capachica. Compartes su hogar, aprendes sus oficios milenarios —la pesca en totora, el tejido en telar, la agricultura orgánica— y vives sus rutinas junto al lago Titicaca, a 3,810 metros sobre el mar."
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "section-text",
          style: {
            fontSize: 15,
            marginTop: 16,
            fontStyle: "italic",
            opacity: 0.7
          },
          children: "No es un hotel. No es un tour. Es convivir."
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "timeline-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 56 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "badge badge-cyan",
            style: { marginBottom: 16, display: "inline-block" },
            children: "— UN DÍA CONTIGO"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "section-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 8
            },
            children: "Tu día en Capachica"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "timeline-wrapper",
          style: { position: "relative", maxWidth: 700, margin: "0 auto" },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "timeline-line-vert",
                style: {
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: 1,
                  transform: "translateX(-50%)"
                }
              }
            ),
            timeline.map((item, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "timeline-row",
                style: {
                  display: "flex",
                  flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                  alignItems: "center",
                  marginBottom: 40,
                  gap: 24
                },
                children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "timeline-card",
                      style: { flex: 1, textAlign: i % 2 === 0 ? "right" : "left" },
                      children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "timeline-hour",
                            style: { fontSize: 12, fontWeight: 600, marginBottom: 4 },
                            children: item.hora
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "timeline-title",
                            style: {
                              fontFamily: "var(--font-display)",
                              fontSize: 17,
                              fontWeight: 700,
                              marginBottom: 4
                            },
                            children: item.titulo
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "timeline-desc",
                            style: { fontSize: 13, lineHeight: 1.6 },
                            children: item.desc
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "timeline-dot timeline-dot-wrap",
                      style: {
                        flexShrink: 0,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        zIndex: 1
                      },
                      children: item.icono
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "timeline-spacer", style: { flex: 1 } })
                ]
              },
              i
            ))
          ]
        }
      )
    ] }) })
  ] });
}

const API_URL = "http://localhost:4000";
const PRECIO_POR_PERSONA_NOCHE = 120;
const iconMap = {
  pesca: "🎣",
  tejido: "🪡",
  agricultura: "🌿",
  cocina: "🍲"
};
function FamiliasGrid() {
  const [familias, setFamilias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`${API_URL}/api/familias`).then((res) => res.json()).then((data) => {
      setFamilias(data);
      setLoading(false);
    }).catch(() => {
      setError("No se pudieron cargar las familias.");
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .familias-section { padding: 80px 0; background: rgba(7,24,38,0.6); }
        [data-theme="light"] .familias-section { background: rgba(168,212,238,0.3); }
        .familia-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 20px;
          overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
        }
        [data-theme="light"] .familia-card {
          background: rgba(255,255,255,0.82); border: 1px solid rgba(11,122,181,0.18);
        }
        .familia-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(83,211,255,0.15);
        }
        .familias-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 900px) { .familias-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 580px) { .familias-grid { grid-template-columns: 1fr; } }
        .familia-nombre { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .familia-nombre { color: #071826; }
        .familia-desc { color: #b9c8d6; }
        [data-theme="light"] .familia-desc { color: #2a4a63; }
        .familia-info { color: #7f95aa; }
        [data-theme="light"] .familia-info { color: #5a7a93; }
        .familia-precio { color: #53d3ff; }
        [data-theme="light"] .familia-precio { color: #0b7ab5; }
        .familia-servicio {
          background: rgba(83,211,255,0.1); color: #53d3ff;
          border: 1px solid rgba(83,211,255,0.2);
        }
        [data-theme="light"] .familia-servicio {
          background: rgba(11,122,181,0.08); color: #0b7ab5;
          border: 1px solid rgba(11,122,181,0.2);
        }
        .sec-label { color: #53d3ff; }
        [data-theme="light"] .sec-label { color: #0b7ab5; }
        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .skeleton {
          background: linear-gradient(90deg, rgba(18,47,76,0.5) 25%, rgba(31,110,156,0.3) 50%, rgba(18,47,76,0.5) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 20px; height: 320px;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      ` }),
    /* @__PURE__ */ jsx("section", { id: "familias", className: "familias-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: 48 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "sec-label",
            style: {
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600
            },
            children: "— VIVENCIAL"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "sec-title",
            style: {
              fontSize: "clamp(26px,4vw,44px)",
              fontWeight: 700,
              marginTop: 12
            },
            children: "Turismo Vivencial"
          }
        )
      ] }),
      loading && /* @__PURE__ */ jsx("div", { className: "familias-grid", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "skeleton" }, i)) }),
      error && /* @__PURE__ */ jsxs(
        "div",
        {
          style: { textAlign: "center", padding: "40px", color: "#f5b32f" },
          children: [
            "⚠️ ",
            error
          ]
        }
      ),
      !loading && !error && /* @__PURE__ */ jsx("div", { className: "familias-grid", children: familias.map((f) => /* @__PURE__ */ jsxs("div", { className: "familia-card", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: 200,
              background: f.foto_url ? `url(${f.foto_url}) center/cover` : "linear-gradient(135deg, #0b3c60 0%, #1f6e9c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            },
            children: [
              !f.foto_url && /* @__PURE__ */ jsx("div", { style: { fontSize: 64, opacity: 0.35 }, children: iconMap[f.especialidad] || "🏠" }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600
                  },
                  children: [
                    "⭐ ",
                    parseFloat(f.calificacion).toFixed(1)
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { padding: "20px 20px 24px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { marginBottom: 10 }, children: /* @__PURE__ */ jsx("span", { className: "badge badge-cyan", children: "Disponible" }) }),
          /* @__PURE__ */ jsx(
            "h3",
            {
              className: "familia-nombre",
              style: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
              children: f.nombre
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "familia-desc",
              style: {
                fontSize: 13,
                marginBottom: 12,
                lineHeight: 1.6
              },
              children: f.descripcion
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginBottom: 12
              },
              children: f.servicios.map((s) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "familia-servicio",
                  style: {
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 20
                  },
                  children: s
                },
                s
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: "familia-info",
              style: { fontSize: 12, marginBottom: 16 },
              children: [
                "🗣️ ",
                f.idiomas.join(" · ")
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8
              },
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "familia-precio",
                      style: { fontSize: 22, fontWeight: 700 },
                      children: [
                        "S/. ",
                        PRECIO_POR_PERSONA_NOCHE
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "familia-info", style: { fontSize: 12 }, children: [
                    " ",
                    "/persona/noche"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#reservar",
                    className: "btn-outline",
                    style: { padding: "8px 18px", fontSize: 13 },
                    children: "Explorar →"
                  }
                )
              ]
            }
          )
        ] })
      ] }, f.id)) }),
      /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: 48 }, children: /* @__PURE__ */ jsx("button", { className: "btn-outline", children: "Ver todos" }) })
    ] }) })
  ] });
}

function ReservaForm() {
  const [form, setForm] = useState({
    familia_id: "",
    nombre: "",
    email: "",
    telefono: "",
    fecha_llegada: "",
    fecha_salida: "",
    num_personas: 2,
    actividad: "",
    metodo_pago: "",
    notas: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const noches = (() => {
    if (!form.fecha_llegada || !form.fecha_salida) return 0;
    const d = (new Date(form.fecha_salida).getTime() - new Date(form.fecha_llegada).getTime()) / 864e5;
    return Math.max(0, d);
  })();
  const total = noches * form.num_personas * PRECIO_POR_PERSONA_NOCHE$1;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "num_personas" ? Number(value) : value
    }));
  };
  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.fecha_llegada || !form.fecha_salida) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const familiaElegida = familias.find(
        (f) => String(f.id) === form.familia_id
      );
      const notas = [
        form.notas,
        familiaElegida ? `Familia preferida: ${familiaElegida.nombre}` : ""
      ].filter(Boolean).join(" | ");
      const payload = {
        nombre_huesped: form.nombre,
        email: form.email,
        telefono: form.telefono,
        fecha_llegada: form.fecha_llegada,
        fecha_salida: form.fecha_salida,
        num_personas: form.num_personas,
        actividad_preferida: form.actividad,
        metodo_pago: form.metodo_pago || null,
        notas,
        precio_total: total
      };
      const res = await fetch("http://localhost:4000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(`¡Reserva creada! Tu código es: ${data.codigo}`);
    } catch (err) {
      setError(err.message || "Error al crear la reserva. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--bg)",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s"
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "reservar",
      style: { background: "var(--bg)", padding: "80px 0" },
      children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 760, margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: 500
              },
              children: "— RESERVAS"
            }
          ),
          /* @__PURE__ */ jsxs(
            "h2",
            {
              style: {
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: "var(--text)",
                marginTop: 12
              },
              children: [
                "Reserva tu",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("em", { style: { fontStyle: "italic", color: "var(--accent)" }, children: "Experiencia" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--text2)", marginTop: 12 }, children: "Respondemos en menos de 24 horas" })
        ] }),
        success ? /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "var(--accent-light)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius)",
              padding: "32px",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: 48, marginBottom: 16 }, children: "✅" }),
              /* @__PURE__ */ jsx(
                "h3",
                {
                  style: {
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    color: "var(--accent)",
                    marginBottom: 8
                  },
                  children: "¡Reserva confirmada!"
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { color: "var(--text2)", fontSize: 15 }, children: success }),
              /* @__PURE__ */ jsx("p", { style: { color: "var(--text3)", fontSize: 13, marginTop: 8 }, children: "Recibirás un email de confirmación pronto." })
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "36px",
              boxShadow: "var(--shadow)"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "1/-1" }, children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Familia anfitriona"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          name: "familia_id",
                          value: form.familia_id,
                          onChange: handleChange,
                          style: inputStyle,
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "Sorpréndeme 🎲" }),
                            familias.map((f) => /* @__PURE__ */ jsxs("option", { value: f.id, disabled: !f.disponible, children: [
                              f.nombre,
                              " — ",
                              f.comunidad,
                              " ",
                              !f.disponible ? "(No disponible)" : ""
                            ] }, f.id))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Nombre completo *"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "nombre",
                          value: form.nombre,
                          onChange: handleChange,
                          placeholder: "Tu nombre",
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Email *"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "email",
                          type: "email",
                          value: form.email,
                          onChange: handleChange,
                          placeholder: "tu@email.com",
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "WhatsApp / Teléfono"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "telefono",
                          value: form.telefono,
                          onChange: handleChange,
                          placeholder: "+51 999 000 000",
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Número de personas *"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "num_personas",
                          type: "number",
                          min: 1,
                          max: 8,
                          value: form.num_personas,
                          onChange: handleChange,
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Fecha de llegada *"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "fecha_llegada",
                          type: "date",
                          value: form.fecha_llegada,
                          onChange: handleChange,
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Fecha de salida *"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          name: "fecha_salida",
                          type: "date",
                          value: form.fecha_salida,
                          onChange: handleChange,
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Actividad preferida"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          name: "actividad",
                          value: form.actividad,
                          onChange: handleChange,
                          style: inputStyle,
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "Cualquiera" }),
                            /* @__PURE__ */ jsx("option", { value: "pesca", children: "🎣 Pesca artesanal" }),
                            /* @__PURE__ */ jsx("option", { value: "tejido", children: "🪡 Tejido en telar" }),
                            /* @__PURE__ */ jsx("option", { value: "agricultura", children: "🌿 Agricultura orgánica" }),
                            /* @__PURE__ */ jsx("option", { value: "cocina", children: "🍲 Cocina andina" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Método de pago"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          name: "metodo_pago",
                          value: form.metodo_pago,
                          onChange: handleChange,
                          style: inputStyle,
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
                            /* @__PURE__ */ jsx("option", { value: "yape", children: "📱 Yape" }),
                            /* @__PURE__ */ jsx("option", { value: "paypal", children: "💳 PayPal" }),
                            /* @__PURE__ */ jsx("option", { value: "tarjeta", children: "🏦 Tarjeta" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "1/-1" }, children: [
                      /* @__PURE__ */ jsx(
                        "label",
                        {
                          style: {
                            fontSize: 13,
                            color: "var(--text2)",
                            display: "block",
                            marginBottom: 6
                          },
                          children: "Notas o requerimientos especiales"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          name: "notas",
                          value: form.notas,
                          onChange: handleChange,
                          placeholder: "Dietas especiales, niños, celebraciones...",
                          rows: 3,
                          style: { ...inputStyle, resize: "vertical" }
                        }
                      )
                    ] })
                  ]
                }
              ),
              noches > 0 && /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    marginTop: 24,
                    padding: "20px 24px",
                    background: "var(--accent-light)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--accent)"
                  },
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 12
                      },
                      children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsxs("div", { style: { fontSize: 13, color: "var(--accent)" }, children: [
                            noches,
                            " noche",
                            noches > 1 ? "s" : "",
                            " ×",
                            " ",
                            form.num_personas,
                            " persona",
                            form.num_personas > 1 ? "s" : "",
                            " × S/.",
                            " ",
                            PRECIO_POR_PERSONA_NOCHE$1
                          ] }),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-display)",
                                fontSize: 28,
                                fontWeight: 700,
                                color: "var(--accent)"
                              },
                              children: [
                                "S/. ",
                                total.toLocaleString()
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--text3)" }, children: [
                            "≈ $",
                            (total / 3.75).toFixed(0),
                            " USD"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--text2)" }, children: [
                          "✓ Incluye desayuno, almuerzo y cena",
                          /* @__PURE__ */ jsx("br", {}),
                          "✓ Actividades con la familia",
                          /* @__PURE__ */ jsx("br", {}),
                          "✓ Cancelación gratuita 48h antes"
                        ] })
                      ]
                    }
                  )
                }
              ),
              error && /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    marginTop: 16,
                    padding: "12px 16px",
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#dc2626"
                  },
                  children: [
                    "⚠️ ",
                    error
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    marginTop: 28,
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    flexWrap: "wrap"
                  },
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleSubmit,
                      disabled: loading,
                      className: "btn-primary",
                      style: { padding: "16px 40px", fontSize: 16 },
                      children: loading ? "Enviando..." : `Reservar ahora ${total > 0 ? `— S/. ${total.toLocaleString()}` : ""}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    textAlign: "center",
                    marginTop: 16,
                    fontSize: 12,
                    color: "var(--text3)"
                  },
                  children: "Al reservar aceptas nuestra política de cancelación. Pago al confirmar."
                }
              )
            ]
          }
        )
      ] }) })
    }
  );
}

const $$Vivencial = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Turismo Vivencial — Capachica" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "VivencialHero", VivencialHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/VivencialHero", "client:component-export": "default" })} ${renderComponent($$result2, "VivencialTimeline", VivencialTimeline, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/VivencialTimeline", "client:component-export": "default" })} ${renderComponent($$result2, "FamiliasGrid", FamiliasGrid, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/FamiliasGrid", "client:component-export": "default" })} ${renderComponent($$result2, "ReservaForm", ReservaForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/ReservaForm", "client:component-export": "default" })} ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/vivencial.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/vivencial.astro";
const $$url = "/vivencial";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vivencial,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
