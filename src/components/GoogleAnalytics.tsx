'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useAnalytics, useAnalyticsConsent } from '@/hooks/useAnalytics'

interface GoogleAnalyticsProps {
  measurementId?: string
  enabled?: boolean
}

/**
 * Componenta pentru integrarea Google Analytics 4 cu consent management
 */
export default function GoogleAnalytics({ 
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PXGXDYQDY3',
  enabled = true 
}: GoogleAnalyticsProps) {
  const { hasConsent } = useAnalyticsConsent()
  
  // TEMPORAR: Activez GA4 fără consent pentru testare
  // Nu încărca GA dacă nu avem consent sau e disabled
  // if (!enabled || !measurementId || (typeof window !== 'undefined' && !hasConsent())) {
  //   return null
  // }
  
  // Temporar: doar verific dacă e enabled și measurementId
  if (!enabled || !measurementId) {
    console.log('🚫 [GA4] Disabled or no measurement ID:', { enabled, measurementId })
    return null
  }
  
  console.log('✅ [GA4] Loading with ID:', measurementId)

  return (
    <>
      {/* Google Analytics Global Site Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📊 [GA4] Script loaded successfully')
        }}
        onError={(error) => {
          console.error('📊 [GA4] Script loading failed:', error)
        }}
      />
      
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent mode
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'granted',
              'personalization_storage': 'denied'
            });
            
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              // Enhanced ecommerce pentru luxury marketplace
              allow_google_signals: true,
              allow_ad_personalization_signals: false, // GDPR compliance
              
              // Performance și privacy
              send_page_view: true,
              anonymize_ip: true,
              respect_dnt: true,
              
              // Custom parameters pentru LuxBid
              custom_map: {
                'custom_parameter_1': 'user_type',
                'custom_parameter_2': 'listing_category', 
                'custom_parameter_3': 'brand_name',
                'custom_parameter_4': 'price_range'
              },
              
              // Enhanced measurement pentru luxury features
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: false,
                file_downloads: true
              },
              
              // Cookie settings pentru GDPR
              cookie_domain: 'auto',
              cookie_expires: 63072000, // 2 years
              cookie_update: true,
              cookie_flags: 'SameSite=None;Secure'
            });
            
            // Track initial page load
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'LuxBid',
              content_group2: 'Luxury Marketplace'
            });
            
            console.log('📊 [GA4] Initialized for LuxBid with ID: ${measurementId}');
          `
        }}
      />
    </>
  )
}

/**
 * Componenta pentru tracking-ul conversion-urilor (Enhanced Ecommerce)
 */
export function GoogleAnalyticsEcommerce() {
  useEffect(() => {
    // Enhanced Ecommerce events pentru luxury marketplace
    if (typeof window !== 'undefined' && window.gtag) {
      
      // Track luxury marketplace specific events
      const trackLuxuryMarketplaceEvents = () => {
        // Custom events pentru business metrics
        window.gtag('event', 'luxury_marketplace_loaded', {
          event_category: 'marketplace',
          event_label: 'initial_load',
          value: 1
        })
      }

      // Delay pentru a se asigura că GA e încărcat
      setTimeout(trackLuxuryMarketplaceEvents, 1000)
    }
  }, [])

  return null
}

/**
 * Componenta pentru debugging GA în development
 */
export function GoogleAnalyticsDebug() {
  const { analytics } = useAnalytics()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const testAnalytics = () => {
    // Test tracking events
    analytics.trackEvent({
      action: 'test_event',
      category: 'debug',
      label: 'analytics_test',
      value: 1
    })

    analytics.trackLuxuryEvent('test', {
      test_parameter: 'debug_mode',
      timestamp: new Date().toISOString()
    })

    console.log('📊 [GA4] Debug events sent')
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        right: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9998,
        maxWidth: '200px'
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: '600' }}>
        📊 GA4 Debug Panel
      </div>
      
      <div style={{ fontSize: '11px', marginBottom: '8px' }}>
        <div>Measurement ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not set'}</div>
        <div>Status: {typeof window !== 'undefined' && window.gtag ? '✅ Loaded' : '❌ Not loaded'}</div>
      </div>
      
      <button
        onClick={testAnalytics}
        style={{
          background: '#D09A1E',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Test Events
      </button>
    </div>
  )
}

/**
 * Higher-order component pentru automatic analytics tracking
 */
export function withAnalytics<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  trackingConfig?: {
    componentName?: string
    trackMount?: boolean
    trackProps?: string[]
  }
) {
  const config = {
    componentName: WrappedComponent.displayName || WrappedComponent.name || 'Unknown',
    trackMount: true,
    trackProps: [],
    ...trackingConfig
  }

  return function AnalyticsWrappedComponent(props: T) {
    const { trackUserAction } = useAnalytics()

    useEffect(() => {
      if (config.trackMount) {
        trackUserAction('component_mounted', 'component_lifecycle', {
          component_name: config.componentName
        })
      }
    }, [trackUserAction])

    // Track prop changes dacă sunt specificate
    useEffect(() => {
      if (config.trackProps && config.trackProps.length > 0) {
        const trackedProps = config.trackProps.reduce((acc, propName) => {
          if (propName in props) {
            acc[propName] = (props as any)[propName]
          }
          return acc
        }, {} as Record<string, any>)

        if (Object.keys(trackedProps).length > 0) {
          trackUserAction('component_props_changed', 'component_lifecycle', {
            component_name: config.componentName,
            props: trackedProps
          })
        }
      }
    }, [props, trackUserAction])

    return <WrappedComponent {...props} />
  }
}

/**
 * Hook pentru tracking performance cu GA integration
 */
export function useGAPerformanceTracking() {
  const { trackEvent } = useAnalytics()

  const trackWebVitals = (metric: {
    name: string
    value: number
    id: string
    delta: number
  }) => {
    trackEvent({
      action: 'web_vital',
      category: 'performance',
      label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_id: metric.id,
        metric_delta: metric.delta,
        page: window.location.pathname
      }
    })
  }

  return { trackWebVitals }
}
