import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const vivencialRoutes = {
  "/api/vivencial": {
    GET: async () => {
      const rows = await sql`SELECT * FROM vivencial WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO vivencial (nombre, descripcion, imagen_url, familia, comunidad, actividades_incluidas, precio_por_noche, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.familia}, ${b.comunidad}, ${b.actividades_incluidas}, ${b.precio_por_noche}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/vivencial/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM vivencial WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE vivencial SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          familia=${b.familia}, comunidad=${b.comunidad}, actividades_incluidas=${b.actividades_incluidas},
          precio_por_noche=${b.precio_por_noche}, activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE vivencial SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/vivencial/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM vivencial ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
