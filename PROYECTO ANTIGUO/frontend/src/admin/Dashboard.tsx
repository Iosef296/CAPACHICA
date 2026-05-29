import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import EntityAdmin from "./pages/EntityAdmin"

// ── Entity configs ──────────────────────────────────────────────────────
const ENTITIES = {
  destinos: {
    label: "Destinos", emoji: "🗺",
    endpoint: "/api/destinos",
    adminEndpoint: "/api/destinos/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "categoria", label: "Categoría" },
      { key: "comunidad", label: "Comunidad" },
      { key: "destacado", label: "Destacado", render: (v: boolean) => v ? "✅" : "—" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "categoria", label: "Categoría", type: "select" as const, options: ["playa", "mirador", "isla", "comunidad"] },
      { key: "comunidad", label: "Comunidad" },
      { key: "destacado", label: "Destacado", type: "checkbox" as const },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  alojamientos: {
    label: "Alojamientos", emoji: "🏠",
    endpoint: "/api/alojamientos",
    adminEndpoint: "/api/alojamientos/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo" },
      { key: "precio_noche", label: "Precio/noche", render: (v: number) => v ? `S/ ${v}` : "—" },
      { key: "comunidad", label: "Comunidad" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "tipo", label: "Tipo", type: "select" as const, options: ["lodge", "casa_rural", "hostal", "cabaña"] },
      { key: "precio_noche", label: "Precio por noche (S/)", type: "number" as const },
      { key: "capacidad", label: "Capacidad (personas)", type: "number" as const },
      { key: "comunidad", label: "Comunidad" },
      { key: "contacto", label: "Contacto" },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  gastronomia: {
    label: "Gastronomía", emoji: "🍽",
    endpoint: "/api/gastronomia",
    adminEndpoint: "/api/gastronomia/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "ingredientes", label: "Ingredientes" },
      { key: "tipo", label: "Tipo", type: "select" as const, options: ["plato_principal", "sopa", "bebida", "postre"] },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  actividades: {
    label: "Actividades", emoji: "🧗",
    endpoint: "/api/actividades",
    adminEndpoint: "/api/actividades/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo" },
      { key: "dificultad", label: "Dificultad" },
      { key: "precio", label: "Precio", render: (v: number) => v ? `S/ ${v}` : "—" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "tipo", label: "Tipo", type: "select" as const, options: ["aventura", "cultural", "naturaleza", "deportes"] },
      { key: "duracion", label: "Duración" },
      { key: "dificultad", label: "Dificultad", type: "select" as const, options: ["facil", "moderado", "dificil"] },
      { key: "precio", label: "Precio (S/)", type: "number" as const },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  artesania: {
    label: "Artesanía", emoji: "🧶",
    endpoint: "/api/artesania",
    adminEndpoint: "/api/artesania/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "tipo", label: "Tipo" },
      { key: "artesano", label: "Artesano" },
      { key: "precio", label: "Precio", render: (v: number) => v ? `S/ ${v}` : "—" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "tipo", label: "Tipo", type: "select" as const, options: ["textil", "ceramica", "tejido", "madera"] },
      { key: "artesano", label: "Artesano" },
      { key: "comunidad", label: "Comunidad" },
      { key: "precio", label: "Precio (S/)", type: "number" as const },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  festividades: {
    label: "Festividades", emoji: "🎉",
    endpoint: "/api/festividades",
    adminEndpoint: "/api/festividades/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "fecha_texto", label: "Fecha" },
      { key: "comunidad", label: "Comunidad" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "fecha_texto", label: "Fecha (texto, ej: Febrero)" },
      { key: "mes", label: "Mes (1-12)", type: "number" as const },
      { key: "comunidad", label: "Comunidad" },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  vivencial: {
    label: "Vivencial", emoji: "🤝",
    endpoint: "/api/vivencial",
    adminEndpoint: "/api/vivencial/admin/all",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "familia", label: "Familia" },
      { key: "comunidad", label: "Comunidad" },
      { key: "precio_por_noche", label: "Precio", render: (v: number) => v ? `S/ ${v}` : "—" },
      { key: "activo", label: "Activo", render: (v: boolean) => v ? "✅" : "❌" },
    ],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripción", type: "textarea" as const },
      { key: "imagen_url", label: "URL Imagen", type: "url" as const },
      { key: "familia", label: "Familia anfitriona" },
      { key: "comunidad", label: "Comunidad" },
      { key: "actividades_incluidas", label: "Actividades incluidas" },
      { key: "precio_por_noche", label: "Precio por noche (S/)", type: "number" as const },
      { key: "activo", label: "Activo", type: "checkbox" as const },
      { key: "orden", label: "Orden", type: "number" as const },
    ],
  },
  mensajes: {
    label: "Mensajes", emoji: "✉️",
    endpoint: "/api/contacto/mensajes",
    adminEndpoint: "/api/contacto/mensajes",
    columns: [
      { key: "nombre", label: "Nombre" },
      { key: "email", label: "Email" },
      { key: "asunto", label: "Asunto" },
      { key: "mensaje", label: "Mensaje", render: (v: string) => v?.slice(0, 60) + (v?.length > 60 ? "..." : "") },
      { key: "leido", label: "Leído", render: (v: boolean) => v ? "✅" : "🔵" },
    ],
    fields: [],
  },
} as const

type EntityKey = keyof typeof ENTITIES

const NAV: { key: EntityKey; label: string; emoji: string }[] = [
  { key: "destinos", label: "Destinos", emoji: "🗺" },
  { key: "alojamientos", label: "Alojamientos", emoji: "🏠" },
  { key: "gastronomia", label: "Gastronomía", emoji: "🍽" },
  { key: "actividades", label: "Actividades", emoji: "🧗" },
  { key: "artesania", label: "Artesanía", emoji: "🧶" },
  { key: "festividades", label: "Festividades", emoji: "🎉" },
  { key: "vivencial", label: "Vivencial", emoji: "🤝" },
  { key: "mensajes", label: "Mensajes", emoji: "✉️" },
]

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const [active, setActive] = useState<EntityKey>("destinos")

  if (loading) return <div className="loading"><div className="spinner" /></div>
  if (!user) return <Navigate to="/admin/login" replace />

  const entity = ENTITIES[active]

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ marginBottom: 32 }}>
          <div className="nav-logo" style={{ marginBottom: 8 }}>
            <div className="nav-logo-mark">C</div>
            <span className="nav-logo-text">Admin</span>
          </div>
          <p style={{ color: "var(--fg3)", fontSize: "0.8rem" }}>{user.email}</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(n => (
            <button key={n.key} className={`admin-nav-item${active === n.key ? " active" : ""}`} onClick={() => setActive(n.key)}>
              <span>{n.emoji}</span> {n.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 32, borderTop: "1px solid var(--border)" }}>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-item" style={{ display: "flex", textDecoration: "none", marginBottom: 8 }}>🌐 Ver sitio</a>
          <button className="admin-nav-item" onClick={logout} style={{ color: "#f87171" }}>🚪 Cerrar sesión</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <EntityAdmin
          key={active}
          title={entity.label}
          endpoint={entity.endpoint}
          adminEndpoint={entity.adminEndpoint}
          columns={entity.columns as any}
          fields={entity.fields as any}
        />
      </main>
    </div>
  )
}
