import React, { useState } from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Alojamiento } from "../types"

const TIPOS = ["Todos", "lodge", "casa_rural", "hostal", "cabaña"]

export default function AlojamientoPage() {
  const { data, loading } = useApi<Alojamiento[]>("/api/alojamientos")
  const [tipo, setTipo] = useState("Todos")

  const filtered = data?.filter(a => tipo === "Todos" || a.tipo === tipo) ?? []

  return (
    <div className="page">
      <PageHero title="Alojamiento" subtitle="Hospedajes auténticos con vistas al lago Titicaca y experiencias vivenciales." emoji="🏠" tag="Alojamiento" />
      <section className="section">
        <div className="section-inner">
          <div className="flex gap-4 flex-wrap mb-8">
            {TIPOS.map(t => (
              <button key={t} onClick={() => setTipo(t)}
                className={tipo === t ? "btn-primary" : "btn-outline"}
                style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
                {t.replace("_", " ")}
              </button>
            ))}
          </div>
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-3">
                {filtered.map(a => (
                  <Card key={a.id} nombre={a.nombre} descripcion={a.descripcion}
                    imagen_url={a.imagen_url} tag={a.tipo} precio={`${a.precio_noche} / noche`}
                    extra={
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span className="badge badge-turquesa">👥 {a.capacidad} personas</span>
                        <span className="badge badge-dorado">📍 {a.comunidad}</span>
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
