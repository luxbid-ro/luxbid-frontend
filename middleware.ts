import { NextRequest, NextResponse } from 'next/server'
import { addSecurityHeaders, addAPISecurityHeaders } from '@/middleware/security'

export function middleware(request: NextRequest) {
  // Skip authentication for API routes, static files, and Next.js internals
  const pathname = request.nextUrl.pathname
  
  console.log('🌍 Public middleware checking:', pathname)
  
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('/static/') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    console.log('🟢 Allowing static/API request')
    const response = NextResponse.next()
    
    // Add security headers for API routes
    if (pathname.startsWith('/api/')) {
      return addAPISecurityHeaders(addSecurityHeaders(request, response))
    }
    
    // Add basic security headers for static files
    return addSecurityHeaders(request, response)
  }

  // 🌍 SITE COMPLET PUBLIC - Fără Basic Auth
  // Site-ul este acum accesibil tuturor utilizatorilor fără restricții
  console.log('✅ Public site - allowing all access')
  const response = NextResponse.next()
  response.headers.set('x-public-site', 'true')
  response.headers.set('Cache-Control', 'public, max-age=3600')
  return addSecurityHeaders(request, response)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - favicon.ico, robots.txt, etc.
     * - static files
     */
    '/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}