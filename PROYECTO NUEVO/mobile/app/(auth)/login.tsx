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

export default function Login() {
  const router = useRouter();
  const { signInEmail, signInGoogle, continueAsGuest } = useAuth();
  const cfg = useAppConfig();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (!email || !password) return;
    setBusy(true);
    setError('');
    try {
      await signInEmail(email, password);
    } catch (e) {
      setError((e as Error).message || 'No se pudo iniciar sesión.');
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
              {cfg.text('login.headline', 'Vive el corazón del Titicaca')}
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.8)', marginTop: 6 }]}>
              {cfg.text('login.subtitle', 'Inicia sesión para crear tu experiencia con Inti AI.')}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>EMAIL</Text>
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
                secureTextEntry={!showPassword} placeholder="••••••••"
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
            <Button label={busy ? 'Entrando…' : 'Iniciar sesión'} onPress={submit} style={{ marginTop: spacing.stackMd }} />
            <View style={styles.divider}>
              <View style={styles.line} /><Text style={[typography.labelSm, { color: colors.outline, marginHorizontal: 8 }]}>o</Text><View style={styles.line} />
            </View>
            <Button label="Continuar con Google" variant="ghost" icon="login" onPress={signInGoogle} />
            <Pressable onPress={() => router.push('/(auth)/register')} style={{ marginTop: spacing.gutter, alignItems: 'center' }}>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                ¿No tienes cuenta? <Text style={{ color: colors.primary, fontFamily: 'HankenGrotesk_700Bold' }}>Regístrate</Text>
              </Text>
            </Pressable>
            <Pressable onPress={continueAsGuest} style={{ marginTop: spacing.stackSm, alignItems: 'center' }}>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textDecorationLine: 'underline' }]}>
                Continuar como invitado
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
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.gutter },
  line: { flex: 1, height: 1, backgroundColor: colors.outlineVariant },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' },
});
