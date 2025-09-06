// Service Worker pentru LuxBid - Optimizare Performance și Caching

// FIXED: Use BUILD timestamp instead of runtime timestamp
const DEPLOY_TIMESTAMP = 1757138694123 // Will be updated by build process
const CACHE_VERSION = `v${DEPLOY_TIMESTAMP}`
const CACHE_NAME = `luxbid-cache-${CACHE_VERSION}`
const STATIC_CACHE_NAME = `luxbid-static-${CACHE_VERSION}`
const DYNAMIC_CACHE_NAME = `luxbid-dynamic-${CACHE_VERSION}`
const IMAGE_CACHE_NAME = `luxbid-images-${CACHE_VERSION}`

// Resurse pentru cache static
const STATIC_ASSETS = [
  '/',
  '/oferte',
  '/manifest.json',
  // Adaugă aici alte resurse statice importante
]

// Domenii pentru cache imagini
const IMAGE_DOMAINS = [
  'images.unsplash.com',
  'res.cloudinary.com',
  'luxbid-backend.onrender.com'
]

// Cache timp de viață (în secunde) - REDUS pentru auto-refresh
const CACHE_DURATIONS = {
  static: 2 * 60 * 60, // 2 ore (reduced from 30 days)
  dynamic: 30 * 60, // 30 minute (reduced from 7 days)  
  images: 6 * 60 * 60, // 6 ore (reduced from 14 days)
  api: 2 * 60 // 2 minute (reduced from 5 minutes)
}

// Install Event - Pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .catch((error) => {
        console.error('[SW] Pre-caching failed:', error)
      })
  )
  
  // Activează imediat noul service worker
  self.skipWaiting()
})

// Activate Event - Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Șterge cache-urile vechi
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
  )
  
  // Preia controlul asupra tuturor paginilor
  self.clients.claim()
})

// Fetch Event - Cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Ignore Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return
  }

  event.respondWith(handleRequest(request))
})

// Main request handler with different strategies
async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // 1. Static Assets Strategy - Cache First
    if (isStaticAsset(url)) {
      return await cacheFirstStrategy(request, STATIC_CACHE_NAME)
    }
    
    // 2. Images Strategy - Cache First with fallback
    if (isImageRequest(url)) {
      return await imageStrategy(request)
    }
    
    // 3. API Strategy - Network First with short cache
    if (isAPIRequest(url)) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE_NAME, CACHE_DURATIONS.api)
    }
    
    // 4. Pages Strategy - Stale While Revalidate
    if (isPageRequest(url)) {
      return await staleWhileRevalidateStrategy(request, DYNAMIC_CACHE_NAME)
    }
    
    // 5. Default Strategy - Network First
    return await networkFirstStrategy(request, DYNAMIC_CACHE_NAME)
    
  } catch (error) {
    console.error('[SW] Request failed:', error)
    return await fallbackResponse(request)
  }
}

// Cache First Strategy - pentru assets statice
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    // Verifică dacă cache-ul nu a expirat
    if (!isCacheExpired(cachedResponse, CACHE_DURATIONS.static)) {
      return cachedResponse
    }
  }
  
  // Fetch de la network și cache
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      await cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Returnează cache-ul chiar dacă a expirat
    return cachedResponse || fallbackResponse(request)
  }
}

// Network First Strategy - pentru API și conținut dinamic
async function networkFirstStrategy(request, cacheName, maxAge = CACHE_DURATIONS.dynamic) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache răspunsul de la network
      const cache = await caches.open(cacheName)
      const responseToCache = networkResponse.clone()
      
      // Adaugă timestamp pentru expirare
      const responseWithTimestamp = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: {
          ...Object.fromEntries(responseToCache.headers.entries()),
          'sw-cached-at': Date.now().toString()
        }
      })
      
      await cache.put(request, responseWithTimestamp)
    }
    
    return networkResponse
  } catch (error) {
    // Network failed, încearcă cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse && !isCacheExpired(cachedResponse, maxAge)) {
      return cachedResponse
    }
    
    throw error
  }
}

// Stale While Revalidate Strategy - pentru pagini
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request)
  
  // Fetch în background pentru a actualiza cache-ul
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      // FIXED: Clone response BEFORE using it
      const responseClone = networkResponse.clone()
      const cache = await caches.open(cacheName)
      await cache.put(request, responseClone)
    }
    return networkResponse
  }).catch(() => {
    // Network failed, nu face nimic
    return null
  })
  
  // Returnează cache-ul imediat sau wait pentru network
  return cachedResponse || fetchPromise
}

// Image Strategy - Cache first cu compresie
async function imageStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATIONS.images)) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE_NAME)
      await cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    return cachedResponse || fallbackResponse(request)
  }
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.startsWith('/_next/static/') ||
         url.pathname.includes('.css') ||
         url.pathname.includes('.js') ||
         url.pathname.includes('.woff') ||
         url.pathname.includes('.woff2')
}

function isImageRequest(url) {
  return IMAGE_DOMAINS.some(domain => url.hostname.includes(domain)) ||
         url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') ||
         url.hostname.includes('luxbid-backend.onrender.com')
}

function isPageRequest(url) {
  return url.pathname.startsWith('/') && 
         !isStaticAsset(url) && 
         !isImageRequest(url) && 
         !isAPIRequest(url)
}

function isCacheExpired(response, maxAge) {
  const cachedAt = response.headers.get('sw-cached-at')
  if (!cachedAt) return false
  
  const age = (Date.now() - parseInt(cachedAt)) / 1000
  return age > maxAge
}

async function fallbackResponse(request) {
  const url = new URL(request.url)
  
  // Fallback pentru imagini
  if (isImageRequest(url)) {
    return new Response('', {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    })
  }
  
  // Fallback pentru pagini
  if (isPageRequest(url)) {
    const offlinePage = await caches.match('/') // Pagina principală ca fallback
    if (offlinePage) {
      return offlinePage
    }
  }
  
  // Default fallback
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

// Background Sync pentru retry failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Implementează logica pentru retry requests care au eșuat
  console.log('[SW] Performing background sync...')
}

// Message handler pentru cache management
self.addEventListener('message', (event) => {
  const { type, payload } = event.data
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'CLEAR_CACHE':
      clearCache(payload?.cacheName)
      break
      
    case 'INVALIDATE_LISTINGS_CACHE':
      invalidateListingsCache()
      break
      
    case 'INVALIDATE_API_CACHE':
      invalidateAPICache(payload?.pattern)
      break
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', size })
      })
      break
  }
})

async function clearCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName)
  } else {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
  }
  console.log('[SW] Cache cleared')
}

async function getCacheSize() {
  const cacheNames = await caches.keys()
  let totalSize = 0
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    
    for (const request of keys) {
      const response = await cache.match(request)
      if (response) {
        const blob = await response.blob()
        totalSize += blob.size
      }
    }
  }
  
  return totalSize
}

// 🚀 AUTO-UPDATE MECHANISM pentru deploy-uri noi
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_FOR_UPDATE') {
    checkForUpdate()
  }
  
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    forceUpdate()
  }
})

// Check pentru versiuni noi 
async function checkForUpdate() {
  try {
    // Verifică dacă există o versiune nouă pe server
    const response = await fetch('/sw.js', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
    
    if (response.ok) {
      const swText = await response.text()
      const currentTimestamp = swText.match(/DEPLOY_TIMESTAMP = (\d+)/)
      
      if (currentTimestamp && parseInt(currentTimestamp[1]) > DEPLOY_TIMESTAMP) {
        // Notifică clients despre update disponibil
        const clients = await self.clients.matchAll()
        clients.forEach(client => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE',
            timestamp: currentTimestamp[1]
          })
        })
      }
    }
  } catch (error) {
    console.error('[SW] Check for update failed:', error)
  }
}

// Forțează actualizarea completă
async function forceUpdate() {
  try {
    // Șterge toate cache-urile
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
    
    // Notifică clients să se reîmprospăteze
    const clients = await self.clients.matchAll()
    clients.forEach(client => {
      client.postMessage({
        type: 'FORCE_RELOAD'
      })
    })
    
    // Actualizează service worker-ul
    self.skipWaiting()
  } catch (error) {
    console.error('[SW] Force update failed:', error)
  }
}

// Check automat pentru update-uri la fiecare 5 minute
setInterval(() => {
  checkForUpdate()
}, 5 * 60 * 1000) // 5 minute

// 🚀 CACHE INVALIDATION FUNCTIONS pentru CRUD operations
async function invalidateListingsCache() {
  console.log('[SW] 🔄 Invalidating listings cache...')
  
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const keys = await cache.keys()
    
    // Șterge toate cache-urile pentru listings
    const deletionPromises = keys
      .filter(request => {
        const url = new URL(request.url)
        return url.pathname.includes('/listings') || 
               url.pathname.includes('/oferte') ||
               url.pathname === '/' // Homepage care afișează listings
      })
      .map(request => {
        console.log('[SW] 🗑️ Deleting cached request:', request.url)
        return cache.delete(request)
      })
    
    await Promise.all(deletionPromises)
    console.log('[SW] ✅ Listings cache invalidated successfully')
    
    // Notifică toate tab-urile că cache-ul a fost invalidat
    const clients = await self.clients.matchAll()
    clients.forEach(client => {
      client.postMessage({
        type: 'CACHE_INVALIDATED',
        category: 'listings'
      })
    })
  } catch (error) {
    console.error('[SW] ❌ Failed to invalidate listings cache:', error)
  }
}

async function invalidateAPICache(pattern) {
  console.log('[SW] 🔄 Invalidating API cache for pattern:', pattern)
  
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const keys = await cache.keys()
    
    const deletionPromises = keys
      .filter(request => {
        const url = new URL(request.url)
        if (pattern) {
          return url.pathname.includes(pattern)
        }
        // Default: invalidează toate API-urile
        return isAPIRequest(url)
      })
      .map(request => {
        console.log('[SW] 🗑️ Deleting cached API request:', request.url)
        return cache.delete(request)
      })
    
    await Promise.all(deletionPromises)
    console.log('[SW] ✅ API cache invalidated successfully')
  } catch (error) {
    console.error('[SW] ❌ Failed to invalidate API cache:', error)
  }
}
