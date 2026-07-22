import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Con edge-to-edge forzado (Android 15+), tanto el inset del contexto de
// safe-area como StatusBar.currentHeight pueden reportar 0 en algunos
// dispositivos/builds. Como último recurso forzamos un piso mínimo fijo para
// garantizar que el contenido nunca quede pegado a la hora/notificaciones.
const ANDROID_MIN_TOP = 28;

export function useSafeInsets() {
  const insets = useSafeAreaInsets();
  const statusBarFallback = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;
  const androidFloor = Platform.OS === 'android' ? ANDROID_MIN_TOP : 0;
  return { ...insets, top: Math.max(insets.top, statusBarFallback, androidFloor) };
}
