import { sql } from "../db/client"
import { signToken } from "../middleware/auth"

export const authRoutes = {
  "/api/auth/login": {
    POST: async (req: Request) => {
      const { email, password } = await req.json()
      if (!email || !password)
        return Response.json({ error: "Email y contraseña requeridos" }, { status: 400 })

      const [user] = await sql`
        SELECT id, email, password_hash, nombre, role
        FROM usuarios WHERE email = ${email} AND activo = true
      `
      if (!user)
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })

      const valid = await Bun.password.verify(password, user.password_hash)
      if (!valid)
        return Response.json({ error: "Credenciales inválidas" }, { status: 401 })

      const token = await signToken({
        sub: String(user.id),
        email: user.email,
        role: user.role,
      })

      return Response.json({ token, user: { id: user.id, email: user.email, nombre: user.nombre, role: user.role } })
    },
  },

  "/api/auth/me": {
    GET: async (req: Request) => {
      const auth = req.headers.get("Authorization")
      if (!auth?.startsWith("Bearer "))
        return Response.json({ error: "No token" }, { status: 401 })
      // verifyToken used in middleware; here just return from token
      return Response.json({ ok: true })
    },
  },
}
