import React, { useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { useAuth } from '@/auth/AuthContext';
import { useAppConfig } from '@/data/AppConfigContext';
import { countries, Country } from '@/data/countries';
import { colors, radii, spacing, typography } from '@/theme';

const HERO = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200';

export default function Phone() {
  const { setPhone } = useAuth();
  const cfg = useAppConfig();
  const [country, setCountry] = useState<Country>(countries[0]);
  const [number, setNumber] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  async function submit() {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 6) { setError('Ingresa un número válido.'); return; }
    setBusy(true);
    setError('');
    try {
      await setPhone(`${country.dial} ${digits}`);
    } catch (e) {
      setError((e as Error).message || 'No se pudo guardar el número.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ImageBackground source={{ uri: HERO }} style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(0,66,104,0.3)', colors.primary]} style={StyleSheet.absoluteFillObject} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.scroll}>
          <View style={styles.header}>
            <Text style={[typography.labelMd, { color: colors.onPrimaryContainer }]}>UN PASO MÁS</Text>
            <Text style={[typography.headlineLgMobile, { color: '#fff', marginTop: 8 }]}>
              {cfg.text('phone.headline', '¿Cuál es tu número?')}
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.8)', marginTop: 6 }]}>
              {cfg.text('phone.subtitle', 'Lo usamos para confirmar tus reservas y avisos importantes.')}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>NÚMERO DE TELÉFONO</Text>
            <View style={styles.row}>
              <Pressable onPress={() => setPickerOpen(true)} style={styles.countryBtn}>
                <Text style={styles.flag}>{country.flag}</Text>
                <Text style={styles.dial}>{country.dial}</Text>
                <MaterialIcons name="arrow-drop-down" size={20} color={colors.onSurfaceVariant} />
              </Pressable>
              <TextInput
                value={number} onChangeText={setNumber}
                keyboardType="phone-pad"
                placeholder="999 999 999"
                placeholderTextColor={colors.outline}
                style={styles.input}
              />
            </View>
            {!!error && (
              <Text style={[typography.labelSm, { color: colors.error, marginTop: spacing.gutter }]}>{error}</Text>
            )}
            <Button label={busy ? 'Guardando…' : 'Continuar'} onPress={submit} style={{ marginTop: spacing.stackMd }} />
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={pickerOpen} animationType="slide" onRequestClose={() => setPickerOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: spacing.stackLg }}>
          <View style={styles.modalHeader}>
            <Text style={[typography.headlineMd, { color: colors.primary }]}>Elige tu país</Text>
            <Pressable onPress={() => setPickerOpen(false)} hitSlop={12}>
              <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
            </Pressable>
          </View>
          <TextInput
            value={search} onChangeText={setSearch}
            placeholder="Buscar país o código…"
            placeholderTextColor={colors.outline}
            style={styles.searchInput}
          />
          <FlatList
            data={filtered}
            keyExtractor={c => c.code}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { setCountry(item); setPickerOpen(false); setSearch(''); }}
                style={[styles.countryRow, { borderBottomColor: colors.outlineVariant }]}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <Text style={[typography.bodyLg, { color: colors.onSurface, flex: 1 }]}>{item.name}</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>{item.dial}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, justifyContent: 'flex-end', padding: spacing.containerPadding, gap: spacing.stackLg },
  header: { gap: 4 },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    padding: spacing.containerPadding,
  },
  row: { flexDirection: 'row', gap: spacing.stackSm, marginTop: 6 },
  countryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: colors.outlineVariant,
    borderRadius: radii.md, paddingHorizontal: 12,
  },
  flag: { fontSize: 20 },
  dial: { fontFamily: 'HankenGrotesk_700Bold', fontSize: 16, color: colors.onSurface },
  input: {
    flex: 1,
    borderWidth: 1, borderColor: colors.outlineVariant,
    borderRadius: radii.md, padding: 14,
    fontFamily: 'HankenGrotesk_400Regular', fontSize: 16, color: colors.onSurface,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.containerPadding, marginBottom: spacing.stackSm,
  },
  searchInput: {
    marginHorizontal: spacing.containerPadding, marginBottom: spacing.stackSm,
    borderWidth: 1, borderColor: colors.outlineVariant,
    borderRadius: radii.md, padding: 12,
    fontFamily: 'HankenGrotesk_400Regular', fontSize: 15, color: colors.onSurface,
  },
  countryRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.gutter,
    paddingVertical: 14, paddingHorizontal: spacing.containerPadding,
    borderBottomWidth: 1,
  },
});
