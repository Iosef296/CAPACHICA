import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { guides as mockGuides } from '@/data/mock';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

export default function Guides() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const isTravel = type === 'travel';
  const cfg = useAppConfig();
  const [allGuides, setAllGuides] = useState<any[]>(mockGuides);
  useLiveRefresh(() => { api.guides().then(setAllGuides); }, { url: API_WS, channels: 'guias' });
  const guides = allGuides.filter((g: any) => !g.type || g.type === (isTravel ? 'viaje' : 'cultural'));
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader
          eyebrow={isTravel ? cfg.text('guides.travelEyebrow', 'GUÍA DE VIAJE') : cfg.text('guides.culturalEyebrow', 'GUÍA CULTURAL')}
          title={isTravel ? cfg.text('guides.travelTitle', 'Cómo recorrer Capachica') : cfg.text('guides.culturalTitle', 'Capachica Cultural')}
          back
        />

        <Text style={styles.intro}>
          {isTravel
            ? cfg.text('guides.travelIntro', 'Rutas, transporte y consejos prácticos para tu viaje.')
            : cfg.text('guides.culturalIntro', 'Historia, mitos y tradiciones vivas de la península.')}
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
                  {cfg.text('guides.readMoreLabel', 'LEER MÁS →')}
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
