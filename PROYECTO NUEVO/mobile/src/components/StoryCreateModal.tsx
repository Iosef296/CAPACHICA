import React, { useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { historias as historiasApi, subirMediaHistoria } from '@/data/api';
import { colors, radii, spacing, typography } from '@/theme';

const DURACIONES = [
  { horas: 12, label: '12 horas' },
  { horas: 24, label: '24 horas' },
  { horas: 168, label: '1 semana' },
  { horas: 720, label: '1 mes' },
];

type Props = { visible: boolean; onClose: () => void; onCreated: () => void };

type MediaItem = { uri: string; tipo: 'foto' | 'video' };

export function StoryCreateModal({ visible, onClose, onCreated }: Props) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [duracion, setDuracion] = useState(24);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function reset() {
    setMediaList([]);
    setDuracion(24);
    setError('');
    setBusy(false);
  }

  function close() {
    reset();
    onClose();
  }

  function assetATipo(asset: ImagePicker.ImagePickerAsset): 'foto' | 'video' {
    // asset.type a veces viene null en Android incluso para video -- mimeType
    // y duration son mas confiables para no confundir video con foto.
    const esVideo = asset.type === 'video'
      || !!asset.mimeType?.startsWith('video/')
      || asset.duration != null
      || /\.(mp4|mov|webm|3gp|mkv)$/i.test(asset.uri);
    return esVideo ? 'video' : 'foto';
  }

  function agregarResultado(result: ImagePicker.ImagePickerResult) {
    if (result.canceled || !result.assets?.length) return;
    const nuevos = result.assets.map(a => ({ uri: a.uri, tipo: assetATipo(a) }));
    setMediaList(prev => [...prev, ...nuevos]);
  }

  function quitarMedia(uri: string) {
    setMediaList(prev => prev.filter(m => m.uri !== uri));
  }

  async function pickFromGallery() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { setError('Necesitas dar permiso para acceder a tus fotos.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.8,
      videoMaxDuration: 30,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });
    agregarResultado(result);
  }

  async function pickFromCamera() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { setError('Necesitas dar permiso para usar la cámara.'); return; }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.8,
      videoMaxDuration: 30,
    });
    agregarResultado(result);
  }

  async function submit() {
    if (!mediaList.length) return;
    setBusy(true);
    setError('');
    let publicadas = 0;
    try {
      // Cada foto/video se sube como una historia aparte -- el feed ya agrupa
      // las historias del mismo usuario en una sola secuencia (como WhatsApp).
      for (const media of mediaList) {
        const url = await subirMediaHistoria(media.uri, media.tipo);
        await historiasApi.crear({ media_url: url, tipo: media.tipo, duracion_horas: duracion });
        publicadas++;
      }
      onCreated();
      close();
    } catch (e) {
      const restantes = mediaList.length - publicadas;
      setError(
        publicadas > 0
          ? `Se publicaron ${publicadas}, pero ${restantes} fallaron: ${(e as Error).message}`
          : (e as Error).message || 'No se pudo publicar la historia.'
      );
      setMediaList(prev => prev.slice(publicadas));
      setBusy(false);
      if (publicadas > 0) onCreated();
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={[typography.headlineMd, { color: colors.primary }]}>Nueva historia</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
          Comparte una foto o video -- vos elegís cuánto dura visible.
        </Text>

        {mediaList.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mediaStripRow}>
            {mediaList.map(media => (
              <View key={media.uri} style={styles.mediaThumbWrap}>
                {media.tipo === 'foto' ? (
                  <Image source={{ uri: media.uri }} style={styles.mediaThumb} />
                ) : (
                  <View style={[styles.mediaThumb, styles.videoPreview]}>
                    <MaterialIcons name="videocam" size={28} color={colors.primary} />
                  </View>
                )}
                <Pressable onPress={() => quitarMedia(media.uri)} style={styles.removeThumbBadge}>
                  <MaterialIcons name="close" size={12} color="#fff" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.mediaChoiceRow}>
          <Pressable onPress={pickFromCamera} style={styles.mediaChoiceBtn}>
            <MaterialIcons name="photo-camera" size={32} color={colors.primary} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>Cámara</Text>
          </Pressable>
          <Pressable onPress={pickFromGallery} style={styles.mediaChoiceBtn}>
            <MaterialIcons name="add-photo-alternate" size={32} color={colors.primary} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
              {mediaList.length > 0 ? 'Agregar más' : 'Galería'}
            </Text>
          </Pressable>
        </View>

        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.gutter }]}>
          ¿CUÁNTO TIEMPO QUERÉS QUE SE VEA?
        </Text>
        <View style={styles.duracionRow}>
          {DURACIONES.map(d => (
            <Pressable
              key={d.horas}
              onPress={() => setDuracion(d.horas)}
              style={[styles.duracionChip, duracion === d.horas && styles.duracionChipActive]}
            >
              <Text style={[typography.labelSm, { color: duracion === d.horas ? colors.onPrimary : colors.onSurfaceVariant }]}>
                {d.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {!!error && (
          <Text style={[typography.labelSm, { color: colors.error, marginTop: spacing.gutter }]}>{error}</Text>
        )}

        {busy ? (
          <View style={{ paddingVertical: spacing.stackSm, alignItems: 'center' }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <Button
            label={mediaList.length > 1 ? `Publicar ${mediaList.length} historias` : 'Publicar historia'}
            icon="auto-awesome" onPress={submit} disabled={!mediaList.length} style={{ marginTop: spacing.stackMd }}
          />
        )}
        <Pressable onPress={close} style={{ alignSelf: 'center', padding: 12 }}>
          <Text style={[typography.labelMd, { color: colors.outline }]}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: spacing.containerPadding, paddingBottom: spacing.stackLg,
    gap: 4,
  },
  handle: { width: 50, height: 4, backgroundColor: colors.outlineVariant, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.stackSm },
  mediaStripRow: { gap: 8, marginTop: spacing.gutter },
  mediaThumbWrap: { width: 88, height: 88 },
  mediaThumb: { width: 88, height: 88, borderRadius: radii.md },
  removeThumbBadge: {
    position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center',
  },
  mediaChoiceRow: { flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.gutter },
  mediaChoiceBtn: {
    flex: 1, height: 100, borderRadius: radii.lg,
    borderWidth: 1, borderColor: colors.outlineVariant, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  videoPreview: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
  duracionRow: { flexDirection: 'row', gap: 8, marginTop: spacing.stackSm, flexWrap: 'wrap' },
  duracionChip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: radii.full,
    borderWidth: 1, borderColor: colors.outlineVariant,
  },
  duracionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
});
