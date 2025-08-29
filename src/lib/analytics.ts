// Google Analytics 4 implementation for LuxBid
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface AnalyticsEvent {
  action: string
  category?: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface ConversionEvent {
  event_name: string
  currency?: string
  value?: number
  transaction_id?: string
  items?: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}

/**
 * Google Analytics 4 Configuration and Setup
 */
export class LuxBidAnalytics {
  private static instance: LuxBidAnalytics
  private gaId: string
  private isInitialized = false
  private debugMode = process.env.NODE_ENV === 'development'

  constructor() {
    this.gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
  }

  public static getInstance(): LuxBidAnalytics {
    if (!LuxBidAnalytics.instance) {
      LuxBidAnalytics.instance = new LuxBidAnalytics()
    }
    return LuxBidAnalytics.instance
  }

  /**
   * Initialize Google Analytics 4
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') {
      return
    }

    try {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`
      document.head.appendChild(script)

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }

      // Configure GA4
      window.gtag('js', new Date())
      window.gtag('config', this.gaId, {
        // Enhanced ecommerce pentru luxury marketplace
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        
        // Performance monitoring
        send_page_view: true,
        anonymize_ip: true,
        
        // Custom configuration pentru LuxBid
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'listing_category',
          'custom_parameter_3': 'brand_name',
          'custom_parameter_4': 'price_range'
        },

        // Cookie settings pentru GDPR compliance
        cookie_domain: 'auto',
        cookie_expires: 63072000, // 2 years
        cookie_update: true,
        cookie_flags: 'SameSite=None;Secure'
      })

      // Enhanced measurement pentru luxury marketplace
      window.gtag('config', this.gaId, {
        enhanced_measurement: {
          scrolls: true,
          outbound_clicks: true,
          site_search: true,
          video_engagement: true,
          file_downloads: true
        }
      })

      this.isInitialized = true
      
      if (this.debugMode) {
        console.log('📊 [GA4] LuxBid Analytics initialized successfully')
      }

      // Track initialization
      this.trackEvent({
        action: 'analytics_initialized',
        category: 'system',
        custom_parameters: {
          platform: 'web',
          version: '1.0.0'
        }
      })

    } catch (error) {
      console.error('📊 [GA4] Initialization failed:', error)
    }
  }

  /**
   * Track page views
   */
  public trackPageView(url: string, title?: string): void {
    if (!this.isInitialized || typeof window === 'undefined') return

    window.gtag('config', this.gaId, {
      page_title: title || document.title,
      page_location: url
    })

    if (this.debugMode) {
      console.log('📊 [GA4] Page view tracked:', { url, title })
    }
  }

  /**
   * Track custom events
   */
  public trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || typeof window === 'undefined') return

    const { action, category, label, value, custom_parameters } = event

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters
    })

    if (this.debugMode) {
      console.log('📊 [GA4] Event tracked:', event)
    }
  }

  /**
   * Track luxury marketplace specific events
   */
  public trackLuxuryEvent(eventType: string, data: Record<string, any>): void {
    this.trackEvent({
      action: `luxury_${eventType}`,
      category: 'luxury_marketplace',
      custom_parameters: {
        ...data,
        timestamp: new Date().toISOString()
      }
    })
  }

  /**
   * Track listing interactions
   */
  public trackListingEvent(action: 'view' | 'favorite' | 'share' | 'contact', listingData: {
    id: string
    title: string
    category: string
    brand?: string
    price?: number
    currency?: string
  }): void {
    this.trackEvent({
      action: `listing_${action}`,
      category: 'listings',
      label: listingData.title,
      value: listingData.price,
      custom_parameters: {
        listing_id: listingData.id,
        category: listingData.category,
        brand: listingData.brand,
        currency: listingData.currency
      }
    })
  }

  /**
   * Track search behavior
   */
  public trackSearch(query: string, results?: number, filters?: Record<string, any>): void {
    window.gtag('event', 'search', {
      search_term: query,
      results_count: results,
      filters_applied: JSON.stringify(filters)
    })
  }

  /**
   * Track offer submissions (conversion event)
   */
  public trackOfferSubmission(data: {
    listingId: string
    offerAmount: number
    currency: string
    category: string
    brand?: string
  }): void {
    // Enhanced ecommerce event
    window.gtag('event', 'add_to_cart', {
      currency: data.currency,
      value: data.offerAmount,
      items: [{
        item_id: data.listingId,
        item_name: 'Luxury Offer',
        category: data.category,
        quantity: 1,
        price: data.offerAmount,
        item_brand: data.brand
      }]
    })

    // Custom conversion tracking
    this.trackEvent({
      action: 'offer_submitted',
      category: 'conversions',
      value: data.offerAmount,
      custom_parameters: {
        listing_id: data.listingId,
        currency: data.currency,
        category: data.category,
        brand: data.brand
      }
    })
  }

  /**
   * Track user registration
   */
  public trackRegistration(method: 'email' | 'google' | 'facebook'): void {
    window.gtag('event', 'sign_up', {
      method: method
    })

    this.trackEvent({
      action: 'user_registration',
      category: 'user_lifecycle',
      label: method
    })
  }

  /**
   * Track login
   */
  public trackLogin(method: 'email' | 'google' | 'facebook'): void {
    window.gtag('event', 'login', {
      method: method
    })
  }

  /**
   * Track listing creation
   */
  public trackListingCreation(listingData: {
    category: string
    brand?: string
    price?: number
    currency?: string
  }): void {
    this.trackEvent({
      action: 'listing_created',
      category: 'user_engagement',
      value: listingData.price,
      custom_parameters: {
        category: listingData.category,
        brand: listingData.brand,
        currency: listingData.currency,
        has_price: !!listingData.price
      }
    })
  }

  /**
   * Track performance metrics integration
   */
  public trackPerformanceMetric(metricName: string, value: number): void {
    this.trackEvent({
      action: 'performance_metric',
      category: 'web_vitals',
      label: metricName,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metricName,
        page: window.location.pathname
      }
    })
  }

  /**
   * Track errors and exceptions
   */
  public trackError(error: Error | string, context?: string): void {
    window.gtag('event', 'exception', {
      description: typeof error === 'string' ? error : error.message,
      fatal: false,
      context: context
    })

    this.trackEvent({
      action: 'error_occurred',
      category: 'errors',
      label: context || 'unknown',
      custom_parameters: {
        error_message: typeof error === 'string' ? error : error.message,
        page: window.location.pathname
      }
    })
  }

  /**
   * Set user properties
   */
  public setUserProperties(properties: {
    user_type?: 'buyer' | 'seller' | 'both'
    preferred_category?: string
    price_range?: string
    signup_date?: string
  }): void {
    window.gtag('set', {
      user_properties: properties
    })
  }

  /**
   * Track conversion value
   */
  public trackConversion(conversionData: ConversionEvent): void {
    window.gtag('event', conversionData.event_name, {
      currency: conversionData.currency || 'RON',
      value: conversionData.value,
      transaction_id: conversionData.transaction_id,
      items: conversionData.items
    })
  }

  /**
   * Enable/disable analytics based on user consent
   */
  public setConsentMode(consentState: {
    analytics_storage: 'granted' | 'denied'
    ad_storage: 'granted' | 'denied'
    functionality_storage: 'granted' | 'denied'
    personalization_storage: 'granted' | 'denied'
  }): void {
    window.gtag('consent', 'update', consentState)
  }

  /**
   * Get analytics instance for external use
   */
  public getGA(): typeof window.gtag | null {
    return this.isInitialized ? window.gtag : null
  }
}

// Export singleton instance
export const analytics = LuxBidAnalytics.getInstance()

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  analytics.initialize()
}

// Export helper functions for easy use
export const trackPageView = (url: string, title?: string) => analytics.trackPageView(url, title)
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event)
export const trackLuxuryEvent = (eventType: string, data: Record<string, any>) => analytics.trackLuxuryEvent(eventType, data)
export const trackSearch = (query: string, results?: number, filters?: Record<string, any>) => analytics.trackSearch(query, results, filters)
export const trackError = (error: Error | string, context?: string) => analytics.trackError(error, context)
