# Capachica Experience AI — App móvil (Expo)

App móvil construida sobre el diseño de Stitch (`stitch_capachica_experience_ai`).
Stack: Expo + expo-router + React Native + TypeScript.

## Arranque

```bash
cd "PROYECTO NUEVO/mobile"
npm install
npx expo start
```

Escanea el QR con **Expo Go** (Android/iOS). Asegúrate de que tu celular esté en
la misma red Wi-Fi que tu PC.

## Estado actual — Fase 1 (piloto)

Pantallas implementadas:

- `(auth)/login` — Email + password (mock) + botón Google (placeholder OAuth).
- `(tabs)/index` — Inicio: hero, historias, recomendaciones, destacados, Killa teaser.
- `(tabs)/map` — Mapa con `react-native-maps` (requiere Google Maps API key).
- `(tabs)/killa` — Asistente Killa AI con sugerencias.
- `(tabs)/experiences` — Lista de experiencias.
- `(tabs)/profile` — Perfil del viajero con stats e insignias.

Pendientes para Fase 2 (11 pantallas): nuestras_comunidades, reservas, gastronomía,
artesanía, AR, mapa estilo Google Maps, guías cultural/travel, perfil v2, mapa v2.

## TODOs antes de producción

1. **Backend real**: edita `app.json` → `expo.extra.apiBaseUrl` y en
   `src/data/api.ts` cambia `USE_MOCK = false`.
2. **Google OAuth**: crea proyecto en Google Cloud Console y pega los Client IDs
   en `app.json` → `expo.extra.googleClientId{Android,Ios,Web}`.
3. **Google Maps API key**: reemplaza `REPLACE_WITH_GOOGLE_MAPS_KEY` en `app.json`
   (`ios.config.googleMapsApiKey` y `android.config.googleMaps.apiKey`).
4. **Assets**: crea `assets/icon.png`, `assets/splash.png`, `assets/adaptive-icon.png`
   (1024×1024). Por ahora el splash usa el color primario `#004268`.

## Estructura

```
mobile/
├── app/                    # Rutas (expo-router)
│   ├── _layout.tsx         # Provider raíz + auth gate
│   ├── (auth)/login.tsx
│   └── (tabs)/             # Bottom tabs
│       ├── _layout.tsx
│       ├── index.tsx       # Inicio
│       ├── map.tsx
│       ├── killa.tsx
│       ├── experiences.tsx
│       └── profile.tsx
├── src/
│   ├── theme/              # Colores, tipografía, spacing, sombras
│   ├── components/         # Button, Card, Chip, GlassPanel, etc.
│   ├── data/               # mock.ts + api.ts (capa de servicios)
│   └── auth/               # AuthContext (email + Google)
├── app.json
├── package.json
└── tsconfig.json
```

## Design system (resumen)

Tomado del `DESIGN.md` exportado por Stitch:

- **Primary** `#004268` (Deep Titicaca Blue)
- **Secondary** `#9d4320` (Earthy Terracotta)
- **Tertiary** `#810031` (Andean Textile Pink)
- **Accent Sun Gold** `#FFC107`
- **Fonts**: EB Garamond (display/headlines), Hanken Grotesk (UI/body)
- **Radii**: cards 24px, botones 16px, pills full
- **Glassmorphism**: `expo-blur` con tinte light y borde semi-transparente

## Después de validar el piloto

Cuando me confirmes que el look & feel es correcto, genero las 11 pantallas
restantes leyendo los `code.html` de `stitch_extracted/` y reutilizando los
componentes ya creados.
