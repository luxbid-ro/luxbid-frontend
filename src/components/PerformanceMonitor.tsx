'use client'

import { useEffect } from 'react'
import { usePerformanceMonitoring, usePerformanceReporting } from '@/hooks/usePerformanceMonitoring'
import { useGAPerformanceTracking } from '@/components/GoogleAnalytics'

interface PerformanceMonitorProps {
  enabled?: boolean
}

/**
 * Componenta pentru monitorizarea automată a performanțelor
 */
export default function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'production' 
}: PerformanceMonitorProps) {
  
  const {
    measureCoreWebVitals,
    measureResourceLoading,
    measureMemoryUsage,
    measureNetworkSpeed
  } = usePerformanceMonitoring(enabled)
  
  const { reportWebVitals } = usePerformanceReporting()
  const { trackWebVitals } = useGAPerformanceTracking()

  useEffect(() => {
    if (!enabled) return

    // Monitorizare automată la încărcarea paginii
    console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> [Performance Monitor] Activat pentru:', window.location.pathname)

    // Raportează web vitals la Next.js ȘI Google Analytics
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const handleMetric = (metric: any) => {
          reportWebVitals(metric)
          trackWebVitals(metric) // Trimite și la Google Analytics
        }
        
        getCLS(handleMetric)
        getFID(handleMetric)
        getFCP(handleMetric)
        getLCP(handleMetric)
        getTTFB(handleMetric)
      }).catch(() => {
        // Fallback dacă web-vitals nu e disponibil
        console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> [Performance] Web Vitals library not available')
      })
    }

    // Monitorizează memoria periodic (la fiecare 30 secunde)
    const memoryInterval = setInterval(() => {
      measureMemoryUsage()
    }, 30000)

    // Monitorizează resursele la load
    window.addEventListener('load', () => {
      setTimeout(() => {
        measureResourceLoading()
        measureNetworkSpeed()
      }, 2000)
    })

    return () => {
      clearInterval(memoryInterval)
    }
  }, [enabled, reportWebVitals, measureResourceLoading, measureMemoryUsage, measureNetworkSpeed])

  // Nu renderează nimic vizibil
  return null
}

/**
 * Componenta pentru debugging performanțe în development
 */
export function PerformanceDebugPanel() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const { measureMemoryUsage, measureNetworkSpeed } = usePerformanceMonitoring(true)

  const handleMeasureMemory = () => {
    const memory = measureMemoryUsage()
    if (memory) {
      alert(`Memorie folosită: ${memory.used}MB / ${memory.total}MB`)
    }
  }

  const handleMeasureNetwork = () => {
    const network = measureNetworkSpeed()
    if (network) {
      alert(`Conexiune: ${network.effectiveType}, Downlink: ${network.downlink}Mbps, RTT: ${network.rtt}ms`)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Performance Debug
      </div>
      
      <button
        onClick={handleMeasureMemory}
        style={{
          background: '#D09A1E',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer'
        }}
      >
        Check Memory
      </button>
      
      <button
        onClick={handleMeasureNetwork}
        style={{
          background: '#D09A1E',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer'
        }}
      >
        Check Network
      </button>
      
      <button
        onClick={() => {
          console.clear()
          window.location.reload()
        }}
        style={{
          background: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer'
        }}
      >
        Clear & Reload
      </button>
    </div>
  )
}
