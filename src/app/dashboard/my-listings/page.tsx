'use client'
import React, { useEffect, useState } from 'react'

export default function MyListingsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
        const res = await fetch(`${base}/listings/me/all`, { headers: { Authorization: `Bearer ${token}` } })
        setItems(res.ok ? await res.json() : [])
      } catch (e:any) {
        setErr('Eroare la încărcare')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='section'>
      <div className='container'>
        <h2>Listările mele</h2>
        {loading ? (
          <div style={{ padding: 24 }}>Se încarcă...</div>
        ) : err ? (
          <div style={{ padding: 24, color: 'red' }}>{err}</div>
        ) : (
          <div className='grid'>
            {items.length === 0 && (
              <div className='card' style={{ gridColumn: '1 / -1' }}>
                <h3>Nu ai încă listări</h3>
                <p>Adaugă prima ta listare.</p>
              </div>
            )}
            {items.map((l) => (
              <div className='card' key={l.id}>
                <h3>{l.title}</h3>
                <p style={{ marginBottom: 15 }}>{l.description}</p>
                <p style={{ color: '#9a7b0f', fontWeight: 700, marginBottom: 15 }}>{l.category}</p>
                
                {/* Preț dorit */}
                {l.desiredPrice > 0 && (
                  <p style={{ 
                    color: '#9a7b0f', 
                    fontWeight: 600, 
                    background: '#faf9f6',
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: '1px solid #e6d7a3',
                    display: 'inline-block',
                    fontSize: '0.9em',
                    marginBottom: 15
                  }}>
                    Preț dorit: {l.desiredPrice} {l.currency || 'RON'}
                  </p>
                )}
                
                {/* Buttons */}
                <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                  <a 
                    href={`/oferte/${l.id}`}
                    className="btn btn-gold"
                    style={{ 
                      textDecoration: 'none',
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '0.9em',
                      padding: '8px 12px'
                    }}
                  >
                    👁️ Vezi
                  </a>
                  <a 
                    href={`/dashboard/edit-listing/${l.id}`}
                    className="btn"
                    style={{ 
                      textDecoration: 'none',
                      flex: 1,
                      textAlign: 'center',
                      background: '#f5f5f5',
                      color: '#666',
                      border: '1px solid #ddd',
                      fontSize: '0.9em',
                      padding: '8px 12px'
                    }}
                  >
                    ✏️ Editează
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
