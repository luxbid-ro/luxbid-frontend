import { useState, useEffect, useCallback } from 'react'

export interface PriceAlert {
  id: string
  listingId: string
  listingTitle: string
  currentPrice: number
  targetPrice: number
  currency: string
  category: string
  brand?: string
  createdAt: string
  isActive: boolean
  notificationType: 'email' | 'push' | 'both'
  userEmail?: string
}

export const usePriceAlerts = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [loading, setLoading] = useState(true)
  
  const getStorageKey = (suffix: string) => {
    if (typeof window === 'undefined') return `luxbid_${suffix}_server`
    
    const token = localStorage.getItem('luxbid_token')
    const userId = token ? token.substring(0, 8) : 'guest'
    return `luxbid_${suffix}_${userId}`
  }

  // Load alerts from localStorage (SSR safe)
  useEffect(() => {
    const loadAlerts = () => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false)
          return
        }

        const savedAlerts = localStorage.getItem(getStorageKey('price_alerts'))
        if (savedAlerts) {
          const parsedAlerts = JSON.parse(savedAlerts)
          setAlerts(parsedAlerts)
        }
      } catch (error) {
        console.error('Error loading price alerts:', error)
        setAlerts([])
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  // Save alerts to localStorage (SSR safe)
  const saveAlerts = useCallback((newAlerts: PriceAlert[]) => {
    try {
      if (typeof window === 'undefined') return

      localStorage.setItem(getStorageKey('price_alerts'), JSON.stringify(newAlerts))
      setAlerts(newAlerts)
    } catch (error) {
      console.error('Error saving price alerts:', error)
    }
  }, [])

  // Create new price alert
  const createAlert = useCallback((alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'isActive'>) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    const newAlerts = [...alerts, newAlert]
    saveAlerts(newAlerts)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'price_alert_created', {
        event_category: 'engagement',
        event_label: alertData.listingId,
        custom_parameter_1: alertData.category,
        custom_parameter_2: alertData.brand || 'unknown',
        value: alertData.targetPrice
      })
    }

    return newAlert
  }, [alerts, saveAlerts])

  // Update alert
  const updateAlert = useCallback((alertId: string, updates: Partial<PriceAlert>) => {
    const newAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, ...updates } : alert
    )
    saveAlerts(newAlerts)
  }, [alerts, saveAlerts])

  // Delete alert
  const deleteAlert = useCallback((alertId: string) => {
    const newAlerts = alerts.filter(alert => alert.id !== alertId)
    saveAlerts(newAlerts)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'price_alert_deleted', {
        event_category: 'engagement',
        event_label: alertId
      })
    }
  }, [alerts, saveAlerts])

  // Toggle alert active status
  const toggleAlert = useCallback((alertId: string) => {
    const newAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    )
    saveAlerts(newAlerts)
  }, [alerts, saveAlerts])

  // Check if alert exists for listing
  const hasAlertForListing = useCallback((listingId: string) => {
    return alerts.some(alert => alert.listingId === listingId && alert.isActive)
  }, [alerts])

  // Get alert for listing
  const getAlertForListing = useCallback((listingId: string) => {
    return alerts.find(alert => alert.listingId === listingId)
  }, [alerts])

  // Clear all alerts
  const clearAllAlerts = useCallback(() => {
    saveAlerts([])
  }, [saveAlerts])

  // Get active alerts count
  const activeAlertsCount = alerts.filter(alert => alert.isActive).length

  // Simulate price check (in real app, this would be API call)
  const checkPriceAlerts = useCallback(async () => {
    const activeAlerts = alerts.filter(alert => alert.isActive)
    
    for (const alert of activeAlerts) {
      try {
        // Simulate API call to get current price
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
        const response = await fetch(`${apiUrl}/listings/${alert.listingId}`)
        
        if (response.ok) {
          const listing = await response.json()
          const currentPrice = listing.price
          
          // Check if price target is reached
          if (currentPrice <= alert.targetPrice) {
            // Trigger notification
            await triggerPriceAlertNotification(alert, currentPrice)
            
            // Mark alert as triggered (optional - could keep active for further drops)
            updateAlert(alert.id, { currentPrice })
          } else {
            // Update current price
            updateAlert(alert.id, { currentPrice })
          }
        }
      } catch (error) {
        console.error(`Error checking price for alert ${alert.id}:`, error)
      }
    }
  }, [alerts, updateAlert])

  // Trigger price alert notification
  const triggerPriceAlertNotification = useCallback(async (alert: PriceAlert, currentPrice: number) => {
    const message = `🚨 Alertă Preț! ${alert.listingTitle} a ajuns la ${currentPrice.toLocaleString('ro-RO')} ${alert.currency} (ținta: ${alert.targetPrice.toLocaleString('ro-RO')} ${alert.currency})`
    
    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('LuxBid - Alertă Preț', {
        body: message,
        icon: '/favicon.ico',
        tag: alert.id
      })
    }

    // Show in-app notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('priceAlertTriggered', {
        detail: { alert, currentPrice, message }
      })
      window.dispatchEvent(event)
    }

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'price_alert_triggered', {
        event_category: 'engagement',
        event_label: alert.listingId,
        value: currentPrice
      })
    }
  }, [])

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return Notification.permission === 'granted'
  }, [])

  return {
    alerts,
    loading,
    activeAlertsCount,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    hasAlertForListing,
    getAlertForListing,
    clearAllAlerts,
    checkPriceAlerts,
    requestNotificationPermission
  }
}

export default usePriceAlerts
