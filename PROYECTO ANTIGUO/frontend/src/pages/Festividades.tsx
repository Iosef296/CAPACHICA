import React from "react"
import PageHero from "../components/PageHero"
import Card from "../components/Card"
import { useApi } from "../hooks/useApi"
import { Festividad } from "../types"

const MESES = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

export default function FestividadesPage() {
  const { data, loading } = useApi<Festividad[]>("/api/festividades")

  return (
    <div className="page">
      <PageHero title="Festividades" subtitle="Tradiciones vivas, danzas ancestrales y celebraciones que unen a las comunidades de Capachica." emoji="🎉" tag="Festividades" />
      <section className="section">
        <div className="section-inner">
          {loading ? <div className="loading"><div className="spinner" /></div>
            : <div className="grid-3">
                {data?.map(f => (
                  <Card key={f.id} nombre={f.nombre} descripcion={f.descripcion}
                    imagen_url={f.imagen_url}
                    tag={f.fecha_texto || (f.mes ? MESES[f.mes] : undefined)}
                    extra={f.comunidad && <span style={{ color: "var(--fg3)", fontSize: "0.8rem" }}>📍 {f.comunidad}</span>}
                  />
                ))}
              </div>
          }
        </div>
      </section>
    </div>
  )
}
