import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Button } from '@/components/Button';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const FAQS = [
  { q: '¿Cómo reservo una experiencia?', a: 'Entra a Reservas, selecciona el hospedaje o tour, ajusta fechas y personas, y toca "Confirmar reserva". Te contactaremos por WhatsApp.' },
  { q: '¿Puedo cancelar mi reserva?', a: 'Sí, hasta 48h antes sin costo. Después aplica 30% de cargo. Escríbenos por WhatsApp.' },
  { q: '¿Las experiencias incluyen comida?', a: 'Los talleres de 4h+ incluyen almuerzo tradicional. Las actividades cortas no — pero te recomendamos lugares cerca.' },
  { q: '¿Hay ATM en Capachica?', a: 'No. Trae soles en efectivo desde Puno. La mayoría de hospedajes y talleres aceptan solo efectivo o Yape.' },
  { q: '¿Necesito permiso para visitar las comunidades?', a: 'No. Las comunidades reciben visitantes con turismo vivencial organizado. Inti AI te puede ayudar a coordinarlo.' },
  { q: '¿La app funciona sin internet?', a: 'La navegación y datos básicos sí. El chat con Inti requiere conexión.' },
];

export default function Help() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="SOPORTE" title="Centro de Ayuda" back />

        <Text style={styles.intro}>
          Encuentra respuestas rápidas o contáctanos directamente.
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.actionCard} onPress={() => Linking.openURL('https://wa.me/51999999999?text=Hola%20Capachica')}>
            <MaterialIcons name="chat" size={28} color={colors.terracotta} />
            <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>WhatsApp</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>+51 999 999 999</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => Linking.openURL('mailto:hola@capachica.com')}>
            <MaterialIcons name="mail" size={28} color={colors.primary} />
            <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>Email</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>hola@capachica.com</Text>
          </Pressable>
        </View>

        <Text style={styles.faqTitle}>PREGUNTAS FRECUENTES</Text>
        <View style={{ paddingHorizontal: spacing.containerPadding, gap: 8, marginBottom: spacing.stackLg }}>
          {FAQS.map((f, i) => (
            <View key={i} style={styles.faqCard}>
              <Pressable style={styles.faqHeader} onPress={() => setOpen(open === i ? null : i)}>
                <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1, fontFamily: 'HankenGrotesk_700Bold' }]}>{f.q}</Text>
                <MaterialIcons name={open === i ? 'expand-less' : 'expand-more'} size={24} color={colors.primary} />
              </Pressable>
              {open === i && (
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, paddingHorizontal: spacing.gutter, paddingBottom: spacing.gutter }]}>
                  {f.a}
                </Text>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { ...typography.bodyMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackMd },
  actions: { flexDirection: 'row', gap: spacing.gutter, paddingHorizontal: spacing.containerPadding },
  actionCard: { flex: 1, backgroundColor: colors.surfaceContainerLowest, padding: spacing.gutter, borderRadius: radii.lg, alignItems: 'center', gap: 4, ...shadows.card },
  faqTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingHorizontal: spacing.containerPadding, marginTop: spacing.stackLg, marginBottom: spacing.stackSm },
  faqCard: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, ...shadows.card },
  faqHeader: { flexDirection: 'row', alignItems: 'center', padding: spacing.gutter, gap: spacing.stackSm },
});
