import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type Reserva = { id: number; title: string; days: number; guests: number; total: number; createdAt: string };

export default function MyBookings() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('capachica.reservas').then(raw => setReservas(raw ? JSON.parse(raw) : []));
  }, []);

  async function clear() {
    await AsyncStorage.removeItem('capachica.reservas');
    setReservas([]);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="VIAJES" title="Mis Reservas" back />

        {reservas.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="event-busy" size={64} color={colors.outlineVariant} />
            <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: spacing.gutter }]}>
              Sin reservas aún
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 6 }]}>
              Explora experiencias y reserva tu próximo viaje a Capachica.
            </Text>
            <Button label="Ver experiencias" icon="explore" onPress={() => router.push('/(stacks)/booking')} style={{ marginTop: spacing.stackMd, alignSelf: 'stretch' }} />
          </View>
        ) : (
          <View style={{ paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, marginTop: spacing.gutter }}>
            {reservas.map(r => (
              <View key={r.id} style={styles.card}>
                <View style={styles.cardHead}>
                  <Text style={[typography.labelMd, { color: colors.secondary }]}>CONFIRMADA</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                    {new Date(r.createdAt).toLocaleDateString('es-PE')}
                  </Text>
                </View>
                <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 4 }]}>{r.title}</Text>
                <View style={styles.metaRow}>
                  <MetaItem icon="event" label={`${r.days} días`} />
                  <MetaItem icon="group" label={`${r.guests} personas`} />
                  <MetaItem icon="payments" label={`S/ ${r.total}`} />
                </View>
              </View>
            ))}
            <Button label="Limpiar todas" variant="ghost" icon="delete-outline" onPress={clear} style={{ marginVertical: spacing.stackMd }} />
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

function MetaItem({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.meta}>
      <MaterialIcons name={icon} size={16} color={colors.primary} />
      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { padding: spacing.stackLg, alignItems: 'center', marginTop: spacing.stackLg },
  card: { backgroundColor: colors.surfaceContainerLowest, padding: spacing.gutter, borderRadius: radii.lg, ...shadows.card },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between' },
  metaRow: { flexDirection: 'row', gap: spacing.stackMd, marginTop: spacing.stackSm, flexWrap: 'wrap' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
