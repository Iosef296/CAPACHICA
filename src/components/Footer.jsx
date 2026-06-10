// Footer.jsx — Capachica Turismo
// Uso: importa y pon <Footer /> al final de cualquier página
// Los estilos usan prefijo --cap- para no chocar con otros CSS

import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Nunito:wght@400;600;700&display=swap');

 .cap-footer {
    margin-top: auto;
    --cap-deep: #0a2640;
    --cap-mid: #1a4a6e;
    --cap-light: #2a7ab0;
    --cap-gold: #c9a227;
    --cap-sand: #e8d5a3;
    --cap-text: #d4e8f5;
    --cap-muted: #7fb3d3;
    --cap-white: #f0f8ff;
    font-family: 'Nunito', sans-serif;
    background: var(--cap-deep);
    color: var(--cap-text);
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
  }
  .cap-footer *, .cap-footer *::before, .cap-footer *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .cap-wave-top { width: 100%; display: block; margin-bottom: -4px; }
  .cap-footer-body {
    padding: 2.5rem 2rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .cap-top-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(42,122,176,0.3);
  }
  .cap-brand-logo {
    display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem;
  }
  .cap-logo-circle {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, var(--cap-light), var(--cap-gold));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-weight: 700; font-size: 18px; color: var(--cap-deep); flex-shrink: 0;
  }
  .cap-brand-name {
    font-family: 'Playfair Display', serif;
    font-weight: 700; font-size: 20px; color: var(--cap-white); line-height: 1.1;
  }
  .cap-brand-tagline {
    font-size: 11px; color: var(--cap-gold);
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .cap-brand-desc {
    font-size: 13px; color: var(--cap-muted); line-height: 1.6; margin-bottom: 1rem;
  }
  .cap-social-row { display: flex; gap: 10px; }
  .cap-social-btn {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1px solid rgba(42,122,176,0.5);
    background: rgba(42,122,176,0.15);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--cap-muted); font-size: 16px;
    transition: all 0.2s; text-decoration: none;
  }
  .cap-social-btn:hover { background: var(--cap-light); color: white; border-color: var(--cap-light); }
  .cap-col-title {
    font-family: 'Playfair Display', serif;
    font-size: 14px; font-weight: 700; color: var(--cap-gold);
    margin-bottom: 1rem; letter-spacing: 0.03em;
  }
  .cap-link-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .cap-link-list a {
    font-size: 13px; color: var(--cap-muted); text-decoration: none;
    transition: color 0.15s; display: flex; align-items: center; gap: 5px;
  }
  .cap-link-list a:hover { color: var(--cap-sand); }
  .cap-link-list a::before {
    content: ''; display: inline-block; width: 4px; height: 4px;
    border-radius: 50%; background: var(--cap-light); flex-shrink: 0;
  }
  .cap-newsletter-desc { font-size: 12px; color: var(--cap-muted); margin-bottom: 0.75rem; line-height: 1.5; }
  .cap-newsletter-form { display: flex; flex-direction: column; gap: 8px; }
  .cap-email-input {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(42,122,176,0.4);
    border-radius: 6px; padding: 8px 12px;
    font-size: 13px; color: var(--cap-white);
    font-family: 'Nunito', sans-serif; outline: none; width: 100%;
  }
  .cap-email-input::placeholder { color: var(--cap-muted); opacity: 0.7; }
  .cap-email-input:focus { border-color: var(--cap-light); }
  .cap-subscribe-btn {
    background: var(--cap-gold); color: var(--cap-deep);
    border: none; border-radius: 6px; padding: 8px 12px;
    font-size: 13px; font-weight: 700;
    font-family: 'Nunito', sans-serif; cursor: pointer; transition: opacity 0.15s;
  }
  .cap-subscribe-btn:hover { opacity: 0.85; }
  .cap-no-spam { font-size: 11px; color: var(--cap-muted); opacity: 0.7; }
  .cap-bottom-row {
    padding-top: 1.25rem; display: flex;
    justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 0.75rem;
  }
  .cap-copyright { font-size: 12px; color: var(--cap-muted); opacity: 0.8; }
  .cap-copyright span { color: var(--cap-gold); }
  .cap-legal-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .cap-legal-links a {
    font-size: 12px; color: var(--cap-muted); text-decoration: none;
    opacity: 0.8; transition: opacity 0.15s;
  }
  .cap-legal-links a:hover { opacity: 1; color: var(--cap-sand); }
  .cap-contact-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1.25rem; }
  .cap-contact-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--cap-muted);
    cursor: pointer; transition: color 0.15s; text-decoration: none;
  }
  .cap-contact-item:hover { color: var(--cap-sand) !important; }
  .cap-contact-item:hover span { color: var(--cap-sand) !important; }
  .cap-contact-item:hover svg { stroke: var(--cap-sand) !important; }
  .cap-col-title-mt { margin-top: 1.25rem; }

  @media (max-width: 768px) {
    .cap-top-row { grid-template-columns: 1fr 1fr; }
    .cap-brand-col { grid-column: 1 / -1; }
  }
  @media (max-width: 480px) {
    .cap-top-row { grid-template-columns: 1fr; }
    .cap-footer-body { padding: 2rem 1.25rem 1.25rem; }
  }
`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

const handleSubscribe = async () => {
    if (!email.trim()) return;

    try {
      const response = await fetch("http://localhost:3030/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

return (
    <>
      <style>{`
        html, body { min-height: 100%; }
        body { display: flex; flex-direction: column; }
        main { flex: 1; }
      `}</style>
      <style>{styles}</style>
      <footer className="cap-footer">
        {/* Ola decorativa en la parte superior */}
        <svg
          className="cap-wave-top"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,40 C150,10 350,55 600,30 C850,5 1050,50 1200,25 L1200,60 L0,60 Z"
            fill="#0a2640"
          />
          <path
            d="M0,50 C200,25 400,60 700,40 C900,25 1100,55 1200,38 L1200,60 L0,60 Z"
            fill="rgba(10,38,64,0.5)"
          />
        </svg>

        <div className="cap-footer-body">
          <div className="cap-top-row">
            {/* Columna 1: Marca + redes sociales */}
            <div className="cap-brand-col">
              <div className="cap-brand-logo">
                <div className="cap-logo-circle">C</div>
                <div>
                  <div className="cap-brand-name">Capachica</div>
                  <div className="cap-brand-tagline">Turismo</div>
                </div>
              </div>
              <p className="cap-brand-desc">
                La experiencia auténtica del lago Titicaca. Comunidades, paisajes
                y tradiciones que guardan la esencia del altiplano peruano.
              </p>
              <div className="cap-social-row">
                <a
                  href="https://instagram.com/capachicaturismo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-social-btn"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-social-btn"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-social-btn"
                  aria-label="YouTube"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a2640"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-social-btn"
                  aria-label="TikTok"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Columna 2: Destinos */}
            <div>
              <p className="cap-col-title">Destinos</p>
              <ul className="cap-link-list">
                <li><a href="/destinos/playa-llacho">Playa Llacho</a></li>
                <li><a href="/destinos/mirador-amaru">Mirador del Amaru</a></li>
                <li><a href="/destinos/isla-ticonata">Isla Ticonata</a></li>
                <li><a href="/destinos/comunidad">Comunidad Capachica</a></li>
                <li><a href="/destinos/islas-flotantes">Islas flotantes</a></li>
                <li><a href="/destinos">Ver todos</a></li>
              </ul>
            </div>

            {/* Columna 3: Experiencias + Info */}
            <div>
              <p className="cap-col-title">Experiencias</p>
              <ul className="cap-link-list">
                <li><a href="/vivencias">Vivencias</a></li>
                <li><a href="/actividades">Actividades</a></li>
                <li><a href="/gastronomia">Gastronomía</a></li>
                <li><a href="/festividades">Festividades</a></li>
                <li><a href="/artesania">Artesanía</a></li>
              </ul>
              <p className="cap-col-title" style={{ marginTop: "1.25rem" }}>Info</p>
              <ul className="cap-link-list">
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/alojamiento">Alojamiento</a></li>
                <li><a href="/como-llegar">Cómo llegar</a></li>
                <li><a href="/contacto">Contacto</a></li>
              </ul>
            </div>

            {/* Columna 4: Newsletter + contacto */}
            <div>
              <p className="cap-col-title">Newsletter</p>
              <p className="cap-newsletter-desc">
                Novedades y ofertas exclusivas · 1 email/semana
              </p>
              {subscribed ? (
                <p style={{ fontSize: "13px", color: "var(--cap-gold)" }}>
                  ¡Gracias! Te escribiremos pronto 🌊
                </p>
              ) : (
                <div className="cap-newsletter-form">
                  <input
                    type="email"
                    className="cap-email-input"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button className="cap-subscribe-btn" onClick={handleSubscribe}>
                    Suscribirme
                  </button>
                  <span className="cap-no-spam">Sin spam, prometido</span>
                </div>
              )}

              <div className="cap-contact-row">
                <a
                  href="https://wa.me/51955949404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-contact-item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cap-light)" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/>
                  </svg>
                  <span>+51 955949404</span>
                </a>
                <a
                  href="mailto:torresdeissy56@gmail.com"
                  className="cap-contact-item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cap-light)" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>torresdeissy56@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Barra inferior: copyright + links legales */}
          <div className="cap-bottom-row">
            <p className="cap-copyright">
              © 2026 Capachica Turismo ·{" "}
              <span>Hecho con amor a las orillas del lago Titicaca</span>
            </p>
            <div className="cap-legal-links">
              <a href="/privacidad">Privacidad</a>
              <a href="/terminos">Términos</a>
              <a href="/cookies">Cookies</a>
              <a href="/cancelaciones">Cancelaciones</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}