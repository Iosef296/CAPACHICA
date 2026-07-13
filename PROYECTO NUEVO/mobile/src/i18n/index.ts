import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import qu from './locales/qu.json';
import ay from './locales/ay.json';

export const SUPPORTED_LANGS = ['es', 'en', 'fr', 'qu', 'ay'] as const;
export type LangCode = typeof SUPPORTED_LANGS[number];

const STORAGE_KEY = 'capachica.language';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'es',
  lng: 'es',
  resources: {
    es: { translation: es },
    en: { translation: en },
    fr: { translation: fr },
    qu: { translation: qu },
    ay: { translation: ay },
  },
  interpolation: { escapeValue: false },
});

export async function loadSavedLanguage() {
  const saved = await AsyncStorage.getItem(STORAGE_KEY).catch(() => null);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    await i18next.changeLanguage(saved);
  }
}

export async function setAppLanguage(lang: LangCode) {
  await i18next.changeLanguage(lang);
  await AsyncStorage.setItem(STORAGE_KEY, lang);
}

export default i18next;
