import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { useAuth } from '@/auth/AuthContext';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, radii, spacing, typography } from '@/theme';

const HERO = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200';

export default function Register() {
  const router = useRouter();
  const { signUpEmail } = useAuth();
  const cfg = useAppConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (!name || !email || !password) return;
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    setBusy(true);
    setError('');
    try {
      await signUpEmail(email, password, name);
    } catch (e) {
      setError((e as Error).message || 'No se pudo crear la cuenta.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ImageBackground source={{ uri: HERO }} style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(0,66,104,0.3)', colors.primary]} style={StyleSheet.absoluteFillObject} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[typography.labelMd, { color: colors.onPrimaryContainer }]}>CAPACHICA EXPERIENCE AI</Text>
            <Text style={[typography.headlineLgMobile, { color: '#fff', marginTop: 8 }]}>
              {cfg.text('register.headline', 'Crea tu cuenta')}
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.8)', marginTop: 6 }]}>
              {cfg.text('register.subtitle', 'Explora Capachica, guarda favoritos y reserva experiencias.')}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>NOMBRE</Text>
            <TextInput
              value={name} onChangeText={setName}
              placeholder="Tu nombre"
              placeholderTextColor={colors.outline}
              style={styles.input}
            />
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.gutter }]}>EMAIL</Text>
            <TextInput
              value={email} onChangeText={setEmail}
              autoCapitalize="none" keyboardType="email-address"
              placeholder="tu@correo.com"
              placeholderTextColor={colors.outline}
              style={styles.input}
            />
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: spacing.gutter }]}>CONTRASEÑA</Text>
            <View>
              <TextInput
                value={password} onChangeText={setPassword}
                secureTextEntry={!showPassword} placeholder="Mínimo 8 caracteres"
                placeholderTextColor={colors.outline}
                style={[styles.input, { paddingRight: 44 }]}
              />
              <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn} hitSlop={10}>
                <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>
            {!!error && (
              <Text style={[typography.labelSm, { color: colors.error, marginTop: spacing.gutter }]}>{error}</Text>
            )}
            <Button label={busy ? 'Creando cuenta…' : 'Crear cuenta'} onPress={submit} style={{ marginTop: spacing.stackMd }} />
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.gutter }]}>
              ¿Tienes un negocio? Regístrate igual — un admin puede habilitarte como emprendedor después.
            </Text>
            <Pressable onPress={() => router.back()} style={{ marginTop: spacing.gutter, alignItems: 'center' }}>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                ¿Ya tienes cuenta? <Text style={{ color: colors.primary, fontFamily: 'HankenGrotesk_700Bold' }}>Inicia sesión</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'flex-end', padding: spacing.containerPadding, gap: spacing.stackLg },
  header: { gap: 4 },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    padding: spacing.containerPadding,
  },
  input: {
    marginTop: 6,
    borderWidth: 1, borderColor: colors.outlineVariant,
    borderRadius: radii.md, padding: 14,
    fontFamily: 'HankenGrotesk_400Regular', fontSize: 16, color: colors.onSurface,
  },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' },
});
