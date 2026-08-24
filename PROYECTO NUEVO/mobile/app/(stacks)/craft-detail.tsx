import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { api } from '@/data/api';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, spacing, typography } from '@/theme';

export default function CraftDetail() {
  const router = useRouter();
  const cfg = useAppConfig();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [craft, setCraft] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeInsets();

  useEffect(() => {
    api.crafts().then(list => {
      const found = id ? list.find((c: any) => String(c.id) === String(id)) : null;
      setCraft(found ?? null);
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

  if (!craft) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: spacing.gutter, padding: spacing.containerPadding }}>
        <MaterialIcons name="palette" size={48} color={colors.outlineVariant} />
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>No se encontró este producto.</Text>
        <Button label="Volver" icon="arrow-back" onPress={() => router.back()} />
      </View>
    );
  }

  const whatsapp = cfg.text('help.whatsappNumber', '+51 999 999 999');
  const whatsappDigits = whatsapp.replace(/\D/g, '');
  const mensaje = encodeURIComponent(`Hola, quiero consultar por "${craft.name}" (S/ ${craft.price}) que vi en la app de Capachica Turismo.`);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: spacing.stackLg + insets.bottom }}>
      <View style={styles.hero}>
        {craft.img ? (
          <Image source={{ uri: craft.img }} style={styles.heroImg} />
        ) : (
          <View style={[styles.heroImg, styles.heroImgFallback]}>
            <MaterialIcons name="palette" size={48} color={colors.onSurfaceVariant} />
          </View>
        )}
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: insets.top + 8 }]}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </Pressable>
      </View>

      <View style={{ padding: spacing.containerPadding, gap: spacing.stackSm }}>
        <Text style={[typography.headlineLg, { color: colors.onSurface }]}>{craft.name}</Text>
        <Text style={[typography.headlineMd, { color: colors.primary }]}>S/ {craft.price}</Text>

        {!!craft.tecnica && (
          <View style={styles.row}>
            <MaterialIcons name="brush" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1 }]}>{craft.tecnica}</Text>
          </View>
        )}
        {!!craft.materiales && (
          <View style={styles.row}>
            <MaterialIcons name="texture" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1 }]}>{craft.materiales}</Text>
          </View>
        )}
        {!!craft.artesana && (
          <View style={styles.row}>
            <MaterialIcons name="groups" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1 }]}>
              {craft.artesana}{craft.comunidad ? ` · ${craft.comunidad}` : ''}
            </Text>
          </View>
        )}
        {craft.stock != null && (
          <View style={styles.row}>
            <MaterialIcons name="inventory-2" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1 }]}>
              {craft.stock > 0 ? `${craft.stock} disponibles` : 'Sin stock por ahora'}
            </Text>
          </View>
        )}

        <View style={{ marginTop: spacing.stackMd }}>
          <Button
            label="Comprar por WhatsApp" icon="chat"
            onPress={() => Linking.openURL(`https://wa.me/${whatsappDigits}?text=${mensaje}`)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 300 },
  heroImg: { width: '100%', height: '100%' },
  heroImgFallback: { backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  backBtn: {
    position: 'absolute', left: spacing.containerPadding, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
