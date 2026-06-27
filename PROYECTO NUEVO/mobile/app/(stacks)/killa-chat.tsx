import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DEFAULT_CFG, fetchWidgetConfig, IntiMsg, sendChat, WidgetCfg } from '@/data/inti';

// Paleta del ChatWidget web
const C = {
  bg0: '#0d1b2e',
  bg1: '#070e1b',
  text: '#f0ede8',
  teal: '#2dd4bf',
  cyan: '#0ea5e9',
  pink: '#f472b6',
  green: '#34d399',
  textDim: 'rgba(240,237,232,0.45)',
  tealDim: 'rgba(45,212,191,0.22)',
  tealHint: 'rgba(45,212,191,0.08)',
  whiteSoft: 'rgba(255,255,255,0.065)',
  whiteBorder: 'rgba(255,255,255,0.07)',
};

export default function IntiChat() {
  const router = useRouter();
  const [cfg, setCfg] = useState<WidgetCfg>(DEFAULT_CFG);
  const [msgs, setMsgs] = useState<IntiMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchWidgetConfig().then(c => {
      setCfg(c);
      setMsgs([{ role: 'assistant', content: c.welcome_msg }]);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, [msgs, stream]);

  async function send(text: string) {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    setStream('');

    const history = msgs;
    const result = await sendChat(msg, history);

    // Typewriter para simular el streaming SSE del web
    const full = result.content;
    let i = 0;
    const step = Math.max(1, Math.floor(full.length / 80));
    await new Promise<void>(resolve => {
      const tick = () => {
        i = Math.min(full.length, i + step);
        setStream(full.slice(0, i));
        if (i < full.length) setTimeout(tick, 18);
        else resolve();
      };
      tick();
    });

    setMsgs(prev => [...prev, { role: 'assistant', content: full, accion: result.accion, mapa_url: result.mapa_url }]);
    setStream('');
    setLoading(false);
  }

  return (
    <LinearGradient colors={[C.bg0, C.bg1]} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header name={cfg.bot_name} subtitle={cfg.bot_subtitle} onBack={() => router.back()} />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {msgs.map((m, i) => <Bubble key={i} msg={m} />)}

            {stream !== '' && (
              <Bubble msg={{ role: 'assistant', content: stream }} streaming />
            )}

            {loading && !stream && <TypingDots />}
          </ScrollView>

          {msgs.length === 1 && !loading && (
            <View style={styles.promptsRow}>
              {cfg.quick_prompts.map(q => (
                <Pressable key={q} onPress={() => send(q)} style={styles.promptChip}>
                  <Text style={styles.promptChipText}>{q}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <InputBar
            value={input}
            placeholder={cfg.placeholder}
            disabled={loading}
            onChange={setInput}
            onSend={() => send(input)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ─────────── Subcomponentes ─────────── */

function Header({ name, subtitle, onBack }: { name: string; subtitle: string; onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
        <MaterialIcons name="arrow-back" size={20} color={C.text} />
      </Pressable>
      <LinearGradient colors={[C.teal, C.cyan]} style={styles.avatar}>
        <Text style={{ fontSize: 18 }}>🤖</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={styles.botName}>{name}</Text>
        <Text style={styles.botSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.onlineRow}>
        <View style={styles.onlineDot} />
        <Text style={styles.onlineText}>En línea</Text>
      </View>
    </View>
  );
}

function Bubble({ msg, streaming }: { msg: IntiMsg; streaming?: boolean }) {
  const isUser = msg.role === 'user';
  return (
    <View style={[styles.msgRow, isUser && { justifyContent: 'flex-end' }]}>
      {!isUser && (
        <LinearGradient colors={[C.teal, C.cyan]} style={styles.miniAvatar}>
          <Text style={{ fontSize: 11 }}>🤖</Text>
        </LinearGradient>
      )}
      {isUser ? (
        <LinearGradient colors={[C.teal, C.cyan]} style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.bubbleText}>{msg.content}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.bubbleText}>
            {msg.content}
            {streaming && <Text style={{ color: 'rgba(240,237,232,0.4)' }}>▊</Text>}
          </Text>
          {msg.mapa_url && (
            <Pressable onPress={() => Linking.openURL(msg.mapa_url!)} style={styles.mapBtn}>
              <MaterialIcons name="location-on" size={14} color={C.teal} />
              <Text style={styles.mapText}>Ver en Google Maps →</Text>
            </Pressable>
          )}
          {msg.accion === 'reserva_confirmada' && (
            <View style={styles.reservaBadge}>
              <Text style={styles.reservaText}>✅ Reserva registrada</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function TypingDots() {
  const anims = useRef([new Animated.Value(0.3), new Animated.Value(0.3), new Animated.Value(0.3)]).current;
  useEffect(() => {
    const loops = anims.map((a, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(a, { toValue: 1, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(a, { toValue: 0.3, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      )
    );
    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, []);
  return (
    <View style={styles.msgRow}>
      <LinearGradient colors={[C.teal, C.cyan]} style={styles.miniAvatar}>
        <Text style={{ fontSize: 11 }}>🤖</Text>
      </LinearGradient>
      <View style={[styles.bubble, styles.aiBubble, { flexDirection: 'row', gap: 5, alignItems: 'center' }]}>
        {anims.map((a, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: a }]} />
        ))}
      </View>
    </View>
  );
}

function InputBar({ value, placeholder, disabled, onChange, onSend }: {
  value: string; placeholder: string; disabled: boolean; onChange: (v: string) => void; onSend: () => void;
}) {
  const canSend = value.trim().length > 0 && !disabled;
  return (
    <View style={styles.inputBar}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="rgba(240,237,232,0.4)"
        editable={!disabled}
        onSubmitEditing={onSend}
        returnKeyType="send"
        style={styles.input}
      />
      <Pressable onPress={onSend} disabled={!canSend} style={[styles.sendBtn, !canSend && { backgroundColor: 'rgba(255,255,255,0.07)' }]}>
        {canSend ? (
          <LinearGradient colors={[C.teal, C.cyan]} style={styles.sendFill}>
            <MaterialIcons name="send" size={16} color="#fff" />
          </LinearGradient>
        ) : (
          <MaterialIcons name="send" size={16} color="rgba(255,255,255,0.3)" />
        )}
      </Pressable>
    </View>
  );
}

/* ─────────── Estilos ─────────── */

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12, paddingHorizontal: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(45,212,191,0.10)',
    backgroundColor: 'rgba(45,212,191,0.04)',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)' },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  botName: { color: C.text, fontFamily: 'HankenGrotesk_700Bold', fontSize: 14 },
  botSubtitle: { color: 'rgba(45,212,191,0.75)', fontSize: 11, fontFamily: 'HankenGrotesk_400Regular' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: C.green },
  onlineText: { color: C.textDim, fontSize: 11, fontFamily: 'HankenGrotesk_400Regular' },

  scroll: { padding: 12, gap: 10 },

  msgRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  miniAvatar: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: 2 },

  bubble: { maxWidth: '78%', paddingVertical: 9, paddingHorizontal: 13 },
  userBubble: { borderRadius: 18, borderTopRightRadius: 4 },
  aiBubble: {
    borderRadius: 18, borderTopLeftRadius: 4,
    backgroundColor: C.whiteSoft,
    borderWidth: 1, borderColor: C.whiteBorder,
  },
  bubbleText: { color: C.text, fontSize: 13, lineHeight: 21, fontFamily: 'HankenGrotesk_400Regular' },

  mapBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  mapText: { color: C.teal, fontSize: 12, fontFamily: 'HankenGrotesk_700Bold' },

  reservaBadge: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'rgba(52,211,153,0.14)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(52,211,153,0.25)' },
  reservaText: { color: C.green, fontSize: 11, fontFamily: 'HankenGrotesk_700Bold' },

  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(45,212,191,0.7)' },

  promptsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 12, paddingBottom: 8 },
  promptChip: { paddingVertical: 5, paddingHorizontal: 11, borderRadius: 100, backgroundColor: C.tealHint, borderWidth: 1, borderColor: C.tealDim },
  promptChipText: { color: 'rgba(45,212,191,0.9)', fontSize: 11, fontFamily: 'HankenGrotesk_700Bold' },

  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 10, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)',
  },
  input: {
    flex: 1, paddingVertical: 9, paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
    borderRadius: 100, color: C.text, fontSize: 13,
    fontFamily: 'HankenGrotesk_400Regular',
  },
  sendBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  sendFill: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
});
