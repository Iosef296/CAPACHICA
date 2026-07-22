# Setup de build local Android (mobile/) — contexto de sesión

Fecha: 13 julio 2026. Este archivo documenta todo lo que se armó para poder compilar
y probar la app Android **localmente** (sin depender de la cola gratis de EAS Build
en la nube), sin instalar Android Studio, y sin matar el HDD.

## Por qué existe esto
- `eas build --local` NO funciona en Windows nativo ("Unsupported platform, macOS or
  Linux is required to build apps for Android"). Por eso se armó Gradle directo.
- El HDD (E:/F:) se moría con `node_modules` + build de Gradle + emulador ahí.
  Se movió todo lo pesado al SSD NVMe (C:).

## Ubicaciones clave

| Qué | Dónde | Notas |
|---|---|---|
| Proyecto mobile (código real) | `C:\APLICACIONES MOVILES\capachica\mobile` | Físicamente en el SSD |
| Acceso al proyecto | `F:\SISTEMAS\CAPACHICA\PROYECTO NUEVO\mobile` | Es un **junction** (NTFS) hacia la ruta de arriba. Mismo archivo, dos rutas. Editar en cualquiera de las dos es editar el mismo dato. |
| Android SDK | `C:\Android` | cmdline-tools, platform-tools, build-tools 36.0.0, NDK 27.1.12297006, cmake, platform android-36 |
| Gradle cache (`GRADLE_USER_HOME`) | `C:\APLICACIONES MOVILES\capachica\gradle-home` | |
| AVD (emulador) | `C:\APLICACIONES MOVILES\capachica\avd` | AVD llamado `Capachica_Emulator` |
| JDK | `C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot` | Temurin 21, ya venía instalado |

## Variables de entorno persistentes (ya seteadas con `setx`, sobreviven reinicio)
```
ANDROID_HOME=C:\Android
ANDROID_SDK_ROOT=C:\Android
GRADLE_USER_HOME=C:\APLICACIONES MOVILES\capachica\gradle-home
ANDROID_AVD_HOME=C:\APLICACIONES MOVILES\capachica\avd
```
`JAVA_HOME` hay que setearlo por sesión de PowerShell (no se hizo persistente):
```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
```

## ⚠️ Cosas que se regeneran y hay que volver a arreglar

`android/` se regenera con `npx expo prebuild` (borra y recrea todo adentro). Cada vez
que se corre prebuild hay que volver a tocar 2 archivos:

**1. `android/local.properties`** (prebuild no lo toca, pero si no existe o está mal
escapado rompe el build con el error engañoso *"El nombre de archivo, el nombre de
directorio o la sintaxis de la etiqueta del volumen no son correctos"* — viene de
`SdkLocator` de Android Gradle Plugin no pudiendo leer `sdk.dir`):
```
sdk.dir=C:/Android
```
(usar barras normales `/`, NO backslash escapado — eso fue el bug real que costó horas)

**2. `android/gradle.properties`** línea `reactNativeArchitectures`:
- Para compilar y probar en el **emulador** (x86_64): `reactNativeArchitectures=x86_64`
- Para compilar un APK para **celular real** (arm64): `reactNativeArchitectures=arm64-v8a`
- Original de fábrica (las 4, mucho más lento/pesado): `armeabi-v7a,arm64-v8a,x86,x86_64`

Limitar a 1 sola arquitectura bajó el build de "toda la RAM + HDD muriendo" a
1m36s con uso normal de recursos.

## Comandos para levantar todo de nuevo (después de reiniciar la PC)

### 1. Arrancar el emulador
```powershell
$env:ANDROID_HOME = "C:\Android"
$env:ANDROID_AVD_HOME = "C:\APLICACIONES MOVILES\capachica\avd"
Start-Process -FilePath "C:\Android\emulator\emulator.exe" -ArgumentList "-avd","Capachica_Emulator","-no-snapshot"
```

### 2. Compilar (si hubo cambios nativos, si no, saltar a paso 3)
```powershell
$env:ANDROID_HOME = "C:\Android"
$env:ANDROID_SDK_ROOT = "C:\Android"
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:GRADLE_USER_HOME = "C:\APLICACIONES MOVILES\capachica\gradle-home"
Set-Location 'C:\APLICACIONES MOVILES\capachica\mobile\android'
# verificar/recrear local.properties si expo prebuild corrió de nuevo:
#   echo "sdk.dir=C:/Android" > local.properties
.\gradlew.bat assembleDebug --console=plain
```
APK queda en: `C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\debug\app-debug.apk`

### 3. Instalar y abrir en el emulador
```powershell
C:\Android\platform-tools\adb.exe install -r "C:\APLICACIONES MOVILES\capachica\mobile\android\app\build\outputs\apk\debug\app-debug.apk"
C:\Android\platform-tools\adb.exe reverse tcp:8081 tcp:8081
C:\Android\platform-tools\adb.exe shell am start -n com.capachica.experienceai/.MainActivity
```

### 4. Levantar Metro (hot reload — para no tener que recompilar por cada cambio de JS)
```powershell
Set-Location 'C:\APLICACIONES MOVILES\capachica\mobile'
npx expo start --dev-client
```
La app abre en pantalla de **Dev Launcher** de Expo primero; con Metro corriendo y el
`adb reverse` hecho, debería conectar solo. Cambios de JS/TS se ven sin recompilar nada.

## Pendiente: pagefile de Windows
El pagefile (`E:\pagefile.sys`, HDD) sigue causando algo de I/O en el HDD bajo mucha
carga de RAM. Pasos manuales (requieren admin + reinicio, no se pudo hacer por script):
1. `Win+R` → `sysdm.cpl` → Opciones avanzadas → Rendimiento → Configuración
2. Opciones avanzadas → Memoria virtual → Cambiar
3. Destildar "Administrar automáticamente"
4. `E:` → Sin archivo de paginación → Establecer
5. `C:` → Tamaño personalizado: Inicial 8192, Máximo 16384 → Establecer
6. Aceptar todo, reiniciar

## Otras cosas de este mismo hilo de trabajo (no directamente build, pero relacionado)
- Login con Google ya implementado en `mobile/src/auth/AuthContext.tsx` (Google.useIdTokenAuthRequest,
  expo-auth-session, hydrateGoogle → llama `api.google(idToken)` del backend).
- `expo-updates` instalado + configurado: `app.json` tiene `runtimeVersion.policy: "appVersion"` y
  `updates.url` apuntando al proyecto EAS. Canal `production` creado en EAS (branch + channel).
- `eas.json` perfil `production`: `android.buildType` cambiado de `app-bundle` a `apk` (para poder
  instalar directo, no solo subir a Play Store).
- Build en la nube de EAS (`83e96994-...`) fue **cancelado por el usuario** (cola gratis muy lenta),
  reemplazado por este flujo local.
- Extensiones de VS Code instaladas: `msjsdiag.vscode-react-native`, `vscjava.vscode-gradle`,
  `adelphes.android-dev-ext`, `redhat.vscode-xml` — para tener funcionalidad tipo Android Studio
  (debug, logcat, tareas de Gradle) sin instalar la IDE completa.
- Documento Word generado: `PROYECTO NUEVO/Limites_Planes_Capachica.docx` (límites de EAS/Railway/
  Supabase/Cloudinary con ~1000 usuarios/mes).
- Estrategia de escalado a 10,000 usuarios sin pagar Expo: usar Play Store como canal principal de
  updates (gratis, ilimitado), reservar EAS Update (OTA) solo mientras estén bajo 1,000 MAU gratis.
