import React from "react"

export interface Column {
  key: string
  label: string
  render?: (val: any, row: any) => React.ReactNode
}

interface CrudTableProps {
  columns: Column[]
  data: any[]
  onEdit: (row: any) => void
  onDelete: (row: any) => void
  loading?: boolean
}

export default function CrudTable({ columns, data, onEdit, onDelete, loading }: CrudTableProps) {
  if (loading) return <div className="loading"><div className="spinner" /></div>
  if (!data.length) return <div className="empty">Sin registros.</div>

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.key}>{c.label}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.map(c => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : String(row[c.key] ?? "")}
                </td>
              ))}
              <td>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-outline" style={{ padding: "6px 14px", fontSize: "0.8rem" }} onClick={() => onEdit(row)}>✏️ Editar</button>
                  <button style={{ padding: "6px 14px", fontSize: "0.8rem", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-sm)", cursor: "pointer" }} onClick={() => onDelete(row)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
