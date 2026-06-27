import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';

const KEY = 'capachica.ratings';

let cache: Record<string, number> | null = null;
const listeners = new Set<(r: Record<string, number>) => void>();

async function load(): Promise<Record<string, number>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : {};
  } catch {
    cache = {};
  }
  return cache!;
}

async function save() { if (cache) await AsyncStorage.setItem(KEY, JSON.stringify(cache)); }
function notify() { if (!cache) return; for (const l of listeners) l({ ...cache }); }

export function useRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    load().then(r => setRatings({ ...r }));
    const listener = (r: Record<string, number>) => setRatings(r);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const rate = useCallback(async (id: string, stars: number) => {
    const r = await load();
    r[id] = stars;
    await save();
    notify();
  }, []);

  const get = useCallback((id: string) => ratings[id] ?? 0, [ratings]);
  return { rate, get, all: ratings };
}
