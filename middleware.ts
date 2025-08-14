import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip authentication for API routes, static files, and Next.js internals
  const pathname = request.nextUrl.pathname
  
  console.log('🔐 Middleware checking:', pathname)
  
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
    return NextResponse.next()
  }

  // Get Basic Auth credentials from environment
  const basicAuthUser = process.env.BASIC_AUTH_USER || 'luxbid'
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD || 'luxbid2024'
  
  console.log('🔑 Checking credentials for:', basicAuthUser)
  
  // Get authorization header
  const authorizationHeader = request.headers.get('authorization')
  
  if (authorizationHeader) {
    console.log('🔍 Found auth header')
    try {
      const base64Credentials = authorizationHeader.replace('Basic ', '')
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
      const [username, password] = credentials.split(':')
      
      console.log('👤 Submitted username:', username)
      
      // Check credentials
      if (username === basicAuthUser && password === basicAuthPassword) {
        console.log('✅ Authentication successful')
        return NextResponse.next()
      } else {
        console.log('❌ Invalid credentials')
      }
    } catch (error) {
      console.log('❌ Auth parsing error:', error)
    }
  } else {
    console.log('❌ No auth header found')
  }
  
  // Request authentication
  console.log('🚫 Requesting authentication')
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>LuxBid - Acces Restricționat</title>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; margin-top: 100px; }
          h1 { color: #D09A1E; }
        </style>
      </head>
      <body>
        <h1>🔐 LuxBid - Acces Restricționat</h1>
        <p>Acest site este protejat. Vă rugăm să vă autentificați pentru a continua.</p>
        <p>Pentru acces, contactați echipa de dezvoltare.</p>
      </body>
    </html>`, 
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="LuxBid - Acces Restricționat"',
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  )
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
