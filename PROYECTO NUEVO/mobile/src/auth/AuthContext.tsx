import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { api } from '@/data/api';

WebBrowser.maybeCompleteAuthSession();

type User = { id: string; email: string; name: string; avatar?: string; provider: 'email' | 'google' };

type Ctx = {
  user: User | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);
const KEY = 'capachica.user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const extra = (Constants.expoConfig?.extra as any) ?? {};
  const [, response, promptAsync] = Google.useAuthRequest({
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
      const token = response.authentication?.accessToken;
      if (token) hydrateGoogle(token);
    }
  }, [response]);

  async function hydrateGoogle(token: string) {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const info = await res.json();
      const u: User = {
        id: info.id, email: info.email, name: info.name,
        avatar: info.picture, provider: 'google',
      };
      setUser(u);
      await SecureStore.setItemAsync(KEY, JSON.stringify(u));
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
      };
      setUser(u);
      await SecureStore.setItemAsync(KEY, JSON.stringify(u));
      if (res?.accessToken) await SecureStore.setItemAsync('capachica.token', res.accessToken);
    },
    async signInGoogle() { await promptAsync(); },
    async signOut() {
      setUser(null);
      await SecureStore.deleteItemAsync(KEY);
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
