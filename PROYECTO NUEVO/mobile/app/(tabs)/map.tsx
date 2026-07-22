import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Chip } from '@/components/Chip';
import { GlassPanel } from '@/components/GlassPanel';
import { UbicacionEditModal } from '@/components/UbicacionEditModal';
import { capachicaRegion } from '@/data/mock';
import { ubicaciones as ubicacionesApi, Ubicacion, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { useAppConfig } from '@/data/AppConfigContext';
import { useAuth } from '@/auth/AuthContext';
import { colors, spacing, typography } from '@/theme';

const FILTERS_DEFAULT = ['Todo', 'Familias', 'Gastronomía', 'Aventura', 'Cultura'];

type ModalPin = { id?: number; titulo: string; descripcion?: string; latitud: number; longitud: number };

export default function MapScreen() {
  const cfg = useAppConfig();
  const { user } = useAuth();
  const isAdmin = user?.rol === 'admin';
  const FILTERS: string[] = cfg.json('map.filters', FILTERS_DEFAULT);
  const [active, setActive] = useState('Todo');
  const [query, setQuery] = useState('');
  const [pins, setPins] = useState<Ubicacion[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [modalPin, setModalPin] = useState<ModalPin | null>(null);
  const insets = useSafeInsets();

  useLiveRefresh(() => { ubicacionesApi.listar().then(setPins); }, { url: API_WS, channels: 'ubicaciones' });

  const filteredPins = useMemo(() =>
    pins.filter(p => p.titulo.toLowerCase().includes(query.toLowerCase())),
    [pins, query]
  );
  const selected = filteredPins[0] ?? pins[0];

  function handleLongPress(coord: LatLng) {
    if (!editMode) return;
    setModalPin({ titulo: '', latitud: coord.latitude, longitud: coord.longitude });
  }

  function handleMarkerPress(p: Ubicacion) {
    if (!editMode) return;
    setModalPin({ id: p.id, titulo: p.titulo, descripcion: p.descripcion ?? '', latitud: p.latitud, longitud: p.longitud });
  }

  function handleDragEnd(id: number, coord: LatLng) {
    setPins(prev => prev.map(p => (p.id === id ? { ...p, latitud: coord.latitude, longitud: coord.longitude } : p)));
    ubicacionesApi.actualizar(id, { latitud: coord.latitude, longitud: coord.longitude }).catch(() => {});
  }

  function handleSaved(pin: Ubicacion) {
    setPins(prev => (prev.some(p => p.id === pin.id) ? prev.map(p => (p.id === pin.id ? pin : p)) : [...prev, pin]));
    setModalPin(null);
  }

  function handleDeleted(id: number) {
    setPins(prev => prev.filter(p => p.id !== id));
    setModalPin(null);
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={capachicaRegion}
        onLongPress={e => handleLongPress(e.nativeEvent.coordinate)}
      >
        {filteredPins.map(p => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitud, longitude: p.longitud }}
            title={p.titulo}
            pinColor={editMode ? colors.primary : colors.textilePink}
            draggable={editMode}
            onDragEnd={e => handleDragEnd(p.id, e.nativeEvent.coordinate)}
            onPress={() => handleMarkerPress(p)}
          />
        ))}
      </MapView>

      <View style={[styles.overlay, { paddingTop: insets.top + spacing.base }]} pointerEvents="box-none">
        <GlassPanel style={styles.searchBar}>
          <View style={styles.searchRow}>
            <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={cfg.text('map.searchPlaceholder', 'Buscar en Capachica…')}
              placeholderTextColor={colors.onSurfaceVariant}
              style={{ flex: 1, color: colors.onSurface, fontFamily: 'HankenGrotesk_400Regular', fontSize: 16 }}
            />
            {isAdmin && (
              <Pressable onPress={() => setEditMode(v => !v)} hitSlop={8}>
                <MaterialIcons name={editMode ? 'edit-location-alt' : 'edit-location'} size={20} color={editMode ? colors.primary : colors.onSurfaceVariant} />
              </Pressable>
            )}
          </View>
        </GlassPanel>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map(f => (
            <Chip key={f} label={f} active={f === active} onPress={() => setActive(f)} />
          ))}
        </ScrollView>

        {isAdmin && editMode && (
          <GlassPanel style={styles.editHint}>
            <Text style={[typography.labelSm, { color: colors.onSurface }]}>
              Modo edición: mantén presionado el mapa para agregar un pin, toca uno para editarlo, o arrástralo para moverlo.
            </Text>
          </GlassPanel>
        )}
      </View>

      {!!selected && (
        <GlassPanel style={styles.pinCard}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>{cfg.text('map.locationEyebrow', 'UBICACIÓN')}</Text>
          <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 2 }]}>{selected.titulo}</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
            {filteredPins.length} resultados · 4.9 ★
          </Text>
        </GlassPanel>
      )}

      <UbicacionEditModal pin={modalPin} onClose={() => setModalPin(null)} onSaved={handleSaved} onDeleted={handleDeleted} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { paddingHorizontal: spacing.containerPadding, paddingTop: spacing.base, gap: spacing.stackSm },
  searchBar: { paddingVertical: 4 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chips: { gap: 8, paddingVertical: 8 },
  editHint: { padding: spacing.stackSm },
  pinCard: { position: 'absolute', left: spacing.containerPadding, right: spacing.containerPadding, bottom: spacing.stackLg },
});
