'use client'

import type { Metadata } from 'next'
import React, { useEffect } from 'react'
import './globals.css'
import NavBar from '@/components/NavBar'
import ErrorBoundary from '@/components/ErrorBoundary'
import ConditionalAuth from '@/components/ConditionalAuth'
import { 
  LazyCookieBanner, 
  LazyAccessibilityWidget
} from '@/components/LazyComponents'
import UpdateNotification from '@/components/UpdateNotification'
import UpdateNotifier from '@/components/UpdateNotifier'
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import GoogleAnalytics, { GoogleAnalyticsEcommerce } from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'LuxBid – Oferte Premium pentru Articole de Lux | Marketplace România',
  description: 'Platformă premium pentru vânzarea și cumpărarea obiectelor de lux în România. Ceasuri, genți, bijuterii de marcă. Oferte sigure, plăți protejate.',
  keywords: 'obiecte de lux România, ceasuri de lux, genți designer, bijuterii premium, Rolex, Hermès, Chanel, marketplace lux',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    title: 'LuxBid – Marketplace Premium pentru Articole de Lux România',
    description: 'Descoperă și vinde obiecte de lux autentice: ceasuri premium, genți designer, bijuterii de marcă. Platformă sigură cu plăți protejate.',
    url: 'https://luxbid.ro',
    siteName: 'LuxBid',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: '/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'LuxBid - Marketplace pentru articole de lux în România'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxBid – Marketplace Premium Articole de Lux România',
    description: 'Platformă premium pentru vânzarea obiectelor de lux. Ceasuri, genți, bijuterii de marcă.',
    images: ['/og-homepage.jpg'],
    creator: '@LuxBidRO'
  },
  alternates: {
    canonical: 'https://luxbid.ro'
  }
}

// Force dynamic rendering to ensure middleware runs
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const version = window.location.search.includes('v=') 
        ? window.location.search.split('v=')[1] 
        : '2.0'
      localStorage.setItem('luxbid_cache_version', version)
    }
  }, [])

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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D09A1E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LuxBid" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google Analytics 4 - Direct Integration */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PXGXDYQDY3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PXGXDYQDY3', {
                send_page_view: true,
                anonymize_ip: true
              });
              console.log('📊 [GA4] DIRECT INTEGRATION - ID: G-PXGXDYQDY3');
            `
          }}
        />
      </head>
      <body>
        <UpdateNotifier />
        <ErrorBoundary>
          <ConditionalAuth>
            <main id="main-content">
              <NavBar />
              {children}
            </main>
            <LazyCookieBanner />
            <LazyAccessibilityWidget />
            {/* Age verification removed */}
            <UpdateNotification />
            
            {/* Global Structured Data */}
            <OrganizationSchema />
            <WebsiteSchema />
            
            {/* Performance Monitoring */}
            <PerformanceMonitor enabled={true} />
            
            {/* Google Analytics 4 - Now in <head> directly */}
            <GoogleAnalyticsEcommerce />
          </ConditionalAuth>
        </ErrorBoundary>
      </body>
    </html>
  )
}
