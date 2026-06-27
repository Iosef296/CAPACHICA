import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'killa';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof MaterialIcons.glyphMap;
  style?: ViewStyle;
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', icon, style, disabled }: Props) {
  const inner = (
    <View style={styles.inner}>
      {icon && <MaterialIcons name={icon} size={20} color={textColor(variant)} />}
      <Text style={[typography.labelMd, { color: textColor(variant) }]}>{label}</Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
        styles.base, pressed && styles.pressed, style,
      ]}>
        <LinearGradient colors={[colors.primaryContainer, colors.primary]} style={styles.fill}>
          {inner}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'killa') {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
        styles.base,
        styles.killa,
        pressed && styles.pressed,
        style,
      ]}>
        {inner}
      </Pressable>
    );
  }

  const bg =
    variant === 'secondary' ? colors.secondaryContainer :
    'transparent';
  const border = variant === 'ghost' ? 2 : 0;

  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
      styles.base,
      { backgroundColor: bg, borderWidth: border, borderColor: colors.terracotta },
      pressed && styles.pressed,
      style,
    ]}>
      {inner}
    </Pressable>
  );
}

function textColor(v: Variant) {
  switch (v) {
    case 'primary': return colors.onPrimary;
    case 'secondary': return colors.onSecondaryContainer;
    case 'killa': return colors.onSecondaryContainer;
    case 'ghost': return colors.terracotta;
  }
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radii.lg,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.stackMd },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: spacing.stackMd,
  },
  killa: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: radii.full,
    shadowColor: colors.secondaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.95 },
});
