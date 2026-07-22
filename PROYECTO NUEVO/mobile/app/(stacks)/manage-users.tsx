import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuth } from '@/auth/AuthContext';
import { usuariosAdmin, UsuarioAdmin, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const ROL_LABEL: Record<string, string> = { admin: 'Admin', proveedor: 'Emprendedor', turista: 'Turista' };
const ROLES = ['turista', 'proveedor', 'admin'] as const;

export default function ManageUsers() {
  const { user } = useAuth();
  const [items, setItems] = useState<UsuarioAdmin[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<Partial<UsuarioAdmin> & { id?: string; password?: string }>({});
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.rol === 'admin';

  useLiveRefresh(() => {
    if (isAdmin) usuariosAdmin.listar().then(setItems).catch(() => {});
  }, { url: API_WS, channels: 'usuarios' });

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
          <ScreenHeader eyebrow="ADMIN" title="Usuarios" back />
          <View style={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
            <MaterialIcons name="lock" size={48} color={colors.outline} style={{ alignSelf: 'center' }} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              Solo un administrador puede gestionar usuarios.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  function openEdit(u: UsuarioAdmin) {
    setEdit({ id: u.id, nombre: u.nombre, email: u.email, telefono: u.telefono ?? '', rol: u.rol, activo: u.activo, password: '' });
    setModalOpen(true);
  }

  async function save() {
    if (!edit.id) return;
    if (!edit.nombre?.trim() || !edit.email?.trim()) {
      Alert.alert('Falta información', 'Nombre y email son obligatorios.');
      return;
    }
    if (edit.password && edit.password.length < 8) {
      Alert.alert('Contraseña muy corta', 'Mínimo 8 caracteres.');
      return;
    }
    const body: any = { nombre: edit.nombre.trim(), email: edit.email.trim(), telefono: edit.telefono, rol: edit.rol, activo: edit.activo };
    if (edit.password) body.password = edit.password;
    setSaving(true);
    try {
      await usuariosAdmin.actualizar(edit.id, body);
      setModalOpen(false);
      const pass = !!edit.password;
      usuariosAdmin.listar().then(setItems).catch(() => {});
      Alert.alert('Listo', pass ? 'Usuario actualizado, contraseña reseteada.' : 'Usuario actualizado.');
    } catch (e) {
      Alert.alert('Error al guardar', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScreenHeader eyebrow="ADMIN" title="Gestionar usuarios" back />

        <ScrollView contentContainerStyle={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
          {items.length === 0 ? (
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.stackMd }]}>
              Cargando usuarios…
            </Text>
          ) : items.map(u => (
            <View key={u.id} style={[styles.card, shadows.card]}>
              <View style={[styles.avatar, u.rol === 'admin' && styles.avatarAdmin]}>
                <MaterialIcons name={u.rol === 'admin' ? 'admin-panel-settings' : u.rol === 'proveedor' ? 'storefront' : 'person'} size={20} color={colors.onPrimary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>
                  {u.nombre}
                </Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                  {u.email} · {ROL_LABEL[u.rol] ?? u.rol}{!u.activo ? ' · inactivo' : ''}
                </Text>
              </View>
              <Pressable onPress={() => openEdit(u)} style={styles.iconBtn}>
                <MaterialIcons name="edit" size={18} color={colors.primary} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={[typography.headlineMd, { color: colors.primary }]}>Editar usuario</Text>
              <Pressable onPress={() => setModalOpen(false)}>
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ gap: spacing.gutter, paddingBottom: spacing.stackMd }}>
              <View>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Nombre</Text>
                <TextInput
                  value={edit.nombre ?? ''}
                  onChangeText={v => setEdit(p => ({ ...p, nombre: v }))}
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Email</Text>
                <TextInput
                  value={edit.email ?? ''}
                  onChangeText={v => setEdit(p => ({ ...p, email: v }))}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Teléfono</Text>
                <TextInput
                  value={edit.telefono ?? ''}
                  onChangeText={v => setEdit(p => ({ ...p, telefono: v }))}
                  keyboardType="phone-pad"
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                />
              </View>

              <View>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Rol</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {ROLES.map(r => (
                    <Pressable
                      key={r}
                      onPress={() => setEdit(p => ({ ...p, rol: r }))}
                      style={[styles.roleChip, edit.rol === r && styles.roleChipActive]}
                    >
                      <Text style={[typography.labelSm, { color: edit.rol === r ? colors.onPrimary : colors.onSurfaceVariant }]}>
                        {ROL_LABEL[r]}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Cuenta activa</Text>
                <Switch
                  value={edit.activo !== false}
                  onValueChange={v => setEdit(p => ({ ...p, activo: v }))}
                  trackColor={{ true: colors.primary }}
                />
              </View>

              <View>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>
                  Nueva contraseña (opcional — resetea si el usuario la olvidó)
                </Text>
                <TextInput
                  value={edit.password ?? ''}
                  onChangeText={v => setEdit(p => ({ ...p, password: v }))}
                  placeholder="Dejar vacío para no cambiarla"
                  secureTextEntry
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                />
              </View>

              <Pressable style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={save} disabled={saving}>
                <Text style={[typography.bodyMd, { color: colors.onPrimary, fontFamily: 'HankenGrotesk_700Bold' }]}>
                  {saving ? 'Guardando…' : 'Guardar'}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter,
    backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary },
  avatarAdmin: { backgroundColor: colors.primary },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.containerPadding, maxHeight: '88%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.gutter },
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md,
    padding: 12, fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, color: colors.onSurface,
  },
  roleChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant,
  },
  roleChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 16, alignItems: 'center', marginTop: spacing.gutter },
});
