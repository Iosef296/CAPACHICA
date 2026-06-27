import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GlassPanel } from '@/components/GlassPanel';
import { colors, radii, spacing, typography } from '@/theme';

const SKY = 'https://picsum.photos/id/1015/1600/900';

export default function AR() {
  const router = useRouter();
  return (
    <ImageBackground source={{ uri: SKY }} style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(192,93,56,0.4)', 'rgba(129,0,49,0.6)']} style={StyleSheet.absoluteFillObject} />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <Text style={[typography.labelMd, { color: '#fff' }]}>CAPACHICA · AR</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.label}>
          <GlassPanel intensity={60} tint="dark" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={[typography.labelSm, { color: colors.sunGold }]}>📍 2.4 km</Text>
            <Text style={[typography.headlineMd, { color: '#fff', marginTop: 2 }]}>Mirador Tikonata</Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)' }]}>Vista 360° del Titicaca</Text>
          </GlassPanel>
        </View>

        <View style={styles.reticle}>
          <View style={styles.reticleBox}>
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
          </View>
          <Text style={[typography.labelSm, { color: '#fff', marginTop: 12, textAlign: 'center' }]}>
            Apunta a un lugar para escanear
          </Text>
        </View>

        <View style={styles.bottomBubble}>
          <GlassPanel intensity={80} tint="light">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <MaterialIcons name="auto-awesome" size={18} color={colors.sunGold} />
              <Text style={[typography.labelMd, { color: colors.primary }]}>KILLA AI</Text>
            </View>
            <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 6 }]}>
              El Titicaca es el lago navegable más alto del mundo (3,812 m).
            </Text>
          </GlassPanel>
        </View>

        <Pressable style={styles.scanBtn}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
          <Text style={[typography.labelMd, { color: '#fff' }]}>ESCANEAR</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.containerPadding },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  label: { position: 'absolute', top: 140, left: spacing.containerPadding, right: spacing.containerPadding * 4 },
  reticle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  reticleBox: { width: 220, height: 220 },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: colors.sunGold },
  tl: { top: 0, left: 0, borderLeftWidth: 3, borderTopWidth: 3 },
  tr: { top: 0, right: 0, borderRightWidth: 3, borderTopWidth: 3 },
  bl: { bottom: 0, left: 0, borderLeftWidth: 3, borderBottomWidth: 3 },
  br: { bottom: 0, right: 0, borderRightWidth: 3, borderBottomWidth: 3 },
  bottomBubble: { position: 'absolute', bottom: 130, left: spacing.containerPadding, right: spacing.containerPadding },
  scanBtn: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: radii.full,
  },
});
