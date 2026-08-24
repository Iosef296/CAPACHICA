# Session Context — Capachica Turismo

## SESIÓN 23-24 ago 2026 — moderación de contenido, splash UPEU, experiencia con IA, arranque de publicación en Play Store

Sesión larga (mobile principalmente). En orden:

### 1. Asignar emprendedor dueño a cada recurso (backend+web+mobile)
- `PUT /:recurso/:id/asignar` (admin-only) en `sqlCrud.rutas.js` — aplica a
  comunidades/artesania/festividades/maestros/guias. admin.astro y
  Mi Negocio (mobile) lo usan; admin ve TODOS los items de esos tipos
  (`negocios.listarTodos`), no solo los propios.
- Se crearon 21 cuentas reales (`<slug-nombre>@capachica.pe` /
  `Capachica2026`, rol proveedor) y se asignó cada una a su familia real
  en producción vía script en la consola del navegador (admin logueado).

### 2. Moderación: un emprendedor no publica directo
- POST en `sqlCrud.rutas.js` fuerza `data.aprobado` según rol (admin=true,
  proveedor=false). `PUT /:id/aprobar` (admin-only) publica. GET público
  hace soft-auth (token opcional) para que dueño/admin vean pendientes,
  cualquier otro no. Items viejos sin el campo cuentan como aprobados.
- admin.astro y Mi Negocio (mobile) muestran badge "⏳ Pendiente" + botón
  aprobar cuando aplica.

### 3. Contenido real reemplaza demo/inventado
- Artesanía: 3 productos reales (chullo/chumpi/poncho), sin atribuir a
  personas ficticias (antes "Mamá Victoria"/"Mateo Huatta" con fotos de
  desconocidos). Maestros (fotos falsas) borrados sin reemplazo.
- Guías: 4 guías reescritas con contenido investigado real (historia,
  mito de Manco Cápac, rutas Puno→Capachica→Llachón, clima).
- Festividades: borradas 2 de prueba ("actividad random").
- Gastronomía: 1 restaurante + 6 platos reales investigados (trucha,
  chairo, thimpo de karachi, chuño con charqui, pesque de quinua,
  pachamanca) — antes vacía en producción.
- `/alojamiento` (web) conectado a `/comunidades` real (antes 19 casas
  100% inventadas).

### 4. Detalle + navegación real (mobile)
- `craft-detail.tsx`, `festividad-detail.tsx`, `guide-detail.tsx`
  (nuevos) — antes ninguna de las 3 secciones navegaba a nada al tocar
  un item. Craft-detail tiene botón "Comprar por WhatsApp".
- Home: "Recomendaciones"/"Destacados" ya no son mock (fotos de otra
  cuenta de Google Photos) — arman con familias/artesanía/festividades
  reales con foto, tocables.

### 5. "Crear mi experiencia con IA" — itinerario real, no chat genérico
- `POST /api/experiencia` (IA/backend/server.js, nuevo): recibe
  {dias, presupuesto, personas, intereses}, trae familias/actividades/
  artesanía reales del backend principal, le pasa SOLO esos ids/precios
  reales a la IA (nunca puede inventar), resuelve la respuesta contra
  los datos reales y RECALCULA el costo server-side (nunca confía en la
  suma de la IA). `experience-builder.tsx` (mobile, nuevo) es la pantalla
  -- el botón del Home ya no abre killa-chat.
- Bugs de IA encontrados y arreglados en el camino: `chatComplete` no
  reintentaba el siguiente modelo en 404 (solo en 429) -- OpenRouter le
  cortó el free tier a varios modelos ese día. El modelo que sí respondía
  (nvidia/nemotron) "piensa en voz alta" y a veces se queda sin
  `max_tokens` antes de llegar al JSON -- subido a 4000 + `reasoning:
  {exclude:true}` (este último no lo respetó el modelo, pero no molesta
  dejarlo). Con 1 intento por request (2 causaba 502 de Railway por
  timeout) queda ~2 de 3 éxitos -- comportamiento esperable de un modelo
  gratuito, no bug pendiente.

### 6. Splash de arranque UPEU + créditos
- `AppSplash.tsx` (nuevo): logo + "Universidad Peruana Unión" +
  "Desarrollado por estudiantes UPEU", fondo azul degradado, mínimo
  1.6s, se muestra mientras cargan fuentes/auth en `app/_layout.tsx`.
- **Bug real encontrado**: AppSplash se renderiza ANTES de que
  `useFonts()` termine -- usar `fontFamily` custom ahí truncaba el texto
  en Android sin ningún error (confirmado en vivo con marcador de texto
  de prueba). Fix: sin `fontFamily` en este componente puntual, fuente
  del sistema.
- Configuración > Acerca de: versión pasó a `1.0.0` (`app.json`), sección
  nueva "Desarrollado por" con los 6 nombres del equipo en lista.

### 7. Publicación en Play Store — EN CURSO, no se puede terminar hoy
El usuario pidió subir esta app como actualización de una app YA
publicada. Se investigó en Play Console (cuenta `upeusistemacj`,
logueada por el usuario en Chrome) y aparecieron 2 bloqueantes:

**a) Paquete distinto** — la app publicada es `pe.capachica.turismo`
(51 usuarios, en producción, package ID: `4975711731080108229` dentro
del developer account `8510068969879574672`). Este proyecto Expo usa
`com.capachica.experienceai`. Play Store identifica la app por el
package -- **hay que cambiar `android.package` en `app.json` a
`pe.capachica.turismo` antes de poder subir nada como actualización**
(sigue sin hacerse, es el primer paso al retomar).

**b) Sin keystore de subida original** — el usuario no tiene el
keystore con el que se firmó la app publicada. Buena noticia: **Play
App Signing está activo** (Google guarda la clave real de firma, "En
uso", base instalada 100%) -- solo hace falta una "clave de subida"
válida, que Google puede resetear.
- **Ya se generó una keystore nueva** en
  `C:\APLICACIONES MOVILES\capachica\mobile\android\app\upload-keystore.jks`
  (alias `upload`, misma contraseña para store y key: guardada en
  `upload_certificate.pem` del mismo directorio -- **la contraseña es
  `qOSpQJ7PiAN7yJXprNaBlLtR`, GUARDAR ESTO, si se pierde hay que repetir
  todo el proceso de reset**). SHA1:
  `E3:75:88:82:AE:E5:8D:22:75:C8:68:05:05:55:73:E9:36:44:EC:EE` -- SHA256:
  `B1:F7:CA:F6:5D:12:20:76:8B:7A:46:E1:A7:24:51:72:16:36:30:07:81:4A:D5:F6:0B:63:A3:14:E3:00:47:AD`.
- **Ya se envió la solicitud de cambio de clave de subida** a Google
  desde Play Console (Firma de aplicaciones → Solicitar cambio de la
  clave de subida → motivo "He perdido mi clave de subida" → se subió
  `upload_certificate.pem`). Estado al cerrar la sesión: **"Hay una
  solicitud pendiente para cambiar la clave de subida de esta
  aplicación."** Google tarda históricamente 3-7 días hábiles en
  aprobar esto -- no depende de nada de este lado, no se puede acelerar.

**Cómo retomar cuando Google apruebe la clave** (revisar Play Console →
Firma de aplicaciones, o el email de Google a la cuenta `upeusistemacj`):
1. `PROYECTO NUEVO/mobile/app.json`: cambiar `"package":
   "com.capachica.experienceai"` a `"package": "pe.capachica.turismo"`
   dentro de `android`. Probablemente también haya que revisar
   `scheme`/`bundleIdentifier` de iOS si algún día se publica ahí,
   pero eso no bloquea Android.
2. Correr `npx expo prebuild --platform android --clean` en
   `C:\APLICACIONES MOVILES\capachica\mobile` para regenerar el proyecto
   nativo con el package nuevo (el actual sigue con
   `com.capachica.experienceai` compilado).
3. **Reconfigurar Google Sign-In y Google Maps** para el package+SHA1
   nuevos -- el Android OAuth Client ID y la Maps API key actuales
   (`app.json` extra.googleClientIdAndroid / googleClientIdAndroid,
   `AndroidManifest.xml`) están atados a `com.capachica.experienceai` +
   SHA1 del keystore de debug. Con el package/firma nuevos, login
   Google y el mapa van a romper hasta que se registren de nuevo en
   Google Cloud Console (puede ser un proyecto GCP distinto al que se
   usó hasta ahora -- confirmar con el usuario cuál).
4. `cd android && gradlew bundleRelease` (no `assembleRelease` -- Play
   Store pide `.aab`, no `.apk`) firmado con
   `android/app/upload-keystore.jks` (agregar `signingConfigs.release`
   en `android/app/build.gradle` apuntando a esa keystore si
   `expo prebuild` no lo dejó configurado solo).
5. Subir el `.aab` en Play Console → Producción → Crear nueva versión,
   con un `versionCode` mayor al que ya está publicado (revisar cuál es
   el actual en Play Console antes de buildear).
6. Confirmar version que se quiere mostrar (ya quedó `1.0.0` en
   `app.json` y en Configuración > Acerca de del app, hecho en el punto
   6 de esta sesión) antes de subir.

### 8. APK de prueba para el celular (cierre de sesión)
`gradlew assembleRelease --no-daemon` (firma con keystore de DEBUG, no
con `upload-keystore.jks` del punto 7 -- son cosas separadas, no
mezclar). Generado `Capachica-1.0.0.apk` (57MB) en
`C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\release\`.
No se pudo mandar por el chat (pasa el límite de 30MB) -- el usuario lo
pasa a mano (USB/Drive/WhatsApp) desde esa ruta. Antes de compilar se
cerró el emulador (quedaba 4GB libres de RAM con emulador+Metro
corriendo, insuficiente -- con el emulador cerrado subió a 5.4GB,
umbral ya confirmado como seguro en sesiones anteriores). Metro sigue
corriendo en el puerto 8081 si se quiere levantar el emulador de nuevo
para seguir probando en vivo.

### Cómo retomar (general)
Si "ya aprobó la clave" -- seguir los 6 pasos del punto 7 de arriba.
Si no, seguir probando el APK de prueba / pidiendo features nuevas
normal, sin tocar nada de lo de Play Store hasta que llegue esa
aprobación.

## SESIÓN 17 ago 2026 (cont., tarde) — Railway redeploy confirmado, unifica Hospedajes+Familias, fix bug de layout mobile

Continuación de la sesión de arriba, mismo día, vía Claude Code con Chrome
extension habilitada (permitió operar Railway dashboard directo).

### 1. Railway ya había redeployado — causa raíz: incidente externo
- Al arrancar la sesión, `admin.astro` en producción seguía sin
  "Restaurantes"/"Platos" pese a los pushes `e7cdc631`/`140dc01d` del
  bloque anterior. Con Chrome extension se entró al dashboard de Railway
  y se confirmó: **2 incidentes activos en Railway/GitHub** (status.railway.com,
  17 ago ~13:59-19:52 UTC — "GitHub is experiencing elevated error rates"
  + "Deployments queued longer than usual"). Los deploys de `e7cdc631` y
  `140dc01d` habían **FAILED** (build ni siquiera arrancaba, solo
  reintentos de scheduling en 4 builders distintos, sin error de código
  real) y el último commit (`df2f32e3`, docs) estaba **QUEUED**.
- No hubo que hacer nada: mientras se investigaba, la cola de Railway se
  destrabó sola y los 3 servicios (`capachica-backend`, `capachica-frontend`,
  `capachica-ia`) pasaron a BUILDING → Online con el código correcto.
  Confirmado visualmente en el admin de producción: sidebar ya con
  "Restaurantes"/"Platos".
- **Lección para la próxima vez que "Railway no deployó"**: chequear
  primero `https://status.railway.com` antes de asumir bug propio — si
  hay incidente, esperar y como mucho forzar un "Redeploy" manual desde
  el dashboard del servicio (Deployments → "⋮" en el deploy → Redeploy)
  una vez que el incidente se resuelva.

### 2. Unificados "Hospedajes" y "Familias" — eran dos recursos redundantes
Pedido del usuario: "junta hospedajes y familia tanto en la pagina como
en el app". Investigación previa reveló que existían **dos fuentes de
datos separadas y desincronizadas** para el mismo concepto (familia
anfitriona / hospedaje vivencial):
- `comunidades` (tabla real, ~21 filas reales cargadas por el admin,
  campos ricos: precio/capacidad/habitaciones/comidas/servicios/
  actividades/idiomas/whatsapp/fotos/video) — sección "Familias" en
  admin.astro (`openDestinoModal`).
- `hospedajes` (tabla JSONB genérica, solo **3 filas de demo/mock**
  literalmente inventadas — "Posada de Doña Paula", "Eco-Refugio Ccotos",
  "Hospedaje Samary", las mismas que aparecían hardcodeadas en el
  fallback del chatbot `mobile/src/data/inti.ts`) — sección "Hospedajes"
  separada en admin.astro (RECURSOS_SIMPLES genérico).

Decisión: `comunidades` queda como **única fuente**, se elimina
`hospedajes` por completo (ruta, tabla en init.sql, seed). Cambios
(commits `c533d843`, `0c9c15d2`, `6a778e82`, todos pusheados a `main`):

**Backend**
- `backend/rutas/contenido/contenido.rutas.js`, `app.js`: sacado
  `hospedajesRoutes` / `app.use('/api/hospedajes', ...)`.
- `backend/db/init.sql`: sacado `CREATE TABLE hospedajes`.
- `backend/db/seed_contenido.js`: sacado del array `RECURSOS` (script de
  seed manual, no corre en deploy normal).
- La tabla `hospedajes` en la Postgres de producción **no se borró**
  (solo se dejó de usar) — no había forma segura de hacer DROP TABLE
  desde esta sesión sin acceso a consola Railway; queda huérfana con las
  3 filas demo, inofensiva.

**Admin web (`admin.astro`)**
- Sacada sección completa "Hospedajes" (nav button, `sec-hospedajes`,
  `RECURSOS_SIMPLES.hospedajes`, referencias en `cargarSimple`).
  "Familias" queda como único lugar para cargar hospedaje vivencial.
- De paso: borrados `admin-gestion.astro` + `AdminPanel.tsx` — un panel
  admin **legacy huérfano** (sin ningún link en todo el sitio, no
  aparecía en ninguna navegación) que también pegaba a `/api/hospedajes`
  y hubiera quedado roto sin arreglarlo.

**Web pública** (usuario eligió explícitamente "fusionar en una sola" al
preguntarle sobre las 2 páginas redundantes)
- `FamiliasGrid.tsx` (usada en `/vivencial`): pasó de leer `/hospedajes`
  (3 datos demo, precio hardcodeado `S/120` fijo) a leer `/comunidades`
  (21 familias reales, precio real por familia, chips de servicios,
  capacidad/habitaciones/comidas, idiomas).
- `/destinos` (`DestinosGrid.tsx`, misma data `/comunidades` pero con
  campos viejos sin uso real `tags`/`highlight`/`emoji`/`color`) pasó a
  ser **redirect 301 a `/vivencial`** — `DestinosGrid.tsx` borrado por no
  usarse más.
- Nav/footers actualizados para no tener 2 entradas al mismo contenido:
  `Navbar.tsx` (sacada entrada "Destinos"), `BottomNav.tsx` y
  `Layout.astro` (bottom-nav mobile: el tab primario "Destinos" pasó a
  ser "Vivencial" con icono de pin, se sacó el duplicado del sheet
  "Más"), `Footer.tsx` y `ArenaFooter.astro` (hrefs `/destinos` →
  `/vivencial` en los links de pie de página).
- **Fuera de alcance, detectado pero NO tocado**: `/alojamiento` es una
  **tercera** página con "19 casas vivenciales" **100% hardcodeadas en
  el código** (`alojamiento.astro`, array `casas` con nombres/fotos de
  Cloudinary inventados: Casa Alfonso, Casa Ana María, etc.) — ni admin
  ni backend la tocan, es contenido fijo en el `.astro`. No es
  "Hospedajes" ni "Familias" en sentido estricto así que no se tocó,
  pero es candidata a unificar/limpiar en otra sesión si se quiere que
  todo el sitio hable de las mismas familias reales.

**Mobile** (`my-business.tsx`, `api.ts`, `booking.tsx`)
- Tab "Hospedaje" (CRUD simple viejo) sacado del todo de "Mi Negocio".
- Tab "Destino"/`comunidades` (que tenía solo nombre/tags/highlight,
  desactualizado, NUNCA se había sincronizado con los campos ricos que
  el admin web sí tenía) ahora se llama **"Familias"**, es el
  **primer tab** (antes era el 5to de 7), ícono de casa, y tiene TODOS
  los campos reales: precio, capacidad, habitaciones, comidas (select),
  servicios, actividades, idiomas, whatsapp. Subtítulo nuevo bajo el
  nombre en la lista (`comunidad · S/ precio/noche`) para que no se vea
  "pelada" con una sola línea.
- `api.ts`: `negocios.stays()` (usada por `booking.tsx`, tab Reservas) y
  `TipoNegocio` pasan de `/hospedajes` a `/comunidades`. Canal WebSocket
  de refresco en vivo de `booking.tsx` también actualizado
  (`'hospedajes'` → `'comunidades'`).
- Textos con género corregido: "Nueva familia"/"ninguna familia" en vez
  de "Nuevo familia"/"ningún familia" (via nuevos campos opcionales
  `nuevoLabel`/`vacioLabel`/`singular` en `TipoCfg`).

### 3. Bug real de layout encontrado y arreglado (probado en vivo, no solo leído)
Usuario reportó con capturas que el tab "Familia" en Mi Negocio "se
achataba feo" comparado con otros tabs. Se instaló Metro (`npx expo
start --dev-client`) y se conectó al emulador ya corriendo
(`Capachica_Emulator`) vía deep link
(`adb shell am start -a android.intent.action.VIEW -d
"capachica://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8081"
com.capachica.experienceai`, más confiable que el force-stop+tap manual
de la sesión anterior).
- **Causa real, reproducida en vivo**: el `ScrollView horizontal` de
  chips de tipo de negocio, en su **primer render** (antes de cualquier
  scroll/interacción), quedaba con altura ambigua en Android y estiraba
  cada chip a **~790px** (casi toda la pantalla) en vez de los ~36px
  esperados — confirmado con `uiautomator dump` (bounds reales del nodo)
  y capturas recortadas con PowerShell/System.Drawing. Scrollear una vez
  forzaba un remeasure y el chip volvía al tamaño correcto — por eso el
  bug era inconsistente/confuso en las capturas del usuario.
- **Fix**: alto fijo explícito en el `ScrollView` (`chipsScroll: {height:
  52}`, pasado como `style`, no `contentContainerStyle`) y en cada chip
  (`chip: {height: 36, ...}`), para que no dependa de que Android
  termine de resolver el flex por su cuenta.
- Verificado visualmente en el emulador tras el fix: chips ya no se
  inflan en ningún estado de scroll.

### Verificación hecha
- Build de Astro (`pnpm build`) limpio tras todos los cambios web.
- `npx tsc --noEmit` en mobile: sin errores nuevos en ningún archivo
  tocado (los 2 errores preexistentes en `settings.tsx`/`AuthContext.tsx`
  no son de esta sesión, no se tocaron esos archivos).
- Probado en vivo en el emulador (Metro + deep link): tab "Familias"
  primero, lista real de familias con foto/subtítulo, botón "Nueva
  familia", chips ya no se achatan.
- Admin de producción confirmado post-redeploy con "Restaurantes"/
  "Platos" visibles.
- **NO se generó ningún APK release nuevo** — todo lo de mobile de esta
  sesión se probó solo vía Metro/dev-client en el emulador, no vía APK
  instalado. Si se quiere en el teléfono físico o distribuir, falta
  preguntar versión + correr `gradlew assembleRelease` (regla de
  siempre).

### Pendiente / posible siguiente paso
- [ ] `/alojamiento` sigue con 19 "casas" 100% inventadas en el código,
      sin ninguna conexión a `comunidades` ni a ningún CRUD real — ver
      nota arriba. Candidata a unificar si se quiere consistencia total.
- [ ] Tabla `hospedajes` sigue existiendo en la Postgres de producción
      (huérfana, 3 filas demo, nadie la lee) — se podría hacer `DROP
      TABLE hospedajes;` a mano desde la consola de Railway si se quiere
      dejar la base 100% limpia, no es urgente.
- [ ] No se compiló ningún APK nuevo esta sesión (ver arriba).

### Cómo retomar
1. Confirmar que Railway sigue sin incidentes (`https://status.railway.com`)
   antes de asumir que algo no deployó.
2. Si se sigue en mobile: Metro se puede levantar con `npx expo start
   --dev-client` desde `C:\APLICACIONES MOVILES\capachica\mobile` y
   conectar al emulador ya abierto con el deep link de arriba — más
   rápido y confiable que el force-stop+tap manual.
3. Commits de esta sesión en `main`: `c533d843` (merge Hospedajes+
   Familias backend/web/mobile), `0c9c15d2` (subtítulo+ícono+género en
   tab Familia), `6a778e82` (reorden primero + fix bug de layout chips).

## SESIÓN 17 ago 2026 — fix pantalla negra Historias, gastronomía real (CRUD restaurantes/platos), fix sesión trabada

### Contexto de arranque
- App mobile se corrió desde `C:\APLICACIONES MOVILES\capachica\mobile` (SSD, no la
  ruta `F:\...\PROYECTO NUEVO\mobile` que es solo junction NTFS a la misma carpeta —
  ver `mobile/BUILD_LOCAL_SETUP.md`). Emulador `Capachica_Emulator`, Metro con
  `npx expo start --dev-client`.
- **Truco de reload que funcionó**: Fast Refresh normal a veces no aplicaba los cambios
  (bundle viejo seguía corriendo). Fix confiable: `adb shell am force-stop
  com.capachica.experienceai` + `am start -n .../.MainActivity` → vuelve a la pantalla
  del Dev Launcher → tocar el servidor detectado (`http://10.0.2.2:8081`, verde) →
  fetch de bundle 100% fresco.
- **`adb shell input keyevent 111` (ESCAPE) cierra modales Y navega atrás en la stack**
  — evitarlo al automatizar taps; usar `input tap` sobre el botón real o `keyevent 4`
  (BACK) con cuidado.

### Hecho y pusheado (`main`, commits `e7cdc631` y `140dc01d`)
1. **Pantalla negra al abrir una Historia** (`StoryViewer.tsx`, `app/(tabs)/index.tsx`)
   — causa real: una historia en la base tenía `media_url` vacío (dato viejo, de antes
   de que el backend validara `media_url` no vacío en `POST /historias`). El
   `<Image source={{uri:''}}>` rendereaba negro sin ningún error visible, solo quedaba
   la X de cerrar. Fix: `index.tsx` filtra historias con `media_url` vacío antes de
   listarlas; `StoryViewer.tsx` además maneja `onError` de imagen/video rota (URL
   presente pero que falla al cargar) mostrando un aviso "No se pudo cargar este
   contenido" y avanzando sola en vez de trabarse.
2. **Badge "MÁS POPULAR" hardcodeado** (`communities.tsx`) — antes salía siempre en la
   primera card del listado (`i === 0`), sin relación con popularidad real. Ahora lee
   un campo real `destacado` (booleano) del backend; como ninguna comunidad lo tiene
   seteado todavía, no aparece en ninguna por ahora — hay que agregarlo a mano en la
   base o exponer un toggle en "Mi negocio" cuando se quiera usar.
3. **Chips duplicados en detalle de Familia** (`community-detail.tsx`) — arriba salían
   `tags` (etiquetas genéricas tipo "Turismo vivencial/Mirador/Amanecer", sin relación
   con la casa) y más abajo un bloque separado "ACTIVIDADES" con las actividades
   reales. Ahora los chips de arriba muestran las actividades reales directamente y se
   sacó el bloque "ACTIVIDADES" duplicado de abajo (queda solo "SERVICIOS" si aplica).
4. **Gastronomía era 100% inventada** — la pantalla `gastronomy.tsx` mostraba platos
   hardcodeados en `src/data/mock.ts` (`dishes`), sin ningún vínculo a datos reales,
   pese a que el backend YA tiene un dominio TypeORM real y completo para esto
   (`backend/modelos/gastronomia/{restaurante,plato}.modelo.js` + DTOs Zod + rutas
   `/api/restaurantes`, `/api/platos`) que simplemente no estaba conectado a nada.
   Conectado de punta a punta:
   - `api.ts`: `TipoNegocio` suma `'restaurantes' | 'platos'`. `negocios.listarPropios`
     maneja la forma real paginada de `/restaurantes` (`{total,data,limit,offset}`,
     default `limit=10` del backend — pedimos `?limit=200`) y arma "mis platos"
     iterando los restaurantes propios + `GET /platos/restaurante/:id` (no existe
     `GET /platos` global en el backend). `api.platos()` hace lo mismo pero para
     TODOS los restaurantes aprobados (uso público en `gastronomy.tsx`). Tipo
     `Restaurante` corregido — tenía campos inventados (`imagen`, `galeria`, `rating`)
     que no existen en el backend real; ahora `fotos: string[]`, `tipo_comida`,
     `precio_promedio`.
   - `my-business.tsx`: pestañas nuevas "Restaurante" y "Plato" en el motor genérico
     de CRUD (mismo patrón que Hospedajes/Artesanía/etc., pero con hooks nuevos porque
     estos dos NO son el CRUD genérico JSONB — son TypeORM con su propio DTO): select
     por enum para `tipo_comida`/`categoria`/`temporada` (evita mandar valores fuera
     del enum que el backend rechaza), campos lat/lng (el backend exige
     `ubicacion:{latitud,longitud}` al crear un restaurante), picker de a qué
     restaurante propio pertenece un plato (obligatorio, un plato no existe sin
     restaurante).
   - `gastronomy.tsx`: ya no usa `mock.dishes`; trae platos y restaurantes reales.
     Las pestañas de filtro se arman con las categorías reales presentes en los
     platos (antes eran rótulos fijos — "Platos Fuertes/Sopas/Tradición Viva" — que no
     correspondían a ningún dato real). El config CMS `gastronomy.tabs` (editable
     desde "Textos de la app") quedó sin uso — ya no tiene sentido con categorías
     reales, no se tocó/borró ese key por las dudas.
5. **Bug real en backend** (`plato.servicio.js` + `plato.controlador.js`) — `crear`/
   `actualizar`/`eliminar` usaban `req.usuario.rol` DENTRO del servicio, donde `req`
   no existe (`ReferenceError`, 500 crudo) cada vez que alguien no-dueño (admin
   incluido) tocaba un plato ajeno. El rol ahora se pasa como parámetro desde el
   controlador.
6. **`admin.astro` (panel web) — mismo problema que mobile, ahora resuelto también
   ahí**: agregadas secciones "Restaurantes" y "Platos" al motor genérico
   `RECURSOS_SIMPLES` (mismo patrón que Hospedajes/Artesanía/etc.), con los mismos
   hooks nuevos (`listResponseKey`, `transformItem`/`transformBody` para armar
   `ubicacion`/`fotos`, `cargarPersonalizado` para platos ya que no hay listado
   global, `opcionesDinamicas` para el picker de restaurante).
   - **Bug de paso, corregido**: los botones Editar/Eliminar interpolaban el `id` SIN
     comillas en el `onclick` (`onclick="openSimpleModal('rec', ${it.id})"`) — con los
     IDs numéricos viejos (`Date.now()`) no se notaba, pero con UUID (restaurantes/
     platos) rompía el JS al hacer click (`3fa85f64-... ` se parsea como resta).
     Ahora siempre van entre comillas.
   - Mejorado el error de guardado para mostrar el mensaje real del backend (antes
     solo "HTTP 400" sin detalle).
7. **Sesión mobile quedaba trabada** (`AuthContext.tsx`) — si el access token Y el
   refresh token vencían los dos juntos, el usuario quedaba atrapado con los datos
   cacheados viejos, sin ninguna forma de volver a la pantalla de login. Ahora, al
   arrancar, si `refreshProfile()` falla del todo se limpia la sesión sola
   (`clearSession()`, reusa la misma lógica que `signOut`). De paso sumó
   `expo-splash-screen` como dependencia (`package.json`/`package-lock.json`).

### Verificación hecha
- Mobile: probado en vivo en el emulador (force-stop+relaunch para bundle fresco) —
  Historias sin pantalla negra, badge "MÁS POPULAR" ya no sale en ninguna, chips de
  actividades correctos en detalle de Familia, formulario "Nuevo restaurante" en Mi
  Negocio renderiza todos los campos bien.
- Backend real (producción, Railway): `GET /api/restaurantes` confirmado devuelve
  `{total:0,data:[],...}` — coincide exacto con el unwrap codeado. No se cargó ningún
  dato de prueba en producción para no ensuciarla.
- `admin.astro`: el bloque `<script>` completo (208KB) pasa `node -e "new
  Function(script)"` sin error de sintaxis. NO se pudo probar visualmente en
  navegador — sin tool de browser control disponible en esta sesión de Claude Code.

### PENDIENTE — Railway no había re-deployado al cierre de esta sesión
- Confirmado con `WebFetch` (fetch fresco al servidor, no cache de navegador) que
  `https://capachica-frontend-production.up.railway.app/admin` seguía sirviendo el
  build viejo (sin "Restaurantes"/"Platos" en el sidebar) DESPUÉS de pushear
  `e7cdc631`.
- No hay Railway CLI instalado en esta máquina, ni sesión/token para el dashboard
  desde esta sesión de Claude Code → no se pudo disparar ni diagnosticar el deploy
  directamente.
- Se intentó habilitar la extensión "Claude in Chrome" (Brave) para darle a Claude
  Code acceso al navegador logueado del usuario y revisar el dashboard de Railway
  directamente — **quedó sin resolver**: `/chrome` mostraba "Status: disabled" pese a
  "Installed", y no aparecía ninguna opción "Enable" en el menú interactivo. Sugerido
  al usuario reiniciar la sesión de Claude Code con `claude --chrome` (o confirmar
  auth por `/login`, no API key/Bedrock/Vertex, que bloquea la integración por
  diseño). **Sin confirmar si eso lo resuelve.**
- Próximo paso pendiente: usuario debe entrar al dashboard de Railway → servicio del
  frontend → pestaña "Deployments" y confirmar si hay un deploy con el commit
  `e7cdc631`/`140dc01d` corriendo, fallado, o si no hay nada nuevo ahí (→ revisar
  "Auto Deploy" en Settings → Source, y que el "Root Directory" apunte a
  `PROYECTO NUEVO/frontend mejorado`).
- Backend (`https://capachica-backend-production.up.railway.app`) no se volvió a
  chequear después del segundo push — confirmar que el fix de `plato.servicio.js`
  también haya llegado.

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
