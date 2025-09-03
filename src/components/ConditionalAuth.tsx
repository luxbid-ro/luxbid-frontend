'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  
  // <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> SITE PUBLIC - Basic Auth dezactivat pentru lansare
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
