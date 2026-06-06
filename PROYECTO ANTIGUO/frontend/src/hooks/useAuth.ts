import { useState, useEffect } from "react"
import { api } from "../api/client"
import { User } from "../types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("cap_token")
    if (!token) { setLoading(false); return }

    api.get<{ user: User }>("/api/auth/me")
      .then(r => setUser(r.user))
      .catch(() => localStorage.removeItem("cap_token"))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const res = await api.post<{ token: string; user: User }>("/api/auth/login", { email, password })
    localStorage.setItem("cap_token", res.token)
    setUser(res.user)
    return res
  }

  function logout() {
    localStorage.removeItem("cap_token")
    setUser(null)
  }

  return { user, loading, login, logout }
}
