import React from "react"
import PageHero from "../components/PageHero"

export default function ComoLlegar() {
  return (
    <div className="page">
      <PageHero title="Cómo Llegar" subtitle="Capachica está a 55km de Puno. Te explicamos todas las rutas posibles." emoji="🗺" tag="Transporte" />
      <section className="section">
        <div className="section-inner">
          <div className="grid-2" style={{ gap: 32, marginBottom: 48 }}>
            {[
              { icon: "✈️", t: "Desde Lima", d: "Vuelo Lima → Juliaca (1h 20min). Luego taxi o bus Juliaca → Puno (45min). Desde Puno, bus o colectivo a Capachica (1h 30min)." },
              { icon: "🚌", t: "Desde Puno", d: "Bus directo Puno → Capachica (1h 30min, S/5). Sale desde el terminal terrestre de Puno. Frecuencia cada hora." },
              { icon: "🚗", t: "En auto", d: "Desde Puno tomar la ruta PE-3S hacia Capachica. 55km, aproximadamente 1h 15min por carretera asfaltada." },
              { icon: "⛵", t: "Por el lago", d: "Servicio de lancha desde el muelle de Puno a Llachón (2h). Contactar con operadores locales." },
            ].map(r => (
              <div key={r.t} className="info-card">
                <div className="info-card-icon">{r.icon}</div>
                <div><div className="info-card-title">{r.t}</div><div className="info-card-desc">{r.d}</div></div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 32 }}>
            <div className="section-tag" style={{ marginBottom: 16 }}>
              <div className="section-tag-bar" />
              <span className="section-tag-text">Mapa de ubicación</span>
            </div>
            <div style={{ background: "var(--bg2)", borderRadius: "var(--radius-md)", padding: 60, textAlign: "center", color: "var(--fg3)" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🗺</div>
              <p>Capachica, Puno, Perú</p>
              <p style={{ fontSize: "0.85rem", marginTop: 8 }}>Coordenadas: 15°37'S 69°49'W</p>
              <a
                href="https://maps.google.com/?q=Capachica,Puno,Peru"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: 20, display: "inline-flex" }}
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
