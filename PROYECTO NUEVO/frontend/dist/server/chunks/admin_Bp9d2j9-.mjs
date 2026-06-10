import { c as createComponent } from './astro-component_D4_SZq4w.mjs';
import { p as renderComponent, h as renderTemplate } from './server_9i1cpG6S.mjs';
import { $ as $$Layout } from './Layout_bSPq0Ktu.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useCallback } from 'react';

const API_URL = "http://localhost:4000";
function AdminPanel() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("reservas");
  const [familias, setFamilias] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [artesanias, setArtesanias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("ok");
  const [modalFamilia, setModalFamilia] = useState(false);
  const [modalArtesania, setModalArtesania] = useState(false);
  const [familiaEdit, setFamiliaEdit] = useState({});
  const [artEdit, setArtEdit] = useState({});
  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);
  const showMsg = (text, type = "ok") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 4e3);
  };
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
  const login = async () => {
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setToken(data.token);
      localStorage.setItem("admin_token", data.token);
    } catch (err) {
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
          headers: authHeaders
        });
        setReservas(await res.json());
      } else if (tab === "familias") {
        const res = await fetch(`${API_URL}/api/familias`);
        setFamilias(await res.json());
      } else {
        const res = await fetch(`${API_URL}/api/artesanias`);
        setArtesanias(await res.json());
      }
    } catch {
      showMsg("Error al cargar datos", "err");
    }
    setLoading(false);
  }, [token, tab]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  useEffect(() => {
    if (!token || tab !== "reservas") return;
    const interval = setInterval(loadData, 3e4);
    return () => clearInterval(interval);
  }, [token, tab, loadData]);
  const updateEstado = async (id, estado) => {
    await fetch(`${API_URL}/api/reservas/${id}/estado`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ estado })
    });
    showMsg("✅ Estado actualizado");
    loadData();
  };
  const saveFamilia = async () => {
    const isEdit = !!familiaEdit.id;
    const url = isEdit ? `${API_URL}/api/familias/${familiaEdit.id}` : `${API_URL}/api/familias`;
    const body = {
      ...familiaEdit,
      idiomas: typeof familiaEdit.idiomas === "string" ? familiaEdit.idiomas.split(",").map((s) => s.trim()) : familiaEdit.idiomas,
      servicios: typeof familiaEdit.servicios === "string" ? familiaEdit.servicios.split(",").map((s) => s.trim()) : familiaEdit.servicios,
      activa: familiaEdit.activa !== false
    };
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: authHeaders,
      body: JSON.stringify(body)
    });
    if (res.ok) {
      showMsg("✅ Familia guardada");
      setModalFamilia(false);
      loadData();
    } else showMsg("❌ Error al guardar", "err");
  };
  const deleteFamilia = async (id) => {
    if (!confirm("¿Desactivar esta familia?")) return;
    await fetch(`${API_URL}/api/familias/${id}`, {
      method: "DELETE",
      headers: authHeaders
    });
    showMsg("✅ Familia desactivada");
    loadData();
  };
  const saveArtesania = async () => {
    const isEdit = !!artEdit.id;
    const url = isEdit ? `${API_URL}/api/artesanias/${artEdit.id}` : `${API_URL}/api/artesanias`;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: authHeaders,
      body: JSON.stringify(artEdit)
    });
    if (res.ok) {
      showMsg("✅ Artesanía guardada");
      setModalArtesania(false);
      loadData();
    } else showMsg("❌ Error al guardar", "err");
  };
  const deleteArtesania = async (id) => {
    if (!confirm("¿Eliminar esta artesanía?")) return;
    await fetch(`${API_URL}/api/artesanias/${id}`, {
      method: "DELETE",
      headers: authHeaders
    });
    showMsg("✅ Artesanía eliminada");
    loadData();
  };
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(11,60,96,0.5)",
    border: "1px solid rgba(120,200,255,0.2)",
    borderRadius: 10,
    color: "#f4f7fb",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    outline: "none"
  };
  const estadoColor = (e) => ({
    confirmada: { bg: "rgba(74,222,128,0.15)", color: "#4ade80" },
    pendiente: { bg: "rgba(251,146,60,0.15)", color: "#fb923c" },
    cancelada: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
    completada: { bg: "rgba(83,211,255,0.15)", color: "#53d3ff" }
  })[e] || { bg: "rgba(127,149,170,0.15)", color: "#7f95aa" };
  if (!token)
    return /* @__PURE__ */ jsx(
      "section",
      {
        style: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "rgba(18,47,76,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(120,200,255,0.2)",
              borderRadius: 24,
              padding: "48px",
              width: "100%",
              maxWidth: 420,
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: 48, marginBottom: 16 }, children: "🔐" }),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  style: {
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "#f4f7fb",
                    marginBottom: 8
                  },
                  children: "Panel Admin"
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { color: "#7f95aa", fontSize: 14, marginBottom: 32 }, children: "Capachica Turismo" }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "Email",
                    type: "email",
                    style: inputStyle
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    placeholder: "Contraseña",
                    type: "password",
                    style: inputStyle,
                    onKeyDown: (e) => e.key === "Enter" && login()
                  }
                ),
                loginError && /* @__PURE__ */ jsxs("p", { style: { color: "#f87171", fontSize: 13 }, children: [
                  "⚠️ ",
                  loginError
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: login,
                    className: "btn-primary",
                    style: { width: "100%", justifyContent: "center", marginTop: 8 },
                    children: "Ingresar"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { style: { color: "#7f95aa", fontSize: 11, marginTop: 20 }, children: "admin@capachica.pe · admin123" })
            ]
          }
        )
      }
    );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
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
      ` }),
    /* @__PURE__ */ jsx("section", { className: "admin-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16
          },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "h1",
                {
                  className: "sec-title",
                  style: { fontSize: "clamp(22px,4vw,36px)", fontWeight: 700 },
                  children: "⚙️ Panel de Administración"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "sec-muted", style: { fontSize: 13, marginTop: 4 }, children: "Capachica Turismo · Actualización automática cada 30s" })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: loadData,
                  className: "btn-outline",
                  style: { fontSize: 12, padding: "8px 16px" },
                  children: "🔄 Actualizar"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: logout,
                  className: "btn-outline",
                  style: { fontSize: 12, padding: "8px 16px" },
                  children: "Salir"
                }
              )
            ] })
          ]
        }
      ),
      msg && /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            background: msgType === "ok" ? "rgba(83,211,255,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${msgType === "ok" ? "rgba(83,211,255,0.3)" : "rgba(248,113,113,0.3)"}`,
            borderRadius: 12,
            padding: "12px 20px",
            marginBottom: 24,
            color: msgType === "ok" ? "#53d3ff" : "#f87171",
            fontSize: 14
          },
          children: msg
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "stats-grid", children: [
        {
          label: "Reservas totales",
          value: reservas.length,
          icon: "📋",
          color: "#53d3ff"
        },
        {
          label: "Pendientes",
          value: reservas.filter((r) => r.estado === "pendiente").length,
          icon: "⏳",
          color: "#fb923c"
        },
        {
          label: "Confirmadas",
          value: reservas.filter((r) => r.estado === "confirmada").length,
          icon: "✅",
          color: "#4ade80"
        },
        {
          label: "Familias activas",
          value: familias.filter((f) => f.activa).length,
          icon: "🏠",
          color: "#f5b32f"
        }
      ].map((s, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "admin-card",
          style: { textAlign: "center" },
          children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 28, marginBottom: 8 }, children: s.icon }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: 28, fontWeight: 700, color: s.color }, children: s.value }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "sec-muted",
                style: { fontSize: 11, marginTop: 4 },
                children: s.label
              }
            )
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            marginBottom: 32,
            flexWrap: "wrap"
          },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `admin-tab ${tab === "reservas" ? "active" : ""}`,
                onClick: () => setTab("reservas"),
                children: "📋 Reservas"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `admin-tab ${tab === "familias" ? "active" : ""}`,
                onClick: () => setTab("familias"),
                children: "🏠 Familias"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `admin-tab ${tab === "artesanias" ? "active" : ""}`,
                onClick: () => setTab("artesanias"),
                children: "🎨 Artesanías"
              }
            )
          ]
        }
      ),
      loading && /* @__PURE__ */ jsx("p", { className: "sec-muted", children: "Cargando..." }),
      !loading && tab === "reservas" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "sec-title",
            style: {
              fontFamily: "var(--font-display)",
              fontSize: 22,
              marginBottom: 24
            },
            children: [
              "Reservas",
              " ",
              reservas.filter((r) => r.estado === "pendiente").length > 0 && /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    background: "#fb923c",
                    color: "#fff",
                    fontSize: 12,
                    padding: "2px 8px",
                    borderRadius: 999,
                    marginLeft: 8
                  },
                  children: [
                    reservas.filter((r) => r.estado === "pendiente").length,
                    " ",
                    "nuevas"
                  ]
                }
              )
            ]
          }
        ),
        reservas.length === 0 && /* @__PURE__ */ jsx("p", { className: "sec-muted", children: "No hay reservas aún." }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { display: "flex", flexDirection: "column", gap: 16 },
            children: reservas.map((r) => /* @__PURE__ */ jsx("div", { className: "admin-card", children: /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16
                },
                children: [
                  /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 8,
                          flexWrap: "wrap"
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              style: {
                                color: "#53d3ff",
                                fontWeight: 700,
                                fontSize: 15
                              },
                              children: r.codigo
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              style: {
                                padding: "3px 12px",
                                borderRadius: 999,
                                fontSize: 11,
                                fontWeight: 600,
                                background: estadoColor(r.estado).bg,
                                color: estadoColor(r.estado).color
                              },
                              children: r.estado.toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { className: "sec-muted", style: { fontSize: 11 }, children: new Date(r.created_at).toLocaleDateString(
                            "es-PE",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          color: "#f4f7fb",
                          fontWeight: 600,
                          fontSize: 16
                        },
                        children: r.nombre_huesped
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 16,
                          flexWrap: "wrap",
                          marginTop: 6
                        },
                        children: [
                          /* @__PURE__ */ jsxs(
                            "a",
                            {
                              href: `mailto:${r.email}`,
                              style: {
                                color: "#53d3ff",
                                fontSize: 13,
                                textDecoration: "none"
                              },
                              children: [
                                "📧 ",
                                r.email
                              ]
                            }
                          ),
                          r.telefono && /* @__PURE__ */ jsxs(
                            "a",
                            {
                              href: `https://wa.me/${r.telefono.replace(/\D/g, "")}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              style: {
                                color: "#4ade80",
                                fontSize: 13,
                                textDecoration: "none"
                              },
                              children: [
                                "💬 WhatsApp ",
                                r.telefono
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 12,
                          flexWrap: "wrap",
                          marginTop: 10
                        },
                        children: [
                          /* @__PURE__ */ jsxs("span", { className: "sec-muted", style: { fontSize: 12 }, children: [
                            "📅 ",
                            new Date(r.fecha_llegada).toLocaleDateString(),
                            " ",
                            "→ ",
                            new Date(r.fecha_salida).toLocaleDateString()
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "sec-muted", style: { fontSize: 12 }, children: [
                            "👥 ",
                            r.num_personas,
                            " personas"
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "sec-muted", style: { fontSize: 12 }, children: [
                            "🏠 ",
                            r.familia_nombre || "Sin asignar"
                          ] }),
                          r.actividad_preferida && /* @__PURE__ */ jsxs(
                            "span",
                            {
                              className: "sec-muted",
                              style: { fontSize: 12 },
                              children: [
                                "⚡ ",
                                r.actividad_preferida
                              ]
                            }
                          ),
                          r.metodo_pago && /* @__PURE__ */ jsxs(
                            "span",
                            {
                              className: "sec-muted",
                              style: { fontSize: 12 },
                              children: [
                                "💳 ",
                                r.metodo_pago
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    r.notas && /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          marginTop: 8,
                          padding: "8px 12px",
                          background: "rgba(245,179,47,0.08)",
                          borderRadius: 8,
                          fontSize: 12,
                          color: "#f5b32f"
                        },
                        children: [
                          "📝 ",
                          r.notas
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          color: "#53d3ff",
                          fontWeight: 700,
                          fontSize: 18,
                          marginTop: 10
                        },
                        children: [
                          "S/. ",
                          parseFloat(r.precio_total).toLocaleString()
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        minWidth: 160
                      },
                      children: [
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            value: r.estado,
                            onChange: (e) => updateEstado(r.id, e.target.value),
                            style: {
                              ...inputStyle,
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: 13
                            },
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "pendiente", children: "⏳ Pendiente" }),
                              /* @__PURE__ */ jsx("option", { value: "confirmada", children: "✅ Confirmada" }),
                              /* @__PURE__ */ jsx("option", { value: "cancelada", children: "❌ Cancelada" }),
                              /* @__PURE__ */ jsx("option", { value: "completada", children: "🏁 Completada" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: `mailto:${r.email}?subject=Reserva ${r.codigo} - Capachica Turismo&body=Estimado/a ${r.nombre_huesped},%0A%0ASu reserva ${r.codigo} ha sido confirmada.`,
                            className: "btn-outline",
                            style: {
                              fontSize: 12,
                              padding: "8px 12px",
                              textAlign: "center"
                            },
                            children: "📧 Responder email"
                          }
                        ),
                        r.telefono && /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: `https://wa.me/${r.telefono.replace(/\D/g, "")}?text=Hola ${r.nombre_huesped}, su reserva ${r.codigo} en Capachica Turismo está confirmada. ¡Le esperamos!`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "btn-primary",
                            style: {
                              fontSize: 12,
                              padding: "8px 12px",
                              textAlign: "center",
                              textDecoration: "none"
                            },
                            children: "💬 WhatsApp"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ) }, r.id))
          }
        )
      ] }),
      !loading && tab === "familias" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24
            },
            children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "sec-title",
                  style: { fontFamily: "var(--font-display)", fontSize: 22 },
                  children: "Familias Anfitrionas"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setFamiliaEdit({});
                    setModalFamilia(true);
                  },
                  className: "btn-primary",
                  style: { fontSize: 13 },
                  children: "+ Nueva familia"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { display: "flex", flexDirection: "column", gap: 16 },
            children: familias.map((f) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "admin-card",
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16
                },
                children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: { display: "flex", alignItems: "center", gap: 16 },
                      children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            style: {
                              width: 56,
                              height: 56,
                              borderRadius: 12,
                              background: f.foto_url ? `url(${f.foto_url}) center/cover` : "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 24,
                              flexShrink: 0
                            },
                            children: !f.foto_url && "🏠"
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                color: "#f4f7fb",
                                fontWeight: 600,
                                fontSize: 16
                              },
                              children: f.nombre
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "sec-muted", style: { fontSize: 13 }, children: [
                            f.comunidad,
                            " · ",
                            f.especialidad
                          ] }),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                color: "#53d3ff",
                                fontSize: 12,
                                marginTop: 2
                              },
                              children: [
                                "⭐ ",
                                parseFloat(f.calificacion).toFixed(1),
                                " ·",
                                " ",
                                f.habitaciones,
                                " hab · ",
                                f.idiomas?.join(", ")
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          setFamiliaEdit({
                            ...f,
                            idiomas: f.idiomas?.join(", "),
                            servicios: f.servicios?.join(", ")
                          });
                          setModalFamilia(true);
                        },
                        className: "btn-outline",
                        style: { padding: "8px 14px", fontSize: 12 },
                        children: "✏️ Editar"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => deleteFamilia(f.id),
                        style: {
                          padding: "8px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(248,113,113,0.3)",
                          background: "transparent",
                          color: "#f87171",
                          fontSize: 12,
                          cursor: "pointer"
                        },
                        children: "🗑️ Desactivar"
                      }
                    )
                  ] })
                ]
              },
              f.id
            ))
          }
        )
      ] }),
      !loading && tab === "artesanias" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24
            },
            children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "sec-title",
                  style: { fontFamily: "var(--font-display)", fontSize: 22 },
                  children: "Artesanías"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setArtEdit({});
                    setModalArtesania(true);
                  },
                  className: "btn-primary",
                  style: { fontSize: 13 },
                  children: "+ Nueva artesanía"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "art-grid-admin", children: artesanias.map((a) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "admin-card",
            style: { padding: 0, overflow: "hidden" },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    height: 140,
                    background: a.imagen_url ? `url(${a.imagen_url}) center/cover` : "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    position: "relative"
                  },
                  children: [
                    !a.imagen_url && (a.emoji || "🎨"),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 6
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => {
                                setArtEdit(a);
                                setModalArtesania(true);
                              },
                              style: {
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "rgba(0,0,0,0.6)",
                                border: "none",
                                color: "#fff",
                                fontSize: 12,
                                cursor: "pointer"
                              },
                              children: "✏️"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => deleteArtesania(a.id),
                              style: {
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "rgba(0,0,0,0.6)",
                                border: "none",
                                color: "#f87171",
                                fontSize: 12,
                                cursor: "pointer"
                              },
                              children: "🗑️"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: { padding: "14px 16px" }, children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      color: "#f4f7fb",
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 2
                    },
                    children: a.nombre
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "sec-muted",
                    style: { fontSize: 11, marginBottom: 6 },
                    children: [
                      a.artesana_nombre,
                      " · ",
                      a.artesana_comunidad
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxs("span", { style: { color: "#53d3ff", fontWeight: 700 }, children: [
                        "S/. ",
                        a.precio_soles
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "sec-muted", style: { fontSize: 11 }, children: [
                        "Stock: ",
                        a.stock
                      ] })
                    ]
                  }
                )
              ] })
            ]
          },
          a.id
        )) })
      ] })
    ] }) }),
    modalFamilia && /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: () => setModalFamilia(false), children: /* @__PURE__ */ jsxs("div", { className: "modal-box", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(
        "h3",
        {
          className: "sec-title",
          style: {
            fontFamily: "var(--font-display)",
            fontSize: 22,
            marginBottom: 24
          },
          children: familiaEdit.id ? "✏️ Editar Familia" : "+ Nueva Familia"
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        [
          {
            key: "nombre",
            label: "Nombre *",
            placeholder: "Familia Quispe"
          },
          {
            key: "comunidad",
            label: "Comunidad *",
            placeholder: "Llachón"
          },
          {
            key: "descripcion",
            label: "Descripción",
            placeholder: "Descripción..."
          },
          {
            key: "foto_url",
            label: "URL de foto",
            placeholder: "https://..."
          },
          {
            key: "idiomas",
            label: "Idiomas (separados por coma)",
            placeholder: "español, aimara"
          },
          {
            key: "servicios",
            label: "Servicios (separados por coma)",
            placeholder: "desayuno, almuerzo, cena"
          }
        ].map((field) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              style: {
                fontSize: 12,
                color: "#7f95aa",
                display: "block",
                marginBottom: 6
              },
              children: field.label
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: familiaEdit[field.key] || "",
              onChange: (e) => setFamiliaEdit((p) => ({
                ...p,
                [field.key]: e.target.value
              })),
              placeholder: field.placeholder,
              style: inputStyle
            }
          )
        ] }, field.key)),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              style: {
                fontSize: 12,
                color: "#7f95aa",
                display: "block",
                marginBottom: 6
              },
              children: "Especialidad"
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: familiaEdit.especialidad || "",
              onChange: (e) => setFamiliaEdit((p) => ({
                ...p,
                especialidad: e.target.value
              })),
              style: inputStyle,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
                /* @__PURE__ */ jsx("option", { value: "pesca", children: "🎣 Pesca" }),
                /* @__PURE__ */ jsx("option", { value: "tejido", children: "🪡 Tejido" }),
                /* @__PURE__ */ jsx("option", { value: "agricultura", children: "🌿 Agricultura" }),
                /* @__PURE__ */ jsx("option", { value: "cocina", children: "🍲 Cocina" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14
            },
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    style: {
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6
                    },
                    children: "Habitaciones"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    value: familiaEdit.habitaciones || "",
                    onChange: (e) => setFamiliaEdit((p) => ({
                      ...p,
                      habitaciones: Number(e.target.value)
                    })),
                    style: inputStyle
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    style: {
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6
                    },
                    children: "Calificación (1-5)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 5,
                    step: 0.1,
                    value: familiaEdit.calificacion || "",
                    onChange: (e) => setFamiliaEdit((p) => ({
                      ...p,
                      calificacion: e.target.value
                    })),
                    style: inputStyle
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, marginTop: 24 }, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: saveFamilia,
            className: "btn-primary",
            style: { flex: 1, justifyContent: "center" },
            children: "💾 Guardar y publicar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setModalFamilia(false),
            className: "btn-outline",
            style: { flex: 1, justifyContent: "center" },
            children: "Cancelar"
          }
        )
      ] })
    ] }) }),
    modalArtesania && /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: () => setModalArtesania(false), children: /* @__PURE__ */ jsxs("div", { className: "modal-box", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(
        "h3",
        {
          className: "sec-title",
          style: {
            fontFamily: "var(--font-display)",
            fontSize: 22,
            marginBottom: 24
          },
          children: artEdit.id ? "✏️ Editar Artesanía" : "+ Nueva Artesanía"
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        [
          {
            key: "nombre",
            label: "Nombre *",
            placeholder: "Chullo de Alpaca"
          },
          {
            key: "imagen_url",
            label: "URL de imagen",
            placeholder: "https://images.unsplash.com/..."
          },
          {
            key: "tecnica",
            label: "Técnica",
            placeholder: "Tejido en telar de cintura"
          },
          {
            key: "materiales",
            label: "Materiales",
            placeholder: "Lana de alpaca, tintes naturales"
          },
          {
            key: "artesana_nombre",
            label: "Nombre artesana",
            placeholder: "Rosa Mamani"
          },
          {
            key: "artesana_comunidad",
            label: "Comunidad",
            placeholder: "Llachón"
          },
          {
            key: "emoji",
            label: "Emoji representativo",
            placeholder: "🧢"
          }
        ].map((field) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              style: {
                fontSize: 12,
                color: "#7f95aa",
                display: "block",
                marginBottom: 6
              },
              children: field.label
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: artEdit[field.key] || "",
              onChange: (e) => setArtEdit((p) => ({ ...p, [field.key]: e.target.value })),
              placeholder: field.placeholder,
              style: inputStyle
            }
          )
        ] }, field.key)),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              style: {
                fontSize: 12,
                color: "#7f95aa",
                display: "block",
                marginBottom: 6
              },
              children: "Tipo"
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: artEdit.tipo || "",
              onChange: (e) => setArtEdit((p) => ({ ...p, tipo: e.target.value })),
              style: inputStyle,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
                /* @__PURE__ */ jsx("option", { value: "textil", children: "🪡 Textil" }),
                /* @__PURE__ */ jsx("option", { value: "bordado", children: "🧵 Bordado" }),
                /* @__PURE__ */ jsx("option", { value: "ceramica", children: "🏺 Cerámica" }),
                /* @__PURE__ */ jsx("option", { value: "joyeria", children: "💍 Joyería" }),
                /* @__PURE__ */ jsx("option", { value: "instrumento", children: "🎶 Instrumento" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14
            },
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    style: {
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6
                    },
                    children: "Precio S/."
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: artEdit.precio_soles || "",
                    onChange: (e) => setArtEdit((p) => ({
                      ...p,
                      precio_soles: Number(e.target.value)
                    })),
                    style: inputStyle
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    style: {
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6
                    },
                    children: "Precio USD"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: artEdit.precio_usd || "",
                    onChange: (e) => setArtEdit((p) => ({
                      ...p,
                      precio_usd: Number(e.target.value)
                    })),
                    style: inputStyle
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    style: {
                      fontSize: 12,
                      color: "#7f95aa",
                      display: "block",
                      marginBottom: 6
                    },
                    children: "Stock"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: artEdit.stock || "",
                    onChange: (e) => setArtEdit((p) => ({
                      ...p,
                      stock: Number(e.target.value)
                    })),
                    style: inputStyle
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, marginTop: 24 }, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: saveArtesania,
            className: "btn-primary",
            style: { flex: 1, justifyContent: "center" },
            children: "💾 Guardar y publicar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setModalArtesania(false),
            className: "btn-outline",
            style: { flex: 1, justifyContent: "center" },
            children: "Cancelar"
          }
        )
      ] })
    ] }) })
  ] });
}

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Dashboard — Capachica" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminPanel", AdminPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/components/AdminPanel", "client:component-export": "default" })} ` })}`;
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/admin.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
