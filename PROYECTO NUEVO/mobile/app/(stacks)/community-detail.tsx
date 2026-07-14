import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button } from '@/components/Button';
import { GlassPanel } from '@/components/GlassPanel';
import { HeartButton } from '@/components/HeartButton';
import { BookingModal } from '@/components/BookingModal';
import { api } from '@/data/api';
import { colors, radii, spacing, typography } from '@/theme';

const COVER_FALLBACK = 'https://picsum.photos/id/1018/1600/900';

export default function CommunityDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [showModal, setShowModal] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [community, setCommunity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeInsets();
  const video: string = community?.video ?? '';
  const player = useVideoPlayer(video || null);

  useEffect(() => {
    api.communities().then(list => {
      const found = id ? list.find((c: any) => String(c.id) === String(id)) : list[0];
      setCommunity(found ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!community) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: spacing.gutter, padding: spacing.containerPadding }}>
        <MaterialIcons name="groups" size={48} color={colors.outlineVariant} />
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>No se encontró esta familia.</Text>
        <Button label="Volver" icon="arrow-back" onPress={() => router.back()} />
      </View>
    );
  }

  const nombre = community.nombre ?? community.name ?? 'Familia anfitriona';
  const ubicacion = community.comunidad ?? 'Península de Capachica';
  const descripcion = community.desc ?? community.description ?? '';
  const highlight = community.highlight ?? '';
  const tags: string[] = Array.isArray(community.tags) ? community.tags : [];
  const imagen = community.imagen ?? community.image ?? COVER_FALLBACK;
  const imagenes: string[] = Array.isArray(community.imagenes) ? community.imagenes : [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      onScroll={e => setPastHero(e.nativeEvent.contentOffset.y > styles.hero.height - insets.top)}
    >
      <ImageBackground source={{ uri: imagen }} style={styles.hero}>
        <LinearGradient colors={['rgba(0,66,104,0.1)', 'rgba(0,66,104,0.8)']} style={StyleSheet.absoluteFillObject} />
        <View style={[styles.heroTop, { marginTop: insets.top + 8 }]}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.iconBtn}>
            <HeartButton id={`comm-${community.id}`} light size={22} />
          </View>
        </View>
        <View style={styles.heroBody}>
          <Text style={[typography.labelMd, { color: colors.sunGold }]}>{ubicacion.toUpperCase()}</Text>
          <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>{nombre}</Text>
          {!!highlight && (
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)', marginTop: 6 }]}>{highlight}</Text>
          )}
        </View>
      </ImageBackground>

      {tags.length > 0 && (
        <View style={styles.tagsRow}>
          {tags.map(tag => (
            <View key={tag} style={styles.tagChip}>
              <Text style={[typography.labelSm, { color: colors.primary }]}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {!!descripcion && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Sobre {nombre}</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
            {descripcion}
          </Text>
        </View>
      )}

      {imagenes.length > 0 && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Fotos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRow}>
            {imagenes.map((url, i) => (
              <Image key={url + i} source={{ uri: url }} style={styles.galleryImg} />
            ))}
          </ScrollView>
        </View>
      )}

      {!!video && (
        <View style={styles.section}>
          <Text style={[typography.headlineMd, { color: colors.primary }]}>Video</Text>
          <VideoView player={player} style={styles.video} contentFit="cover" nativeControls />
        </View>
      )}

      <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, marginBottom: spacing.stackLg + insets.bottom }}>
        <Button label="Reservar experiencia" icon="bookmark" onPress={() => setShowModal(true)} />
      </View>

      <BookingModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={`Estancia en ${nombre}`}
        pricePerUnit={120}
        unitLabel="noche"
      />
    </ScrollView>
      {pastHero && (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: colors.background }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 360 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.containerPadding, marginTop: 40 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  heroBody: { marginTop: 'auto', padding: spacing.containerPadding },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd },
  tagChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.full, backgroundColor: colors.surfaceContainerLow, borderWidth: 1, borderColor: colors.outlineVariant },
  section: { paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg },
  galleryRow: { gap: 8, marginTop: 10 },
  galleryImg: { width: 140, height: 100, borderRadius: radii.md },
  video: { width: '100%', height: 210, borderRadius: radii.md, marginTop: 10, backgroundColor: '#000' },
});
