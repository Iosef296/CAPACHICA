import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme';

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.onSecondaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopColor: 'rgba(157,67,32,0.1)',
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontFamily: 'HankenGrotesk_500Medium', fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            index: 'home',
            map: 'map',
            killa: 'auto-awesome',
            experiences: 'explore',
            profile: 'person',
          };
          return <MaterialIcons name={map[route.name] ?? 'circle'} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: t('tabs.inicio') }} />
      <Tabs.Screen name="map" options={{ title: t('tabs.mapa') }} />
      <Tabs.Screen name="killa" options={{ title: t('tabs.intiAI') }} />
      <Tabs.Screen name="experiences" options={{ title: t('tabs.experiencias') }} />
      <Tabs.Screen name="profile" options={{ title: t('tabs.perfil') }} />
    </Tabs>
  );
}
