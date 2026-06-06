import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const gastronomiaRoutes = {
  "/api/gastronomia": {
    GET: async () => {
      const rows = await sql`SELECT * FROM gastronomia WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO gastronomia (nombre, descripcion, imagen_url, ingredientes, tipo, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.ingredientes}, ${b.tipo}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/gastronomia/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM gastronomia WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE gastronomia SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          ingredientes=${b.ingredientes}, tipo=${b.tipo}, activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE gastronomia SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/gastronomia/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM gastronomia ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
