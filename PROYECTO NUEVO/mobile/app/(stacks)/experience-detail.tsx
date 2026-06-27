import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { HeartButton } from '@/components/HeartButton';
import { BookingModal } from '@/components/BookingModal';
import { useState } from 'react';
import { colors, radii, spacing, typography } from '@/theme';

const COVER = 'https://picsum.photos/id/177/1600/900';

export default function ExperienceDetail() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground source={{ uri: COVER }} style={styles.hero}>
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,66,104,0.85)']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.heroTop}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.iconBtn}>
            <HeartButton id="exp-tejido" light size={24} />
          </View>
        </View>
        <View style={styles.heroBody}>
          <Text style={[typography.labelMd, { color: colors.sunGold }]}>EXPERIENCIA VIVENCIAL</Text>
          <Text style={[typography.headlineLg, { color: '#fff', marginTop: 4 }]}>Taller de Tejido</Text>
          <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)' }]}>4 horas · Chifrón · S/ 60</Text>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={[typography.headlineMd, { color: colors.primary }]}>Lo que vivirás</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
          Mamá Victoria te enseñará a usar el telar de cintura, los significados de los símbolos
          (Chakana, Cóndor) y a teñir con cochinilla y añil. Te llevas tu propio chumpi.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>INCLUYE</Text>
        {['Materiales y lana de alpaca', 'Almuerzo tradicional', 'Tu pieza terminada para llevar'].map(i => (
          <View key={i} style={styles.includeRow}>
            <MaterialIcons name="check-circle" size={18} color={colors.terracotta} />
            <Text style={[typography.bodyMd, { color: colors.onSurface, flex: 1 }]}>{i}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>ANFITRIONA</Text>
        <View style={styles.host}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={32} color={colors.onPrimaryContainer} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>Mamá Victoria</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>MAESTRA TEJEDORA · 30 AÑOS</Text>
          </View>
          <Pressable style={styles.chatBtn}>
            <MaterialIcons name="chat" size={20} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackLg }}>
        <Button label="Reservar por S/ 60" icon="event-available" onPress={() => setShowModal(true)} />
      </View>

      <BookingModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Taller de Tejido — Mamá Victoria"
        pricePerUnit={60}
        unitLabel="persona"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 380 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.containerPadding, marginTop: 40 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  heroBody: { marginTop: 'auto', padding: spacing.containerPadding },
  section: { paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg },
  includeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  host: { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, marginTop: spacing.stackSm, backgroundColor: colors.surfaceContainerLow, padding: spacing.gutter, borderRadius: radii.lg },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  chatBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceContainerLowest, alignItems: 'center', justifyContent: 'center' },
});
