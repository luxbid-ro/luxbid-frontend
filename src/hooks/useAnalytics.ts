'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/analytics'

interface UseAnalyticsOptions {
  trackPageViews?: boolean
  trackErrors?: boolean
  trackPerformance?: boolean
}

/**
 * Hook pentru integrarea Google Analytics în componente React
 */
export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    trackPageViews = true,
    trackErrors = true,
    trackPerformance = true
  } = options

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousPath = useRef<string>('')

  // Track page views automat
  useEffect(() => {
    if (!trackPageViews) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Evită track-ul dublat pentru aceeași pagină
    if (url !== previousPath.current) {
      previousPath.current = url
      
      // Delay pentru a permite încărcarea completă
      const timer = setTimeout(() => {
        analytics.trackPageView(url, document.title)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams, trackPageViews])

  // Track performance metrics
  useEffect(() => {
    if (!trackPerformance) return

    // Integrează cu performance monitoring
    const handlePerformanceMetric = (entry: PerformanceEntry) => {
      if (entry.entryType === 'measure') {
        analytics.trackPerformanceMetric(entry.name, entry.duration)
      }
    }

    // Observer pentru performance entries
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(handlePerformanceMetric)
      })
      
      observer.observe({ entryTypes: ['measure', 'navigation'] })
      
      return () => observer.disconnect()
    }
  }, [trackPerformance])

  // Track errors automat
  useEffect(() => {
    if (!trackErrors) return

    const handleError = (event: ErrorEvent) => {
      analytics.trackError(event.error || event.message, 'javascript_error')
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError(`Unhandled Promise Rejection: ${event.reason}`, 'promise_rejection')
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [trackErrors])

  // Helper functions pentru tracking specific
  const trackListing = useCallback((action: 'view' | 'favorite' | 'share' | 'contact', listingData: {
    id: string
    title: string
    category: string
    brand?: string
    price?: number
    currency?: string
  }) => {
    analytics.trackListingEvent(action, listingData)
  }, [])

  const trackSearch = useCallback((query: string, results?: number, filters?: Record<string, any>) => {
    analytics.trackSearch(query, results, filters)
  }, [])

  const trackOfferSubmission = useCallback((data: {
    listingId: string
    offerAmount: number
    currency: string
    category: string
    brand?: string
  }) => {
    analytics.trackOfferSubmission(data)
  }, [])

  const trackUserAction = useCallback((action: string, category: string = 'user_interaction', data?: Record<string, any>) => {
    analytics.trackEvent({
      action,
      category,
      custom_parameters: {
        page: pathname,
        ...data
      }
    })
  }, [pathname])

  const trackConversion = useCallback((value: number, currency: string = 'RON', transactionId?: string) => {
    analytics.trackConversion({
      event_name: 'purchase',
      currency,
      value,
      transaction_id: transactionId
    })
  }, [])

  return {
    // Core tracking functions
    trackListing,
    trackSearch,
    trackOfferSubmission,
    trackUserAction,
    trackConversion,
    
    // Utility functions
    trackEvent: analytics.trackEvent.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    setUserProperties: analytics.setUserProperties.bind(analytics),
    
    // Analytics instance
    analytics
  }
}

/**
 * Hook pentru tracking specific luxury marketplace
 */
export function useLuxuryAnalytics() {
  const { trackListing, trackUserAction, trackOfferSubmission } = useAnalytics()

  const trackBrandView = useCallback((brand: string, category: string) => {
    trackUserAction('brand_page_view', 'brand_engagement', {
      brand,
      category
    })
  }, [trackUserAction])

  const trackCategoryView = useCallback((category: string) => {
    trackUserAction('category_view', 'category_engagement', {
      category
    })
  }, [trackUserAction])

  const trackPriceFilter = useCallback((minPrice: number, maxPrice: number, currency: string = 'RON') => {
    trackUserAction('price_filter_applied', 'search_behavior', {
      min_price: minPrice,
      max_price: maxPrice,
      currency
    })
  }, [trackUserAction])

  const trackImageZoom = useCallback((listingId: string) => {
    trackUserAction('image_zoom', 'listing_engagement', {
      listing_id: listingId
    })
  }, [trackUserAction])

  const trackImageGalleryNavigation = useCallback((listingId: string, imageIndex: number) => {
    trackUserAction('gallery_navigation', 'listing_engagement', {
      listing_id: listingId,
      image_index: imageIndex
    })
  }, [trackUserAction])

  const trackChatInitiation = useCallback((listingId: string, sellerUserId: string) => {
    trackUserAction('chat_initiated', 'communication', {
      listing_id: listingId,
      seller_user_id: sellerUserId
    })
  }, [trackUserAction])

  const trackListingShare = useCallback((listingId: string, method: 'copy_link' | 'whatsapp' | 'email' | 'facebook') => {
    trackUserAction('listing_shared', 'social_sharing', {
      listing_id: listingId,
      share_method: method
    })
  }, [trackUserAction])

  return {
    trackBrandView,
    trackCategoryView,
    trackPriceFilter,
    trackImageZoom,
    trackImageGalleryNavigation,
    trackChatInitiation,
    trackListingShare,
    trackListing,
    trackOfferSubmission
  }
}

/**
 * Hook pentru consent management (GDPR compliance)
 */
export function useAnalyticsConsent() {
  const setConsent = useCallback((consentState: {
    analytics: boolean
    marketing: boolean
    functional: boolean
    personalization: boolean
  }) => {
    analytics.setConsentMode({
      analytics_storage: consentState.analytics ? 'granted' : 'denied',
      ad_storage: consentState.marketing ? 'granted' : 'denied',
      functionality_storage: consentState.functional ? 'granted' : 'denied',
      personalization_storage: consentState.personalization ? 'granted' : 'denied'
    })

    // Store consent în localStorage pentru persistență
    localStorage.setItem('luxbid_analytics_consent', JSON.stringify(consentState))
  }, [])

  const getConsent = useCallback(() => {
    try {
      const stored = localStorage.getItem('luxbid_analytics_consent')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }, [])

  const hasConsent = useCallback(() => {
    const consent = getConsent()
    return consent?.analytics === true
  }, [getConsent])

  return {
    setConsent,
    getConsent,
    hasConsent
  }
}

/**
 * Hook pentru performance tracking integration
 */
export function usePerformanceAnalytics() {
  const { analytics: analyticsInstance } = useAnalytics({ trackPerformance: true })

  const trackWebVital = useCallback((metric: {
    name: string
    value: number
    id: string
    delta: number
  }) => {
    analyticsInstance.trackPerformanceMetric(metric.name, metric.value)
  }, [analyticsInstance])

  const trackLoadTime = useCallback((componentName: string, loadTime: number) => {
    analyticsInstance.trackEvent({
      action: 'component_load_time',
      category: 'performance',
      label: componentName,
      value: Math.round(loadTime),
      custom_parameters: {
        component_name: componentName,
        page: window.location.pathname
      }
    })
  }, [analyticsInstance])

  const trackBundleLoad = useCallback((bundleName: string, size: number) => {
    analyticsInstance.trackEvent({
      action: 'bundle_loaded',
      category: 'performance',
      label: bundleName,
      value: size,
      custom_parameters: {
        bundle_name: bundleName,
        bundle_size: size
      }
    })
  }, [analyticsInstance])

  return {
    trackWebVital,
    trackLoadTime,
    trackBundleLoad
  }
}
