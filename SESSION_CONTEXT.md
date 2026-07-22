# Session Context — Capachica Turismo

## SESIÓN 14 jul 2026 (noche) — galería/video en Familias, filtros, visor fullscreen

### Hecho y pusheado (todo en `main`, verificar Railway redeploy del frontend)
1. **Limpieza: `ia_destinos` muerto borrado** (`c70d108e`) — tabla `ia_destinos` +
   rutas `/api/destinos`, `POST/PUT/DELETE /api/admin/destinos` en `IA/backend/server.js`
   + su `CREATE TABLE` en `IA/backend/init.sql`. Confirmado sin ningún caller (frontend/
   admin/mobile) antes de borrar — `destinos.astro` usa `/api/contenido/destinos` (ruta
   genérica de siteconfig), no tiene nada que ver con la tabla `ia_destinos`.
2. **`admin.astro` App Móvil — batch completo** (`c70d108e`) — 10 grupos nuevos (~40
   claves) que faltaban: Artesanía, Gastronomía, Festividades, Reservas, Familias, Guías,
   Mapa, Reservas-tab, Favoritos, Home-historias. Ahora cubre el 100% de `DEFAULTS` en
   `backend/rutas/configuracion.rutas.js`.
3. **Multi-foto + video — admin y mobile** (`bfe54844`):
   - `admin.astro` (modal Familias): campo nuevo "Fotos adicionales (galería)" (subida
     múltiple vía `/api/upload`) y "Video" (vía `/api/upload/historia`, Cloudinary,
     máx 60MB) → se guardan como `imagenes: string[]` y `video: string` en el JSONB de
     `comunidades`. Sin migración.
   - `my-business.tsx` (mobile, los 6 tipos de negocio): mismo agregado — selector
     múltiple de fotos (hasta 8, `allowsMultipleSelection`) y subida de video
     (reusa `subirFoto`/`subirMediaHistoria` que ya existían para Stories). Guardado
     directo como `fotos[]` / `video` en el body.
4. **Mostrar galería/video/datos de hospedaje en pantallas públicas mobile** (`9e186183`,
   `6c1f0e9d`):
   - `community-detail.tsx`: sección "Fotos" (carrusel), sección "Video" (`expo-video`
     `VideoView`), sección "Hospedaje" (precio/noche, huéspedes, habitaciones, comidas,
     idiomas — campos que se cargaban desde el admin hace 2 sesiones pero nunca se
     mostraban en mobile), chips de Servicios/Actividades, botón "Contactar por
     WhatsApp" (`wa.me`), precio real de reserva en vez de 120 hardcodeado.
   - `communities.tsx`: badge ▶ en la tarjeta si la familia tiene video, chips de
     filtro por actividad (Kayak, Pesca artesanal, etc.) generados dinámicamente de
     los datos reales — reemplaza la lista fija que no existía antes.
   - `experience-detail.tsx` NO tocado a propósito — corre sobre la tabla `actividades`,
     que no tiene ninguna UI de admin/mobile para cargarle fotos/video, así que
     agregar la sección ahí no mostraría nada real.
5. **Historias — selección múltiple** (`9e186183`) — `StoryCreateModal.tsx` antes
   elegía 1 foto/video por vez; ahora `allowsMultipleSelection` (hasta 10), tira de
   miniaturas con ✕ para sacar cada una. Cada asset se sube y se crea como historia
   separada (sin cambio de backend) — el feed ya agrupaba historias del mismo usuario
   en secuencia tipo WhatsApp, así que quedan encadenadas solas.
6. **Visor pantalla completa (fotos/video de Familia)** (`6cfbfd82`) — componente nuevo
   `mobile/src/components/MediaViewer.tsx`: modal fullscreen, swipe horizontal tipo
   Instagram entre portada + galería + video, puntos indicadores, botón cerrar. El
   video solo monta su `VideoView` cuando está en la página activa (evita instanciar
   varios reproductores a la vez). Conectado en `community-detail.tsx`: portada,
   miniaturas de galería y video (ícono ⛶ superpuesto) abren el visor al tocarlos.
7. **Fix versión mostrada en Configuración** — `app/(stacks)/settings.tsx` tenía
   `"alpha-1.0.2"` hardcodeado y desincronizado del APK real instalado (mostraba
   "alpha-0.9.3" en pantalla, versión vieja). Ahora se actualiza en cada build junto
   con `android/app/build.gradle`.

### Builds APK de esta sesión (`gradlew assembleRelease --no-daemon`, firma debug keystore)
- `Capachica-alpha-1.0.6.apk` — multi-foto+video (admin Familias + Mi Negocio mobile)
- `Capachica-alpha-1.0.7.apk` — galería/video/hospedaje visible en detalle de Familia,
  filtro por actividad, multi-selección en Historias
- `Capachica-alpha-1.0.8.apk` — visor pantalla completa (fotos/video de Familia)
- Todos en `C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\release\`

### Reglas nuevas de esta sesión (agregadas a "Reglas de trabajo" más abajo)
- **Pushear siempre**, sin preguntar, apenas se termina un cambio.
- **Build de APK**: SIEMPRE preguntar versión antes de compilar. Nombre de archivo
  siempre `Capachica-<version>.apk`. Hay que actualizar a mano 2 lugares antes de
  buildear: `mobile/android/app/build.gradle` (`outputFileName`, dentro de
  `applicationVariants.all` — no se regenera solo, `/android/` está gitignored) y
  `mobile/app/(stacks)/settings.tsx` (string `value="alpha-X.X.X"` en el `InfoRow` de
  Versión).

### Pendiente / posible siguiente paso
- [ ] Extender `admin.astro` sección "App Móvil" ya está al 100% (hecho hoy) — sin
      pendiente ahí.
- [ ] Reeditar las 6 familias/comunidades ya cargadas con los campos nuevos de
      hospedaje (precio/capacidad/servicios/etc.) — el usuario dijo que lo hace él
      mismo desde el admin, no está hecho todavía.
- [ ] `ia_destinos` / rutas `/api/admin/destinos` — YA BORRADO esta sesión, confirmado
      muerto.
- [ ] `destinos.astro` (página pública del sitio web) sigue con su propio esquema
      viejo, no muestra galería/video/hospedaje de las familias — no se tocó.
- [ ] Galería/video de `experience-detail.tsx` (actividades) — no implementado a
      propósito, la tabla `actividades` no tiene UI de carga de fotos/video todavía.
      Si se quiere, habría que agregar esa gestión primero (en `my-business.tsx` o
      un admin web nuevo) antes de mostrar algo ahí.
- [ ] MediaViewer solo se usa en `community-detail.tsx` por ahora — no se conectó a
      `my-business.tsx` (miniaturas de "fotos"/"video" del propio negocio, hoy sin
      lightbox) ni a Stories (que ya tiene su propio `StoryViewer.tsx` separado).
- [ ] Pila grande de mobile de sesiones anteriores (stories tray, mapa editable,
      config-etiquetas, phone auth) segía sin commitear al empezar esta sesión — se
      dejó así (no es de esta sesión), pero está incluida en todos los APK builds de
      hoy porque Gradle compila desde el disco, no desde git. Si se quiere que quede
      respaldado en git, falta commitearla.

### Cómo retomar
1. Confirmar que Railway ya redeployó `capachica-backend`, `capachica-frontend` e
   `IA/backend` con los últimos pushes.
2. Instalar `Capachica-alpha-1.0.8.apk` y probar: filtro por actividad en Familias,
   detalle con precio/servicios/actividades/whatsapp, galería+video, visor fullscreen
   con swipe.
3. Symlink real de mobile: `F:\SISTEMAS\CAPACHICA\PROYECTO NUEVO\mobile` ↔
   `C:\APLICACIONES MOVILES\capachica\mobile` (mismo archivo, ahí se buildea).

## SESIÓN 14 jul 2026 (tarde/noche) — CMS mobile sin rebuild, mapa admin, Familias=hospedaje

### Hecho y pusheado (todo en `main`, verificar Railway redeploy)
1. **Home mobile decluttered** — quitados de la grilla "Explora" (`app/(tabs)/index.tsx`):
   AR, Reservas, Mapa Google, Chat Inti (quedan: Comunidades, Gastronomía, Artesanía, Guías,
   Festividades). Quitado el widget `<KillaTeaser />` ("¿Qué quieres descubrir hoy?") de Home,
   Gastronomía y Familias/Comunidades (componente `KillaTeaser.tsx` ya no se importa en ningún
   lado, se puede borrar si se quiere).
2. **CMS de textos sin rebuild — extendido a ~16 pantallas** (`backend/rutas/configuracion.rutas.js`
   `DEFAULTS`, ~85 claves): Home, onboarding, Ayuda, crafts/gastronomy/festividades/booking/
   communities/guides/map/reservasTab/favorites. Patrón: `useAppConfig()` hook
   (`mobile/src/data/AppConfigContext.tsx`) → `cfg.text(clave, fallback)` / `cfg.json(clave, fallback)`.
   Admin edita desde `config-etiquetas.tsx` in-app (menú perfil → "Textos de la app", 16
   secciones colapsables) — el mobile YA cubre todo, **falta extender `admin.astro`
   (sección "App Móvil") con el batch nuevo de claves si se quiere editar también desde la web**.
3. **Mapa con pines editables por el admin** — backend nuevo `backend/rutas/ubicaciones.rutas.js`
   (tabla `ubicaciones`, CRUD admin-only, GET público), sembrada con los 5 pines viejos al
   arrancar. Mobile `app/(tabs)/map.tsx`: admin ve un botón de lápiz junto al buscador →
   "modo edición": mantener presionado el mapa agrega pin, tocar uno lo edita
   (`UbicacionEditModal.tsx`), arrastrarlo lo mueve. Familias anfitrionas (sección en
   `communities.tsx`) se quitó a pedido del usuario.
4. **Google Maps arreglado** — la key era el placeholder literal `REPLACE_WITH_GOOGLE_MAPS_KEY`
   en `app.json` y `AndroidManifest.xml`, nunca se había reemplazado. Se creó API key real en
   Google Cloud Console (proyecto `Capachica IA` / `gen-lang-client-0078690238` — el proyecto
   `Capachica Turismo` no tenía cupo de facturación disponible), restringida a
   `com.capachica.experienceai` + SHA-1 del debug keystore. Key ya en ambos archivos y pusheada.
5. **Admin web: Conocimiento (Inti) ahora se puede editar** — antes solo agregar/borrar.
   Botón "✎ Editar" carga la entrada al form, botón cambia a "Guardar cambios" + "Cancelar
   edición". Nuevo endpoint `PUT /api/admin/conocimiento/:id` en `IA/backend/server.js`.
6. **"Destinos" → "Familias" con campos reales de hospedaje vivencial** — la sección
   "Destinos" del admin en realidad edita la tabla `comunidades` (backend principal, JSONB
   flexible vía `crearRutasSQL` — **no** la tabla `ia_destinos` del backend IA, que quedó
   huérfana/sin usar, ver nota abajo). Se renombró a "Familias Anfitrionas" y el modal ahora
   tiene: precio/noche, capacidad, habitaciones, comidas incluidas (select), servicios (lista),
   actividades (lista), idiomas, WhatsApp — en vez de los campos viejos de "destino turístico"
   (emoji/color/highlight/tags genéricos). Sin migración de BD (JSONB ya era flexible). Precios
   de referencia investigados: S/60-120/noche pensión completa en homestays de Llachón.
   **Las 6 familias ya cargadas (Llachón, Escallani, etc.) tienen los campos viejos vacíos en
   los nuevos campos — hay que reeditarlas para llenar precio/capacidad/servicios/etc.**

### Builds APK de esta sesión (todos con `assembleRelease`, firma debug keystore)
- `alpha-1.0.3` — grilla reducida + KillaTeaser fuera + batch grande de textos editables
- `alpha-1.0.4` — Google Maps key real (mapa funciona)
- `alpha-1.0.5` — admin puede agregar/editar/mover/borrar pines del mapa
APKs en `C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\release\`.
**Regla del usuario: SIEMPRE preguntar version + nombre de archivo antes de buildar.**

### Pendiente / posible siguiente paso
- [ ] Extender `admin.astro` sección "App Móvil" con el batch nuevo de ~85 claves de texto
      (hoy solo cubre el primer batch, el mobile in-app ya cubre todo)
- [ ] Reeditar las 6 familias/comunidades ya cargadas con los campos nuevos de hospedaje
- [ ] Revisar si la tabla `ia_destinos` / rutas `/api/admin/destinos` en `IA/backend/server.js`
      están realmente muertas (sin ningún frontend que las llame) — candidatas a borrar
- [ ] `destinos.astro` (página pública del sitio) sigue con su propio esquema viejo
      (nombre/comunidad/desc/imagen/emoji/highlight/color/tags) y NO se tocó — si se quiere que
      el sitio público también muestre precio/servicios/etc. de las familias, falta ese trabajo
- [ ] No se ha hecho ningún build de mobile después del último cambio (todo lo de este bloque
      de "Familias" es solo frontend/backend web, no requiere rebuild de mobile)

### Cómo retomar
1. Confirmar que Railway ya redeployó `capachica-backend`, `capachica-frontend` e
   `IA/backend` (3 servicios separados, auto-deploy en push a `main`).
2. Si se sigue con mobile: symlink `F:\SISTEMAS\CAPACHICA\PROYECTO NUEVO\mobile` →
   `C:\APLICACIONES MOVILES\capachica\mobile` (ahí se buildea de verdad).
3. Si se sigue con admin web: recordar que `admin.astro` se edita con Python inline (`Write` +
   `Bash` + `node --check` sobre el `<script define:vars={{ API_URL, IA_URL }}>` extraído), NO
   con el tool Edit directo — tiene emojis que rompen el matching. Ver sección "Reglas de
   trabajo" y "Cómo editar admin.astro con Python" más abajo en este archivo.

---

## SESIÓN 14 jul 2026 — reservas real, migración Postgres, i18n, dark mode

### Hecho y verificado
1. **Login Google mobile** — confirmado estable con SDK nativo (`@react-native-google-signin`).
   DNS del emulador se corrompió tras un restart (`ping 8.8.8.8` ok, `ping google.com` fallaba) —
   fix: relanzar emulador con `-dns-server 8.8.8.8,1.1.1.1`.
2. **Reservas reales end-to-end (mobile + web)**:
   - `mobile/src/data/api.ts` — `reservas.mias/crear/editar/cancelar`, `tryRefreshToken()`,
     `authFetch` reintenta 1 vez con refresh token en 401.
   - `mobile/src/auth/AuthContext.tsx` — guarda/usa `refreshToken` (SecureStore), antes solo
     duraba 1h porque el refresh nunca se usaba.
   - `mobile/src/components/ReservaDetailModal.tsx` (nuevo) — ver/editar/cancelar reserva.
   - `mobile/app/(stacks)/my-bookings.tsx` — datos reales vía `useLiveRefresh`, tarjetas
     abren el modal de detalle.
   - `mobile/src/components/BookingModal.tsx` — postea reserva real al backend (antes solo
     AsyncStorage local, nunca llegaba al backend).
   - `backend/rutas/actividades/reservas.rutas.js` — agregado `PUT /:id` (editar, solo si
     pendiente) y `PATCH /:id/cancelar`, broadcast websocket en POST/PATCH.
   - `frontend mejorado/src/pages/mis-reservas.astro` — modal ver/editar/cancelar. Bug
     encontrado: `abrirDetalle(Number(el.dataset.id))` con id UUID (string) → nunca matcheaba,
     sin error en consola. Fix: sacar el `Number()`.
3. **Perfil mobile (`app/(tabs)/profile.tsx`)** — reescrito:
   - Insignias/niveles (falsos) eliminados por completo.
   - Stats reales: viajes = reservas con `estado==='confirmada'`, reservas = total, reseñas =
     conteo real de ratings.
   - "Mi negocio" en el menú solo visible si `rol === 'admin' || 'proveedor'`.
4. **i18n real (5 idiomas: ES/EN/FR/QU/AY)** — `mobile/src/i18n/` (i18next + react-i18next,
   persistido en AsyncStorage). Aplicado por ahora solo a: tabs, Inicio, Inti AI (killa.tsx),
   Perfil, Configuración. **Falta el resto de pantallas** (Reservas/booking, Comunidades,
   Mi negocio, Favoritos, Gastronomía, etc. — siguen hardcodeadas en español).
   Quechua/aymara son traducción aproximada mía (no nativo) — usuario aceptó, pendiente
   revisión por hablante nativo en algún momento.
5. **Dark mode real** — `mobile/src/theme/colors.ts` (objeto `colors` mutable +
   `applyColorScheme()`), `mobile/src/theme/mode.ts` (`useThemeMode()` hook pub-sub).
   Cambio instantáneo sin remount ni reload (usuario rechazó explícitamente el approach de
   `Updates.reloadAsync()` porque lo sacaba de la pantalla actual). Para que el cambio se vea
   en vivo sin reload hubo que sacar los estilos que dependen de color de `StyleSheet.create`
   (evaluado una sola vez) a overrides inline recalculados cada render, + cada pantalla llama
   `useThemeMode()` para re-renderizar. Aplicado en los mismos 5 archivos del punto 4.
   **Falta el resto** (~26 archivos) — sólo tomarían el tema nuevo con reinicio completo del
   app, no con el toggle en vivo, hasta que se les aplique el mismo tratamiento.
6. **MIGRACIÓN GRANDE: contenido CMS de archivos JSON a Postgres** — causa raíz del bug
   "las reservas/fotos desaparecen en cada push": `jsonCrud.rutas.js` escribía a
   `backend/data/*.json` en el filesystem del contenedor Railway, que es efímero — se
   reconstruye desde git en cada deploy, cualquier escritura en runtime se pierde.
   - `backend/rutas/utilidades/sqlCrud.rutas.js` (nuevo) — CRUD genérico JSONB-backed,
     reemplaza `jsonCrud.rutas.js` (borrado). Ownership check admin/dueño. Cast `Number(r.id)`
     en las respuestas (Postgres BIGINT vuelve como string vía driver `pg`, rompía
     comparaciones `===` en `admin.astro`).
   - Tablas nuevas en `backend/db/init.sql`: `comunidades`, `festividades`, `artesania`,
     `maestros`, `guias`, `hospedajes` — todas `id BIGINT PK, usuario_id UUID, usuario_nombre
     TEXT, data JSONB, created_at`.
   - `comunidades.rutas.js`, `festividades.rutas.js`, `contenido.rutas.js` (artesania/
     maestros/guias/hospedajes) — todos ahora usan `crearRutasSQL` en vez de `crearRutasJSON`.
   - `backend/db/seed_contenido.js` (nuevo) — migra los JSON originales a Postgres,
     idempotente (`ON CONFLICT DO NOTHING`), para levantar un entorno nuevo desde cero.
     Los JSON en `backend/data/*.json` quedan solo como fuente de seed, ya no se leen en
     runtime.
   - **Verificado end-to-end**: PUT de prueba → push → Railway redeploya → GET confirma que
     el dato sigue ahí (antes se hubiera perdido). Migración de datos reales corrida en vivo
     vía consola Railway (`node db/seed_contenido.js`).
7. **APK release para descargar — RESUELTO (15 jul)**. RAM libre confirmada (5.4GB de 16.3GB,
   nada de emulador/gradle/node corriendo). `gradlew assembleRelease --no-daemon` en
   `C:\APLICACIONES MOVILES\capachica\mobile\android` — `BUILD SUCCESSFUL in 4m 39s`.
   APK en `...\mobile\android\app\build\outputs\apk\release\app-release.apk` (55.2MB).
   Pendiente: confirmar firma (release build usa signingConfig por defecto = debug keystore
   salvo que se haya configurado uno de release en `build.gradle`) antes de distribuir fuera
   de pruebas internas.

### Pendientes para retomar
- [ ] APK release para descargar (ver punto 7 arriba)
- [ ] i18n: cubrir pantallas restantes (Reservas/booking, Comunidades, Mi negocio, Favoritos,
      Gastronomía, etc.)
- [ ] Dark mode: mismo tratamiento (sacar estilos de color de `StyleSheet.create` a inline +
      `useThemeMode()`) en los ~26 archivos que faltan
- [ ] Revisión nativa de traducciones quechua/aymara
- [ ] Emoji mal codificado (mojibake) visto en JSON de comunidades — notado, no corregido
- [ ] `googleClientIdIos` en `app.json` sigue apuntando a client tipo Escritorio (bug latente
      si se prueba login iOS algún día)

## SESIÓN 13 jul 2026 — mobile build local + fixes deploy

### Qué se hizo, en orden
1. **Build local Android** siguiendo `PROYECTO NUEVO/mobile/BUILD_LOCAL_SETUP.md` — emulador
   `Capachica_Emulator`, SDK/Gradle/AVD en SSD (`C:\Android`, `C:\APLICACIONES MOVILES\capachica`).
2. **Doc generado**: `PROYECTO NUEVO/Guia_Build_Local_Mobile_Capachica.docx` (guía completa con
   todos los comandos, para presentación).
3. **Workflow acordado con el usuario**: NO se trabaja local en el frontend/backend web — cada
   cambio se commitea y pushea a `main`, Railway redeploya solo (`capachica-frontend`,
   `capachica-backend` en el proyecto Railway `zoological-abundance`).
4. **Bug reservas de actividades (frontend web) — RESUELTO, 2 commits**:
   - `237737de` — `actividades.astro` pegaba a `/api/reservas` relativo (dominio del frontend, sin
     esa ruta) en vez del backend. Fix: `const API_URL = import.meta.env.PUBLIC_API_URL...`.
   - `370380ef` — el fix anterior usó `<script define:vars={{ API_URL }}>` en el MISMO script que
     `openModal`/`submitReserva`/etc. Astro envuelve scripts con `define:vars` en un IIFE → esas
     funciones dejaron de ser globales → `onclick="openModal(...)"` del HTML tiraba
     `ReferenceError`. Fix: separar `API_URL` en un `<script define:vars>` chico aparte que solo
     setea `window.__API_URL__`, sin tocar el script principal (que sigue `is:inline`, global).
   - Verificado en vivo con Chrome extension: reserva funciona, toast "¡Reserva guardada!".
5. **Bug login Google (mobile) — RESUELTO, 2 commits + cambios en Google Cloud Console**:
   - Causa 1: `googleClientIdAndroid` en `app.json` apuntaba a un OAuth Client ID tipo
     **"Escritorio"** (creado mal originalmente), no tipo "Android". Los clientes tipo Escritorio
     no aceptan redirect custom-scheme (`com.capachica.experienceai:/oauthredirect`) que usa
     `expo-auth-session`. Google tiraba `Error 400: redirect_uri_mismatch`.
   - Fix: se creó un **Client ID nuevo tipo Android** en Google Cloud Console (proyecto
     `capachica-turismo`) — package `com.capachica.experienceai`, SHA-1 del debug keystore local
     (`5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`, sacado de
     `C:\APLICACIONES MOVILES\capachica\mobile\android\app\debug.keystore`). Client ID nuevo:
     `936387439928-ev9j7momqcvqfpqqa7r42ra8l8u2osvu.apps.googleusercontent.com`.
     Commit `9bef01f1` actualiza `app.json` con el nuevo id.
   - Causa 2: el client Android nuevo trae "Esquema de URI personalizado" **deshabilitado** por
     default (Google lo desaconseja). Se habilitó manualmente en Configuración avanzada del
     client en Google Cloud Console → error cambió a `Error 400: invalid_request` /
     "Custom URI scheme is not enabled for your Android client" resuelto.
   - Causa 3: aun con todo lo anterior, tocar "Continuar" en la pantalla de consentimiento de
     Google no volvía a la app — el `AndroidManifest.xml` generado por `expo prebuild` solo tenía
     intent-filter para los schemes `capachica` y `exp+capachica-experience-ai`, no para
     `com.capachica.experienceai` (el que arma el redirect_uri). Fix: commit `15391975` — se
     agregó `"scheme": ["capachica", "com.capachica.experienceai"]` en `app.json` (era string
     simple antes). Esto es cambio NATIVO (manifest), no alcanza con reload de Metro — hubo que
     re-correr `npx expo prebuild --platform android`, re-fixear `local.properties` +
     `gradle.properties` (`reactNativeArchitectures=x86_64`, se resetean con cada prebuild), y
     recompilar (`gradlew assembleDebug`, ~3min). El `debug.keystore` NO cambió de SHA-1 al
     regenerarse (mismo archivo persiste), así que no hubo que retocar Google Console de nuevo.
   - **Pendiente confirmar**: usuario estaba por reprobar el login tras el último rebuild+install
     cuando surgió el tema del pagefile — falta la confirmación final de que el login anda con
     el APK reconstruido (`android:scheme com.capachica.experienceai` ya en el manifest).
   - **Nota suelta**: `googleClientIdIos` en `app.json` sigue apuntando al client viejo tipo
     Escritorio — mismo bug latente si algún día se prueba login en iOS. No resuelto todavía.
6. **Pagefile de Windows**: usuario configuró memoria virtual manual — `C:` 8192-16384 MB
   personalizado, `D:`/`E:`/`F:` "Sin archivo de paginación". Falta **reiniciar la PC** para que
   tome efecto (Windows estaba parqueando al `E:\pagefile.sys` del HDD por RAM casi llena
   14/15.9GB con emulador+Gradle+Metro+Node corriendo juntos — causaba el 100% de actividad en
   Disco 1 E:/F: que vio el usuario en el Administrador de tareas).
7. **Login Google — RESUELTO DE VERDAD** (tras reinicio): `expo-auth-session` en Android usa un
   polyfill JS (`WebBrowser.ts` `_openAuthSessionPolyfillAsync`) que hace `Promise.race` entre
   "la app volvió a foreground" (AppState) vs "llegó la URL de redirect" (Linking) — casi
   siempre gana el AppState, `promptAsync()` resuelve `dismiss` en vez de `success`, nunca
   llega el `id_token`, y el deep link `capachica://oauthredirect?code=...` que sí llega un
   instante después lo agarra expo-router como ruta desconocida ("Unmatched Route"), app se
   queda trabada ahí. Bug conocido de Android (no tiene equivalente nativo a
   `ASWebAuthenticationSession` de iOS). **Fix real**: se migró todo el login de Google a
   `@react-native-google-signin/google-signin` (SDK nativo, sin dance de browser/deep-link).
   - `npm install @react-native-google-signin/google-signin` en `mobile/`.
   - `app.json` plugins: agregado `"@react-native-google-signin/google-signin"`.
   - `mobile/src/auth/AuthContext.tsx`: reemplazado `Google.useIdTokenAuthRequest` +
     `WebBrowser.maybeCompleteAuthSession()` por `GoogleSignin.configure({webClientId})` +
     `GoogleSignin.signIn()` (usa `googleClientIdWeb` de `extra`, NO el androidClientId — ese
     se resuelve solo por package+SHA1 registrado en Google Cloud Console).
   - Requirió `npx expo prebuild --platform android` de nuevo + reaplicar
     `local.properties`/`gradle.properties` (`reactNativeArchitectures=x86_64`) +
     `gradlew assembleDebug` (~2m48s) + reinstalar APK.
   - **Confirmado funcionando** por el usuario en el emulador.
   - `expo-auth-session`/`expo-web-browser` quedaron sin uso en `src/` pero no se desinstalaron
     (bajo riesgo, no urgente sacarlos de `package.json`).
8. **Unificar reservas mobile ↔ web — EN PROGRESO**: se detectó que "Mis Reservas" del perfil
   mobile (`app/(stacks)/my-bookings.tsx`) leía de `AsyncStorage` local, nunca del backend — y
   que el modal de reserva real (`src/components/BookingModal.tsx`, usado desde
   `app/(stacks)/booking.tsx` que sí lista actividades/hospedajes reales vía `api.actividades()`)
   TAMPOCO pegaba al backend, solo guardaba en `AsyncStorage`. Es decir, reservar desde el app
   nunca llegó a la tabla `reservas` de Postgres ni apareció en el admin/web. Fix:
   - Backend YA tenía `GET /api/reservas/mias` (auth, filtra por `req.usuario.email`) y
     `POST /api/reservas` (público, mismo endpoint que usa `actividades.astro` en la web) —
     no hubo que tocar backend.
   - `mobile/src/data/api.ts`: agregado `reservas.mias()` (authFetch GET) y `reservas.crear()`
     (POST público, mismo shape que espera el backend: nombre/email/fecha_visita/personas/
     actividad/actividad_id/precio_total/notas).
   - `mobile/app/(stacks)/my-bookings.tsx`: reescrito para leer de `reservas.mias()` en vez de
     AsyncStorage, mapeado a los campos reales (`actividad`, `fecha_visita`, `personas`,
     `precio_total`, `estado` con badge pendiente/confirmada/cancelada).
   - `mobile/src/components/BookingModal.tsx`: reescrito — al confirmar, si hay usuario logueado
     (`useAuth().user`), postea a `reservas.crear()` con nombre/email real, `fecha_visita` =
     mañana (no hay date picker todavía, pendiente), `actividad_id` si vino uno real. Si no hay
     sesión, muestra pantalla "Inicia sesión para reservar" en vez de guardar local. Estados:
     form → saving → success/error/needsLogin.
   - `mobile/app/(stacks)/booking.tsx`: ahora pasa `activityId` real (`s.id`/`a.id`) al modal.
   - **Sin tocar** (quedan con datos 100% hardcodeados, no es la reserva real): pantallas
     `experience-detail.tsx` y `community-detail.tsx` (detalle de "Taller de Tejido" y "Estancia
     en Llachón" son mock fijo, no vienen de la API — si se reserva desde ahí, el POST igual
     llega al backend pero sin `actividad_id` real).
   - **Pendiente de decidir**: "Favoritos" (`favorites.tsx`) sigue 100% local (no hay endpoint
     de favoritos en el backend — no es lo mismo que "reservas hechas en la web", es preferencia
     de dispositivo). "Mi negocio" (`my-business.tsx`) YA estaba conectado al backend real
     (CRUD `negocios` + WebSocket live-refresh) desde antes de esta sesión, no necesitó cambios.
   - **Sin recompilar nativo** — estos cambios son solo JS/TS, Metro los sirvió con Fast Refresh
     (confirmado rebundle en `metro.log`). Falta que el usuario pruebe: loguearse, reservar una
     actividad real desde el tab "Reservas", y verificar que aparece en "Mis Reservas" del
     perfil y en el admin/web (mismo `email` de la cuenta Google).

### Al retomar después del reinicio
1. Arrancar emulador (`Capachica_Emulator`, ver sección build local de este mismo archivo /
   `BUILD_LOCAL_SETUP.md`).
2. Instalar el APK ya compilado (no hace falta recompilar, sigue en
   `C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\debug\app-debug.apk`)
   y levantar Metro si no está corriendo.
3. Probar login con Google de nuevo — si sigue fallando, chequear logcat
   (`adb logcat -d | grep -i "redirect_uri\|error"`) y confirmar que el manifest instalado trae
   el intent-filter `com.capachica.experienceai` (`grep android:scheme
   android/app/src/main/AndroidManifest.xml`).
4. Confirmar que el pagefile ya no pega al HDD (Administrador de tareas → Disco 1 E:/F:).

## Reglas de trabajo (OBLIGATORIO)
- **NUNCA** agregar Co-Authored-By a commits — solo Iosef296 como autor
- **NO** crear archivos .py temporales — usar `python -c "..."` inline en Bash  
  *(excepción: heredoc en Git Bash Windows falla con quotes de Python → usar Write + Bash + rm)*
- **NO** preguntar confirmación — ejecutar todo directamente
- Editar `admin.astro` siempre con Python inline (tiene emojis que rompen Edit tool)
- Verificar sintaxis JS después de cada edición: extraer script block + `node --check`
- **Pushear siempre** — commit + push apenas se termina un cambio, sin preguntar
- **Build de APK mobile**: SIEMPRE preguntar qué versión antes de compilar. Nombre de
  archivo siempre `Capachica-<version elegida>.apk` (ej `Capachica-alpha-1.0.7.apk`) —
  hardcodeado en `mobile/android/app/build.gradle` línea `outputFileName` (`app/build.gradle`
  dentro de `applicationVariants.all`, no se regenera solo con prebuild normal ya que
  `/android/` está gitignored). Actualizar ese string + el string de versión visible en
  `app/(stacks)/settings.tsx` (`InfoRow ... value="alpha-X.X.X"`) ANTES de correr
  `gradlew assembleRelease --no-daemon` en `C:\APLICACIONES MOVILES\capachica\mobile\android`.

## Estado actual del proyecto (junio 2026)

### Rama: main — todo pusheado
Último commit: `ff40a275` — feat: true interleaved foliage - split-leaf technique weaves tips in front of flowers

### Archivos clave modificados recientemente
- `PROYECTO NUEVO/frontend mejorado/src/pages/index.astro` — home page (~233k chars)
- `PROYECTO NUEVO/frontend mejorado/src/pages/admin.astro` — panel de admin (~210k chars)
- `PROYECTO NUEVO/IA/backend/siteconfig.json` — config del sitio
- `PROYECTO NUEVO/frontend mejorado/src/components/ArenaFooter.astro` — footer

## Arquitectura admin.astro

Astro 6 SSR + React 19 islands. `admin.astro` con un único `<script define:vars={{ API_URL, IA_URL }}>` block (~167k chars de JS).

### Preview iframe — zoom/scale
- iframe siempre `width:1440px` → media queries ven desktop
- `updateIframeScale()` calcula `ratio = wrapperW / 1440`, aplica `transform: scale(ratio)`
- "Pantalla completa": oculta sidebar + edit panel, iframe a 100%

### Footer GIFs (siteconfig.json)
```json
[
  {"src":"/campfire.png","side":"right","offset":40,"bottom":0,"width":300},
  {"src":"/campfire.png","side":"left","offset":40,"bottom":0,"width":300,"flip":true}
]
```

## Home page — Photo Cards (index.astro)

### Qué son
4 tarjetas expandibles en la sección hero: 2 izquierda, 2 derecha. Colapsan a 200×190px, expanden a 85vw × calc(100vh-80px-130px).

### CSS clave
```css
.hero-photo-card {
  position:absolute; z-index:4;
  width:200px; height:190px;
  border:3px solid #7a4a1e;
  transition: width 0.52s, height 0.52s, top 0.52s, ...;
}
.hero-photo-card.hpc-left  { left:6px; }
.hero-photo-card.hpc-right { right:6px; }
.hero-photo-card.expanded {
  width:85vw; height:calc(100vh - 80px - 130px);
  top:80px !important; z-index:8; overflow:visible;
}
```

### Foliaje decorativo (::before / ::after)
SVG data URI embebido en CSS. Técnica de **split-leaf entrelazado**:

**7 capas de render:**
1. L1: hojas oscuras de fondo (base)
2. L2: hojas medias
3. L3: pétalos TRASEROS de flores (azules + lirios naranjas)
4. L4: cuerpos completos de "hojas cruzantes" (DETRÁS de flores)
5. L5: pétalos DELANTEROS + centros de flores
6. L6: SOLO la punta (top 46%) de hojas cruzantes (ENCIMA de flores → entrelazado real)
7. L7: hojas de acento delanteras

**Posiciones:**
- Flores azules (BF_S=20): cx = [90, 250, 430, 600, 770, 910]
- Lirios naranjas (LY_S=18): cx = [170, 510, 840]
- 3 hojas cruzantes por flor, ángulos opuestos al offset (izq→rot+, der→rot-)

**`::before`**: top:-12px, height:62px, viewBox='-10 0 980 62', BY=56  
**`::after`**: bottom:-18px, height:28px, viewBox='-10 0 450 28', by=26  
Ambos con `animation:hpcLeafIn 0.44s ease both`

### JS toggle
```js
function toggleHPC(card) {
  var wasExpanded = card.classList.contains('expanded');
  document.querySelectorAll('.hero-photo-card').forEach(function(c) {
    c.classList.remove('expanded'); c.style.opacity=''; c.style.pointerEvents='';
  });
  if (!wasExpanded) {
    card.classList.add('expanded');
    var side = card.classList.contains('hpc-left') ? 'hpc-left' : 'hpc-right';
    document.querySelectorAll('.hero-photo-card.' + side).forEach(function(c) {
      if (c !== card) { c.style.opacity='0'; c.style.pointerEvents='none'; }
    });
  }
}
```

### IDs y posición
- `hpc1` (left, top:18%), `hpc2` (left, top:52%), `hpc3` (right, top:18%), `hpc4` (right, top:52%)
- Imágenes placeholder: `/foto-lago.jpg`, `/foto-vivencial.jpg`, `/foto-actividades.jpg`, `/foto-festividades.jpg` — **no existen en /public/** todavía

## Cómo parchear index.astro con Python
```python
# Localizar y reemplazar bloque ::before / ::after
f = open('PROYECTO NUEVO/frontend mejorado/src/pages/index.astro','rb').read().decode('utf-8')
bs = f.find('    .hero-photo-card.expanded::before {')
be = f.find('\n    }', bs) + 6
as_ = f.find('    .hero-photo-card.expanded::after {', be)
ae  = f.find('\n    }', as_) + 6
# reemplazar f[bs:be] y f[as_:ae] con nb y na
```

## Cómo editar admin.astro con Python
```python
data = open('PROYECTO NUEVO/frontend mejorado/src/pages/admin.astro','rb').read()
f = data.decode('utf-8')
old = '''...'''
new = '''...'''
assert f.count(old) == 1
f = f.replace(old, new)
open('PROYECTO NUEVO/frontend mejorado/src/pages/admin.astro','wb').write(f.encode('utf-8'))
```

## Verificar sintaxis JS
```bash
python -c "
f = open('PROYECTO NUEVO/frontend mejorado/src/pages/admin.astro','rb').read().decode('utf-8')
start = f.find('<script define:vars=')
js_start = f.find('>', start) + 1
end = f.find('</script>', js_start)
open('_admin_check.js','w',encoding='utf-8').write(f[js_start:end])
" && node --check _admin_check.js && echo "SYNTAX OK" && rm -f _admin_check.js
```

## Nota: heredoc en Git Bash Windows
`python << 'PYEOF' ... PYEOF` falla con quotes de Python (`'`).  
Workaround: usar `Write` tool para crear `_pw.py`, ejecutar con Bash, luego `rm -f _pw.py`.

## Historial commits recientes
```
ff40a275  feat: true interleaved foliage - split-leaf technique weaves tips in front of flowers
cedbad33  feat: interweave foliage SVG - leaves woven in front and behind flowers
b7c975e2  feat: cartoon foliage strip on expanded photo card (::before/::after)
d3b8301c  feat: force iframe preview to render at 1440px with transform scale
```

## Tareas pendientes
- [ ] Agregar fotos reales a `/public/` (foto-lago.jpg, foto-vivencial.jpg, foto-actividades.jpg, foto-festividades.jpg)
- [ ] Probar en Railway que el preview del admin funciona con URL de producción
- [ ] Verificar drag/resize de GIFs del footer con transform scale
