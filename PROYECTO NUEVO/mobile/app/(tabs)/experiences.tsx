import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PhotoCard } from '@/components/Card';
import { api, Actividad, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useAppConfig } from '@/data/AppConfigContext';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { colors, spacing, typography } from '@/theme';

export default function Experiences() {
  const router = useRouter();
  const insets = useSafeInsets();
  const cfg = useAppConfig();
  const [items, setItems] = useState<Actividad[]>([]);
  useLiveRefresh(() => { api.actividades().then(setItems); }, { url: API_WS, channels: 'actividades' });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingTop: insets.top }}>
        <View style={styles.header}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>
            {cfg.text('experiences.eyebrow', 'EXPERIENCIAS')}
          </Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>
            {cfg.text('experiences.headline', 'Vive Capachica')}
          </Text>
        </View>
        <View style={styles.grid}>
          {items.map(a => (
            <PhotoCard key={a.id}
              image={a.imagen || 'https://picsum.photos/seed/' + a.id + '/600/400'}
              title={a.nombre}
              badge={a.ubicacion ? { label: a.ubicacion.toUpperCase(), tone: 'primary' } : undefined}
              width={undefined as any}
              height={280}
              onPress={() => router.push({ pathname: '/(stacks)/experience-detail', params: { id: String(a.id) } })}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.containerPadding },
  grid: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, paddingBottom: spacing.stackLg },
});
