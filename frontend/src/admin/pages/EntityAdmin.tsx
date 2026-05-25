import React, { useState, useEffect, useCallback } from "react"
import { api } from "../../api/client"
import CrudTable, { Column } from "../components/CrudTable"
import CrudForm, { FieldDef } from "../components/CrudForm"

interface EntityAdminProps {
  title: string
  endpoint: string          // e.g. "/api/destinos"
  adminEndpoint?: string    // e.g. "/api/destinos/admin/all"
  columns: Column[]
  fields: FieldDef[]
}

export default function EntityAdmin({ title, endpoint, adminEndpoint, columns, fields }: EntityAdminProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any | null>(null)
  const [creating, setCreating] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    api.get<any[]>(adminEndpoint ?? endpoint)
      .then(setData)
      .finally(() => setLoading(false))
  }, [endpoint, adminEndpoint])

  useEffect(() => { load() }, [load])

  async function handleCreate(body: any) {
    await api.post(endpoint, body)
    load()
    setCreating(false)
  }

  async function handleUpdate(body: any) {
    await api.put(`${endpoint}/${editing.id}`, body)
    load()
    setEditing(null)
  }

  async function handleDelete(row: any) {
    if (!confirm(`¿Eliminar "${row.nombre}"?`)) return
    await api.delete(`${endpoint}/${row.id}`)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 style={{ fontFamily: "Playfair Display", fontSize: "1.8rem" }}>{title}</h2>
        <button className="btn-primary" onClick={() => setCreating(true)}>+ Nuevo</button>
      </div>

      <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
        <CrudTable columns={columns} data={data} loading={loading} onEdit={setEditing} onDelete={handleDelete} />
      </div>

      {(creating || editing) && (
        <CrudForm
          title={creating ? `Nuevo ${title}` : `Editar ${title}`}
          fields={fields}
          initial={editing ?? undefined}
          onSubmit={creating ? handleCreate : handleUpdate}
          onCancel={() => { setCreating(false); setEditing(null) }}
        />
      )}
    </div>
  )
}
