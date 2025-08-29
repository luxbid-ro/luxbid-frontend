'use client'

import { useEffect, useState } from 'react'

interface ServiceWorkerState {
  isSupported: boolean
  isRegistered: boolean
  isInstalling: boolean
  isWaiting: boolean
  isControlling: boolean
  registration: ServiceWorkerRegistration | null
  error: string | null
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isInstalling: false,
    isWaiting: false,
    isControlling: false,
    registration: null,
    error: null
  })

  useEffect(() => {
    // Verifică dacă service workers sunt suportați
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setState(prev => ({ ...prev, isSupported: false }))
      return
    }

    setState(prev => ({ ...prev, isSupported: true }))

    // Înregistrează service worker-ul
    registerServiceWorker()
  }, [])

  const registerServiceWorker = async () => {
    try {
      setState(prev => ({ ...prev, isInstalling: true }))

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      setState(prev => ({
        ...prev,
        isRegistered: true,
        isInstalling: false,
        registration
      }))

      // Ascultă pentru actualizări
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (!newWorker) return

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Există un SW vechi, noul este în așteptare
              setState(prev => ({ ...prev, isWaiting: true }))
              console.log('📦 [SW] Versiune nouă disponibilă! Reîmprospătează pagina.')
            } else {
              // Prima instalare
              console.log('📦 [SW] Conținut cache-at pentru utilizare offline!')
            }
          }
        })
      })

      // Verifică dacă pagina este controlată de un SW
      if (navigator.serviceWorker.controller) {
        setState(prev => ({ ...prev, isControlling: true }))
        console.log('📦 [SW] Pagina este controlată de service worker')
      }

      // Ascultă pentru schimbări de control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setState(prev => ({ ...prev, isControlling: true }))
        console.log('📦 [SW] Controller schimbat - reîncărcând pagina...')
        window.location.reload()
      })

    } catch (error) {
      console.error('📦 [SW] Înregistrarea a eșuat:', error)
      setState(prev => ({
        ...prev,
        isInstalling: false,
        error: error instanceof Error ? error.message : 'Eroare necunoscută'
      }))
    }
  }

  // Funcție pentru a activa noul service worker
  const activateNewServiceWorker = () => {
    if (state.registration?.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  // Funcție pentru a curăța cache-ul
  const clearCache = async (cacheName?: string) => {
    if (state.registration?.active) {
      state.registration.active.postMessage({
        type: 'CLEAR_CACHE',
        payload: cacheName ? { cacheName } : null
      })
    }
  }

  // Funcție pentru a obține dimensiunea cache-ului
  const getCacheSize = async (): Promise<number> => {
    return new Promise((resolve) => {
      if (!state.registration?.active) {
        resolve(0)
        return
      }

      const channel = new MessageChannel()
      channel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_SIZE') {
          resolve(event.data.size)
        }
      }

      state.registration.active.postMessage(
        { type: 'GET_CACHE_SIZE' },
        [channel.port2]
      )
    })
  }

  return {
    ...state,
    activateNewServiceWorker,
    clearCache,
    getCacheSize
  }
}

// Hook pentru notificări de actualizare
export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const { isWaiting, activateNewServiceWorker } = useServiceWorker()

  useEffect(() => {
    setUpdateAvailable(isWaiting)
  }, [isWaiting])

  const applyUpdate = () => {
    activateNewServiceWorker()
    setUpdateAvailable(false)
  }

  const dismissUpdate = () => {
    setUpdateAvailable(false)
  }

  return {
    updateAvailable,
    applyUpdate,
    dismissUpdate
  }
}

// Hook pentru cache management
export function useCacheManagement() {
  const { clearCache, getCacheSize } = useServiceWorker()
  const [cacheSize, setCacheSize] = useState(0)
  const [isClearing, setIsClearing] = useState(false)

  const refreshCacheSize = async () => {
    const size = await getCacheSize()
    setCacheSize(size)
  }

  const clearAllCache = async () => {
    setIsClearing(true)
    try {
      await clearCache()
      await refreshCacheSize()
      console.log('📦 [Cache] Cache șters cu succes')
    } catch (error) {
      console.error('📦 [Cache] Eroare la ștergerea cache-ului:', error)
    } finally {
      setIsClearing(false)
    }
  }

  const formatCacheSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  useEffect(() => {
    refreshCacheSize()
  }, [])

  return {
    cacheSize,
    formattedCacheSize: formatCacheSize(cacheSize),
    isClearing,
    refreshCacheSize,
    clearAllCache
  }
}
