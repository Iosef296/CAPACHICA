import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii } from '@/theme';

type Props = ViewProps & { intensity?: number; tint?: 'light' | 'dark' | 'default' };

export function GlassPanel({ children, style, intensity = 40, tint = 'light', ...rest }: Props) {
  return (
    <BlurView intensity={intensity} tint={tint} style={[styles.panel, style]} {...rest}>
      <View style={styles.content}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  content: { padding: 16 },
});
