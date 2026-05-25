import { sql } from "../db/client"
import { requireAuth } from "../middleware/auth"

export const contactoRoutes = {
  "/api/contacto": {
    POST: async (req: Request) => {
      const b = await req.json()
      if (!b.nombre || !b.email || !b.mensaje)
        return Response.json({ error: "Nombre, email y mensaje requeridos" }, { status: 400 })
      const [row] = await sql`
        INSERT INTO contacto_mensajes (nombre, email, telefono, asunto, mensaje)
        VALUES (${b.nombre}, ${b.email}, ${b.telefono}, ${b.asunto}, ${b.mensaje})
        RETURNING *
      `
      return Response.json({ ok: true, id: row.id }, { status: 201 })
    },
  },
  "/api/contacto/mensajes": {
    GET: requireAuth(async () => {
      const rows = await sql`SELECT * FROM contacto_mensajes ORDER BY created_at DESC`
      return Response.json(rows)
    }),
  },
  "/api/contacto/mensajes/:id/leer": {
    PATCH: requireAuth(async (req) => {
      const id = new URL(req.url).pathname.split("/")[4]
      await sql`UPDATE contacto_mensajes SET leido = true WHERE id = ${id}`
      return Response.json({ ok: true })
    }),
  },
}
