import { createContext, useContext, useState } from "react"
import { instance } from "../client/instance"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  function login(data) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  async function toggleSaved(artId) {
    const res = await instance.post(`/arts/${artId}/save`)
    const updated = { ...user, savedArts: res.data.savedArts }
    localStorage.setItem("user", JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleSaved }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
