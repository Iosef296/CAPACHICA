import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { GlassPanel } from '@/components/GlassPanel';
import { useAuth } from '@/auth/AuthContext';
import { reservas as reservasApi, ReservaMia, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useRatings } from '@/data/ratings';
import { colors, radii, spacing, typography } from '@/theme';

// Niveles derivados de la cantidad real de viajes (reservas no canceladas)
// del usuario -- cada cuenta arranca en Nivel 1 con 0 de todo y sube sola
// a medida que reserva experiencias.
const NIVELES = [
  { minViajes: 0, titulo: 'Viajero Novato' },
  { minViajes: 3, titulo: 'Explorador del Lago' },
  { minViajes: 6, titulo: 'Tejedor de Historias' },
  { minViajes: 10, titulo: 'Guardián Ancestral' },
];

function calcularNivel(viajes: number) {
  let i = 0;
  for (let j = 0; j < NIVELES.length; j++) {
    if (viajes >= NIVELES[j].minViajes) i = j;
  }
  const siguiente = NIVELES[i + 1];
  return {
    nivel: i + 1,
    titulo: NIVELES[i].titulo,
    insignias: i,
    siguienteTitulo: siguiente?.titulo,
    faltan: siguiente ? siguiente.minViajes - viajes : 0,
  };
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [reservasList, setReservasList] = useState<ReservaMia[]>([]);
  const { all: ratingsAll } = useRatings();

  useLiveRefresh(() => {
    if (!user) return;
    reservasApi.mias().then(setReservasList).catch(() => setReservasList([]));
  }, { url: API_WS, channels: ['reservas'] });

  // Una reserva "pendiente" todavia no es un viaje -- solo cuenta si un
  // admin la confirmo de verdad.
  const viajes = reservasList.filter(r => r.estado === 'confirmada').length;
  const resenas = Object.keys(ratingsAll).length;
  const { nivel, titulo, insignias, siguienteTitulo, faltan } = calcularNivel(viajes);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.avatarRing}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <MaterialIcons name="person" size={56} color={colors.onPrimaryContainer} />
              </View>
            )}
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.stackSm }]}>
            {user?.name ?? 'Viajero'}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            {user?.email}
          </Text>
        </View>

        <View style={styles.stats}>
          <Stat label="Viajes" value={viajes} />
          <Stat label="Reseñas" value={resenas} />
          <Stat label="Insignias" value={insignias} />
        </View>

        <GlassPanel style={{ marginHorizontal: spacing.containerPadding, marginTop: spacing.stackMd }}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>VIAJERO ANCESTRAL</Text>
          <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 4 }]}>
            Nivel {nivel} · {titulo}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
            {siguienteTitulo
              ? `Completa ${faltan} experiencia${faltan === 1 ? '' : 's'} más para alcanzar el nivel ${siguienteTitulo}.`
              : '¡Alcanzaste el nivel máximo!'}
          </Text>
        </GlassPanel>

        <View style={styles.menu}>
          {user?.rol === 'admin' && (
            <MenuItem icon="admin-panel-settings" label="Usuarios" onPress={() => router.push('/(stacks)/manage-users')} />
          )}
          <MenuItem icon="storefront" label="Mi negocio" onPress={() => router.push('/(stacks)/my-business')} />
          <MenuItem icon="auto-awesome" label="Mis rutas y favoritos" onPress={() => router.push('/(stacks)/profile-extended')} />
          <MenuItem icon="bookmark" label="Mis reservas" onPress={() => router.push('/(stacks)/my-bookings')} />
          <MenuItem icon="favorite" label="Favoritos" onPress={() => router.push('/(stacks)/favorites')} />
          <MenuItem icon="menu-book" label="Guías de viaje" onPress={() => router.push('/(stacks)/guides?type=travel')} />
          <MenuItem icon="settings" label="Configuración" onPress={() => router.push('/(stacks)/settings')} />
          <MenuItem icon="help-outline" label="Ayuda" onPress={() => router.push('/(stacks)/help')} />
        </View>

        <View style={{ paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd, marginBottom: spacing.stackLg }}>
          <Button label="Cerrar sesión" variant="ghost" icon="logout" onPress={signOut} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={[typography.headlineLg, { color: colors.primary }]}>{value}</Text>
      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>{label}</Text>
    </View>
  );
}

function MenuItem({ icon, label, onPress }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      <MaterialIcons name="chevron-right" size={22} color={colors.outline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: spacing.stackMd, paddingHorizontal: spacing.containerPadding },
  avatarRing: { padding: 3, borderRadius: 64, borderWidth: 2, borderColor: colors.terracotta },
  avatar: { width: 112, height: 112, borderRadius: 56 },
  avatarFallback: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackMd },
  menu: { marginTop: spacing.stackMd, paddingHorizontal: spacing.containerPadding, gap: 4 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter,
    paddingVertical: 18,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
});
