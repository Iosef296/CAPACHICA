import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { GlassPanel } from '@/components/GlassPanel';
import { Button } from '@/components/Button';
import { StarRating } from '@/components/StarRating';
import { HeartButton } from '@/components/HeartButton';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const ROUTES = [
  { id: 'r1', title: 'Mística del Titicaca', days: '3 días · Sillustani–Amantaní', isNew: true,  img: 'https://picsum.photos/id/1018/800/500' },
  { id: 'r2', title: 'Tejidos de Taquile',   days: '1 día cultural',                isNew: false, img: 'https://picsum.photos/id/177/800/500' },
];

export default function ProfileExtended() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="MI VIAJE" title="¡Jallalla, Elena!" back />

        <View style={styles.statsBento}>
          <BentoStat icon="groups" value="12" label="Comunidades exploradas" big />
          <BentoStat icon="explore" value="45" label="Experiencias" />
        </View>

        <Text style={styles.sectionTitle}>RUTAS DE KILLA AI</Text>
        <View style={{ paddingHorizontal: spacing.containerPadding, gap: spacing.gutter }}>
          {ROUTES.map(r => (
            <View key={r.id} style={styles.routeCard}>
              <Image source={{ uri: r.img }} style={styles.routeImg} />
              <View style={styles.routeBody}>
                {r.isNew && <View style={styles.newTag}><Text style={[typography.labelSm, { color: '#fff' }]}>NUEVO</Text></View>}
                <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{r.title}</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{r.days}</Text>
                <Button label="Retomar ruta" variant="ghost" icon="play-arrow" style={{ marginTop: spacing.stackSm }} />
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>CALIFICAR EXPERIENCIAS</Text>
        <GlassPanel style={{ marginHorizontal: spacing.containerPadding }}>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>HACE 2 DÍAS</Text>
          <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold', marginTop: 2 }]}>
            Taller de Cerámica Llachón
          </Text>
          <View style={{ marginTop: spacing.stackSm }}>
            <StarRating id="ceramica-llachon" />
          </View>
        </GlassPanel>

        <Text style={styles.sectionTitle}>MIS FAVORITOS</Text>
        <View style={{ paddingHorizontal: spacing.containerPadding }}>
          <View style={styles.favRow}>
            <Image source={{ uri: 'https://picsum.photos/id/250/400/400' }} style={styles.favImg} />
            <View style={{ flex: 1 }}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>ARQUEOLOGÍA</Text>
              <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>Chullpas de Sillustani</Text>
            </View>
            <HeartButton id="fav-sillustani" />
          </View>
        </View>
        <View style={{ height: spacing.stackLg }} />
      </SafeAreaView>
    </ScrollView>
  );
}

function BentoStat({ icon, value, label, big }: { icon: any; value: string; label: string; big?: boolean }) {
  return (
    <View style={[styles.bentoStat, big && { flex: 1.6 }]}>
      <MaterialIcons name={icon} size={24} color={colors.sunGold} />
      <Text style={[typography.displayLg, { color: '#fff', fontSize: big ? 44 : 32 }]}>{value}</Text>
      <Text style={[typography.labelSm, { color: 'rgba(255,255,255,0.85)' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsBento: { flexDirection: 'row', gap: spacing.gutter, paddingHorizontal: spacing.containerPadding },
  bentoStat: { flex: 1, backgroundColor: colors.primary, borderRadius: radii.xl, padding: spacing.gutter, gap: 4, minHeight: 140 },
  sectionTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackSm },
  routeCard: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, overflow: 'hidden', ...shadows.card },
  routeImg: { width: '100%', height: 160 },
  routeBody: { padding: spacing.gutter },
  newTag: { alignSelf: 'flex-start', backgroundColor: colors.textilePink, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.full, marginBottom: 6 },
  favRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, backgroundColor: colors.surfaceContainerLow, padding: spacing.base, borderRadius: radii.lg },
  favImg: { width: 70, height: 70, borderRadius: radii.md },
});
