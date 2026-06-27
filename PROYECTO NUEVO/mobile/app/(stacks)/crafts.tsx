import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/ScreenHeader';
import { GlassPanel } from '@/components/GlassPanel';
import { crafts, masters } from '@/data/mock';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const PALETTE = [
  { color: '#C05D38', name: 'Cochinilla' },
  { color: '#1a3a6c', name: 'Añil' },
  { color: '#d4a017', name: 'Sol Andino' },
  { color: '#6b8e23', name: 'Muña' },
];

export default function Crafts() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="ARTESANÍA" title="El Arte del Tejido Capachiqueño" back />

        <GlassPanel style={{ marginHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd }}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>SABIDURÍA ANCESTRAL · KILLA</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 4 }]}>
            Cada símbolo en un tejido cuenta una historia. El Ch'aska representa la estrella guía.
          </Text>
          <View style={styles.topicRow}>
            {['Cóndor', 'Chakana', 'Hanan/Hurin'].map(t => (
              <View key={t} style={styles.topic}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{t}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <Text style={styles.sectionTitle}>MAESTROS DEL TELAR</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {masters.map(m => (
            <View key={m.id} style={styles.master}>
              <Image source={{ uri: m.img }} style={styles.masterImg} />
              <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>{m.name}</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>{m.craft.toUpperCase()}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>GALERÍA</Text>
        <View style={styles.grid}>
          {crafts.map(c => (
            <View key={c.id} style={styles.craftCard}>
              <Image source={{ uri: c.img }} style={styles.craftImg} />
              <View style={{ padding: 12 }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>{c.name}</Text>
                <Text style={[typography.headlineMd, { color: colors.primary, marginTop: 2 }]}>S/ {c.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>TINTES DE LA TIERRA</Text>
        <View style={[styles.palette, { paddingHorizontal: spacing.containerPadding }]}>
          {PALETTE.map(p => (
            <View key={p.name} style={{ alignItems: 'center', gap: 6 }}>
              <View style={[styles.swatch, { backgroundColor: p.color }]} />
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{p.name}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.stackLg }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topicRow: { flexDirection: 'row', gap: 8, marginTop: spacing.stackSm, flexWrap: 'wrap' },
  topic: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.full, borderWidth: 1, borderColor: colors.primary },
  sectionTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, marginBottom: spacing.stackSm },
  hScroll: { gap: spacing.gutter, paddingHorizontal: spacing.containerPadding },
  master: { width: 140, gap: 4 },
  masterImg: { width: 140, height: 140, borderRadius: 70, marginBottom: 6 },
  grid: { paddingHorizontal: spacing.containerPadding, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.gutter },
  craftCard: { width: '47%', backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, overflow: 'hidden', ...shadows.card },
  craftImg: { width: '100%', height: 130 },
  palette: { flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.stackSm },
  swatch: { width: 50, height: 50, borderRadius: 25 },
});
