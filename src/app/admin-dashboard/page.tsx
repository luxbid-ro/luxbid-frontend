'use client'

import { useState, useEffect } from 'react'

// Simple admin page that works
export default function AdminDashboard() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [data, setData] = useState({ users: 0, listings: 0 })

  useEffect(() => {
    // Hide body scroll
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = 'auto' }
    }
  }, [])

  const login = () => {
    if (pass === 'luxbid2024supreme') {
      setAuth(true)
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`, {
        headers: { 'Authorization': 'Bearer admin-supreme-luxbid2024supreme' }
      }).then(r => r.json()).then(users => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`)
          .then(r => r.json())
          .then(listings => setData({ users: users.length || 0, listings: listings.length || 0 }))
      }).catch(() => {})
    }
  }

  if (!auth) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999999,
        fontFamily: 'system-ui'
      }}>
        <div style={{ textAlign: 'center', background: '#222', padding: '40px', borderRadius: '8px' }}>
          <h1>Admin Access</h1>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && login()}
            style={{
              padding: '12px',
              width: '200px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '16px'
            }}
          />
          <br />
          <button 
            onClick={login}
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#f5f5f5',
      zIndex: 9999999,
      overflow: 'auto',
      fontFamily: 'system-ui'
    }}>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1>Admin Dashboard</h1>
          <button 
            onClick={() => setAuth(false)}
            style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#007bff' }}>{data.users}</h2>
            <p style={{ margin: 0, color: '#666' }}>Users</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#28a745' }}>{data.listings}</h2>
            <p style={{ margin: 0, color: '#666' }}>Listings</p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => window.open('https://luxbid-backend.onrender.com/admin/users', '_blank')}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              View All Users
            </button>
            <button 
              onClick={() => window.open('https://luxbid-backend.onrender.com/listings', '_blank')}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              View All Listings
            </button>
            <button 
              onClick={() => window.open('https://dashboard.render.com/', '_blank')}
              style={{
                padding: '10px 20px',
                background: '#6f42c1',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Render Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
