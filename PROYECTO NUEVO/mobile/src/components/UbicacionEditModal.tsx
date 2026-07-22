import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { ubicaciones as ubicacionesApi, Ubicacion } from '@/data/api';
import { colors, radii, spacing, typography } from '@/theme';

type Props = {
  // null = cerrado. Sin `id` = pin nuevo (se está creando en `coord`).
  pin: { id?: number; titulo: string; descripcion?: string; latitud: number; longitud: number } | null;
  onClose: () => void;
  onSaved: (pin: Ubicacion) => void;
  onDeleted: (id: number) => void;
};

export function UbicacionEditModal({ pin, onClose, onSaved, onDeleted }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pin) {
      setTitulo(pin.titulo);
      setDescripcion(pin.descripcion ?? '');
      setSaving(false);
      setDeleting(false);
      setConfirmDelete(false);
      setError('');
    }
  }, [pin]);

  if (!pin) return null;
  const esNuevo = pin.id === undefined;

  async function guardar() {
    if (!titulo.trim()) { setError('Ponle un nombre a la ubicación.'); return; }
    setSaving(true);
    setError('');
    try {
      const guardado = esNuevo
        ? await ubicacionesApi.crear({ titulo: titulo.trim(), descripcion: descripcion.trim() || undefined, latitud: pin!.latitud, longitud: pin!.longitud })
        : await ubicacionesApi.actualizar(pin!.id!, { titulo: titulo.trim(), descripcion: descripcion.trim() });
      onSaved(guardado);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function eliminar() {
    if (esNuevo || pin!.id === undefined) return;
    setDeleting(true);
    try {
      await ubicacionesApi.eliminar(pin!.id!);
      onDeleted(pin!.id!);
    } catch (e) {
      setError((e as Error).message);
      setDeleting(false);
    }
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.handle} />
          <View style={styles.headRow}>
            <Text style={[typography.labelMd, { color: colors.secondary }]}>
              {esNuevo ? 'NUEVA UBICACIÓN' : 'EDITAR UBICACIÓN'}
            </Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} color={colors.outline} />
            </Pressable>
          </View>

          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.stackMd }]}>NOMBRE</Text>
          <TextInput value={titulo} onChangeText={setTitulo} placeholder="Ej. Mirador de Llachón" style={styles.input} placeholderTextColor={colors.outline} />

          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.stackSm }]}>DESCRIPCIÓN (OPCIONAL)</Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Qué hay aquí…"
            style={[styles.input, { minHeight: 70 }]}
            multiline
            placeholderTextColor={colors.outline}
          />

          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: spacing.stackSm }]}>
            {pin.latitud.toFixed(5)}, {pin.longitud.toFixed(5)}
            {!esNuevo && ' · arrastra el pin en el mapa para moverlo'}
          </Text>

          {!!error && <Text style={[typography.labelSm, { color: colors.error, marginTop: spacing.stackSm }]}>{error}</Text>}

          {confirmDelete ? (
            <View style={{ marginTop: spacing.stackMd, gap: spacing.stackSm }}>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>¿Seguro que quieres borrar esta ubicación?</Text>
              <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
                <Button label="No, mantener" variant="ghost" onPress={() => setConfirmDelete(false)} style={{ flex: 1 }} disabled={deleting} />
                <Button label={deleting ? 'Borrando…' : 'Sí, borrar'} onPress={eliminar} style={{ flex: 1 }} disabled={deleting} />
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.stackMd }}>
              {!esNuevo && (
                <Button label="Borrar" icon="delete" variant="ghost" onPress={() => setConfirmDelete(true)} style={{ flex: 1 }} disabled={saving} />
              )}
              <Button label={saving ? 'Guardando…' : 'Guardar'} onPress={guardar} style={{ flex: 1 }} disabled={saving} />
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
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
  input: { borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md, padding: 12, color: colors.onSurface, fontSize: 15, marginTop: 4 },
});
