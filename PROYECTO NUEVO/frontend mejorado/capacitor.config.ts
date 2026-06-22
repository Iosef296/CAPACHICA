import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capachica.turismo',
  appName: 'Capachica Turismo',
  webDir: 'dist',
  server: {
    url: 'https://capachica-frontend-production.up.railway.app',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#060f1a',
  },
};

export default config;
