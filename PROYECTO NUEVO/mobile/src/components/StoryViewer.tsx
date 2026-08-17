import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedAnimated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { Historia } from '@/data/api';
import { colors, spacing, typography } from '@/theme';

const PHOTO_DURATION_MS = 5000;
const BROKEN_MEDIA_DURATION_MS = 2500;
const LONG_PRESS_MS = 220;
const DOUBLE_TAP_MS = 280;

type Props = {
  group: Historia[] | null;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  liked: boolean;
  onToggleLike: () => void;
  canDelete: boolean;
  onDelete: () => void;
};

export function StoryViewer({ group, index, onClose, onNext, onPrev, liked, onToggleLike, canDelete, onDelete }: Props) {
  const insets = useSafeInsets();
  const progress = useRef(new Animated.Value(0)).current;
  const [videoDurationMs, setVideoDurationMs] = useState<number | null>(null);
  const [mediaError, setMediaError] = useState(false);
  const historia = group?.[index] ?? null;
  // Sin url no hay nada que cargar -- tratalo como error directo, no como
  // pantalla negra esperando un Image que nunca va a disparar onError.
  const broken = mediaError || !historia?.media_url;

  const pausedValueRef = useRef(0);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);
  const tapXRef = useRef(0);
  const tapYRef = useRef(0);
  const lastTapRef = useRef(0);

  // Zoom con pellizco -- se resetea al cambiar de historia.
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Corazón que aparece al doble-tap, como Instagram.
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 });

  const player = useVideoPlayer(historia?.tipo === 'video' ? historia.media_url : null, p => {
    p.play();
  });

  function startProgressAnim(fromValue: number, totalMs: number) {
    const remaining = Math.max(1, totalMs * (1 - fromValue));
    const anim = Animated.timing(progress, { toValue: 1, duration: remaining, useNativeDriver: false });
    anim.start(({ finished }) => { if (finished) onNext(); });
    return anim;
  }

  useEffect(() => {
    if (!historia) return;
    progress.setValue(0);
    setVideoDurationMs(null);
    setMediaError(!historia.media_url);
    scale.value = 1;
    savedScale.value = 1;
    heartScale.value = 0;
    heartOpacity.value = 0;

    if (historia.tipo === 'foto' && historia.media_url) {
      const anim = startProgressAnim(0, PHOTO_DURATION_MS);
      return () => anim.stop();
    }
  }, [historia?.id]);

  // Sin media_url no hay nada que cargar ni reproducir (dato corrupto que
  // se coló antes de que el backend lo validara) -- avanza sola en vez de
  // quedarse trabada mostrando el aviso de error para siempre.
  useEffect(() => {
    if (!historia || historia.media_url) return;
    const t = setTimeout(() => onNext(), BROKEN_MEDIA_DURATION_MS);
    return () => clearTimeout(t);
  }, [historia?.id]);

  useEffect(() => {
    if (historia?.tipo !== 'video' || !player) return;
    const sub = player.addListener('statusChange', ({ status }) => {
      if (status === 'readyToPlay' && player.duration) {
        setVideoDurationMs(player.duration * 1000);
      } else if (status === 'error') {
        setMediaError(true);
      }
    });
    const endSub = player.addListener('playToEnd', () => onNext());
    return () => { sub.remove(); endSub.remove(); };
  }, [player, historia?.id]);

  useEffect(() => {
    if (historia?.tipo !== 'video' || !videoDurationMs) return;
    const anim = startProgressAnim(0, videoDurationMs);
    return () => anim.stop();
  }, [videoDurationMs]);

  function pause() {
    progress.stopAnimation(value => { pausedValueRef.current = value; });
    if (historia?.tipo === 'video') player.pause();
  }

  function resume() {
    const total = historia?.tipo === 'foto' ? PHOTO_DURATION_MS : videoDurationMs;
    if (total) startProgressAnim(pausedValueRef.current, total);
    if (historia?.tipo === 'video') player.play();
  }

  function handlePressIn(e: any) {
    tapXRef.current = e.nativeEvent.locationX;
    tapYRef.current = e.nativeEvent.locationY;
    isLongPressRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      pause();
    }, LONG_PRESS_MS);
  }

  function popHeart() {
    setHeartPos({ x: tapXRef.current, y: tapYRef.current });
    heartScale.value = 0;
    heartOpacity.value = 1;
    heartScale.value = withSequence(withTiming(1.3, { duration: 180 }), withTiming(1, { duration: 100 }));
    heartOpacity.value = withTiming(0, { duration: 220 });
  }

  function handlePressOut() {
    if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
    if (isLongPressRef.current) {
      resume();
      return;
    }

    const now = Date.now();
    const isDoubleTap = now - lastTapRef.current < DOUBLE_TAP_MS;
    lastTapRef.current = isDoubleTap ? 0 : now;

    if (isDoubleTap) {
      popHeart();
      if (!liked) onToggleLike();
      return; // el doble-tap solo likea, no navega de nuevo
    }

    const screenWidth = Dimensions.get('window').width;
    if (tapXRef.current < screenWidth / 3) onPrev(); else onNext();
  }

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => { scale.value = Math.min(4, Math.max(1, savedScale.value * e.scale)); })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value <= 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
      }
    });

  const zoomStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const heartAnimStyle = useAnimatedStyle(() => ({
    opacity: heartOpacity.value,
    transform: [{ scale: heartScale.value }],
  }));

  if (!historia || !group) return null;

  function confirmDelete() {
    Alert.alert('Eliminar historia', '¿Seguro que querés eliminarla? No se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: onDelete },
    ]);
  }

  return (
    <Modal visible={!!historia} animationType="fade" onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
        <GestureDetector gesture={pinchGesture}>
          <ReanimatedAnimated.View style={[StyleSheet.absoluteFillObject, zoomStyle]}>
            {broken ? (
              <View style={[StyleSheet.absoluteFillObject, styles.brokenMedia]}>
                <MaterialIcons name="image-not-supported" size={48} color="rgba(255,255,255,0.6)" />
                <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.6)', marginTop: spacing.stackSm }]}>
                  No se pudo cargar este contenido
                </Text>
              </View>
            ) : historia.tipo === 'foto' ? (
              <Image
                source={{ uri: historia.media_url }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="contain"
                onError={() => setMediaError(true)}
              />
            ) : (
              <VideoView player={player} style={StyleSheet.absoluteFillObject} contentFit="contain" nativeControls={false} />
            )}
          </ReanimatedAnimated.View>
        </GestureDetector>

        <View
          style={StyleSheet.absoluteFillObject}
          onTouchStart={handlePressIn}
          onTouchEnd={handlePressOut}
        />

        <ReanimatedAnimated.View
          pointerEvents="none"
          style={[styles.heart, { left: heartPos.x - 40, top: heartPos.y - 40 }, heartAnimStyle]}
        >
          <MaterialIcons name="favorite" size={80} color={colors.terracotta} />
        </ReanimatedAnimated.View>

        <View style={[styles.top, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
          <View style={styles.segments}>
            {group.map((_, i) => (
              <View key={i} style={styles.progressTrack}>
                {i < index ? (
                  <View style={[styles.progressFill, { width: '100%' }]} />
                ) : i === index ? (
                  <Animated.View
                    style={[styles.progressFill, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}
                  />
                ) : null}
              </View>
            ))}
          </View>
          <View style={styles.headerRow}>
            <View style={styles.userRow}>
              {historia.usuario_foto ? (
                <Image source={{ uri: historia.usuario_foto }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarFallback]}>
                  <MaterialIcons name="person" size={16} color="#fff" />
                </View>
              )}
              <Text style={[typography.labelMd, { color: '#fff' }]}>{historia.usuario_nombre}</Text>
            </View>
            <MaterialIcons name="close" size={26} color="#fff" onPress={onClose} suppressHighlighting />
          </View>
        </View>

        <View style={[styles.bottom, { paddingBottom: insets.bottom + spacing.gutter }]} pointerEvents="box-none">
          <MaterialIcons
            name={liked ? 'favorite' : 'favorite-border'}
            size={26}
            color={liked ? colors.terracotta : '#fff'}
            onPress={onToggleLike}
            suppressHighlighting
          />
          <Text style={[typography.labelMd, { color: '#fff' }]}>{historia.likes_count}</Text>
          {canDelete && (
            <MaterialIcons
              name="delete-outline"
              size={24}
              color="#fff"
              onPress={confirmDelete}
              suppressHighlighting
              style={{ marginLeft: spacing.stackMd }}
            />
          )}
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  heart: { position: 'absolute', width: 80, height: 80 },
  brokenMedia: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.containerPadding },
  top: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: spacing.containerPadding, gap: spacing.stackSm },
  segments: { flexDirection: 'row', gap: 4 },
  progressTrack: { flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14 },
  avatarFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.25)' },
  bottom: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: spacing.containerPadding,
  },
});
