export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--sand)",
        borderTop: "1px solid var(--border)",
        padding: "60px 0 24px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 32,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
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
                  fontSize: 15,
                }}
              >
                C
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--text)",
                }}
              >
                Capachica
              </span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>
              La joya escondida del Lago Titicaca
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 12,
              }}
            >
              DESTINOS
            </div>
            {[
              "Playa Llachón",
              "Mirador del Amaru",
              "Isla Ticonata",
              "Comunidad Capachica",
              "Atardeceres",
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 13,
                  color: "var(--text2)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 12,
              }}
            >
              EXPERIENCIAS
            </div>
            {[
              "Vivencial",
              "Actividades",
              "Gastronomía",
              "Festividades",
              "Artesanía",
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 13,
                  color: "var(--text2)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 12,
              }}
            >
              INFO
            </div>
            {["Alojamiento", "Cómo Llegar", "Contacto"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 13,
                  color: "var(--text2)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text3)" }}>
            © 2026 Capachica Turismo.
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>
            Hecho con amor a las orillas del lago Titicaca
          </span>
        </div>
      </div>
    </footer>
  );
}
