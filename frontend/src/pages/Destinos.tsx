import React, { useState } from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Destino } from "../types"

const CATS = ["Todos", "playa", "mirador", "isla", "comunidad"]

export default function Destinos() {
  const { data: destinos, loading } = useApi<Destino[]>("/api/destinos")
  const [cat, setCat] = useState("Todos")

  const filtered = destinos?.filter(d => cat === "Todos" || d.categoria === cat) ?? []

  return (
    <div className="page">
      <PageHero title="Destinos" subtitle="Cada rincón de Capachica guarda una historia, una vista y una experiencia única." emoji="🗺" tag="Destinos" />
      <section className="section">
        <div className="section-inner">
          <div className="flex gap-4 flex-wrap mb-8">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={cat === c ? "btn-primary" : "btn-outline"}
                style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          {loading ? <div className="loading"><div className="spinner" /></div>
            : filtered.length === 0 ? <div className="empty">No hay destinos en esta categoría.</div>
            : <div className="grid-3">
                {filtered.map(d => (
                  <Card key={d.id} nombre={d.nombre} descripcion={d.descripcion} imagen_url={d.imagen_url} tag={d.categoria} extra={<span style={{ color: "var(--fg3)", fontSize: "0.8rem" }}>{d.comunidad}</span>} />
                ))}
              </div>
          }
        </div>
      </section>
    </div>
  )
}
