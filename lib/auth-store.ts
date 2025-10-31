import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "admin" | "user"

export interface User {
  id: string
  email: string
  password?: string
  name: string
  role: UserRole
  createdAt: string
}

interface AuthStore {
  user: User | null
  users: User[]
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (email: string, password: string, name: string, role?: UserRole) => { success: boolean; error?: string }
  logout: () => void
  addUser: (user: Omit<User, "id" | "createdAt">) => User
  updateUser: (id: string, updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [
        {
          id: "1",
          email: "admin@example.com",
          password: "admin123",
          name: "Admin User",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          email: "user@example.com",
          password: "user123",
          name: "Test User",
          role: "user",
          createdAt: new Date().toISOString(),
        },
      ],
      login: (email, password) => {
        const users = get().users
        const foundUser = users.find((u) => u.email === email && u.password === password)

        if (!foundUser) {
          return { success: false, error: "Invalid email or password" }
        }

        const { password: _, ...userWithoutPassword } = foundUser
        set({ user: userWithoutPassword })
        return { success: true }
      },
      register: (email, password, name, role = "user") => {
        const users = get().users
        if (users.some((u) => u.email === email)) {
          return { success: false, error: "Email already exists" }
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          password,
          name,
          role,
          createdAt: new Date().toISOString(),
        }

        set({ users: [...users, newUser], user: { ...newUser, password: undefined } })
        return { success: true }
      },
      logout: () => {
        set({ user: null })
      },
      addUser: (user) => {
        const newUser: User = {
          ...user,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ users: [...state.users, newUser] }))
        return newUser
      },
      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
          user: state.user?.id === id ? { ...state.user, ...updates } : state.user,
        }))
      },
    }),
    {
      name: "auth-store",
    },
  ),
)
