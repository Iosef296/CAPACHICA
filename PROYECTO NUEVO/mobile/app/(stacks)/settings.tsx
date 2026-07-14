import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from '@/components/ScreenHeader';
import { setAppLanguage, LangCode } from '@/i18n';
import { colors, radii, spacing, typography, useThemeMode, setThemeMode } from '@/theme';

type Prefs = { notifications: boolean; newsletter: boolean };

const KEY = 'capachica.settings';
const DEFAULT: Prefs = { notifications: true, newsletter: false };
const LANGS: { code: LangCode; name: string }[] = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'qu', name: 'Runasimi' },
  { code: 'ay', name: 'Aymar aru' },
];

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [p, setP] = useState<Prefs>(DEFAULT);
  const themeMode = useThemeMode();

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => raw && setP({ ...DEFAULT, ...JSON.parse(raw) }));
  }, []);

  function update<K extends keyof Prefs>(k: K, v: Prefs[K]) {
    const next = { ...p, [k]: v };
    setP(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow={t('settings.eyebrow')} title={t('settings.titulo')} back />

        <Group title={t('settings.preferencias')}>
          <ToggleRow icon="notifications" label={t('settings.notificaciones')} value={p.notifications} onChange={v => update('notifications', v)} />
          <ToggleRow icon="mail-outline" label={t('settings.newsletter')} value={p.newsletter} onChange={v => update('newsletter', v)} />
          <ToggleRow icon="dark-mode" label={t('settings.modoOscuro')} value={themeMode === 'dark'} onChange={(v: boolean) => setThemeMode(v ? 'dark' : 'light')} />
        </Group>

        <Group title={t('settings.idioma')}>
          {LANGS.map(l => (
            <Pressable key={l.code} style={[styles.row, { borderBottomColor: colors.outlineVariant }]} onPress={() => setAppLanguage(l.code)}>
              <MaterialIcons name="language" size={22} color={colors.primary} />
              <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{l.name}</Text>
              {i18n.language === l.code && <MaterialIcons name="check" size={22} color={colors.terracotta} />}
            </Pressable>
          ))}
          {(i18n.language === 'qu' || i18n.language === 'ay') && (
            <Text style={[styles.aviso, { color: colors.onSurfaceVariant }]}>
              Traducción aproximada, en revisión por hablantes nativos.
            </Text>
          )}
        </Group>

        <Group title={t('settings.acercaDe')}>
          <InfoRow icon="info" label={t('settings.version')} value="0.1.0 · MVP" />
          <InfoRow icon="code" label={t('settings.build')} value="Expo SDK 54" />
          <InfoRow icon="copyright" label={t('settings.copyright')} />
        </Group>
      </SafeAreaView>
    </ScrollView>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={[styles.groupTitle, { color: colors.onSurfaceVariant }]}>{title}</Text>
      <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest }]}>{children}</View>
    </View>
  );
}

function ToggleRow({ icon, label, value, onChange, disabled }: any) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.outlineVariant }, disabled && { opacity: 0.5 }]}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      <Switch value={value} onValueChange={onChange} disabled={disabled} trackColor={{ true: colors.terracotta, false: colors.outlineVariant }} thumbColor="#fff" />
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.outlineVariant }]}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      {value && <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginTop: spacing.stackMd, paddingHorizontal: spacing.containerPadding },
  groupTitle: { ...typography.labelMd, marginBottom: spacing.stackSm },
  card: { borderRadius: radii.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: spacing.gutter, borderBottomWidth: 1 },
  aviso: { ...typography.labelSm, fontStyle: 'italic', padding: spacing.gutter },
});
