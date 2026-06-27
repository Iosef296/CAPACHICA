import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/Button';
import { useAuth } from '@/auth/AuthContext';
import { colors, radii, spacing, typography } from '@/theme';

const HERO = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200';

export default function Login() {
  const { signInEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email || !password) return;
    setBusy(true);
    try { await signInEmail(email, password); } finally { setBusy(false); }
  }

  return (
    <ImageBackground source={{ uri: HERO }} style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(0,66,104,0.3)', colors.primary]} style={StyleSheet.absoluteFillObject} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={[typography.labelMd, { color: colors.onPrimaryContainer }]}>CAPACHICA EXPERIENCE AI</Text>
            <Text style={[typography.headlineLgMobile, { color: '#fff', marginTop: 8 }]}>
              Vive el corazón del Titicaca
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.8)', marginTop: 6 }]}>
              Inicia sesión para crear tu experiencia con Killa AI.
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
            <TextInput
              value={password} onChangeText={setPassword}
              secureTextEntry placeholder="••••••••"
              placeholderTextColor={colors.outline}
              style={styles.input}
            />
            <Button label={busy ? 'Entrando…' : 'Iniciar sesión'} onPress={submit} style={{ marginTop: spacing.stackMd }} />
            <View style={styles.divider}>
              <View style={styles.line} /><Text style={[typography.labelSm, { color: colors.outline, marginHorizontal: 8 }]}>o</Text><View style={styles.line} />
            </View>
            <Button label="Continuar con Google" variant="ghost" icon="login" onPress={signInGoogle} />
            <Text style={[typography.labelSm, { color: colors.outline, textAlign: 'center', marginTop: spacing.gutter }]}>
              Auth de prueba — cualquier email/contraseña entra.
            </Text>
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
});
