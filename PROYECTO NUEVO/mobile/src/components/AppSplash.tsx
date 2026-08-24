import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Sin fontFamily custom a propósito: esta pantalla se muestra ANTES de que
// useFonts() termine de cargar las tipografías (ver app/_layout.tsx) --
// referenciar una fuente que todavía no está registrada hace que Android
// trunque el texto silenciosamente (sin fallback, sin warning). Fuente del
// sistema por default acá, el resto de la app ya usa las custom una vez
// que sí terminaron de cargar.
export function AppSplash() {
  return (
    <LinearGradient colors={['#123a63', '#071f3d']} style={styles.container}>
      <View style={styles.badge}>
        <Image source={require('../../assets/images/upeu-logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Universidad Peruana Unión</Text>
      <Text style={styles.subtitle}>Desarrollado por estudiantes UPEU</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24, paddingHorizontal: 32 },
  badge: {
    width: 140, height: 140, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  logo: { width: 140, height: 140, borderRadius: 28 },
  title: {
    color: '#ffffff', fontSize: 22, fontWeight: '700', textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)', fontSize: 14, textAlign: 'center', marginTop: -12,
  },
});
