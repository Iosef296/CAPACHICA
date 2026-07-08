import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Chip } from '@/components/Chip';
import { KillaTeaser } from '@/components/KillaTeaser';
import { dishes } from '@/data/mock';
import { api, Restaurante } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const TABS = ['Todo', 'Platos Fuertes', 'Sopas', 'Tradición Viva'];

export default function Gastronomy() {
  const [tab, setTab] = useState('Todo');
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  useLiveRefresh(() => { api.restaurantes().then(setRestaurantes); });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.hero}>
        <Image source={{ uri: 'https://picsum.photos/id/292/1200/600' }} style={StyleSheet.absoluteFillObject as any} />
        <LinearGradient colors={['transparent', 'rgba(0,66,104,0.85)']} style={StyleSheet.absoluteFillObject} />
        <SafeAreaView edges={['top']} style={{ flex: 1, padding: spacing.containerPadding, justifyContent: 'flex-end' }}>
          <ScreenHeader eyebrow="GASTRONOMÍA" title="El Legado de la Tierra" back />
        </SafeAreaView>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map(t => <Chip key={t} label={t} active={t === tab} onPress={() => setTab(t)} />)}
      </ScrollView>

      <View style={styles.list}>
        {dishes.filter(d => tab === 'Todo' || (d as any).tipo === tab).map(d => (
          <View key={d.id} style={styles.card}>
            <Image source={{ uri: d.img }} style={styles.img} />
            <View style={styles.body}>
              <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{d.name}</Text>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>{d.desc}</Text>
              <View style={styles.tag}>
                <MaterialIcons name="auto-awesome" size={14} color={colors.sunGold} />
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer }]}>
                  Inti: Pruébalo en Asoc. Tikarani
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {restaurantes.length > 0 && (
        <View style={{ marginTop: spacing.stackLg }}>
          <Text style={styles.sectionLabel}>RESTAURANTES EN CAPACHICA</Text>
          <View style={styles.list}>
            {restaurantes.slice(0, 5).map(r => (
              <View key={r.id} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                {r.imagen && <Image source={{ uri: r.imagen }} style={{ width: 80, height: 80, borderRadius: radii.md, margin: spacing.gutter }} />}
                <View style={{ flex: 1, padding: spacing.gutter, gap: 4 }}>
                  <Text style={[typography.headlineMd, { color: colors.onSurface }]} numberOfLines={1}>{r.nombre}</Text>
                  {r.direccion && <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>{r.direccion}</Text>}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <KillaTeaser />
      <View style={{ height: spacing.stackLg }} />
    </ScrollView>
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
