# Project knowledge

This file gives Codebuff context about your project: goals, commands, conventions, and gotchas.

## Project Overview

**Capachica Festividades** — A cultural website showcasing traditional festivals of Capachica, Puno, Peru. Features a gallery of festivities with details, a calendar view, and an admin panel for CRUD operations.

## Quickstart

- **Backend setup:** `cd backend && npm install`
- **Backend dev:** `cd backend && npm run dev` (starts on port 3001, uses `node --watch` for hot reload)
- **Frontend setup:** `cd frontend && npm install`
- **Frontend dev:** `cd frontend && npm run dev` (starts on port 5173 via Vite)
- **Frontend build:** `cd frontend && npm run build`
- **Frontend preview:** `cd frontend && npm run preview`

## Architecture

### Backend (`backend/`)
- **server.js** — Express server with full CRUD REST API at `/api/festividades`
- **data/festividades.json** — Single JSON file as the data store (not a real database)
- **Health check:** `GET /api/health` returns `{ status: "OK" }`
- Backend runs on port **3001**
- Dependencies: express, cors

### Frontend (`frontend/`)
- **React 18** with **Vite** bundler, **Tailwind CSS** v3 for styling
- **React Router v6** for routing (5 routes):
  - `/` → Home
  - `/festividades` → Festividades (list)
  - `/festividades/:id` → FestividadDetail
  - `/calendario` → Calendario
  - `/admin` → Admin
- **lucide-react** for icons
- **ThemeContext** provides `darkMode` state + `toggleTheme` (defaults to dark mode)
- API calls in `src/api.js` fetch from `http://localhost:3001/api` directly
- Vite proxies `/api` requests to `localhost:3001` in dev mode

### Data Model (`festividades.json`)
Each festividad has: `id`, `nombre`, `fecha`, `mes`, `tipo`, `ubicacion`, `descripcion`, `actividades[]`, `imagen`, `galeria[]`, `destacado`

## Conventions

- **Dark mode by default** — Uses Tailwind `class` strategy with `.dark` class on `<html>`
- **Custom Tailwind colors** — `lake-*` (blues), `gold-*` (yellows), `night-*` (deep dark blues)
- **Fonts** — `Playfair Display` (display/headings), `DM Sans` (body)
- **Custom CSS classes in index.css:** `.text-gradient-gold`, `.text-gradient-lake`, `.card-festividad`, `.badge`, `.gallery-img`, `.cal-day`
- **Animations:** `twinkle`, `float`, `sun-rise`, `fade-in`, `slide-up`, `glow-pulse` defined in tailwind.config.js
- **Components located:** `frontend/src/components/` (Navbar, Footer, FestividadCard, StarrySky)
- **Pages located:** `frontend/src/pages/` (Home, Festividades, FestividadDetail, Calendario, Admin)

## Gotchas

- No database — data is read/written to a JSON file (`festividades.json`). Edits via the admin panel persist to disk.
- IDs are auto-assigned (maxId + 1) on creation — no UUIDs.
- Image URLs use picsum.photos placeholders (seeded per festividad name).
- No authentication on the `/admin` route — anyone can CRUD festividades.
- To run the full app, **both** backend and frontend servers must be running simultaneously.
- No test framework is configured.
