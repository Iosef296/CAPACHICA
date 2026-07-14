import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors } from '@/theme';

export type MediaItem = { type: 'foto' | 'video'; url: string };

type Props = {
  visible: boolean;
  media: MediaItem[];
  initialIndex?: number;
  onClose: () => void;
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export function MediaViewer({ visible, media, initialIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const scrollRef = useRef<ScrollView>(null);

  function handleShow() {
    setIndex(initialIndex);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: initialIndex * SCREEN_W, animated: false });
    });
  }

  function onMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onShow={handleShow} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <MaterialIcons name="close" size={26} color="#fff" />
        </Pressable>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumEnd}
        >
          {media.map((m, i) => (
            <View key={m.url + i} style={styles.page}>
              {m.type === 'foto' ? (
                <Image source={{ uri: m.url }} style={styles.media} resizeMode="contain" />
              ) : (
                <VideoPage url={m.url} active={i === index} />
              )}
            </View>
          ))}
        </ScrollView>

        {media.length > 1 && (
          <View style={styles.dots}>
            {media.map((m, i) => (
              <View key={m.url + i} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
}

function VideoPage({ url, active }: { url: string; active: boolean }) {
  const player = useVideoPlayer(active ? url : null, p => { p.play(); });
  if (!active) return <View style={styles.media} />;
  return <VideoView player={player} style={styles.media} contentFit="contain" nativeControls />;
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#000' },
  closeBtn: {
    position: 'absolute', top: 48, right: 16, zIndex: 10,
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  page: { width: SCREEN_W, height: SCREEN_H, alignItems: 'center', justifyContent: 'center' },
  media: { width: SCREEN_W, height: SCREEN_H },
  dots: {
    position: 'absolute', bottom: 32, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'center', gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: colors.primary, width: 18 },
});
