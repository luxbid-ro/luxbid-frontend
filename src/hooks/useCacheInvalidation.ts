import { useCallback } from 'react'

export function useCacheInvalidation() {
  
  // Invalidează cache-ul pentru listings după operații CRUD
  const invalidateListingsCache = useCallback(async () => {
    console.log('🔄 [Cache] Invalidating listings cache...')
    
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        // Trimite mesaj către Service Worker să invalideze cache-ul
        navigator.serviceWorker.controller.postMessage({
          type: 'INVALIDATE_LISTINGS_CACHE'
        })
        
        console.log('✅ [Cache] Listings cache invalidation requested')
      } catch (error) {
        console.error('❌ [Cache] Failed to invalidate listings cache:', error)
      }
    }
  }, [])
  
  // Invalidează cache-ul pentru orice API
  const invalidateAPICache = useCallback(async (pattern?: string) => {
    console.log('🔄 [Cache] Invalidating API cache for pattern:', pattern || 'all')
    
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        navigator.serviceWorker.controller.postMessage({
          type: 'INVALIDATE_API_CACHE',
          payload: { pattern }
        })
        
        console.log('✅ [Cache] API cache invalidation requested')
      } catch (error) {
        console.error('❌ [Cache] Failed to invalidate API cache:', error)
      }
    }
  }, [])
  
  // Forțează refresh pentru listings (combo: cache invalidation + refetch)
  const forceRefreshListings = useCallback(async () => {
    console.log('🚀 [Cache] Force refreshing listings...')
    
    // 1. Invalidează cache-ul
    await invalidateListingsCache()
    
    // 2. Așteaptă puțin să se proceseze invalidarea
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 3. Reîncarcă pagina pentru fresh data (ultima soluție)
    if (typeof window !== 'undefined') {
      // Dispatch custom event pentru components să refetch
      window.dispatchEvent(new CustomEvent('forceListingsRefresh'))
    }
  }, [invalidateListingsCache])
  
  // Hook pentru listening la cache invalidation events
  const setupCacheInvalidationListener = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, category } = event.data
        
        if (type === 'CACHE_INVALIDATED') {
          console.log(`✅ [Cache] Cache invalidated for category: ${category}`)
          
          // Dispatch event pentru components
          window.dispatchEvent(new CustomEvent('cacheInvalidated', {
            detail: { category }
          }))
        }
      })
    }
  }, [])
  
  return {
    invalidateListingsCache,
    invalidateAPICache,
    forceRefreshListings,
    setupCacheInvalidationListener
  }
}
