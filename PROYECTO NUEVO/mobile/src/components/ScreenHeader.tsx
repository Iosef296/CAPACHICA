import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeInsets } from '@/hooks/useSafeInsets';
import { colors, spacing, typography } from '@/theme';

type Props = { eyebrow?: string; title: string; back?: boolean; right?: React.ReactNode };

export function ScreenHeader({ eyebrow, title, back, right }: Props) {
  const router = useRouter();
  const insets = useSafeInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.gutter }]}>
      <View style={styles.row}>
        {back && (
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          {eyebrow && <Text style={[typography.labelMd, { color: colors.secondary }]}>{eyebrow}</Text>}
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 2 }]}>{title}</Text>
        </View>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.containerPadding, paddingTop: spacing.gutter, paddingBottom: spacing.stackSm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.gutter },
  back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceContainerLow },
});
