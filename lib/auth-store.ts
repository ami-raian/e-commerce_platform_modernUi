import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  verifyToken,
  type User,
  type LoginCredentials,
  type RegisterData,
} from "./api";

export type UserRole = "admin" | "user";

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Auth operations
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Initialize auth from stored token
  initializeAuth: () => Promise<void>;

  // Update user data
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const credentials: LoginCredentials = { email, password };
          const { user, token } = await apiLogin(credentials);

          set({ user, loading: false, error: null });
          return { success: true };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          set({ error: errorMessage, loading: false, user: null });
          return { success: false, error: errorMessage };
        }
      },

      register: async (email, password, name) => {
        set({ loading: true, error: null });
        try {
          const data: RegisterData = { email, password, name };
          const { user, token } = await apiRegister(data);

          set({ user, loading: false, error: null });
          return { success: true };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({ error: errorMessage, loading: false, user: null });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await apiLogout();
          set({ user: null, loading: false, error: null });
        } catch (error: any) {
          // Even if logout fails, clear user state
          set({ user: null, loading: false, error: null });
        }
      },

      initializeAuth: async () => {
        set({ loading: true });
        try {
          const user = await verifyToken();
          set({ user, loading: false, error: null });
        } catch (error) {
          set({ user: null, loading: false, error: null });
        }
      },

      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "auth-store",
      // Only persist user data, not loading/error states
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Re-export User type for convenience
export type { User };
