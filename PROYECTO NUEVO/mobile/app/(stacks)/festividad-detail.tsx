import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { api, Festividad } from '@/data/api';
import { colors, radii, spacing, typography } from '@/theme';

export default function FestividadDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [item, setItem] = useState<Festividad | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeInsets();

  useEffect(() => {
    api.festividades().then(list => {
      const found = id ? list.find(f => String(f.id) === String(id)) : null;
      setItem(found ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: spacing.gutter, padding: spacing.containerPadding }}>
        <MaterialIcons name="celebration" size={48} color={colors.outlineVariant} />
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>No se encontró esta festividad.</Text>
        <Button label="Volver" icon="arrow-back" onPress={() => router.back()} />
      </View>
    );
  }

  const actividades = Array.isArray(item.actividades) ? item.actividades : [];
  const galeria = Array.isArray(item.galeria) ? item.galeria : [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: spacing.stackLg + insets.bottom }}>
      <ImageBackground source={{ uri: item.imagen }} style={styles.hero}>
        <LinearGradient colors={['rgba(0,66,104,0.1)', 'rgba(0,66,104,0.85)']} style={StyleSheet.absoluteFillObject} />
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: insets.top + 8 }]}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <View style={styles.heroBody}>
          <Text style={[typography.labelMd, { color: colors.sunGold }]}>{item.tipo?.toUpperCase()}</Text>
          <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>{item.nombre}</Text>
          <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)', marginTop: 6 }]}>
            📅 {item.fecha}  ·  📍 {item.ubicacion}
          </Text>
        </View>
      </ImageBackground>

      {actividades.length > 0 && (
        <View style={styles.tagsRow}>
          {actividades.map(a => (
            <View key={a} style={styles.tagChip}>
              <Text style={[typography.labelSm, { color: colors.primary }]}>{a}</Text>
            </View>
          ))}
        </View>
      )}

      {!!item.descripcion && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Sobre esta festividad</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>{item.descripcion}</Text>
        </View>
      )}

      {galeria.length > 0 && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Galería</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRow}>
            {galeria.map((url, i) => (
              <Image key={url + i} source={{ uri: url }} style={styles.galleryImg} />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 300 },
  backBtn: {
    position: 'absolute', left: spacing.containerPadding, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  heroBody: { marginTop: 'auto', padding: spacing.containerPadding },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd },
  tagChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.full, backgroundColor: colors.surfaceContainerLow, borderWidth: 1, borderColor: colors.outlineVariant },
  section: { paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg },
  galleryRow: { gap: 8, marginTop: 10 },
  galleryImg: { width: 180, height: 120, borderRadius: radii.md },
});
