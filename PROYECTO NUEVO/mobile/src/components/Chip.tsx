import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, typography } from '@/theme';

type Props = { label: string; active?: boolean; onPress?: () => void };

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={[typography.labelSm, { color: active ? '#fff' : colors.onSurfaceVariant }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: 'transparent',
  },
  active: { backgroundColor: colors.textilePink, borderColor: colors.textilePink },
});
