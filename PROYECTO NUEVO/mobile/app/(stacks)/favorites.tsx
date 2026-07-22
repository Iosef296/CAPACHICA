import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Button } from '@/components/Button';
import { useFavorites } from '@/data/favorites';
import { stays, activities, communities } from '@/data/mock';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, shadows, spacing, typography } from '@/theme';

export default function Favorites() {
  const { favorites } = useFavorites();
  const router = useRouter();
  const cfg = useAppConfig();

  const stayItems = stays.filter(s => favorites.has(`stay-${s.id}`));
  const activityItems = activities.filter(a => favorites.has(`act-${a.id}`));
  const hasFavExp = favorites.has('exp-tejido');
  const hasFavComm = favorites.has('comm-llachon');
  const isEmpty = stayItems.length + activityItems.length + (hasFavExp ? 1 : 0) + (hasFavComm ? 1 : 0) === 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']}>
        <ScreenHeader eyebrow={cfg.text('favorites.eyebrow', 'GUARDADOS')} title={cfg.text('favorites.title', 'Mis Favoritos')} back />

        {isEmpty ? (
          <View style={styles.empty}>
            <MaterialIcons name="favorite-border" size={64} color={colors.outlineVariant} />
            <Text style={[typography.headlineMd, { color: colors.onSurface, marginTop: spacing.gutter }]}>
              {cfg.text('favorites.emptyTitle', 'Sin favoritos aún')}
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 6 }]}>
              {cfg.text('favorites.emptySubtitle', 'Toca el corazón en cualquier hospedaje, comunidad o experiencia para guardarla aquí.')}
            </Text>
            <Button label={cfg.text('favorites.emptyCta', 'Explorar')} icon="explore" onPress={() => router.push('/(stacks)/communities')} style={{ marginTop: spacing.stackMd, alignSelf: 'stretch' }} />
          </View>
        ) : (
          <View style={{ paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, marginTop: spacing.gutter }}>
            {stayItems.map(s => <FavCard key={s.id} title={s.name} subtitle={s.community} price={`S/ ${s.price}/noche`} icon="hotel" />)}
            {hasFavExp && <FavCard title="Taller de Tejido" subtitle="Mamá Victoria · Llachón" price="S/ 60" icon="palette" />}
            {hasFavComm && <FavCard title="Llachón" subtitle="Familia ancestral" price="12 experiencias" icon="groups" />}
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

function FavCard({ title, subtitle, price, icon }: { title: string; subtitle: string; price: string; icon: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialIcons name={icon} size={28} color={colors.terracotta} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[typography.labelSm, { color: colors.secondary }]}>{subtitle.toUpperCase()}</Text>
        <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]} numberOfLines={1}>{title}</Text>
        <Text style={[typography.bodyMd, { color: colors.primary }]}>{price}</Text>
      </View>
      <MaterialIcons name="favorite" size={20} color={colors.textilePink} />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { padding: spacing.stackLg, alignItems: 'center', marginTop: spacing.stackLg },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, backgroundColor: colors.surfaceContainerLowest, padding: spacing.gutter, borderRadius: radii.lg, ...shadows.card },
  iconWrap: { width: 56, height: 56, borderRadius: radii.md, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
});
