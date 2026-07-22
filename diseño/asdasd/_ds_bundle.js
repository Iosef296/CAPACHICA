/* @ds-bundle: {"format":3,"namespace":"CapachicaDesignSystem_756025","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"e3363549f6ab","components/core/Button.jsx":"2d2310384050","components/core/Card.jsx":"c1ea69ea68f6","components/core/SectionLabel.jsx":"acebadab77b7","components/core/Tag.jsx":"5e7f4d6d64ba","ui_kits/app-movil/android-frame.jsx":"70c8c3059eeb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CapachicaDesignSystem_756025 = window.CapachicaDesignSystem_756025 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const variantStyles = {
  clay: {
    bg: 'rgba(184,83,31,0.16)',
    border: 'rgba(184,83,31,0.40)',
    color: '#DE8649'
  },
  gold: {
    bg: 'rgba(201,144,58,0.14)',
    border: 'rgba(201,144,58,0.40)',
    color: '#C9903A'
  },
  lake: {
    bg: 'rgba(42,116,184,0.14)',
    border: 'rgba(42,116,184,0.40)',
    color: '#5096D4'
  },
  reed: {
    bg: 'rgba(90,142,32,0.14)',
    border: 'rgba(90,142,32,0.40)',
    color: '#7AAF38'
  },
  neutral: {
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.14)',
    color: 'rgba(245,237,216,0.70)'
  },
  success: {
    bg: 'rgba(90,142,32,0.14)',
    border: 'rgba(90,142,32,0.40)',
    color: '#7AAF38'
  },
  danger: {
    bg: 'rgba(184,83,31,0.18)',
    border: 'rgba(184,83,31,0.45)',
    color: '#C96832'
  }
};

/**
 * Capachica Badge — status, category or count indicator.
 */
function Badge({
  children,
  variant = 'clay',
  dot = false,
  size = 'sm'
}) {
  const v = variantStyles[variant] || variantStyles.neutral;
  const fontSize = size === 'lg' ? '12px' : size === 'xs' ? '9px' : '10px';
  const padding = size === 'lg' ? '5px 12px' : size === 'xs' ? '2px 7px' : '3px 9px';
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      lineHeight: 1
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: v.color,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeMap = {
  sm: {
    padding: '7px 16px',
    fontSize: '12px',
    borderRadius: '4px',
    gap: '6px'
  },
  md: {
    padding: '11px 24px',
    fontSize: '14px',
    borderRadius: '6px',
    gap: '8px'
  },
  lg: {
    padding: '15px 32px',
    fontSize: '16px',
    borderRadius: '8px',
    gap: '10px'
  }
};
const variantMap = {
  primary: {
    background: 'linear-gradient(135deg,#B8531F,#7C2D0C)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 4px 18px rgba(184,83,31,0.36)'
  },
  secondary: {
    background: 'transparent',
    color: '#C9903A',
    border: '1.5px solid rgba(201,144,58,0.50)',
    boxShadow: 'none'
  },
  ghost: {
    background: 'transparent',
    color: 'rgba(245,237,216,0.70)',
    border: '1px solid rgba(184,83,31,0.24)',
    boxShadow: 'none'
  },
  danger: {
    background: 'linear-gradient(135deg,#9A3F14,#5C1E08)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 4px 14px rgba(92,30,8,0.50)'
  },
  lake: {
    background: 'linear-gradient(135deg,#2A74B8,#154480)',
    color: '#F5EDD8',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 4px 18px rgba(42,116,184,0.36)'
  }
};
const hoverMap = {
  primary: {
    background: 'linear-gradient(135deg,#C96832,#9A3F14)',
    boxShadow: '0 8px 32px rgba(184,83,31,0.55)'
  },
  secondary: {
    background: 'rgba(201,144,58,0.12)',
    borderColor: 'rgba(201,144,58,0.80)'
  },
  ghost: {
    background: 'rgba(184,83,31,0.10)',
    color: '#F5EDD8'
  },
  danger: {
    background: 'linear-gradient(135deg,#B8531F,#7C2D0C)',
    boxShadow: '0 8px 28px rgba(184,83,31,0.45)'
  },
  lake: {
    background: 'linear-gradient(135deg,#5096D4,#2A74B8)',
    boxShadow: '0 8px 28px rgba(42,116,184,0.50)'
  }
};

/**
 * Capachica Button component.
 * @param {ButtonProps} props
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  icon,
  fullWidth = false,
  type = 'button'
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
    ...(sizeMap[size] || sizeMap.md),
    ...(variantMap[variant] || variantMap.primary),
    ...(hovered && !disabled ? hoverMap[variant] || {} : {})
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, icon), children);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      style: base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    }, inner);
  }
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: disabled ? undefined : onClick,
    style: base,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Rustic destination / experience card for Capachica.
 */
function Card({
  title,
  subtitle,
  description,
  href,
  color = '#B8531F',
  gradient,
  tags = [],
  icon,
  onClick
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
    boxShadow: hovered && (href || onClick) ? `0 16px 40px rgba(${rgb},0.22), 0 4px 12px rgba(16,8,4,0.50)` : `0 2px 8px rgba(16,8,4,0.40)`,
    position: 'relative',
    overflow: 'hidden'
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -32,
      right: -32,
      width: 110,
      height: 110,
      borderRadius: '50%',
      background: `radial-gradient(circle, rgba(${rgb},0.16) 0%, transparent 70%)`,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.9rem'
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2.2rem',
      lineHeight: 1
    }
  }, icon), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: `rgba(${rgb},0.14)`,
      color: color,
      border: `1px solid rgba(${rgb},0.28)`,
      fontFamily: "'Josefin Sans', sans-serif"
    }
  }, subtitle)), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.15rem',
      fontWeight: 700,
      color: '#F5EDD8',
      marginBottom: '0.55rem',
      lineHeight: 1.3
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Lora', Georgia, serif",
      fontSize: '0.84rem',
      color: 'rgba(245,237,216,0.65)',
      lineHeight: 1.75,
      marginBottom: tags.length ? '1rem' : '0'
    }
  }, description), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginTop: '0.8rem'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: '3px 9px',
      borderRadius: '4px',
      fontSize: '11px',
      background: 'rgba(255,255,255,0.07)',
      color: 'rgba(245,237,216,0.58)',
      border: '1px solid rgba(255,255,255,0.10)',
      fontFamily: "'Josefin Sans', sans-serif"
    }
  }, t))), (href || onClick) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginTop: '1.1rem',
      color: color,
      fontSize: '12px',
      fontWeight: 600,
      fontFamily: "'Josefin Sans', sans-serif",
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "Explorar ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px',
      transition: 'transform 0.2s',
      transform: hovered ? 'translateX(4px)' : 'none'
    }
  }, "\u2192")));
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  };
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: cardStyle
    }, handlers), content);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: cardStyle,
    onClick: onClick
  }, handlers, {
    role: onClick ? 'button' : undefined
  }), content);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
/**
 * Capachica SectionLabel — rustic eyebrow / section identifier.
 * Replaces pill-shaped section badges with an angular Andean-inspired label.
 */
function SectionLabel({
  children,
  icon = '✦',
  color = 'warm'
}) {
  const colorMap = {
    warm: {
      bg: 'rgba(201,144,58,0.10)',
      border: 'rgba(201,144,58,0.38)',
      text: '#C9903A'
    },
    clay: {
      bg: 'rgba(184,83,31,0.10)',
      border: 'rgba(184,83,31,0.38)',
      text: '#DE8649'
    },
    lake: {
      bg: 'rgba(42,116,184,0.10)',
      border: 'rgba(42,116,184,0.38)',
      text: '#5096D4'
    },
    reed: {
      bg: 'rgba(90,142,32,0.10)',
      border: 'rgba(90,142,32,0.38)',
      text: '#7AAF38'
    },
    muted: {
      bg: 'rgba(255,255,255,0.05)',
      border: 'rgba(255,255,255,0.14)',
      text: 'rgba(245,237,216,0.55)'
    }
  };
  const c = colorMap[color] || colorMap.warm;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      lineHeight: 1
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9px',
      opacity: 0.8
    }
  }, icon), children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Capachica Tag — inline filter chip or category label.
 */
function Tag({
  children,
  active = false,
  onClick,
  color
}) {
  const [hovered, setHovered] = React.useState(false);
  const isInteractive = !!onClick;
  const on = active || isInteractive && hovered;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
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
      background: on ? `rgba(${color ? hexToRgb(color) : '184,83,31'},0.18)` : 'rgba(255,255,255,0.06)',
      border: on ? `1px solid rgba(${color ? hexToRgb(color) : '184,83,31'},0.55)` : '1px solid rgba(255,255,255,0.12)',
      color: on ? color || '#DE8649' : 'rgba(245,237,216,0.58)'
    }
  }, children);
}
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-movil/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-movil/android-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Tag = __ds_scope.Tag;

})();
