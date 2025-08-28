'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()

  // Rute publice care nu necesită autentificare
  const publicRoutes = [
    '/legal/privacy-policy',
    '/legal/terms-conditions', 
    '/legal/cookie-policy'
  ]

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/legal/')

  // Pentru rutele publice, redăm conținutul direct
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Pentru rutele private, aplicăm BasicAuthGate
  return <BasicAuthGate>{children}</BasicAuthGate>
}
