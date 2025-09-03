'use client'

import React from 'react'
import { useServiceWorkerUpdate } from '@/hooks/useServiceWorker'

export default function UpdateNotification() {
  const { updateAvailable, applyUpdate, dismissUpdate } = useServiceWorkerUpdate()

  if (!updateAvailable) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #D09A1E 0%, #F4C430 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        maxWidth: '350px',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'slideInUp 0.3s ease-out'
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '16px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
                          <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </span>
          Actualizare Disponibilă
        </h4>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          opacity: 0.9,
          lineHeight: '1.4'
        }}>
          O versiune nouă a platformei LuxBid este disponibilă cu îmbunătățiri de performanță și funcții noi.
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px',
        alignItems: 'center' 
      }}>
        <button
          onClick={applyUpdate}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
          }}
        >
          Actualizează Acum
        </button>
        
        <button
          onClick={dismissUpdate}
          style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.8)',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,1)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Mai Târziu
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Componenta pentru debugging cache-ul în development
 */
export function CacheDebugPanel() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9998,
        maxWidth: '300px'
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: '600' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  <polyline points="7.5,4.27 16.5,9.42"/>
  <polyline points="7.5,9.42 16.5,4.27"/>
  <polyline points="12,9.42 12,14.58"/>
</svg> Service Worker Status
      </div>
      <ServiceWorkerStatus />
    </div>
  )
}

function ServiceWorkerStatus() {
  const { 
    isSupported, 
    isRegistered, 
    isControlling, 
    error 
  } = useServiceWorkerUpdate()

  return (
    <div style={{ fontSize: '11px' }}>
                      <div>Supported: {isSupported ? 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#22c55e' }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg> : 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#dc3545' }}>
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>}</div>
                      <div>Registered: {isRegistered ? 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#22c55e' }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg> : 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#dc3545' }}>
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>}</div>
                      <div>Controlling: {isControlling ? 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#22c55e' }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg> : 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#dc3545' }}>
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>}</div>
      {error && <div style={{ color: '#ff4444' }}>Error: {error}</div>}
    </div>
  )
}
