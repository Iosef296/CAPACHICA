import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows, useThemeMode } from '@/theme';

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  useThemeMode(); // se resuscribe para repintar la barra de tabs en vivo
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.onSecondaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLowest,
          borderTopColor: colors.outlineVariant,
          height: 70 + insets.bottom,
          paddingBottom: 12 + insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontFamily: 'HankenGrotesk_500Medium', fontSize: 12 },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'killa') {
            return (
              <View style={[styles.killaBubble, focused && styles.killaBubbleActive, shadows.navTop]}>
                <MaterialIcons name="auto-awesome" size={size + 6} color={colors.onPrimary} />
              </View>
            );
          }
          const map: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            index: 'home',
            map: 'map',
            reservas: 'bookmark',
            experiences: 'explore',
            profile: 'person',
          };
          return <MaterialIcons name={map[route.name] ?? 'circle'} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: t('tabs.inicio') }} />
      <Tabs.Screen name="map" options={{ title: t('tabs.mapa') }} />
      <Tabs.Screen
        name="killa"
        options={{
          title: t('tabs.intiAI'),
          tabBarLabelStyle: { fontFamily: 'HankenGrotesk_700Bold', fontSize: 12, color: colors.primary },
        }}
      />
      <Tabs.Screen name="experiences" options={{ title: t('tabs.experiencias') }} />
      <Tabs.Screen name="reservas" options={{ title: t('tabs.reservas') }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  killaBubble: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: -22,
    borderWidth: 4, borderColor: colors.surfaceContainerLowest,
  },
  killaBubbleActive: {
    backgroundColor: colors.terracotta,
  },
});
