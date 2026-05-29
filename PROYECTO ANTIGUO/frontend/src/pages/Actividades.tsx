import React from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Actividad } from "../types"

const DIFF_COLOR: Record<string, string> = {
  facil: "badge-turquesa",
  moderado: "badge-dorado",
  dificil: "badge-dorado",
}

export default function ActividadesPage() {
  const { data, loading } = useApi<Actividad[]>("/api/actividades")

  return (
    <div className="page">
      <PageHero title="Actividades" subtitle="Aventura, cultura y naturaleza en el lago más alto del mundo." emoji="🧗" tag="Actividades" />
      <section className="section">
        <div className="section-inner">
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-3">
                {data?.map(a => (
                  <Card key={a.id} nombre={a.nombre} descripcion={a.descripcion}
                    imagen_url={a.imagen_url} tag={a.tipo} precio={a.precio}
                    extra={
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span className="badge badge-turquesa">⏱ {a.duracion}</span>
                        <span className={`badge ${DIFF_COLOR[a.dificultad] ?? "badge-turquesa"}`}>{a.dificultad}</span>
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
