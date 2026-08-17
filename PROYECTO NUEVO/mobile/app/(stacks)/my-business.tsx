import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuth } from '@/auth/AuthContext';
import { negocios, subirFoto, subirMediaHistoria, API_WS, TipoNegocio } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type FieldCfg = { key: string; label: string; placeholder?: string; multiline?: boolean; options?: string[] };
type TipoCfg = {
  key: TipoNegocio; label: string; icon: keyof typeof MaterialIcons.glyphMap;
  // Sin imageField (caso de 'restaurantes') el negocio no tiene foto de
  // portada propia -- se usa la galería `fotos` como reemplazo.
  imageField?: string; itemLabel: (it: any) => string; fields: FieldCfg[];
  arrayFields?: string[]; numberFields?: string[];
  // 'platos' no existe suelto -- pertenece a un restaurante propio, hay
  // que elegir cuál antes de poder guardar.
  needsRestauranteId?: boolean;
  // Linea chica debajo del nombre en la lista (ej. comunidad + precio).
  // Sin esto la card queda con una sola linea, bastante pelada.
  itemSub?: (it: any) => string;
  // Override de genero para los textos generados ("Nuevo X" / "ningún X")
  // -- por default se arma en masculino a partir de cfg.label.
  nuevoLabel?: string; vacioLabel?: string;
};

const TIPOS: TipoCfg[] = [
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
    key: 'comunidades', label: 'Familia', icon: 'home', imageField: 'imagen', itemLabel: it => it.nombre,
    nuevoLabel: 'Nueva familia', vacioLabel: 'ninguna familia',
    itemSub: it => [it.comunidad, it.precio ? `S/ ${it.precio}/noche` : null].filter(Boolean).join(' · '),
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Llachón' },
      { key: 'comunidad', label: 'Comunidad / ubicación', placeholder: 'Comunidad de Llachón' },
      { key: 'desc', label: 'Descripción', multiline: true },
      { key: 'precio', label: 'Precio por noche (S/, por persona)', placeholder: '80' },
      { key: 'capacidad', label: 'Capacidad (huéspedes)', placeholder: '4' },
      { key: 'habitaciones', label: 'Habitaciones', placeholder: '2' },
      { key: 'comidas', label: 'Comidas incluidas', options: ['Solo desayuno', 'Pensión completa'] },
      { key: 'servicios', label: 'Servicios (separados por coma)', placeholder: 'Baño privado, Agua caliente, Vista al lago' },
      { key: 'actividades', label: 'Actividades que ofrecen (separadas por coma)', placeholder: 'Pesca artesanal, Tejido, Paseo en bote' },
      { key: 'idiomas', label: 'Idiomas (separados por coma)', placeholder: 'Español, Quechua' },
      { key: 'whatsapp', label: 'Contacto WhatsApp', placeholder: '+51 999 999 999' },
    ],
    arrayFields: ['servicios', 'actividades', 'idiomas'], numberFields: ['precio', 'capacidad', 'habitaciones'],
  },
  {
    key: 'restaurantes', label: 'Restaurante', icon: 'restaurant', itemLabel: it => it.nombre,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Restaurante Qhantati' },
      { key: 'descripcion', label: 'Descripción', multiline: true },
      { key: 'direccion', label: 'Dirección', placeholder: 'Av. Titicaca 123, Llachón' },
      { key: 'latitud', label: 'Latitud', placeholder: '-15.6407' },
      { key: 'longitud', label: 'Longitud', placeholder: '-69.8321' },
      { key: 'whatsapp', label: 'WhatsApp', placeholder: '+51 987654321' },
      { key: 'telefono', label: 'Teléfono', placeholder: '+51 987654321' },
      { key: 'email_contacto', label: 'Correo de contacto', placeholder: 'contacto@restaurante.com' },
      { key: 'tipo_comida', label: 'Tipo de comida', options: ['del_lago', 'ancestral', 'productos_locales', 'bebidas'] },
      { key: 'especialidades', label: 'Especialidades (separadas por coma)', placeholder: 'Trucha, Pachamanca' },
      { key: 'precio_promedio', label: 'Precio promedio (S/)', placeholder: '35' },
      { key: 'capacidad_mesas', label: 'Capacidad de mesas', placeholder: '20' },
    ],
    arrayFields: ['especialidades'], numberFields: ['precio_promedio', 'capacidad_mesas'],
  },
  {
    key: 'platos', label: 'Plato', icon: 'lunch-dining', imageField: 'foto', itemLabel: it => it.nombre,
    needsRestauranteId: true,
    fields: [
      { key: 'nombre', label: 'Nombre', placeholder: 'Trucha a la Plancha' },
      { key: 'descripcion', label: 'Descripción', multiline: true },
      { key: 'precio', label: 'Precio (S/)', placeholder: '35' },
      { key: 'categoria', label: 'Categoría', options: ['del_lago', 'ancestral', 'bebidas', 'postres'] },
      { key: 'temporada', label: 'Temporada', options: ['todo_el_año', 'verano', 'invierno'] },
      { key: 'ingredientes', label: 'Ingredientes (separados por coma)', placeholder: 'Trucha, papa nativa, limón' },
    ],
    arrayFields: ['ingredientes'], numberFields: ['precio'],
  },
];

export default function MyBusiness() {
  const { user, refreshProfile } = useAuth();
  const [tipoIdx, setTipoIdx] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [misRestaurantes, setMisRestaurantes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const cfg = TIPOS[tipoIdx];
  const appCfg = useAppConfig();

  const canManage = user?.rol === 'admin' || user?.rol === 'proveedor';

  function refreshItems() {
    if (!canManage || !user) return;
    negocios.listarPropios(cfg.key, user.id).then(setItems);
    if (cfg.needsRestauranteId) negocios.listarPropios('restaurantes', user.id).then(setMisRestaurantes);
  }

  // Recarga al cambiar de pestaña -- useLiveRefresh de abajo solo dispara
  // al enfocar la pantalla o por WS, no en cada tap de TIPOS.
  useEffect(refreshItems, [tipoIdx, user?.id]);

  useLiveRefresh(refreshItems, { url: API_WS, channels: TIPOS.map(t => t.key) });

  if (!canManage) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
          <ScreenHeader eyebrow="MI NEGOCIO" title="Panel de emprendedor" back />
          <View style={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
            <MaterialIcons name="storefront" size={48} color={colors.outline} style={{ alignSelf: 'center' }} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              {appCfg.text('myBusiness.becomeProviderMsg', 'Todavía eres turista. Pídele a un administrador que te habilite como emprendedor para poder crear y gestionar tu propio negocio en la app.')}
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
    if (cfg.needsRestauranteId && misRestaurantes.length === 0) {
      Alert.alert('Primero creá un restaurante', 'Andá a la pestaña "Restaurante" y creá uno antes de agregar platos.');
      return;
    }
    setEdit(cfg.needsRestauranteId ? { restaurante_id: misRestaurantes[0]?.id } : {});
    setModalOpen(true);
  }

  function openEdit(item: any) {
    const copy = { ...item };
    if (cfg.key === 'restaurantes' && item.ubicacion) {
      copy.latitud = item.ubicacion.latitud ?? '';
      copy.longitud = item.ubicacion.longitud ?? '';
    }
    (cfg.arrayFields || []).forEach(f => { if (Array.isArray(copy[f])) copy[f] = copy[f].join(', '); });
    setEdit(copy);
    setModalOpen(true);
  }

  function coverUrl(item: any): string | undefined {
    return cfg.imageField ? item[cfg.imageField] : item.fotos?.[0];
  }

  async function pickImage() {
    if (!cfg.imageField) return;
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permiso necesario', 'Habilita el acceso a tus fotos para subir una imagen.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (result.canceled || !result.assets?.[0]) return;
    setUploading(true);
    try {
      const url = await subirFoto(result.assets[0].uri);
      setEdit((p: any) => ({ ...p, [cfg.imageField as string]: url }));
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function pickGalleryPhotos() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permiso necesario', 'Habilita el acceso a tus fotos para subir imágenes.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8, allowsMultipleSelection: true, selectionLimit: 8 });
    if (result.canceled || !result.assets?.length) return;
    setUploadingGallery(true);
    try {
      const urls: string[] = [];
      for (const asset of result.assets) urls.push(await subirFoto(asset.uri));
      setEdit((p: any) => ({ ...p, fotos: [...(p.fotos || []), ...urls] }));
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryPhoto(url: string) {
    setEdit((p: any) => ({ ...p, fotos: (p.fotos || []).filter((f: string) => f !== url) }));
  }

  async function pickVideo() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permiso necesario', 'Habilita el acceso a tus videos para subir uno.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['videos'], quality: 0.8 });
    if (result.canceled || !result.assets?.[0]) return;
    setUploadingVideo(true);
    try {
      const url = await subirMediaHistoria(result.assets[0].uri, 'video');
      setEdit((p: any) => ({ ...p, video: url }));
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    } finally {
      setUploadingVideo(false);
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
    if (cfg.key === 'restaurantes') {
      if (!edit.id && (!body.latitud || !body.longitud)) {
        Alert.alert('Falta la ubicación', 'Completa latitud y longitud.');
        return;
      }
      if (body.latitud && body.longitud) {
        body.ubicacion = { latitud: Number(body.latitud), longitud: Number(body.longitud) };
      }
      delete body.latitud;
      delete body.longitud;
    }
    if (cfg.needsRestauranteId && !body.restaurante_id) {
      Alert.alert('Falta el restaurante', 'Elegí a qué restaurante pertenece este plato.');
      return;
    }
    if (!body[cfg.fields[0].key]) { Alert.alert('Falta información', `Completa "${cfg.fields[0].label}".`); return; }
    setSaving(true);
    try {
      if (edit.id) await negocios.editar(cfg.key, edit.id, body);
      else await negocios.crear(cfg.key, body);
      setModalOpen(false);
      refreshItems();
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
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
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
              {cfg.nuevoLabel || `Nuevo ${cfg.label.toLowerCase()}`}
            </Text>
          </Pressable>

          {items.length === 0 ? (
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.stackMd }]}>
              Todavía no creaste {cfg.vacioLabel || `ningún ${cfg.label.toLowerCase()}`}.
            </Text>
          ) : items.map(item => {
            const sub = cfg.itemSub?.(item);
            return (
              <View key={item.id} style={[styles.card, shadows.card]}>
                {coverUrl(item) ? (
                  <Image source={{ uri: coverUrl(item) }} style={styles.thumb} />
                ) : (
                  <View style={[styles.thumb, styles.thumbFallback]}>
                    <MaterialIcons name={cfg.icon} size={26} color={colors.onSurfaceVariant} />
                  </View>
                )}
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>
                    {cfg.itemLabel(item)}
                  </Text>
                  {!!sub && (
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 2 }]} numberOfLines={1}>
                      {sub}
                    </Text>
                  )}
                </View>
                <Pressable onPress={() => openEdit(item)} style={styles.iconBtn}>
                  <MaterialIcons name="edit" size={18} color={colors.primary} />
                </Pressable>
                <Pressable onPress={() => remove(item)} style={styles.iconBtn}>
                  <MaterialIcons name="delete" size={18} color={colors.error} />
                </Pressable>
              </View>
            );
          })}
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
              {!!cfg.imageField && (
                <View style={{ alignItems: 'center', gap: 8 }}>
                  {!!coverUrl(edit) && (
                    <Image source={{ uri: coverUrl(edit) }} style={{ width: 120, height: 120, borderRadius: radii.md }} />
                  )}
                  <Pressable onPress={pickImage} style={styles.photoBtn} disabled={uploading}>
                    <MaterialIcons name="add-a-photo" size={18} color={colors.secondary} />
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>
                      {uploading ? 'Subiendo…' : 'Subir foto'}
                    </Text>
                  </Pressable>
                </View>
              )}

              {cfg.needsRestauranteId && (
                <View style={{ gap: 8 }}>
                  <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Restaurante</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {misRestaurantes.map(r => (
                      <Pressable
                        key={r.id}
                        onPress={() => setEdit((p: any) => ({ ...p, restaurante_id: r.id }))}
                        style={[styles.optionChip, edit.restaurante_id === r.id && styles.optionChipActive]}
                      >
                        <Text style={[typography.labelSm, { color: edit.restaurante_id === r.id ? colors.onPrimary : colors.onSurfaceVariant }]}>
                          {r.nombre}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={{ gap: 8 }}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Fotos adicionales</Text>
                {!!(edit.fotos || []).length && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {(edit.fotos || []).map((url: string) => (
                      <View key={url}>
                        <Image source={{ uri: url }} style={{ width: 72, height: 72, borderRadius: radii.md }} />
                        <Pressable onPress={() => removeGalleryPhoto(url)} style={styles.removeBadge}>
                          <MaterialIcons name="close" size={12} color="#fff" />
                        </Pressable>
                      </View>
                    ))}
                  </ScrollView>
                )}
                <Pressable onPress={pickGalleryPhotos} style={styles.photoBtn} disabled={uploadingGallery}>
                  <MaterialIcons name="add-photo-alternate" size={18} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>
                    {uploadingGallery ? 'Subiendo…' : 'Agregar fotos'}
                  </Text>
                </Pressable>
              </View>

              <View style={{ gap: 8 }}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Video</Text>
                {edit.video ? (
                  <View style={styles.videoChip}>
                    <MaterialIcons name="videocam" size={16} color={colors.secondary} />
                    <Text style={[typography.labelSm, { color: colors.onSurface, flex: 1 }]} numberOfLines={1}>Video adjunto</Text>
                    <Pressable onPress={() => setEdit((p: any) => ({ ...p, video: undefined }))}>
                      <MaterialIcons name="close" size={16} color={colors.onSurfaceVariant} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable onPress={pickVideo} style={styles.photoBtn} disabled={uploadingVideo}>
                    <MaterialIcons name="videocam" size={18} color={colors.secondary} />
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>
                      {uploadingVideo ? 'Subiendo… (puede tardar)' : 'Subir video'}
                    </Text>
                  </Pressable>
                )}
              </View>

              {cfg.fields.map(f => (
                <View key={f.key}>
                  <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>{f.label}</Text>
                  {f.options ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                      {f.options.map(opt => (
                        <Pressable
                          key={opt}
                          onPress={() => setEdit((p: any) => ({ ...p, [f.key]: opt }))}
                          style={[styles.optionChip, edit[f.key] === opt && styles.optionChipActive]}
                        >
                          <Text style={[typography.labelSm, { color: edit[f.key] === opt ? colors.onPrimary : colors.onSurfaceVariant }]}>
                            {opt}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  ) : (
                    <TextInput
                      value={edit[f.key] != null ? String(edit[f.key]) : ''}
                      onChangeText={v => setEdit((p: any) => ({ ...p, [f.key]: v }))}
                      placeholder={f.placeholder}
                      placeholderTextColor={colors.outline}
                      multiline={f.multiline}
                      style={[styles.input, f.multiline && { height: 80, textAlignVertical: 'top' }]}
                    />
                  )}
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
  optionChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant,
  },
  optionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  newBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 14,
  },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter,
    backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, padding: spacing.base,
  },
  thumb: { width: 68, height: 68, borderRadius: radii.md },
  thumbFallback: { backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
  refreshBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.gutter },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, padding: spacing.containerPadding, maxHeight: '88%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.gutter },
  photoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 14, borderRadius: radii.full, borderWidth: 1, borderColor: colors.secondary },
  removeBadge: {
    position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center',
  },
  videoChip: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12,
    borderRadius: radii.md, borderWidth: 1, borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest,
  },
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md,
    padding: 12, fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, color: colors.onSurface,
  },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 16, alignItems: 'center', marginTop: spacing.gutter },
});
