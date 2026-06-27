import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DEFAULT_CFG, fetchWidgetConfig, WidgetCfg } from '@/data/inti';

const C = {
  bg0: '#0d1b2e',
  bg1: '#070e1b',
  text: '#f0ede8',
  teal: '#2dd4bf',
  cyan: '#0ea5e9',
  tealHint: 'rgba(45,212,191,0.08)',
  tealDim: 'rgba(45,212,191,0.22)',
};

export default function KillaTab() {
  const router = useRouter();
  const [cfg, setCfg] = useState<WidgetCfg>(DEFAULT_CFG);
  useEffect(() => { fetchWidgetConfig().then(setCfg); }, []);

  return (
    <LinearGradient colors={[C.bg0, C.bg1]} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.heroIcon}>
            <LinearGradient colors={[C.teal, C.cyan]} style={styles.avatar}>
              <Text style={{ fontSize: 36 }}>🤖</Text>
            </LinearGradient>
            <View style={styles.statusRow}>
              <View style={styles.greenDot} />
              <Text style={styles.statusText}>En línea</Text>
            </View>
          </View>

          <Text style={styles.title}>{cfg.bot_name}</Text>
          <Text style={styles.subtitle}>{cfg.bot_subtitle}</Text>
          <Text style={styles.welcome}>{cfg.welcome_msg}</Text>

          <View style={styles.suggestionsCard}>
            <Text style={styles.suggestionsLabel}>PRUEBA PREGUNTAR</Text>
            {cfg.quick_prompts.map(p => (
              <Pressable key={p} style={styles.suggestion} onPress={() => router.push('/(stacks)/killa-chat')}>
                <MaterialIcons name="arrow-forward" size={18} color={C.teal} />
                <Text style={styles.suggestionText}>{p}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.cta} onPress={() => router.push('/(stacks)/killa-chat')}>
            <LinearGradient colors={[C.teal, C.cyan]} style={styles.ctaFill}>
              <MaterialIcons name="chat" size={20} color="#fff" />
              <Text style={styles.ctaText}>Iniciar conversación</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 24, paddingTop: 40, gap: 16 },
  heroIcon: { alignItems: 'center', gap: 10 },
  avatar: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(52,211,153,0.12)', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34d399' },
  statusText: { color: '#34d399', fontSize: 11, fontFamily: 'HankenGrotesk_700Bold' },
  title: { color: C.text, fontFamily: 'EBGaramond_600SemiBold', fontSize: 32, textAlign: 'center', marginTop: 8 },
  subtitle: { color: 'rgba(45,212,191,0.85)', fontSize: 13, fontFamily: 'HankenGrotesk_700Bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.2 },
  welcome: { color: 'rgba(240,237,232,0.78)', fontSize: 16, textAlign: 'center', marginTop: 8, fontFamily: 'HankenGrotesk_400Regular', lineHeight: 24 },
  suggestionsCard: {
    marginTop: 24,
    backgroundColor: C.tealHint,
    borderWidth: 1, borderColor: C.tealDim,
    borderRadius: 18, padding: 16, gap: 6,
  },
  suggestionsLabel: { color: 'rgba(45,212,191,0.85)', fontSize: 12, fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1, marginBottom: 4 },
  suggestion: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  suggestionText: { color: C.text, fontSize: 14, flex: 1, fontFamily: 'HankenGrotesk_400Regular' },
  cta: { marginTop: 8, borderRadius: 100, overflow: 'hidden' },
  ctaFill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  ctaText: { color: '#fff', fontSize: 15, fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 0.5 },
});
