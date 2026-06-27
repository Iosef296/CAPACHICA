# Setup completo — Capachica Experience AI Mobile

## 1) Backend real (ya configurado)

Tu IP local: **`192.168.100.39`**

Endpoints configurados en `app.json`:
- **Main API**: `http://192.168.100.39:3000/api`
- **IA Backend**: `http://192.168.100.39:5000/api`

**Modo actual**: `USE_MOCK = false` en `src/data/api.ts`. La app intentará
hablar con los backends y si fallan, caerá automáticamente a datos mock.

### Levantar los backends antes de abrir la app

Terminal 1:
```powershell
cd "PROYECTO NUEVO/backend"
npm run dev
```

Terminal 2:
```powershell
cd "PROYECTO NUEVO/IA/backend"
npm run dev
```

Terminal 3:
```powershell
cd "PROYECTO NUEVO/mobile"
npx expo start
```

### Si cambias de red Wi-Fi

Tu IP cambia. Vuelve a correr `ipconfig` en PowerShell, busca tu IPv4 y
actualiza `apiBaseUrl` y `iaBaseUrl` en `app.json`. Reinicia Expo.

### Endpoints que la app espera del Main API

| Path | Mock fallback |
|---|---|
| `GET /stories` | 5 historias de viajeros |
| `GET /recommendations` | 2 hospedajes destacados |
| `GET /highlights` | 2 destacados del día |
| `GET /communities` | 3 comunidades |
| `GET /map/pins` | 5 pines |
| `GET /profile/me` | perfil del viajero |

Del IA backend:
- `POST /chat` con `{ message, history }` → `{ reply }` (o `message` / `response`)

Si tus endpoints actuales tienen nombres distintos, dime cuáles son y los ajusto
en `src/data/api.ts`.

---

## 2) Build APK con EAS

### Una sola vez

```powershell
npm install -g eas-cli
eas login
```

(Usa tu cuenta de Expo. Si no tienes, créala en expo.dev.)

### Build de preview (APK instalable directo)

```powershell
cd "PROYECTO NUEVO/mobile"
eas build -p android --profile preview
```

Tarda ~15 min en el servidor de Expo. Al terminar te da una URL con el `.apk`.

- Baja el APK a tu celular y ábrelo → "Instalar".
- Esta build **no necesita Expo Go** — es una app standalone.
- Apunta a `http://192.168.100.39` por defecto (configurado en `eas.json` →
  `preview.env`). Si quieres apuntar a producción, edita esos valores antes
  del build.

### Build de producción (subir a Play Store)

```powershell
eas build -p android --profile production
```

Genera un `.aab` (Android App Bundle) listo para subir.

---

## 3) Google Maps API key

Sin la key, el mapa funciona pero algunos tiles se ven en gris.

### Paso 1 — Crear proyecto en Google Cloud Console

1. Ve a https://console.cloud.google.com/
2. Crea un proyecto nuevo: "Capachica Experience".
3. Menú → **APIs y servicios** → **Biblioteca**.
4. Busca y **habilita** estas APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - (Opcional) Places API si quieres búsqueda de lugares.

### Paso 2 — Crear la API key

1. Menú → **APIs y servicios** → **Credenciales**.
2. **Crear credenciales** → **Clave de API**.
3. Cópiala (algo como `AIzaSyA...`).

### Paso 3 — Restringir la key (importante por seguridad)

1. Click en la key recién creada.
2. **Restricciones de aplicaciones** → **Apps Android**:
   - Nombre del paquete: `com.capachica.experienceai`
   - Huella SHA-1: corre `eas credentials` y elige Android → te da la huella.
3. **Restricciones de aplicaciones** → **Apps iOS** (si vas a iOS):
   - Bundle ID: `com.capachica.experienceai`
4. **Restricciones de API** → selecciona solo las 2 APIs que habilitaste.

### Paso 4 — Pegar en `app.json`

Reemplaza `REPLACE_WITH_GOOGLE_MAPS_KEY` en estos 2 lugares de `app.json`:

```json
"ios": {
  "config": { "googleMapsApiKey": "AIzaSyA..." }
},
"android": {
  "config": { "googleMaps": { "apiKey": "AIzaSyA..." } }
}
```

### Paso 5 — Rebuild

Como esto va en el binario nativo, tienes que rehacer el build:

```powershell
eas build -p android --profile preview
```

(En modo Expo Go **no** se aplica — solo en builds nativos.)

---

## 4) Google OAuth (opcional)

Para que funcione el botón "Continuar con Google" en login:

1. En Google Cloud Console (mismo proyecto), **Credenciales** → **Crear** → **ID de cliente de OAuth**.
2. Crea **3 clients** (uno por plataforma):
   - **Android**: package `com.capachica.experienceai`, SHA-1 (la misma de Maps).
   - **iOS**: bundle `com.capachica.experienceai`.
   - **Web**: para Expo Go en desarrollo.
3. Pega los IDs en `app.json` → `extra`:
   ```json
   "googleClientIdAndroid": "...apps.googleusercontent.com",
   "googleClientIdIos": "...apps.googleusercontent.com",
   "googleClientIdWeb": "...apps.googleusercontent.com"
   ```
4. Reinicia Expo.

---

## 5) Comandos de uso diario

```powershell
# LAN normal (PC + celular en misma Wi-Fi o hotspot)
npx expo start

# Tunnel (redes distintas, depende de ngrok)
npx expo start --tunnel

# Limpiar caché si pasa algo raro
npx expo start --clear

# Reparar versiones de paquetes contra el SDK
npx expo install --fix
```
