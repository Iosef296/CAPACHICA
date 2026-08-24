import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Button } from '@/components/Button';
import { IA_BASE } from '@/data/inti';
import { colors, radii, shadows, spacing, typography } from '@/theme';

const INTERESES = [
  { key: 'acuatico', label: '🚣 Acuático' },
  { key: 'terrestre', label: '🥾 Terrestre' },
  { key: 'gastro', label: '🍽️ Gastronomía' },
];

type Actividad = { id: string; nombre: string; precio: number; duracion?: string; categoria?: string };
type Craft = { id: number | string; nombre: string; precio_soles?: number };
type Familia = { id: number | string; nombre: string; comunidad?: string; precio?: number; imagen?: string };
type Dia = { numero: number; notas: string; actividades: Actividad[] };
type Plan = {
  resumen: string;
  hospedaje: Familia;
  dias: Dia[];
  artesania: Craft[];
  costo: { hospedaje: number; actividades: number; artesania: number; total: number };
  presupuesto: number;
  dentro_de_presupuesto: boolean;
};

export default function ExperienceBuilder() {
  const router = useRouter();
  const [dias, setDias] = useState('3');
  const [presupuesto, setPresupuesto] = useState('500');
  const [personas, setPersonas] = useState('2');
  const [intereses, setIntereses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);

  function toggleInteres(key: string) {
    setIntereses(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  }

  async function generar() {
    const diasNum = Number(dias);
    const presupuestoNum = Number(presupuesto);
    const personasNum = Number(personas) || 1;
    if (!diasNum || diasNum < 1) { setError('Indica cuántos días te quedas.'); return; }
    if (!presupuestoNum || presupuestoNum <= 0) { setError('Indica tu presupuesto.'); return; }

    setError('');
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch(`${IA_BASE}/api/experiencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dias: diasNum, presupuesto: presupuestoNum, personas: personasNum, intereses }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Error ${res.status}`);
      setPlan(data);
    } catch (e) {
      setError((e as Error).message || 'No se pudo generar la experiencia.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScreenHeader eyebrow="INTI IA" title="Crear mi experiencia" back />

        <ScrollView contentContainerStyle={{ padding: spacing.containerPadding, gap: spacing.stackMd, paddingBottom: spacing.stackLg }}>
          {!plan && (
            <>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                Armamos un itinerario real con familias, actividades y artesanía de Capachica, ajustado a tus días y presupuesto.
              </Text>

              <View>
                <Text style={styles.label}>¿Cuántos días te quedas?</Text>
                <TextInput value={dias} onChangeText={setDias} keyboardType="number-pad" style={styles.input} placeholder="3" placeholderTextColor={colors.outline} />
              </View>

              <View>
                <Text style={styles.label}>Presupuesto total (S/)</Text>
                <TextInput value={presupuesto} onChangeText={setPresupuesto} keyboardType="number-pad" style={styles.input} placeholder="500" placeholderTextColor={colors.outline} />
              </View>

              <View>
                <Text style={styles.label}>¿Cuántas personas viajan?</Text>
                <TextInput value={personas} onChangeText={setPersonas} keyboardType="number-pad" style={styles.input} placeholder="2" placeholderTextColor={colors.outline} />
              </View>

              <View>
                <Text style={styles.label}>Intereses (opcional)</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {INTERESES.map(i => (
                    <Pressable key={i.key} onPress={() => toggleInteres(i.key)} style={[styles.chip, intereses.includes(i.key) && styles.chipActive]}>
                      <Text style={[typography.labelSm, { color: intereses.includes(i.key) ? colors.onPrimary : colors.onSurfaceVariant }]}>{i.label}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {!!error && (
                <Text style={[typography.bodyMd, { color: colors.error }]}>{error}</Text>
              )}

              <Button label={loading ? 'Armando tu experiencia…' : 'Generar experiencia'} icon="auto-awesome" onPress={generar} disabled={loading} />

              {loading && (
                <View style={{ alignItems: 'center', paddingVertical: spacing.stackMd }}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              )}
            </>
          )}

          {plan && (
            <>
              <View style={styles.card}>
                <Text style={[typography.headlineMd, { color: colors.primary }]}>Tu experiencia</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 6 }]}>{plan.resumen}</Text>
              </View>

              <Pressable
                style={[styles.card, { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter }]}
                onPress={() => router.push({ pathname: '/(stacks)/community-detail', params: { id: plan.hospedaje.id } })}
              >
                {plan.hospedaje.imagen ? (
                  <Image source={{ uri: plan.hospedaje.imagen }} style={styles.hospedajeImg} />
                ) : (
                  <View style={[styles.hospedajeImg, styles.imgFallback]}>
                    <MaterialIcons name="home" size={26} color={colors.onSurfaceVariant} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>HOSPEDAJE ELEGIDO</Text>
                  <Text style={[typography.headlineMd, { color: colors.onSurface }]} numberOfLines={1}>{plan.hospedaje.nombre}</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{plan.hospedaje.comunidad}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
              </Pressable>

              {plan.dias.map(d => (
                <View key={d.numero} style={styles.card}>
                  <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Día {d.numero}</Text>
                  {!!d.notas && <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>{d.notas}</Text>}
                  {d.actividades.length > 0 ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.stackSm }}>
                      {d.actividades.map(a => (
                        <View key={a.id} style={styles.actChip}>
                          <Text style={[typography.labelSm, { color: colors.primary }]}>{a.nombre} · S/ {a.precio}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={[typography.labelSm, { color: colors.outline, marginTop: spacing.stackSm }]}>Día libre para descansar</Text>
                  )}
                </View>
              ))}

              {plan.artesania.length > 0 && (
                <View style={styles.card}>
                  <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Artesanía sugerida</Text>
                  <View style={{ gap: 8, marginTop: spacing.stackSm }}>
                    {plan.artesania.map(a => (
                      <Pressable key={a.id} style={styles.artesaniaRow} onPress={() => router.push({ pathname: '/(stacks)/craft-detail', params: { id: a.id } })}>
                        <MaterialIcons name="palette" size={18} color={colors.secondary} />
                        <Text style={[typography.bodyMd, { color: colors.onSurface, flex: 1 }]}>{a.nombre}</Text>
                        <Text style={[typography.bodyMd, { color: colors.primary }]}>S/ {a.precio_soles}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.card}>
                <Text style={[typography.headlineMd, { color: colors.onSurface, marginBottom: spacing.stackSm }]}>Costo estimado</Text>
                <CostRow label="Hospedaje" value={plan.costo.hospedaje} />
                <CostRow label="Actividades" value={plan.costo.actividades} />
                <CostRow label="Artesanía" value={plan.costo.artesania} />
                <View style={styles.divider} />
                <CostRow label="Total" value={plan.costo.total} bold />
                <View style={[styles.budgetBadge, plan.dentro_de_presupuesto ? styles.budgetOk : styles.budgetOver]}>
                  <MaterialIcons name={plan.dentro_de_presupuesto ? 'check-circle' : 'error-outline'} size={16} color={plan.dentro_de_presupuesto ? '#0f9d6a' : colors.error} />
                  <Text style={[typography.labelSm, { color: plan.dentro_de_presupuesto ? '#0f9d6a' : colors.error }]}>
                    {plan.dentro_de_presupuesto ? `Dentro de tu presupuesto de S/ ${plan.presupuesto}` : `Supera tu presupuesto de S/ ${plan.presupuesto}`}
                  </Text>
                </View>
              </View>

              <Button label="Ver hospedaje y reservar" icon="bookmark" onPress={() => router.push({ pathname: '/(stacks)/community-detail', params: { id: plan.hospedaje.id } })} />
              <Button label="Rehacer experiencia" icon="refresh" variant="secondary" onPress={() => setPlan(null)} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CostRow({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, fontFamily: bold ? 'HankenGrotesk_700Bold' : undefined }]}>{label}</Text>
      <Text style={[typography.bodyMd, { color: colors.onSurface, fontFamily: bold ? 'HankenGrotesk_700Bold' : undefined }]}>S/ {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { ...typography.labelMd, color: colors.onSurfaceVariant, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: radii.md,
    padding: 12, fontFamily: 'HankenGrotesk_400Regular', fontSize: 14, color: colors.onSurface,
  },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerLowest, borderWidth: 1, borderColor: colors.outlineVariant,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  card: { backgroundColor: colors.surfaceContainerLowest, borderRadius: radii.xl, padding: spacing.gutter, ...shadows.card },
  hospedajeImg: { width: 64, height: 64, borderRadius: radii.md },
  imgFallback: { backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  actChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.full, backgroundColor: 'rgba(0,66,104,0.08)' },
  artesaniaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  divider: { height: 1, backgroundColor: colors.outlineVariant, marginVertical: 8 },
  budgetBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.stackSm, padding: 10, borderRadius: radii.md },
  budgetOk: { backgroundColor: 'rgba(52,211,153,0.14)' },
  budgetOver: { backgroundColor: 'rgba(248,113,113,0.14)' },
});
