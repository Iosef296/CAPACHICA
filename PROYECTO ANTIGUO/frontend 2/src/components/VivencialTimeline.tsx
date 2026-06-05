import { timeline } from "../data/vivencial";

export default function VivencialTimeline() {
  return (
    <>
      <style>{`
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
      `}</style>

      {/* ¿Qué es? */}
      <section className="que-es-section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span
              className="badge badge-cyan"
              style={{ marginBottom: 20, display: "inline-block" }}
            >
              — VIVENCIAL
            </span>
            <h2
              className="section-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,5vw,52px)",
                fontWeight: 700,
                margin: "12px 0 20px",
                lineHeight: 1.1,
              }}
            >
              ¿Qué es el
              <br />
              <em className="section-subtitle" style={{ fontStyle: "italic" }}>
                Turismo Vivencial?
              </em>
            </h2>
            <p
              className="section-text"
              style={{ fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8 }}
            >
              El turismo vivencial es una experiencia única donde te conviertes
              en parte de una familia andina de la península de Capachica.
              Compartes su hogar, aprendes sus oficios milenarios —la pesca en
              totora, el tejido en telar, la agricultura orgánica— y vives sus
              rutinas junto al lago Titicaca, a 3,810 metros sobre el mar.
            </p>
            <p
              className="section-text"
              style={{
                fontSize: 15,
                marginTop: 16,
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              No es un hotel. No es un tour. Es convivir.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span
              className="badge badge-cyan"
              style={{ marginBottom: 16, display: "inline-block" }}
            >
              — UN DÍA CONTIGO
            </span>
            <h2
              className="section-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Tu día en Capachica
            </h2>
          </div>

          <div
            className="timeline-wrapper"
            style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}
          >
            <div
              className="timeline-line-vert"
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                transform: "translateX(-50%)",
              }}
            />

            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-row"
                style={{
                  display: "flex",
                  flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                  alignItems: "center",
                  marginBottom: 40,
                  gap: 24,
                }}
              >
                <div
                  className="timeline-card"
                  style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}
                >
                  <div
                    className="timeline-hour"
                    style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}
                  >
                    {item.hora}
                  </div>
                  <div
                    className="timeline-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {item.titulo}
                  </div>
                  <div
                    className="timeline-desc"
                    style={{ fontSize: 13, lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </div>
                </div>

                <div
                  className="timeline-dot timeline-dot-wrap"
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    zIndex: 1,
                  }}
                >
                  {item.icono}
                </div>

                <div className="timeline-spacer" style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
