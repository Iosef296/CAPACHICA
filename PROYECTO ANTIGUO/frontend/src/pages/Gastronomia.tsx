import React from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Gastronomia } from "../types"

export default function GastronomiaPage() {
  const { data, loading } = useApi<Gastronomia[]>("/api/gastronomia")

  return (
    <div className="page">
      <PageHero title="Gastronomía" subtitle="Sabores del Titicaca. Ingredientes andinos, recetas ancestrales y aromas únicos de la cocina aimara." emoji="🍽" tag="Gastronomía" />
      <section className="section">
        <div className="section-inner">
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-3">
                {data?.map(g => (
                  <Card key={g.id} nombre={g.nombre} descripcion={g.descripcion}
                    imagen_url={g.imagen_url} tag={g.tipo.replace("_", " ")}
                    extra={g.ingredientes && <p style={{ color: "var(--fg3)", fontSize: "0.8rem", marginBottom: 8 }}>🌿 {g.ingredientes}</p>}
                  />
                ))}
              </div>
          }
        </div>
      </section>
    </div>
  )
}
