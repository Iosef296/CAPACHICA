import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';

function VivencialHero() {
  const starsRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
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
  const heroBg = isDark ? "linear-gradient(to bottom, #123f61 0%, #0d2c45 45%, #06192a 100%)" : "linear-gradient(to bottom, #a8d4ee 0%, #7bbcd8 45%, #5ba3c9 100%)";
  const lakeBg = isDark ? "#03192b" : "#4a8fba";
  const moonBg = isDark ? "#d7e4ef" : "#f5b32f";
  const moonShadow = isDark ? "0 0 40px rgba(255,255,255,.35), 0 0 80px rgba(255,255,255,.15)" : "0 0 60px rgba(245,179,47,.6), 0 0 120px rgba(245,179,47,.3)";
  const moonSize = isDark ? 90 : 110;
  const badgeColor = isDark ? "#53d3ff" : "#0b7ab5";
  const titleColor = isDark ? "#f4f7fb" : "#071826";
  const subtitleColor = isDark ? "#f5b32f" : "#c47d00";
  const descColor = isDark ? "#b9c8d6" : "#1a3a52";
  const lineColor = isDark ? "#89e3ff" : "#0b7ab5";
  const badgeBg = isDark ? "rgba(83,211,255,0.1)" : "rgba(11,122,181,0.1)";
  const badgeBorder = isDark ? "rgba(83,211,255,0.3)" : "rgba(11,122,181,0.3)";
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

export { VivencialHero as V };
