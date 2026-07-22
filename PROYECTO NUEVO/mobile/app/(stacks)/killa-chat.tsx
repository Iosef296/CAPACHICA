import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { colors, radii, shadows, spacing } from '@/theme';
import { DEFAULT_CFG, fetchWidgetConfig, IA_WS, IntiMsg, sendChat, WidgetCfg } from '@/data/inti';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';

export default function IntiChat() {
  const router = useRouter();
  const [cfg, setCfg] = useState<WidgetCfg>(DEFAULT_CFG);
  const [msgs, setMsgs] = useState<IntiMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  // No pisa una conversación ya iniciada, solo siembra el saludo la primera vez.
  useLiveRefresh(() => {
    fetchWidgetConfig().then(c => {
      setCfg(c);
      setMsgs(prev => (prev.length === 0 ? [{ role: 'assistant', content: c.welcome_msg }] : prev));
    });
  }, { url: IA_WS, channels: 'widget' });

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScreenHeader
          eyebrow={cfg.bot_subtitle}
          title={cfg.bot_name}
          back
          right={<OnlineBadge />}
        />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
    </View>
  );
}

/* ─────────── Subcomponentes ─────────── */

function OnlineBadge() {
  return (
    <View style={styles.onlineRow}>
      <View style={styles.onlineDot} />
      <Text style={styles.onlineText}>En línea</Text>
    </View>
  );
}

function Bubble({ msg, streaming }: { msg: IntiMsg; streaming?: boolean }) {
  const isUser = msg.role === 'user';
  return (
    <View style={[styles.msgRow, isUser && { justifyContent: 'flex-end' }]}>
      {!isUser && (
        <View style={styles.miniAvatar}>
          <MaterialIcons name="auto-awesome" size={13} color={colors.onSecondaryContainer} />
        </View>
      )}
      {isUser ? (
        <View style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.userBubbleText}>{msg.content}</Text>
        </View>
      ) : (
        <View style={[styles.bubble, styles.aiBubble, shadows.card]}>
          <Text style={styles.bubbleText}>
            {msg.content}
            {streaming && <Text style={{ color: colors.onSurfaceVariant }}>▊</Text>}
          </Text>
          {msg.mapa_url && (
            <Pressable onPress={() => Linking.openURL(msg.mapa_url!)} style={styles.mapBtn}>
              <MaterialIcons name="location-on" size={14} color={colors.secondary} />
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
      <View style={styles.miniAvatar}>
        <MaterialIcons name="auto-awesome" size={13} color={colors.onSecondaryContainer} />
      </View>
      <View style={[styles.bubble, styles.aiBubble, shadows.card, { flexDirection: 'row', gap: 5, alignItems: 'center' }]}>
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
      <Pressable style={styles.addBtn}>
        <MaterialIcons name="add-circle-outline" size={22} color={colors.outline} />
      </Pressable>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant + '80'}
        editable={!disabled}
        onSubmitEditing={onSend}
        returnKeyType="send"
        style={styles.input}
      />
      <Pressable onPress={onSend} disabled={!canSend} style={[styles.sendBtn, !canSend && styles.sendBtnIdle]}>
        <MaterialIcons name={canSend ? 'send' : 'mic'} size={18} color={canSend ? colors.onPrimary : colors.onSecondaryContainer} />
      </Pressable>
    </View>
  );
}

/* ─────────── Estilos ─────────── */

const styles = StyleSheet.create({
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#34d399' },
  onlineText: { color: colors.onSurfaceVariant, fontSize: 11, fontFamily: 'HankenGrotesk_400Regular' },

  scroll: { padding: spacing.gutter, gap: 10 },

  msgRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  miniAvatar: {
    width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: 2,
    backgroundColor: colors.secondaryContainer,
  },

  bubble: { maxWidth: '78%', paddingVertical: 10, paddingHorizontal: 14 },
  userBubble: { borderRadius: 18, borderTopRightRadius: 4, backgroundColor: colors.primary },
  userBubbleText: { color: colors.onPrimary, fontSize: 14, lineHeight: 21, fontFamily: 'HankenGrotesk_400Regular' },
  aiBubble: {
    borderRadius: 18, borderTopLeftRadius: 4,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1, borderColor: colors.outlineVariant,
  },
  bubbleText: { color: colors.onSurface, fontSize: 14, lineHeight: 21, fontFamily: 'HankenGrotesk_400Regular' },

  mapBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  mapText: { color: colors.secondary, fontSize: 12, fontFamily: 'HankenGrotesk_700Bold' },

  reservaBadge: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'rgba(52,211,153,0.14)', borderRadius: radii.md, borderWidth: 1, borderColor: 'rgba(52,211,153,0.35)' },
  reservaText: { color: '#0f9d6a', fontSize: 11, fontFamily: 'HankenGrotesk_700Bold' },

  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary },

  promptsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: spacing.gutter, paddingBottom: 10 },
  promptChip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1, borderColor: colors.outlineVariant,
  },
  promptChipText: { color: colors.primary, fontSize: 12, fontFamily: 'HankenGrotesk_700Bold' },

  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: spacing.gutter, marginBottom: spacing.gutter,
    paddingHorizontal: 8, paddingVertical: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radii.xl,
    borderWidth: 1, borderColor: colors.outlineVariant,
    ...shadows.card,
  },
  addBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  input: {
    flex: 1, paddingVertical: 8, paddingHorizontal: 4,
    color: colors.onSurface, fontSize: 14,
    fontFamily: 'HankenGrotesk_400Regular',
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  sendBtnIdle: { backgroundColor: colors.secondaryContainer },
});
