import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radii, shadows, spacing, typography, useThemeMode } from '@/theme';
import { DEFAULT_CFG, fetchWidgetConfig, IA_WS, WidgetCfg } from '@/data/inti';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { useSafeInsets } from '@/hooks/useSafeInsets';

export default function KillaTab() {
  const router = useRouter();
  const [cfg, setCfg] = useState<WidgetCfg>(DEFAULT_CFG);
  const insets = useSafeInsets();
  useLiveRefresh(() => { fetchWidgetConfig().then(setCfg); }, { url: IA_WS, channels: 'widget' });
  useThemeMode(); // se resuscribe para repintar en vivo al cambiar tema

  // Recreado en cada render (no a nivel de modulo) para que los colores
  // reflejen el tema actual apenas se cambia, sin recargar la app.
  const styles = StyleSheet.create({
    scroll: { padding: spacing.containerPadding, paddingTop: spacing.stackLg, gap: spacing.gutter },
    heroIcon: { alignItems: 'center', gap: 10 },
    avatar: {
      width: 72, height: 72, borderRadius: 36,
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: colors.secondaryContainer,
    },
    statusRow: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: 'rgba(52,211,153,0.12)', borderRadius: radii.full,
      paddingHorizontal: 10, paddingVertical: 4,
    },
    greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34d399' },
    statusText: { color: '#0f9d6a', fontSize: 11, fontFamily: 'HankenGrotesk_700Bold' },
    title: { color: colors.primary, textAlign: 'center', marginTop: 8 },
    subtitle: {
      color: colors.onSurfaceVariant, fontSize: 12, fontFamily: 'HankenGrotesk_700Bold',
      textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.8,
    },
    welcome: {
      color: colors.onSurfaceVariant, fontSize: 16, textAlign: 'center', marginTop: 8,
      fontFamily: 'HankenGrotesk_400Regular', lineHeight: 24,
    },
    cta: {
      marginTop: spacing.stackSm, borderRadius: radii.full, overflow: 'hidden',
      backgroundColor: colors.primary,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16,
      shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 4,
    },
    ctaText: { color: colors.onPrimary, fontSize: 15, fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 0.5 },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.heroIcon}>
            <View style={[styles.avatar, shadows.card]}>
              <MaterialIcons name="auto-awesome" size={32} color={colors.onSecondaryContainer} />
            </View>
            <View style={styles.statusRow}>
              <View style={styles.greenDot} />
              <Text style={styles.statusText}>En línea</Text>
            </View>
          </View>

          <Text style={[typography.headlineLgMobile, styles.title]}>{cfg.bot_name}</Text>
          <Text style={styles.subtitle}>{cfg.bot_subtitle}</Text>
          <Text style={styles.welcome}>{cfg.welcome_msg}</Text>

          <Pressable style={styles.cta} onPress={() => router.push('/(stacks)/killa-chat')}>
            <MaterialIcons name="chat" size={20} color={colors.onPrimary} />
            <Text style={styles.ctaText}>Iniciar conversación</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
