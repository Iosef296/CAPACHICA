import React, { useState } from 'react';
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import { Button } from '@/components/Button';
import { StoryAvatar } from '@/components/StoryAvatar';
import { StoryCreateModal } from '@/components/StoryCreateModal';
import { StoryViewer } from '@/components/StoryViewer';
import { PhotoCard } from '@/components/Card';
import { HighlightRow } from '@/components/HighlightRow';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { historias as historiasApi, Historia, API_WS } from '@/data/api';
import { useAppConfig } from '@/data/AppConfigContext';
import { colors, spacing, typography, useThemeMode } from '@/theme';
import { recommendations, highlights } from '@/data/mock';

const HERO = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const insets = useSafeInsets();
  const [pastHero, setPastHero] = useState(false);
  const [historiasList, setHistoriasList] = useState<Historia[]>([]);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [creatingStory, setCreatingStory] = useState(false);
  const [viewingGroup, setViewingGroup] = useState<Historia[] | null>(null);
  const [viewingIndex, setViewingIndex] = useState(0);
  const cfg = useAppConfig();
  useThemeMode(); // se resuscribe para repintar en vivo al cambiar tema

  function refreshHistorias() {
    // Filtra historias con media_url vacío -- datos corruptos (upload
    // fallido, fila vieja sin la validación del backend) no deben ni
    // aparecer en el feed, mucho menos abrirse en pantalla negra.
    historiasApi.listar().then(list => setHistoriasList(list.filter(h => !!h.media_url)));
    if (user) historiasApi.misLikes().then(setLikedIds);
  }

  useLiveRefresh(refreshHistorias, { url: API_WS, channels: 'historias' });

  // Como WhatsApp: varias historias de la misma persona se agrupan en un
  // solo avatar, ordenadas de la más vieja a la más nueva para reproducir
  // en secuencia. Grupos ordenados por la historia más reciente de cada uno.
  const gruposPorUsuario = React.useMemo(() => {
    const map = new Map<string, Historia[]>();
    for (const h of historiasList) {
      const arr = map.get(h.usuario_id) ?? [];
      arr.push(h);
      map.set(h.usuario_id, arr);
    }
    return [...map.values()]
      .map(arr => arr.slice().sort((a, b) => a.created_at.localeCompare(b.created_at)))
      .sort((a, b) => b[b.length - 1].created_at.localeCompare(a[a.length - 1].created_at));
  }, [historiasList]);

  const currentStory = viewingGroup?.[viewingIndex] ?? null;

  function closeViewer() {
    setViewingGroup(null);
    setViewingIndex(0);
  }

  function nextStory() {
    if (!viewingGroup) return;
    if (viewingIndex < viewingGroup.length - 1) setViewingIndex(i => i + 1);
    else closeViewer();
  }

  function prevStory() {
    if (!viewingGroup) return;
    if (viewingIndex > 0) setViewingIndex(i => i - 1);
  }

  async function toggleLike() {
    if (!currentStory) return;
    if (!user) {
      Alert.alert(
        cfg.text('home.loginAlertTitle', 'Inicia sesión'),
        cfg.text('home.loginAlertBody', 'Necesitás una cuenta para dar like a las historias.')
      );
      return;
    }
    const id = currentStory.id;
    const res = await historiasApi.like(id);
    setHistoriasList(prev => prev.map(x => x.id === id ? { ...x, likes_count: res.likes_count } : x));
    setLikedIds(prev => res.liked ? [...prev, id] : prev.filter(i => i !== id));
    setViewingGroup(prev => prev?.map(x => x.id === id ? { ...x, likes_count: res.likes_count } : x) ?? prev);
  }

  async function deleteStory() {
    if (!currentStory) return;
    const id = currentStory.id;
    await historiasApi.eliminar(id);
    setHistoriasList(prev => prev.filter(x => x.id !== id));
    closeViewer();
  }

  // Las etiquetas vienen del backend (config) cuando existen -- si todavía
  // no se guardó nada ahí, caen al texto por defecto de i18n. Así un admin
  // puede renombrarlas sin pedir un rebuild del APK.
  const CATEGORIES = [
    { key: 'communities',  icon: 'groups',      label: cfg.text('comunidades', t('home.categorias.comunidades')), path: '/(stacks)/communities' },
    { key: 'gastronomy',   icon: 'restaurant',  label: cfg.text('gastronomia', t('home.categorias.gastronomia')), path: '/(stacks)/gastronomy' },
    { key: 'crafts',       icon: 'palette',     label: cfg.text('artesania', t('home.categorias.artesania')),     path: '/(stacks)/crafts' },
    { key: 'guides',       icon: 'menu-book',   label: cfg.text('guias', t('home.categorias.guias')),             path: '/(stacks)/guides?type=cultural' },
    { key: 'festividades', icon: 'celebration', label: cfg.text('festividades', t('home.categorias.festividades')), path: '/(stacks)/festividades' },
  ] as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={e => setPastHero(e.nativeEvent.contentOffset.y > styles.hero.height - insets.top)}
    >
      <ImageBackground source={{ uri: HERO }} style={styles.hero}>
        <LinearGradient
          colors={['rgba(0,66,104,0.2)', 'rgba(0,66,104,0.8)']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.heroSafe}>
          <View style={[styles.topBar, { marginTop: insets.top + 8 }]}>
            <Pressable onPress={() => router.push('/(tabs)/profile')} style={styles.brand}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatarSmall} />
              ) : (
                <View style={[styles.avatarSmall, styles.avatarSmallFallback]}>
                  <MaterialIcons name="person" size={24} color="#fff" />
                </View>
              )}
              <Text style={[typography.labelMd, { color: '#fff' }]}>¡Hola, {user?.name ?? 'Viajero'}!</Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 'auto', padding: spacing.containerPadding }}>
            <Text style={[typography.headlineLgMobile, { color: '#fff' }]}>
              {cfg.text('home.heroTitle', t('home.heroTitle'))}
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)', marginTop: 8, marginBottom: spacing.stackMd }]}>
              {cfg.text('home.heroSubtitle', t('home.heroSubtitle'))}
            </Text>
            <Button label={cfg.text('home.ctaCrear', t('home.ctaCrear'))} variant="killa" icon="auto-awesome" onPress={() => router.push('/(stacks)/killa-chat')} />
          </View>
        </View>
      </ImageBackground>

      <Section title={t('home.sectionHistorias')} small>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.gutter, paddingHorizontal: spacing.containerPadding }}>
          {user && (
            <StoryAvatar
              isAdd
              name="Tu historia"
              image={user.avatar ?? ''}
              onPress={() => setCreatingStory(true)}
            />
          )}
          {gruposPorUsuario.map(grupo => {
            const ultima = grupo[grupo.length - 1];
            return (
              <StoryAvatar
                key={ultima.usuario_id}
                name={ultima.usuario_id === user?.id ? 'Tú' : ultima.usuario_nombre}
                image={ultima.tipo === 'foto' ? ultima.media_url : (ultima.usuario_foto ?? '')}
                onPress={() => { setViewingGroup(grupo); setViewingIndex(0); }}
              />
            );
          })}
        </ScrollView>
      </Section>

      <Section title={t('home.sectionExplora')} small>
        <View style={styles.catGrid}>
          {CATEGORIES.map(c => (
            <Pressable key={c.key} style={styles.catCard} onPress={() => router.push(c.path as any)}>
              <View style={[styles.catIcon, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name={c.icon as any} size={22} color={colors.primary} />
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurface, textAlign: 'center' }]}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title={t('home.sectionRecomendaciones')} link={t('home.verTodo')}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.gutter, paddingHorizontal: spacing.containerPadding }}>
          {recommendations.map(r => (
            <PhotoCard key={r.id}
              image={r.image} title={r.title}
              badge={{ label: r.badge, tone: r.badgeTone }}
              rating={r.rating}
            />
          ))}
        </ScrollView>
      </Section>

      <Section title={t('home.sectionDestacados')}>
        <View style={{ gap: spacing.gutter, paddingHorizontal: spacing.containerPadding }}>
          {highlights.map(h => (
            <HighlightRow key={h.id} image={h.image} category={h.category} title={h.title} subtitle={h.subtitle} />
          ))}
        </View>
      </Section>

      <View style={{ height: spacing.stackLg }} />
    </ScrollView>
      {pastHero && (
        <View pointerEvents="none" style={[styles.statusBarGuard, { height: insets.top, backgroundColor: colors.background }]} />
      )}
      <StoryCreateModal
        visible={creatingStory}
        onClose={() => setCreatingStory(false)}
        onCreated={refreshHistorias}
      />
      <StoryViewer
        group={viewingGroup}
        index={viewingIndex}
        onClose={closeViewer}
        onNext={nextStory}
        onPrev={prevStory}
        liked={!!currentStory && likedIds.includes(currentStory.id)}
        onToggleLike={toggleLike}
        canDelete={!!currentStory && !!user && currentStory.usuario_id === user.id}
        onDelete={deleteStory}
      />
    </View>
  );
}

function Section({ title, link, small, children }: { title: string; link?: string; small?: boolean; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.stackLg }}>
      <View style={[styles.sectionHead, { paddingHorizontal: spacing.containerPadding }]}>
        <Text style={small
          ? [typography.labelMd, { color: colors.onSurfaceVariant }]
          : [typography.headlineMd, { color: colors.primary }]
        }>{title}</Text>
        {link && <Text style={[typography.labelSm, { color: colors.secondary }]}>{link}</Text>}
      </View>
      <View style={{ marginTop: spacing.stackSm }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 520 },
  heroSafe: { flex: 1 },
  statusBarGuard: { position: 'absolute', top: 0, left: 0, right: 0 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.containerPadding },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarSmall: { width: 40, height: 40, borderRadius: 20 },
  avatarSmallFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.25)' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, justifyContent: 'space-between' },
  catCard: { width: '22%', alignItems: 'center', gap: 6 },
  catIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
