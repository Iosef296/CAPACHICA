import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const artesaniaRoutes = {
  "/api/artesania": {
    GET: async () => {
      const rows = await sql`SELECT * FROM artesania WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO artesania (nombre, descripcion, imagen_url, tipo, artesano, comunidad, precio, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.tipo}, ${b.artesano}, ${b.comunidad}, ${b.precio}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/artesania/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM artesania WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE artesania SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          tipo=${b.tipo}, artesano=${b.artesano}, comunidad=${b.comunidad}, precio=${b.precio},
          activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE artesania SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/artesania/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM artesania ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
