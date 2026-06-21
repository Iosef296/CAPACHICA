import { useState, useEffect } from "react";

const TABS: Array<{ label: string; href: string | null; icon: string }> = [
  { label: "Inicio",      href: "/",             icon: "home"     },
  { label: "Destinos",    href: "/destinos",     icon: "pin"      },
  { label: "Gastronomía", href: "/gastronomia",  icon: "fork"     },
  { label: "Festivid.",   href: "/festividades", icon: "calendar" },
  { label: "Más",         href: null,            icon: "grid"     },
];

const MORE = [
  { label: "Vivencial",   href: "/vivencial",   emoji: "🌿" },
  { label: "Actividades", href: "/actividades", emoji: "🏔️" },
  { label: "Artesanía",   href: "/artesania",   emoji: "🎨" },
  { label: "Alojamiento", href: "/alojamiento", emoji: "🏡" },
  { label: "Cómo Llegar", href: "/como-llegar", emoji: "🗺️" },
];

function SvgIcon({ name }: { name: string }) {
  const p = {
    width: 22, height: 22, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 2 as number,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  if (name === "home")     return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>;
  if (name === "pin")      return <svg {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  if (name === "fork")     return <svg {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 .55.45 1 1 1h4v6"/></svg>;
  if (name === "calendar") return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if (name === "grid")     return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
  return null;
}

export default function BottomNav() {
  const [path, setPath] = useState("/");
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSheet(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const isActive = (href: string | null) => {
    if (!href) return false;
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  return (
    <>
      <style>{`
        .bnav {
          display: none;
        }
        @media (max-width: 768px) {
          .bnav {
            display: flex;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            z-index: 150;
            height: calc(62px + env(safe-area-inset-bottom));
            padding-bottom: env(safe-area-inset-bottom);
            background: rgba(5,12,22,0.94);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-top: 1px solid rgba(56,189,248,0.10);
            box-shadow: 0 -2px 20px rgba(0,0,0,0.25);
            align-items: stretch;
          }
          [data-theme="light"] .bnav {
            background: rgba(255,255,255,0.94);
            border-top-color: rgba(10,80,150,0.10);
            box-shadow: 0 -2px 20px rgba(0,0,0,0.10);
          }
        }
        .bnav-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          color: rgba(240,237,232,0.40);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.15s ease, color 0.15s ease;
        }
        [data-theme="light"] .bnav-tab {
          color: rgba(26,26,46,0.38);
        }
        .bnav-tab:active { transform: scale(0.82); }
        .bnav-tab.bnav-active { color: #38bdf8; }
        [data-theme="light"] .bnav-tab.bnav-active { color: #0369a1; }
        .bnav-pip {
          width: 44px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
          transition: background 0.2s ease;
        }
        .bnav-tab.bnav-active .bnav-pip {
          background: rgba(56,189,248,0.13);
        }
        [data-theme="light"] .bnav-tab.bnav-active .bnav-pip {
          background: rgba(3,105,161,0.10);
        }
        .bnav-label {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1;
          font-family: var(--font-body);
        }

        /* Sheet backdrop */
        .bnav-backdrop {
          position: fixed; inset: 0; z-index: 145;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: bnavFadeIn 0.22s ease;
        }
        @keyframes bnavFadeIn { from { opacity: 0 } to { opacity: 1 } }

        /* Sheet panel */
        .bnav-sheet {
          position: fixed;
          left: 0; right: 0; z-index: 148;
          bottom: calc(62px + env(safe-area-inset-bottom));
          background: rgba(7,15,28,0.97);
          border: 1px solid rgba(56,189,248,0.10);
          border-bottom: none;
          border-radius: 24px 24px 0 0;
          padding: 12px 20px 22px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          animation: bnavSheetUp 0.3s cubic-bezier(0.34,1.2,0.64,1);
        }
        [data-theme="light"] .bnav-sheet {
          background: rgba(255,255,255,0.97);
          border-color: rgba(10,80,150,0.10);
        }
        @keyframes bnavSheetUp {
          from { transform: translateY(100%) }
          to   { transform: translateY(0) }
        }
        .bnav-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: rgba(240,237,232,0.15);
          margin: 0 auto 16px;
        }
        [data-theme="light"] .bnav-handle { background: rgba(26,26,46,0.15); }
        .bnav-sheet-title {
          font-family: var(--font-display);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #38bdf8; margin-bottom: 14px;
        }
        [data-theme="light"] .bnav-sheet-title { color: #0369a1; }
        .bnav-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        }
        .bnav-more-item {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 14px; border-radius: 14px;
          text-decoration: none;
          font-size: 14px; font-weight: 500;
          font-family: var(--font-body);
          color: rgba(240,237,232,0.88);
          background: rgba(56,189,248,0.05);
          border: 1px solid rgba(56,189,248,0.10);
          transition: background 0.15s, transform 0.12s;
          -webkit-tap-highlight-color: transparent;
        }
        [data-theme="light"] .bnav-more-item {
          color: rgba(26,26,46,0.85);
          background: rgba(10,80,150,0.05);
          border-color: rgba(10,80,150,0.10);
        }
        .bnav-more-item:active { transform: scale(0.94); }
      `}</style>

      {sheet && <div className="bnav-backdrop" onClick={() => setSheet(false)} />}

      {sheet && (
        <div className="bnav-sheet">
          <div className="bnav-handle" />
          <div className="bnav-sheet-title">Explorar</div>
          <div className="bnav-grid">
            {MORE.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="bnav-more-item"
                onClick={() => setSheet(false)}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{item.emoji}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <nav className="bnav" aria-label="Navegación principal">
        {TABS.map(tab =>
          tab.href !== null ? (
            <a
              key={tab.href}
              href={tab.href}
              className={`bnav-tab${isActive(tab.href) ? " bnav-active" : ""}`}
              aria-current={isActive(tab.href) ? "page" : undefined}
            >
              <div className="bnav-pip"><SvgIcon name={tab.icon} /></div>
              <span className="bnav-label">{tab.label}</span>
            </a>
          ) : (
            <button
              key="más"
              className={`bnav-tab${sheet ? " bnav-active" : ""}`}
              onClick={() => setSheet(s => !s)}
              aria-label="Más páginas"
            >
              <div className="bnav-pip"><SvgIcon name={tab.icon} /></div>
              <span className="bnav-label">{tab.label}</span>
            </button>
          )
        )}
      </nav>
    </>
  );
}
