import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { api } from '@/data/api';
import { colors, spacing, typography } from '@/theme';

export default function GuideDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [guide, setGuide] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeInsets();

  useEffect(() => {
    api.guides().then(list => {
      const found = id ? list.find((g: any) => String(g.id) === String(id)) : null;
      setGuide(found ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!guide) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: spacing.gutter, padding: spacing.containerPadding }}>
        <MaterialIcons name="menu-book" size={48} color={colors.outlineVariant} />
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>No se encontró esta guía.</Text>
        <Button label="Volver" icon="arrow-back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: spacing.stackLg + insets.bottom }}>
      <View style={styles.hero}>
        <Image source={{ uri: guide.img }} style={styles.heroImg} />
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: insets.top + 8 }]}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
      </View>
      <View style={{ padding: spacing.containerPadding, gap: spacing.stackSm }}>
        <Text style={[typography.labelMd, { color: colors.secondary }]}>
          {guide.type === 'viaje' ? 'GUÍA DE VIAJE' : 'GUÍA CULTURAL'}
        </Text>
        <Text style={[typography.headlineLg, { color: colors.onSurface }]}>{guide.title}</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, lineHeight: 22, marginTop: spacing.stackSm }]}>
          {guide.excerpt}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 240 },
  heroImg: { width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute', left: spacing.containerPadding, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center',
  },
});
