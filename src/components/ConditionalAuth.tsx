'use client'

import { usePathname } from 'next/navigation'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  // Determine page type immediately - no state needed
  const isLegalPage = pathname.startsWith('/legal/')

  console.log('🔍 ConditionalAuth checking:', { pathname, isLegalPage })

  // Pentru rutele publice, redăm conținutul direct
  if (isLegalPage) {
    console.log('✅ Legal page - skipping auth')
    return <>{children}</>
  }

  // Pentru rutele private, aplicăm BasicAuthGate
  console.log('🔐 Private page - applying auth')
  return <BasicAuthGate>{children}</BasicAuthGate>
}
