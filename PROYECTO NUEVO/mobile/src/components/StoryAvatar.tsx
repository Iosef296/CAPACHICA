import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography } from '@/theme';

type Props = { image: string; name: string; onPress?: () => void; isAdd?: boolean };

export function StoryAvatar({ image, name, onPress, isAdd }: Props) {
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      <View style={[styles.ring, isAdd && styles.ringAdd]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <View style={[styles.img, styles.imgFallback]}>
            <MaterialIcons name="person" size={24} color={colors.onSurfaceVariant} />
          </View>
        )}
        {isAdd && (
          <View style={styles.plusBadge}>
            <MaterialIcons name="add" size={14} color="#fff" />
          </View>
        )}
      </View>
      <Text style={[typography.labelSm, { color: colors.onSurface, textAlign: 'center', fontSize: 10 }]} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6, width: 80 },
  ring: {
    width: 64, height: 64, borderRadius: 32, padding: 2,
    borderWidth: 2, borderColor: colors.secondary,
  },
  ringAdd: { borderColor: colors.outlineVariant, borderStyle: 'dashed' },
  img: { width: '100%', height: '100%', borderRadius: 30 },
  imgFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
  plusBadge: {
    position: 'absolute', right: -2, bottom: -2,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.terracotta,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.background,
  },
});
