'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  
  // TEMPORAR: Dezactivăm Basic Auth pentru toate paginile
  // Site-ul va fi public pentru testare și funcționalitate
  const isPrivatePage = false // pathname.startsWith('/admin/') sau alte rute specifice private
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
