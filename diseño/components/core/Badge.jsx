import React from 'react';

const variantStyles = {
  clay:    { bg: 'rgba(184,83,31,0.16)',  border: 'rgba(184,83,31,0.40)',  color: '#DE8649' },
  gold:    { bg: 'rgba(201,144,58,0.14)', border: 'rgba(201,144,58,0.40)', color: '#C9903A' },
  lake:    { bg: 'rgba(42,116,184,0.14)', border: 'rgba(42,116,184,0.40)', color: '#5096D4' },
  reed:    { bg: 'rgba(90,142,32,0.14)',  border: 'rgba(90,142,32,0.40)',  color: '#7AAF38' },
  neutral: { bg: 'rgba(255,255,255,0.06)',border: 'rgba(255,255,255,0.14)',color: 'rgba(245,237,216,0.70)' },
  success: { bg: 'rgba(90,142,32,0.14)',  border: 'rgba(90,142,32,0.40)',  color: '#7AAF38' },
  danger:  { bg: 'rgba(184,83,31,0.18)',  border: 'rgba(184,83,31,0.45)',  color: '#C96832' },
};

/**
 * Capachica Badge — status, category or count indicator.
 */
export function Badge({ children, variant = 'clay', dot = false, size = 'sm' }) {
  const v = variantStyles[variant] || variantStyles.neutral;
  const fontSize = size === 'lg' ? '12px' : size === 'xs' ? '9px' : '10px';
  const padding  = size === 'lg' ? '5px 12px' : size === 'xs' ? '2px 7px' : '3px 9px';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: dot ? '5px' : '0',
      padding,
      borderRadius: '4px',
      background: v.bg,
      border: `1px solid ${v.border}`,
      color: v.color,
      fontSize,
      fontWeight: 700,
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      fontFamily: "'Josefin Sans', system-ui, sans-serif",
      lineHeight: 1,
    }}>
      {dot && (
        <span style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: v.color, flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  );
}
