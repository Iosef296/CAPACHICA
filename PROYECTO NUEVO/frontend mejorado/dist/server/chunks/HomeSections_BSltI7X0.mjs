import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

const sections = [
  {
    emoji: "🏠",
    label: "Vivencial",
    title: "Vive con familias quechuas",
    desc: "Más que turismo: una inmersión real en la vida andina. Cocina con las familias, aprende sobre la cosmovisión andina y duerme bajo las estrellas del Titicaca.",
    href: "/vivencial",
    color: "#0ea5e9",
    bg: "linear-gradient(135deg,#0a1e36,#0c2d4a)",
    tags: ["Familia anfitriona", "Cocina andina", "Tejido"],
    delay: 0
  },
  {
    emoji: "🚣",
    label: "Actividades",
    title: "Aventura en el Titicaca",
    desc: "Kayak al amanecer, pesca artesanal con los comuneros, cabalgata entre totorales y escalada en los acantilados con vista panorámica al lago.",
    href: "/actividades",
    color: "#34d399",
    bg: "linear-gradient(135deg,#0a2018,#0d3024)",
    tags: ["Kayak", "Pesca", "Escalada"],
    delay: 0.1
  },
  {
    emoji: "🍽️",
    label: "Gastronomía",
    title: "Sabores del altiplano",
    desc: "Trucha del lago, quinua nativa, chuño ancestral. Los mejores restaurantes de la península sirven una cocina que lleva cinco siglos de historia.",
    href: "/gastronomia",
    color: "#fbbf24",
    bg: "linear-gradient(135deg,#1a140a,#2a200e)",
    tags: ["Trucha", "Quinua", "Chuño"],
    delay: 0.2
  },
  {
    emoji: "🎊",
    label: "Festividades",
    title: "Fiestas ancestrales",
    desc: "Virgen Candelaria, Inti Raymi, Todos los Santos. El calendario festivo de Capachica mezcla cosmovisión andina y devoción católica en explosiones de color.",
    href: "/festividades",
    color: "#f472b6",
    bg: "linear-gradient(135deg,#1a0a18,#280e24)",
    tags: ["Candelaria", "Inti Raymi", "Danzas"],
    delay: 0.3
  },
  {
    emoji: "🧶",
    label: "Artesanía",
    title: "Textiles con historia",
    desc: "Aguayos, chullos y mantas tejidas con técnicas ancestrales que las comunidades han preservado por generaciones. Cada pieza es única e irrepetible.",
    href: "/artesania",
    color: "#a78bfa",
    bg: "linear-gradient(135deg,#130a1a,#1e0f2a)",
    tags: ["Aguayo", "Chullo", "Bordado"],
    delay: 0.4
  },
  {
    emoji: "🏔️",
    label: "Destinos",
    title: "Paisajes que quitan el aliento",
    desc: "Miradores con vistas del Titicaca, comunidades a orillas del lago, islas flotantes y la magia de los atardeceres más fotogénicos del Perú.",
    href: "/destinos",
    color: "#38bdf8",
    bg: "linear-gradient(135deg,#060f1a,#0c1e30)",
    tags: ["Llachón", "Taquile", "Miradores"],
    delay: 0.5
  }
];
function HomeSections() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { style: { padding: "90px 0" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center reveal", style: { marginBottom: "3.5rem" }, children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", children: "✦ Todo en un lugar" }),
        /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
          "Descubre ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Capachica" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--text2)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }, children: "Seis experiencias únicas que hacen de la península de Capachica el destino más auténtico del Lago Titicaca." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))",
        gap: "1.5rem"
      }, children: sections.map((s, i) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: s.href,
          className: "reveal",
          style: {
            display: "block",
            background: s.bg,
            border: `1px solid rgba(${hexToRgb(s.color)},0.15)`,
            borderRadius: "var(--radius)",
            padding: "2rem",
            textDecoration: "none",
            transition: "all 0.35s ease",
            transitionDelay: `${s.delay}s`,
            position: "relative",
            overflow: "hidden",
            cursor: "pointer"
          },
          onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(-6px)";
            el.style.boxShadow = `0 20px 50px rgba(${hexToRgb(s.color)},0.2)`;
            el.style.borderColor = `rgba(${hexToRgb(s.color)},0.4)`;
          },
          onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
            el.style.borderColor = `rgba(${hexToRgb(s.color)},0.15)`;
          },
          children: [
            /* @__PURE__ */ jsx("div", { style: {
              position: "absolute",
              top: -40,
              right: -40,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${hexToRgb(s.color)},0.12) 0%, transparent 70%)`,
              pointerEvents: "none"
            } }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }, children: [
              /* @__PURE__ */ jsx("div", { style: {
                fontSize: "2.5rem",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
              }, children: s.emoji }),
              /* @__PURE__ */ jsx("span", { style: {
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: `rgba(${hexToRgb(s.color)},0.12)`,
                color: s.color,
                border: `1px solid rgba(${hexToRgb(s.color)},0.25)`,
                letterSpacing: "0.06em"
              }, children: s.label })
            ] }),
            /* @__PURE__ */ jsx("h3", { style: {
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#f0ede8",
              marginBottom: "0.6rem",
              lineHeight: 1.3
            }, children: s.title }),
            /* @__PURE__ */ jsx("p", { style: {
              fontSize: "0.86rem",
              color: "var(--text2)",
              lineHeight: 1.7,
              marginBottom: "1.2rem"
            }, children: s.desc }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem" }, children: s.tags.map((t) => /* @__PURE__ */ jsx("span", { style: {
              padding: "3px 9px",
              borderRadius: 999,
              fontSize: 11,
              background: "rgba(255,255,255,0.06)",
              color: "var(--text2)",
              border: "1px solid rgba(255,255,255,0.08)"
            }, children: t }, t)) }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: s.color,
              fontSize: 13,
              fontWeight: 600
            }, children: [
              "Explorar ",
              /* @__PURE__ */ jsx("span", { style: { fontSize: 16 }, children: "→" })
            ] })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: {
      padding: "80px 0",
      background: "linear-gradient(135deg, rgba(45,212,191,0.06) 0%, rgba(7,13,26,0) 50%, rgba(212,168,67,0.06) 100%)",
      borderTop: "1px solid var(--border)"
    }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { style: {
      background: "linear-gradient(135deg, rgba(45,212,191,0.08), rgba(10,22,40,0.5))",
      border: "1px solid rgba(45,212,191,0.18)",
      borderRadius: "var(--radius-lg)",
      padding: "3.5rem 2.5rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }, className: "reveal", children: [
      /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        height: "200px",
        background: "radial-gradient(ellipse, rgba(45,212,191,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      } }),
      /* @__PURE__ */ jsx("span", { className: "section-label", style: { marginBottom: "1.5rem" }, children: "🌊 Reserva tu viaje" }),
      /* @__PURE__ */ jsxs("h2", { className: "section-title", style: { marginBottom: "1rem" }, children: [
        "¿Listo para vivir ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Capachica" }),
        "?"
      ] }),
      /* @__PURE__ */ jsx("p", { style: { color: "var(--text2)", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }, children: "Contacta con nosotros y te ayudamos a diseñar el itinerario perfecto según tus intereses y fechas." }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx("a", { href: "/actividades", className: "btn-primary", children: "Ver actividades disponibles →" }),
        /* @__PURE__ */ jsx("a", { href: "/alojamiento", className: "btn-outline", children: "Explorar alojamiento" })
      ] })
    ] }) }) })
  ] });
}
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export { HomeSections as H };
