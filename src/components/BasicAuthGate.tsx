'use client'
import React, { useState, useEffect } from 'react'

interface BasicAuthGateProps {
  children: React.ReactNode
}

export default function BasicAuthGate({ children }: BasicAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('luxbid_basic_auth')
    if (auth === 'authenticated') {
      setIsAuthenticated(true)
      setShowLogin(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validUsername = process.env.NEXT_PUBLIC_BASIC_AUTH_USER || 'luxbid'
    const validPassword = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD || 'luxbid2024'
    
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true)
      setShowLogin(false)
      setError('')
      sessionStorage.setItem('luxbid_basic_auth', 'authenticated')
    } else {
      setError('Credențiale invalide')
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  if (showLogin) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        zIndex: 9999
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          width: '400px',
          maxWidth: '90vw'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '32px', 
              fontWeight: 'bold',
              letterSpacing: '-1px'
            }}>
              <span style={{ color: '#D09A1E' }}>Lux</span>
              <span style={{ color: '#000' }}>Bid</span>
            </h1>
            <p style={{ 
              margin: 0, 
              color: '#666', 
              fontSize: '16px' 
            }}>
              Acces Restricționat
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                placeholder="Introduceți username-ul"
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                placeholder="Introduceți parola"
                required
              />
            </div>

            {error && (
              <div style={{
                background: '#fff2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#B8831A'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#D09A1E'}
            >
              Autentificare
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#666',
            textAlign: 'center'
          }}>
            <strong>🔐 Site protejat</strong><br />
            Pentru acces, contactați echipa de dezvoltare.
          </div>
        </div>
      </div>
    )
  }

  return null
}
