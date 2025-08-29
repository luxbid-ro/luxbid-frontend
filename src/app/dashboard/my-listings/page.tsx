'use client'
import React, { useEffect, useState } from 'react'

export default function MyListingsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; listingId: string | null; listingTitle: string }>({
    show: false,
    listingId: null,
    listingTitle: ''
  })
  const [deleting, setDeleting] = useState(false)

  const fetchAndValidateListings = async (showLoading = true) => {
    // Fetch and validate listings
    
    const token = localStorage.getItem('luxbid_token')
    // Check token
    
    if (!token) {
      // No token, redirect to login
      return (window.location.href = '/auth/login')
    }
    
    if (showLoading) {
      // Set loading state
      setLoading(true)
    }
    
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      // Fetching listings
      
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      // Safari-specific cache busting
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(7)
      const url = `${base}/listings/me/all?_t=${timestamp}&_r=${randomId}`
      
      const res = await fetch(url, { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      // Check response status
      
      if (res.ok) {
        const listings = await res.json()
        // Process listings from API
        // Found listings
        setItems(listings)
      } else {
        // Response not ok
        setItems([])
      }
    } catch (e:any) {
      // Fetch error occurred
      setErr(`Eroare la încărcare: ${e.message}`)
      setItems([]) // Ensure we show something even on error
    } finally {
      if (showLoading) {
        // Loading complete
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchAndValidateListings()
  }, [])

  const handleDelete = async () => {
    if (!deleteModal.listingId) return
    
    setDeleting(true)
    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      const res = await fetch(`${base}/listings/${deleteModal.listingId}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (res.ok) {
        // Remove from local state immediately
        setItems(prev => prev.filter(item => item.id !== deleteModal.listingId))
        setDeleteModal({ show: false, listingId: null, listingTitle: '' })
        
        // Force refresh the entire list after a delay to ensure backend consistency
        setTimeout(() => {
          console.log('🔄 Force refreshing listings after successful delete')
          fetchAndValidateListings(false) // Don't show loading spinner for refresh
        }, 500)
        
        alert('Anunțul a fost șters cu succes!')
      } else if (res.status === 404) {
        // Anunțul nu mai există - îl eliminăm din listă fără eroare
        console.log('🧹 Cleaning up phantom listing:', deleteModal.listingId)
        setItems(prev => prev.filter(item => item.id !== deleteModal.listingId))
        setDeleteModal({ show: false, listingId: null, listingTitle: '' })
        alert('Anunțul a fost eliminat din listă (nu mai exista în baza de date)')
      } else {
        const errorData = await res.text()
        console.error('Delete error:', res.status, errorData)
        throw new Error(`Eroare ${res.status}: ${errorData || 'Nu se poate șterge anunțul'}`)
      }
    } catch (error: any) {
      // Delete error occurred
      // Pentru 404, nu afișăm eroare - doar curățăm lista
      if (error.message?.includes('404')) {
        // Cleaning up phantom listing
        setItems(prev => prev.filter(item => item.id !== deleteModal.listingId))
        setDeleteModal({ show: false, listingId: null, listingTitle: '' })
        alert('Anunțul a fost eliminat din listă (nu mai exista în baza de date)')
      } else {
        alert(`Eroare la ștergerea anunțului: ${error.message || 'Eroare necunoscută'}`)
      }
    } finally {
      setDeleting(false)
    }
  }

  const openDeleteModal = (listingId: string, listingTitle: string) => {
    setDeleteModal({ show: true, listingId, listingTitle })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, listingId: null, listingTitle: '' })
  }

  const handleConsolidateListings = async () => {
    if (!confirm('Vrei să consolidezi anunțurile din conturile duplicate? Această operațiune va transfera toate anunțurile la contul tău actual.')) {
      return
    }

    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      const res = await fetch(`${base}/listings/consolidate`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (res.ok) {
        const result = await res.json()
        alert(`Consolidare completă! ${result.transferredCount} anunțuri transferate.`)
        // Refresh the list to show consolidated listings
        fetchAndValidateListings()
      } else {
        const errorData = await res.text()
        alert(`Eroare la consolidare: ${errorData}`)
      }
    } catch (error: any) {
      console.error('Consolidation error:', error)
      alert(`Eroare la consolidarea anunțurilor: ${error.message || 'Eroare necunoscută'}`)
    }
  }

  return (
    <section className='section'>
      <div className='container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>Anunțurile mele</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <button 
              onClick={() => fetchAndValidateListings()} 
              className="btn"
              style={{
                background: '#D09A1E',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9em'
              }}
            >
              🔄 Actualizează
            </button>
            <button 
              onClick={handleConsolidateListings}
              className="btn"
              style={{
                background: '#ff6b35',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9em'
              }}
            >
              🔧 Consolidează Anunțuri
            </button>
          </div>
        </div>
        {loading ? (
          <div style={{ padding: 24 }}>Se încarcă...</div>
        ) : err ? (
          <div style={{ padding: 24, color: 'red' }}>{err}</div>
        ) : (
          <div className='grid'>
            {items.length === 0 && (
              <div className='card' style={{ gridColumn: '1 / -1' }}>
                <h3>Nu ai încă anunțuri</h3>
                <p>Adaugă primul tău anunț.</p>
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
                  <button 
                    onClick={() => openDeleteModal(l.id, l.title)}
                    style={{ 
                      flex: 1,
                      textAlign: 'center',
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.9em',
                      padding: '8px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                  >
                    🗑️ Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#fff',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#dc3545' }}>🗑️ Șterge anunțul</h3>
              <p style={{ marginBottom: '24px', color: '#666' }}>
                Ești sigur că vrei să ștergi anunțul <strong>"{deleteModal.listingTitle}"</strong>?
              </p>
              <p style={{ fontSize: '0.9em', color: '#999', marginBottom: '24px' }}>
                Această acțiune nu poate fi anulată.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  style={{
                    padding: '12px 24px',
                    background: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  Anulează
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{
                    padding: '12px 24px',
                    background: '#dc3545',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: '600'
                  }}
                >
                  {deleting ? 'Se șterge...' : 'Șterge definitiv'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
