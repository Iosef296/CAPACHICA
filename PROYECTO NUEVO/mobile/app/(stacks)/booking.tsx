import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import { HeartButton } from '@/components/HeartButton';
import { BookingModal } from '@/components/BookingModal';
import { stays as mockStays, activities as mockActivities } from '@/data/mock';
import { api, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const LOCATIONS_DEFAULT = ['Todas', 'Llachón', 'Ccotos', 'Siale', 'Chifrón'];

export default function Booking() {
  const cfg = useAppConfig();
  const LOCATIONS: string[] = cfg.json('booking.locations', LOCATIONS_DEFAULT);
  const [loc, setLoc] = useState('Todas');
  const [activities, setActivities] = useState(mockActivities as any[]);
  const [stays, setStays] = useState(mockStays as any[]);
  const [reserva, setReserva] = useState<{ title: string; price: number; unit: string; id?: number | string } | null>(null);
  useLiveRefresh(() => {
    api.actividades().then(real => {
      if (real && real.length > 0) {
        setActivities(real.map((r: any) => ({
          id: r.id, name: r.nombre ?? r.name, duration: r.duracion ?? '—',
          price: r.precio ?? 0,
          img: r.imagen ?? r.img ?? 'https://picsum.photos/seed/' + r.id + '/600/400',
        })));
      }
    });
    api.stays().then(setStays);
  }, { url: API_WS, channels: ['actividades', 'hospedajes'] });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('booking.eyebrow', 'RESERVAS')} title={cfg.text('booking.title', 'Tu Escapada Ancestral')} back />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {LOCATIONS.map(l => <Chip key={l} label={l} active={l === loc} onPress={() => setLoc(l)} />)}
        </ScrollView>

        <Text style={styles.sectionTitle}>{cfg.text('booking.sectionHospedajes', 'HOSPEDAJES FAMILIARES')}</Text>
        <View style={styles.list}>
          {stays.filter(s => loc === 'Todas' || s.community === loc).map(s => (
            <Pressable key={s.id} style={styles.row} onPress={() => setReserva({ title: s.name, price: s.price, unit: 'noche', id: s.id })}>
              <Image source={{ uri: s.img }} style={styles.thumb} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>{s.community.toUpperCase()}</Text>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>{s.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={[typography.headlineMd, { color: colors.primary }]}>S/ {s.price}</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>/ noche</Text>
                </View>
              </View>
              <HeartButton id={`stay-${s.id}`} />
            </Pressable>
          ))}
        </View>

        {stays.filter(s => loc === 'Todas' || s.community === loc).length === 0 && (
          <Text style={[styles.emptyMsg]}>
            {cfg.text('booking.emptyHospedajes', 'No hay hospedajes en {loc} todavía.').replace('{loc}', loc)}
          </Text>
        )}

        <Text style={styles.sectionTitle}>{cfg.text('booking.sectionActividades', 'TOURS Y ACTIVIDADES')}</Text>
        <View style={styles.activityGrid}>
          {activities.map(a => (
            <Pressable key={a.id} style={styles.activityCard} onPress={() => setReserva({ title: a.name, price: a.price, unit: 'persona', id: a.id })}>
              <Image source={{ uri: a.img }} style={styles.activityImg} />
              <View style={{ padding: 12, gap: 4 }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>{a.name}</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{a.duration}</Text>
                <Text style={[typography.headlineMd, { color: colors.primary, marginTop: 2 }]}>S/ {a.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackLg }}>
          <Button label={cfg.text('booking.ctaReservar', 'Reservar ahora')} icon="event-available" onPress={() => setReserva({ title: 'Reserva personalizada', price: 120, unit: 'noche' })} />
        </View>
      </SafeAreaView>

      <BookingModal
        visible={!!reserva}
        onClose={() => setReserva(null)}
        title={reserva?.title ?? ''}
        pricePerUnit={reserva?.price ?? 0}
        unitLabel={reserva?.unit ?? 'noche'}
        activityId={reserva?.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chips: { gap: 8, paddingHorizontal: spacing.containerPadding, paddingBottom: spacing.stackSm },
  sectionTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, marginBottom: spacing.stackSm },
  list: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base, ...shadows.card },
  thumb: { width: 90, height: 90, borderRadius: radii.md },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 },
  bookBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.secondaryContainer, alignItems: 'center', justifyContent: 'center' },
  activityGrid: { paddingHorizontal: spacing.containerPadding, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.gutter },
  activityCard: { width: '47%', backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, overflow: 'hidden', ...shadows.card },
  activityImg: { width: '100%', height: 110 },
  emptyMsg: { ...typography.bodyMd, color: colors.onSurfaceVariant, textAlign: 'center', paddingHorizontal: spacing.containerPadding, paddingVertical: spacing.stackMd, fontStyle: 'italic' },
});
