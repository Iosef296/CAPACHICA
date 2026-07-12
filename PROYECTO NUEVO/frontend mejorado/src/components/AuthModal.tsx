import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api";
const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID || "";

type Usuario = { id: string; nombre: string; email: string; rol: string; activo: boolean };

interface Props {
  open: boolean;
  initialTab: "login" | "registro";
  onClose: () => void;
  onSuccess: (usuario: Usuario) => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export default function AuthModal({ open, initialTab, onClose, onSuccess }: Props) {
  const [tab, setTab] = useState<"login" | "registro">(initialTab);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setError("");
      setNombre("");
      setEmail("");
      setPassword("");
    }
  }, [open, initialTab]);

  useEffect(() => {
    if (!open || !GOOGLE_CLIENT_ID) return;

    async function handleGoogleCredential(response: any) {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al iniciar sesión con Google");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        onSuccess(data.usuario);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    function renderGoogleButton() {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });
      googleBtnRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        width: 360,
        text: "continue_with",
      });
    }

    if (window.google) {
      renderGoogleButton();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = renderGoogleButton;
      document.head.appendChild(script);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = tab === "login" ? "/auth/login" : "/auth/registro";
      const body = tab === "login" ? { email, password } : { nombre, email, password };
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detalles?.[0]?.mensaje || data.error || "Error");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      onSuccess(data.usuario);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(6,15,26,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 420, background: "rgba(10,20,35,0.98)",
          border: "1px solid rgba(56,189,248,0.25)", borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)", padding: "1.75rem", position: "relative",
          fontFamily: "inherit",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute", top: 14, right: 14, background: "transparent", border: "none",
            color: "rgba(240,237,232,0.6)", fontSize: 20, cursor: "pointer", lineHeight: 1,
          }}
        >×</button>

        <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", borderBottom: "1px solid rgba(56,189,248,0.15)" }}>
          {(["login", "registro"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: "0.6rem 0", background: "transparent", border: "none", cursor: "pointer",
                color: tab === t ? "#38bdf8" : "rgba(240,237,232,0.55)",
                fontWeight: 600, fontSize: 14,
                borderBottom: tab === t ? "2px solid #38bdf8" : "2px solid transparent",
              }}
            >
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {GOOGLE_CLIENT_ID && (
          <>
            <div ref={googleBtnRef} style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1rem 0", color: "rgba(240,237,232,0.4)", fontSize: 12 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
              o
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
            </div>
          </>
        )}

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tab === "registro" && (
            <input
              type="text" required placeholder="Nombre" value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email" required placeholder="Correo electrónico" value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" required placeholder={tab === "registro" ? "Mínimo 8 caracteres" : "Contraseña"}
            minLength={tab === "registro" ? 8 : undefined} value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={{ color: "#fca5a5", fontSize: 13, margin: 0 }}>⚠️ {error}</p>}

          <button
            type="submit" disabled={loading}
            style={{
              marginTop: 6, padding: "0.75rem", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg,#0ea5e9,#0369a1)", color: "#fff", fontWeight: 700, fontSize: 14,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Un momento..." : tab === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.65rem 0.8rem", borderRadius: 10, border: "1px solid rgba(56,189,248,0.2)",
  background: "rgba(255,255,255,0.04)", color: "#f0ede8", fontSize: 14, outline: "none",
};
