import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuth } from '@/auth/AuthContext';
import { negocios, subirFoto, API_WS, TipoNegocio } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type FieldCfg = { key: string; label: string; placeholder?: string; multiline?: boolean };
type TipoCfg = {
  key: TipoNegocio; label: string; icon: keyof typeof MaterialIcons.glyphMap;
  imageField: string; itemLabel: (it: any) => string; fields: FieldCfg[];
  arrayFields?: string[]; numberFields?: string[];
};

const TIPOS: TipoCfg[] = [
  {
    key: 'hospedajes', label: 'Hospedaje', icon: 'home', imageField: 'foto_url', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Posada de Doña Paula' },
      { key: 'comunidad', label: 'Comunidad', placeholder: 'Llachón' },
      { key: 'descripcion', label: 'Descripción', multiline: true },
      { key: 'habitaciones', label: 'Habitaciones', placeholder: '4' },
      { key: 'precio', label: 'Precio por noche (S/)', placeholder: '120' },
      { key: 'idiomas', label: 'Idiomas (separados por coma)', placeholder: 'Español, Quechua' },
      { key: 'servicios', label: 'Servicios (separados por coma)', placeholder: 'Desayuno, Vista al lago' },
      { key: 'calificacion', label: 'Calificación', placeholder: '4.8' },
    ],
    arrayFields: ['idiomas', 'servicios'], numberFields: ['habitaciones', 'precio'],
  },
  {
    key: 'artesania', label: 'Artesanía', icon: 'palette', imageField: 'imagen_url', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Poncho Ceremonial' },
      { key: 'tipo', label: 'Tipo', placeholder: 'textil / ceramica / joyeria' },
      { key: 'tecnica', label: 'Técnica', placeholder: 'Telar de cintura' },
      { key: 'materiales', label: 'Materiales', placeholder: 'Lana de alpaca' },
      { key: 'precio_soles', label: 'Precio (S/)', placeholder: '240' },
      { key: 'precio_usd', label: 'Precio (USD)', placeholder: '65' },
      { key: 'artesana_nombre', label: 'Tu nombre', placeholder: 'Mamá Victoria' },
      { key: 'artesana_comunidad', label: 'Tu comunidad', placeholder: 'Llachón' },
      { key: 'artesana_experiencia', label: 'Años de experiencia', placeholder: '28' },
      { key: 'stock', label: 'Stock', placeholder: '3' },
    ],
    numberFields: ['precio_soles', 'precio_usd', 'artesana_experiencia', 'stock'],
  },
  {
    key: 'festividades', label: 'Festividad', icon: 'celebration', imageField: 'imagen', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Virgen de la Candelaria' },
      { key: 'fecha', label: 'Fecha', placeholder: '1 al 14 de Febrero' },
      { key: 'mes', label: 'Mes (1-12)', placeholder: '2' },
      { key: 'tipo', label: 'Tipo', placeholder: 'Religiosa' },
      { key: 'ubicacion', label: 'Ubicación', placeholder: 'Capachica, Puno' },
      { key: 'descripcion', label: 'Descripción', multiline: true },
      { key: 'actividades', label: 'Actividades (separadas por coma)' },
      { key: 'galeria', label: 'Galería (URLs separadas por coma)' },
    ],
    arrayFields: ['actividades', 'galeria'], numberFields: ['mes'],
  },
  {
    key: 'maestros', label: 'Maestro artesano', icon: 'person', imageField: 'imagen', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Mamá Victoria' },
      { key: 'oficio', label: 'Oficio', placeholder: 'Alpaca' },
    ],
  },
  {
    key: 'guias', label: 'Guía', icon: 'menu-book', imageField: 'imagen', itemLabel: it => it.titulo,
    fields: [
      { key: 'titulo', label: 'Título', placeholder: 'Historia de Capachica' },
      { key: 'extracto', label: 'Extracto' },
      { key: 'tipo', label: 'Tipo (viaje / cultural)', placeholder: 'cultural' },
    ],
  },
  {
    key: 'comunidades', label: 'Destino', icon: 'place', imageField: 'imagen', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Llachón' },
      { key: 'comunidad', label: 'Comunidad / ubicación', placeholder: 'Comunidad de Llachón' },
      { key: 'desc', label: 'Descripción', multiline: true },
      { key: 'highlight', label: 'Texto destacado', placeholder: 'Mejor destino vivencial' },
      { key: 'tags', label: 'Etiquetas (separadas por coma)' },
    ],
    arrayFields: ['tags'],
  },
];

export default function MyBusiness() {
  const { user, refreshProfile } = useAuth();
  const [tipoIdx, setTipoIdx] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const cfg = TIPOS[tipoIdx];

  const canManage = user?.rol === 'admin' || user?.rol === 'proveedor';

  useLiveRefresh(() => {
    if (canManage && user) negocios.listarPropios(cfg.key, user.id).then(setItems);
  }, { url: API_WS, channels: TIPOS.map(t => t.key) });

  if (!canManage) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <ScreenHeader eyebrow="MI NEGOCIO" title="Panel de emprendedor" back />
          <View style={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
            <MaterialIcons name="storefront" size={48} color={colors.outline} style={{ alignSelf: 'center' }} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              Todavía sos turista. Pedile a un administrador que te habilite como emprendedor para poder crear y gestionar tu propio negocio en la app.
            </Text>
            <Pressable onPress={() => refreshProfile()} style={styles.refreshBtn}>
              <MaterialIcons name="refresh" size={18} color={colors.primary} />
              <Text style={[typography.bodyMd, { color: colors.primary, fontFamily: 'HankenGrotesk_700Bold' }]}>
                Ya me habilitaron, revisar de nuevo
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  function openNew() {
    setEdit({});
    setModalOpen(true);
  }

  function openEdit(item: any) {
    const copy = { ...item };
    (cfg.arrayFields || []).forEach(f => { if (Array.isArray(copy[f])) copy[f] = copy[f].join(', '); });
    setEdit(copy);
    setModalOpen(true);
  }

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permiso necesario', 'Habilitá acceso a tus fotos para subir una imagen.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (result.canceled || !result.assets?.[0]) return;
    setUploading(true);
    try {
      const url = await subirFoto(result.assets[0].uri);
      setEdit((p: any) => ({ ...p, [cfg.imageField]: url }));
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    const body: any = { ...edit };
    (cfg.arrayFields || []).forEach(f => {
      if (typeof body[f] === 'string') body[f] = body[f].split(',').map((s: string) => s.trim()).filter(Boolean);
    });
    (cfg.numberFields || []).forEach(f => {
      if (body[f] !== undefined && body[f] !== '') body[f] = Number(body[f]);
    });
    if (!body[cfg.fields[0].key]) { Alert.alert('Falta información', `Completá "${cfg.fields[0].label}".`); return; }
    setSaving(true);
    try {
      if (edit.id) await negocios.editar(cfg.key, edit.id, body);
      else await negocios.crear(cfg.key, body);
      setModalOpen(false);
      if (user) negocios.listarPropios(cfg.key, user.id).then(setItems);
    } catch (e) {
      Alert.alert('Error al guardar', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function remove(item: any) {
    Alert.alert('Eliminar', `¿Eliminar "${cfg.itemLabel(item)}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            await negocios.eliminar(cfg.key, item.id);
            setItems(prev => prev.filter(i => i.id !== item.id));
          } catch (e) {
            Alert.alert('Error', (e as Error).message);
          }
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScreenHeader eyebrow="MI NEGOCIO" title="Gestionar mi negocio" back />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {TIPOS.map((t, i) => (
            <Pressable key={t.key} onPress={() => setTipoIdx(i)} style={[styles.chip, i === tipoIdx && styles.chipActive]}>
              <MaterialIcons name={t.icon} size={16} color={i === tipoIdx ? colors.onPrimary : colors.onSurfaceVariant} />
              <Text style={[typography.labelSm, { color: i === tipoIdx ? colors.onPrimary : colors.onSurfaceVariant }]}>{t.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
          <Pressable style={styles.newBtn} onPress={openNew}>
            <MaterialIcons name="add-circle" size={20} color={colors.onPrimary} />
            <Text style={[typography.bodyMd, { color: colors.onPrimary, fontFamily: 'HankenGrotesk_700Bold' }]}>
              Nuevo {cfg.label.toLowerCase()}
            </Text>
          </Pressable>

          {items.length === 0 ? (
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.stackMd }]}>
              Todavía no creaste ningún {cfg.label.toLowerCase()}.
            </Text>
          ) : items.map(item => (
            <View key={item.id} style={[styles.card, shadows.card]}>
              {item[cfg.imageField] ? (
                <Image source={{ uri: item[cfg.imageField] }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbFallback]}>
                  <MaterialIcons name={cfg.icon} size={24} color={colors.onSurfaceVariant} />
                </View>
              )}
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>
                  {cfg.itemLabel(item)}
                </Text>
              </View>
              <Pressable onPress={() => openEdit(item)} style={styles.iconBtn}>
                <MaterialIcons name="edit" size={18} color={colors.primary} />
              </Pressable>
              <Pressable onPress={() => remove(item)} style={styles.iconBtn}>
                <MaterialIcons name="delete" size={18} color={colors.error} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={[typography.headlineMd, { color: colors.primary }]}>
                {edit.id ? 'Editar' : 'Nuevo'} {cfg.label.toLowerCase()}
              </Text>
              <Pressable onPress={() => setModalOpen(false)}>
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ gap: spacing.gutter, paddingBottom: spacing.stackMd }}>
              <View style={{ alignItems: 'center', gap: 8 }}>
                {edit[cfg.imageField] && (
                  <Image source={{ uri: edit[cfg.imageField] }} style={{ width: 120, height: 120, borderRadius: radii.md }} />
                )}
                <Pressable onPress={pickImage} style={styles.photoBtn} disabled={uploading}>
                  <MaterialIcons name="add-a-photo" size={18} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>
                    {uploading ? 'Subiendo…' : 'Subir foto'}
                  </Text>
                </Pressable>
              </View>

              {cfg.fields.map(f => (
                <View key={f.key}>
                  <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>{f.label}</Text>
                  <TextInput
                    value={edit[f.key] != null ? String(edit[f.key]) : ''}
                    onChangeText={v => setEdit((p: any) => ({ ...p, [f.key]: v }))}
                    placeholder={f.placeholder}
                    placeholderTextColor={colors.outline}
                    multiline={f.multiline}
                    style={[styles.input, f.multiline && { height: 80, textAlignVertical: 'top' }]}
                  />
                </View>
              ))}

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
  chipsRow: { gap: 8, paddingHorizontal: spacing.containerPadding, paddingVertical: spacing.stackSm },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  newBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 14,
  },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter,
    backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base,
  },
  thumb: { width: 56, height: 56, borderRadius: radii.md },
  thumbFallback: { backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
  refreshBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.gutter },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.containerPadding, maxHeight: '88%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.gutter },
  photoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 14, borderRadius: radii.full, borderWidth: 1, borderColor: colors.secondary },
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md,
    padding: 12, fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, color: colors.onSurface,
  },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 16, alignItems: 'center', marginTop: spacing.gutter },
});
