import React from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Vivencial } from "../types"

export default function VivencialPage() {
  const { data, loading } = useApi<Vivencial[]>("/api/vivencial")

  return (
    <div className="page">
      <PageHero title="Turismo Vivencial" subtitle="Vive como una familia capachiquena. Comparte el desayuno, la pesca y el tejido." emoji="🤝" tag="Vivencial" />
      <section className="section">
        <div className="section-inner">
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-2">
                {data?.map(v => (
                  <Card key={v.id} nombre={v.nombre} descripcion={v.descripcion}
                    imagen_url={v.imagen_url} precio={v.precio_por_noche ? `${v.precio_por_noche} / noche` : undefined}
                    extra={
                      <div style={{ marginBottom: 12 }}>
                        {v.familia && <p style={{ color: "var(--fg2)", fontSize: "0.85rem" }}>👨‍👩‍👧 {v.familia}</p>}
                        {v.comunidad && <p style={{ color: "var(--fg3)", fontSize: "0.8rem" }}>📍 {v.comunidad}</p>}
                        {v.actividades_incluidas && (
                          <p style={{ color: "var(--turquesa-light)", fontSize: "0.8rem", marginTop: 8 }}>
                            ✓ {v.actividades_incluidas}
                          </p>
                        )}
                      </div>
                    }
                  />
                ))}
              </div>
          }
        </div>
      </section>
      <section className="cta-banner">
        <h2 className="cta-banner-title">¿Listo para vivir la experiencia?</h2>
        <p className="cta-banner-sub">Escríbenos y te conectamos con la familia perfecta para ti.</p>
        <a href="/contacto" className="btn-primary">Contactar ahora →</a>
      </section>
    </div>
  )
}
