import { jsx, jsxs } from 'react/jsx-runtime';

function Footer() {
  return /* @__PURE__ */ jsx(
    "footer",
    {
      style: {
        background: "var(--sand)",
        borderTop: "1px solid var(--border)",
        padding: "60px 0 24px"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 32,
              marginBottom: 48
            },
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 15
                          },
                          children: "C"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "var(--text)"
                          },
                          children: "Capachica"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }, children: "La joya escondida del Lago Titicaca" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text3)",
                      marginBottom: 12
                    },
                    children: "DESTINOS"
                  }
                ),
                [
                  "Playa Llachón",
                  "Mirador del Amaru",
                  "Isla Ticonata",
                  "Comunidad Capachica",
                  "Atardeceres"
                ].map((l) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    style: {
                      fontSize: 13,
                      color: "var(--text2)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 6
                    },
                    children: l
                  },
                  l
                ))
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text3)",
                      marginBottom: 12
                    },
                    children: "EXPERIENCIAS"
                  }
                ),
                [
                  "Vivencial",
                  "Actividades",
                  "Gastronomía",
                  "Festividades",
                  "Artesanía"
                ].map((l) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    style: {
                      fontSize: 13,
                      color: "var(--text2)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 6
                    },
                    children: l
                  },
                  l
                ))
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text3)",
                      marginBottom: 12
                    },
                    children: "INFO"
                  }
                ),
                ["Alojamiento", "Cómo Llegar", "Contacto"].map((l) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    style: {
                      fontSize: 13,
                      color: "var(--text2)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 6
                    },
                    children: l
                  },
                  l
                ))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              borderTop: "1px solid var(--border)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12
            },
            children: [
              /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--text3)" }, children: "© 2026 Capachica Turismo." }),
              /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--text3)" }, children: "Hecho con amor a las orillas del lago Titicaca" })
            ]
          }
        )
      ] })
    }
  );
}

export { Footer as F };
