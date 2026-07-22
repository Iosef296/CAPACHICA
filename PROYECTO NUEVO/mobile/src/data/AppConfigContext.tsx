import React, { createContext, useContext, useEffect, useState } from 'react';
import { configuracion as configApi } from '@/data/api';
import { subscribeWS } from '@/data/ws';
import { API_WS } from '@/data/api';

// Textos editables desde el admin (web o pestaña "Etiquetas de la app" del
// mobile) sin necesidad de rebuildear el APK. Un solo fetch compartido para
// toda la app en vez de repetirlo pantalla por pantalla; se refresca solo
// via WebSocket cuando un admin guarda cambios (broadcast('configuracion')).
type Ctx = {
  config: Record<string, string | undefined>;
  /** Texto de `clave`, o `fallback` si todavía no se guardó nada en el backend. */
  text: (clave: string, fallback: string) => string;
  /** Igual que `text` pero parseando JSON (para help.faqs, listas, etc). */
  json: <T,>(clave: string, fallback: T) => T;
};

const AppConfigCtx = createContext<Ctx | null>(null);

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Record<string, string | undefined>>({});

  function refresh() {
    configApi.listar().then(setConfig);
  }

  useEffect(() => {
    refresh();
    const unsub = subscribeWS(API_WS, 'configuracion', refresh);
    return unsub;
  }, []);

  const value: Ctx = {
    config,
    text: (clave, fallback) => config[clave] ?? fallback,
    json: (clave, fallback) => {
      const raw = config[clave];
      if (!raw) return fallback;
      try { return JSON.parse(raw); } catch { return fallback; }
    },
  };

  return <AppConfigCtx.Provider value={value}>{children}</AppConfigCtx.Provider>;
}

export function useAppConfig() {
  const ctx = useContext(AppConfigCtx);
  if (!ctx) throw new Error('useAppConfig must be used inside AppConfigProvider');
  return ctx;
}
