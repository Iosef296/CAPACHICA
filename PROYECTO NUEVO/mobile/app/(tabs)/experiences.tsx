import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PhotoCard } from '@/components/Card';
import { recommendations } from '@/data/mock';
import { colors, spacing, typography } from '@/theme';

export default function Experiences() {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <Text style={[typography.labelMd, { color: colors.secondary }]}>EXPERIENCIAS</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>
            Vive Capachica
          </Text>
        </View>
        <View style={styles.grid}>
          {recommendations.map(r => (
            <PhotoCard key={r.id}
              image={r.image} title={r.title}
              badge={{ label: r.badge, tone: r.badgeTone }}
              rating={r.rating}
              width={undefined as any}
              height={280}
              onPress={() => router.push('/(stacks)/experience-detail')}
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.containerPadding },
  grid: { paddingHorizontal: spacing.containerPadding, gap: spacing.gutter, paddingBottom: spacing.stackLg },
});
