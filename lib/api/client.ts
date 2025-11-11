import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const AUTH_TOKEN_COOKIE = 'auth_token';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add token from cookie
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH_TOKEN_COOKIE);
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
      // Token expired or invalid - clear cookie
      Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });

      // Only redirect to login if we're on a protected route
      // Protected routes: /dashboard, /admin, /checkout
      if (typeof window !== 'undefined') {
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

export default apiClient;
