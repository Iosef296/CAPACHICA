import { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:3000";
const IA_URL  = import.meta.env.PUBLIC_IA_URL || "http://localhost:5000";

const sharedInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(11,60,96,0.5)",
  border: "1px solid rgba(120,200,255,0.2)",
  borderRadius: 10,
  color: "#f4f7fb",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  outline: "none",
};

const sharedUploadBtnStyle: React.CSSProperties = {
  marginTop: 6,
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid rgba(120,200,255,0.2)",
  background: "transparent",
  color: "#53d3ff",
  fontSize: 12,
  cursor: "pointer",
};

interface Familia {
  id: string;
  nombre: string;
  comunidad: string;
  descripcion: string;
  especialidad: string;
  foto_url: string | null;
  habitaciones: number;
  idiomas: string[];
  servicios: string[];
  calificacion: string;
  activa: boolean;
}

interface Reserva {
  id: string;
  codigo: string;
  nombre_huesped: string;
  email: string;
  telefono: string;
  fecha_llegada: string;
  fecha_salida: string;
  num_personas: number;
  precio_total: string;
  estado: string;
  familia_nombre: string;
  actividad_preferida: string;
  metodo_pago: string;
  notas: string;
  created_at: string;
}

interface Artesania {
  id: string;
  nombre: string;
  tipo: string;
  tecnica: string;
  materiales: string;
  precio_soles: number;
  precio_usd: number;
  imagen_url: string;
  artesana_nombre: string;
  artesana_comunidad: string;
  artesana_experiencia: number;
  emoji: string;
  stock: number;
  activo: boolean;
}

interface KnowEntry { id: number; categoria: string; pregunta: string; respuesta: string; }
interface IAKnowledge { conocimiento: KnowEntry[]; contexto_base: string; nombre_ia: string; }

type Tab = "reservas" | "familias" | "artesanias" | "festividades" | "maestros" | "guias" | "ia";

export default function AdminPanel() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("reservas");
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [artesanias, setArtesanias] = useState<Artesania[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"ok" | "err">("ok");

  // Modales
  // IA Knowledge
  const [iaData, setIaData]         = useState<IAKnowledge>({ conocimiento: [], contexto_base: '', nombre_ia: 'Inti' });
  const [iaEntry, setIaEntry]       = useState({ categoria: 'general', pregunta: '', respuesta: '' });
  const [editCtx, setEditCtx]       = useState('');
  const [showCtx, setShowCtx]       = useState(false);
  const [iaLoading, setIaLoading]   = useState(false);
  const [iaSearch, setIaSearch]     = useState('');

  const [modalFamilia, setModalFamilia] = useState(false);
  const [modalArtesania, setModalArtesania] = useState(false);
  const [familiaEdit, setFamiliaEdit] = useState<Partial<Familia>>({});
  const [artEdit, setArtEdit] = useState<Partial<Artesania>>({});

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const showMsg = (text: string, type: "ok" | "err" = "ok") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 4000);
  };

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const uploadImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("imagen", file);
    const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: form });
    if (!res.ok) throw new Error("Error al subir imagen");
    const data = await res.json();
    return data.url;
  };

  const uploadBtnStyle: React.CSSProperties = {
    marginTop: 6,
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid rgba(120,200,255,0.2)",
    background: "transparent",
    color: "#53d3ff",
    fontSize: 12,
    cursor: "pointer",
  };

  const login = async () => {
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setToken(data.accessToken);
      localStorage.setItem("admin_token", data.accessToken);
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      if (tab === "reservas") {
        const res = await fetch(`${API_URL}/api/reservas`, {
          headers: authHeaders,
        });
        const data = await res.json();
        if (Array.isArray(data)) setReservas(data);
        else if (Array.isArray(data?.reservas)) setReservas(data.reservas);
        else {
          setReservas([]);
          if (!res.ok) showMsg(data?.error || "No autorizado para ver reservas", "err");
        }
      } else if (tab === "familias") {
        const res = await fetch(`${API_URL}/api/hospedajes`);
        const data = await res.json();
        setFamilias(Array.isArray(data) ? data : []);
      } else {
        const res = await fetch(`${API_URL}/api/artesania`);
        const data = await res.json();
        setArtesanias(Array.isArray(data) ? data : []);
      }
    } catch {
      showMsg("Error al cargar datos", "err");
    }
    setLoading(false);
  }, [token, tab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Polling cada 30s para reservas nuevas
  useEffect(() => {
    if (!token || tab !== "reservas") return;
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [token, tab, loadData]);

  const updateEstado = async (id: string, estado: string) => {
    await fetch(`${API_URL}/api/reservas/${id}/estado`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ estado }),
    });
    showMsg("✅ Estado actualizado");
    loadData();
  };

  const saveFamilia = async () => {
    const isEdit = !!familiaEdit.id;
    const url = isEdit
      ? `${API_URL}/api/hospedajes/${familiaEdit.id}`
      : `${API_URL}/api/hospedajes`;
    const body = {
      ...familiaEdit,
      idiomas:
        typeof familiaEdit.idiomas === "string"
          ? (familiaEdit.idiomas as string).split(",").map((s) => s.trim())
          : familiaEdit.idiomas,
      servicios:
        typeof familiaEdit.servicios === "string"
          ? (familiaEdit.servicios as string).split(",").map((s) => s.trim())
          : familiaEdit.servicios,
      activa: familiaEdit.activa !== false,
    };
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: authHeaders,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      showMsg("✅ Familia guardada");
      setModalFamilia(false);
      loadData();
    } else showMsg("❌ Error al guardar", "err");
  };

  const deleteFamilia = async (id: string) => {
    if (!confirm("¿Desactivar esta familia?")) return;
    await fetch(`${API_URL}/api/hospedajes/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    showMsg("✅ Familia desactivada");
    loadData();
  };

  const saveArtesania = async () => {
    const isEdit = !!artEdit.id;
    const url = isEdit
      ? `${API_URL}/api/artesania/${artEdit.id}`
      : `${API_URL}/api/artesania`;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: authHeaders,
      body: JSON.stringify(artEdit),
    });
    if (res.ok) {
      showMsg("✅ Artesanía guardada");
      setModalArtesania(false);
      loadData();
    } else showMsg("❌ Error al guardar", "err");
  };

  const deleteArtesania = async (id: string) => {
    if (!confirm("¿Eliminar esta artesanía?")) return;
    await fetch(`${API_URL}/api/artesania/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    showMsg("✅ Artesanía eliminada");
    loadData();
  };

  // ── IA functions ──
  const loadIA = useCallback(async () => {
    setIaLoading(true);
    try {
      const res = await fetch(`${IA_URL}/api/admin/conocimiento`);
      const data: IAKnowledge = await res.json();
      setIaData(data);
      setEditCtx(data.contexto_base || '');
    } catch { showMsg('Error al cargar conocimiento IA', 'err'); }
    setIaLoading(false);
  }, []);

  useEffect(() => { if (tab === 'ia') loadIA(); }, [tab, loadIA]);

  const addEntry = async () => {
    if (!iaEntry.pregunta.trim() || !iaEntry.respuesta.trim()) {
      showMsg('Pregunta y Respuesta son obligatorias', 'err'); return;
    }
    try {
      await fetch(`${IA_URL}/api/admin/conocimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria: iaEntry.categoria || 'general', pregunta: iaEntry.pregunta.trim(), respuesta: iaEntry.respuesta.trim() }),
      });
      setIaEntry({ categoria: 'general', pregunta: '', respuesta: '' });
      showMsg('✅ Conocimiento agregado a Inti');
      loadIA();
    } catch { showMsg('Error al agregar', 'err'); }
  };

  const deleteEntry = async (id: number) => {
    if (!confirm('¿Eliminar este conocimiento?')) return;
    await fetch(`${IA_URL}/api/admin/conocimiento/${id}`, { method: 'DELETE' });
    showMsg('✅ Eliminado');
    loadIA();
  };

  const saveContexto = async () => {
    try {
      await fetch(`${IA_URL}/api/admin/contexto`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contexto_base: editCtx }),
      });
      setShowCtx(false);
      showMsg('✅ Contexto base actualizado');
      loadIA();
    } catch { showMsg('Error al guardar contexto', 'err'); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(11,60,96,0.5)",
    border: "1px solid rgba(120,200,255,0.2)",
    borderRadius: 10,
    color: "#f4f7fb",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    outline: "none",
  };

  const estadoColor = (e: string) =>
    ({
      confirmada: { bg: "rgba(74,222,128,0.15)", color: "#4ade80" },
      pendiente: { bg: "rgba(251,146,60,0.15)", color: "#fb923c" },
      cancelada: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
      completada: { bg: "rgba(83,211,255,0.15)", color: "#53d3ff" },
    })[e] || { bg: "rgba(127,149,170,0.15)", color: "#7f95aa" };

  // ─── LOGIN ───
  if (!token)
    return (
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(18,47,76,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(120,200,255,0.2)",
            borderRadius: 24,
            padding: "48px",
            width: "100%",
            maxWidth: 420,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              color: "#f4f7fb",
              marginBottom: 8,
            }}
          >
            Panel Admin
          </h2>
          <p style={{ color: "#7f95aa", fontSize: 14, marginBottom: 32 }}>
            Capachica Turismo
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              style={inputStyle}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              type="password"
              style={inputStyle}
              onKeyDown={(e) => e.key === "Enter" && login()}
            />
            {loginError && (
              <p style={{ color: "#f87171", fontSize: 13 }}>⚠️ {loginError}</p>
            )}
            <button
              onClick={login}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
            >
              Ingresar
            </button>
          </div>
          <p style={{ color: "#7f95aa", fontSize: 11, marginTop: 20 }}>
            admin@capachica.pe · admin123
          </p>
        </div>
      </section>
    );

  // ─── PANEL ───
  return (
    <>
      <style>{`
        .admin-section { padding: 80px 0 60px; min-height: 100vh; }
        .admin-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px; padding: 20px 24px;
        }
        [data-theme="light"] .admin-card {
          background: rgba(255,255,255,0.88); border: 1px solid rgba(11,122,181,0.18);
        }
        .admin-tab { padding: 10px 20px; border-radius: 999px; border: 1px solid rgba(120,200,255,0.2); background: transparent; color: #7f95aa; font-family: var(--font-body); font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .admin-tab.active { background: linear-gradient(135deg,#1ba6d9,#0b6ea8); color: #fff; border-color: transparent; box-shadow: 0 0 20px rgba(83,211,255,0.25); }
        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .sec-muted { color: #7f95aa; }
        [data-theme="light"] .sec-muted { color: #5a7a93; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-box { background: #0b2235; border: 1px solid rgba(120,200,255,0.2); border-radius: 24px; padding: 32px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
        [data-theme="light"] .modal-box { background: #fff; border: 1px solid rgba(11,122,181,0.2); }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 40px; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
        .art-grid-admin { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 900px) { .art-grid-admin { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .art-grid-admin { grid-template-columns: 1fr; } }
      `}</style>

      <section className="admin-section">
        <div className="container">
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h1
                className="sec-title"
                style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 700 }}
              >
                ⚙️ Panel de Administración
              </h1>
              <p className="sec-muted" style={{ fontSize: 13, marginTop: 4 }}>
                Capachica Turismo · Actualización automática cada 30s
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={loadData}
                className="btn-outline"
                style={{ fontSize: 12, padding: "8px 16px" }}
              >
                🔄 Actualizar
              </button>
              <button
                onClick={logout}
                className="btn-outline"
                style={{ fontSize: 12, padding: "8px 16px" }}
              >
                Salir
              </button>
            </div>
          </div>

          {/* Mensaje */}
          {msg && (
            <div
              style={{
                background:
                  msgType === "ok"
                    ? "rgba(83,211,255,0.1)"
                    : "rgba(248,113,113,0.1)",
                border: `1px solid ${msgType === "ok" ? "rgba(83,211,255,0.3)" : "rgba(248,113,113,0.3)"}`,
                borderRadius: 12,
                padding: "12px 20px",
                marginBottom: 24,
                color: msgType === "ok" ? "#53d3ff" : "#f87171",
                fontSize: 14,
              }}
            >
              {msg}
            </div>
          )}

          {/* Stats */}
          <div className="stats-grid">
            {[
              {
                label: "Reservas totales",
                value: reservas.length,
                icon: "📋",
                color: "#53d3ff",
              },
              {
                label: "Pendientes",
                value: reservas.filter((r) => r.estado === "pendiente").length,
                icon: "⏳",
                color: "#fb923c",
              },
              {
                label: "Confirmadas",
                value: reservas.filter((r) => r.estado === "confirmada").length,
                icon: "✅",
                color: "#4ade80",
              },
              {
                label: "Familias activas",
                value: familias.filter((f) => f.activa).length,
                icon: "🏠",
                color: "#f5b32f",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="admin-card"
                style={{ textAlign: "center" }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>
                  {s.value}
                </div>
                <div
                  className="sec-muted"
                  style={{ fontSize: 11, marginTop: 4 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            <button
              className={`admin-tab ${tab === "reservas" ? "active" : ""}`}
              onClick={() => setTab("reservas")}
            >
              📋 Reservas
            </button>
            <button
              className={`admin-tab ${tab === "familias" ? "active" : ""}`}
              onClick={() => setTab("familias")}
            >
              🏠 Familias
            </button>
            <button
              className={`admin-tab ${tab === "artesanias" ? "active" : ""}`}
              onClick={() => setTab("artesanias")}
            >
              🎨 Artesanías
            </button>
            <button
              className={`admin-tab ${tab === "festividades" ? "active" : ""}`}
              onClick={() => setTab("festividades")}
            >
              🎉 Festividades
            </button>
            <button
              className={`admin-tab ${tab === "maestros" ? "active" : ""}`}
              onClick={() => setTab("maestros")}
            >
              🧑‍🎨 Maestros
            </button>
            <button
              className={`admin-tab ${tab === "guias" ? "active" : ""}`}
              onClick={() => setTab("guias")}
            >
              📖 Guías
            </button>
            <button
              className={`admin-tab ${tab === "ia" ? "active" : ""}`}
              onClick={() => setTab("ia")}
            >
              🤖 Conocimiento IA
            </button>
          </div>

          {loading && <p className="sec-muted">Cargando...</p>}

          {/* ─── RESERVAS ─── */}
          {!loading && tab === "reservas" && (
            <div>
              <h2
                className="sec-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  marginBottom: 24,
                }}
              >
                Reservas{" "}
                {reservas.filter((r) => r.estado === "pendiente").length >
                  0 && (
                  <span
                    style={{
                      background: "#fb923c",
                      color: "#fff",
                      fontSize: 12,
                      padding: "2px 8px",
                      borderRadius: 999,
                      marginLeft: 8,
                    }}
                  >
                    {reservas.filter((r) => r.estado === "pendiente").length}{" "}
                    nuevas
                  </span>
                )}
              </h2>
              {reservas.length === 0 && (
                <p className="sec-muted">No hay reservas aún.</p>
              )}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {reservas.map((r) => (
                  <div key={r.id} className="admin-card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 16,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {/* Código + estado */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              color: "#53d3ff",
                              fontWeight: 700,
                              fontSize: 15,
                            }}
                          >
                            {r.codigo}
                          </span>
                          <span
                            style={{
                              padding: "3px 12px",
                              borderRadius: 999,
                              fontSize: 11,
                              fontWeight: 600,
                              background: estadoColor(r.estado).bg,
                              color: estadoColor(r.estado).color,
                            }}
                          >
                            {r.estado.toUpperCase()}
                          </span>
                          <span className="sec-muted" style={{ fontSize: 11 }}>
                            {new Date(r.created_at).toLocaleDateString(
                              "es-PE",
                              {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>

                        {/* Info huésped */}
                        <div
                          style={{
                            color: "#f4f7fb",
                            fontWeight: 600,
                            fontSize: 16,
                          }}
                        >
                          {r.nombre_huesped}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                            marginTop: 6,
                          }}
                        >
                          <a
                            href={`mailto:${r.email}`}
                            style={{
                              color: "#53d3ff",
                              fontSize: 13,
                              textDecoration: "none",
                            }}
                          >
                            📧 {r.email}
                          </a>
                          {r.telefono && (
                            <a
                              href={`https://wa.me/${r.telefono.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#4ade80",
                                fontSize: 13,
                                textDecoration: "none",
                              }}
                            >
                              💬 WhatsApp {r.telefono}
                            </a>
                          )}
                        </div>

                        {/* Detalles reserva */}
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            flexWrap: "wrap",
                            marginTop: 10,
                          }}
                        >
                          <span className="sec-muted" style={{ fontSize: 12 }}>
                            📅 {new Date(r.fecha_llegada).toLocaleDateString()}{" "}
                            → {new Date(r.fecha_salida).toLocaleDateString()}
                          </span>
                          <span className="sec-muted" style={{ fontSize: 12 }}>
                            👥 {r.num_personas} personas
                          </span>
                          <span className="sec-muted" style={{ fontSize: 12 }}>
                            🏠 {r.familia_nombre || "Sin asignar"}
                          </span>
                          {r.actividad_preferida && (
                            <span
                              className="sec-muted"
                              style={{ fontSize: 12 }}
                            >
                              ⚡ {r.actividad_preferida}
                            </span>
                          )}
                          {r.metodo_pago && (
                            <span
                              className="sec-muted"
                              style={{ fontSize: 12 }}
                            >
                              💳 {r.metodo_pago}
                            </span>
                          )}
                        </div>

                        {r.notas && (
                          <div
                            style={{
                              marginTop: 8,
                              padding: "8px 12px",
                              background: "rgba(245,179,47,0.08)",
                              borderRadius: 8,
                              fontSize: 12,
                              color: "#f5b32f",
                            }}
                          >
                            📝 {r.notas}
                          </div>
                        )}

                        <div
                          style={{
                            color: "#53d3ff",
                            fontWeight: 700,
                            fontSize: 18,
                            marginTop: 10,
                          }}
                        >
                          S/. {parseFloat(r.precio_total).toLocaleString()}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          minWidth: 160,
                        }}
                      >
                        <select
                          value={r.estado}
                          onChange={(e) => updateEstado(r.id, e.target.value)}
                          style={{
                            ...inputStyle,
                            width: "100%",
                            padding: "8px 12px",
                            fontSize: 13,
                          }}
                        >
                          <option value="pendiente">⏳ Pendiente</option>
                          <option value="confirmada">✅ Confirmada</option>
                          <option value="cancelada">❌ Cancelada</option>
                          <option value="completada">🏁 Completada</option>
                        </select>
                        <a
                          href={`mailto:${r.email}?subject=Reserva ${r.codigo} - Capachica Turismo&body=Estimado/a ${r.nombre_huesped},%0A%0ASu reserva ${r.codigo} ha sido confirmada.`}
                          className="btn-outline"
                          style={{
                            fontSize: 12,
                            padding: "8px 12px",
                            textAlign: "center",
                          }}
                        >
                          📧 Responder email
                        </a>
                        {r.telefono && (
                          <a
                            href={`https://wa.me/${r.telefono.replace(/\D/g, "")}?text=Hola ${r.nombre_huesped}, su reserva ${r.codigo} en Capachica Turismo está confirmada. ¡Le esperamos!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{
                              fontSize: 12,
                              padding: "8px 12px",
                              textAlign: "center",
                              textDecoration: "none",
                            }}
                          >
                            💬 WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── FAMILIAS ─── */}
          {!loading && tab === "familias" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <h2
                  className="sec-title"
                  style={{ fontFamily: "var(--font-display)", fontSize: 22 }}
                >
                  Familias Anfitrionas
                </h2>
                <button
                  onClick={() => {
                    setFamiliaEdit({});
                    setModalFamilia(true);
                  }}
                  className="btn-primary"
                  style={{ fontSize: 13 }}
                >
                  + Nueva familia
                </button>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {familias.map((f) => (
                  <div
                    key={f.id}
                    className="admin-card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 16 }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 12,
                          background: f.foto_url
                            ? `url(${f.foto_url}) center/cover`
                            : "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                          flexShrink: 0,
                        }}
                      >
                        {!f.foto_url && "🏠"}
                      </div>
                      <div>
                        <div
                          style={{
                            color: "#f4f7fb",
                            fontWeight: 600,
                            fontSize: 16,
                          }}
                        >
                          {f.nombre}
                        </div>
                        <div className="sec-muted" style={{ fontSize: 13 }}>
                          {f.comunidad} · {f.especialidad}
                        </div>
                        <div
                          style={{
                            color: "#53d3ff",
                            fontSize: 12,
                            marginTop: 2,
                          }}
                        >
                          ⭐ {parseFloat(f.calificacion).toFixed(1)} ·{" "}
                          {f.habitaciones} hab · {f.idiomas?.join(", ")}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => {
                          setFamiliaEdit({
                            ...f,
                            idiomas: f.idiomas?.join(", ") as any,
                            servicios: f.servicios?.join(", ") as any,
                          });
                          setModalFamilia(true);
                        }}
                        className="btn-outline"
                        style={{ padding: "8px 14px", fontSize: 12 }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => deleteFamilia(f.id)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(248,113,113,0.3)",
                          background: "transparent",
                          color: "#f87171",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        🗑️ Desactivar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── ARTESANÍAS ─── */}
          {!loading && tab === "artesanias" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <h2
                  className="sec-title"
                  style={{ fontFamily: "var(--font-display)", fontSize: 22 }}
                >
                  Artesanías
                </h2>
                <button
                  onClick={() => {
                    setArtEdit({});
                    setModalArtesania(true);
                  }}
                  className="btn-primary"
                  style={{ fontSize: 13 }}
                >
                  + Nueva artesanía
                </button>
              </div>
              <div className="art-grid-admin">
                {artesanias.map((a) => (
                  <div
                    key={a.id}
                    className="admin-card"
                    style={{ padding: 0, overflow: "hidden" }}
                  >
                    <div
                      style={{
                        height: 140,
                        background: a.imagen_url
                          ? `url(${a.imagen_url}) center/cover`
                          : "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                        position: "relative",
                      }}
                    >
                      {!a.imagen_url && (a.emoji || "🎨")}
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 6,
                        }}
                      >
                        <button
                          onClick={() => {
                            setArtEdit(a);
                            setModalArtesania(true);
                          }}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.6)",
                            border: "none",
                            color: "#fff",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteArtesania(a.id)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.6)",
                            border: "none",
                            color: "#f87171",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          color: "#f4f7fb",
                          fontWeight: 600,
                          fontSize: 14,
                          marginBottom: 2,
                        }}
                      >
                        {a.nombre}
                      </div>
                      <div
                        className="sec-muted"
                        style={{ fontSize: 11, marginBottom: 6 }}
                      >
                        {a.artesana_nombre} · {a.artesana_comunidad}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "#53d3ff", fontWeight: 700 }}>
                          S/. {a.precio_soles}
                        </span>
                        <span className="sec-muted" style={{ fontSize: 11 }}>
                          Stock: {a.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "festividades" && (
            <SimpleResourceAdmin
              endpoint="festividades"
              titulo="Festividades"
              itemLabel={(it) => it.nombre}
              itemSubLabel={(it) => it.fecha}
              imageField="imagen"
              fields={[
                { key: "nombre", label: "Nombre *", placeholder: "Virgen de la Candelaria" },
                { key: "fecha", label: "Fecha", placeholder: "1-14 Febrero" },
                { key: "mes", label: "Mes (número 1-12)", placeholder: "2" },
                { key: "tipo", label: "Tipo", placeholder: "Religiosa" },
                { key: "ubicacion", label: "Ubicación", placeholder: "Capachica, Puno" },
                { key: "descripcion", label: "Descripción", placeholder: "..." },
                { key: "imagen", label: "URL de imagen", placeholder: "https://..." },
                { key: "actividades", label: "Actividades (separadas por coma)", placeholder: "Procesión, Danzas" },
                { key: "galeria", label: "Galería (URLs separadas por coma)", placeholder: "https://..., https://..." },
              ]}
              arrayFields={["actividades", "galeria"]}
              numberFields={["mes"]}
              showMsg={showMsg}
              uploadImage={uploadImage}
              token={token}
            />
          )}
          {tab === "maestros" && (
            <SimpleResourceAdmin
              endpoint="maestros"
              titulo="Maestros artesanos"
              itemLabel={(it) => it.nombre}
              itemSubLabel={(it) => it.oficio}
              imageField="imagen"
              fields={[
                { key: "nombre", label: "Nombre *", placeholder: "Mamá Victoria" },
                { key: "oficio", label: "Oficio", placeholder: "Alpaca" },
                { key: "imagen", label: "URL de foto", placeholder: "https://..." },
              ]}
              showMsg={showMsg}
              uploadImage={uploadImage}
              token={token}
            />
          )}
          {tab === "guias" && (
            <SimpleResourceAdmin
              endpoint="guias"
              titulo="Guías"
              itemLabel={(it) => it.titulo}
              itemSubLabel={(it) => it.tipo}
              imageField="imagen"
              fields={[
                { key: "titulo", label: "Título *", placeholder: "Historia de Capachica" },
                { key: "extracto", label: "Extracto", placeholder: "Mil años de tradición lacustre." },
                { key: "imagen", label: "URL de imagen", placeholder: "https://..." },
                { key: "tipo", label: "Tipo (viaje / cultural)", placeholder: "cultural" },
              ]}
              showMsg={showMsg}
              uploadImage={uploadImage}
              token={token}
            />
          )}
          {/* ─── IA KNOWLEDGE ─── */}
          {tab === "ia" && (
            <div>
              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
                <div>
                  <h2 className="sec-title" style={{ fontFamily:"var(--font-display)", fontSize:22 }}>
                    🤖 Conocimiento de Inti
                  </h2>
                  <p className="sec-muted" style={{ fontSize:12, marginTop:4 }}>
                    {iaData.conocimiento.length} entradas · IA Backend: {IA_URL}
                  </p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => setShowCtx(c => !c)} className="btn-outline" style={{ fontSize:12, padding:"8px 14px" }}>
                    {showCtx ? "Ocultar contexto" : "✏️ Editar contexto base"}
                  </button>
                  <button onClick={loadIA} className="btn-outline" style={{ fontSize:12, padding:"8px 14px" }}>🔄</button>
                </div>
              </div>

              {/* Contexto base editor */}
              {showCtx && (
                <div className="admin-card" style={{ marginBottom:24 }}>
                  <p className="sec-muted" style={{ fontSize:12, marginBottom:8 }}>
                    Contexto base del sistema — instrucciones globales que Inti siempre sigue
                  </p>
                  <textarea
                    value={editCtx}
                    onChange={e => setEditCtx(e.target.value)}
                    rows={8}
                    style={{ ...inputStyle, resize:"vertical", fontFamily:"monospace", fontSize:12 }}
                  />
                  <div style={{ display:"flex", gap:10, marginTop:12 }}>
                    <button onClick={saveContexto} className="btn-primary" style={{ fontSize:13 }}>💾 Guardar contexto</button>
                    <button onClick={() => { setEditCtx(iaData.contexto_base); setShowCtx(false); }} className="btn-outline" style={{ fontSize:13 }}>Cancelar</button>
                  </div>
                </div>
              )}

              {/* Add new entry */}
              <div className="admin-card" style={{ marginBottom:28 }}>
                <h3 className="sec-title" style={{ fontSize:16, marginBottom:16 }}>+ Agregar nuevo conocimiento</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr 2fr", gap:12, alignItems:"end" }}>
                  <div>
                    <label style={{ fontSize:11, color:"#7f95aa", display:"block", marginBottom:5 }}>Categoría</label>
                    <select
                      value={iaEntry.categoria}
                      onChange={e => setIaEntry(p => ({ ...p, categoria: e.target.value }))}
                      style={{ ...inputStyle, fontSize:13 }}
                    >
                      <option value="general">general</option>
                      <option value="precios">precios</option>
                      <option value="actividades">actividades</option>
                      <option value="alojamiento">alojamiento</option>
                      <option value="transporte">transporte</option>
                      <option value="gastronomia">gastronomía</option>
                      <option value="cultura">cultura</option>
                      <option value="clima">clima</option>
                      <option value="reservas">reservas</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:"#7f95aa", display:"block", marginBottom:5 }}>Pregunta *</label>
                    <input
                      value={iaEntry.pregunta}
                      onChange={e => setIaEntry(p => ({ ...p, pregunta: e.target.value }))}
                      placeholder="¿Cuánto cuesta el kayak?"
                      style={{ ...inputStyle, fontSize:13 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:"#7f95aa", display:"block", marginBottom:5 }}>Respuesta *</label>
                    <input
                      value={iaEntry.respuesta}
                      onChange={e => setIaEntry(p => ({ ...p, respuesta: e.target.value }))}
                      placeholder="El kayak cuesta S/. 30 por persona..."
                      onKeyDown={e => { if (e.key === 'Enter') addEntry(); }}
                      style={{ ...inputStyle, fontSize:13 }}
                    />
                  </div>
                </div>
                <button onClick={addEntry} className="btn-primary" style={{ marginTop:14, fontSize:13 }}>
                  + Agregar a Inti
                </button>
              </div>

              {/* Search */}
              <div style={{ marginBottom:16 }}>
                <input
                  value={iaSearch}
                  onChange={e => setIaSearch(e.target.value)}
                  placeholder="🔍 Buscar en conocimiento..."
                  style={{ ...inputStyle, maxWidth:380, fontSize:13 }}
                />
              </div>

              {/* Knowledge list */}
              {iaLoading && <p className="sec-muted">Cargando...</p>}
              {!iaLoading && (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {iaData.conocimiento
                    .filter(k => !iaSearch || k.pregunta.toLowerCase().includes(iaSearch.toLowerCase()) || k.respuesta.toLowerCase().includes(iaSearch.toLowerCase()) || k.categoria.toLowerCase().includes(iaSearch.toLowerCase()))
                    .map(k => (
                      <div key={k.id} className="admin-card" style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                        <span style={{
                          padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700, letterSpacing:"0.06em",
                          background:"rgba(45,212,191,0.1)", color:"rgba(45,212,191,0.85)",
                          border:"1px solid rgba(45,212,191,0.2)", flexShrink:0, marginTop:2,
                        }}>{k.categoria}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ color:"#f4f7fb", fontWeight:600, fontSize:14, marginBottom:4 }}>
                            {k.pregunta}
                          </div>
                          <div className="sec-muted" style={{ fontSize:13, lineHeight:1.55 }}>
                            {k.respuesta}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEntry(k.id)}
                          style={{ padding:"6px 10px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"transparent", color:"#f87171", fontSize:12, cursor:"pointer", flexShrink:0 }}
                        >
                          🗑️
                        </button>
                      </div>
                    ))
                  }
                  {iaData.conocimiento.length === 0 && (
                    <p className="sec-muted">No hay entradas de conocimiento aún. Agrega la primera arriba.</p>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ─── MODAL FAMILIA ─── */}
      {modalFamilia && (
        <div className="modal-overlay" onClick={() => setModalFamilia(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3
              className="sec-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                marginBottom: 24,
              }}
            >
              {familiaEdit.id ? "✏️ Editar Familia" : "+ Nueva Familia"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  key: "nombre",
                  label: "Nombre *",
                  placeholder: "Familia Quispe",
                },
                {
                  key: "comunidad",
                  label: "Comunidad *",
                  placeholder: "Llachón",
                },
                {
                  key: "descripcion",
                  label: "Descripción",
                  placeholder: "Descripción...",
                },
                {
                  key: "foto_url",
                  label: "URL de foto",
                  placeholder: "https://...",
                },
                {
                  key: "idiomas",
                  label: "Idiomas (separados por coma)",
                  placeholder: "español, aimara",
                },
                {
                  key: "servicios",
                  label: "Servicios (separados por coma)",
                  placeholder: "desayuno, almuerzo, cena",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    value={(familiaEdit as any)[field.key] || ""}
                    onChange={(e) =>
                      setFamiliaEdit((p) => ({
                        ...p,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    style={inputStyle}
                  />
                  {field.key === "foto_url" && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="familia-foto-input"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadImage(file);
                            setFamiliaEdit((p) => ({ ...p, foto_url: url }));
                          } catch (err: any) {
                            showMsg(err.message, "err");
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("familia-foto-input")?.click()
                        }
                        style={uploadBtnStyle}
                      >
                        📤 Subir foto
                      </button>
                    </>
                  )}
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: 12,
                    color: "#7f95aa",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Especialidad
                </label>
                <select
                  value={familiaEdit.especialidad || ""}
                  onChange={(e) =>
                    setFamiliaEdit((p) => ({
                      ...p,
                      especialidad: e.target.value,
                    }))
                  }
                  style={inputStyle}
                >
                  <option value="">Seleccionar</option>
                  <option value="pesca">🎣 Pesca</option>
                  <option value="tejido">🪡 Tejido</option>
                  <option value="agricultura">🌿 Agricultura</option>
                  <option value="cocina">🍲 Cocina</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Habitaciones
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={familiaEdit.habitaciones || ""}
                    onChange={(e) =>
                      setFamiliaEdit((p) => ({
                        ...p,
                        habitaciones: Number(e.target.value),
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Calificación (1-5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    step={0.1}
                    value={familiaEdit.calificacion || ""}
                    onChange={(e) =>
                      setFamiliaEdit((p) => ({
                        ...p,
                        calificacion: e.target.value,
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={saveFamilia}
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                💾 Guardar y publicar
              </button>
              <button
                onClick={() => setModalFamilia(false)}
                className="btn-outline"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL ARTESANÍA ─── */}
      {modalArtesania && (
        <div className="modal-overlay" onClick={() => setModalArtesania(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3
              className="sec-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                marginBottom: 24,
              }}
            >
              {artEdit.id ? "✏️ Editar Artesanía" : "+ Nueva Artesanía"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  key: "nombre",
                  label: "Nombre *",
                  placeholder: "Chullo de Alpaca",
                },
                {
                  key: "imagen_url",
                  label: "URL de imagen",
                  placeholder: "https://images.unsplash.com/...",
                },
                {
                  key: "tecnica",
                  label: "Técnica",
                  placeholder: "Tejido en telar de cintura",
                },
                {
                  key: "materiales",
                  label: "Materiales",
                  placeholder: "Lana de alpaca, tintes naturales",
                },
                {
                  key: "artesana_nombre",
                  label: "Nombre artesana",
                  placeholder: "Rosa Mamani",
                },
                {
                  key: "artesana_comunidad",
                  label: "Comunidad",
                  placeholder: "Llachón",
                },
                {
                  key: "emoji",
                  label: "Emoji representativo",
                  placeholder: "🧢",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    value={(artEdit as any)[field.key] || ""}
                    onChange={(e) =>
                      setArtEdit((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                    style={inputStyle}
                  />
                  {field.key === "imagen_url" && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="artesania-imagen-input"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadImage(file);
                            setArtEdit((p) => ({ ...p, imagen_url: url }));
                          } catch (err: any) {
                            showMsg(err.message, "err");
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("artesania-imagen-input")?.click()
                        }
                        style={uploadBtnStyle}
                      >
                        📤 Subir foto
                      </button>
                    </>
                  )}
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: 12,
                    color: "#7f95aa",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Tipo
                </label>
                <select
                  value={artEdit.tipo || ""}
                  onChange={(e) =>
                    setArtEdit((p) => ({ ...p, tipo: e.target.value }))
                  }
                  style={inputStyle}
                >
                  <option value="">Seleccionar</option>
                  <option value="textil">🪡 Textil</option>
                  <option value="bordado">🧵 Bordado</option>
                  <option value="ceramica">🏺 Cerámica</option>
                  <option value="joyeria">💍 Joyería</option>
                  <option value="instrumento">🎶 Instrumento</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Precio S/.
                  </label>
                  <input
                    type="number"
                    value={artEdit.precio_soles || ""}
                    onChange={(e) =>
                      setArtEdit((p) => ({
                        ...p,
                        precio_soles: Number(e.target.value),
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Precio USD
                  </label>
                  <input
                    type="number"
                    value={artEdit.precio_usd || ""}
                    onChange={(e) =>
                      setArtEdit((p) => ({
                        ...p,
                        precio_usd: Number(e.target.value),
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    value={artEdit.stock || ""}
                    onChange={(e) =>
                      setArtEdit((p) => ({
                        ...p,
                        stock: Number(e.target.value),
                      }))
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={saveArtesania}
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                💾 Guardar y publicar
              </button>
              <button
                onClick={() => setModalArtesania(false)}
                className="btn-outline"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── CRUD genérico para recursos simples (festividades, maestros, guías) ──
// Mismo patrón que los tabs de Familias/Artesanía de arriba, pero sin
// campos especiales — la lista de fields describe el formulario.
type FieldConfig = { key: string; label: string; placeholder?: string };

function SimpleResourceAdmin({
  endpoint,
  titulo,
  fields,
  itemLabel,
  itemSubLabel,
  imageField,
  arrayFields = [],
  numberFields = [],
  showMsg,
  uploadImage,
  token,
}: {
  endpoint: string;
  titulo: string;
  fields: FieldConfig[];
  itemLabel: (item: any) => string;
  itemSubLabel?: (item: any) => string;
  token: string;
  imageField?: string;
  arrayFields?: string[];
  numberFields?: string[];
  showMsg: (msg: string, type?: "ok" | "err") => void;
  uploadImage: (file: File) => Promise<string>;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/${endpoint}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showMsg(`Error al cargar ${titulo}`, "err");
    }
    setLoading(false);
  }, [endpoint, titulo, showMsg]);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEdit({});
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    const copy = { ...item };
    arrayFields.forEach((f) => {
      if (Array.isArray(copy[f])) copy[f] = copy[f].join(", ");
    });
    setEdit(copy);
    setModalOpen(true);
  };

  const save = async () => {
    const isEdit = !!edit.id;
    const body: any = { ...edit };
    arrayFields.forEach((f) => {
      if (typeof body[f] === "string") {
        body[f] = body[f].split(",").map((s: string) => s.trim()).filter(Boolean);
      }
    });
    numberFields.forEach((f) => {
      if (body[f] !== undefined && body[f] !== "") body[f] = Number(body[f]);
    });
    const url = isEdit ? `${API_URL}/api/${endpoint}/${edit.id}` : `${API_URL}/api/${endpoint}`;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      showMsg(`✅ ${titulo} guardado`);
      setModalOpen(false);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(`❌ ${data.error || "Error al guardar"}`, "err");
    }
  };

  const remove = async (id: any) => {
    if (!confirm(`¿Eliminar este ítem de ${titulo}?`)) return;
    const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) { showMsg("✅ Eliminado"); load(); }
    else {
      const data = await res.json().catch(() => ({}));
      showMsg(`❌ ${data.error || "Error al eliminar"}`, "err");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 className="sec-title" style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
          {titulo}
        </h3>
        <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={openNew}>
          + Nuevo
        </button>
      </div>

      {loading ? (
        <div className="sec-muted">Cargando...</div>
      ) : items.length === 0 ? (
        <div className="sec-muted">No hay elementos todavía.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((it) => (
            <div
              key={it.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                borderRadius: 12,
                background: "rgba(18,47,76,0.5)",
                border: "1px solid rgba(120,200,255,0.12)",
              }}
            >
              {imageField && it[imageField] && (
                <img
                  src={it[imageField]}
                  alt=""
                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sec-title" style={{ fontSize: 14, fontWeight: 700 }}>
                  {itemLabel(it)}
                </div>
                {itemSubLabel && (
                  <div className="sec-muted" style={{ fontSize: 12 }}>
                    {itemSubLabel(it)}
                  </div>
                )}
              </div>
              <button
                onClick={() => openEdit(it)}
                style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid rgba(120,200,255,0.2)", background: "transparent", color: "#7f95aa", fontSize: 12, cursor: "pointer" }}
              >
                ✎ Editar
              </button>
              <button
                onClick={() => remove(it.id)}
                style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid rgba(248,113,113,0.22)", background: "transparent", color: "#f87171", fontSize: 12, cursor: "pointer" }}
              >
                ✕ Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="sec-title" style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24 }}>
              {edit.id ? "✏️ Editar" : "+ Nuevo"} — {titulo}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {fields.map((field) => (
                <div key={field.key}>
                  <label style={{ fontSize: 12, color: "#7f95aa", display: "block", marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    value={edit[field.key] || ""}
                    onChange={(e) => setEdit((p: any) => ({ ...p, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={sharedInputStyle}
                  />
                  {imageField === field.key && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id={`${endpoint}-img-input`}
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadImage(file);
                            setEdit((p: any) => ({ ...p, [field.key]: url }));
                          } catch (err: any) {
                            showMsg(err.message, "err");
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById(`${endpoint}-img-input`)?.click()}
                        style={sharedUploadBtnStyle}
                      >
                        📤 Subir foto
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={save}>
                💾 Guardar
              </button>
              <button className="btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
