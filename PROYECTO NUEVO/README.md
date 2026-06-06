# Capachica - Turismo Vivencial

Aplicación web de turismo vivencial en Capachica (Lago Titicaca). Incluye:

- **Frontend**: Astro 6 + React 19
- **Backend / API**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL

Todo está dockerizado: con **un solo comando** se levanta el frontend, el backend (API) y la base de datos juntos, sin instalar Node ni PostgreSQL a mano.

---

## Requisitos (lo único que hay que instalar)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y **abierto** (esperar a que diga "Engine running").
- [Git](https://git-scm.com/downloads) para clonar el repo.

> En Windows, Docker Desktop pedirá habilitar **WSL2**. Acepta si lo solicita.

---

## Cómo ejecutarlo (paso a paso)

1. Clonar el repositorio y entrar a la carpeta del proyecto:

   ```bash
   git clone https://github.com/Iosef296/CAPACHICA.git
   cd "CAPACHICA/PROYECTO NUEVO"
   ```

   > Si ya tienes el repo, cambia a la rama correcta: `git checkout oscar/frontend-vivencial`

2. Asegúrate de que **Docker Desktop esté abierto**.

3. Levantar todo con un solo comando:

   ```bash
   docker compose up --build
   ```

   La primera vez tarda unos minutos (descarga imágenes y compila). Cuando termine verás los logs de los 3 servicios.

4. Abrir en el navegador:

   | Servicio | URL |
   |---|---|
   | Frontend (la web) | http://localhost:4321 |
   | API / Backend | http://localhost:4000 |
   | Health check del backend | http://localhost:4000/health |
   | Base de datos PostgreSQL | localhost:5432 |

   La base de datos se crea sola y se llena con datos de ejemplo (`backend/src/db/schema.sql`) en el primer arranque.

### Para detener

`Ctrl + C` en la terminal y luego:

```bash
docker compose down
```

Para borrar también la base de datos y empezar de cero:

```bash
docker compose down -v
```

---

## Acceso al panel de administración

- URL: http://localhost:4321/admin
- Usuario: `admin@capachica.pe`
- Contraseña: `admin123`

---

## Variables de entorno

No es obligatorio crear ningún archivo: el `docker-compose.yml` ya trae valores por defecto. Si quieres personalizarlos (contraseña de la BD, secreto JWT, etc.), copia el archivo de ejemplo:

```bash
cp .env.example .env
```

y edita los valores. Docker Compose lo lee automáticamente.

---

## Problemas frecuentes

- **"Cannot connect to the Docker daemon" / `dockerDesktopLinuxEngine`**: Docker Desktop no está abierto. Ábrelo y espera a "Engine running".
- **Puerto ya en uso (4321, 4000 o 5432)**: tienes otro programa usando ese puerto (por ejemplo, un PostgreSQL instalado localmente). Ciérralo, o cambia el mapeo de puertos en `docker-compose.yml` (lado izquierdo de `"4000:4000"`).
- **Hay que ejecutar `docker compose` en la carpeta correcta**: debe ser dentro de `PROYECTO NUEVO`, donde está el archivo `docker-compose.yml` (no dentro de `backend` ni `frontend`).

---

## Estructura

```
PROYECTO NUEVO/
├─ docker-compose.yml      # Orquesta db + backend + frontend
├─ .env.example            # Plantilla de variables de entorno
├─ backend/                # API Express + TypeScript
│  ├─ Dockerfile
│  └─ src/
│     ├─ index.ts          # Servidor y rutas /api/*
│     └─ db/schema.sql     # Esquema + datos de ejemplo
└─ frontend/               # Web Astro + React
   ├─ Dockerfile
   └─ src/
```
