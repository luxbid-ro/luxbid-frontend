'use client'
import { useEffect, useState } from 'react'

interface CacheStatus {
  isUpdateAvailable: boolean
  isUpdating: boolean
  lastUpdateCheck: Date | null
}

export function useCacheManager() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>({
    isUpdateAvailable: false,
    isUpdating: false,
    lastUpdateCheck: null
  })

  // Force refresh pentru deploy-uri noi
  const forceRefresh = async () => {
    setCacheStatus(prev => ({ ...prev, isUpdating: true }))
    
    try {
      // 1. Notifică Service Worker să șteargă cache-ul
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'FORCE_UPDATE'
        })
      }
      
      // 2. Șterge cache-ul browserului
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
      }
      
      // 3. Șterge localStorage (dacă e necesar)
      // localStorage.clear() // Comentat pentru a păstra login-ul
      
      // 4. Force reload
      window.location.reload()
      
    } catch (error) {
      console.error('Failed to force refresh:', error)
      setCacheStatus(prev => ({ ...prev, isUpdating: false }))
    }
  }

  // Check manual pentru update-uri
  const checkForUpdates = async () => {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CHECK_FOR_UPDATE'
        })
      }
      
      setCacheStatus(prev => ({ 
        ...prev, 
        lastUpdateCheck: new Date() 
      }))
    } catch (error) {
      console.error('Failed to check for updates:', error)
    }
  }

  // Clear doar cache-ul, fără reload
  const clearCache = async () => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
      }
      
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CLEAR_CACHE'
        })
      }
      
      console.log('Cache cleared successfully')
    } catch (error) {
      console.error('Failed to clear cache:', error)
    }
  }

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    // Ascultă mesaje de la Service Worker
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { type, timestamp } = event.data

      switch (type) {
        case 'UPDATE_AVAILABLE':
          setCacheStatus(prev => ({ 
            ...prev, 
            isUpdateAvailable: true 
          }))
          
          // Nu auto-refresh pentru a evita loop-uri infinite
          console.log('🍎 Update available for Apple device, waiting for user action')
          break

        case 'FORCE_RELOAD':
          window.location.reload()
          break
      }
    }

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage)

    // Check pentru update-uri la mount
    checkForUpdates()

    // Auto-check la fiecare 2 minute pentru Apple devices
    const isAppleDevice = navigator.userAgent.includes('iPhone') || 
                         navigator.userAgent.includes('iPad') || 
                         navigator.userAgent.includes('Safari')
    
    if (isAppleDevice) {
      const interval = setInterval(checkForUpdates, 10 * 60 * 1000) // 10 minute pentru a evita loop-uri
      return () => {
        clearInterval(interval)
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage)
      }
    }

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage)
    }
  }, [])

  return {
    cacheStatus,
    forceRefresh,
    clearCache,
    checkForUpdates
  }
}

// 🍎 Apple Cache Buster - Hook special pentru Apple devices (optimizat)
export function useAppleCacheBuster() {
  useEffect(() => {
    const isAppleDevice = navigator.userAgent.includes('iPhone') || 
                         navigator.userAgent.includes('iPad') || 
                         navigator.userAgent.includes('Safari')

    if (isAppleDevice) {
      // Verifică dacă meta tag-urile nu există deja
      const existingCacheControl = document.querySelector('meta[http-equiv="Cache-Control"]')
      const existingPragma = document.querySelector('meta[http-equiv="Pragma"]')
      
      if (!existingCacheControl && !existingPragma) {
        // Adaugă meta tag-uri mai puțin agresive
        const metaTag = document.createElement('meta')
        metaTag.httpEquiv = 'Cache-Control'
        metaTag.content = 'max-age=300, must-revalidate' // 5 minute cache cu revalidare
        document.head.appendChild(metaTag)

        const pragmaTag = document.createElement('meta')
        pragmaTag.httpEquiv = 'Pragma'
        pragmaTag.content = 'no-cache'
        document.head.appendChild(pragmaTag)

        console.log('🍎 Applied Apple cache optimization')

        return () => {
          try {
            if (document.head.contains(metaTag)) document.head.removeChild(metaTag)
            if (document.head.contains(pragmaTag)) document.head.removeChild(pragmaTag)
          } catch (e) {
            console.warn('Failed to remove meta tags:', e)
          }
        }
      }
    }
  }, [])
}
