import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const actividadesRoutes = {
  "/api/actividades": {
    GET: async () => {
      const rows = await sql`SELECT * FROM actividades WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO actividades (nombre, descripcion, imagen_url, tipo, duracion, dificultad, precio, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.tipo}, ${b.duracion}, ${b.dificultad}, ${b.precio}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/actividades/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM actividades WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE actividades SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          tipo=${b.tipo}, duracion=${b.duracion}, dificultad=${b.dificultad}, precio=${b.precio},
          activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE actividades SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/actividades/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM actividades ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
