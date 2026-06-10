import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  vite: {
    server: {
      port: 3002,
      proxy: {
        '/api': 'http://localhost:3002',
      },
    },
  },
});