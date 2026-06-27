import { TextStyle } from 'react-native';

export const fonts = {
  serif: 'EBGaramond_600SemiBold',
  serifBold: 'EBGaramond_700Bold',
  sans: 'HankenGrotesk_400Regular',
  sansMedium: 'HankenGrotesk_500Medium',
  sansBold: 'HankenGrotesk_700Bold',
};

export const typography: Record<string, TextStyle> = {
  displayLg: {
    fontFamily: fonts.serif,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
  },
  headlineLg: {
    fontFamily: fonts.serif,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 34,
  },
  headlineMd: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 32,
  },
  bodyLg: {
    fontFamily: fonts.sans,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  labelMd: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  labelSm: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 16,
  },
};
