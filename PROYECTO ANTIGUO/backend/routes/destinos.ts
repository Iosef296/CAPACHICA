import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const destinosRoutes = {
  "/api/destinos": {
    GET: async () => {
      const rows = await sql`SELECT * FROM destinos WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const body = await req.json()
      const { nombre, descripcion, imagen_url, categoria, comunidad, destacado, orden } = body
      const [row] = await sql`
        INSERT INTO destinos (nombre, descripcion, imagen_url, categoria, comunidad, destacado, orden)
        VALUES (${nombre}, ${descripcion}, ${imagen_url}, ${categoria}, ${comunidad}, ${destacado ?? false}, ${orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/destinos/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM destinos WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const body = await req.json()
      const { nombre, descripcion, imagen_url, categoria, comunidad, destacado, activo, orden } = body
      const [row] = await sql`
        UPDATE destinos SET
          nombre = ${nombre}, descripcion = ${descripcion}, imagen_url = ${imagen_url},
          categoria = ${categoria}, comunidad = ${comunidad}, destacado = ${destacado},
          activo = ${activo}, orden = ${orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE destinos SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/destinos/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM destinos ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
