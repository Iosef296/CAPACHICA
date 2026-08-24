import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { GlassPanel } from '@/components/GlassPanel';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const PALETTE = [
  { color: '#C05D38', name: 'Cochinilla' },
  { color: '#1a3a6c', name: 'Añil' },
  { color: '#d4a017', name: 'Sol Andino' },
  { color: '#6b8e23', name: 'Muña' },
];

export default function Crafts() {
  const cfg = useAppConfig();
  const [crafts, setCrafts] = useState<any[]>([]);
  const [masters, setMasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useLiveRefresh(() => {
    Promise.all([api.crafts(), api.masters()]).then(([c, m]) => {
      setCrafts(c);
      setMasters(m);
      setLoading(false);
    });
  }, { url: API_WS, channels: ['artesania', 'maestros'] });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('crafts.eyebrow', 'ARTESANÍA')} title={cfg.text('crafts.title', 'El Arte del Tejido Capachiqueño')} back />

        <GlassPanel style={{ marginHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd }}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>{cfg.text('crafts.wisdomLabel', 'SABIDURÍA ANCESTRAL · KILLA')}</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 4 }]}>
            {cfg.text('crafts.wisdomText', "Cada símbolo en un tejido cuenta una historia. El Ch'aska representa la estrella guía.")}
          </Text>
          <View style={styles.topicRow}>
            {['Cóndor', 'Chakana', 'Hanan/Hurin'].map(t => (
              <View key={t} style={styles.topic}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{t}</Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        {masters.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{cfg.text('crafts.sectionMaestros', 'MAESTROS DEL TELAR')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {masters.map(m => (
                <View key={m.id} style={styles.master}>
                  <Image source={{ uri: m.img }} style={styles.masterImg} />
                  <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>{m.name}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>{m.craft.toUpperCase()}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        <Text style={styles.sectionTitle}>{cfg.text('crafts.sectionGaleria', 'GALERÍA')}</Text>
        {crafts.length === 0 ? (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', paddingVertical: spacing.stackMd, fontStyle: 'italic' }]}>
            Todavía no hay productos de artesanía cargados.
          </Text>
        ) : (
          <View style={styles.grid}>
            {crafts.map(c => (
              <View key={c.id} style={styles.craftCard}>
                {c.img ? (
                  <Image source={{ uri: c.img }} style={styles.craftImg} />
                ) : (
                  <View style={[styles.craftImg, styles.craftImgFallback]}>
                    <MaterialIcons name="palette" size={28} color={colors.onSurfaceVariant} />
                  </View>
                )}
                <View style={{ padding: 12 }}>
                  <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>{c.name}</Text>
                  <Text style={[typography.headlineMd, { color: colors.primary, marginTop: 2 }]}>S/ {c.price}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>{cfg.text('crafts.sectionTintes', 'TINTES DE LA TIERRA')}</Text>
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
  craftImgFallback: { backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  palette: { flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.stackSm },
  swatch: { width: 50, height: 50, borderRadius: 25 },
});
