import React from 'react';

const sizeMap = {
  sm: { padding: '7px 16px',  fontSize: '12px', borderRadius: '4px', gap: '6px' },
  md: { padding: '11px 24px', fontSize: '14px', borderRadius: '6px', gap: '8px' },
  lg: { padding: '15px 32px', fontSize: '16px', borderRadius: '8px', gap: '10px' },
};

const variantMap = {
  primary: {
    background: 'linear-gradient(135deg,#B8531F,#7C2D0C)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 4px 18px rgba(184,83,31,0.36)',
  },
  secondary: {
    background: 'transparent',
    color: '#C9903A',
    border: '1.5px solid rgba(201,144,58,0.50)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'rgba(245,237,216,0.70)',
    border: '1px solid rgba(184,83,31,0.24)',
    boxShadow: 'none',
  },
  danger: {
    background: 'linear-gradient(135deg,#9A3F14,#5C1E08)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 14px rgba(92,30,8,0.50)',
  },
  lake: {
    background: 'linear-gradient(135deg,#2A74B8,#154480)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 4px 18px rgba(42,116,184,0.36)',
  },
};

const hoverMap = {
  primary:   { background: 'linear-gradient(135deg,#C96832,#9A3F14)', boxShadow: '0 8px 32px rgba(184,83,31,0.55)' },
  secondary: { background: 'rgba(201,144,58,0.12)', borderColor: 'rgba(201,144,58,0.80)' },
  ghost:     { background: 'rgba(184,83,31,0.10)', color: '#F5EDD8' },
  danger:    { background: 'linear-gradient(135deg,#B8531F,#7C2D0C)', boxShadow: '0 8px 28px rgba(184,83,31,0.45)' },
  lake:      { background: 'linear-gradient(135deg,#5096D4,#2A74B8)', boxShadow: '0 8px 28px rgba(42,116,184,0.50)' },
};

/**
 * Capachica Button component.
 * @param {ButtonProps} props
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  icon,
  fullWidth = false,
  type = 'button',
}) {
  const [hovered, setHovered] = React.useState(false);

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Josefin Sans', system-ui, sans-serif",
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? '100%' : undefined,
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    ...sizeMap[size] || sizeMap.md,
    ...(variantMap[variant] || variantMap.primary),
    ...(hovered && !disabled ? hoverMap[variant] || {} : {}),
  };

  const inner = (
    <>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} style={base}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={disabled ? undefined : onClick} style={base} disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {inner}
    </button>
  );
}
