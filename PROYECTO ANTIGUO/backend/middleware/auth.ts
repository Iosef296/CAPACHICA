import { SignJWT, jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev_secret_change_in_prod"
)

export interface JWTPayload {
  sub: string
  email: string
  role: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRY ?? "7d")
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function getToken(req: Request): string | null {
  const auth = req.headers.get("Authorization")
  if (auth?.startsWith("Bearer ")) return auth.slice(7)
  return null
}

// Middleware: wraps handler, injects verified user or returns 401
export function requireAuth(
  handler: (req: Request, user: JWTPayload) => Response | Promise<Response>
) {
  return async (req: Request): Promise<Response> => {
    const token = getToken(req)
    if (!token) return new Response("Unauthorized", { status: 401 })
    const user = await verifyToken(token)
    if (!user) return new Response("Invalid token", { status: 401 })
    return handler(req, user)
  }
}
