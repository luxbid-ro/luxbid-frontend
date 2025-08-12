'use client'
import { useState, useCallback } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (url: string, config: RequestInit = {}) => {
      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
        const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
        
        const response = await fetch(fullUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            ...config.headers,
          },
          mode: 'cors',
          ...config,
        })

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`
          
          try {
            const errorData = await response.json()
            if (errorData.message) {
              errorMessage = errorData.message
            }
          } catch {
            // If response is not JSON, use default error message
          }
          
          throw new Error(errorMessage)
        }

        const contentType = response.headers.get('content-type')
        let data
        
        if (contentType && contentType.includes('application/json')) {
          const responseText = await response.text()
          if (responseText.trim()) {
            data = JSON.parse(responseText)
          } else {
            data = null
          }
        } else {
          data = await response.text()
        }

        setState({ data, loading: false, error: null })
        options.onSuccess?.(data)
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        setState(prev => ({ ...prev, loading: false, error: errorMessage }))
        options.onError?.(errorMessage)
        throw error
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

// Specialized hooks for common use cases
export function useAuthenticatedApi<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>(options)
  
  const executeWithAuth = useCallback(
    async (url: string, config: RequestInit = {}) => {
      const token = localStorage.getItem('luxbid_token')
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      return api.execute(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...config.headers,
        },
      })
    },
    [api]
  )

  return {
    ...api,
    execute: executeWithAuth,
  }
}

// Hook for listings with built-in retry logic
export function useListings() {
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3
  
  const api = useApi<any[]>({
    onError: (error) => {
      console.error('📥 Listings API error:', error)
    },
    onSuccess: (data) => {
      console.log('✅ Listings loaded:', data?.length || 0, 'items')
      setRetryCount(0) // Reset retry count on success
    }
  })

  const fetchListings = useCallback(async () => {
    try {
      return await api.execute('/listings')
    } catch (error) {
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying listings fetch (${retryCount + 1}/${maxRetries})`)
        setRetryCount(prev => prev + 1)
        // Retry after a delay
        setTimeout(() => {
          api.execute('/listings')
        }, 1000 * (retryCount + 1)) // Exponential backoff: 1s, 2s, 3s
      }
      throw error
    }
  }, [api, retryCount, maxRetries])

  return {
    ...api,
    fetchListings,
    retryCount,
    canRetry: retryCount < maxRetries,
  }
}
