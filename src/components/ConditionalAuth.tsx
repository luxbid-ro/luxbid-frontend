'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  
  // ✅ SITE PUBLIC - Basic Auth dezactivat pentru lansare
  // Site-ul este acum public și accesibil tuturor utilizatorilor
  const isPrivatePage = false // Site public - nu mai e nevoie de protecție
  const isLegalPage = pathname.startsWith('/legal/')

  // Check if page requires authentication
  if (!isPrivatePage) {
    return <>{children}</>
  }

  // Apply BasicAuthGate for private routes
  return <BasicAuthGate>{children}</BasicAuthGate>
}
