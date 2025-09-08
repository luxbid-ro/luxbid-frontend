'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  personType: string
  [key: string]: any
}

interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isVerified: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
    isVerified: false,
  })
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('luxbid_token')
      
      if (!token) {
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
          isVerified: false,
        })
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const userData = await res.json()
          
          setAuthState({
            user: userData,
            loading: false,
            isAuthenticated: true,
            isVerified: userData.isVerified || false,
          })

          // If user is not verified, redirect to verification page
          if (!userData.isVerified) {
            localStorage.removeItem('luxbid_token')
            localStorage.removeItem('luxbid_user_id')
            router.push(`/auth/verify-email?email=${encodeURIComponent(userData.email)}`)
          }
        } else {
          // Token is invalid
          localStorage.removeItem('luxbid_token')
          localStorage.removeItem('luxbid_user_id')
          setAuthState({
            user: null,
            loading: false,
            isAuthenticated: false,
            isVerified: false,
          })
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
          isVerified: false,
        })
      }
    }

    checkAuth()
  }, [router])

  const logout = () => {
    localStorage.removeItem('luxbid_token')
    localStorage.removeItem('luxbid_user_id')
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false,
      isVerified: false,
    })
    router.push('/auth/login')
  }

  return {
    ...authState,
    logout,
  }
}
