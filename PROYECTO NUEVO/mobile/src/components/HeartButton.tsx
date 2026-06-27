import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFavorites } from '@/data/favorites';
import { colors } from '@/theme';

export function HeartButton({ id, size = 22, light }: { id: string; size?: number; light?: boolean }) {
  const { has, toggle } = useFavorites();
  const fav = has(id);
  return (
    <Pressable onPress={() => toggle(id)} hitSlop={10} style={styles.btn}>
      <MaterialIcons
        name={fav ? 'favorite' : 'favorite-border'}
        size={size}
        color={fav ? colors.textilePink : (light ? '#fff' : colors.outline)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
