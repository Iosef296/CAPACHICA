import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { Chip } from './Chip';
import { reservas as reservasApi, ReservaMia } from '@/data/api';
import { colors, radii, spacing, typography } from '@/theme';

const IDIOMAS = ['Español', 'English', 'Français'];
const ESTADO_LABEL: Record<string, string> = { pendiente: 'PENDIENTE', confirmada: 'CONFIRMADA', cancelada: 'CANCELADA' };
const ESTADO_COLOR: Record<string, string> = { pendiente: colors.terracotta, confirmada: colors.secondary, cancelada: colors.error };

type Props = {
  reserva: ReservaMia | null;
  onClose: () => void;
  onUpdated: (r: ReservaMia) => void;
};

export function ReservaDetailModal({ reserva, onClose, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState(1);
  const [idioma, setIdioma] = useState('Español');
  const [notas, setNotas] = useState('');
  const [saving, setSaving] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (reserva) {
      setEditing(false);
      setConfirmCancel(false);
      setError('');
      setFecha(reserva.fecha_visita.slice(0, 10));
      setPersonas(reserva.personas);
      setIdioma(reserva.idioma || 'Español');
      setNotas(reserva.notas || '');
    }
  }, [reserva?.id]);

  if (!reserva) return null;
  const puedeEditar = reserva.estado === 'pendiente';

  async function guardar() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) { setError('Fecha inválida. Usa el formato AAAA-MM-DD.'); return; }
    setSaving(true);
    setError('');
    try {
      const actualizada = await reservasApi.editar(reserva!.id, { fecha_visita: fecha, personas, idioma, notas: notas || undefined });
      onUpdated(actualizada);
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function cancelar() {
    setCancelando(true);
    setError('');
    try {
      const actualizada = await reservasApi.cancelar(reserva!.id);
      onUpdated(actualizada);
      setConfirmCancel(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCancelando(false);
    }
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.handle} />
          <View style={styles.headRow}>
            <Text style={[typography.labelMd, { color: ESTADO_COLOR[reserva.estado] ?? colors.secondary }]}>
              {ESTADO_LABEL[reserva.estado] ?? reserva.estado.toUpperCase()}
            </Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} color={colors.outline} />
            </Pressable>
          </View>
          <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 4 }]}>{reserva.actividad}</Text>

          {!editing ? (
            <>
              <DetailRow icon="event" label="Fecha de visita" value={new Date(reserva.fecha_visita).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })} />
              <DetailRow icon="group" label="Personas" value={`${reserva.personas}`} />
              <DetailRow icon="language" label="Idioma" value={reserva.idioma || 'Español'} />
              <DetailRow icon="payments" label="Total" value={`S/ ${reserva.precio_total}`} />
              {!!reserva.notas && <DetailRow icon="notes" label="Notas" value={reserva.notas} />}
              <DetailRow icon="schedule" label="Reservado el" value={new Date(reserva.created_at).toLocaleDateString('es-PE')} />

              {!!error && <Text style={[typography.labelSm, { color: colors.error, marginTop: spacing.stackSm }]}>{error}</Text>}

              {puedeEditar && !confirmCancel && (
                <View style={{ flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.stackMd }}>
                  <Button label="Editar" icon="edit" variant="secondary" onPress={() => setEditing(true)} style={{ flex: 1 }} />
                  <Button label="Cancelar reserva" icon="close" variant="ghost" onPress={() => setConfirmCancel(true)} style={{ flex: 1 }} />
                </View>
              )}
              {confirmCancel && (
                <View style={{ marginTop: spacing.stackMd, gap: spacing.stackSm }}>
                  <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>¿Seguro que quieres cancelar esta reserva?</Text>
                  <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
                    <Button label="No, mantener" variant="ghost" onPress={() => setConfirmCancel(false)} style={{ flex: 1 }} disabled={cancelando} />
                    <Button label={cancelando ? 'Cancelando…' : 'Sí, cancelar'} onPress={cancelar} style={{ flex: 1 }} disabled={cancelando} />
                  </View>
                </View>
              )}
              {!puedeEditar && reserva.estado !== 'cancelada' && (
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: spacing.stackMd, textAlign: 'center' }]}>
                  Esta reserva ya fue confirmada. Para cambios, contáctanos por WhatsApp.
                </Text>
              )}
            </>
          ) : (
            <View style={{ gap: spacing.stackSm, marginTop: spacing.stackMd }}>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>FECHA DE VISITA (AAAA-MM-DD)</Text>
              <TextInput value={fecha} onChangeText={setFecha} placeholder="2026-08-20" style={styles.input} placeholderTextColor={colors.outline} />

              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.stackSm }]}>PERSONAS</Text>
              <View style={styles.stepperRow}>
                <Pressable onPress={() => setPersonas(Math.max(1, personas - 1))} style={styles.stepBtn}>
                  <MaterialIcons name="remove" size={20} color={colors.primary} />
                </Pressable>
                <Text style={[typography.headlineMd, { color: colors.onSurface, minWidth: 36, textAlign: 'center' }]}>{personas}</Text>
                <Pressable onPress={() => setPersonas(Math.min(20, personas + 1))} style={styles.stepBtn}>
                  <MaterialIcons name="add" size={20} color={colors.primary} />
                </Pressable>
              </View>

              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.stackSm }]}>IDIOMA</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {IDIOMAS.map(i => <Chip key={i} label={i} active={idioma === i} onPress={() => setIdioma(i)} />)}
              </View>

              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.stackSm }]}>NOTAS</Text>
              <TextInput
                value={notas}
                onChangeText={setNotas}
                placeholder="Dieta, accesibilidad, alergias…"
                style={[styles.input, { minHeight: 70 }]}
                multiline
                placeholderTextColor={colors.outline}
              />

              {!!error && <Text style={[typography.labelSm, { color: colors.error }]}>{error}</Text>}

              <View style={{ flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.stackMd }}>
                <Button label="Descartar" variant="ghost" onPress={() => setEditing(false)} style={{ flex: 1 }} disabled={saving} />
                <Button label={saving ? 'Guardando…' : 'Guardar cambios'} onPress={guardar} style={{ flex: 1 }} disabled={saving} />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

function DetailRow({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <MaterialIcons name={icon} size={18} color={colors.primary} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{label}</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurface }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: '85%',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: spacing.containerPadding, paddingBottom: spacing.stackLg,
  },
  handle: { width: 50, height: 4, backgroundColor: colors.outlineVariant, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.stackSm },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.gutter, marginTop: spacing.stackMd },
  input: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md, padding: 12, color: colors.onSurface, fontSize: 15 },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.outlineVariant },
});
