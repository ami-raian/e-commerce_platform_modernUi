import { apiClient } from './config'
import type { ApiResponse, User, LoginCredentials, RegisterData, AuthResponse } from './types'
import { setAuthToken, clearAuthToken } from './config'

/**
 * Auth API Service
 * Provides methods to interact with the authentication API
 */

/**
 * Login user
 * @param credentials - Email and password
 * @param rememberMe - Whether to persist login (default: true)
 */
export async function login(credentials: LoginCredentials, rememberMe: boolean = true): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials)

  const authData = response.data.data!

  // Store token in cookie
  setAuthToken(authData.token, rememberMe)

  return authData
}

/**
 * Register new user
 * @param data - Registration data
 * @param rememberMe - Whether to persist login (default: true)
 */
export async function register(data: RegisterData, rememberMe: boolean = true): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data)

  const authData = response.data.data!

  // Store token in cookie
  setAuthToken(authData.token, rememberMe)

  return authData
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  // Clear token from cookie
  clearAuthToken()

  // Optional: Call backend logout endpoint if you have one
  try {
    await apiClient.post('/auth/logout')
  } catch (error) {
    // Ignore errors on logout
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me')
  return response.data.data!.user
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<User>): Promise<User> {
  const response = await apiClient.patch<ApiResponse<{ user: User }>>('/auth/profile', updates)
  return response.data.data!.user
}

/**
 * Change password
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/change-password', {
    currentPassword,
    newPassword,
  })
  return response.data.data!
}

/**
 * Verify auth token and get user
 * Returns null if token is invalid or missing (without throwing)
 * This is normal for non-authenticated users on public pages
 */
export async function verifyToken(): Promise<User | null> {
  try {
    return await getCurrentUser()
  } catch (error) {
    // Silently clear invalid token and return null
    // This is normal for non-authenticated users
    clearAuthToken()
    return null
  }
}
