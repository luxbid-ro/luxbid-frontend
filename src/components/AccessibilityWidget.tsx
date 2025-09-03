'use client'

import React, { useState, useEffect } from 'react'

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 'normal', // small, normal, large, xl
    contrast: 'normal', // normal, high
    colorBlind: 'none', // none, deuteranopia, protanopia, tritanopia
    animations: true,
    underlineLinks: false,
    readableFont: false
  })

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility_settings')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load accessibility settings:', e)
      }
    }
  }, [])

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement

    // Font size
    const fontSizeMap = {
      small: '0.9',
      normal: '1',
      large: '1.1',
      xl: '1.25'
    }
    root.style.setProperty('--accessibility-font-scale', fontSizeMap[settings.fontSize])

    // High contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Color blind support
    root.classList.remove('deuteranopia', 'protanopia', 'tritanopia')
    if (settings.colorBlind !== 'none') {
      root.classList.add(settings.colorBlind)
    }

    // Animations
    if (!settings.animations) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Underline links
    if (settings.underlineLinks) {
      root.classList.add('underline-links')
    } else {
      root.classList.remove('underline-links')
    }

    // Readable font
    if (settings.readableFont) {
      root.classList.add('readable-font')
    } else {
      root.classList.remove('readable-font')
    }

    // Save to localStorage
    localStorage.setItem('accessibility_settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      contrast: 'normal',
      colorBlind: 'none',
      animations: true,
      underlineLinks: false,
      readableFont: false
    })
  }

  return (
    <>
      {/* CSS pentru accessibility */}
      <style jsx global>{`
        :root {
          --accessibility-font-scale: 1;
        }

        body {
          font-size: calc(16px * var(--accessibility-font-scale));
        }

        h1 { font-size: calc(2.5rem * var(--accessibility-font-scale)); }
        h2 { font-size: calc(2rem * var(--accessibility-font-scale)); }
        h3 { font-size: calc(1.75rem * var(--accessibility-font-scale)); }
        h4 { font-size: calc(1.5rem * var(--accessibility-font-scale)); }
        h5 { font-size: calc(1.25rem * var(--accessibility-font-scale)); }
        h6 { font-size: calc(1rem * var(--accessibility-font-scale)); }

        /* High contrast mode */
        .high-contrast {
          filter: contrast(150%);
        }

        .high-contrast * {
          border-color: #000 !important;
        }

        .high-contrast a {
          color: #0000ff !important;
          background: #ffff00 !important;
          text-decoration: underline !important;
        }

        .high-contrast button {
          background: #000 !important;
          color: #fff !important;
          border: 2px solid #fff !important;
        }

        /* Color blind support */
        .deuteranopia {
          filter: sepia(0.8) hue-rotate(143deg) saturate(0.7);
        }

        .protanopia {
          filter: sepia(0.6) hue-rotate(200deg) saturate(0.8);
        }

        .tritanopia {
          filter: sepia(0.9) hue-rotate(300deg) saturate(0.6);
        }

        /* Reduce motion */
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        /* Underline links */
        .underline-links a {
          text-decoration: underline !important;
        }

        /* Readable font */
        .readable-font * {
          font-family: 'Arial', 'Helvetica', sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em !important;
        }

        /* Focus indicators */
        *:focus {
          outline: 3px solid #D09A1E !important;
          outline-offset: 2px !important;
        }

        /* Skip link */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #D09A1E;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 10000;
        }

        .skip-link:focus {
          top: 6px;
        }
      `}</style>

      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Sari la conținutul principal
      </a>

      {/* Accessibility widget button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#D09A1E',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Deschide opțiunile de accesibilitate"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M9 10h6m-6 4h6m4-11h-1a2 2 0 0 0-2 2v1m4 0h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1m-4 0H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"/>
</svg>
      </button>

      {/* Accessibility panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            width: '320px',
            maxHeight: '500px',
            overflow: 'auto',
            zIndex: 1001,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            fontFamily: 'Inter, sans-serif'
          }}
          role="dialog"
          aria-label="Panou accesibilitate"
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0', color: '#1a1a1a', fontSize: '18px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M9 10h6m-6 4h6m4-11h-1a2 2 0 0 0-2 2v1m4 0h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1m-4 0H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"/>
</svg> Accesibilitate
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#999'
              }}
              aria-label="Închide panoul"
            >
              ×
            </button>
          </div>

          {/* Font size */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#333'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M12 19l7-7 3 3-7-7-3 3 7 7-3 3z"/>
  <path d="M11 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/>
  <line x1="9" y1="12" x2="15" y2="12"/>
</svg> Mărimea textului:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { value: 'small', label: 'Mic' },
                { value: 'normal', label: 'Normal' },
                { value: 'large', label: 'Mare' },
                { value: 'xl', label: 'Foarte mare' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateSetting('fontSize', option.value)}
                  style={{
                    padding: '6px 12px',
                    border: settings.fontSize === option.value ? '2px solid #D09A1E' : '1px solid #ddd',
                    borderRadius: '6px',
                    background: settings.fontSize === option.value ? '#fff9f2' : '#fff',
                    color: settings.fontSize === option.value ? '#D09A1E' : '#333',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#333'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m16.24-3.76l-4.24 4.24m-6-6L3.76 7.76"/>
</svg> Contrast:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'Înalt' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateSetting('contrast', option.value)}
                  style={{
                    padding: '6px 12px',
                    border: settings.contrast === option.value ? '2px solid #D09A1E' : '1px solid #ddd',
                    borderRadius: '6px',
                    background: settings.contrast === option.value ? '#fff9f2' : '#fff',
                    color: settings.contrast === option.value ? '#D09A1E' : '#333',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color blind support */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#333'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
</svg> Suport daltonism:
            </label>
            <select
              value={settings.colorBlind}
              onChange={(e) => updateSetting('colorBlind', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="none">Fără ajustări</option>
              <option value="deuteranopia">Deuteranopie (verde-roșu)</option>
              <option value="protanopia">Protanopie (roșu-verde)</option>
              <option value="tritanopia">Tritanopie (albastru-galben)</option>
            </select>
          </div>

          {/* Toggle options */}
          <div style={{ marginBottom: '20px' }}>
            {[
              { key: 'animations', label: '🎬 Animații', checked: settings.animations },
              { key: 'underlineLinks', label: '🔗 Subliniază link-urile', checked: settings.underlineLinks },
              { key: 'readableFont', label: '📖 Font ușor de citit', checked: settings.readableFont }
            ].map(option => (
              <label
                key={option.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={(e) => updateSetting(option.key, e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>{option.label}</span>
              </label>
            ))}
          </div>

          {/* Reset button */}
          <button
            onClick={resetSettings}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #dc3545',
              borderRadius: '6px',
              background: '#fff',
              color: '#dc3545',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <polyline points="23,4 23,10 17,10"/>
  <polyline points="1,20 1,14 7,14"/>
  <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15"/>
</svg> Resetează setările
          </button>

          {/* Info */}
          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '6px',
            padding: '12px',
            marginTop: '16px',
            fontSize: '12px',
            color: '#0c5460'
          }}>
            <strong>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
  Info:
</strong> Setările sunt salvate automat și vor fi aplicate la viitoarele vizite.
          </div>
        </div>
      )}
    </>
  )
}
