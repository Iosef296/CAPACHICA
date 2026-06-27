import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@/theme';

type Props = { image: string; name: string };

export function StoryAvatar({ image, name }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.ring}>
        <Image source={{ uri: image }} style={styles.img} />
      </View>
      <Text style={[typography.labelSm, { color: colors.onSurface, textAlign: 'center', fontSize: 10 }]}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6, width: 80 },
  ring: {
    width: 64, height: 64, borderRadius: 32, padding: 2,
    borderWidth: 2, borderColor: colors.secondary,
  },
  img: { width: '100%', height: '100%', borderRadius: 30 },
});
