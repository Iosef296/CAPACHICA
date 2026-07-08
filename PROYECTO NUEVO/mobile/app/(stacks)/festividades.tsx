import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Chip } from '@/components/Chip';
import { api, Festividad } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const TYPES = ['Todas', 'Religiosa', 'Cultural', 'Cívica'];

export default function Festividades() {
  const [items, setItems] = useState<Festividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todas');
  const router = useRouter();

  useLiveRefresh(() => {
    api.festividades().then(data => {
      setItems(data);
      setLoading(false);
    });
  });

  const filtered = filter === 'Todas' ? items : items.filter(i => i.tipo === filter);
  const featured = items.find(i => i.destacado) ?? items[0];

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={filtered}
      keyExtractor={(item, idx) => `${item.id ?? idx}`}
      ListHeaderComponent={
        <View>
          <SafeAreaView edges={['top']}>
            <ScreenHeader eyebrow="CULTURA VIVA" title="Festividades" back />
          </SafeAreaView>

          {featured && (
            <ImageBackground source={{ uri: featured.imagen }} style={styles.hero} imageStyle={{ borderRadius: radii.xl }}>
              <LinearGradient colors={['transparent', 'rgba(0,66,104,0.9)']} style={[StyleSheet.absoluteFillObject, { borderRadius: radii.xl }]} />
              <View style={styles.heroBody}>
                <Text style={[typography.labelMd, { color: colors.sunGold }]}>DESTACADA</Text>
                <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>{featured.nombre}</Text>
                <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)' }]}>
                  📅 {featured.fecha}  ·  📍 {featured.ubicacion}
                </Text>
              </View>
            </ImageBackground>
          )}

          <View style={styles.chipsWrap}>
            {TYPES.map(t => <Chip key={t} label={t} active={t === filter} onPress={() => setFilter(t)} />)}
          </View>

          <Text style={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'festividad' : 'festividades'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.card}>
          <Image source={{ uri: item.imagen }} style={styles.thumb} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>{item.tipo.toUpperCase()}</Text>
            <Text style={[typography.headlineMd, { color: colors.onSurface }]} numberOfLines={1}>{item.nombre}</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]} numberOfLines={2}>{item.descripcion}</Text>
            <View style={styles.metaRow}>
              <MaterialIcons name="event" size={14} color={colors.outline} />
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{item.fecha}</Text>
            </View>
          </View>
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: spacing.stackLg, gap: spacing.gutter }}
      ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
    />
  );
}

const styles = StyleSheet.create({
  hero: { height: 220, marginHorizontal: spacing.containerPadding, borderRadius: radii.xl, overflow: 'hidden', justifyContent: 'flex-end' },
  heroBody: { padding: spacing.gutter },
  chipsWrap: { flexDirection: 'row', gap: 8, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, flexWrap: 'wrap' },
  count: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackSm },
  card: { flexDirection: 'row', gap: spacing.gutter, marginHorizontal: spacing.containerPadding, backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base, ...shadows.card },
  thumb: { width: 100, height: 100, borderRadius: radii.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
});
