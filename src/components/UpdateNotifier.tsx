'use client'
import React from 'react'
import { useCacheManager, useAppleCacheBuster } from '../hooks/useCacheManager'

export default function UpdateNotifier() {
  const { cacheStatus, forceRefresh } = useCacheManager()
  
  // Activează Apple cache buster
  useAppleCacheBuster()

  // Nu afișa notificarea dacă nu e disponibil update
  if (!cacheStatus.isUpdateAvailable) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #D09A1E, #B8851A)',
      color: 'white',
      padding: '12px 20px',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
          <path d="M12 3v9l4 4"/>
        </svg>
        <div>
          <div style={{ fontWeight: '600', fontSize: '14px' }}>
            Update disponibil!
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            O versiune nouă a site-ului este disponibilă
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={forceRefresh}
          disabled={cacheStatus.isUpdating}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: cacheStatus.isUpdating ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            if (!cacheStatus.isUpdating) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
          }}
        >
          {cacheStatus.isUpdating ? (
            <>
              <div style={{
                width: '12px',
                height: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Se actualizează...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              Actualizează acum
            </>
          )}
        </button>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
