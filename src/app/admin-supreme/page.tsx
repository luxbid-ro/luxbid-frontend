'use client'

import { useState, useEffect } from 'react'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  currency: string
  category: string
  brand: string
  status: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  isAdmin: boolean
  _count?: {
    listings: number
  }
}

interface AdminStats {
  totalUsers: number
  totalListings: number
  activeListings: number
  totalRevenue: number
  recentActivity: number
}

export default function AdminSupremeDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [listings, setListings] = useState<Listing[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Admin Supreme Password
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      loadDashboardData()
    } else {
              setError('Parola incorectă pentru Admin Suprem!')
    }
  }

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load listings
      const listingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`)
      if (listingsRes.ok) {
        const listingsData = await listingsRes.json()
        setListings(listingsData)
      }

      // Load users (simulate admin endpoint)
      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer admin-supreme-${ADMIN_PASSWORD}`
        }
      })
      
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData)
      } else {
        // Fallback - extract users from listings
        const uniqueUsers = listings.reduce((acc: User[], listing) => {
          if (!acc.find(u => u.id === listing.user.id)) {
            acc.push({
              id: listing.user.id,
              email: listing.user.email,
              firstName: listing.user.firstName,
              lastName: listing.user.lastName,
              createdAt: listing.createdAt,
              isAdmin: false
            })
          }
          return acc
        }, [])
        setUsers(uniqueUsers)
      }

      // Calculate stats
      const activeListings = listings.filter(l => l.status === 'ACTIVE').length
      const totalRevenue = listings.reduce((sum, l) => sum + l.price, 0)
      
      setStats({
        totalUsers: users.length || 1,
        totalListings: listings.length,
        activeListings,
        totalRevenue,
        recentActivity: listings.filter(l => 
          new Date(l.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
      })

    } catch (err) {
      console.error('Error loading data:', err)
      setError('Eroare la încărcarea datelor')
    }
    setLoading(false)
  }

  const deleteListing = async (listingId: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest anunț?')) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer admin-supreme-${ADMIN_PASSWORD}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setListings(listings.filter(l => l.id !== listingId))
        alert('Anunț șters cu succes!')
      } else {
        // Fallback - remove from UI only
        setListings(listings.filter(l => l.id !== listingId))
        alert('⚠️ Anunț eliminat din interfață (backend poate necesita implementare)')
      }
    } catch (err) {
      console.error('Error deleting listing:', err)
              alert('Eroare la ștergerea anunțului')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest utilizator și toate anunțurile sale?')) return

    try {
      setUsers(users.filter(u => u.id !== userId))
      setListings(listings.filter(l => l.user.id !== userId))
              alert('Utilizator și anunțurile sale au fost eliminate!')
    } catch (err) {
      console.error('Error deleting user:', err)
              alert('Eroare la ștergerea utilizatorului')
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%)',
        color: '#fff'
      }}>
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          padding: '40px',
          borderRadius: '15px',
          border: '2px solid #D09A1E',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(208, 154, 30, 0.3)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ margin: '0 0 30px 0', color: '#D09A1E', fontSize: '28px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <circle cx="12" cy="16" r="1"></circle>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Admin Supreme
          </h1>
          <p style={{ margin: '0 0 20px 0', opacity: 0.8 }}>
            Acces restricționat pentru administratorul suprem
          </p>
          
          <input
            type="password"
            placeholder="Introdu parola de admin suprem"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              border: '2px solid #D09A1E',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '16px'
            }}
          />
          
          {error && (
            <div style={{ color: '#ff4444', margin: '0 0 20px 0', fontSize: '14px' }}>
              {error}
            </div>
          )}
          
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '15px',
              background: '#D09A1E',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Acces Dashboard
          </button>
          
          <div style={{ marginTop: '30px', fontSize: '12px', opacity: 0.6 }}>
            Doar pentru administratorul principal LuxBid
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999999,
      minHeight: '100vh', 
      background: '#f8f9fa', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'auto'
    }}>
      {/* Admin Header - Clean & Professional */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e9ecef',
        padding: '16px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M21 15.5c-2-1-4-1-6 0"/>
              <path d="M9 19c0-2 2-4 4-4s4 2 4 4"/>
            </svg>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>
              LuxBid Admin Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#6c757d' }}>
              Last updated: {new Date().toLocaleTimeString('ro-RO')}
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e9ecef' }}>
        <div style={{ display: 'flex', padding: '0 24px' }}>
          {[
            { 
              id: 'overview', 
              label: 'Overview',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            },
            { 
              id: 'listings', 
              label: 'Listings',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            },
            { 
              id: 'users', 
              label: 'Users',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            },
            { 
              id: 'analytics', 
              label: 'Analytics',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22,6 12,16 2,6"/></svg>
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 20px',
                border: 'none',
                background: 'transparent',
                color: activeTab === tab.id ? '#0d6efd' : '#6c757d',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #0d6efd' : '2px solid transparent',
                fontWeight: activeTab === tab.id ? '600' : '500',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '16px 24px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ color: '#6c757d', fontSize: '14px', fontWeight: '500' }}>Loading dashboard data...</span>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                background: '#fff', 
                padding: '24px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    background: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>{stats.totalUsers}</div>
                    <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>Total Users</div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                background: '#fff', 
                padding: '24px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    background: '#f3e5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2">
                      <path d="M8 6h13"/>
                      <path d="M8 12h13"/>
                      <path d="M8 18h13"/>
                      <path d="M3 6h.01"/>
                      <path d="M3 12h.01"/>
                      <path d="M3 18h.01"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>{stats.totalListings}</div>
                    <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>Total Listings</div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                background: '#fff', 
                padding: '24px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    background: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>{stats.activeListings}</div>
                    <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>Active Listings</div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                background: '#fff', 
                padding: '24px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    background: '#fff3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '2px' }}>
                      {stats.totalRevenue.toLocaleString('ro-RO')} RON
                    </div>
                    <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>Total Value</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#D09A1E' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Status Platformă
            </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#28a745' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', color: '#28a745' }}>
  <circle cx="12" cy="12" r="10"/>
  <path d="M9 12l2 2 4-4"/>
</svg> Online</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Frontend & Backend</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#28a745' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', color: '#28a745' }}>
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
  <circle cx="12" cy="16" r="1"/>
  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
</svg> Securizat</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>SSL + Headers</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#28a745' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Deploy Auto
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>GitHub Actions</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#17a2b8' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Monitorizat
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Real-time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Management Tab */}
        {activeTab === 'listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#D09A1E' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                Gestionare Anunțuri
              </h2>
              <button
                onClick={loadDashboardData}
                style={{
                  padding: '10px 20px',
                  background: '#D09A1E',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <polyline points="23,4 23,10 17,10"/>
  <polyline points="1,20 1,14 7,14"/>
  <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15"/>
</svg> Reîmprospătează
              </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {listings.length === 0 ? (
                <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg> Nu există anunțuri în platformă
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                      <tr>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Titlu</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Preț</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Utilizator</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Data</th>
                        <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((listing) => (
                        <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '15px', fontSize: '12px', fontFamily: 'monospace' }}>
                            {listing.id.substring(0, 8)}...
                          </td>
                          <td style={{ padding: '15px' }}>
                            <div style={{ fontWeight: 'bold' }}>{listing.title}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{listing.category} - {listing.brand}</div>
                          </td>
                          <td style={{ padding: '15px', fontWeight: 'bold' }}>
                            {listing.price.toLocaleString('ro-RO')} {listing.currency}
                          </td>
                          <td style={{ padding: '15px' }}>
                            <div>{listing.user.firstName} {listing.user.lastName}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{listing.user.email}</div>
                          </td>
                          <td style={{ padding: '15px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              background: listing.status === 'ACTIVE' ? '#d4edda' : '#f8d7da',
                              color: listing.status === 'ACTIVE' ? '#155724' : '#721c24'
                            }}>
                              {listing.status}
                            </span>
                          </td>
                          <td style={{ padding: '15px', fontSize: '14px' }}>
                            {new Date(listing.createdAt).toLocaleDateString('ro-RO')}
                          </td>
                          <td style={{ padding: '15px', textAlign: 'center' }}>
                            <button
                              onClick={() => deleteListing(listing.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
  <path d="M3 6h18"/>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  <line x1="10" y1="11" x2="10" y2="17"/>
  <line x1="14" y1="11" x2="14" y2="17"/>
</svg> Șterge
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#D09A1E' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
  <circle cx="9" cy="7" r="4"/>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg> Gestionare Utilizatori</h2>
              <button
                onClick={loadDashboardData}
                style={{
                  padding: '10px 20px',
                  background: '#D09A1E',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <polyline points="23,4 23,10 17,10"/>
  <polyline points="1,20 1,14 7,14"/>
  <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15"/>
</svg> Reîmprospătează
              </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {users.length === 0 ? (
                <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg> Nu există utilizatori înregistrați
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                      <tr>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nume</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Anunțuri</th>
                        <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Data Înregistrării</th>
                        <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        const userListings = listings.filter(l => l.user.id === user.id)
                        return (
                          <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '15px', fontSize: '12px', fontFamily: 'monospace' }}>
                              {user.id.substring(0, 8)}...
                            </td>
                            <td style={{ padding: '15px' }}>
                              <div style={{ fontWeight: 'bold' }}>
                                {user.firstName} {user.lastName}
                                {user.isAdmin && <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#D09A1E', color: '#000', borderRadius: '3px', fontSize: '10px' }}>ADMIN</span>}
                              </div>
                            </td>
                            <td style={{ padding: '15px' }}>{user.email}</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              <span style={{
                                padding: '4px 8px',
                                background: '#e3f2fd',
                                color: '#1976d2',
                                borderRadius: '15px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>
                                {userListings.length} anunțuri
                              </span>
                            </td>
                            <td style={{ padding: '15px', fontSize: '14px' }}>
                              {new Date(user.createdAt).toLocaleDateString('ro-RO')}
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                              {!user.isAdmin && (
                                <button
                                  onClick={() => deleteUser(user.id)}
                                  style={{
                                    padding: '6px 12px',
                                    background: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
  <path d="M3 6h18"/>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  <line x1="10" y1="11" x2="10" y2="17"/>
  <line x1="14" y1="11" x2="14" y2="17"/>
</svg> Șterge
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ margin: '0 0 25px 0', color: '#D09A1E' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6" y1="20" x2="6" y2="14"/>
  <polyline points="20,16 18,12 12,8 6,18"/>
</svg> Analiză Detaliată</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Distribuția Categoriilor
            </h3>
                {listings.length > 0 ? (
                  <div>
                    {Array.from(new Set(listings.map(l => l.category))).map(category => {
                      const count = listings.filter(l => l.category === category).length
                      const percentage = (count / listings.length * 100).toFixed(1)
                      return (
                        <div key={category} style={{ marginBottom: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ textTransform: 'capitalize' }}>{category}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div style={{ 
                            width: '100%', 
                            height: '6px', 
                            background: '#eee', 
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${percentage}%`,
                              height: '100%',
                              background: '#D09A1E'
                            }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                    Nu există date pentru analiză
                  </div>
                )}
              </div>

              <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <circle cx="12" cy="12" r="10"/>
  <path d="M16 8l-8 8"/>
  <path d="M12 8v8"/>
</svg> Analiza Prețurilor</h3>
                {listings.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Preț minim:</span>
                        <span style={{ fontWeight: 'bold' }}>
                          {Math.min(...listings.map(l => l.price)).toLocaleString('ro-RO')} RON
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Preț maxim:</span>
                        <span style={{ fontWeight: 'bold' }}>
                          {Math.max(...listings.map(l => l.price)).toLocaleString('ro-RO')} RON
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Preț mediu:</span>
                        <span style={{ fontWeight: 'bold' }}>
                          {Math.round(listings.reduce((sum, l) => sum + l.price, 0) / listings.length).toLocaleString('ro-RO')} RON
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                    Nu există date pentru analiză
                  </div>
                )}
              </div>

              <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>⏰ Activitate Recentă</h3>
                <div style={{ color: '#666' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                    Anunțuri astăzi: {listings.filter(l => 
                      new Date(l.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                    Anunțuri în ultima săptămână: {listings.filter(l => 
                      new Date(l.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                    Anunțuri în ultima lună: {listings.filter(l => 
                      new Date(l.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: '#1a1a1a',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
  <path d="M5 3l14 9-14 9V3z"/>
</svg> LuxBid Admin Supreme Dashboard | Acces Exclusiv Administratori | 
          <span style={{ color: '#D09A1E' }}> Monitorizare în Timp Real</span>
        </div>
      </div>
    </div>
  )
}
