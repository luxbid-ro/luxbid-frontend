'use client'
import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('luxbid_token')
      if (!token) {
        window.location.href = '/auth/login'
        return
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          setUser(await res.json())
        } else {
          localStorage.removeItem('luxbid_token')
          window.location.href = '/auth/login'
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.removeItem('luxbid_token')
    window.location.href = '/'
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', marginBottom: '24px' }}>
          <h1 style={{ marginBottom: '16px' }}>Bună, {user?.name || user?.email}!</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Bine ai venit în dashboard-ul tău LuxBid.</p>
          <button onClick={logout} style={{ background: 'var(--gold)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Deconectare
          </button>
        </div>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px' }}>
          <h2>Acțiuni rapide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <a href="/dashboard/add-listing" style={{ background: 'var(--gold)', color: '#fff', padding: '20px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
              Adaugă Listare
            </a>
            <a href="/dashboard/my-listings" style={{ background: 'var(--surface)', color: 'var(--dark)', padding: '20px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
              Listările mele
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
