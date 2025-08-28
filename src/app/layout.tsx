import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import NavBar from '@/components/NavBar'
import ErrorBoundary from '@/components/ErrorBoundary'
import ConditionalAuth from '@/components/ConditionalAuth'
import CookieBanner from '@/components/CookieBanner'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import AgeVerificationModal from '@/components/AgeVerificationModal'

export const metadata: Metadata = {
  title: 'LuxBid – Oferte Premium pentru Articole de Lux',
  description:
    'Platformă premium unde îți listezi obiectele de lux și primești oferte de preț. După acceptare și plata comisionului, se deblochează contactele și chatul privat.',
  viewport: 'width=device-width, initial-scale=1',
}

// Force dynamic rendering to ensure middleware runs
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body>
        <ErrorBoundary>
          <ConditionalAuth>
            <main id="main-content">
              <NavBar />
              {children}
            </main>
            <CookieBanner />
            <AccessibilityWidget />
            <AgeVerificationModal />
          </ConditionalAuth>
        </ErrorBoundary>
      </body>
    </html>
  )
}
