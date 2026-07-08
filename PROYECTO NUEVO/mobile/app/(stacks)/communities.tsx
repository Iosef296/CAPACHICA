import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { KillaTeaser } from '@/components/KillaTeaser';
import { communities as mockCommunities, hostFamilies, Community } from '@/data/mock';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

export default function Communities() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  useLiveRefresh(() => { api.communities().then(setCommunities); }, { url: API_WS, channels: 'comunidades' });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="CAPACHICA" title="Comunidades Ancestrales" back />

        <Text style={styles.intro}>
          Cuatro pueblos vivos en la península del Titicaca, cada uno con su sabiduría.
        </Text>

        <View style={styles.grid}>
          {communities.map((c, i) => (
            <Pressable key={c.id} onPress={() => router.push('/(stacks)/community-detail')}
              style={[styles.card, i === 0 && styles.featured]}>
              <Image source={{ uri: c.image }} style={styles.cardImg} />
              <View style={styles.cardBody}>
                {i === 0 && <Text style={styles.popular}>MÁS POPULAR</Text>}
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

        <Text style={styles.sectionTitle}>FAMILIAS ANFITRIONAS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {hostFamilies.map(f => (
            <View key={f.id} style={styles.familyCard}>
              <Image source={{ uri: f.img }} style={styles.familyImg} />
              <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>{f.name}</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>{f.community.toUpperCase()}</Text>
            </View>
          ))}
        </ScrollView>

        <KillaTeaser />
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
  cardBody: { padding: spacing.gutter, gap: 4 },
  popular: { ...typography.labelSm, color: colors.textilePink, fontFamily: 'HankenGrotesk_700Bold' },
  sectionTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackSm },
  hScroll: { gap: spacing.gutter, paddingHorizontal: spacing.containerPadding },
  familyCard: { width: 180, gap: 4 },
  familyImg: { width: 180, height: 220, borderRadius: radii.lg, marginBottom: 6 },
});
