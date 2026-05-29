import React from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Artesania } from "../types"

export default function ArtesaniaPage() {
  const { data, loading } = useApi<Artesania[]>("/api/artesania")

  return (
    <div className="page">
      <PageHero title="Artesanía" subtitle="Textiles, cerámica y tejidos hechos a mano por artesanas que guardan técnicas ancestrales." emoji="🧶" tag="Artesanía" />
      <section className="section">
        <div className="section-inner">
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-3">
                {data?.map(a => (
                  <Card key={a.id} nombre={a.nombre} descripcion={a.descripcion}
                    imagen_url={a.imagen_url} tag={a.tipo} precio={a.precio}
                    extra={
                      <div style={{ marginBottom: 8 }}>
                        {a.artesano && <span style={{ color: "var(--fg2)", fontSize: "0.85rem" }}>✋ {a.artesano}</span>}
                        {a.comunidad && <span style={{ color: "var(--fg3)", fontSize: "0.8rem", marginLeft: 8 }}>📍 {a.comunidad}</span>}
                      </div>
                    }
                  />
                ))}
              </div>
          }
        </div>
      </section>
    </div>
  )
}
