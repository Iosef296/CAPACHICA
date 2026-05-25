import React, { useEffect, useState, Suspense } from "react"
import { Link } from "react-router-dom"
import { api } from "../api/client"
import { Destino } from "../types"
import Card from "../components/Card"

const HeroScene = React.lazy(() => import("../components/three/HeroScene"))

export default function Home() {
  const [destinos, setDestinos] = useState<Destino[]>([])

  useEffect(() => {
    api.get<Destino[]>("/api/destinos").then(d => setDestinos(d.filter(x => x.destacado).slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <div className="page-home">
      {/* ── 3D HERO ──────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-canvas">
          <Suspense fallback={<div style={{ background: "var(--bg)", width: "100%", height: "100%" }} />}>
            <HeroScene />
          </Suspense>
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">Puno · Perú · 3,812 msnm</div>
          <h1 className="hero-title">
            La Joya Escondida<br />
            <em>del Titicaca</em>
          </h1>
          <p className="hero-sub">
            Capachica es una península mágica donde el tiempo se detiene, las familias
            abren sus puertas y el lago Titicaca te rodea con su inmensidad azul.
          </p>
          <div className="hero-ctas">
            <Link to="/destinos" className="btn-primary">Explorar Capachica →</Link>
            <Link to="/vivencial" className="btn-outline">Turismo Vivencial</Link>
            <a href="/world.html" className="btn-outline" style={{ borderColor: "#5eead4", color: "#5eead4" }}>🌍 Mundo 3D</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stats-inner">
            <div className="stat-item"><span className="stat-num">55km</span><span className="stat-lbl">de Puno</span></div>
            <div className="stat-item"><span className="stat-num">12</span><span className="stat-lbl">Comunidades</span></div>
            <div className="stat-item"><span className="stat-num">4.9★</span><span className="stat-lbl">Valoración</span></div>
            <div className="stat-item"><span className="stat-num">3,812m</span><span className="stat-lbl">Altitud</span></div>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ CAPACHICA ────────────────────────────────────── */}
      <section className="section">
        <div className="section-inner">
          <div className="feature-grid">
            <div className="feature-img">🏔</div>
            <div>
              <div className="section-tag"><div className="section-tag-bar" /><span className="section-tag-text">Por qué Capachica</span></div>
              <h2 className="section-title">Un rincón auténtico <em>sin masas de turistas</em></h2>
              <p className="section-sub" style={{ marginBottom: 32 }}>A solo 55km de Puno, Capachica ofrece contacto real con comunidades andinas, paisajes vírgenes del Titicaca y experiencias que cambian perspectivas.</p>
              <div className="grid-2" style={{ gap: 16 }}>
                {[
                  { icon: "🤝", t: "Turismo Vivencial", d: "Vive como una familia local. Come, trabaja y celebra con ellos." },
                  { icon: "🌊", t: "Playas del Titicaca", d: "Playas tranquilas con vistas panorámicas al lago más alto del mundo." },
                  { icon: "🎨", t: "Artesanía Viva", d: "Textiles, cerámica y tejidos hechos a mano por artesanas locales." },
                  { icon: "🚴", t: "Aventura Andina", d: "Ciclismo, kayak, senderismo y pesca artesanal en el Titicaca." },
                ].map(f => (
                  <div key={f.t} className="info-card">
                    <div className="info-card-icon">{f.icon}</div>
                    <div><div className="info-card-title">{f.t}</div><div className="info-card-desc">{f.d}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINOS DESTACADOS ─────────────────────────────────── */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="text-center mb-8">
            <div className="section-tag" style={{ justifyContent: "center" }}><div className="section-tag-bar" /><span className="section-tag-text">Destinos</span></div>
            <h2 className="section-title">Los rincones más <em>especiales</em></h2>
          </div>
          <div className="grid-3">
            {destinos.length > 0
              ? destinos.map(d => (
                  <Card key={d.id} nombre={d.nombre} descripcion={d.descripcion} imagen_url={d.imagen_url} tag={d.categoria} href="/destinos" />
                ))
              : [
                  { nombre: "Playa de Llachón", descripcion: "La playa más hermosa de la península.", tag: "Playa", emoji: "🏖" },
                  { nombre: "Mirador del Amaru", descripcion: "Vista panorámica de 360° sobre el lago.", tag: "Mirador", emoji: "🦅" },
                  { nombre: "Isla Ticonata",     descripcion: "Isla sagrada con lodge comunitario.",  tag: "Isla",   emoji: "🏝" },
                ].map(d => (
                  <div key={d.nombre} className="card">
                    <div className="card-img"><span>{d.emoji}</span><span className="card-tag">{d.tag}</span></div>
                    <div className="card-body">
                      <h3 className="card-title">{d.nombre}</h3>
                      <p className="card-desc">{d.descripcion}</p>
                      <Link to="/destinos" className="card-link">Explorar →</Link>
                    </div>
                  </div>
                ))
            }
          </div>
          <div className="text-center mt-8">
            <Link to="/destinos" className="btn-primary">Ver todos los destinos →</Link>
          </div>
        </div>
      </section>

      {/* ── VIVENCIAL ────────────────────────────────────────────── */}
      <section className="section">
        <div className="section-inner">
          <div className="feature-grid">
            <div>
              <div className="section-tag"><div className="section-tag-bar" style={{ background: "var(--dorado-light)" }} /><span className="section-tag-text" style={{ color: "var(--dorado-light)" }}>Turismo Vivencial</span></div>
              <h2 className="section-title">Vive como una <em style={{ color: "var(--dorado-light)" }}>familia capachiquena</em></h2>
              <p className="section-sub" style={{ marginBottom: 28 }}>No solo visitas Capachica: te conviertes en parte de ella. Comparte el desayuno, la pesca, el tejido y la celebración con familias locales que guardan tradiciones de siglos.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { icon: "🌅", t: "Amanecer en el lago", d: "Despierta antes del alba y observa cómo el sol tiñe el Titicaca de naranja." },
                  { icon: "🎣", t: "Pesca artesanal",     d: "Aprende las técnicas ancestrales de pesca del pueblo aimara en el lago." },
                  { icon: "🧶", t: "Tejido tradicional",  d: "Las mujeres de Capachica te enseñan a tejer con lana de alpaca." },
                ].map(x => (
                  <div key={x.t} className="info-card">
                    <div className="info-card-icon">{x.icon}</div>
                    <div><div className="info-card-title">{x.t}</div><div className="info-card-desc">{x.d}</div></div>
                  </div>
                ))}
              </div>
              <Link to="/vivencial" className="btn-primary">Conocer el turismo vivencial →</Link>
            </div>
            <div className="feature-img">🏡</div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="text-center mb-8">
            <div className="section-tag" style={{ justifyContent: "center" }}><div className="section-tag-bar" /><span className="section-tag-text">Reseñas</span></div>
            <h2 className="section-title">Lo que dicen los viajeros</h2>
          </div>
          <div className="grid-3">
            {[
              { text: "\"Capachica me cambió la vida. La familia con la que me quedé fue increíblemente generosa. Ver el amanecer sobre el Titicaca fue mágico.\"", name: "Ana Rodríguez", origin: "España · 2025", av: "A" },
              { text: "\"Genuinely the most authentic experience I've had traveling in South America. The community tourism here is done right — respectful and real.\"", name: "Tom Williams", origin: "Australia · 2025", av: "T" },
              { text: "\"Une expérience profondément humaine. La pêche au lever du soleil avec la famille locale restera gravée dans ma mémoire pour toujours.\"", name: "Marie Dubois", origin: "Francia · 2025", av: "M" },
            ].map(t => (
              <div key={t.name} className="testimonial">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.av}</div>
                  <div><div className="testimonial-name">{t.name}</div><div className="testimonial-origin">{t.origin}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MUNDO 3D ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: "linear-gradient(135deg,#040c08 0%,#071a14 50%,#0a2a1e 100%)", borderTop: "1px solid rgba(13,148,136,0.2)", borderBottom: "1px solid rgba(13,148,136,0.2)" }}>
        <div className="section-inner">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18, padding: "12px 0" }}>
            <div style={{ fontSize: 54, lineHeight: 1, animation: "float3d 3s ease-in-out infinite" }}>🌍</div>
            <div className="section-tag">
              <div className="section-tag-bar" style={{ background: "#5eead4" }} />
              <span className="section-tag-text" style={{ color: "#5eead4" }}>Experiencia inmersiva</span>
            </div>
            <h2 className="section-title" style={{ maxWidth: 560 }}>
              Explora la península en <em style={{ color: "#5eead4" }}>3D interactivo</em>
            </h2>
            <p className="section-sub" style={{ maxWidth: 520, color: "#94a3b8" }}>
              Navega Capachica en tiempo real. Camina por la playa, sube al mirador, descubre los 5 puntos de interés. Todo desde tu navegador.
            </p>
            <a
              href="/world.html"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(13,148,136,0.15)", border: "1.5px solid #0d9488",
                color: "#5eead4", padding: "14px 36px", borderRadius: 12,
                fontSize: 16, fontWeight: 700, textDecoration: "none",
                transition: "all 0.25s", marginTop: 8,
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "rgba(13,148,136,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e  => { (e.currentTarget as HTMLElement).style.background = "rgba(13,148,136,0.15)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              🗺️ Entrar al Mundo 3D →
            </a>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              {["🎮 WASD para mover","🖱️ Arrastrar para rotar","📍 5 puntos de interés","🌅 Ciclo día / noche"].map(s => (
                <span key={s} style={{ fontSize: 12, color: "rgba(94,234,212,0.5)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes float3d{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-10px) rotate(5deg)}}`}</style>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="cta-banner">
        <h2 className="cta-banner-title">¿Listo para descubrir Capachica?</h2>
        <p className="cta-banner-sub">Planifica tu experiencia vivencial con comunidades locales. Respondemos en menos de 24 horas.</p>
        <Link to="/contacto" className="btn-primary">Planificar mi viaje →</Link>
      </section>
    </div>
  )
}
