import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useAuth } from '@/auth/AuthContext';
import { configuracion as configApi, ConfigApp, API_WS } from '@/data/api';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import { colors, radii, spacing, typography } from '@/theme';

type Campo = { key: string; label: string; type?: 'text' | 'list' | 'json'; multiline?: boolean };
type Seccion = { title: string; campos: Campo[] };

const SECCIONES: Seccion[] = [
  {
    title: 'Grilla Explora (Inicio)',
    campos: [
      { key: 'comunidades', label: 'Familias / Comunidades' },
      { key: 'gastronomia', label: 'Gastronomía' },
      { key: 'artesania', label: 'Artesanía' },
      { key: 'guias', label: 'Guías' },
      { key: 'festividades', label: 'Festividades' },
    ],
  },
  {
    title: 'Inicio -- portada',
    campos: [
      { key: 'home.heroTitle', label: 'Título grande', multiline: true },
      { key: 'home.heroSubtitle', label: 'Subtítulo', multiline: true },
      { key: 'home.ctaCrear', label: 'Botón crear experiencia' },
      { key: 'home.loginAlertTitle', label: 'Alerta login -- título' },
      { key: 'home.loginAlertBody', label: 'Alerta login -- texto', multiline: true },
      { key: 'home.myStoryLabel', label: 'Etiqueta "Tu historia"' },
      { key: 'home.selfStoryLabel', label: 'Etiqueta "Tú"' },
    ],
  },
  {
    title: 'Inti / Killa',
    campos: [
      { key: 'killaTeaser.headline', label: 'Pregunta destacada' },
      { key: 'killaTeaser.placeholder', label: 'Placeholder de búsqueda' },
    ],
  },
  {
    title: 'Onboarding (login / registro / teléfono)',
    campos: [
      { key: 'login.headline', label: 'Login -- título' },
      { key: 'login.subtitle', label: 'Login -- subtítulo', multiline: true },
      { key: 'register.headline', label: 'Registro -- título' },
      { key: 'register.subtitle', label: 'Registro -- subtítulo', multiline: true },
      { key: 'phone.headline', label: 'Teléfono -- título' },
      { key: 'phone.subtitle', label: 'Teléfono -- subtítulo', multiline: true },
    ],
  },
  {
    title: 'Encabezados de pantallas',
    campos: [
      { key: 'booking.eyebrow', label: 'Reservas -- eyebrow' },
      { key: 'booking.title', label: 'Reservas -- título' },
      { key: 'communities.eyebrow', label: 'Familias -- eyebrow' },
      { key: 'communities.title', label: 'Familias -- título' },
      { key: 'crafts.eyebrow', label: 'Artesanía -- eyebrow' },
      { key: 'crafts.title', label: 'Artesanía -- título' },
      { key: 'gastronomy.eyebrow', label: 'Gastronomía -- eyebrow' },
      { key: 'gastronomy.title', label: 'Gastronomía -- título' },
      { key: 'festividades.eyebrow', label: 'Festividades -- eyebrow' },
      { key: 'festividades.title', label: 'Festividades -- título' },
      { key: 'favorites.eyebrow', label: 'Favoritos -- eyebrow' },
      { key: 'favorites.title', label: 'Favoritos -- título' },
      { key: 'experiences.eyebrow', label: 'Experiencias -- eyebrow' },
      { key: 'experiences.headline', label: 'Experiencias -- título' },
      { key: 'guides.travelEyebrow', label: 'Guía de viaje -- eyebrow' },
      { key: 'guides.travelTitle', label: 'Guía de viaje -- título' },
      { key: 'guides.travelIntro', label: 'Guía de viaje -- intro', multiline: true },
      { key: 'guides.culturalEyebrow', label: 'Guía cultural -- eyebrow' },
      { key: 'guides.culturalTitle', label: 'Guía cultural -- título' },
      { key: 'guides.culturalIntro', label: 'Guía cultural -- intro', multiline: true },
    ],
  },
  {
    title: 'Ayuda / contacto',
    campos: [
      { key: 'help.title', label: 'Título' },
      { key: 'help.intro', label: 'Intro', multiline: true },
      { key: 'help.whatsappNumber', label: 'WhatsApp' },
      { key: 'help.email', label: 'Email' },
      { key: 'help.faqs', label: 'Preguntas frecuentes (JSON avanzado)', type: 'json', multiline: true },
    ],
  },
  {
    title: 'Mi negocio',
    campos: [
      { key: 'myBusiness.becomeProviderMsg', label: 'Mensaje para pasar a emprendedor', multiline: true },
    ],
  },
  {
    title: 'Artesanía',
    campos: [
      { key: 'crafts.wisdomLabel', label: 'Etiqueta sabiduría ancestral' },
      { key: 'crafts.wisdomText', label: 'Texto sabiduría ancestral', multiline: true },
      { key: 'crafts.sectionMaestros', label: 'Sección: Maestros del telar' },
      { key: 'crafts.sectionGaleria', label: 'Sección: Galería' },
      { key: 'crafts.sectionTintes', label: 'Sección: Tintes de la tierra' },
    ],
  },
  {
    title: 'Gastronomía',
    campos: [
      { key: 'gastronomy.tabs', label: 'Pestañas (separadas por coma)', type: 'list' },
      { key: 'gastronomy.intiTag', label: 'Sugerencia de Inti' },
      { key: 'gastronomy.sectionRestaurantes', label: 'Sección: Restaurantes' },
    ],
  },
  {
    title: 'Festividades',
    campos: [
      { key: 'festividades.types', label: 'Tipos (separados por coma)', type: 'list' },
      { key: 'festividades.badgeDestacada', label: 'Insignia "Destacada"' },
    ],
  },
  {
    title: 'Reservas -- pantalla',
    campos: [
      { key: 'booking.locations', label: 'Ubicaciones (separadas por coma)', type: 'list' },
      { key: 'booking.sectionHospedajes', label: 'Sección: Hospedajes' },
      { key: 'booking.sectionActividades', label: 'Sección: Actividades' },
      { key: 'booking.ctaReservar', label: 'Botón reservar' },
      { key: 'booking.emptyHospedajes', label: 'Sin hospedajes (usa {loc})' },
    ],
  },
  {
    title: 'Familias -- lista',
    campos: [
      { key: 'communities.intro', label: 'Intro', multiline: true },
      { key: 'communities.badgePopular', label: 'Insignia "Más popular"' },
    ],
  },
  {
    title: 'Guías',
    campos: [
      { key: 'guides.readMoreLabel', label: 'Etiqueta "Leer más"' },
    ],
  },
  {
    title: 'Mapa',
    campos: [
      { key: 'map.filters', label: 'Filtros (separados por coma)', type: 'list' },
      { key: 'map.searchPlaceholder', label: 'Placeholder de búsqueda' },
      { key: 'map.locationEyebrow', label: 'Eyebrow de ubicación' },
    ],
  },
  {
    title: 'Mis reservas (tab)',
    campos: [
      { key: 'reservasTab.eyebrow', label: 'Eyebrow' },
      { key: 'reservasTab.emptyLoginTitle', label: 'Sin sesión -- título' },
      { key: 'reservasTab.emptyTitle', label: 'Sin reservas -- título' },
      { key: 'reservasTab.emptySubtitle', label: 'Sin reservas -- subtítulo', multiline: true },
      { key: 'reservasTab.emptyCta', label: 'Botón ver experiencias' },
      { key: 'reservasTab.viewDetailLabel', label: 'Etiqueta "Ver detalle"' },
    ],
  },
  {
    title: 'Favoritos',
    campos: [
      { key: 'favorites.emptyTitle', label: 'Sin favoritos -- título' },
      { key: 'favorites.emptySubtitle', label: 'Sin favoritos -- subtítulo', multiline: true },
      { key: 'favorites.emptyCta', label: 'Botón explorar' },
    ],
  },
];

function toDisplay(campo: Campo, raw: string | undefined): string {
  if (!raw) return '';
  if (campo.type === 'list') {
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.join(', ') : raw;
    } catch { return raw; }
  }
  return raw;
}

function toStorage(campo: Campo, display: string): string {
  if (campo.type === 'list') {
    const arr = display.split(',').map(s => s.trim()).filter(Boolean);
    return JSON.stringify(arr);
  }
  return display;
}

export default function ConfigEtiquetas() {
  const { user } = useAuth();
  const [servidor, setServidor] = useState<Partial<ConfigApp>>({});
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set([SECCIONES[0].title]));

  const isAdmin = user?.rol === 'admin';

  useLiveRefresh(() => {
    configApi.listar().then(v => { setServidor(v); setEdits({}); });
  }, { url: API_WS, channels: 'configuracion' });

  const camposPorKey = useMemo(() => {
    const m: Record<string, Campo> = {};
    for (const s of SECCIONES) for (const c of s.campos) m[c.key] = c;
    return m;
  }, []);

  function valorDisplay(campo: Campo): string {
    if (campo.key in edits) return edits[campo.key];
    return toDisplay(campo, servidor[campo.key]);
  }

  function toggleSeccion(title: string) {
    setAbiertas(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  }

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
          <ScreenHeader eyebrow="ADMIN" title="Textos de la app" back />
          <View style={{ padding: spacing.containerPadding, gap: spacing.gutter }}>
            <MaterialIcons name="lock" size={48} color={colors.outline} style={{ alignSelf: 'center' }} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              Solo un administrador puede editar los textos de la app.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  async function guardar() {
    if (Object.keys(edits).length === 0) {
      Alert.alert('Nada que guardar', 'No cambiaste ningún texto todavía.');
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      for (const [key, display] of Object.entries(edits)) {
        payload[key] = toStorage(camposPorKey[key], display);
      }
      const actualizado = await configApi.actualizar(payload);
      setServidor(actualizado);
      setEdits({});
      Alert.alert('Listo', 'Textos actualizados -- ya se ven así en la app, sin reinstalar nada.');
    } catch (e) {
      Alert.alert('Error al guardar', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const cambios = Object.keys(edits).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScreenHeader eyebrow="ADMIN" title="Textos de la app" back />
        <ScrollView contentContainerStyle={{ padding: spacing.containerPadding, gap: spacing.gutter, paddingBottom: 120 }}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            Todos estos textos se ven al instante en todos los celulares apenas los guardás, sin actualizar el APK.
          </Text>

          {SECCIONES.map(seccion => {
            const abierta = abiertas.has(seccion.title);
            return (
              <View key={seccion.title} style={styles.seccion}>
                <Pressable style={styles.seccionHead} onPress={() => toggleSeccion(seccion.title)}>
                  <Text style={[typography.bodyLg, { color: colors.onSurface, fontFamily: 'HankenGrotesk_700Bold' }]}>
                    {seccion.title}
                  </Text>
                  <MaterialIcons name={abierta ? 'expand-less' : 'expand-more'} size={24} color={colors.onSurfaceVariant} />
                </Pressable>
                {abierta && (
                  <View style={{ gap: spacing.gutter, marginTop: spacing.stackSm }}>
                    {seccion.campos.map(c => (
                      <View key={c.key}>
                        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>{c.label}</Text>
                        <TextInput
                          value={valorDisplay(c)}
                          onChangeText={v => setEdits(prev => ({ ...prev, [c.key]: v }))}
                          placeholderTextColor={colors.outline}
                          multiline={!!c.multiline}
                          style={[styles.input, c.multiline && styles.inputMultiline]}
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.saveBar}>
          <Pressable style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={guardar} disabled={saving}>
            <Text style={[typography.bodyMd, { color: colors.onPrimary, fontFamily: 'HankenGrotesk_700Bold' }]}>
              {saving ? 'Guardando…' : cambios > 0 ? `Guardar (${cambios})` : 'Guardar'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md,
    padding: 12, fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, color: colors.onSurface,
  },
  inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  seccion: {
    backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.lg,
    padding: spacing.gutter, borderWidth: 1, borderColor: colors.outlineVariant,
  },
  seccionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  saveBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    padding: spacing.containerPadding, backgroundColor: colors.background,
    borderTopWidth: 1, borderTopColor: colors.outlineVariant,
  },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radii.full, paddingVertical: 16, alignItems: 'center' },
});
