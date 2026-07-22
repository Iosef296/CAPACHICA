import React from 'react';

/**
 * Capachica Tag — inline filter chip or category label.
 */
export function Tag({ children, active = false, onClick, color }) {
  const [hovered, setHovered] = React.useState(false);

  const isInteractive = !!onClick;
  const on = active || (isInteractive && hovered);

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.06em',
        fontFamily: "'Josefin Sans', system-ui, sans-serif",
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'all 0.20s ease',
        userSelect: 'none',
        background: on
          ? `rgba(${color ? hexToRgb(color) : '184,83,31'},0.18)`
          : 'rgba(255,255,255,0.06)',
        border: on
          ? `1px solid rgba(${color ? hexToRgb(color) : '184,83,31'},0.55)`
          : '1px solid rgba(255,255,255,0.12)',
        color: on
          ? (color || '#DE8649')
          : 'rgba(245,237,216,0.58)',
      }}
    >
      {children}
    </span>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}
