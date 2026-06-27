import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Chip } from '@/components/Chip';
import { GlassPanel } from '@/components/GlassPanel';
import { capachicaRegion, mapPins } from '@/data/mock';
import { colors, spacing, typography } from '@/theme';

const FILTERS = ['Todo', 'Comunidades', 'Gastronomía', 'Aventura', 'Cultura'];

export default function MapScreen() {
  const [active, setActive] = useState('Todo');
  const [query, setQuery] = useState('');
  const filteredPins = useMemo(() =>
    mapPins.filter(p => p.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const selected = filteredPins[0] ?? mapPins[0];
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={capachicaRegion}
      >
        {filteredPins.map(p => (
          <Marker key={p.id} coordinate={p.coordinate} title={p.title} pinColor={colors.textilePink} />
        ))}
      </MapView>

      <SafeAreaView edges={['top']} style={styles.overlay} pointerEvents="box-none">
        <GlassPanel style={styles.searchBar}>
          <View style={styles.searchRow}>
            <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar en Capachica…"
              placeholderTextColor={colors.onSurfaceVariant}
              style={{ flex: 1, color: colors.onSurface, fontFamily: 'HankenGrotesk_400Regular', fontSize: 16 }}
            />
            <MaterialIcons name="tune" size={20} color={colors.primary} />
          </View>
        </GlassPanel>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map(f => (
            <Chip key={f} label={f} active={f === active} onPress={() => setActive(f)} />
          ))}
        </ScrollView>
      </SafeAreaView>

      <GlassPanel style={styles.pinCard}>
        <Text style={[typography.labelMd, { color: colors.secondary }]}>UBICACIÓN</Text>
        <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 2 }]}>{selected.title}</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
          {filteredPins.length} resultados · 4.9 ★
        </Text>
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { paddingHorizontal: spacing.containerPadding, paddingTop: spacing.base, gap: spacing.stackSm },
  searchBar: { paddingVertical: 4 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chips: { gap: 8, paddingVertical: 8 },
  pinCard: { position: 'absolute', left: spacing.containerPadding, right: spacing.containerPadding, bottom: spacing.stackLg },
});
