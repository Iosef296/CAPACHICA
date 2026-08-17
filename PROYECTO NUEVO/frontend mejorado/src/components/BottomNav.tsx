import { useState, useEffect } from "react";

const TABS: Array<{ label: string; href: string | null; icon: string }> = [
  { label: "Inicio",      href: "/",             icon: "home"     },
  { label: "Vivencial",   href: "/vivencial",    icon: "pin"      },
  { label: "Gastronomía", href: "/gastronomia",  icon: "fork"     },
  { label: "Festivid.",   href: "/festividades", icon: "calendar" },
  { label: "Más",         href: null,            icon: "grid"     },
];

const MORE = [
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
