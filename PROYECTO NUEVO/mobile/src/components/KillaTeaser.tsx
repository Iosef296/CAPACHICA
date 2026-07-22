import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, spacing, typography } from '@/theme';

type Props = { onSend?: (q: string) => void };

export function KillaTeaser({ onSend }: Props) {
  const [q, setQ] = React.useState('');
  const cfg = useAppConfig();
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <MaterialIcons name="auto-awesome" size={18} color={colors.onPrimaryContainer} />
        <Text style={[typography.labelMd, { color: colors.onPrimaryContainer }]}>INTI AI</Text>
      </View>
      <Text style={[typography.headlineMd, { color: colors.surfaceContainerLowest, marginBottom: spacing.stackSm }]}>
        {cfg.text('killaTeaser.headline', '¿Qué quieres descubrir hoy?')}
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder={cfg.text('killaTeaser.placeholder', 'Pregunta por climas, rituales o rutas...')}
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => { onSend?.(q); setQ(''); }}
        />
        <View style={styles.sendBtn}>
          <MaterialIcons name="send" size={20} color={colors.onSecondaryContainer} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,
    padding: spacing.containerPadding,
    borderRadius: 32,
    marginHorizontal: spacing.containerPadding,
    marginTop: spacing.stackLg,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radii.full,
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: { flex: 1, paddingHorizontal: 12, color: '#fff', fontFamily: 'HankenGrotesk_400Regular', fontSize: 16 },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
});
