import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuth } from '@/auth/AuthContext';
import { negocios, usuariosAdmin, UsuarioAdmin, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type Familia = {
  id: number; nombre: string; comunidad: string;
  usuario_id?: string | null; usuario_nombre?: string | null;
};

export default function ManageFamilias() {
  const { user } = useAuth();
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState<Familia | null>(null);
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.rol === 'admin';

  function cargar() {
    if (!isAdmin) return;
    negocios.listarTodos('comunidades').then(setFamilias).catch(() => {});
    usuariosAdmin.listar().then(setUsuarios).catch(() => {});
  }

  useLiveRefresh(cargar, { url: API_WS, channels: ['comunidades', 'usuarios'] });

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
          <ScreenHeader eyebrow="ADMIN" title="Familias" back />
          <View style={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
            <MaterialIcons name="lock" size={48} color={colors.outline} style={{ alignSelf: 'center' }} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              Solo un administrador puede asignar emprendedores a las familias.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const emprendedores = usuarios.filter(u => u.rol === 'proveedor' || u.rol === 'admin');

  function openAssign(f: Familia) {
    setTarget(f);
    setModalOpen(true);
  }

  async function elegir(usuarioId: string | null) {
    if (!target) return;
    setSaving(true);
    try {
      await negocios.asignar('comunidades', target.id, usuarioId);
      setModalOpen(false);
      setTarget(null);
      cargar();
    } catch (e) {
      Alert.alert('Error al asignar', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScreenHeader eyebrow="ADMIN" title="Familias · asignar dueño" back />

        <ScrollView contentContainerStyle={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
          {familias.length === 0 ? (
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.stackMd }]}>
              Cargando familias…
            </Text>
          ) : familias.map(f => (
            <View key={f.id} style={[cardStyle, shadows.card]}>
              <View style={[avatarStyle, f.usuario_nombre ? avatarAssignedStyle : null]}>
                <MaterialIcons name="home" size={20} color={colors.onPrimary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>
                  {f.nombre}
                </Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                  {f.comunidad}
                </Text>
                <Text style={[typography.labelSm, { color: f.usuario_nombre ? colors.primary : colors.outline }]} numberOfLines={1}>
                  {f.usuario_nombre ? `💼 ${f.usuario_nombre}` : '— sin emprendedor asignado —'}
                </Text>
              </View>
              <Pressable onPress={() => openAssign(f)} style={iconBtnStyle}>
                <MaterialIcons name="person-add" size={18} color={colors.primary} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.containerPadding, maxHeight: '80%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.gutter }}>
              <Text style={[typography.headlineMd, { color: colors.primary }]} numberOfLines={1}>
                Asignar dueño{target ? `: ${target.nombre}` : ''}
              </Text>
              <Pressable onPress={() => setModalOpen(false)}>
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ gap: 8, paddingBottom: spacing.stackMd }}>
              <Pressable
                disabled={saving}
                onPress={() => elegir(null)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, padding: 12, borderRadius: radii.lg, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant }}
              >
                <MaterialIcons name="person-off" size={20} color={colors.onSurfaceVariant} />
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>— Sin asignar —</Text>
              </Pressable>
              {emprendedores.map(u => (
                <Pressable
                  key={u.id}
                  disabled={saving}
                  onPress={() => elegir(u.id)}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, padding: 12, borderRadius: radii.lg,
                    backgroundColor: target?.usuario_id === u.id ? colors.primaryContainer : colors.surfaceContainerLowest,
                    borderWidth: 1, borderColor: target?.usuario_id === u.id ? colors.primary : colors.outlineVariant,
                  }}
                >
                  <MaterialIcons name={u.rol === 'admin' ? 'admin-panel-settings' : 'storefront'} size={20} color={colors.onSurfaceVariant} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={[typography.bodyMd, { color: colors.onSurface }]} numberOfLines={1}>{u.nombre}</Text>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>{u.email}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const cardStyle = {
  flexDirection: 'row' as const, alignItems: 'center' as const, gap: spacing.gutter,
  backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base,
};
const avatarStyle = { width: 40, height: 40, borderRadius: 20, alignItems: 'center' as const, justifyContent: 'center' as const, backgroundColor: colors.outline };
const avatarAssignedStyle = { backgroundColor: colors.primary };
const iconBtnStyle = { width: 36, height: 36, borderRadius: 18, alignItems: 'center' as const, justifyContent: 'center' as const, backgroundColor: colors.surfaceContainerLow };
