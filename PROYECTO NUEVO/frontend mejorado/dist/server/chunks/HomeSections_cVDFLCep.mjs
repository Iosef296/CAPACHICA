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
const destinations = [
  {
    name: "Playa Llachón",
    subtitle: "La única playa del Titicaca",
    desc: "Arena blanca y aguas turquesas a 3,820 msnm. Un milagro geológico en el corazón del altiplano peruano que desafía toda expectativa.",
    icon: "🏖️",
    color: "#2dd4bf",
    gradient: "linear-gradient(135deg,#0a2030,#0d3040,#083848)"
  },
  {
    name: "Isla Ticonata",
    subtitle: "Isla sagrada de totora",
    desc: "A 40 minutos en bote, Ticonata guarda secretos ancestrales y ofrece una vista privilegiada del lago más alto del mundo navegable.",
    icon: "🏝️",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg,#060f1a,#0a1a28,#0c2038)"
  },
  {
    name: "Mirador del Amaru",
    subtitle: "360° del Lago Titicaca",
    desc: "Desde la cima del cerro Amaru, el Titicaca se despliega infinito. El mejor punto para fotografiar los atardeceres más espectaculares del Perú.",
    icon: "🏔️",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg,#0f0a1a,#160f28,#1e1438)"
  },
  {
    name: "Comunidad Capachica",
    subtitle: "Corazón de la península",
    desc: "Mercados artesanales, iglesia colonial y la calidez de las familias quechuas que han preservado sus tradiciones por más de cinco siglos.",
    icon: "🏘️",
    color: "#fbbf24",
    gradient: "linear-gradient(135deg,#1a120a,#261808,#2e1200)"
  }
];
const features = [
  {
    icon: "🌊",
    title: "Lago navegable más alto del mundo",
    text: "El Titicaca tiene 8,372 km² de superficie a 3,812 msnm — un océano interior en los Andes."
  },
  {
    icon: "🌿",
    title: "Turismo 100% comunitario",
    text: "Los ingresos van directamente a las familias locales. Sin intermediarios, sin cadenas hoteleras."
  },
  {
    icon: "⭐",
    title: "Cielos sin contaminación lumínica",
    text: "Noches perfectas para astronomía y fotografía. La Vía Láctea visible a simple vista."
  },
  {
    icon: "🎨",
    title: "Cultura viva y auténtica",
    text: "Tradiciones quechuas pre-incaicas, textiles ancestrales y festividades únicas en el mundo."
  }
];
function HomeSections() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { style: { padding: "90px 0", borderBottom: "1px solid var(--border)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center reveal", style: { marginBottom: "3.5rem" }, children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", children: "✦ La Joya Escondida del Titicaca" }),
        /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
          "Bienvenido a ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Capachica" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("p", { style: { color: "rgba(240,237,232,0.82)", maxWidth: 600, margin: "0 auto", lineHeight: 1.85, fontSize: "1rem" }, children: "En el corazón del altiplano peruano, a orillas del lago más alto del mundo, se esconde una de las experiencias más auténticas del Perú." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3.5rem", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "reveal", children: [
          /* @__PURE__ */ jsxs("p", { style: { color: "rgba(240,237,232,0.82)", lineHeight: 1.9, marginBottom: "1.4rem", fontSize: "1rem" }, children: [
            "Capachica es una ",
            /* @__PURE__ */ jsx("strong", { style: { color: "var(--turquoise)" }, children: "península quechua" }),
            " ubicada en la región Puno, Perú — a solo 80 km de la ciudad de Puno por carretera. Sus ocho comunidades conservan vivas las tradiciones andinas que preceden incluso al Imperio Inca."
          ] }),
          /* @__PURE__ */ jsx("p", { style: { color: "rgba(240,237,232,0.72)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.95rem" }, children: "Aquí el turismo vivencial no es una escenificación: es la vida real de sus habitantes. Dormirás en casas familiares, aprenderás a tejer con lana de alpaca, pescarás trucha al amanecer y contemplarás atardeceres que transforman el Titicaca en un espejo de oro y plata." }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "2rem", flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { color: "var(--turquoise)", fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-mono)", lineHeight: 1 }, children: "3,820" }),
              /* @__PURE__ */ jsx("div", { style: { color: "rgba(240,237,232,0.50)", fontSize: 12, marginTop: 5 }, children: "metros sobre el mar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { color: "var(--gold)", fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-mono)", lineHeight: 1 }, children: "8+" }),
              /* @__PURE__ */ jsx("div", { style: { color: "rgba(240,237,232,0.50)", fontSize: 12, marginTop: 5 }, children: "comunidades" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { color: "#f472b6", fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-mono)", lineHeight: 1 }, children: "500+" }),
              /* @__PURE__ */ jsx("div", { style: { color: "rgba(240,237,232,0.50)", fontSize: 12, marginTop: 5 }, children: "años de historia" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { color: "#a78bfa", fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-mono)", lineHeight: 1 }, children: "12" }),
              /* @__PURE__ */ jsx("div", { style: { color: "rgba(240,237,232,0.50)", fontSize: 12, marginTop: 5 }, children: "islas cercanas" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }, className: "reveal", children: features.map((f, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "rgba(10,22,40,0.65)",
              border: "1px solid rgba(45,212,191,0.10)",
              borderRadius: 14,
              padding: "1.4rem 1.2rem",
              transition: "border-color 0.3s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "rgba(45,212,191,0.28)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(45,212,191,0.10)";
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1.7rem", marginBottom: "0.6rem" }, children: f.icon }),
              /* @__PURE__ */ jsx("div", { style: { color: "#f0ede8", fontWeight: 600, fontSize: "0.84rem", marginBottom: "0.4rem", lineHeight: 1.35 }, children: f.title }),
              /* @__PURE__ */ jsx("div", { style: { color: "rgba(240,237,232,0.55)", fontSize: "0.78rem", lineHeight: 1.65 }, children: f.text })
            ]
          },
          i
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "90px 0", borderBottom: "1px solid var(--border)" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center reveal", style: { marginBottom: "3.5rem" }, children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", children: "✦ Lugares que visitar" }),
        /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
          "Destinos ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "imperdibles" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("p", { style: { color: "rgba(240,237,232,0.82)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: "0.95rem" }, children: "Cada rincón de Capachica guarda una sorpresa. Estos son los lugares que no puedes dejar de visitar." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.5rem" }, children: destinations.map((d, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "reveal",
          style: {
            background: d.gradient,
            border: `1px solid rgba(${hexToRgb(d.color)},0.18)`,
            borderRadius: "var(--radius)",
            padding: "1.85rem",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          },
          onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(-5px)";
            el.style.boxShadow = `0 18px 45px rgba(${hexToRgb(d.color)},0.18)`;
          },
          onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          },
          children: [
            /* @__PURE__ */ jsx("div", { style: {
              position: "absolute",
              top: -30,
              right: -30,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: `radial-gradient(circle,rgba(${hexToRgb(d.color)},0.18) 0%,transparent 70%)`,
              pointerEvents: "none"
            } }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "2.2rem", marginBottom: "0.85rem" }, children: d.icon }),
            /* @__PURE__ */ jsx("div", { style: {
              color: d.color,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: "0.4rem",
              textTransform: "uppercase"
            }, children: d.subtitle }),
            /* @__PURE__ */ jsx("h3", { style: {
              color: "#f0ede8",
              fontSize: "1.15rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              marginBottom: "0.65rem",
              lineHeight: 1.3
            }, children: d.name }),
            /* @__PURE__ */ jsx("p", { style: { color: "rgba(240,237,232,0.68)", fontSize: "0.83rem", lineHeight: 1.75, marginBottom: "1rem" }, children: d.desc }),
            /* @__PURE__ */ jsx("a", { href: "/destinos", style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: d.color,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none"
            }, children: "Ver más →" })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: {
      padding: "80px 0",
      borderBottom: "1px solid var(--border)",
      background: "linear-gradient(180deg,rgba(7,13,26,0) 0%,rgba(10,18,34,0.5) 100%)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center reveal", style: { marginBottom: "3rem" }, children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", children: "✦ Planifica tu viaje" }),
        /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
          "Todo lo que ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "necesitas saber" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }, children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "reveal",
            style: {
              background: "rgba(10,22,40,0.55)",
              border: "1px solid rgba(45,212,191,0.12)",
              borderRadius: "var(--radius)",
              padding: "2rem",
              transition: "border-color 0.3s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "rgba(45,212,191,0.30)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(45,212,191,0.12)";
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "🚌" }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#f0ede8", fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.85rem" }, children: "Cómo llegar" }),
              /* @__PURE__ */ jsxs("ul", { style: { color: "rgba(240,237,232,0.70)", fontSize: "0.87rem", lineHeight: 2.1, listStyle: "none", padding: 0, margin: "0 0 1.2rem" }, children: [
                /* @__PURE__ */ jsx("li", { children: "✈️ Lima → Juliaca (1h 30min vuelo)" }),
                /* @__PURE__ */ jsx("li", { children: "🚌 Juliaca → Puno (35 min bus)" }),
                /* @__PURE__ */ jsx("li", { children: "🚗 Puno → Capachica (1h 30min)" }),
                /* @__PURE__ */ jsx("li", { style: { color: "var(--turquoise)", fontWeight: 600 }, children: "Total: ~3.5h desde Lima" })
              ] }),
              /* @__PURE__ */ jsx("a", { href: "/como-llegar", style: {
                color: "var(--turquoise)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none"
              }, children: "Ver ruta completa →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "reveal",
            style: {
              background: "rgba(10,22,40,0.55)",
              border: "1px solid rgba(212,168,67,0.12)",
              borderRadius: "var(--radius)",
              padding: "2rem",
              transition: "border-color 0.3s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "rgba(212,168,67,0.30)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(212,168,67,0.12)";
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "📅" }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#f0ede8", fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.85rem" }, children: "Mejor época para visitar" }),
              /* @__PURE__ */ jsxs("ul", { style: { color: "rgba(240,237,232,0.70)", fontSize: "0.87rem", lineHeight: 2.1, listStyle: "none", padding: 0, margin: "0 0 1.2rem" }, children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  "☀️ ",
                  /* @__PURE__ */ jsx("strong", { style: { color: "var(--gold)" }, children: "Mayo – Octubre" }),
                  ": temporada seca"
                ] }),
                /* @__PURE__ */ jsx("li", { children: "🌧️ Nov – Abril: lluvias, verde intenso" }),
                /* @__PURE__ */ jsx("li", { children: "🎊 Febrero: Virgen de la Candelaria" }),
                /* @__PURE__ */ jsx("li", { children: "🌅 Todo el año: atardeceres únicos" })
              ] }),
              /* @__PURE__ */ jsx("a", { href: "/festividades", style: {
                color: "var(--gold)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none"
              }, children: "Ver calendario de festividades →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "reveal",
            style: {
              background: "rgba(10,22,40,0.55)",
              border: "1px solid rgba(167,139,250,0.12)",
              borderRadius: "var(--radius)",
              padding: "2rem",
              transition: "border-color 0.3s"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.30)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.12)";
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "🤝" }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#f0ede8", fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.85rem" }, children: "Turismo responsable" }),
              /* @__PURE__ */ jsxs("ul", { style: { color: "rgba(240,237,232,0.70)", fontSize: "0.87rem", lineHeight: 2.1, listStyle: "none", padding: 0, margin: "0 0 1.2rem" }, children: [
                /* @__PURE__ */ jsx("li", { children: "💚 100% ingresos a comunidades locales" }),
                /* @__PURE__ */ jsx("li", { children: "♻️ Residuos manejados responsablemente" }),
                /* @__PURE__ */ jsx("li", { children: "🌱 Cultivos orgánicos ancestrales" }),
                /* @__PURE__ */ jsx("li", { children: "📸 Respeto pleno a la cultura local" })
              ] }),
              /* @__PURE__ */ jsx("a", { href: "/vivencial", style: {
                color: "#a78bfa",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none"
              }, children: "Conocer familias anfitrionas →" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { style: { padding: "90px 0" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center reveal", style: { marginBottom: "3.5rem" }, children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", children: "✦ Todo en un lugar" }),
        /* @__PURE__ */ jsxs("h2", { className: "section-title", children: [
          "Descubre ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Capachica" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("p", { style: { color: "var(--text-main)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem", opacity: 0.88 }, children: "Seis experiencias únicas que hacen de la península de Capachica el destino más auténtico del Lago Titicaca." })
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
              /* @__PURE__ */ jsx("div", { style: { fontSize: "2.5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }, children: s.emoji }),
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
              color: "rgba(240,237,232,0.70)",
              lineHeight: 1.7,
              marginBottom: "1.2rem"
            }, children: s.desc }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem" }, children: s.tags.map((t) => /* @__PURE__ */ jsx("span", { style: {
              padding: "3px 9px",
              borderRadius: 999,
              fontSize: 11,
              background: "rgba(255,255,255,0.08)",
              color: "rgba(240,237,232,0.60)",
              border: "1px solid rgba(255,255,255,0.12)"
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
      /* @__PURE__ */ jsxs("h2", { className: "section-title", style: { marginBottom: "1rem", color: "#f0ede8" }, children: [
        "¿Listo para vivir ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Capachica" }),
        "?"
      ] }),
      /* @__PURE__ */ jsx("p", { style: { color: "rgba(240,237,232,0.80)", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }, children: "Contacta con nosotros y te ayudamos a diseñar el itinerario perfecto según tus intereses y fechas." }),
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
