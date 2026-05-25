// Bun built-in PostgreSQL client
const url = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/capachica"

export const sql = new Bun.SQL(url)

// Health check
export async function checkDb() {
  try {
    await sql`SELECT 1`
    return true
  } catch (e) {
    console.error("DB connection failed:", e)
    return false
  }
}
