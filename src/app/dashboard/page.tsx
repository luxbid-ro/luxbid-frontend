'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('luxbid_token')
      if (!token) {
        setLoading(false)
        router.push('/auth/login')
        return
      }
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        } else {
          localStorage.removeItem('luxbid_token')
          router.push('/auth/login')
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err)
        // In case of API error, show a mock user dashboard
        setUser({ 
          email: 'demo@luxbid.ro', 
          firstName: 'Demo', 
          lastName: 'User',
          name: 'Demo User'
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [router])

  const logout = () => {
    localStorage.removeItem('luxbid_token')
    router.push('/')
  }

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
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px' }}>
          <h2>Acțiuni rapide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <a href="/dashboard/add-listing" style={{ background: 'var(--gold)', color: '#fff', padding: '20px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 19l7-7 3 3-7-7-3 3 7 7-3 3z"/>
                <path d="M11 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/>
                <line x1="9" y1="12" x2="15" y2="12"/>
              </svg>
              Adaugă Anunț
            </a>
            <a href="/dashboard/my-listings" style={{ background: 'var(--surface)', color: 'var(--dark)', padding: '20px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              Anunțurile mele
            </a>
            <a href="/profile/edit" style={{ background: '#f8f9fa', color: '#333', padding: '20px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', border: '2px solid #D09A1E' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Editează Profil
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
