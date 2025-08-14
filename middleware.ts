import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip authentication for API routes and static files
  const pathname = request.nextUrl.pathname
  
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Get Basic Auth credentials from environment
  const basicAuthUser = process.env.BASIC_AUTH_USER || 'luxbid'
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD || 'luxbid2024'
  
  // Get authorization header
  const authorizationHeader = request.headers.get('authorization')
  
  if (authorizationHeader) {
    const base64Credentials = authorizationHeader.replace('Basic ', '')
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    
    // Check credentials
    if (username === basicAuthUser && password === basicAuthPassword) {
      return NextResponse.next()
    }
  }
  
  // Request authentication
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="LuxBid - Acces Restricționat"',
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
