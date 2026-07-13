const light = {
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
};

const dark: typeof light = {
  surface: '#101418',
  surfaceDim: '#101418',
  surfaceBright: '#363a3e',
  surfaceContainerLowest: '#0b0e11',
  surfaceContainerLow: '#191c1f',
  surfaceContainer: '#1d2024',
  surfaceContainerHigh: '#282a2e',
  surfaceContainerHighest: '#333539',
  onSurface: '#e1e2e7',
  onSurfaceVariant: '#c1c7d0',
  inverseSurface: '#e1e2e7',
  inverseOnSurface: '#2e3134',
  outline: '#8b9198',
  outlineVariant: '#41474f',

  primary: '#9fd0ff',
  onPrimary: '#003353',
  primaryContainer: '#005a8c',
  onPrimaryContainer: '#cfe5ff',
  inversePrimary: '#004268',

  secondary: '#ffb599',
  onSecondary: '#5c1a00',
  secondaryContainer: '#7a3010',
  onSecondaryContainer: '#ffdbcb',

  tertiary: '#ffb1c1',
  onTertiary: '#5e0021',
  tertiaryContainer: '#7c0032',
  onTertiaryContainer: '#ffd9e0',

  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  background: '#101418',
  onBackground: '#e1e2e7',

  titicacaBlue: '#5AB8E8',
  terracotta: '#E8905E',
  textilePink: '#FF5C8A',
  sunGold: '#FFD54F',

  glassBg: 'rgba(20, 22, 26, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  overlayDark: 'rgba(0, 0, 0, 0.85)',
};

// `colors` es un objeto MUTABLE compartido -- toda pantalla hace
// `import { colors } from '@/theme'` y lee sus propiedades en cada
// render. applyColorScheme() cambia los valores in-place (misma
// referencia) para no tener que tocar cada archivo que ya usa
// colors.algo; quien la llama es responsable de forzar un re-render
// (ver src/theme/mode.ts).
export const colors: typeof light = { ...light };

export function applyColorScheme(mode: 'light' | 'dark') {
  Object.assign(colors, mode === 'dark' ? dark : light);
}

export type ColorKey = keyof typeof colors;
