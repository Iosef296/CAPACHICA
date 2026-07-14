import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { StoryAvatar } from '@/components/StoryAvatar';
import { PhotoCard } from '@/components/Card';
import { HighlightRow } from '@/components/HighlightRow';
import { KillaTeaser } from '@/components/KillaTeaser';
import { colors, spacing, typography } from '@/theme';
import { stories, recommendations, highlights } from '@/data/mock';

const HERO = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  const CATEGORIES = [
    { key: 'communities',  icon: 'groups',      label: t('home.categorias.comunidades'), path: '/(stacks)/communities' },
    { key: 'gastronomy',   icon: 'restaurant',  label: t('home.categorias.gastronomia'), path: '/(stacks)/gastronomy' },
    { key: 'crafts',       icon: 'palette',     label: t('home.categorias.artesania'),   path: '/(stacks)/crafts' },
    { key: 'booking',      icon: 'event-available', label: t('home.categorias.reservas'), path: '/(stacks)/booking' },
    { key: 'ar',           icon: 'view-in-ar',  label: t('home.categorias.ar'),          path: '/(stacks)/ar' },
    { key: 'guides',       icon: 'menu-book',   label: t('home.categorias.guias'),       path: '/(stacks)/guides?type=cultural' },
    { key: 'map-google',   icon: 'map',         label: t('home.categorias.mapaGoogle'), path: '/(stacks)/map-google' },
    { key: 'killa-chat',   icon: 'auto-awesome', label: t('home.categorias.chatInti'),  path: '/(stacks)/killa-chat' },
    { key: 'festividades', icon: 'celebration', label: t('home.categorias.festividades'), path: '/(stacks)/festividades' },
  ] as const;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <ImageBackground source={{ uri: HERO }} style={styles.hero}>
        <LinearGradient
          colors={['rgba(0,66,104,0.2)', 'rgba(0,66,104,0.8)']}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView edges={['top']} style={styles.heroSafe}>
          <View style={[styles.topBar, { marginTop: 8 }]}>
            <View style={styles.brand}>
              <MaterialIcons name="auto-awesome" color={colors.sunGold} size={20} />
              <Text style={[typography.labelMd, { color: '#fff' }]}>{t('home.brand')}</Text>
            </View>
            <MaterialIcons name="notifications-none" color="#fff" size={24} />
          </View>

          <View style={{ marginTop: 'auto', padding: spacing.containerPadding }}>
            <Text style={[typography.headlineLgMobile, { color: '#fff' }]}>
              {t('home.heroTitle')}
            </Text>
            <Text style={[typography.bodyMd, { color: 'rgba(255,255,255,0.85)', marginTop: 8, marginBottom: spacing.stackMd }]}>
              {t('home.heroSubtitle')}
            </Text>
            <Button label={t('home.ctaCrear')} variant="killa" icon="auto-awesome" onPress={() => router.push('/(stacks)/killa-chat')} />
          </View>
        </SafeAreaView>
      </ImageBackground>

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

      <Section title={t('home.sectionHistorias')} small>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.gutter, paddingHorizontal: spacing.containerPadding }}>
          {stories.map(s => <StoryAvatar key={s.id} name={s.name} image={s.image} />)}
        </ScrollView>
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

      <KillaTeaser />
      <View style={{ height: spacing.stackLg }} />
    </ScrollView>
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
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.containerPadding },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, justifyContent: 'space-between' },
  catCard: { width: '22%', alignItems: 'center', gap: 6 },
  catIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
