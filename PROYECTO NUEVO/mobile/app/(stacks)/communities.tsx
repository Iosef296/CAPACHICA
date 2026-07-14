import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { communities as mockCommunities, Community } from '@/data/mock';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

export default function Communities() {
  const router = useRouter();
  const cfg = useAppConfig();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  useLiveRefresh(() => { api.communities().then(setCommunities); }, { url: API_WS, channels: 'comunidades' });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('communities.eyebrow', 'CAPACHICA')} title={cfg.text('communities.title', 'Familias Ancestrales')} back />

        <Text style={styles.intro}>
          {cfg.text('communities.intro', 'Cuatro pueblos vivos en la península del Titicaca, cada uno con su sabiduría.')}
        </Text>

        <View style={styles.grid}>
          {communities.map((c, i) => (
            <Pressable key={c.id} onPress={() => router.push({ pathname: '/(stacks)/community-detail', params: { id: c.id } })}
              style={[styles.card, i === 0 && styles.featured]}>
              <View>
                <Image source={{ uri: c.image }} style={styles.cardImg} />
                {!!(c as any).video && (
                  <View style={styles.videoBadge}>
                    <MaterialIcons name="play-circle-filled" size={16} color="#fff" />
                  </View>
                )}
              </View>
              <View style={styles.cardBody}>
                {i === 0 && <Text style={styles.popular}>{cfg.text('communities.badgePopular', 'MÁS POPULAR')}</Text>}
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

        <View style={{ height: spacing.stackLg }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { ...typography.bodyMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd },
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
