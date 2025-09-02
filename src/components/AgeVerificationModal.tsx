'use client'

import React, { useState, useEffect } from 'react'

export default function AgeVerificationModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [birthDate, setBirthDate] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem('age_verified')
    const verificationDate = localStorage.getItem('age_verification_date')
    
    if (!ageVerified || !verificationDate) {
      setIsVisible(true)
    } else {
      // Check if verification is older than 30 days
      const verificationTime = new Date(verificationDate).getTime()
      const now = Date.now()
      const thirtyDays = 30 * 24 * 60 * 60 * 1000
      
      if (now - verificationTime > thirtyDays) {
        setIsVisible(true)
      }
    }
  }, [])

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setBirthDate(date)
    setError('')
    
    if (date) {
      const age = calculateAge(date)
      if (age < 13) {
        setError('Trebuie să aveți cel puțin 13 ani pentru a utiliza această platformă.')
        setIsValid(false)
      } else if (age < 16) {
        setError('Pentru utilizatorii sub 16 ani este necesar consimțământul părinților.')
        setIsValid(false)
      } else if (age < 18) {
        setError('Pentru utilizatorii sub 18 ani este necesar consimțământul părinților pentru anumite funcționalități.')
        setIsValid(true)
      } else {
        setIsValid(true)
      }
    } else {
      setIsValid(false)
    }
  }

  const handleSubmit = () => {
    if (!birthDate) {
      setError('Vă rugăm să introduceți data nașterii.')
      return
    }

    const age = calculateAge(birthDate)
    
    if (age < 13) {
      setError('Ne pare rău, trebuie să aveți cel puțin 13 ani pentru a utiliza LuxBid.')
      return
    }

    // Store verification
    localStorage.setItem('age_verified', 'true')
    localStorage.setItem('age_verification_date', new Date().toISOString())
    localStorage.setItem('user_age_category', age >= 18 ? 'adult' : 'minor')
    
    setIsVisible(false)
  }

  const handleMinorConsent = () => {
    if (!birthDate) {
      setError('Vă rugăm să introduceți data nașterii.')
      return
    }

    // Store verification with parental consent
    localStorage.setItem('age_verified', 'true')
    localStorage.setItem('age_verification_date', new Date().toISOString())
    localStorage.setItem('user_age_category', 'minor_with_consent')
    localStorage.setItem('parental_consent_required', 'true')
    
    setIsVisible(false)
  }

  if (!isVisible) return null

  const age = birthDate ? calculateAge(birthDate) : 0

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎂</div>
        
        <h2 style={{
          color: '#1a1a1a',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '12px'
        }}>
          Verificarea vârstei
        </h2>
        
        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          Pentru a utiliza LuxBid, trebuie să confirmați că aveți vârsta legală. 
          Această informație este necesară pentru conformitatea cu legislația de protecție a minorilor.
        </p>

        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#333'
          }}>
            Data nașterii:
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        {error && (
          <div style={{
            background: age < 13 ? '#f8d7da' : '#fff3cd',
            border: `1px solid ${age < 13 ? '#f5c6cb' : '#ffeaa7'}`,
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            color: age < 13 ? '#721c24' : '#856404',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Age categories info */}
        <div style={{
          background: '#e8f4fd',
          border: '1px solid #bee5eb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          textAlign: 'left',
          fontSize: '14px',
          color: '#0c5460'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>📋 Categorii de vârstă:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li><strong>Sub 13 ani:</strong> Accesul nu este permis</li>
            <li><strong>13-15 ani:</strong> Necesară supervizarea părinților</li>
            <li><strong>16-17 ani:</strong> Accesul limitat la anumite funcționalități</li>
            <li><strong>18+ ani:</strong> Acces complet la toate funcționalitățile</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {age >= 18 ? (
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              style={{
                padding: '12px 32px',
                border: 'none',
                borderRadius: '8px',
                background: isValid ? '#D09A1E' : '#ccc',
                color: '#fff',
                cursor: isValid ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'background 0.2s'
              }}
            >
              Confirmă vârsta (18+)
            </button>
          ) : age >= 13 && age < 18 ? (
            <>
              <button
                onClick={handleMinorConsent}
                disabled={!isValid}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: isValid ? '#28a745' : '#ccc',
                  color: '#fff',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
              >
                Am consimțământul părinților
              </button>
              <button
                onClick={() => {
                  alert('Pentru utilizatori sub 18 ani fără consimțământul părinților, accesul este restricționat. Contactați-ne la contact@luxbid.ro pentru mai multe informații.')
                }}
                style={{
                  padding: '12px 20px',
                  border: '1px solid #dc3545',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Nu am consimțământul
              </button>
            </>
          ) : age > 0 && age < 13 ? (
            <div style={{
              padding: '16px',
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              color: '#721c24',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0', fontWeight: '600' }}>
                Ne pare rău, trebuie să aveți cel puțin 13 ani pentru a utiliza LuxBid.
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
                Pentru mai multe informații, contactați-ne la <a href="mailto:contact@luxbid.ro" style={{ color: '#D09A1E' }}>contact@luxbid.ro</a>
              </p>
            </div>
          ) : null}
        </div>

        {/* GDPR compliance note */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'left'
        }}>
          <strong>🛡️ Confidențialitate:</strong> Data nașterii este utilizată doar pentru verificarea vârstei 
          și nu este stocată pe servere. Informația este păstrată local în browser pentru 30 de zile.
        </div>

        {/* Legal compliance */}
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '12px',
          fontSize: '12px',
          color: '#856404',
          textAlign: 'left'
        }}>
          <strong>⚖️ Conformitate legală:</strong> În conformitate cu GDPR și legislația română privind 
          protecția minorilor online, verificarea vârstei este obligatorie pentru accesul la platformele 
          de comerț electronic.
        </div>
      </div>
    </div>
  )
}
