import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_700Bold } from '@expo-google-fonts/eb-garamond';
import { HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_700Bold } from '@expo-google-fonts/hanken-grotesk';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { AppConfigProvider } from '@/data/AppConfigContext';
import { colors, useThemeMode, loadSavedThemeMode } from '@/theme';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loadSavedLanguage } from '@/i18n';

function Gate() {
  const { user, guest, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === '(auth)';
    const inPhoneScreen = segments[0] === '(auth)' && segments[1] === 'phone';
    // Invitado navega sin cuenta -- solo se le pide login al reservar (BookingModal).
    if (!user && !guest && !inAuth) { router.replace('/(auth)/login'); return; }
    // Pide el teléfono una sola vez -- en cuanto se guarda, telefono deja de
    // ser null/undefined y este efecto ya no vuelve a mandar para acá.
    if (user && !user.telefono && !inPhoneScreen) { router.replace('/(auth)/phone'); return; }
    if (inAuth && ((user && user.telefono) || (!user && guest))) router.replace('/(tabs)');
  }, [user, guest, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_700Bold,
  });

  const themeMode = useThemeMode();

  useEffect(() => {
    loadSavedLanguage();
    loadSavedThemeMode();
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppConfigProvider>
        <AuthProvider>
          <SystemBars style={themeMode === 'dark' ? 'light' : 'dark'} />
          <Gate />
        </AuthProvider>
      </AppConfigProvider>
    </SafeAreaProvider>
  );
}
