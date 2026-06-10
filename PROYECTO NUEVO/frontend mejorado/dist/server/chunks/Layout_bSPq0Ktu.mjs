import { c as createComponent } from './astro-component_D4_SZq4w.mjs';
import { t as renderSlot, o as renderHead, p as renderComponent, h as renderTemplate } from './server_9i1cpG6S.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { F as Footer } from './Footer_BYloE1bB.mjs';

function Navbar() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("ES");
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    setCurrentPath(window.location.pathname);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light"
    );
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Destinos", href: "/destinos" },
    { label: "Vivencial", href: "/vivencial" },
    { label: "Actividades", href: "/actividades" },
    { label: "Gastronomía", href: "/gastronomia" },
    { label: "Festividades", href: "/festividades" },
    { label: "Artesanía", href: "/artesania" },
    { label: "Cómo Llegar", href: "/como-llegar" },
    { label: "Alojamiento", href: "/alojamiento" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "nav",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled || menuOpen ? "rgba(7,24,38,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(120,200,255,0.15)" : "none",
          transition: "all 0.3s",
          padding: "0 1.5rem"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                maxWidth: 1180,
                margin: "0 auto",
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      textDecoration: "none",
                      flexShrink: 0
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #1ba6d9, #0b6ea8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 16,
                            boxShadow: "0 0 15px rgba(83,211,255,0.3)"
                          },
                          children: "C"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            style: {
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontSize: 15,
                              color: "#f4f7fb",
                              lineHeight: 1
                            },
                            children: "Capachica"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            style: {
                              fontSize: 9,
                              color: "#7f95aa",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase"
                            },
                            children: "Turismo Vivencial"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "nav-links-desktop",
                    style: {
                      display: "flex",
                      gap: 2,
                      flex: 1,
                      justifyContent: "center"
                    },
                    children: navLinks.map((l) => {
                      const isActive = currentPath === l.href;
                      return /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: l.href,
                          style: {
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 13,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#fff" : "#b9c8d6",
                            background: isActive ? "linear-gradient(135deg,#1ba6d9,#0b6ea8)" : "transparent",
                            textDecoration: "none",
                            transition: "all 0.25s",
                            boxShadow: isActive ? "0 0 15px rgba(83,211,255,0.25)" : "none"
                          },
                          onMouseEnter: (e) => {
                            if (!isActive)
                              e.currentTarget.style.color = "#53d3ff";
                          },
                          onMouseLeave: (e) => {
                            if (!isActive)
                              e.currentTarget.style.color = "#b9c8d6";
                          },
                          children: l.label
                        },
                        l.label
                      );
                    })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      flexShrink: 0
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "nav-langs-desktop",
                          style: { display: "flex", gap: 4 },
                          children: ["ES", "EN", "FR"].map((l) => /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => setLang(l),
                              style: {
                                padding: "4px 8px",
                                borderRadius: 6,
                                border: "none",
                                background: lang === l ? "linear-gradient(135deg,#1ba6d9,#0b6ea8)" : "rgba(120,200,255,0.08)",
                                color: lang === l ? "#fff" : "#7f95aa",
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s"
                              },
                              children: l
                            },
                            l
                          ))
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: toggleTheme,
                          "aria-label": "Toggle theme",
                          style: {
                            width: 46,
                            height: 26,
                            borderRadius: 13,
                            background: dark ? "rgba(83,211,255,0.15)" : "rgba(196,125,0,0.2)",
                            border: "1px solid rgba(120,200,255,0.2)",
                            cursor: "pointer",
                            position: "relative",
                            transition: "background 0.3s"
                          },
                          children: /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                top: 3,
                                left: dark ? 22 : 3,
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                background: dark ? "#53d3ff" : "#f5b32f",
                                transition: "left 0.3s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 11,
                                boxShadow: dark ? "0 0 8px rgba(83,211,255,0.6)" : "0 0 8px rgba(245,179,47,0.6)"
                              },
                              children: dark ? "🌙" : "☀️"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          className: "hamburger",
                          onClick: () => setMenuOpen(!menuOpen),
                          "aria-label": "Menu",
                          style: {
                            display: "none",
                            flexDirection: "column",
                            gap: 5,
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px"
                          },
                          children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  display: "block",
                                  width: 24,
                                  height: 2,
                                  background: menuOpen ? "#53d3ff" : "#f4f7fb",
                                  borderRadius: 2,
                                  transition: "all 0.3s",
                                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  display: "block",
                                  width: 24,
                                  height: 2,
                                  background: "#f4f7fb",
                                  borderRadius: 2,
                                  transition: "all 0.3s",
                                  opacity: menuOpen ? 0 : 1
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  display: "block",
                                  width: 24,
                                  height: 2,
                                  background: menuOpen ? "#53d3ff" : "#f4f7fb",
                                  borderRadius: 2,
                                  transition: "all 0.3s",
                                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
                                }
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          menuOpen && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                padding: "16px 0 24px",
                borderTop: "1px solid rgba(120,200,255,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 4
              },
              children: [
                navLinks.map((l) => {
                  const isActive = currentPath === l.href;
                  return /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: l.href,
                      onClick: () => setMenuOpen(false),
                      style: {
                        padding: "12px 16px",
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#53d3ff" : "#b9c8d6",
                        background: isActive ? "rgba(83,211,255,0.08)" : "transparent",
                        textDecoration: "none",
                        borderLeft: isActive ? "3px solid #53d3ff" : "3px solid transparent",
                        transition: "all 0.2s"
                      },
                      children: l.label
                    },
                    l.label
                  );
                }),
                /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, padding: "12px 16px 0" }, children: ["ES", "EN", "FR"].map((l) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setLang(l),
                    style: {
                      padding: "6px 14px",
                      borderRadius: 8,
                      border: "none",
                      background: lang === l ? "linear-gradient(135deg,#1ba6d9,#0b6ea8)" : "rgba(120,200,255,0.08)",
                      color: lang === l ? "#fff" : "#7f95aa",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: l
                  },
                  l
                )) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-langs-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      ` })
  ] });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Capachica Turismo" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/Navbar", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Navbar as N };
