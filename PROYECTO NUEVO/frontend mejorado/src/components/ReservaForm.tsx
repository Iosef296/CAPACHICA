import { useState } from "react";
import { familias, PRECIO_POR_PERSONA_NOCHE } from "../data/vivencial";

const IA_URL = import.meta.env.PUBLIC_IA_URL || "http://localhost:5000";

interface FormData {
  familia_id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha_llegada: string;
  fecha_salida: string;
  num_personas: number;
  actividad: string;
  metodo_pago: string;
  notas: string;
}

export default function ReservaForm() {
  const [form, setForm] = useState<FormData>({
    familia_id: "",
    nombre: "",
    email: "",
    telefono: "",
    fecha_llegada: "",
    fecha_salida: "",
    num_personas: 2,
    actividad: "",
    metodo_pago: "",
    notas: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const noches = (() => {
    if (!form.fecha_llegada || !form.fecha_salida) return 0;
    const d =
      (new Date(form.fecha_salida).getTime() -
        new Date(form.fecha_llegada).getTime()) /
      86400000;
    return Math.max(0, d);
  })();

  const total = noches * form.num_personas * PRECIO_POR_PERSONA_NOCHE;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "num_personas" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.nombre ||
      !form.email ||
      !form.fecha_llegada ||
      !form.fecha_salida
    ) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const familiaElegida = familias.find(
        (f) => String(f.id) === form.familia_id,
      );
      const notasExtra = [
        familiaElegida ? `Familia preferida: ${familiaElegida.nombre}` : "",
        form.actividad ? `Actividad preferida: ${form.actividad}` : "",
        form.metodo_pago ? `Método de pago: ${form.metodo_pago}` : "",
        form.notas,
        `Presupuesto estimado: S/. ${total.toLocaleString()}`,
      ]
        .filter(Boolean)
        .join(" | ");
      const payload = {
        nombre: form.nombre,
        contacto: form.telefono || form.email,
        fecha_llegada: form.fecha_llegada,
        dias_estancia: Math.max(1, noches),
        personas: form.num_personas,
        hospedaje: familiaElegida?.nombre ?? "Sin preferencia",
        notas: notasExtra,
      };
      const res = await fetch(`${IA_URL}/api/reservar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(data.mensaje || "Nos pondremos en contacto pronto.");
    } catch (err: any) {
      setError(err.message || "Error al crear la reserva. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--bg)",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="reservar"
      style={{ background: "var(--bg)", padding: "80px 0" }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              — RESERVAS
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: "var(--text)",
                marginTop: 12,
              }}
            >
              Reserva tu
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Experiencia
              </em>
            </h2>
            <p style={{ color: "var(--text2)", marginTop: 12 }}>
              Respondemos en menos de 24 horas
            </p>
          </div>

          {success ? (
            <div
              style={{
                background: "var(--accent-light)",
                border: "1px solid var(--accent)",
                borderRadius: "var(--radius)",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: "var(--accent)",
                  marginBottom: 8,
                }}
              >
                ¡Reserva confirmada!
              </h3>
              <p style={{ color: "var(--text2)", fontSize: 15 }}>{success}</p>
              <p style={{ color: "var(--text3)", fontSize: 13, marginTop: 8 }}>
                Recibirás un email de confirmación pronto.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "36px",
                boxShadow: "var(--shadow)",
              }}
            >
              {/* Grid 2 col */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                {/* Familia */}
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Familia anfitriona
                  </label>
                  <select
                    name="familia_id"
                    value={form.familia_id}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Sorpréndeme 🎲</option>
                    {familias.map((f) => (
                      <option key={f.id} value={f.id} disabled={!f.disponible}>
                        {f.nombre} — {f.comunidad}{" "}
                        {!f.disponible ? "(No disponible)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nombre */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Nombre completo *
                  </label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    style={inputStyle}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    style={inputStyle}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    WhatsApp / Teléfono
                  </label>
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+51 999 000 000"
                    style={inputStyle}
                  />
                </div>

                {/* Personas */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Número de personas *
                  </label>
                  <input
                    name="num_personas"
                    type="number"
                    min={1}
                    max={8}
                    value={form.num_personas}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                {/* Fechas */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Fecha de llegada *
                  </label>
                  <input
                    name="fecha_llegada"
                    type="date"
                    value={form.fecha_llegada}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Fecha de salida *
                  </label>
                  <input
                    name="fecha_salida"
                    type="date"
                    value={form.fecha_salida}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                {/* Actividad */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Actividad preferida
                  </label>
                  <select
                    name="actividad"
                    value={form.actividad}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Cualquiera</option>
                    <option value="pesca">🎣 Pesca artesanal</option>
                    <option value="tejido">🪡 Tejido en telar</option>
                    <option value="agricultura">🌿 Agricultura orgánica</option>
                    <option value="cocina">🍲 Cocina andina</option>
                  </select>
                </div>

                {/* Pago */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Método de pago
                  </label>
                  <select
                    name="metodo_pago"
                    value={form.metodo_pago}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Seleccionar</option>
                    <option value="yape">📱 Yape</option>
                    <option value="paypal">💳 PayPal</option>
                    <option value="tarjeta">🏦 Tarjeta</option>
                  </select>
                </div>

                {/* Notas */}
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Notas o requerimientos especiales
                  </label>
                  <textarea
                    name="notas"
                    value={form.notas}
                    onChange={handleChange}
                    placeholder="Dietas especiales, niños, celebraciones..."
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Calculadora */}
              {noches > 0 && (
                <div
                  style={{
                    marginTop: 24,
                    padding: "20px 24px",
                    background: "var(--accent-light)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, color: "var(--accent)" }}>
                        {noches} noche{noches > 1 ? "s" : ""} ×{" "}
                        {form.num_personas} persona
                        {form.num_personas > 1 ? "s" : ""} × S/.{" "}
                        {PRECIO_POR_PERSONA_NOCHE}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 28,
                          fontWeight: 700,
                          color: "var(--accent)",
                        }}
                      >
                        S/. {total.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>
                        ≈ ${(total / 3.75).toFixed(0)} USD
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>
                      ✓ Incluye desayuno, almuerzo y cena
                      <br />
                      ✓ Actividades con la familia
                      <br />✓ Cancelación gratuita 48h antes
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 16px",
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#dc2626",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Submit */}
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: "16px 40px", fontSize: 16 }}
                >
                  {loading
                    ? "Enviando..."
                    : `Reservar ahora ${total > 0 ? `— S/. ${total.toLocaleString()}` : ""}`}
                </button>
              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  fontSize: 12,
                  color: "var(--text3)",
                }}
              >
                Al reservar aceptas nuestra política de cancelación. Pago al
                confirmar.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
