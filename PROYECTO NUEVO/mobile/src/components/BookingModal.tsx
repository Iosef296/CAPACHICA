import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from './Button';
import { colors, radii, spacing, typography } from '@/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  pricePerUnit: number;
  unitLabel?: string;
};

export function BookingModal({ visible, onClose, title, pricePerUnit, unitLabel = 'noche' }: Props) {
  const [days, setDays] = useState(2);
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const total = days * guests * pricePerUnit;

  async function confirm() {
    const all = JSON.parse((await AsyncStorage.getItem('capachica.reservas')) ?? '[]');
    all.push({
      id: Date.now(), title, days, guests, total,
      createdAt: new Date().toISOString(),
    });
    await AsyncStorage.setItem('capachica.reservas', JSON.stringify(all));
    setStep('success');
  }

  function close() {
    setStep('form');
    setDays(2); setGuests(2);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close} />
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {step === 'form' ? (
          <>
            <Text style={[typography.labelMd, { color: colors.secondary }]}>RESERVAR</Text>
            <Text style={[typography.headlineMd, { color: colors.onSurface }]} numberOfLines={2}>{title}</Text>

            <Stepper label={unitLabel === 'noche' ? 'Noches' : 'Personas / horas'} value={days} setValue={setDays} min={1} max={30} />
            <Stepper label="Personas" value={guests} setValue={setGuests} min={1} max={10} />

            <View style={styles.totalRow}>
              <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}>Total</Text>
              <Text style={[typography.headlineMd, { color: colors.primary }]}>S/ {total}</Text>
            </View>

            <Button label="Confirmar reserva" icon="check" onPress={confirm} style={{ marginTop: spacing.gutter }} />
            <Pressable onPress={close} style={{ alignSelf: 'center', padding: 12 }}>
              <Text style={[typography.labelMd, { color: colors.outline }]}>Cancelar</Text>
            </Pressable>
          </>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: spacing.stackMd }}>
            <View style={styles.successIcon}>
              <MaterialIcons name="check" size={48} color="#fff" />
            </View>
            <Text style={[typography.headlineMd, { color: colors.primary, marginTop: spacing.stackMd }]}>
              ¡Reserva confirmada!
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 8, paddingHorizontal: spacing.containerPadding }]}>
              Tu reserva de "{title}" por {days} {unitLabel}{days > 1 ? 's' : ''} ha sido registrada. Te contactaremos por WhatsApp.
            </Text>
            <Text style={[typography.headlineMd, { color: colors.terracotta, marginTop: spacing.gutter }]}>
              S/ {total}
            </Text>
            <Button label="Listo" onPress={close} style={{ marginTop: spacing.stackMd, alignSelf: 'stretch' }} />
          </View>
        )}
      </View>
    </Modal>
  );
}

function Stepper({ label, value, setValue, min, max }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number }) {
  return (
    <View style={styles.stepperRow}>
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      <Pressable onPress={() => setValue(Math.max(min, value - 1))} style={styles.stepBtn}>
        <MaterialIcons name="remove" size={20} color={colors.primary} />
      </Pressable>
      <Text style={[typography.headlineMd, { color: colors.onSurface, minWidth: 36, textAlign: 'center' }]}>{value}</Text>
      <Pressable onPress={() => setValue(Math.min(max, value + 1))} style={styles.stepBtn}>
        <MaterialIcons name="add" size={20} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: spacing.containerPadding, paddingBottom: spacing.stackLg,
    gap: spacing.stackSm,
  },
  handle: { width: 50, height: 4, backgroundColor: colors.outlineVariant, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.stackSm },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: spacing.stackSm, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  stepBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.outlineVariant },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.gutter, paddingTop: spacing.gutter, borderTopWidth: 1, borderTopColor: colors.outlineVariant },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' },
});
