import React, { useState } from "react"
import PageHero from "../components/PageHero"
import { api } from "../api/client"
import { ContactoForm } from "../types"

export default function Contacto() {
  const [form, setForm] = useState<ContactoForm>({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errMsg, setErrMsg] = useState("")

  const update = (k: keyof ContactoForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      await api.post("/api/contacto", form)
      setStatus("success")
      setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" })
    } catch (err: any) {
      setStatus("error")
      setErrMsg(err.message)
    }
  }

  return (
    <div className="page">
      <PageHero title="Contacto" subtitle="¿Listo para planificar tu aventura? Escríbenos, respondemos en menos de 24 horas." emoji="✉️" tag="Contacto" />
      <section className="section">
        <div className="section-inner">
          <div className="grid-2" style={{ gap: 64 }}>
            {/* Form */}
            <div>
              {status === "success" ? (
                <div style={{ background: "rgba(13,148,136,0.1)", border: "1px solid var(--turquesa)", borderRadius: "var(--radius-lg)", padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "Playfair Display", marginBottom: 8 }}>¡Mensaje enviado!</h3>
                  <p style={{ color: "var(--fg2)" }}>Te responderemos a <strong>{form.email || "tu email"}</strong> en menos de 24 horas.</p>
                  <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setStatus("idle")}>Enviar otro mensaje</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="grid-2" style={{ gap: 20 }}>
                    <div className="form-group">
                      <label className="form-label">Nombre *</label>
                      <input className="form-input" value={form.nombre} onChange={update("nombre")} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" value={form.email} onChange={update("email")} required />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: 20 }}>
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <input className="form-input" value={form.telefono} onChange={update("telefono")} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Asunto</label>
                      <input className="form-input" value={form.asunto} onChange={update("asunto")} placeholder="Turismo vivencial, alojamiento..." />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mensaje *</label>
                    <textarea className="form-textarea" value={form.mensaje} onChange={update("mensaje")} required rows={5} placeholder="Cuéntanos sobre tu visita..." />
                  </div>
                  {status === "error" && <p className="form-error" style={{ marginBottom: 16 }}>❌ {errMsg}</p>}
                  <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ width: "100%" }}>
                    {status === "loading" ? "Enviando..." : "Enviar mensaje →"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.5rem", marginBottom: 24 }}>Información de contacto</h3>
              {[
                { icon: "📍", t: "Ubicación", d: "Capachica, Puno, Perú" },
                { icon: "✉️", t: "Email", d: "info@capachica.pe" },
                { icon: "📞", t: "Teléfono", d: "+51 999 000 000" },
                { icon: "⏰", t: "Horario", d: "Lunes - Domingo: 8:00 - 20:00" },
              ].map(c => (
                <div key={c.t} className="info-card" style={{ marginBottom: 16 }}>
                  <div className="info-card-icon">{c.icon}</div>
                  <div><div className="info-card-title">{c.t}</div><div className="info-card-desc">{c.d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
