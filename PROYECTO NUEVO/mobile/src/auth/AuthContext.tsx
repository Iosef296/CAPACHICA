import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { api, API_BASE } from '@/data/api';

WebBrowser.maybeCompleteAuthSession();

export type Rol = 'admin' | 'proveedor' | 'turista';
type User = { id: string; email: string; name: string; avatar?: string; provider: 'email' | 'google'; rol: Rol };

type Ctx = {
  user: User | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);
const KEY = 'capachica.user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const extra = (Constants.expoConfig?.extra as any) ?? {};
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: extra.googleClientIdWeb,
    androidClientId: extra.googleClientIdAndroid,
    iosClientId: extra.googleClientIdIos,
    webClientId: extra.googleClientIdWeb,
  });

  useEffect(() => {
    (async () => {
      const raw = await SecureStore.getItemAsync(KEY).catch(() => null);
      if (raw) setUser(JSON.parse(raw));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params?.id_token;
      if (idToken) hydrateGoogle(idToken);
    }
  }, [response]);

  async function hydrateGoogle(idToken: string) {
    try {
      const res: any = await api.google(idToken);
      const apiUser = res?.usuario ?? {};
      const u: User = {
        id: apiUser.id?.toString() ?? 'local-' + Date.now(),
        email: apiUser.email, name: apiUser.nombre,
        avatar: apiUser.foto, provider: 'google', rol: apiUser.rol ?? 'turista',
      };
      setUser(u);
      await SecureStore.setItemAsync(KEY, JSON.stringify(u));
      if (res?.accessToken) await SecureStore.setItemAsync('capachica.token', res.accessToken);
    } catch (e) { console.warn('Google hydrate failed', e); }
  }

  const value: Ctx = {
    user,
    loading,
    async signInEmail(email, password) {
      const res: any = await api.login(email, password);
      const apiUser = res?.usuario ?? {};
      const u: User = {
        id: apiUser.id?.toString() ?? 'local-' + Date.now(),
        email: apiUser.email ?? email,
        name: apiUser.nombre ?? email.split('@')[0],
        avatar: apiUser.avatar,
        provider: 'email',
        rol: apiUser.rol ?? 'turista',
      };
      setUser(u);
      await SecureStore.setItemAsync(KEY, JSON.stringify(u));
      if (res?.accessToken) await SecureStore.setItemAsync('capachica.token', res.accessToken);
    },
    async signUpEmail(email, password, name) {
      const res: any = await api.registro(email, password, name);
      const apiUser = res?.usuario ?? {};
      const u: User = {
        id: apiUser.id?.toString() ?? 'local-' + Date.now(),
        email: apiUser.email ?? email,
        name: apiUser.nombre ?? name,
        provider: 'email',
        rol: apiUser.rol ?? 'turista',
      };
      setUser(u);
      await SecureStore.setItemAsync(KEY, JSON.stringify(u));
      if (res?.accessToken) await SecureStore.setItemAsync('capachica.token', res.accessToken);
    },
    async signInGoogle() { await promptAsync(); },
    async signOut() {
      setUser(null);
      await SecureStore.deleteItemAsync(KEY);
      await SecureStore.deleteItemAsync('capachica.token');
    },
    // El admin puede promover turista -> emprendedor desde el panel web;
    // esto vuelve a pedir el perfil real para reflejar el rol actualizado
    // sin que el usuario tenga que cerrar sesion y volver a entrar.
    async refreshProfile() {
      const token = await SecureStore.getItemAsync('capachica.token').catch(() => null);
      if (!token || !API_BASE) return;
      try {
        const res = await fetch(`${API_BASE}/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const apiUser = await res.json();
        setUser(prev => {
          if (!prev) return prev;
          const u: User = { ...prev, rol: apiUser.rol ?? prev.rol, name: apiUser.nombre ?? prev.name };
          SecureStore.setItemAsync(KEY, JSON.stringify(u)).catch(() => {});
          return u;
        });
      } catch {}
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
