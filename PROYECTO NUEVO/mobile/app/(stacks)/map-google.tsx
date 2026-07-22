import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GlassPanel } from '@/components/GlassPanel';
import { Chip } from '@/components/Chip';
import { capachicaRegion, mapPins } from '@/data/mock';
import { colors, radii, spacing, typography } from '@/theme';

const FILTERS = ['Todos', 'Naturaleza', 'Cultura', 'Aventura'];

export default function MapGoogle() {
  const router = useRouter();
  const [active, setActive] = useState('Todos');
  const [selected, setSelected] = useState(mapPins[2].id);
  const insets = useSafeInsets();

  return (
    <View style={{ flex: 1 }}>
      <MapView provider={PROVIDER_GOOGLE} style={StyleSheet.absoluteFillObject} initialRegion={capachicaRegion}>
        {mapPins.map(p => (
          <Marker key={p.id} coordinate={p.coordinate} title={p.title}
            pinColor={p.id === selected ? colors.tertiary : colors.textilePink}
            onPress={() => setSelected(p.id)}
          />
        ))}
      </MapView>

      <View style={[styles.top, { paddingTop: insets.top + spacing.base }]} pointerEvents="box-none">
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color={colors.primary} />
          </Pressable>
          <GlassPanel style={{ flex: 1 }}>
            <View style={styles.searchRow}>
              <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1 }]}>Capachica…</Text>
            </View>
          </GlassPanel>
        </View>
        <View style={styles.chipsRow}>
          {FILTERS.map(f => <Chip key={f} label={f} active={f === active} onPress={() => setActive(f)} />)}
        </View>
      </View>

      <Pressable style={styles.fab}>
        <MaterialIcons name="my-location" size={24} color="#fff" />
      </Pressable>

      <GlassPanel style={[styles.previewCard, { bottom: spacing.stackLg + insets.bottom }]}>
        <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
          <Image source={{ uri: 'https://picsum.photos/id/137/400/400' }} style={styles.previewImg} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>CULTURA VIVA</Text>
            <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>Hospedaje Samary</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <MaterialIcons name="star" size={16} color={colors.sunGold} />
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>4.9 · Playa Chifrón</Text>
            </View>
          </View>
        </View>
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { paddingHorizontal: spacing.containerPadding, paddingTop: spacing.base, gap: spacing.stackSm },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackSm },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', ...{ elevation: 4 } },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chipsRow: { flexDirection: 'row', gap: 8, paddingVertical: 4, flexWrap: 'wrap' },
  fab: { position: 'absolute', right: spacing.containerPadding, bottom: 200, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', elevation: 6 },
  previewCard: { position: 'absolute', left: spacing.containerPadding, right: spacing.containerPadding, bottom: spacing.stackLg },
  previewImg: { width: 80, height: 80, borderRadius: radii.md },
});
