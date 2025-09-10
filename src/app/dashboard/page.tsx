'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user, loading, isAuthenticated, logout } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Function to get greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours()
    
    if (hour >= 6 && hour < 12) {
      return 'Bună dimineața'
    } else if (hour >= 12 && hour < 18) {
      return 'Bună ziua'
    } else {
      return 'Bună seara'
    }
  }

  // Function to get user's first name
  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName
    } else if (user?.name) {
      return user.name.split(' ')[0] // Get first part of name
    } else if (user?.email) {
      return user.email.split('@')[0] // Get part before @
    }
    return 'Utilizator'
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', marginBottom: '24px' }}>
          <h1 style={{ marginBottom: '16px' }}>{getGreeting()}, {getUserDisplayName()}!</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Bine ai venit în dashboard-ul tău LuxBid.</p>
          <button onClick={logout} style={{ background: 'var(--gold)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Deconectare
          </button>
        </div>
        <div style={{ 
          background: '#fff', 
          padding: isMobile ? '20px' : '32px', 
          borderRadius: '16px' 
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>Acțiuni rapide</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: isMobile ? '12px' : '16px', 
            marginTop: '20px',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            <a 
              href="/dashboard/add-listing" 
              style={{ 
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)', 
                color: '#fff', 
                padding: '24px 20px', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                textAlign: 'center', 
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(208, 154, 30, 0.15)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(208, 154, 30, 0.25), 0 12px 20px rgba(0, 0, 0, 0.08)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #E5A82A 0%, #C69A0F 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(208, 154, 30, 0.15)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)'
              }}
            >
              Adaugă Anunț
            </a>
            <a 
              href="/dashboard/my-listings" 
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', 
                color: '#333', 
                padding: '24px 20px', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                textAlign: 'center', 
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid #D09A1E',
                boxShadow: '0 4px 12px rgba(208, 154, 30, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(208, 154, 30, 0.15), 0 12px 20px rgba(0, 0, 0, 0.06)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = '#B8860B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(208, 154, 30, 0.08)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)'
                e.currentTarget.style.color = '#333'
                e.currentTarget.style.borderColor = '#D09A1E'
              }}
            >
              Anunțurile mele
            </a>
            <a 
              href="/profile/edit" 
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', 
                color: '#333', 
                padding: '24px 20px', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                textAlign: 'center', 
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid #D09A1E',
                boxShadow: '0 4px 12px rgba(208, 154, 30, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(208, 154, 30, 0.15), 0 12px 20px rgba(0, 0, 0, 0.06)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = '#B8860B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(208, 154, 30, 0.08)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)'
                e.currentTarget.style.color = '#333'
                e.currentTarget.style.borderColor = '#D09A1E'
              }}
            >
              Editează Profil
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
