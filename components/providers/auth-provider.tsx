'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'

/**
 * AuthProvider - Initializes authentication on app load
 * Validates token from cookies and keeps users signed in
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    // Initialize auth on mount - validates token from cookie
    initializeAuth()
  }, [initializeAuth])

  return <>{children}</>
}
