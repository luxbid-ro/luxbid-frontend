'use client'

import { useEffect } from 'react'

export default function AdminDashboard() {
  useEffect(() => {
    // Redirect to working admin page
    window.location.href = '/admin-supreme'
  }, [])

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
      fontFamily: 'system-ui',
      zIndex: 999999
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting to Admin...</h2>
        <p>If not redirected, <a href="/admin-supreme" style={{color: '#007bff'}}>click here</a></p>
      </div>
    </div>
  )
}