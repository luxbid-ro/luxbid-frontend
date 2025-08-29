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
  
  if (!enabled || !measurementId) {
    return null
  }

  return (
    <>
      {/* Google Analytics Global Site Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="beforeInteractive"
        onLoad={() => {
          // GA4 script loaded
        }}
        onError={(error) => {
          // GA4 script failed to load
        }}
      />
      
      <Script
        id="google-analytics-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              send_page_view: true,
              anonymize_ip: true
            });
            
            // GA4 initialized for LuxBid
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

// GoogleAnalyticsDebug removed for production

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
