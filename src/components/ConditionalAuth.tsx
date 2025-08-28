'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BasicAuthGate from './BasicAuthGate'

interface ConditionalAuthProps {
  children: React.ReactNode
}

export default function ConditionalAuth({ children }: ConditionalAuthProps) {
  const pathname = usePathname()
  const [isPublicPage, setIsPublicPage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if this is a legal/public page
    const isLegalPage = pathname.startsWith('/legal/')
    
    console.log('🔍 ConditionalAuth checking:', { pathname, isLegalPage })
    
    setIsPublicPage(isLegalPage)
    setIsLoading(false)
  }, [pathname])

  // Show loading during route detection
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '16px', fontSize: '24px' }}>
            <span style={{ color: '#D09A1E' }}>Lux</span>
            <span style={{ color: '#000' }}>Bid</span>
          </div>
          <div style={{ color: '#666' }}>Loading...</div>
        </div>
      </div>
    )
  }

  // Pentru rutele publice, redăm conținutul direct
  if (isPublicPage) {
    console.log('✅ Public page - skipping auth')
    return <>{children}</>
  }

  // Pentru rutele private, aplicăm BasicAuthGate
  console.log('🔐 Private page - applying auth')
  return <BasicAuthGate>{children}</BasicAuthGate>
}
