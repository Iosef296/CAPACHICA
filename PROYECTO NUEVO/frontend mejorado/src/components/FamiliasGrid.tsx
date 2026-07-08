import { useState, useEffect } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

const PRECIO_POR_PERSONA_NOCHE = 120;

const iconMap: Record<string, string> = {
  pesca: "🎣",
  tejido: "🪡",
  agricultura: "🌿",
  cocina: "🍲",
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

export default function FamiliasGrid() {
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/hospedajes`)
      .then((res) => res.json())
      .then((data) => {
        setFamilias(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las familias.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>{`
        .familias-section { padding: 80px 0; background: rgba(7,24,38,0.6); }
        [data-theme="light"] .familias-section { background: rgba(168,212,238,0.3); }
        .familia-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 20px;
          overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
        }
        [data-theme="light"] .familia-card {
          background: rgba(255,255,255,0.82); border: 1px solid rgba(11,122,181,0.18);
        }
        .familia-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(83,211,255,0.15);
        }
        .familias-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 900px) { .familias-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 580px) { .familias-grid { grid-template-columns: 1fr; } }
        .familia-nombre { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .familia-nombre { color: #071826; }
        .familia-desc { color: #b9c8d6; }
        [data-theme="light"] .familia-desc { color: #2a4a63; }
        .familia-info { color: #7f95aa; }
        [data-theme="light"] .familia-info { color: #5a7a93; }
        .familia-precio { color: #53d3ff; }
        [data-theme="light"] .familia-precio { color: #0b7ab5; }
        .familia-servicio {
          background: rgba(83,211,255,0.1); color: #53d3ff;
          border: 1px solid rgba(83,211,255,0.2);
        }
        [data-theme="light"] .familia-servicio {
          background: rgba(11,122,181,0.08); color: #0b7ab5;
          border: 1px solid rgba(11,122,181,0.2);
        }
        .sec-label { color: #53d3ff; }
        [data-theme="light"] .sec-label { color: #0b7ab5; }
        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .skeleton {
          background: linear-gradient(90deg, rgba(18,47,76,0.5) 25%, rgba(31,110,156,0.3) 50%, rgba(18,47,76,0.5) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 20px; height: 320px;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <section id="familias" className="familias-section">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span
              className="sec-label"
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              — VIVENCIAL
            </span>
            <h2
              className="sec-title"
              style={{
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              Turismo Vivencial
            </h2>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="familias-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#f5b32f" }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div className="familias-grid">
              {familias.map((f) => (
                <div key={f.id} className="familia-card">
                  {/* Foto */}
                  <div
                    style={{
                      height: 200,
                      background: f.foto_url
                        ? `url(${f.foto_url}) center/cover`
                        : "linear-gradient(135deg, #0b3c60 0%, #1f6e9c 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {!f.foto_url && (
                      <div style={{ fontSize: 64, opacity: 0.35 }}>
                        {iconMap[f.especialidad] || "🏠"}
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      ⭐ {parseFloat(f.calificacion).toFixed(1)}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "20px 20px 24px" }}>
                    <div style={{ marginBottom: 10 }}>
                      <span className="badge badge-cyan">Disponible</span>
                    </div>
                    <h3
                      className="familia-nombre"
                      style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}
                    >
                      {f.nombre}
                    </h3>
                    <p
                      className="familia-desc"
                      style={{
                        fontSize: 13,
                        marginBottom: 12,
                        lineHeight: 1.6,
                      }}
                    >
                      {f.descripcion}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        marginBottom: 12,
                      }}
                    >
                      {f.servicios.map((s) => (
                        <span
                          key={s}
                          className="familia-servicio"
                          style={{
                            fontSize: 11,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p
                      className="familia-info"
                      style={{ fontSize: 12, marginBottom: 16 }}
                    >
                      🗣️ {f.idiomas.join(" · ")}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <span
                          className="familia-precio"
                          style={{ fontSize: 22, fontWeight: 700 }}
                        >
                          S/. {PRECIO_POR_PERSONA_NOCHE}
                        </span>
                        <span className="familia-info" style={{ fontSize: 12 }}>
                          {" "}
                          /persona/noche
                        </span>
                      </div>
                      <a
                        href="#reservar"
                        className="btn-outline"
                        style={{ padding: "8px 18px", fontSize: 13 }}
                      >
                        Explorar →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-outline">Ver todos</button>
          </div>
        </div>
      </section>
    </>
  );
}
