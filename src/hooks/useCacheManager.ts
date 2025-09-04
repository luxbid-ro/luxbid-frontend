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
          
          // Optional: Auto-refresh după 3 secunde pentru Apple devices
          setTimeout(() => {
            if (navigator.userAgent.includes('iPhone') || 
                navigator.userAgent.includes('iPad') || 
                navigator.userAgent.includes('Safari')) {
              forceRefresh()
            }
          }, 3000)
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
      const interval = setInterval(checkForUpdates, 2 * 60 * 1000) // 2 minute
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

// 🍎 Apple Cache Buster - Hook special pentru Apple devices
export function useAppleCacheBuster() {
  useEffect(() => {
    const isAppleDevice = navigator.userAgent.includes('iPhone') || 
                         navigator.userAgent.includes('iPad') || 
                         navigator.userAgent.includes('Safari')

    if (isAppleDevice) {
      // Adaugă meta tag pentru a preveni cache-ul agresiv
      const metaTag = document.createElement('meta')
      metaTag.httpEquiv = 'Cache-Control'
      metaTag.content = 'no-cache, no-store, must-revalidate'
      document.head.appendChild(metaTag)

      const pragmaTag = document.createElement('meta')
      pragmaTag.httpEquiv = 'Pragma'
      pragmaTag.content = 'no-cache'
      document.head.appendChild(pragmaTag)

      const expiresTag = document.createElement('meta')
      expiresTag.httpEquiv = 'Expires'
      expiresTag.content = '0'
      document.head.appendChild(expiresTag)

      return () => {
        document.head.removeChild(metaTag)
        document.head.removeChild(pragmaTag)
        document.head.removeChild(expiresTag)
      }
    }
  }, [])
}
