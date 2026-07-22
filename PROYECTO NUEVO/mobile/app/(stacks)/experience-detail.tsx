import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { HeartButton } from '@/components/HeartButton';
import { BookingModal } from '@/components/BookingModal';
import { api, Actividad } from '@/data/api';
import { colors, spacing, typography } from '@/theme';

const COVER_FALLBACK = 'https://picsum.photos/id/177/1600/900';

export default function ExperienceDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [showModal, setShowModal] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [actividad, setActividad] = useState<Actividad | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeInsets();

  useEffect(() => {
    api.actividades().then(list => {
      const found = id ? list.find(a => String(a.id) === String(id)) : list[0];
      setActividad(found ?? null);
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

  if (!actividad) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: spacing.gutter, padding: spacing.containerPadding }}>
        <MaterialIcons name="explore-off" size={48} color={colors.outlineVariant} />
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>No se encontró esta experiencia.</Text>
        <Button label="Volver" icon="arrow-back" onPress={() => router.back()} />
      </View>
    );
  }

  const precio = actividad.precio ?? 0;
  const meta = [actividad.duracion, actividad.ubicacion, precio ? `S/ ${precio}` : null].filter(Boolean).join(' · ');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      onScroll={e => setPastHero(e.nativeEvent.contentOffset.y > styles.hero.height - insets.top)}
    >
      <ImageBackground source={{ uri: actividad.imagen || COVER_FALLBACK }} style={styles.hero}>
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,66,104,0.85)']} style={StyleSheet.absoluteFillObject} />
        <View style={[styles.heroTop, { marginTop: insets.top + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.iconBtn}>
            <HeartButton id={`exp-${actividad.id}`} light size={24} />
          </View>
        </View>
        <View style={styles.heroBody}>
          <Text style={[typography.labelMd, { color: colors.sunGold }]}>EXPERIENCIA VIVENCIAL</Text>
          <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>{actividad.nombre}</Text>
          {!!meta && <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)' }]}>{meta}</Text>}
        </View>
      </ImageBackground>

      {!!actividad.descripcion && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Lo que vivirás</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
            {actividad.descripcion}
          </Text>
        </View>
      )}

      <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackLg + insets.bottom }}>
        <Button label={precio ? `Reservar por S/ ${precio}` : 'Reservar'} icon="event-available" onPress={() => setShowModal(true)} />
      </View>

      <BookingModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={actividad.nombre}
        pricePerUnit={precio}
        unitLabel="persona"
        activityId={actividad.id}
      />
    </ScrollView>
      {pastHero && (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: colors.background }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 380 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.containerPadding, marginTop: 40 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  heroBody: { marginTop: 'auto', padding: spacing.containerPadding },
  section: { paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg },
});
