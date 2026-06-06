import { useState } from "react";

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "textil", label: "🪡 Textiles" },
  { id: "bordado", label: "🧵 Bordados" },
  { id: "ceramica", label: "🏺 Cerámica" },
  { id: "joyeria", label: "💍 Joyería" },
];

const productos = [
  {
    id: 1,
    nombre: "Chullo de Alpaca",
    tipo: "textil",
    imagen:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    tecnica: "Tejido en telar de cintura",
    precio_soles: 45,
    precio_usd: 12,
    artesana: "Rosa Mamani",
    comunidad: "Llachón",
    experiencia: 15,
    materiales: "Lana de alpaca, tintes naturales",
    emoji: "🧢",
  },
  {
    id: 2,
    nombre: "Manta Bordada del Lago",
    tipo: "bordado",
    imagen:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    tecnica: "Bordado a mano",
    precio_soles: 120,
    precio_usd: 32,
    artesana: "Carmen Quispe",
    comunidad: "Capachica Centro",
    experiencia: 22,
    materiales: "Tela de algodón, hilos de colores",
    emoji: "🪆",
  },
  {
    id: 3,
    nombre: "Balsa de Totora",
    tipo: "ceramica",
    imagen:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
    tecnica: "Modelado en barro",
    precio_soles: 35,
    precio_usd: 9,
    artesana: "María Coila",
    comunidad: "Siale",
    experiencia: 10,
    materiales: "Arcilla local, pigmentos naturales",
    emoji: "🏺",
  },
  {
    id: 4,
    nombre: "Faja con Diseños Aymaras",
    tipo: "textil",
    imagen:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80",
    tecnica: "Tejido backstrap loom",
    precio_soles: 65,
    precio_usd: 17,
    artesana: "Lucía Huanca",
    comunidad: "Llachón",
    experiencia: 18,
    materiales: "Lana de oveja teñida",
    emoji: "🎀",
  },
  {
    id: 5,
    nombre: "Aretes de Alpaca",
    tipo: "joyeria",
    imagen:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
    tecnica: "Trabajo en metal",
    precio_soles: 25,
    precio_usd: 7,
    artesana: "Ana Turpo",
    comunidad: "Capachica Centro",
    experiencia: 8,
    materiales: "Alpaca, piedras del lago",
    emoji: "💎",
  },
  {
    id: 6,
    nombre: "Bolso Andino",
    tipo: "textil",
    imagen:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    tecnica: "Tejido en telar",
    precio_soles: 85,
    precio_usd: 23,
    artesana: "Juana Mamani",
    comunidad: "Siale",
    experiencia: 20,
    materiales: "Lana de alpaca y oveja",
    emoji: "👜",
  },
  {
    id: 7,
    nombre: "Cuadro Bordado Titicaca",
    tipo: "bordado",
    imagen:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    tecnica: "Bordado en tela",
    precio_soles: 150,
    precio_usd: 40,
    artesana: "Carmen Quispe",
    comunidad: "Capachica Centro",
    experiencia: 22,
    materiales: "Lienzo, hilos de seda",
    emoji: "🖼️",
  },
  {
    id: 8,
    nombre: "Zampoña Artesanal",
    tipo: "ceramica",
    imagen:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80",
    tecnica: "Corte y afinación manual",
    precio_soles: 40,
    precio_usd: 11,
    artesana: "Pedro Coila",
    comunidad: "Siale",
    experiencia: 25,
    materiales: "Caña de carrizo del lago",
    emoji: "🎶",
  },
  {
    id: 9,
    nombre: "Pulsera de Plata",
    tipo: "joyeria",
    imagen:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    tecnica: "Cincelado tradicional",
    precio_soles: 55,
    precio_usd: 15,
    artesana: "Ana Turpo",
    comunidad: "Capachica Centro",
    experiencia: 8,
    materiales: "Plata 950, piedra turquesa",
    emoji: "✨",
  },
];

const talleres = [
  {
    nombre: "Taller de Tejido",
    duracion: "2-3h",
    precio: 35,
    incluye: "Materiales + pieza terminada",
    emoji: "🪡",
    max: 8,
  },
  {
    nombre: "Taller de Bordado",
    duracion: "3h",
    precio: 40,
    incluye: "Materiales + pieza terminada",
    emoji: "🧵",
    max: 8,
  },
  {
    nombre: "Taller de Cerámica",
    duracion: "2h",
    precio: 30,
    incluye: "Materiales + pieza terminada",
    emoji: "🏺",
    max: 6,
  },
  {
    nombre: "Taller de Teñido Natural",
    duracion: "2h",
    precio: 35,
    incluye: "Materiales + prenda teñida",
    emoji: "🎨",
    max: 6,
  },
];

export default function Artesania() {
  const [categoria, setCategoria] = useState("todos");
  const [moneda, setMoneda] = useState<"soles" | "usd">("soles");
  const [seleccionado, setSeleccionado] = useState<
    (typeof productos)[0] | null
  >(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const filtrados =
    categoria === "todos"
      ? productos
      : productos.filter((p) => p.tipo === categoria);

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <style>{`
        .artesania-hero {
          padding: 100px 0 60px;
          background: rgba(7,24,38,0.8);
          text-align: center;
        }
        [data-theme="light"] .artesania-hero { background: rgba(168,212,238,0.35); }

        .artesania-catalogo { padding: 80px 0; background: rgba(7,24,38,0.5); }
        [data-theme="light"] .artesania-catalogo { background: rgba(168,212,238,0.2); }

        .artesania-talleres { padding: 80px 0; background: rgba(11,34,53,0.7); }
        [data-theme="light"] .artesania-talleres { background: rgba(200,228,245,0.4); }

        .art-card {
          background: rgba(18,47,76,0.78);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15);
          border-radius: 20px; overflow: hidden; cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        [data-theme="light"] .art-card {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(11,122,181,0.18);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .art-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(83,211,255,0.15);
        }
        [data-theme="light"] .art-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 0 20px rgba(11,122,181,0.1);
        }

        .art-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) { .art-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .art-grid { grid-template-columns: 1fr; } }

        .taller-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .taller-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .taller-grid { grid-template-columns: 1fr; } }

        .taller-card {
          background: rgba(18,47,76,0.78);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15);
          border-radius: 20px; padding: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        [data-theme="light"] .taller-card {
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(11,122,181,0.18);
        }
        .taller-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 24px rgba(83,211,255,0.12);
        }

        .filter-btn {
          padding: 8px 18px; border-radius: 999px;
          border: 1px solid rgba(120,200,255,0.2);
          background: transparent; color: #7f95aa;
          font-family: var(--font-body); font-size: 13px;
          cursor: pointer; transition: all 0.2s;
        }
        .filter-btn:hover, .filter-btn.active {
          background: linear-gradient(135deg,#1ba6d9,#0b6ea8);
          color: #fff; border-color: transparent;
          box-shadow: 0 0 20px rgba(83,211,255,0.25);
        }
        [data-theme="light"] .filter-btn { color: #5a7a93; border-color: rgba(11,122,181,0.2); }
        [data-theme="light"] .filter-btn:hover, [data-theme="light"] .filter-btn.active {
          color: #fff;
        }

        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .sec-text { color: #b9c8d6; }
        [data-theme="light"] .sec-text { color: #2a4a63; }
        .sec-muted { color: #7f95aa; }
        [data-theme="light"] .sec-muted { color: #5a7a93; }
        .art-precio { color: #53d3ff; }
        [data-theme="light"] .art-precio { color: #0b7ab5; }
        .art-gold { color: #f5b32f; }
        [data-theme="light"] .art-gold { color: #c47d00; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          z-index: 200; display: flex; align-items: center;
          justify-content: center; padding: 1rem;
          backdrop-filter: blur(4px);
        }
        .modal-box {
          background: #0b2235;
          border: 1px solid rgba(120,200,255,0.2);
          border-radius: 24px; max-width: 500px; width: 100%;
          box-shadow: 0 20px 80px rgba(0,0,0,0.6);
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
        }
        [data-theme="light"] .modal-box {
          background: #fff;
          border: 1px solid rgba(11,122,181,0.2);
        }

        .img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #0b3c60 0%, #1f6e9c 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 64px; opacity: 0.5;
        }
      `}</style>

      {/* HERO */}
      <section className="artesania-hero" id="artesania">
        <div className="container">
          <span
            className="badge badge-gold"
            style={{ marginBottom: 20, display: "inline-block" }}
          >
            ARTESANÍA · CAPACHICA
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}>
            <span
              className="sec-title"
              style={{
                display: "block",
                fontSize: "clamp(42px,7vw,80px)",
                fontWeight: 700,
              }}
            >
              Artesanía
            </span>
            <span
              className="art-gold"
              style={{
                display: "block",
                fontSize: "clamp(38px,6.5vw,72px)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Capachiqueña
            </span>
          </h1>
          <p
            className="sec-text"
            style={{
              marginTop: 20,
              fontSize: 16,
              maxWidth: 500,
              margin: "20px auto 0",
              lineHeight: 1.7,
            }}
          >
            Tejidos de alpaca, cerámica andina y artesanías hechas a mano
            centenarias.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="artesania-catalogo">
        <div className="container">
          {/* Filtros + moneda */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categorias.map((c) => (
                <button
                  key={c.id}
                  className={`filter-btn ${categoria === c.id ? "active" : ""}`}
                  onClick={() => setCategoria(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {(["soles", "usd"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMoneda(m)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(120,200,255,0.2)",
                    background:
                      moneda === m ? "rgba(245,179,47,0.15)" : "transparent",
                    color: moneda === m ? "#f5b32f" : "#7f95aa",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {m === "soles" ? "S/." : "USD"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="art-grid">
            {filtrados.map((p) => (
              <div
                key={p.id}
                className="art-card"
                onClick={() => setSeleccionado(p)}
              >
                {/* Imagen */}
                <div
                  style={{
                    height: 200,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!imgErrors[p.id] ? (
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      loading="lazy"
                      onError={() => handleImgError(p.id)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.transform =
                          "scale(1)")
                      }
                    />
                  ) : (
                    <div className="img-placeholder">{p.emoji}</div>
                  )}

                  {/* Badge tipo */}
                  <span
                    className="badge badge-gold"
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      fontSize: 10,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {categorias
                      .find((c) => c.id === p.tipo)
                      ?.label.replace(/[^\w\s]/gi, "")
                      .trim() || p.tipo}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: "18px 18px 22px" }}>
                  <h3
                    className="sec-title"
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 4,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {p.nombre}
                  </h3>
                  <p
                    className="sec-muted"
                    style={{ fontSize: 12, marginBottom: 4 }}
                  >
                    Por <span className="art-gold">{p.artesana}</span> ·{" "}
                    {p.comunidad}
                  </p>
                  <p
                    className="sec-muted"
                    style={{ fontSize: 11, marginBottom: 14 }}
                  >
                    ✦ {p.tecnica}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="art-precio"
                      style={{ fontSize: 22, fontWeight: 700 }}
                    >
                      {moneda === "soles"
                        ? `S/. ${p.precio_soles}`
                        : `$${p.precio_usd}`}
                    </span>
                    <button
                      className="btn-outline"
                      style={{ padding: "6px 14px", fontSize: 12 }}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-outline">Ver todos los productos</button>
          </div>
        </div>
      </section>

      {/* TALLERES */}
      <section className="artesania-talleres">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              className="badge badge-cyan"
              style={{ marginBottom: 16, display: "inline-block" }}
            >
              — TALLERES
            </span>
            <h2
              className="sec-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Aprende con las
              <br />
              <em className="art-gold" style={{ fontStyle: "italic" }}>
                Artesanas
              </em>
            </h2>
            <p
              className="sec-text"
              style={{ marginTop: 12, maxWidth: 440, margin: "12px auto 0" }}
            >
              Talleres con maestras artesanas. Te llevas tu propia creación.
            </p>
          </div>

          <div className="taller-grid">
            {talleres.map((t, i) => (
              <div key={i} className="taller-card">
                <div style={{ fontSize: 40, marginBottom: 16 }}>{t.emoji}</div>
                <h3
                  className="sec-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {t.nombre}
                </h3>
                <p
                  className="sec-muted"
                  style={{ fontSize: 13, marginBottom: 4 }}
                >
                  ⏱ {t.duracion} · máx. {t.max} personas
                </p>
                <p
                  className="sec-muted"
                  style={{ fontSize: 12, marginBottom: 16 }}
                >
                  ✓ {t.incluye}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      className="art-precio"
                      style={{ fontSize: 22, fontWeight: 700 }}
                    >
                      S/. {t.precio}
                    </span>
                    <span className="sec-muted" style={{ fontSize: 11 }}>
                      /persona
                    </span>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: "8px 16px", fontSize: 12 }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {seleccionado && (
        <div className="modal-overlay" onClick={() => setSeleccionado(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Imagen modal */}
            <div
              style={{ height: 240, position: "relative", overflow: "hidden" }}
            >
              {!imgErrors[seleccionado.id] ? (
                <img
                  src={seleccionado.imagen}
                  alt={seleccionado.nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="img-placeholder">{seleccionado.emoji}</div>
              )}
              {/* Botón cerrar sobre imagen */}
              <button
                onClick={() => setSeleccionado(null)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              <span
                className="badge badge-gold"
                style={{ marginBottom: 12, display: "inline-block" }}
              >
                {categorias.find((c) => c.id === seleccionado.tipo)?.label}
              </span>
              <h3
                className="sec-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {seleccionado.nombre}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 20,
                }}
              >
                <p className="sec-muted" style={{ fontSize: 13 }}>
                  🧑‍🎨 <span className="art-gold">{seleccionado.artesana}</span> ·{" "}
                  {seleccionado.comunidad}
                </p>
                <p className="sec-muted" style={{ fontSize: 13 }}>
                  📅 {seleccionado.experiencia} años de experiencia
                </p>
                <p className="sec-muted" style={{ fontSize: 13 }}>
                  🔧 {seleccionado.tecnica}
                </p>
                <p className="sec-muted" style={{ fontSize: 13 }}>
                  🌿 {seleccionado.materiales}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                  padding: "16px",
                  background: "rgba(83,211,255,0.06)",
                  borderRadius: 12,
                  border: "1px solid rgba(83,211,255,0.1)",
                }}
              >
                <div>
                  <div
                    className="art-precio"
                    style={{ fontSize: 28, fontWeight: 700 }}
                  >
                    S/. {seleccionado.precio_soles}
                  </div>
                  <div className="sec-muted" style={{ fontSize: 12 }}>
                    ≈ ${seleccionado.precio_usd} USD
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span className="sec-muted">
                    ✓ Certificado de autenticidad
                  </span>
                  <span className="sec-muted">✓ Envío a Lima y extranjero</span>
                  <span className="sec-muted">
                    ✓ Personalizable con tu nombre
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1 }}>
                  🛒 Comprar
                </button>
                <button
                  className="btn-outline"
                  onClick={() => setSeleccionado(null)}
                  style={{ flex: 1 }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
