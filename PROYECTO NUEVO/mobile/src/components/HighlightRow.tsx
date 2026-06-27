import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme';

type Props = {
  image: string;
  category: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export function HighlightRow({ image, category, title, subtitle, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.row, pressed && { transform: [{ scale: 0.99 }] },
    ]}>
      <Image source={{ uri: image }} style={styles.thumb} />
      <View style={styles.body}>
        <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase' }]}>
          {category}
        </Text>
        <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>{subtitle}</Text>
        )}
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.base,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(193,199,208,0.3)',
  },
  thumb: { width: 96, height: 96, borderRadius: radii.lg },
  body: { flex: 1, gap: 2 },
});
