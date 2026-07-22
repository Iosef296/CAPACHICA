import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Button } from '@/components/Button';
import { ReservaDetailModal } from '@/components/ReservaDetailModal';
import { useRouter } from 'expo-router';
import { useAuth } from '@/auth/AuthContext';
import { reservas as reservasApi, ReservaMia, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const ESTADO_LABEL: Record<string, string> = { pendiente: 'PENDIENTE', confirmada: 'CONFIRMADA', cancelada: 'CANCELADA' };
const ESTADO_COLOR: Record<string, string> = { pendiente: colors.terracotta, confirmada: colors.secondary, cancelada: colors.error };

export default function Reservas() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const cfg = useAppConfig();
  const [reservas, setReservas] = useState<ReservaMia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  useLiveRefresh(() => {
    if (!user) { setLoading(false); return; }
    reservasApi.mias().then(setReservas).catch(() => setReservas([])).finally(() => setLoading(false));
  }, { url: API_WS, channels: ['reservas'] });

  const selected = reservas.find(r => r.id === selectedId) ?? null;

  function handleUpdated(actualizada: ReservaMia) {
    setReservas(prev => prev.map(r => (r.id === actualizada.id ? actualizada : r)));
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('reservasTab.eyebrow', 'VIAJES')} title={t('tabs.reservas')} />

        {!user ? (
          <View style={styles.empty}>
            <MaterialIcons name="lock-outline" size={64} color={colors.outlineVariant} />
            <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: spacing.gutter }]}>
              {cfg.text('reservasTab.emptyLoginTitle', 'Inicia sesión para ver tus reservas')}
            </Text>
            <Button label="Iniciar sesión" icon="login" onPress={() => router.replace('/(auth)/login')} style={{ marginTop: spacing.stackMd, alignSelf: 'stretch' }} />
          </View>
        ) : loading ? (
          <View style={styles.empty}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : reservas.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="event-busy" size={64} color={colors.outlineVariant} />
            <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: spacing.gutter }]}>
              {cfg.text('reservasTab.emptyTitle', 'Sin reservas aún')}
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 6 }]}>
              {cfg.text('reservasTab.emptySubtitle', 'Explora experiencias y reserva tu próximo viaje a Capachica.')}
            </Text>
            <Button label={cfg.text('reservasTab.emptyCta', 'Ver experiencias')} icon="explore" onPress={() => router.push('/(stacks)/booking')} style={{ marginTop: spacing.stackMd, alignSelf: 'stretch' }} />
          </View>
        ) : (
          <View style={{ paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, marginTop: spacing.gutter, marginBottom: spacing.stackLg }}>
            {reservas.map(r => (
              <Pressable key={r.id} style={styles.card} onPress={() => setSelectedId(r.id)}>
                <View style={styles.cardHead}>
                  <Text style={[typography.labelMd, { color: ESTADO_COLOR[r.estado] ?? colors.secondary }]}>
                    {ESTADO_LABEL[r.estado] ?? r.estado.toUpperCase()}
                  </Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                    {new Date(r.created_at).toLocaleDateString('es-PE')}
                  </Text>
                </View>
                <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 4 }]}>{r.actividad}</Text>
                <View style={styles.metaRow}>
                  <MetaItem icon="event" label={new Date(r.fecha_visita).toLocaleDateString('es-PE')} />
                  <MetaItem icon="group" label={`${r.personas} personas`} />
                  <MetaItem icon="payments" label={`S/ ${r.precio_total}`} />
                </View>
                <View style={styles.viewMore}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>{cfg.text('reservasTab.viewDetailLabel', 'Ver detalle')}</Text>
                  <MaterialIcons name="chevron-right" size={18} color={colors.primary} />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </SafeAreaView>

      <ReservaDetailModal reserva={selected} onClose={() => setSelectedId(null)} onUpdated={handleUpdated} />
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
  viewMore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: spacing.stackSm },
});
