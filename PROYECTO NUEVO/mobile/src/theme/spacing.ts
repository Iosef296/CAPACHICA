export const spacing = {
  base: 8,
  stackSm: 12,
  stackMd: 24,
  stackLg: 40,
  gutter: 16,
  containerPadding: 24,
} as const;

export const radii = {
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#004268',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 4,
  },
  navTop: {
    shadowColor: '#004268',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 8,
  },
} as const;
