import React from "react"

interface CardProps {
  nombre: string
  descripcion?: string
  imagen_url?: string
  tag?: string
  badge?: string
  precio?: number | string
  extra?: React.ReactNode
  href?: string
  onClick?: () => void
}

export default function Card({ nombre, descripcion, imagen_url, tag, badge, precio, extra, href, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
      <div className="card-img">
        {imagen_url
          ? <img src={imagen_url} alt={nombre} />
          : <span style={{ fontSize: "3rem" }}>🏔</span>
        }
        {tag && <span className="card-tag">{tag}</span>}
      </div>
      <div className="card-body">
        {badge && <div className="badge badge-turquesa" style={{ marginBottom: 8 }}>{badge}</div>}
        <h3 className="card-title">{nombre}</h3>
        {descripcion && <p className="card-desc">{descripcion}</p>}
        {precio && <p className="card-price">S/ {precio}</p>}
        {extra}
        {href && <a href={href} className="card-link">Ver más →</a>}
      </div>
    </div>
  )
}
