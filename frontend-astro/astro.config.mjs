// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'http://localhost:4321',
    output: 'server',
    vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                },
                // Proxy para redirigir a Angular durante desarrollo
                '/admin': {
                    target: 'http://localhost:4200',
                    changeOrigin: true,
                }
            },
        },
    },
});