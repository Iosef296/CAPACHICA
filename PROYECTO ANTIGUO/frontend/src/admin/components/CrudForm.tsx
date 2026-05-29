import React, { useState, useEffect } from "react"

export interface FieldDef {
  key: string
  label: string
  type?: "text" | "number" | "textarea" | "select" | "checkbox" | "url"
  options?: string[]   // for select
  required?: boolean
}

interface CrudFormProps {
  fields: FieldDef[]
  initial?: Record<string, any>
  onSubmit: (data: Record<string, any>) => Promise<void>
  onCancel: () => void
  title?: string
}

export default function CrudForm({ fields, initial, onSubmit, onCancel, title }: CrudFormProps) {
  const [form, setForm] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const defaults: Record<string, any> = {}
    fields.forEach(f => { defaults[f.key] = initial?.[f.key] ?? (f.type === "checkbox" ? false : f.type === "number" ? 0 : "") })
    setForm(defaults)
  }, [initial])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try { await onSubmit(form) }
    catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 40, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
        <div className="flex justify-between items-center mb-8">
          <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.3rem" }}>{title ?? (initial?.id ? "Editar" : "Nuevo")}</h3>
          <button className="btn-ghost" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}{f.required && " *"}</label>
              {f.type === "textarea" ? (
                <textarea className="form-textarea" value={form[f.key] ?? ""} onChange={e => set(f.key, e.target.value)} required={f.required} />
              ) : f.type === "select" ? (
                <select className="form-select" value={form[f.key] ?? ""} onChange={e => set(f.key, e.target.value)} required={f.required}>
                  <option value="">Seleccionar...</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "checkbox" ? (
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!form[f.key]} onChange={e => set(f.key, e.target.checked)} />
                  <span style={{ color: "var(--fg2)", fontSize: "0.9rem" }}>Activo</span>
                </label>
              ) : (
                <input
                  className="form-input" type={f.type ?? "text"}
                  value={form[f.key] ?? ""} onChange={e => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                  required={f.required}
                />
              )}
            </div>
          ))}
          {error && <p className="form-error" style={{ marginBottom: 16 }}>❌ {error}</p>}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
