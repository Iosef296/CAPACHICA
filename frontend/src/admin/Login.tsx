import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const [email, setEmail] = useState("admin@capachica.pe")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      await login(email, password)
      navigate("/admin")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 400, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--turquesa-deep), var(--turquesa))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "1.5rem", fontFamily: "Playfair Display", color: "#fff" }}>C</div>
          <h2 style={{ fontFamily: "Playfair Display", marginBottom: 4 }}>Panel Admin</h2>
          <p style={{ color: "var(--fg3)", fontSize: "0.9rem" }}>Capachica Turismo</p>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="form-error" style={{ marginBottom: 16 }}>❌ {error}</p>}
          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Accediendo..." : "Acceder →"}
          </button>
        </form>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a href="/" style={{ color: "var(--fg3)", fontSize: "0.85rem" }}>← Volver al sitio</a>
        </div>
      </div>
    </div>
  )
}
