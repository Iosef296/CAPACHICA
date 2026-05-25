import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const festividadesRoutes = {
  "/api/festividades": {
    GET: async () => {
      const rows = await sql`SELECT * FROM festividades WHERE activo = true ORDER BY mes, orden`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO festividades (nombre, descripcion, imagen_url, fecha_texto, mes, comunidad, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.fecha_texto}, ${b.mes}, ${b.comunidad}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/festividades/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM festividades WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE festividades SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          fecha_texto=${b.fecha_texto}, mes=${b.mes}, comunidad=${b.comunidad}, activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE festividades SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/festividades/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM festividades ORDER BY mes, orden`
      return Response.json(rows)
    }),
  },
}
