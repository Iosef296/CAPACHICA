export const colors = {
  surface: '#f8f9fe',
  surfaceDim: '#d8dadf',
  surfaceBright: '#f8f9fe',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f2f3f8',
  surfaceContainer: '#eceef2',
  surfaceContainerHigh: '#e7e8ed',
  surfaceContainerHighest: '#e1e2e7',
  onSurface: '#191c1f',
  onSurfaceVariant: '#41474f',
  inverseSurface: '#2e3134',
  inverseOnSurface: '#eff1f5',
  outline: '#717880',
  outlineVariant: '#c1c7d0',

  primary: '#004268',
  onPrimary: '#ffffff',
  primaryContainer: '#005a8c',
  onPrimaryContainer: '#9fd0ff',
  inversePrimary: '#95ccff',

  secondary: '#9d4320',
  onSecondary: '#ffffff',
  secondaryContainer: '#fd8c63',
  onSecondaryContainer: '#742503',

  tertiary: '#810031',
  onTertiary: '#ffffff',
  tertiaryContainer: '#ac0044',
  onTertiaryContainer: '#ffb8c3',

  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  background: '#f8f9fe',
  onBackground: '#191c1f',

  // Brand accents from DESIGN.md narrative
  titicacaBlue: '#005A8C',
  terracotta: '#C05D38',
  textilePink: '#E91E63',
  sunGold: '#FFC107',

  // Helpers
  glassBg: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
} as const;

export type ColorKey = keyof typeof colors;
