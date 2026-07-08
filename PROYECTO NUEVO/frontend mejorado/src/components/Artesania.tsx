import { useState, useEffect } from "react";
import { useLang } from "../data/LangContext";
import type { Lang } from "../data/translations";

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

interface CategoriaItem {
  id: string;
  label: Record<Lang, string>;
}

interface TallerItem {
  nombre: Record<Lang, string>;
  duracion: string;
  precio: number;
  incluye: Record<Lang, string>;
  emoji: string;
  max: number;
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
  emoji?: string;
  stock: number;
}

const categorias: CategoriaItem[] = [
  { id: "todos", label: { es: "Todos", en: "All", fr: "Tous" } },
  {
    id: "textil",
    label: { es: "🪡 Textiles", en: "🪡 Textiles", fr: "🪡 Textiles" },
  },
  {
    id: "bordado",
    label: { es: "🧵 Bordados", en: "🧵 Embroidery", fr: "🧵 Broderie" },
  },
  {
    id: "ceramica",
    label: { es: "🏺 Cerámica", en: "🏺 Ceramics", fr: "🏺 Céramique" },
  },
  {
    id: "joyeria",
    label: { es: "💍 Joyería", en: "💍 Jewelry", fr: "💍 Bijoux" },
  },
];

const talleres: TallerItem[] = [
  {
    nombre: {
      es: "Taller de Tejido",
      en: "Weaving Workshop",
      fr: "Atelier Tissage",
    },
    duracion: "2-3h",
    precio: 35,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée",
    },
    emoji: "🪡",
    max: 8,
  },
  {
    nombre: {
      es: "Taller de Bordado",
      en: "Embroidery Workshop",
      fr: "Atelier Broderie",
    },
    duracion: "3h",
    precio: 40,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée",
    },
    emoji: "🧵",
    max: 8,
  },
  {
    nombre: {
      es: "Taller de Cerámica",
      en: "Ceramics Workshop",
      fr: "Atelier Céramique",
    },
    duracion: "2h",
    precio: 30,
    incluye: {
      es: "Materiales + pieza terminada",
      en: "Materials + finished piece",
      fr: "Matériaux + pièce terminée",
    },
    emoji: "🏺",
    max: 6,
  },
  {
    nombre: {
      es: "Taller de Teñido Natural",
      en: "Natural Dyeing Workshop",
      fr: "Atelier Teinture Naturelle",
    },
    duracion: "2h",
    precio: 35,
    incluye: {
      es: "Materiales + prenda teñida",
      en: "Materials + dyed garment",
      fr: "Matériaux + vêtement teint",
    },
    emoji: "🎨",
    max: 6,
  },
];

export default function ArtesaniaPage({ hideHero = false }: { hideHero?: boolean }) {
  const { lang, t } = useLang();
  const [categoria, setCategoria] = useState("todos");
  const [moneda, setMoneda] = useState<"soles" | "usd">("soles");
  const [seleccionado, setSeleccionado] = useState<Artesania | null>(null);
  const [productos, setProductos] = useState<Artesania[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchArtesanias = async () => {
      try {
        const res = await fetch(`${API_URL}/artesania`);
        if (!res.ok) throw new Error("Error al cargar");
        const data = await res.json();
        setProductos(data.data || data);
      } catch (err) {
        console.error("Error fetching artesanías:", err);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtesanias();
    const interval = setInterval(fetchArtesanias, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtrados =
    categoria === "todos"
      ? productos
      : productos.filter((p: any) => p.tipo === categoria);

  return (
    <>
      <style>{`
        .artesania-hero { padding: 100px 0 60px; background: rgba(7,24,38,0.8); text-align: center; }
        .artesania-catalogo { padding: 80px 0; background: rgba(7,24,38,0.5); }
        .artesania-talleres { padding: 80px 0; background: rgba(11,34,53,0.7); }
        .art-card { background: rgba(18,47,76,0.78); border: 1px solid rgba(120,200,255,0.15); border-radius: 20px; overflow: hidden; cursor: pointer; transition: transform 0.25s; }
        .art-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .art-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 900px) { .art-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .art-grid { grid-template-columns: 1fr; } }
        .taller-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 900px) { .taller-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .taller-grid { grid-template-columns: 1fr; } }
        .taller-card { background: rgba(18,47,76,0.78); border: 1px solid rgba(120,200,255,0.15); border-radius: 20px; padding: 24px; transition: transform 0.2s; }
        .taller-card:hover { transform: translateY(-4px); }
        .filter-btn { padding: 8px 18px; border-radius: 999px; border: 1px solid rgba(120,200,255,0.2); background: transparent; color: #7f95aa; font-size: 13px; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: linear-gradient(135deg,#1ba6d9,#0b6ea8); color: #fff; border-color: transparent; }
        .sec-title { color: #f4f7fb; }
        .sec-muted { color: #7f95aa; }
        .sec-text { color: #b9c8d6; }
        .art-precio { color: #53d3ff; }
        .art-gold { color: #f5b32f; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal-box { background: #0b2235; border: 1px solid rgba(120,200,255,0.2); border-radius: 24px; max-width: 500px; width: 100%; overflow: hidden; max-height: 90vh; overflow-y: auto; }
        .skeleton { background: linear-gradient(90deg, rgba(18,47,76,0.5) 25%, rgba(31,110,156,0.3) 50%, rgba(18,47,76,0.5) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 20px; height: 280px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {!hideHero && (
        <section className="artesania-hero" id="artesania">
          <div className="container">
            <span className="badge badge-gold">
              {t?.artesania?.badge || "ARTESANÍA"}
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}>
              <span className="sec-title" style={{ display: "block", fontSize: "clamp(42px,7vw,80px)", fontWeight: 700 }}>
                {t?.artesania?.titulo || "Artesanía"}
              </span>
              <span className="art-gold" style={{ display: "block", fontSize: "clamp(38px,6.5vw,72px)", fontStyle: "italic", fontWeight: 400 }}>
                {t?.artesania?.subtitulo || "Capachiqueña"}
              </span>
            </h1>
            <p className="sec-text" style={{ marginTop: 20, fontSize: 16, maxWidth: 500, margin: "20px auto 0", lineHeight: 1.7 }}>
              {t?.artesania?.descripcion || "Artesanía tradicional de Capachica"}
            </p>
          </div>
        </section>
      )}

      <section className="artesania-catalogo">
        <div className="container">
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
                  {c.label[lang as Lang]}
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

          {loading ? (
            <div className="art-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          ) : filtrados.length > 0 ? (
            <div className="art-grid">
              {filtrados.map((p: any) => (
                <div
                  key={p.id}
                  className="art-card"
                  onClick={() => setSeleccionado(p)}
                >
                  <div
                    style={{
                      height: 200,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {p.imagen_url && !imgErrors[p.id] ? (
                      <img
                        src={p.imagen_url}
                        alt={p.nombre}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [p.id]: true }))
                        }
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 64,
                          opacity: 0.5,
                        }}
                      >
                        🎨
                      </div>
                    )}
                    <span
                      className="badge badge-gold"
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontSize: 10,
                      }}
                    >
                      {p.tipo}
                    </span>
                  </div>
                  <div style={{ padding: "18px 18px 22px" }}>
                    <h3
                      className="sec-title"
                      style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}
                    >
                      {p.nombre}
                    </h3>
                    <p
                      className="sec-muted"
                      style={{ fontSize: 12, marginBottom: 4 }}
                    >
                      Por <span className="art-gold">{p.artesana_nombre}</span>
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
                        {t?.artesania?.verMas || "Ver más"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#7f95aa" }}
            >
              <p>
                {t?.artesania?.sinProductos || "No hay artesanías disponibles"}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="artesania-talleres">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="badge badge-cyan">— TALLERES</span>
            <h2
              className="sec-title"
              style={{
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              {t?.artesania?.talleres || "Aprende con las"}
              <br />
              <em className="art-gold" style={{ fontStyle: "italic" }}>
                {t?.artesania?.talleresSubtitulo || "Artesanas"}
              </em>
            </h2>
          </div>
          <div className="taller-grid">
            {talleres.map((tl, i) => (
              <div key={i} className="taller-card">
                <div style={{ fontSize: 40, marginBottom: 16 }}>{tl.emoji}</div>
                <h3
                  className="sec-title"
                  style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}
                >
                  {tl.nombre[lang as Lang]}
                </h3>
                <p
                  className="sec-muted"
                  style={{ fontSize: 13, marginBottom: 4 }}
                >
                  ⏱ {tl.duracion}
                </p>
                <p
                  className="sec-muted"
                  style={{ fontSize: 12, marginBottom: 16 }}
                >
                  ✓ {tl.incluye[lang as Lang]}
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
                    S/. {tl.precio}
                  </span>
                  <button
                    className="btn-primary"
                    style={{ padding: "8px 16px", fontSize: 12 }}
                  >
                    {t?.artesania?.reservarTaller || "Reservar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {seleccionado && (
        <div className="modal-overlay" onClick={() => setSeleccionado(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div
              style={{ height: 240, position: "relative", overflow: "hidden" }}
            >
              {seleccionado.imagen_url && !imgErrors[seleccionado.id] ? (
                <img
                  src={seleccionado.imagen_url}
                  alt={seleccionado.nombre}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#0b3c60,#1f6e9c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 80,
                  }}
                >
                  🎨
                </div>
              )}
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
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <span className="badge badge-gold">{seleccionado.tipo}</span>
              <h3
                className="sec-title"
                style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}
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
                <p className="sec-muted">
                  🧑‍🎨{" "}
                  <span className="art-gold">
                    {seleccionado.artesana_nombre}
                  </span>
                </p>
                {seleccionado.tecnica && (
                  <p className="sec-muted">🔧 {seleccionado.tecnica}</p>
                )}
                {seleccionado.materiales && (
                  <p className="sec-muted">🌿 {seleccionado.materiales}</p>
                )}
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
                }}
              >
                <div>
                  <div
                    className="art-precio"
                    style={{ fontSize: 28, fontWeight: 700 }}
                  >
                    S/. {seleccionado.precio_soles}
                  </div>
                  <div className="sec-muted">
                    ≈ ${seleccionado.precio_usd} USD
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1 }}>
                  {t?.artesania?.comprar || "Comprar"}
                </button>
                <button
                  className="btn-outline"
                  onClick={() => setSeleccionado(null)}
                  style={{ flex: 1 }}
                >
                  {t?.artesania?.cerrar || "Cerrar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
