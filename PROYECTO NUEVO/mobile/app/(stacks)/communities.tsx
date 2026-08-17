import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Chip } from '@/components/Chip';
import { communities as mockCommunities, Community } from '@/data/mock';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const TODAS = 'Todas';

export default function Communities() {
  const router = useRouter();
  const cfg = useAppConfig();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [actividad, setActividad] = useState(TODAS);
  useLiveRefresh(() => { api.communities().then(setCommunities); }, { url: API_WS, channels: 'comunidades' });

  const actividades = Array.from(new Set(
    communities.flatMap(c => Array.isArray((c as any).actividades) ? (c as any).actividades : [])
  ));
  const filtradas = actividad === TODAS
    ? communities
    : communities.filter(c => (Array.isArray((c as any).actividades) ? (c as any).actividades : []).includes(actividad));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('communities.eyebrow', 'CAPACHICA')} title={cfg.text('communities.title', 'Familias Ancestrales')} back />

        <Text style={styles.intro}>
          {cfg.text('communities.intro', 'Cuatro pueblos vivos en la península del Titicaca, cada uno con su sabiduría.')}
        </Text>

        {actividades.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Chip label={TODAS} active={actividad === TODAS} onPress={() => setActividad(TODAS)} />
            {actividades.map(a => (
              <Chip key={a} label={a} active={actividad === a} onPress={() => setActividad(a)} />
            ))}
          </ScrollView>
        )}

        <View style={styles.grid}>
          {filtradas.map(c => (
            <Pressable key={c.id} onPress={() => router.push({ pathname: '/(stacks)/community-detail', params: { id: c.id } })}
              style={[styles.card, !!(c as any).destacado && styles.featured]}>
              <View>
                <Image source={{ uri: c.image }} style={styles.cardImg} />
                {!!(c as any).video && (
                  <View style={styles.videoBadge}>
                    <MaterialIcons name="play-circle-filled" size={16} color="#fff" />
                  </View>
                )}
              </View>
              <View style={styles.cardBody}>
                {!!(c as any).destacado && <Text style={styles.popular}>{cfg.text('communities.badgePopular', 'MÁS POPULAR')}</Text>}
                <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{c.name}</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]} numberOfLines={2}>
                  {c.description}
                </Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>
                  {c.experiencesCount} EXPERIENCIAS
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {filtradas.length === 0 && (
          <Text style={styles.emptyMsg}>Ninguna familia ofrece "{actividad}" todavía.</Text>
        )}

        <View style={{ height: spacing.stackLg }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { ...typography.bodyMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd },
  chips: { gap: 8, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd },
  emptyMsg: { ...typography.bodyMd, color: colors.onSurfaceVariant, textAlign: 'center', paddingHorizontal: spacing.containerPadding, paddingVertical: spacing.stackMd, fontStyle: 'italic' },
  grid: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, overflow: 'hidden', ...shadows.card },
  featured: { borderWidth: 2, borderColor: colors.terracotta },
  cardImg: { width: '100%', height: 180 },
  videoBadge: {
    position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  cardBody: { padding: spacing.gutter, gap: 4 },
  popular: { ...typography.labelSm, color: colors.textilePink, fontFamily: 'HankenGrotesk_700Bold' },
});
