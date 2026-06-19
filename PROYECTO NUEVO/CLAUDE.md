# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Capachica Turismo — three independent services for a Peruvian community tourism platform:

| Service | Path | Port | Runtime |
|---|---|---|---|
| Main API (backend) | `backend/` | 3000 | Node.js CJS + Express 5 |
| IA chatbot server | `IA/backend/` | 5000 | Node.js ESM + Express 4 |
| Frontend | `frontend mejorado/` | 4322 | Astro 6 + React 19 + Tailwind |

## Commands

### Backend (main API)
```bash
cd backend
npm install
npm run dev          # nodemon app.js
npm run dev:all      # backend + IA server concurrently
node app.js          # production
```

### IA Backend
```bash
cd "IA/backend"
npm install
npm run dev          # nodemon server.js
node server.js       # production
```

### Frontend
```bash
cd "frontend mejorado"
pnpm install
pnpm dev             # astro dev (port 4322)
pnpm build           # SSR build
pnpm preview
```

## Environment Variables

**`backend/.env`**
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<password>
DB_NAME=turismo_capachica
DB_PASS=capachica_pass_2026   # used by pg Pool (actividades)
JWT_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
NODE_ENV=development
CORS_ORIGIN=*
```

**`IA/backend/.env`**
```
PORT=5000
OPENROUTER_API_KEY=<key>
ADMIN_PHONE=<whatsapp_number>
```

**`frontend mejorado/.env`** (optional)
```
PUBLIC_API_URL=http://localhost:3000/api
```

## Database Setup

PostgreSQL with PostGIS required. Two separate connection mechanisms in `backend/`:

- **TypeORM** (`config/base-de-datos.js`) — manages gastronomía entities (restaurantes, platos, talleres, recetas, usuarios). `synchronize: true` in dev (auto-migrates schema).
- **pg Pool** (`config/postgres.js`) — raw SQL for actividades/reservas/festividades routes. Uses a different DB default (`capachica` / `capachica_user`). This connection is **required** — server won't start without it.

```sql
CREATE DATABASE turismo_capachica;
\c turismo_capachica
CREATE EXTENSION IF NOT EXISTS postgis;
```

## Architecture

### Backend (`backend/`)

Request flow: `app.js` → `rutas/` → `middleware/` → `controladores/` → `servicios/` → `modelos/` or `db/`

- **Auth**: JWT access + refresh tokens. Middleware in `middleware/autenticacion.middleware.js` and `middleware/autorizacion.middleware.js`. Roles: `admin`, `proveedor`, `turista`.
- **Gastronomía domain**: TypeORM entities in `modelos/gastronomia/`. DTOs with Zod validation in `dtos/`. Route pattern: public reads, role-guarded writes (owner or admin).
- **Actividades/Reservas/Festividades domain**: Raw SQL via pg Pool (`config/postgres.js`), separate from TypeORM.
- **File uploads**: Multer (`config/multer.js`), stored in `uploads/`, served as static with CORP headers.
- **Geolocation**: PostGIS `ST_DWithin` for proximity queries on restaurantes.
- **i18n**: `utilidades/ayudante-i18n.js` — es/en/fr error messages.
- Swagger UI at `/api-docs` (loaded from `swagger.yaml`).

### IA Backend (`IA/backend/`)

Standalone ESM Express server. All state persisted in JSON files (no database):
- `knowledge.json` — Q&A pairs + system prompt + widget config
- `reservaciones.json` — bookings array
- `destinos.json`, `paginas.json`, `contenido.json`, `siteconfig.json` — CMS data

Key flows:
- **Chat** (`POST /api/chat` and `/api/chat/stream`): detects language (ES/EN/FR) via weighted keyword scoring → detects intent (reserva/mapa/general) → tries direct keyword match against knowledge base → calls OpenRouter (model: `openai/gpt-oss-120b:free`) with system prompt built from knowledge base.
- **Booking extraction**: When reserva intent detected, uses LLM to extract structured data across conversation history (6 fields required). On complete → saves to `reservaciones.json` + WhatsApp notifications via Baileys.
- **WhatsApp**: `utils/whatsapp.js` uses `@whiskeysockets/baileys`. Session persisted in `wa_auth/`. Admin notified + customer confirmed on booking.
- **Admin API** (`/api/admin/*`): No auth on IA server — all admin routes are open. Manages knowledge, reservaciones, destinos, paginas, contenido, siteconfig, widget config, WhatsApp.

### Frontend (`frontend mejorado/`)

Astro SSR (Node adapter). Mix of `.astro` pages and React `.tsx` islands.

- Pages fetch from two backends: main API at `PUBLIC_API_URL` (default `:3000/api`) and IA server at hardcoded `http://localhost:5000`.
- `src/services/api.js` — central fetch wrapper, reads `accessToken` from localStorage for auth.
- React components handle interactivity: `ChatWidget.tsx` (IA chat), `AdminPanel.tsx`, `ReservaForm.tsx`, `IAConfig.tsx`.
- Astro pages handle SSR data fetching and layout; React islands hydrate client-side.
- `src/pages/gastronomia/` and `src/pages/festividades/` are subdirectories with their own pages.
- Auth pages under `src/pages/auth/`.

## API Base URLs

- Main API: `http://localhost:3000/api`
- IA server: `http://localhost:5000/api`
- Swagger docs: `http://localhost:3000/api-docs`
- Uploads (images): `http://localhost:3000/uploads/<filename>`
