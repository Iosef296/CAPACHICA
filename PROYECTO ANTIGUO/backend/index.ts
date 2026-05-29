import { checkDb } from "./db/client"
import { authRoutes } from "./routes/auth"
import { destinosRoutes } from "./routes/destinos"
import { alojamientoRoutes } from "./routes/alojamiento"
import { gastronomiaRoutes } from "./routes/gastronomia"
import { actividadesRoutes } from "./routes/actividades"
import { artesaniaRoutes } from "./routes/artesania"
import { festividadesRoutes } from "./routes/festividades"
import { vivencialRoutes } from "./routes/vivencial"
import { contactoRoutes } from "./routes/contacto"

const PORT = Number(process.env.PORT ?? 3001)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000"

// Merge all routes
const routes = {
  ...authRoutes,
  ...destinosRoutes,
  ...alojamientoRoutes,
  ...gastronomiaRoutes,
  ...actividadesRoutes,
  ...artesaniaRoutes,
  ...festividadesRoutes,
  ...vivencialRoutes,
  ...contactoRoutes,
}

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

function withCors(res: Response): Response {
  const headers = new Headers(res.headers)
  for (const [k, v] of Object.entries(corsHeaders)) headers.set(k, v)
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers })
}

// Wrap route handlers with CORS
const wrappedRoutes: Record<string, Record<string, (req: Request) => Promise<Response>>> = {}
for (const [path, methods] of Object.entries(routes)) {
  wrappedRoutes[path] = {}
  for (const [method, handler] of Object.entries(methods as Record<string, Function>)) {
    wrappedRoutes[path][method] = async (req: Request) => {
      const res = await (handler as Function)(req)
      return withCors(res)
    }
  }
  // Add OPTIONS preflight
  wrappedRoutes[path]["OPTIONS"] = async () =>
    new Response(null, { status: 204, headers: corsHeaders })
}

// Verify DB connection on startup
const dbOk = await checkDb()
if (!dbOk) {
  console.error("❌ DB connection failed. Check DATABASE_URL in .env")
  process.exit(1)
}

Bun.serve({
  port: PORT,
  routes: wrappedRoutes,
  fetch(req) {
    return new Response("Not Found", { status: 404, headers: corsHeaders })
  },
})

console.log(`✅ Capachica API running on http://localhost:${PORT}`)
