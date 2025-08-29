'use client'

import { useEffect, useCallback } from 'react'

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
}

interface ResourceTiming {
  name: string
  size: number
  duration: number
  type: string
}

/**
 * Hook pentru monitorizarea performanțelor
 */
export function usePerformanceMonitoring(enabled: boolean = true) {
  
  // Măsoară Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcp) {
        console.log('🎯 [Performance] First Contentful Paint:', `${Math.round(fcp.startTime)}ms`)
        logMetric('FCP', fcp.startTime)
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        console.log('🎯 [Performance] Largest Contentful Paint:', `${Math.round(lastEntry.startTime)}ms`)
        logMetric('LCP', lastEntry.startTime)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      if (clsValue > 0) {
        console.log('🎯 [Performance] Cumulative Layout Shift:', clsValue.toFixed(4))
        logMetric('CLS', clsValue)
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        console.log('🎯 [Performance] First Input Delay:', `${Math.round(entry.processingStart - entry.startTime)}ms`)
        logMetric('FID', entry.processingStart - entry.startTime)
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      clsObserver.disconnect()
      fidObserver.disconnect()
    }
  }, [enabled])

  // Măsoară timpii de încărcare resurse
  const measureResourceLoading = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const resourceMetrics: ResourceTiming[] = []

    resources.forEach((resource) => {
      // Calculează dimensiunea aproximativă
      const size = resource.transferSize || resource.encodedBodySize || 0
      const duration = resource.responseEnd - resource.requestStart

      resourceMetrics.push({
        name: resource.name,
        size,
        duration,
        type: getResourceType(resource.name)
      })
    })

    // Grupează și analizează
    const analysis = analyzeResources(resourceMetrics)
    console.log('📊 [Performance] Resource Analysis:', analysis)

    return analysis
  }, [enabled])

  // Măsoară performanța JavaScript
  const measureJavaScriptPerformance = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    const measure = (name: string, fn: () => void) => {
      const start = performance.now()
      fn()
      const end = performance.now()
      const duration = end - start
      console.log(`⚡ [Performance] ${name}:`, `${duration.toFixed(2)}ms`)
      logMetric(`JS_${name}`, duration)
      return duration
    }

    return { measure }
  }, [enabled])

  // Măsoară utilizarea memoriei
  const measureMemoryUsage = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    // @ts-ignore - performance.memory nu e standardizat
    const memory = (performance as any).memory
    if (memory) {
      const memoryInfo = {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      }
      
      console.log('🧠 [Performance] Memory Usage:', memoryInfo)
      logMetric('Memory_Used', memoryInfo.used)
      
      return memoryInfo
    }
  }, [enabled])

  // Măsoară viteza conexiunii
  const measureNetworkSpeed = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return

    // @ts-ignore - navigator.connection nu e standardizat
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    
    if (connection) {
      const networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      }
      
      console.log('🌐 [Performance] Network Info:', networkInfo)
      logMetric('Network_Downlink', connection.downlink)
      logMetric('Network_RTT', connection.rtt)
      
      return networkInfo
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    // Măsoară la încărcarea paginii
    const cleanup = measureCoreWebVitals()
    
    // Măsoară resursele după load
    window.addEventListener('load', () => {
      setTimeout(() => {
        measureResourceLoading()
        measureMemoryUsage()
        measureNetworkSpeed()
      }, 1000)
    })

    return cleanup
  }, [enabled, measureCoreWebVitals, measureResourceLoading, measureMemoryUsage, measureNetworkSpeed])

  return {
    measureCoreWebVitals,
    measureResourceLoading,
    measureJavaScriptPerformance,
    measureMemoryUsage,
    measureNetworkSpeed
  }
}

// Helper functions
function getResourceType(url: string): string {
  if (url.includes('.js')) return 'JavaScript'
  if (url.includes('.css')) return 'CSS'
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) return 'Image'
  if (url.includes('.woff') || url.includes('.ttf')) return 'Font'
  if (url.includes('_next/static')) return 'Static'
  return 'Other'
}

function analyzeResources(resources: ResourceTiming[]) {
  const byType = resources.reduce((acc, resource) => {
    const type = resource.type
    if (!acc[type]) {
      acc[type] = { count: 0, totalSize: 0, totalDuration: 0 }
    }
    acc[type].count++
    acc[type].totalSize += resource.size
    acc[type].totalDuration += resource.duration
    return acc
  }, {} as Record<string, { count: number; totalSize: number; totalDuration: number }>)

  // Găsește resursele cele mai lente
  const slowestResources = resources
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5)
    .map(r => ({
      name: r.name.split('/').pop() || 'Unknown',
      duration: Math.round(r.duration),
      size: Math.round(r.size / 1024) // KB
    }))

  // Calculează totalurile
  const totals = {
    count: resources.length,
    totalSize: Math.round(resources.reduce((sum, r) => sum + r.size, 0) / 1024), // KB
    averageDuration: Math.round(resources.reduce((sum, r) => sum + r.duration, 0) / resources.length)
  }

  return {
    byType,
    slowestResources,
    totals
  }
}

function logMetric(name: string, value: number) {
  // În development mode, log doar în consolă
  if (process.env.NODE_ENV === 'development') {
    console.log(`📈 [Metric] ${name}:`, value)
    return
  }

  // În production, trimite la serviciu de analytics
  // Poți integra cu Google Analytics, Sentry, etc.
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'performance_metric', {
      metric_name: name,
      metric_value: value,
      custom_parameter: window.location.pathname
    })
  }
}

/**
 * Hook pentru monitorizarea performanțelor de la distanță
 */
export function usePerformanceReporting() {
  const reportWebVitals = useCallback((metric: any) => {
    console.log('📊 [Web Vitals]', metric)
    
    // Trimite la analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_delta: metric.delta
      })
    }
  }, [])

  return { reportWebVitals }
}

/**
 * Hook pentru detectarea problemelor de performanță
 */
export function usePerformanceAlerts(thresholds: {
  lcp?: number
  fcp?: number
  cls?: number
  fid?: number
}) {
  const checkThresholds = useCallback((metric: string, value: number) => {
    const limits = {
      lcp: thresholds.lcp || 2500, // 2.5s
      fcp: thresholds.fcp || 1800, // 1.8s
      cls: thresholds.cls || 0.1,  // 0.1
      fid: thresholds.fid || 100   // 100ms
    }

    const limit = limits[metric.toLowerCase() as keyof typeof limits]
    if (limit && value > limit) {
      console.warn(`⚠️ [Performance Alert] ${metric.toUpperCase()} exceeded threshold:`, {
        value,
        limit,
        page: window.location.pathname
      })
      
      // Poți trimite alertă la serviciu de monitoring
      return true
    }
    
    return false
  }, [thresholds])

  return { checkThresholds }
}
