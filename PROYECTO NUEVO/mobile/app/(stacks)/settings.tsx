import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { colors, radii, spacing, typography } from '@/theme';

type Settings = {
  notifications: boolean;
  newsletter: boolean;
  darkMode: boolean;
  language: string;
};

const KEY = 'capachica.settings';
const DEFAULT: Settings = { notifications: true, newsletter: false, darkMode: false, language: 'Español' };
const LANGS = ['Español', 'English', 'Quechua', 'Aymara'];

export default function SettingsScreen() {
  const [s, setS] = useState<Settings>(DEFAULT);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => raw && setS({ ...DEFAULT, ...JSON.parse(raw) }));
  }, []);

  function update<K extends keyof Settings>(k: K, v: Settings[K]) {
    const next = { ...s, [k]: v };
    setS(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <ScreenHeader eyebrow="CUENTA" title="Configuración" back />

        <Group title="PREFERENCIAS">
          <ToggleRow icon="notifications" label="Notificaciones push" value={s.notifications} onChange={v => update('notifications', v)} />
          <ToggleRow icon="mail-outline" label="Newsletter mensual" value={s.newsletter} onChange={v => update('newsletter', v)} />
          <ToggleRow icon="dark-mode" label="Modo oscuro (próximamente)" value={s.darkMode} onChange={v => update('darkMode', v)} disabled />
        </Group>

        <Group title="IDIOMA">
          {LANGS.map(l => (
            <Pressable key={l} style={styles.row} onPress={() => update('language', l)}>
              <MaterialIcons name="language" size={22} color={colors.primary} />
              <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{l}</Text>
              {s.language === l && <MaterialIcons name="check" size={22} color={colors.terracotta} />}
            </Pressable>
          ))}
        </Group>

        <Group title="ACERCA DE">
          <InfoRow icon="info" label="Versión" value="0.1.0 · MVP" />
          <InfoRow icon="code" label="Build" value="Expo SDK 54" />
          <InfoRow icon="copyright" label="© 2026 Capachica AI" />
        </Group>
      </SafeAreaView>
    </ScrollView>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function ToggleRow({ icon, label, value, onChange, disabled }: any) {
  return (
    <View style={[styles.row, disabled && { opacity: 0.5 }]}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      <Switch value={value} onValueChange={onChange} disabled={disabled} trackColor={{ true: colors.terracotta, false: colors.outlineVariant }} thumbColor="#fff" />
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{label}</Text>
      {value && <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginTop: spacing.stackMd, paddingHorizontal: spacing.containerPadding },
  groupTitle: { ...typography.labelMd, color: colors.onSurfaceVariant, marginBottom: spacing.stackSm },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: spacing.gutter, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
});
