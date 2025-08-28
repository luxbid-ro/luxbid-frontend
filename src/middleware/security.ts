import { NextRequest, NextResponse } from 'next/server'

/**
 * Security Headers Middleware pentru LuxBid
 * Implementează HSTS, CSP, și alte header-e de securitate
 */

export function addSecurityHeaders(request: NextRequest, response: NextResponse): NextResponse {
  // 1. HSTS (HTTP Strict Transport Security)
  // Forțează HTTPS pentru domeniu și subdomeniile pentru 1 an
  response.headers.set(
    'Strict-Transport-Security', 
    'max-age=31536000; includeSubDomains; preload'
  )

  // 2. CSP (Content Security Policy) 
  // Protecție împotriva XSS și injection attacks
  const cspPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "connect-src 'self' https://luxbid-backend.onrender.com https://api.cloudinary.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', cspPolicy)

  // 3. X-Frame-Options
  // Previne site-ul să fie încorporat în iframe-uri (clickjacking protection)
  response.headers.set('X-Frame-Options', 'DENY')

  // 4. X-Content-Type-Options
  // Previne browser-ul să "ghicească" tipul de conținut
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // 5. Referrer Policy
  // Controlează informațiile trimise în header-ul Referer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 6. X-XSS-Protection
  // Activează protecția XSS în browser-e mai vechi
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // 7. Permissions Policy (fostul Feature Policy)
  // Controlează ce API-uri pot fi folosite de site
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=(),
    'usb=()',
    'serial=()',
    'bluetooth=()'
  ].join(', ')
  
  response.headers.set('Permissions-Policy', permissionsPolicy)

  // 8. Cross-Origin-Embedder-Policy
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')

  // 9. Cross-Origin-Opener-Policy  
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')

  // 10. Cross-Origin-Resource-Policy
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')

  // 11. Server header (ascunde informațiile despre server)
  response.headers.set('Server', 'LuxBid')

  // 12. X-Powered-By (elimină header-ul care dezvăluie tehnologia)
  response.headers.delete('X-Powered-By')

  // 13. Cache-Control pentru security
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // API endpoints nu trebuie cache-uite
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // 14. CORP pentru resurse statice
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i)) {
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin')
  }

  return response
}

/**
 * Configurație CSP specifică pentru ambiente
 */
export function getCSPForEnvironment(isDevelopment: boolean = false): string {
  const basePolicy = [
    "default-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ]

  if (isDevelopment) {
    // Development environment - mai permisiv pentru debugging
    return [
      ...basePolicy,
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: http://localhost:* https://res.cloudinary.com",
      "connect-src 'self' http://localhost:* https://luxbid-backend.onrender.com ws://localhost:*",
      "font-src 'self' https://fonts.gstatic.com"
    ].join('; ')
  }

  // Production environment - restrictiv
  return [
    ...basePolicy,
    "script-src 'self' 'sha256-abc123' https://cdnjs.cloudflare.com",
    "style-src 'self' 'sha256-def456' https://fonts.googleapis.com",
    "img-src 'self' data: https://res.cloudinary.com",
    "connect-src 'self' https://luxbid-backend.onrender.com",
    "font-src 'self' https://fonts.gstatic.com",
    "upgrade-insecure-requests"
  ].join('; ')
}

/**
 * Header-e specifice pentru API endpoints
 */
export function addAPISecurityHeaders(response: NextResponse): NextResponse {
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || 'https://www.luxbid.ro')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 hours

  // API specific security
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-API-Version', '1.0')
  response.headers.set('Cache-Control', 'no-store')
  
  return response
}

/**
 * Security headers pentru pagini legale (publice)
 */
export function addPublicPageHeaders(response: NextResponse): NextResponse {
  // Permisiuni mai relaxate pentru pagini publice
  response.headers.set('X-Robots-Tag', 'index, follow')
  response.headers.set('Cache-Control', 'public, max-age=3600') // 1 oră cache
  
  // Păstrăm securitatea de bază
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

/**
 * Configurație HSTS pentru domenii și subdomeniilor
 */
export const HSTS_CONFIG = {
  // Producție - HSTS complet activat
  production: 'max-age=31536000; includeSubDomains; preload',
  
  // Staging - HSTS activat dar fără preload
  staging: 'max-age=86400; includeSubDomains',
  
  // Development - HSTS dezactivat 
  development: 'max-age=0'
}

/**
 * Lista de domenii permise pentru CORS
 */
export const ALLOWED_ORIGINS = [
  'https://www.luxbid.ro',
  'https://luxbid.ro',
  'https://admin.luxbid.ro',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://127.0.0.1:3000'] : [])
]

/**
 * Verifică dacă un origin este permis
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.includes(origin)
}
