import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';

const KEY = 'capachica.favorites';

let cache: Set<string> | null = null;
const listeners = new Set<(s: Set<string>) => void>();

async function load(): Promise<Set<string>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = new Set(raw ? JSON.parse(raw) : []);
  } catch {
    cache = new Set();
  }
  return cache;
}

async function save() {
  if (!cache) return;
  await AsyncStorage.setItem(KEY, JSON.stringify([...cache]));
}

function notify() {
  if (!cache) return;
  for (const l of listeners) l(new Set(cache));
}

export function useFavorites() {
  const [set, setSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    load().then(s => setSet(new Set(s)));
    const listener = (s: Set<string>) => setSet(s);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const toggle = useCallback(async (id: string) => {
    const s = await load();
    if (s.has(id)) s.delete(id);
    else s.add(id);
    await save();
    notify();
  }, []);

  const has = useCallback((id: string) => set.has(id), [set]);

  return { favorites: set, has, toggle };
}
