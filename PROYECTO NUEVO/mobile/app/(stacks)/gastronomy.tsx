import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Chip } from '@/components/Chip';
import { api, API_WS, Restaurante } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const TODO = 'Todo';

export default function Gastronomy() {
  const cfg = useAppConfig();
  const [tab, setTab] = useState(TODO);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [pastHero, setPastHero] = useState(false);
  const insets = useSafeInsets();
  useLiveRefresh(() => {
    api.restaurantes().then(setRestaurantes);
    api.platos().then(setDishes);
  }, { url: API_WS, channels: ['restaurantes', 'platos'] });
  // Pestañas armadas con las categorías reales que traen los platos --
  // nada de rótulos inventados que no correspondan a ningún dato real.
  const TABS = [TODO, ...Array.from(new Set(dishes.map(d => d.categoria).filter(Boolean)))];
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      onScroll={e => setPastHero(e.nativeEvent.contentOffset.y > styles.hero.height - insets.top)}
    >
      <View style={styles.hero}>
        <Image source={{ uri: 'https://picsum.photos/id/292/1200/600' }} style={StyleSheet.absoluteFillObject as any} />
        <LinearGradient colors={['transparent', 'rgba(0,66,104,0.85)']} style={StyleSheet.absoluteFillObject} />
        <View style={{ flex: 1, padding: spacing.containerPadding, justifyContent: 'flex-end' }}>
          <ScreenHeader eyebrow={cfg.text('gastronomy.eyebrow', 'GASTRONOMÍA')} title={cfg.text('gastronomy.title', 'El Legado de la Tierra')} back />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map(t => <Chip key={t} label={t} active={t === tab} onPress={() => setTab(t)} />)}
      </ScrollView>

      <View style={styles.list}>
        {dishes.length === 0 && (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', paddingVertical: spacing.stackMd, fontStyle: 'italic' }]}>
            Todavía no hay platos cargados.
          </Text>
        )}
        {dishes.filter(d => tab === TODO || d.categoria === tab).map(d => (
          <View key={d.id} style={styles.card}>
            {!!d.foto && <Image source={{ uri: d.foto }} style={styles.img} />}
            <View style={styles.body}>
              <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{d.nombre}</Text>
              {!!d.descripcion && (
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>{d.descripcion}</Text>
              )}
              {!!d.restaurante_nombre && (
                <View style={styles.tag}>
                  <MaterialIcons name="storefront" size={14} color={colors.sunGold} />
                  <Text style={[typography.labelSm, { color: colors.onPrimaryContainer }]}>
                    {d.restaurante_nombre}{d.precio != null ? ` · S/ ${d.precio}` : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {restaurantes.length > 0 && (
        <View style={{ marginTop: spacing.stackLg }}>
          <Text style={styles.sectionLabel}>{cfg.text('gastronomy.sectionRestaurantes', 'RESTAURANTES EN CAPACHICA')}</Text>
          <View style={styles.list}>
            {restaurantes.slice(0, 5).map(r => (
              <View key={r.id} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                {!!r.fotos?.[0] && <Image source={{ uri: r.fotos[0] }} style={{ width: 80, height: 80, borderRadius: radii.md, margin: spacing.gutter }} />}
                <View style={{ flex: 1, padding: spacing.gutter, gap: 4 }}>
                  <Text style={[typography.headlineMd, { color: colors.onSurface }]} numberOfLines={1}>{r.nombre}</Text>
                  {r.direccion && <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>{r.direccion}</Text>}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: spacing.stackLg + insets.bottom }} />
    </ScrollView>
      {pastHero && (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: colors.background }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 200, backgroundColor: colors.primary, overflow: 'hidden' },
  tabs: { gap: 8, paddingHorizontal: spacing.containerPadding, paddingVertical: spacing.stackSm },
  list: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, overflow: 'hidden', ...shadows.card },
  img: { width: '100%', height: 200 },
  body: { padding: spacing.gutter },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.stackSm, alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radii.full },
  sectionLabel: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackSm },
});
