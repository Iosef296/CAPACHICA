import { useState, useEffect } from "react";

const navLinks = [
  { label: "Inicio",       href: "/" },
  { label: "Destinos",     href: "/destinos" },
  { label: "Vivencial",    href: "/vivencial" },
  { label: "Actividades",  href: "/actividades" },
  { label: "Gastronomía",  href: "/gastronomia" },
  { label: "Festividades", href: "/festividades" },
  { label: "Artesanía",    href: "/artesania" },
  { label: "Alojamiento",  href: "/alojamiento" },
  { label: "Cómo Llegar",  href: "/como-llegar" },
];

export default function Navbar() {
  const [dark, setDark]           = useState(true);
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [path, setPath]           = useState("/");

  useEffect(() => {
    const saved = localStorage.getItem("capachica-theme") || localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    setPath(window.location.pathname);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) setScrollPct((y / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("capachica-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%,100%{ box-shadow: 0 0 18px rgba(56,189,248,0.35) }
          50%    { box-shadow: 0 0 32px rgba(56,189,248,0.65) }
        }
        .nav-link {
          padding: 6px 13px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(240,237,232,0.85);
          text-decoration: none;
          transition: all 0.22s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.15); }
        .nav-link.active {
          background: linear-gradient(135deg,#0ea5e9,#0369a1);
          color: #fff !important;
          font-weight: 600;
          box-shadow: 0 2px 14px rgba(56,189,248,0.3);
        }
        .hamburger { display: none !important; }
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .mobile-menu a {
          display: block; padding: 12px 20px; font-size: 15px; font-weight: 500;
          color: var(--text2); text-decoration: none; border-radius: 14px;
          border-left: 3px solid transparent; transition: all 0.2s; margin-bottom: 2px;
        }
        .mobile-menu a:hover, .mobile-menu a.active {
          color: var(--accent); background: var(--accent-light); border-left-color: var(--accent);
        }
      `}</style>

      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3,
        width: `${scrollPct}%`, zIndex: 200, pointerEvents: "none",
        background: "linear-gradient(90deg, #38bdf8, #0ea5e9, #fbbf24)",
        borderRadius: "0 2px 2px 0", transition: "width 0.08s linear",
        boxShadow: "0 0 8px rgba(56,189,248,0.6)",
      }} />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen
          ? dark ? "rgba(6,15,26,0.75)" : "rgba(13,71,161,0.35)"
          : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(24px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(24px) saturate(200%)" : "none",
        borderBottom: scrolled || menuOpen
          ? `1px solid rgba(56,189,248,${dark ? "0.12" : "0.2"})`
          : "1px solid transparent",
        boxShadow: scrolled || menuOpen ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.35s ease",
        padding: "0 1.5rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", height: 66,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#0ea5e9,#0369a1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
              animation: "pulse-glow 3s ease-in-out infinite",
            }}>C</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "rgba(240,237,232,0.95)", lineHeight: 1 }}>
                Capachica
              </div>
              <div style={{ fontSize: 9, color: "rgba(240,237,232,0.50)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Turismo Vivencial
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", gap: 1, flex: 1, justifyContent: "center" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className={`nav-link${isActive(l.href) ? " active" : ""}`}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: 50, height: 28, borderRadius: 14,
                background: dark ? "rgba(56,189,248,0.1)" : "rgba(217,119,6,0.15)",
                border: "1px solid rgba(56,189,248,0.2)",
                cursor: "pointer", position: "relative", transition: "all 0.3s",
              }}
            >
              <div style={{
                position: "absolute", top: 4, left: dark ? 24 : 4,
                width: 20, height: 20, borderRadius: "50%",
                background: dark ? "#38bdf8" : "#fbbf24",
                transition: "left 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11,
                boxShadow: dark ? "0 0 10px rgba(56,189,248,0.7)" : "0 0 10px rgba(251,191,36,0.7)",
              }}>
                {dark ? "🌙" : "☀️"}
              </div>
            </button>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              style={{
                flexDirection: "column", gap: 5,
                background: "transparent", border: "none", cursor: "pointer", padding: 4,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 2,
                  background: menuOpen ? "#38bdf8" : "var(--text)",
                  borderRadius: 2, transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                    : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                    : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            padding: "10px 0 18px",
            borderTop: "1px solid rgba(56,189,248,0.1)",
          }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className={isActive(l.href) ? "active" : ""}
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
