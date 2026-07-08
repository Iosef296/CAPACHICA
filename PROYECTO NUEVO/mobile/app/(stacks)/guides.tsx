import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { guides as mockGuides } from '@/data/mock';
import { api } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

export default function Guides() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const isTravel = type === 'travel';
  const [allGuides, setAllGuides] = useState<any[]>(mockGuides);
  useLiveRefresh(() => { api.guides().then(setAllGuides); });
  const guides = allGuides.filter((g: any) => !g.type || g.type === (isTravel ? 'viaje' : 'cultural'));
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader
          eyebrow={isTravel ? 'GUÍA DE VIAJE' : 'GUÍA CULTURAL'}
          title={isTravel ? 'Cómo recorrer Capachica' : 'Capachica Cultural'}
          back
        />

        <Text style={styles.intro}>
          {isTravel
            ? 'Rutas, transporte y consejos prácticos para tu viaje.'
            : 'Historia, mitos y tradiciones vivas de la península.'}
        </Text>

        <View style={styles.list}>
          {guides.map(g => (
            <View key={g.id} style={styles.card}>
              <Image source={{ uri: g.img }} style={styles.img} />
              <View style={styles.body}>
                <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{g.title}</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]} numberOfLines={2}>
                  {g.excerpt}
                </Text>
                <Text style={[typography.labelMd, { color: colors.secondary, marginTop: spacing.stackSm }]}>
                  LEER MÁS →
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: spacing.stackLg }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { ...typography.bodyMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd },
  list: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, overflow: 'hidden', ...shadows.card },
  img: { width: '100%', height: 180 },
  body: { padding: spacing.gutter },
});
