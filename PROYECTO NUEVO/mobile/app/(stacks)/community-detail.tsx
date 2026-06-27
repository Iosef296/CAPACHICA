import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { GlassPanel } from '@/components/GlassPanel';
import { HeartButton } from '@/components/HeartButton';
import { BookingModal } from '@/components/BookingModal';
import { useState } from 'react';
import { colors, radii, spacing, typography } from '@/theme';

const COVER = 'https://picsum.photos/id/1018/1600/900';

export default function CommunityDetail() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground source={{ uri: COVER }} style={styles.hero}>
        <LinearGradient colors={['rgba(0,66,104,0.1)', 'rgba(0,66,104,0.8)']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.heroTop}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.iconBtn}>
            <HeartButton id="comm-llachon" light size={22} />
          </View>
        </View>
        <View style={styles.heroBody}>
          <Text style={[typography.labelMd, { color: colors.sunGold }]}>PENÍNSULA DE CAPACHICA</Text>
          <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>Llachón</Text>
          <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)', marginTop: 6 }]}>
            Tejidos, navegación tradicional y vida lacustre.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.statsRow}>
        <Stat icon="groups" label="Familias" value="14" />
        <Stat icon="map" label="Senderos" value="6" />
        <Stat icon="star" label="Rating" value="4.9" />
      </View>

      <View style={styles.section}>
        <Text style={[typography.headlineMd, { color: colors.primary }]}>Sobre Llachón</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
          A orillas del Titicaca, Llachón es famosa por sus tejidos de alpaca y por las balsas de
          totora aún utilizadas para la pesca artesanal. Sus familias reciben viajeros desde hace
          más de 30 años en hospedajes de adobe con vista al lago.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>EXPERIENCIAS</Text>
        {['Taller de tejido con Mamá Victoria', 'Pesca artesanal al amanecer', 'Cena tradicional bajo las estrellas'].map(e => (
          <GlassPanel key={e} style={{ marginTop: spacing.stackSm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
              <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{e}</Text>
            </View>
          </GlassPanel>
        ))}
      </View>

      <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, marginBottom: spacing.stackLg }}>
        <Button label="Reservar experiencia" icon="bookmark" onPress={() => setShowModal(true)} />
      </View>

      <BookingModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Estancia en Llachón"
        pricePerUnit={120}
        unitLabel="noche"
      />
    </ScrollView>
  );
}

function Stat({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1, gap: 2 }}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.headlineMd, { color: colors.primary }]}>{value}</Text>
      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 360 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.containerPadding, marginTop: 40 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  heroBody: { marginTop: 'auto', padding: spacing.containerPadding },
  statsRow: { flexDirection: 'row', backgroundColor: colors.surfaceContainerLowest, marginHorizontal: spacing.containerPadding, marginTop: -30, borderRadius: radii.xl, padding: spacing.gutter, gap: spacing.gutter, elevation: 4 },
  section: { paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg },
});
