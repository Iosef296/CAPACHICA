import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <Link to="/" className="nav-logo" style={{ marginBottom: 12, display: "inline-flex" }}>
              <div className="nav-logo-mark">C</div>
              <span className="nav-logo-text">Capachica Turismo</span>
            </Link>
            <p className="footer-brand-desc">
              La joya escondida del lago Titicaca. Descubre comunidades auténticas,
              paisajes vírgenes y experiencias que cambian perspectivas.
            </p>
            <p style={{ color: "var(--fg3)", fontSize: "0.85rem", marginTop: 12 }}>
              📍 Puno · Perú · 3,812 msnm
            </p>
          </div>
          <div>
            <div className="footer-heading">Explorar</div>
            {[["Destinos", "/destinos"], ["Actividades", "/actividades"], ["Vivencial", "/vivencial"], ["Festividades", "/festividades"]].map(([l, t]) => (
              <Link key={t} to={t} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div className="footer-heading">Servicios</div>
            {[["Alojamiento", "/alojamiento"], ["Gastronomía", "/gastronomia"], ["Artesanía", "/artesania"], ["Cómo llegar", "/como-llegar"]].map(([l, t]) => (
              <Link key={t} to={t} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div className="footer-heading">Contacto</div>
            <a href="mailto:info@capachica.pe" className="footer-link">✉ info@capachica.pe</a>
            <a href="tel:+51999000000" className="footer-link">📞 +51 999 000 000</a>
            <Link to="/contacto" className="footer-link" style={{ marginTop: 8 }}>Planificar viaje →</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Capachica Turismo. Puno, Perú.</span>
          <Link to="/admin/login" style={{ color: "var(--fg3)", fontSize: "0.8rem" }}>Admin</Link>
        </div>
      </div>
    </footer>
  )
}
