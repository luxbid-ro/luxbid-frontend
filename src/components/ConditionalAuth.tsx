'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  
  // REACTIVAT: Basic Auth pentru toate paginile în development
  // Site-ul trebuie protejat cu luxbid / luxbid2024
  const isPrivatePage = true // Protejăm toate paginile în development
  const isLegalPage = pathname.startsWith('/legal/')

  // Check if page requires authentication
  if (!isPrivatePage) {
    return <>{children}</>
  }

  // Apply BasicAuthGate for private routes
  return <BasicAuthGate>{children}</BasicAuthGate>
}
