export default function Footer() {
  const sections = [
    {
      title: "Destinos",
      links: [
        { label: "Llachón", href: "/destinos" },
        { label: "Escallani", href: "/destinos" },
        { label: "Isla Taquile", href: "/destinos" },
        { label: "Bahía de Chifrón", href: "/destinos" },
      ],
    },
    {
      title: "Experiencias",
      links: [
        { label: "Turismo Vivencial", href: "/vivencial" },
        { label: "Actividades", href: "/actividades" },
        { label: "Gastronomía", href: "/gastronomia" },
        { label: "Festividades", href: "/festividades" },
        { label: "Artesanía", href: "/artesania" },
      ],
    },
    {
      title: "Planifica",
      links: [
        { label: "Alojamiento", href: "/alojamiento" },
        { label: "Cómo Llegar", href: "/como-llegar" },
        { label: "Términos", href: "/terminos" },
        { label: "Privacidad", href: "/privacidad" },
        { label: "Cancelaciones", href: "/cancelaciones" },
      ],
    },
  ];

  return (
    <footer style={{
      background: "linear-gradient(180deg, var(--sand) 0%, #020b14 100%)",
      borderTop: "1px solid var(--border)",
      padding: "64px 0 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(56,189,248,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3.5rem",
        }}>
          {/* Brand */}
          <div>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "1.2rem" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg,#0ea5e9,#0369a1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18,
                boxShadow: "0 0 20px rgba(56,189,248,0.3)",
              }}>C</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--text)" }}>
                  Capachica
                </div>
                <div style={{ fontSize: 10, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Turismo Vivencial
                </div>
              </div>
            </a>
            <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.75, maxWidth: 260, marginBottom: "1.5rem" }}>
              La joya escondida del Lago Titicaca. Conectamos viajeros con las comunidades quechuas de la península de Capachica, Puno — Perú.
            </p>
            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["🌊 Titicaca", "🏔️ 3820 msnm", "🇵🇪 Puno, Perú"].map(b => (
                <span key={b} style={{
                  padding: "4px 10px", borderRadius: 999,
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.15)",
                  color: "var(--text3)", fontSize: 11,
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map(sec => (
            <div key={sec.title}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--accent)",
                marginBottom: "1rem",
              }}>
                {sec.title}
              </div>
              {sec.links.map(l => (
                <a key={l.label} href={l.href} style={{
                  display: "block", fontSize: 13, color: "var(--text2)",
                  textDecoration: "none", marginBottom: 8, transition: "color 0.2s",
                  lineHeight: 1.5,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "24px 0" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>
              © 2026 Capachica Turismo · Todos los derechos reservados
            </span>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>
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
