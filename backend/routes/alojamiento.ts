import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const alojamientoRoutes = {
  "/api/alojamientos": {
    GET: async () => {
      const rows = await sql`SELECT * FROM alojamientos WHERE activo = true ORDER BY orden, created_at DESC`
      return Response.json(rows)
    },
    POST: requireAuth(async (req) => {
      const b = await req.json()
      const [row] = await sql`
        INSERT INTO alojamientos (nombre, descripcion, imagen_url, tipo, precio_noche, capacidad, comunidad, contacto, orden)
        VALUES (${b.nombre}, ${b.descripcion}, ${b.imagen_url}, ${b.tipo}, ${b.precio_noche}, ${b.capacidad}, ${b.comunidad}, ${b.contacto}, ${b.orden ?? 0})
        RETURNING *
      `
      return Response.json(row, { status: 201 })
    }),
  },
  "/api/alojamientos/:id": {
    GET: async (req: Request) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const [row] = await sql`SELECT * FROM alojamientos WHERE id = ${id}`
      if (!row) return Response.json({ error: "No encontrado" }, { status: 404 })
      return Response.json(row)
    },
    PUT: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      const b = await req.json()
      const [row] = await sql`
        UPDATE alojamientos SET nombre=${b.nombre}, descripcion=${b.descripcion}, imagen_url=${b.imagen_url},
          tipo=${b.tipo}, precio_noche=${b.precio_noche}, capacidad=${b.capacidad},
          comunidad=${b.comunidad}, contacto=${b.contacto}, activo=${b.activo}, orden=${b.orden}
        WHERE id = ${id} RETURNING *
      `
      return Response.json(row)
    }),
    DELETE: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/").pop()
      await sql`UPDATE alojamientos SET activo = false WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
  "/api/alojamientos/admin/all": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM alojamientos ORDER BY orden, created_at DESC`
      return Response.json(rows)
    }),
  },
}
