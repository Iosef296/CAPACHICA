import React from 'react';

/**
 * Rustic destination / experience card for Capachica.
 */
export function Card({
  title,
  subtitle,
  description,
  href,
  color = '#B8531F',
  gradient,
  tags = [],
  icon,
  onClick,
}) {
  const [hovered, setHovered] = React.useState(false);

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const rgb = `${r},${g},${b}`;

  const bg = gradient || `linear-gradient(135deg, rgba(${rgb},0.12) 0%, rgba(26,10,4,0.92) 100%)`;

  const cardStyle = {
    display: 'block',
    background: bg,
    border: `1px solid rgba(${rgb},${hovered ? '0.40' : '0.20'})`,
    borderRadius: '6px',
    padding: '1.75rem',
    textDecoration: 'none',
    cursor: href || onClick ? 'pointer' : 'default',
    transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
    transform: hovered && (href || onClick) ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered && (href || onClick)
      ? `0 16px 40px rgba(${rgb},0.22), 0 4px 12px rgba(16,8,4,0.50)`
      : `0 2px 8px rgba(16,8,4,0.40)`,
    position: 'relative',
    overflow: 'hidden',
  };

  const content = (
    <>
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -32, right: -32,
        width: 110, height: 110, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${rgb},0.16) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
        {icon && <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>{icon}</div>}
        {subtitle && (
          <span style={{
            padding: '3px 10px', borderRadius: '4px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: `rgba(${rgb},0.14)`,
            color: color,
            border: `1px solid rgba(${rgb},0.28)`,
            fontFamily: "'Josefin Sans', sans-serif",
          }}>{subtitle}</span>
        )}
      </div>

      {/* Title */}
      {title && (
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.15rem', fontWeight: 700,
          color: '#F5EDD8', marginBottom: '0.55rem', lineHeight: 1.3,
        }}>{title}</h3>
      )}

      {/* Description */}
      {description && (
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '0.84rem', color: 'rgba(245,237,216,0.65)',
          lineHeight: 1.75, marginBottom: tags.length ? '1rem' : '0',
        }}>{description}</p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '0.8rem' }}>
          {tags.map(t => (
            <span key={t} style={{
              padding: '3px 9px', borderRadius: '4px', fontSize: '11px',
              background: 'rgba(255,255,255,0.07)',
              color: 'rgba(245,237,216,0.58)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontFamily: "'Josefin Sans', sans-serif",
            }}>{t}</span>
          ))}
        </div>
      )}

      {/* Arrow */}
      {(href || onClick) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1.1rem',
          color: color, fontSize: '12px', fontWeight: 600,
          fontFamily: "'Josefin Sans', sans-serif",
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Explorar <span style={{ fontSize: '15px', transition: 'transform 0.2s', transform: hovered ? 'translateX(4px)' : 'none' }}>→</span>
        </div>
      )}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return <a href={href} style={cardStyle} {...handlers}>{content}</a>;
  }
  return (
    <div style={cardStyle} onClick={onClick} {...handlers} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}
