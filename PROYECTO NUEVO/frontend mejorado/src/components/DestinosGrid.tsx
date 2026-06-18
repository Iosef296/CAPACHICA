import { useState, useEffect } from 'react';

const IA_URL = 'http://localhost:5000';

interface Destino {
  id: number;
  emoji: string;
  imagen: string;
  nombre: string;
  comunidad: string;
  desc: string;
  tags: string[];
  color: string;
  highlight: string;
}

function hexToRgb(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g);
  return m ? m.map(h => parseInt(h, 16)).join(',') : '56,189,248';
}

export default function DestinosGrid() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch(`${IA_URL}/api/destinos`)
      .then(r => r.json())
      .then(data => { setDestinos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
      Cargando destinos...
    </div>
  );

  if (!destinos.length) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
      No hay destinos configurados aún.
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.5rem' }}>
      {destinos.map((d, i) => {
        const rgb = hexToRgb(d.color);
        return (
          <div
            key={d.id}
            className="reveal card"
            style={{
              padding: 0, overflow: 'hidden',
              transitionDelay: `${i * 0.08}s`,
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div style={{
              height: 200,
              ...(d.imagen
                ? { background: `url('${d.imagen}') center/cover no-repeat` }
                : { background: `linear-gradient(135deg,rgba(6,15,26,0.9),rgba(${rgb},0.15))` }
              ),
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              borderBottom: '1px solid var(--border)',
            }}>
              {d.imagen && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.55) 100%)',
                }} />
              )}
              {!d.imagen && (
                <>
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 160, height: 160, borderRadius: '50%',
                    background: `radial-gradient(circle,rgba(${rgb},0.18) 0%,transparent 70%)`,
                  }} />
                  <div style={{ fontSize: '3.5rem', zIndex: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
                    {d.emoji}
                  </div>
                </>
              )}
              <span style={{
                ...(d.imagen ? { marginTop: 'auto', marginBottom: '0.75rem' } : { marginTop: '0.75rem' }),
                padding: '3px 12px', borderRadius: 999,
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                zIndex: 1,
                background: `rgba(${rgb},0.2)`,
                color: d.color,
                border: `1px solid rgba(${rgb},0.4)`,
                backdropFilter: 'blur(4px)',
              }}>
                {d.highlight}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem',
              }}>{d.nombre}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 500 }}>
                📍 {d.comunidad}
              </div>
              <p style={{ fontSize: '0.87rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1rem' }}>
                {d.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {(d.tags || []).map(t => (
                  <span key={t} style={{
                    padding: '3px 10px', borderRadius: 999, fontSize: 11,
                    background: 'var(--accent-light)', color: 'var(--accent)',
                    border: '1px solid rgba(56,189,248,0.2)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
