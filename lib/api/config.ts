import axios from "axios";
import Cookies from "js-cookie";

// API Base URL - change this to your backend URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Cookie name for auth token
const AUTH_TOKEN_COOKIE = "auth_token";

// Axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies
});

// Request interceptor to add auth token from cookie
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth
      clearAuthToken();

      // Only redirect to login if we're on a protected route
      // Protected routes: /dashboard, /admin, /checkout
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        const isProtectedRoute =
          pathname.startsWith('/dashboard') ||
          pathname.startsWith('/admin') ||
          pathname.startsWith('/checkout');

        // Only redirect if on protected route and not already on login page
        if (isProtectedRoute && !pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Helper to get auth token from cookie
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(AUTH_TOKEN_COOKIE) || null;
}

// Helper to set auth token in cookie
// Expires in 30 days by default
export function setAuthToken(token: string, rememberMe: boolean = true): void {
  if (typeof window === "undefined") return;

  const cookieOptions: Cookies.CookieAttributes = {
    expires: rememberMe ? 30 : undefined, // 30 days if remember me, session cookie otherwise
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
    sameSite: "lax", // CSRF protection
    path: "/", // Available across the entire app
  };

  Cookies.set(AUTH_TOKEN_COOKIE, token, cookieOptions);
}

// Helper to clear auth token from cookie
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  Cookies.remove(AUTH_TOKEN_COOKIE, { path: "/" });
}

// Fetch wrapper with auth and caching for Next.js Server Components
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit & { cache?: RequestCache; revalidate?: number }
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: options?.cache || "force-cache",
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
