'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { WATCH_BRANDS } from '@/constants/watchBrands'

export default function EditListingPage() {
  const params = useParams()
  const router = useRouter()
  const listingId = params?.id as string
  
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    category: '', 
    brand: '',
    desiredPrice: '', 
    currency: 'RON' 
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Încarcă datele listării existente
  useEffect(() => {
    const loadListing = async () => {
      try {
        const token = localStorage.getItem('luxbid_token')
        if (!token) return router.push('/auth/login')
        
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
        const response = await fetch(`${base}/listings/${listingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (response.ok) {
          const listing = await response.json()
          
          // Verifică dacă utilizatorul este proprietarul
          const userRes = await fetch(`${base}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          
          if (userRes.ok) {
            const userData = await userRes.json()
            if (userData.id !== listing.sellerId) {
              setError('Nu ai permisiunea să editezi această listare')
              return
            }
            
            // Populează formularul cu datele existente
            setForm({
              title: listing.title || '',
              description: listing.description || '',
              category: listing.category || '',
              brand: listing.brand || '',
              desiredPrice: listing.desiredPrice?.toString() || '',
              currency: listing.currency || 'RON'
            })
          }
        } else {
          setError('Listarea nu a fost găsită')
        }
      } catch (err) {
        console.error('Error loading listing:', err)
        setError('Eroare la încărcarea datelor')
      } finally {
        setLoadingData(false)
      }
    }
    
    if (listingId) {
      loadListing()
    }
  }, [listingId, router])

  const updateListing = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return router.push('/auth/login')
      
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      const res = await fetch(`${base}/listings/${listingId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...form,
          desiredPrice: parseFloat(form.desiredPrice) || 0
        }),
      })
      
      if (res.ok) {
        setSuccess('Listarea a fost actualizată cu succes!')
        setTimeout(() => {
          router.push(`/oferte/${listingId}`)
        }, 1500)
      } else {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Eroare la actualizare')
      }
    } catch (err: any) {
      setError(err.message || 'Eroare la actualizarea listării')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Se încarcă datele...</h2>
          <p style={{ color: '#666' }}>Te rugăm să aștepți</p>
        </div>
      </div>
    )
  }

  if (error && !form.title) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: 40, borderRadius: 16, maxWidth: 500 }}>
          <h2 style={{ color: 'red', marginTop: 0 }}>❌ Eroare</h2>
          <p style={{ color: '#666', marginBottom: 20 }}>{error}</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn btn-gold"
          >
            Înapoi la Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={updateListing} style={{ background: '#fff', padding: 24, maxWidth: 560, width: '100%', borderRadius: 16 }}>
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ marginTop: 0, color: '#9a7b0f' }}>📝 Editează Listarea</h2>
          <p style={{ color: '#666', marginBottom: 0 }}>
            Modifică detaliile listării tale. Schimbările vor fi vizibile imediat.
          </p>
        </div>
        
        {error && <div style={{ background: '#fee', border: '1px solid #fcc', padding: 12, borderRadius: 8, marginBottom: 20, color: 'red' }}>{error}</div>}
        {success && <div style={{ background: '#efe', border: '1px solid #cfc', padding: 12, borderRadius: 8, marginBottom: 20, color: 'green' }}>{success}</div>}
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Titlu *</label>
          <input 
            placeholder='Ex: Rolex Submariner 2023' 
            required 
            value={form.title} 
            onChange={(e)=>setForm({...form,title:e.target.value})} 
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }} 
          />
        </div>
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Descriere detaliată *</label>
          <textarea 
            placeholder='Descrie starea, anul, orice defecte, accesorii incluse...' 
            required 
            value={form.description} 
            onChange={(e)=>setForm({...form,description:e.target.value})} 
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8, minHeight: 120 }} 
          />
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Categorie *</label>
          <select 
            required 
            value={form.category} 
            onChange={(e)=>setForm({...form,category:e.target.value, brand: form.category === 'Ceasuri' && e.target.value !== 'Ceasuri' ? '' : form.brand})} 
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
          >
            <option value=''>Alege categoria</option>
            <option value='Ceasuri'>Ceasuri</option>
            <option value='Genți'>Genți</option>
            <option value='Bijuterii'>Bijuterii</option>
            <option value='Artă'>Artă</option>
          </select>
        </div>
        
        {/* Brand selection for watches */}
        {form.category === 'Ceasuri' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Brand Ceas</label>
            <select 
              value={form.brand} 
              onChange={(e)=>setForm({...form,brand:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Alege brandul</option>
              {WATCH_BRANDS.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Selectează brandul ceasului pentru a ajuta cumpărătorii să îl găsească mai ușor.
            </p>
          </div>
        )}
        
        {/* Preț dorit */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Prețul tău dorit *</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="number"
              step="0.01"
              min="0"
              placeholder='Ex: 5000' 
              required 
              value={form.desiredPrice} 
              onChange={(e)=>setForm({...form,desiredPrice:e.target.value})} 
              style={{ flex: 1, padding: 12, border:'1px solid #ddd', borderRadius: 8 }} 
            />
            <select 
              value={form.currency} 
              onChange={(e)=>setForm({...form,currency:e.target.value})} 
              style={{ padding: 12, border:'1px solid #ddd', borderRadius: 8, minWidth: 80 }}
            >
              <option value='RON'>RON</option>
              <option value='EUR'>EUR</option>
              <option value='USD'>USD</option>
            </select>
          </div>
          <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
            Acest preț va fi afișat ca referință. Cumpărătorii pot face orice ofertă.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            type="button"
            onClick={() => router.push(`/oferte/${listingId}`)}
            style={{ 
              flex: 1, 
              padding: 12, 
              background: '#f5f5f5', 
              border: '1px solid #ddd', 
              borderRadius: 8, 
              cursor: 'pointer',
              color: '#666'
            }}
          >
            Anulează
          </button>
          <button 
            type='submit' 
            disabled={loading || !form.desiredPrice} 
            className='btn btn-gold' 
            style={{ flex: 2 }}
          >
            {loading ? 'Se salvează...' : 'Salvează modificările'}
          </button>
        </div>
        
        <p style={{ fontSize: '0.8em', color: '#999', marginTop: 15, textAlign: 'center' }}>
          * Imaginile se editează separat din pagina listării
        </p>
      </form>
    </div>
  )
}
