'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { WATCH_BRANDS } from '@/constants/watchBrands'
import { BAG_BRANDS } from '@/constants/bagBrands'
import { JEWELRY_BRANDS } from '@/constants/jewelryBrands'
import { LazyImageUpload } from '@/components/LazyComponents'

const WATCH_MATERIALS = [
  'Oțel', 'Aur', 'Aur cu Oțel', 'Aur alb', 'Aur roz', 'Platină', 'Titanium',
  'Carbon', 'Ceramică', 'Bronz', 'Aluminiu', 'Tantalum', 'Altul'
] as const

const CONDITION_OPTIONS = [
  'Nou', 'Aproape nou', 'Folosit în stare foarte bună',
  'Folosit în stare bună', 'Folosit cu urme de uzură'
] as const

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
    currency: 'RON',
    hasDocuments: '',
    material: '',
    condition: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [step, setStep] = useState(1) // 1: Edit details, 2: Edit images

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
              desiredPrice: listing.desiredPrice?.toString() || listing.price?.toString() || '',
              currency: listing.currency || 'RON',
              hasDocuments: listing.hasDocuments || '',
              material: listing.material || '',
              condition: listing.condition || ''
            })
            
            // Încarcă imaginile existente
            setCurrentImages(listing.images || [])
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
          <h2 style={{ color: 'red', marginTop: 0 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg> Eroare</h2>
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
          <h2 style={{ marginTop: 0, color: '#9a7b0f' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editează Listarea
          </h2>
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
            onChange={(e)=>setForm({...form,category:e.target.value, brand: (form.category === 'Ceasuri' || form.category === 'Genți' || form.category === 'Bijuterii') && (e.target.value !== 'Ceasuri' && e.target.value !== 'Genți' && e.target.value !== 'Bijuterii') ? '' : form.brand})} 
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

        {/* Material for watches */}
        {form.category === 'Ceasuri' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Material Ceas</label>
            <select 
              value={form.material} 
              onChange={(e)=>setForm({...form,material:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Selectează materialul</option>
              {WATCH_MATERIALS.map((material) => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Specifică materialul din care este fabricat ceasul.
            </p>
          </div>
        )}

        {/* Documents for watches */}
        {form.category === 'Ceasuri' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Documente</label>
            <select 
              value={form.hasDocuments} 
              onChange={(e)=>setForm({...form,hasDocuments:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Selectează</option>
              <option value='Cu acte'>Cu acte</option>
              <option value='Fără acte'>Fără acte</option>
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Specifică dacă ceasul are documentele originale (certificat, garanție, etc.).
            </p>
          </div>
        )}

        {/* Brand selection for bags */}
        {form.category === 'Genți' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Brand Geantă</label>
            <select 
              value={form.brand} 
              onChange={(e)=>setForm({...form,brand:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Alege brandul</option>
              {BAG_BRANDS.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Selectează brandul genții pentru a ajuta cumpărătorii să o găsească mai ușor.
            </p>
          </div>
        )}

        {/* Documents for bags */}
        {form.category === 'Genți' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Documente</label>
            <select 
              value={form.hasDocuments} 
              onChange={(e)=>setForm({...form,hasDocuments:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Selectează</option>
              <option value='Cu acte'>Cu acte</option>
              <option value='Fără acte'>Fără acte</option>
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Specifică dacă geanta are documentele originale (certificat de autenticitate, chitanță, etc.).
            </p>
          </div>
        )}

        {/* Brand selection for jewelry */}
        {form.category === 'Bijuterii' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Brand Bijuterie</label>
            <select 
              value={form.brand} 
              onChange={(e)=>setForm({...form,brand:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Alege brandul</option>
              {JEWELRY_BRANDS.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Selectează brandul bijuteriei pentru a ajuta cumpărătorii să o găsească mai ușor.
            </p>
          </div>
        )}

        {/* Documents for jewelry */}
        {form.category === 'Bijuterii' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Documente</label>
            <select 
              value={form.hasDocuments} 
              onChange={(e)=>setForm({...form,hasDocuments:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Selectează</option>
              <option value='Cu acte'>Cu acte</option>
              <option value='Fără acte'>Fără acte</option>
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Specifică dacă bijuteria are documentele originale (certificat de autenticitate, evaluare, etc.).
            </p>
          </div>
        )}

        {/* Documents for art */}
        {form.category === 'Artă' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Documente</label>
            <select 
              value={form.hasDocuments} 
              onChange={(e)=>setForm({...form,hasDocuments:e.target.value})} 
              style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
            >
              <option value=''>Selectează</option>
              <option value='Cu acte'>Cu acte</option>
              <option value='Fără acte'>Fără acte</option>
            </select>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Specifică dacă opera de artă are documentele originale (certificat de autenticitate, provenință, etc.).
            </p>
          </div>
        )}

        {/* Condition field for all categories */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Stare *</label>
          <select
            required
            value={form.condition}
            onChange={(e)=>setForm({...form,condition:e.target.value})}
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
          >
            <option value=''>Selectează starea</option>
            {CONDITION_OPTIONS.map((condition) => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
          <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
            Descrie starea actuală a obiectului pentru a ajuta cumpărătorii să ia o decizie informată.
          </p>
        </div>
        
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

        {/* Current images display */}
        {currentImages.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 600 }}>Imaginile actuale</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
              {currentImages.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Imaginea ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100px', 
                    objectFit: 'cover', 
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
              Pentru a modifica imaginile, folosește butonul "Editează imagini" de mai jos.
            </p>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <button 
            type="button"
            onClick={() => setStep(2)}
            style={{ 
              flex: 1, 
              padding: 12, 
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
              color: '#fff',
              border: 'none', 
              borderRadius: 8, 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            Editează imagini ({currentImages.length})
          </button>
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
            disabled={loading || !form.desiredPrice || !form.condition} 
            className='btn btn-gold' 
            style={{ flex: 2 }}
          >
            {loading ? 'Se salvează...' : 'Salvează modificările'}
          </button>
        </div>
      </form>

      {/* Image upload step */}
      {step === 2 && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '40px', 
            maxWidth: '900px', 
            width: '100%', 
            borderRadius: '20px', 
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                Editează imaginile
              </h1>
              <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>
                "{form.title}"
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Adaugă sau înlocuiește imaginile pentru acest anunț
              </p>
            </div>

            <LazyImageUpload
              listingId={listingId}
              onImagesUploaded={(images) => {
                setCurrentImages(images)
                setSuccess('Imaginile au fost actualizate cu succes!')
                
                // Force cache invalidation for listing detail page
                if (typeof window !== 'undefined' && 'caches' in window) {
                  caches.keys().then(cacheNames => {
                    cacheNames.forEach(cacheName => {
                      caches.open(cacheName).then(cache => {
                        cache.delete(`/oferte/${listingId}`)
                        cache.delete(`/api/listings/${listingId}`)
                      })
                    })
                  })
                }
              }}
              maxImages={10}
              existingImages={currentImages}
            />

            <div style={{ display: 'flex', gap: '16px', marginTop: '40px', justifyContent: 'center' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  color: '#666',
                  border: '2px solid #e2e8f0',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D09A1E'
                  e.currentTarget.style.color = '#D09A1E'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.color = '#666'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Înapoi la detalii
              </button>
              
              <button
                onClick={() => {
                  setStep(1)
                  setSuccess('Imaginile au fost actualizate cu succes! Redirecting...')
                  
                  // Redirect to listing detail page to see updated images
                  setTimeout(() => {
                    window.location.href = `/oferte/${listingId}?refresh=${Date.now()}`
                  }, 1500)
                }}
                style={{
                  background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E5A82A 0%, #C69A0F 100%)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                Finalizează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
