// Service Worker pentru LuxBid - Optimizare Performance și Caching

const CACHE_NAME = 'luxbid-cache-v1'
const STATIC_CACHE_NAME = 'luxbid-static-v1'
const DYNAMIC_CACHE_NAME = 'luxbid-dynamic-v1'
const IMAGE_CACHE_NAME = 'luxbid-images-v1'

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

// Cache timp de viață (în secunde)
const CACHE_DURATIONS = {
  static: 30 * 24 * 60 * 60, // 30 zile
  dynamic: 7 * 24 * 60 * 60, // 7 zile  
  images: 14 * 24 * 60 * 60, // 14 zile
  api: 5 * 60 // 5 minute
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
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName)
      cache.then(c => c.put(request, networkResponse.clone()))
    }
    return networkResponse
  }).catch(() => {
    // Network failed, nu face nimic
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
