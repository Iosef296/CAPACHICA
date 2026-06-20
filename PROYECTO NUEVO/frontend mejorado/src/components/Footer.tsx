const DEFAULT_FOOTER_LINKS = [
  { label: "Alojamiento",   href: "/alojamiento" },
  { label: "Cómo Llegar",   href: "/como-llegar" },
  { label: "Términos",      href: "/terminos" },
  { label: "Privacidad",    href: "/privacidad" },
  { label: "Cancelaciones", href: "/cancelaciones" },
];

import { useState, useEffect } from "react";

export default function Footer() {
  const [cfg, setCfg] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_IA_URL || 'http://localhost:5000'}/api/siteconfig`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setCfg(d); })
      .catch(() => {});
  }, []);

  const footerLinks = cfg?.footer?.links?.length ? cfg.footer.links : DEFAULT_FOOTER_LINKS;

  const sections = [
    {
      title: "Destinos",
      links: [
        { label: "Llachón",        href: "/destinos" },
        { label: "Escallani",      href: "/destinos" },
        { label: "Isla Taquile",   href: "/destinos" },
        { label: "Bahía de Chifrón", href: "/destinos" },
      ],
      dynamic: false,
    },
    {
      title: "Experiencias",
      links: [
        { label: "Turismo Vivencial", href: "/vivencial" },
        { label: "Actividades",       href: "/actividades" },
        { label: "Gastronomía",       href: "/gastronomia" },
        { label: "Festividades",      href: "/festividades" },
        { label: "Artesanía",         href: "/artesania" },
      ],
      dynamic: false,
    },
    {
      title: "Planifica",
      links: footerLinks,
      dynamic: true,
    },
  ];

  return (
    <footer style={{
      background: "linear-gradient(180deg,#4a3a28 0%,#3a2a18 30%,#2a1a10 60%,#1a1008 100%)",
      borderTop: "1px solid rgba(212,168,67,0.12)",
      padding: "56px 0 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}>
          {/* Brand */}
          <div>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "1.2rem" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg,#2dd4bf,#d4a843)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0a1628", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18,
              }}>C</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: "rgba(240,237,232,0.9)", lineHeight: 1 }}>
                  Capachica
                </div>
                <div style={{ fontSize: 9, color: "rgba(212,168,67,0.6)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Space Mono',monospace" }}>
                  Turismo Vivencial
                </div>
              </div>
            </a>
            <p style={{ fontSize: 13, color: "rgba(240,237,232,0.5)", lineHeight: 1.75, maxWidth: 240, marginBottom: "1.5rem", fontFamily: "'Crimson Pro',Georgia,serif" }}>
              La joya escondida del Lago Titicaca. Conectamos viajeros con las comunidades quechuas de la península de Capachica, Puno — Perú.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {["🌊 Titicaca", "🏔️ 3820 msnm", "🇵🇪 Puno, Perú"].map(b => (
                <span key={b} style={{
                  padding: "3px 10px", borderRadius: 999,
                  background: "rgba(212,168,67,0.08)",
                  border: "1px solid rgba(212,168,67,0.2)",
                  color: "rgba(212,168,67,0.7)", fontSize: 11,
                  fontFamily: "'Space Mono',monospace",
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map(sec => (
            <div key={sec.title}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
                textTransform: "uppercase", color: "rgba(212,168,67,0.7)",
                marginBottom: "1rem", fontFamily: "'Space Mono',monospace",
              }}>
                {sec.title}
              </div>
              <div {...(sec.dynamic ? { 'data-footer-links': 'true' } : {})}>
                {sec.links.map(l => (
                  <a key={l.label} href={l.href}
                    {...(sec.dynamic ? { className: 'footer-link' } : {})}
                    style={{
                      display: "block", fontSize: 13.5, color: "rgba(240,237,232,0.52)",
                      textDecoration: "none", marginBottom: 9, transition: "color 0.2s",
                      lineHeight: 1.5, fontFamily: "'Crimson Pro',Georgia,serif",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,237,232,0.95)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,232,0.52)")}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(212,168,67,0.12)", padding: "20px 0" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap" as const, gap: 12,
          }}>
            <span style={{ fontSize: 12, color: "rgba(240,237,232,0.38)", fontFamily: "'Space Mono',monospace" }}>
              © 2026 Capachica Turismo · Todos los derechos reservados
            </span>
            <span style={{ fontSize: 12, color: "rgba(212,168,67,0.6)" }}>
              Hecho con ❤️ a orillas del Lago Titicaca
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 560px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
