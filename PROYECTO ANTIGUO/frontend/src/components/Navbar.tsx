import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const LINKS = [
  { to: "/destinos",     label: "Destinos" },
  { to: "/actividades",  label: "Actividades" },
  { to: "/vivencial",    label: "Vivencial" },
  { to: "/gastronomia",  label: "Gastronomía" },
  { to: "/alojamiento",  label: "Alojamiento" },
  { to: "/artesania",    label: "Artesanía" },
  { to: "/festividades", label: "Festividades" },
  { to: "/como-llegar",  label: "Cómo llegar" },
  { to: "/contacto",     label: "Contacto" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <div className="nav-logo-mark">C</div>
          <span className="nav-logo-text">Capachica</span>
        </NavLink>

        <div className="nav-links" style={{ display: "flex", flexWrap: "wrap" }}>
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
