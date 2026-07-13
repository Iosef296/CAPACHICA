import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyColorScheme } from './colors';

export type ThemeMode = 'light' | 'dark';

const KEY = 'capachica.theme';
let currentMode: ThemeMode = 'light';
const listeners = new Set<(mode: ThemeMode) => void>();

export function getThemeMode() {
  return currentMode;
}

async function apply(mode: ThemeMode) {
  currentMode = mode;
  applyColorScheme(mode);
  listeners.forEach(l => l(mode));
}

export async function loadSavedThemeMode() {
  const saved = await AsyncStorage.getItem(KEY).catch(() => null);
  await apply(saved === 'dark' ? 'dark' : 'light');
}

export async function setThemeMode(mode: ThemeMode) {
  await apply(mode);
  await AsyncStorage.setItem(KEY, mode);
}

// Se suscribe a cambios de tema para poder forzar un remount global
// (ver app/_layout.tsx) -- es la unica forma de repintar TODA la app
// sin convertir cada pantalla a leer colors via contexto.
export function useThemeMode() {
  const [mode, setMode] = useState(currentMode);
  useEffect(() => {
    const listener = (m: ThemeMode) => setMode(m);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return mode;
}
