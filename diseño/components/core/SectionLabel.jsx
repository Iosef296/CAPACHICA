import React from 'react';

/**
 * Capachica SectionLabel — rustic eyebrow / section identifier.
 * Replaces pill-shaped section badges with an angular Andean-inspired label.
 */
export function SectionLabel({ children, icon = '✦', color = 'warm' }) {
  const colorMap = {
    warm:  { bg: 'rgba(201,144,58,0.10)',  border: 'rgba(201,144,58,0.38)',  text: '#C9903A'  },
    clay:  { bg: 'rgba(184,83,31,0.10)',   border: 'rgba(184,83,31,0.38)',   text: '#DE8649'  },
    lake:  { bg: 'rgba(42,116,184,0.10)',  border: 'rgba(42,116,184,0.38)',  text: '#5096D4'  },
    reed:  { bg: 'rgba(90,142,32,0.10)',   border: 'rgba(90,142,32,0.38)',   text: '#7AAF38'  },
    muted: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.14)', text: 'rgba(245,237,216,0.55)' },
  };
  const c = colorMap[color] || colorMap.warm;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 14px',
      borderRadius: '4px',
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontFamily: "'Josefin Sans', system-ui, sans-serif",
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.20em',
      textTransform: 'uppercase',
      lineHeight: 1,
    }}>
      {icon && <span style={{ fontSize: '9px', opacity: 0.8 }}>{icon}</span>}
      {children}
    </span>
  );
}
