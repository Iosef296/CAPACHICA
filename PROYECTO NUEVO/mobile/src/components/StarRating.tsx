import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRatings } from '@/data/ratings';
import { colors } from '@/theme';

export function StarRating({ id, size = 28 }: { id: string; size?: number }) {
  const { get, rate } = useRatings();
  const value = get(id);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(n => (
        <Pressable key={n} onPress={() => rate(id, n)} hitSlop={6}>
          <MaterialIcons
            name={n <= value ? 'star' : 'star-border'}
            size={size}
            color={n <= value ? colors.sunGold : colors.outlineVariant}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
});
