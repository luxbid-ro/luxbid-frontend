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

  console.log('🔍 ConditionalAuth checking:', { pathname, isLegalPage, isPrivatePage })

  // Pentru orice pagină publică (toate paginile acum), redăm conținutul direct
  if (!isPrivatePage) {
    console.log('✅ Public page - no auth needed')
    return <>{children}</>
  }

  // Pentru rutele private (dezactivate momentan), aplicăm BasicAuthGate
  console.log('🔐 Private page - applying auth')
  return <BasicAuthGate>{children}</BasicAuthGate>
}
