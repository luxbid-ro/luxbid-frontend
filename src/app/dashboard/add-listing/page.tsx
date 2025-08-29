'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LazyImageUpload } from '@/components/LazyComponents'
import { WATCH_BRANDS } from '@/constants/watchBrands'
import { BAG_BRANDS } from '@/constants/bagBrands'
import { JEWELRY_BRANDS } from '@/constants/jewelryBrands'
import { useContentModeration } from '@/hooks/useContentModeration'
import { RiskLevel } from '@/utils/contentModeration'

export default function AddListingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', category: '', brand: '', desiredPrice: '', currency: 'RON' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: Create listing, 2: Upload images
  const [listingId, setListingId] = useState<string | null>(null)
  
  // Content Moderation
  const { 
    moderate, 
    canPublish, 
    getUserMessage, 
    moderationResult,
    isProcessing,
    reset: resetModeration 
  } = useContentModeration({
    autoModerate: true,
    showWarnings: true,
    allowOverride: false
  })

  // Reset brand when category changes away from watches, bags or jewelry
  React.useEffect(() => {
    if (form.category !== 'Ceasuri' && form.category !== 'Genți' && form.category !== 'Bijuterii') {
      setForm(prev => ({ ...prev, brand: '' }))
    }
  }, [form.category])

  const createListing = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // 1. Moderează conținutul înainte de trimitere
      const moderationResult = await moderate({
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseFloat(form.desiredPrice) || 0,
        userRole: 'user' // În implementarea reală ar veni din context
      })

      // 2. Verifică dacă conținutul poate fi publicat
      if (!canPublish(moderationResult)) {
        setError('Conținutul nu poate fi publicat din cauza problemelor detectate. Vă rugăm să corectați și să încercați din nou.')
        setLoading(false)
        return
      }

      // 3. Continuă cu crearea listării dacă moderarea a trecut
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          desiredPrice: parseFloat(form.desiredPrice) || 0,
          moderationData: {
            score: moderationResult.score,
            riskLevel: moderationResult.riskLevel,
            issues: moderationResult.issues,
            timestamp: new Date().toISOString()
          }
        }),
      })
      
      if (!res.ok) throw new Error('Eroare la creare listare')
      
      const listing = await res.json()
      setListingId(listing.id)
      setStep(2) // Trece la upload imagini
      
      // Reset moderare pentru următoarea utilizare
      resetModeration()
      
    } catch (err) {
      setError('Eroare la creare listare')
    } finally {
      setLoading(false)
    }
  }

  const handleImagesUploaded = (images: any[]) => {
    // Redirecționează la listarea nouă sau la dashboard
    router.push(`/oferte/${listingId}`)
  }

  const skipImages = () => {
    router.push(`/oferte/${listingId}`)
  }

  if (step === 2 && listingId) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: 24, maxWidth: 800, width: '100%', borderRadius: 16 }}>
          <h2 style={{ marginTop: 0 }}>🎉 Listarea "{form.title}" a fost creată!</h2>
          <p style={{ color: '#666', marginBottom: 30 }}>
            Acum adaugă imagini de înaltă calitate pentru a atrage cumpărători serioși.
          </p>
          
          <LazyImageUpload 
            listingId={listingId} 
            onImagesUploaded={handleImagesUploaded}
            maxImages={10}
          />
          
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button 
              onClick={skipImages}
              style={{ 
                background: 'transparent', 
                border: '1px solid #ddd', 
                padding: '8px 16px', 
                borderRadius: 8, 
                cursor: 'pointer',
                marginRight: 10
              }}
            >
              Sari peste imagini (pentru acum)
            </button>
            <button 
              onClick={() => router.push('/dashboard')}
              className="btn btn-gold"
            >
              Înapoi la Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={createListing} style={{ background: '#fff', padding: 24, maxWidth: 560, width: '100%', borderRadius: 16 }}>
        <h2 style={{ marginTop: 0 }}>Adaugă Listare Nouă</h2>
        <p style={{ color: '#666', marginBottom: 20 }}>
          Primul pas: completează detaliile despre obiectul de lux.
        </p>
        
        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
        
        {/* Content Moderation Warning */}
        {moderationResult && getUserMessage() && (
          <div style={{
            marginBottom: 20,
            padding: 16,
            borderRadius: 8,
            border: '1px solid',
            borderColor: getUserMessage()?.type === 'error' ? '#dc2626' : 
                        getUserMessage()?.type === 'warning' ? '#f59e0b' : '#059669',
            backgroundColor: getUserMessage()?.type === 'error' ? '#fef2f2' : 
                           getUserMessage()?.type === 'warning' ? '#fef3c7' : '#f0fdf4'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12
            }}>
              <span style={{ fontSize: 20 }}>
                {getUserMessage()?.type === 'error' ? '🚫' : 
                 getUserMessage()?.type === 'warning' ? '⚠️' : '✅'}
              </span>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: '0 0 8px 0',
                  fontSize: 16,
                  fontWeight: 600,
                  color: getUserMessage()?.type === 'error' ? '#dc2626' : 
                         getUserMessage()?.type === 'warning' ? '#d97706' : '#059669'
                }}>
                  {getUserMessage()?.title}
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: getUserMessage()?.type === 'error' ? '#7f1d1d' : 
                         getUserMessage()?.type === 'warning' ? '#92400e' : '#064e3b'
                }}>
                  {getUserMessage()?.message}
                </p>
                {moderationResult.score > 0 && (
                  <div style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: '#666'
                  }}>
                    Scor de risc: {moderationResult.score}/100
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Processing indicator */}
        {isProcessing && (
          <div style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <div style={{
              width: 16,
              height: 16,
              border: '2px solid #0ea5e9',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ fontSize: 14, color: '#0369a1' }}>
              Se verifică conținutul...
            </span>
          </div>
        )}
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Titlu *</label>
          <input 
            placeholder='Ex: Rolex Submariner 2023' 
            required 
            value={form.title} 
            onChange={(e) => {
              setForm({...form, title: e.target.value})
              // Moderare în timp real (debounced)
              moderate({
                title: e.target.value,
                description: form.description,
                category: form.category,
                price: parseFloat(form.desiredPrice) || 0
              })
            }}
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }} 
          />
        </div>
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Descriere detaliată *</label>
          <textarea 
            placeholder='Descrie starea, anul, orice defecte, accesorii incluse...' 
            required 
            value={form.description} 
            onChange={(e) => {
              setForm({...form, description: e.target.value})
              // Moderare în timp real (debounced)
              moderate({
                title: form.title,
                description: e.target.value,
                category: form.category,
                price: parseFloat(form.desiredPrice) || 0
              })
            }}
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8, minHeight: 120 }} 
          />
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Categorie *</label>
          <select 
            required 
            value={form.category} 
            onChange={(e)=>setForm({...form,category:e.target.value, brand: ''})} 
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
        
        <button type='submit' disabled={loading || !form.desiredPrice} className='btn btn-gold' style={{ width: '100%' }}>
          {loading ? 'Se creează...' : 'Continuă la imagini →'}
        </button>
        
        <p style={{ fontSize: '0.8em', color: '#999', marginTop: 15, textAlign: 'center' }}>
          Pasul următor: vei putea adăuga imagini de înaltă calitate
        </p>
      </form>
    </div>
  )
}