import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { GlassPanel } from '@/components/GlassPanel';
import { useAuth } from '@/auth/AuthContext';
import { profile } from '@/data/mock';
import { colors, radii, spacing, typography } from '@/theme';

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const display = {
    name: user?.name ?? profile.name,
    avatar: user?.avatar ?? profile.avatar,
    email: user?.email,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <View style={styles.avatarRing}>
            {display.avatar ? (
              <Image source={{ uri: display.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <MaterialIcons name="person" size={56} color={colors.onPrimaryContainer} />
              </View>
            )}
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.stackSm }]}>
            {display.name}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            {display.email ?? profile.handle}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.stackSm, paddingHorizontal: spacing.containerPadding }]}>
            {profile.bio}
          </Text>
        </View>

        <View style={styles.stats}>
          <Stat label="Viajes" value={profile.stats.trips} />
          <Stat label="Reseñas" value={profile.stats.reviews} />
          <Stat label="Insignias" value={profile.stats.badges} />
        </View>

        <GlassPanel style={{ marginHorizontal: spacing.containerPadding, marginTop: spacing.stackMd }}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>VIAJERO ANCESTRAL</Text>
          <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: 4 }]}>
            Nivel 2 · Explorador del Lago
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>
            Completa 2 experiencias más para alcanzar el nivel Tejedor de Historias.
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
