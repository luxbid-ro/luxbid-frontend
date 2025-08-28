'use client'
import React, { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('luxbid_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        setShowBanner(true)
      }
    }
  }, [])

  const saveConsent = (accept: 'all' | 'necessary' | 'custom') => {
    let finalPreferences = { ...preferences }
    
    if (accept === 'all') {
      finalPreferences = {
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true
      }
    } else if (accept === 'necessary') {
      finalPreferences = {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false
      }
    }
    // For 'custom', use current preferences state

    localStorage.setItem('luxbid_cookie_consent', JSON.stringify(finalPreferences))
    localStorage.setItem('luxbid_cookie_consent_date', new Date().toISOString())
    
    setPreferences(finalPreferences)
    setShowBanner(false)
    setShowDetails(false)

    // Apply cookies based on consent
    applyCookieSettings(finalPreferences)
  }

  const applyCookieSettings = (settings: typeof preferences) => {
    // Here you would enable/disable tracking scripts based on settings
    console.log('🍪 Cookie settings applied:', settings)
    
    // Example: Google Analytics
    if (settings.analytics) {
      // Enable GA
      console.log('📊 Analytics cookies enabled')
    } else {
      // Disable GA
      console.log('📊 Analytics cookies disabled')
    }

    // Example: Marketing pixels
    if (settings.marketing) {
      console.log('📢 Marketing cookies enabled')
    } else {
      console.log('📢 Marketing cookies disabled')
    }
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner - Fixed bottom, minimal design */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderBottom: 'none',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
        padding: '16px',
        zIndex: 10000,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1a1a1a' }}>
              🍪 Utilizăm cookie-uri pentru o experiență optimă
            </p>
            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>
              Acest site folosește cookie-uri necesare pentru funcționare și opționale pentru analiză. 
              <button 
                onClick={() => setShowDetails(true)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#D09A1E', 
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '13px'
                }}
              >
                Vezi detalii
              </button>
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap',
            alignItems: 'center' 
          }}>
            <button
              onClick={() => saveConsent('necessary')}
              style={{
                background: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              Doar necesare
            </button>
            <button
              onClick={() => setShowDetails(true)}
              style={{
                background: 'none',
                border: '1px solid #D09A1E',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#D09A1E'
              }}
            >
              Personalizează
            </button>
            <button
              onClick={() => saveConsent('all')}
              style={{
                background: '#D09A1E',
                border: '1px solid #D09A1E',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              Accept toate
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showDetails && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '24px', 
              fontWeight: '700',
              color: '#1a1a1a'
            }}>
              Preferințe Cookie-uri
            </h2>
            
            <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.5' }}>
              Personalizează-ți experiența alegând ce tipuri de cookie-uri să fie active.
            </p>

            <div style={{ marginBottom: '24px' }}>
              {[
                {
                  key: 'necessary',
                  title: 'Cookie-uri necesare',
                  description: 'Esențiale pentru funcționarea site-ului. Nu pot fi dezactivate.',
                  required: true
                },
                {
                  key: 'functional',
                  title: 'Cookie-uri funcționale',
                  description: 'Îmbunătățesc funcționalitatea și personalizarea site-ului.',
                  required: false
                },
                {
                  key: 'analytics',
                  title: 'Cookie-uri de analiză',
                  description: 'Ne ajută să înțelegem cum folosești site-ul pentru îmbunătățiri.',
                  required: false
                },
                {
                  key: 'marketing',
                  title: 'Cookie-uri de marketing',
                  description: 'Folosite pentru a personaliza anunțurile și a măsura eficacitatea campaniilor.',
                  required: false
                }
              ].map((category) => (
                <div key={category.key} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '16px', 
                      fontWeight: '600',
                      color: '#1a1a1a'
                    }}>
                      {category.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      color: '#666',
                      lineHeight: '1.4'
                    }}>
                      {category.description}
                    </p>
                  </div>
                  <label style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '48px',
                    height: '24px',
                    marginTop: '2px'
                  }}>
                    <input
                      type="checkbox"
                      checked={preferences[category.key as keyof typeof preferences]}
                      disabled={category.required}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        [category.key]: e.target.checked
                      }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: category.required ? 'not-allowed' : 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: preferences[category.key as keyof typeof preferences] ? '#D09A1E' : '#ccc',
                      borderRadius: '24px',
                      transition: 'all 0.2s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: preferences[category.key as keyof typeof preferences] ? '27px' : '3px',
                        bottom: '3px',
                        background: '#fff',
                        borderRadius: '50%',
                        transition: 'all 0.2s'
                      }} />
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  color: '#333'
                }}
              >
                Anulează
              </button>
              <button
                onClick={() => saveConsent('custom')}
                style={{
                  background: '#D09A1E',
                  border: '1px solid #D09A1E',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
