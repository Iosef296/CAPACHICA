import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassPanel } from './GlassPanel';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type Props = {
  image: string;
  title: string;
  badge?: { label: string; tone?: 'primary' | 'tertiary' };
  rating?: { value: number; reviews: number };
  onPress?: () => void;
  width?: number;
  height?: number;
};

export function PhotoCard({ image, title, badge, rating, onPress, width = 288, height = 380 }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.card,
      { width, height },
      pressed && { transform: [{ scale: 0.98 }] },
    ]}>
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={{ borderRadius: radii.xl }}>
        <LinearGradient
          colors={['transparent', 'transparent', colors.overlayDark]}
          style={StyleSheet.absoluteFillObject}
        />
        <GlassPanel style={styles.footer}>
          {badge && (
            <View style={[
              styles.badge,
              { backgroundColor: badge.tone === 'tertiary' ? colors.tertiary : colors.primary },
            ]}>
              <Text style={[typography.labelSm, { color: '#fff' }]}>{badge.label}</Text>
            </View>
          )}
          <Text style={[typography.headlineMd, { color: colors.onBackground }]} numberOfLines={2}>{title}</Text>
          {rating && (
            <View style={styles.rating}>
              <MaterialIcons name="star" size={16} color={colors.sunGold} />
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                {rating.value} ({rating.reviews} reseñas)
              </Text>
            </View>
          )}
        </GlassPanel>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  image: { flex: 1, justifyContent: 'flex-end' },
  footer: { margin: 16 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    marginBottom: 4,
  },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
});
