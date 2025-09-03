'use client'
import React, { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: true, // Default: enabled (like Chrono24)
    analytics: true,  // Default: enabled (like Chrono24)
    marketing: true   // Default: enabled (like Chrono24)
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
    console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg> Cookie settings applied:', settings)
    
    // Example: Google Analytics
    if (settings.analytics) {
      // Enable GA
      console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Analytics cookies enabled')
    } else {
      // Disable GA
      console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Analytics cookies disabled')
    }

    // Example: Marketing pixels
    if (settings.marketing) {
      console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg> Marketing cookies enabled')
    } else {
      console.log('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg> Marketing cookies disabled')
    }
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Modal - Centered like Chrono24 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          padding: '32px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: '#1a1a1a'
          }}>
            Consimțământul tău pentru cea mai bună experiență LuxBid
          </h2>
          
          <p style={{
            margin: '0 0 16px 0',
            color: '#4a4a4a',
            lineHeight: '1.6'
          }}>
            Folosim cookie-uri și tehnologii similare pentru a ne asigura că serviciile noastre sunt de încredere și sigure. 
            De asemenea, folosim datele tale pentru a-ți arăta articole de lux relevante și publicitate personalizată.
          </p>
          
          <p style={{
            margin: '0 0 24px 0',
            color: '#666',
            fontSize: '13px',
            lineHeight: '1.5'
          }}>
            Deoarece suntem o platformă globală, anumite date personale sunt transferate în România. 
            Există riscul ca autoritățile guvernamentale să aibă acces la aceste informații. 
            Nu vindem informațiile tale către terți.
          </p>

          {!showDetails ? (
            <>
              <p style={{
                margin: '0 0 24px 0',
                color: '#666',
                fontSize: '13px'
              }}>
                Dacă selectezi "Doar cookie-uri necesare", vom folosi doar cookie-uri strict necesare, 
                deci din păcate nu vom putea să-ți oferim o experiență LuxBid personalizată. 
                Poți găsi mai multe informații despre protecția datelor în <a href="/legal/cookie-policy" style={{color: '#D09A1E', textDecoration: 'underline'}}>Politica Cookie</a>.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button
                  onClick={() => saveConsent('all')}
                  style={{
                    background: '#2c3e50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#34495e'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2c3e50'}
                >
                  OK
                </button>
                
                <button
                  onClick={() => saveConsent('necessary')}
                  style={{
                    background: 'transparent',
                    color: '#2c3e50',
                    border: '2px solid #2c3e50',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2c3e50'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#2c3e50'
                  }}
                >
                  Doar cookie-uri necesare
                </button>
                
                <button
                  onClick={() => setShowDetails(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textDecoration: 'underline',
                    padding: '8px 0'
                  }}
                >
                  Setări
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Detailed Settings */}
              <div style={{ marginBottom: '24px' }}>
                {[
                  {
                    key: 'necessary' as const,
                    title: 'Cookie-uri necesare',
                    description: 'Acestea sunt necesare pentru funcționarea site-ului și nu pot fi dezactivate.',
                    disabled: true
                  },
                  {
                    key: 'functional' as const,
                    title: 'Cookie-uri funcționale',
                    description: 'Îmbunătățesc funcționalitatea site-ului și experiența utilizatorului.',
                    disabled: false
                  },
                  {
                    key: 'analytics' as const,
                    title: 'Cookie-uri de analiză',
                    description: 'Ne ajută să înțelegem cum folosiți site-ul pentru a-l îmbunătăți.',
                    disabled: false
                  },
                  {
                    key: 'marketing' as const,
                    title: 'Cookie-uri de marketing',
                    description: 'Folosite pentru publicitate relevantă și măsurarea eficacității campaniilor.',
                    disabled: false
                  }
                ].map((cookie) => (
                  <div key={cookie.key} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ flex: 1, marginRight: '12px' }}>
                      <h4 style={{
                        margin: '0 0 4px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1a1a1a'
                      }}>
                        {cookie.title}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {cookie.description}
                      </p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: cookie.disabled ? 'not-allowed' : 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={preferences[cookie.key]}
                        disabled={cookie.disabled}
                        onChange={(e) => {
                          if (!cookie.disabled) {
                            setPreferences(prev => ({
                              ...prev,
                              [cookie.key]: e.target.checked
                            }))
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: preferences[cookie.key] ? '#D09A1E' : '#ccc',
                        borderRadius: '12px',
                        transition: 'background-color 0.2s',
                        opacity: cookie.disabled ? 0.6 : 1
                      }}>
                        <div style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: preferences[cookie.key] ? '23px' : '3px',
                          bottom: '3px',
                          background: '#fff',
                          borderRadius: '50%',
                          transition: 'left 0.2s'
                        }} />
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button
                  onClick={() => saveConsent('custom')}
                  style={{
                    background: '#2c3e50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#34495e'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2c3e50'}
                >
                  Salvează setările
                </button>
                
                <button
                  onClick={() => setShowDetails(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textDecoration: 'underline',
                    padding: '8px 0'
                  }}
                >
                  Înapoi
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}