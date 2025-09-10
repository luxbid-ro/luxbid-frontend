'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LazyImageUpload } from '@/components/LazyComponents'
import { WATCH_BRANDS } from '@/constants/watchBrands'
import { BAG_BRANDS } from '@/constants/bagBrands'
import { JEWELRY_BRANDS } from '@/constants/jewelryBrands'
import { useContentModeration } from '@/hooks/useContentModeration'
import { RiskLevel } from '@/utils/contentModeration'

// Watch materials for luxury timepieces
const WATCH_MATERIALS = [
  'Oțel',
  'Aur',
  'Aur cu Oțel',
  'Aur alb',
  'Aur roz',
  'Platină',
  'Titanium',
  'Carbon',
  'Ceramică',
  'Bronz',
  'Aluminiu',
  'Tantalum'
] as const

export default function AddListingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', category: '', brand: '', desiredPrice: '', currency: 'RON', hasDocuments: '', material: '' })
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

  const handlePublishWithImages = async () => {
    if (!listingId) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('luxbid_token');
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      // Call the publish endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/listings/${listingId}/publish`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
      });

      if (!res.ok) {
        throw new Error('Eroare la publicarea anunțului');
      }

      // Redirect to the published listing
      router.push(`/oferte/${listingId}`);
    } catch (error) {
      console.error('Error publishing listing:', error);
      setError('Eroare la publicarea anunțului. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }

  if (step === 2 && listingId) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', maxWidth: '900px', width: '100%', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}>
          
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px',
              boxShadow: '0 8px 24px rgba(208, 154, 30, 0.3)'
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '12px',
              lineHeight: '1.3'
            }}>
              Draft creat cu succes!
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#666', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              "{form.title}"
            </p>
            <p style={{ 
              fontSize: '16px', 
              color: '#888', 
              lineHeight: '1.5',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Anunțul este în draft și nu este vizibil public. Adaugă imagini de înaltă calitate și apasă "Publică Anunț" pentru a-l face vizibil cumpărătorilor.
            </p>
          </div>

          {/* Upload Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
            borderRadius: '16px', 
            padding: '32px', 
            marginBottom: '40px',
            border: '2px dashed #D09A1E'
          }}>
            <LazyImageUpload 
              listingId={listingId} 
              onImagesUploaded={handleImagesUploaded}
              maxImages={10}
            />
          </div>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => setStep(1)}
              style={{ 
                background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)', 
                color: '#fff', 
                border: 'none',
                padding: '16px 32px', 
                borderRadius: '12px', 
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(108, 117, 125, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(108, 117, 125, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.15)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m7-7l-7 7 7 7"/>
              </svg>
              Înapoi la Detalii
            </button>
            
            <button 
              onClick={handlePublishWithImages}
              disabled={loading}
              style={{ 
                background: loading ? '#ccc' : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)', 
                color: '#fff', 
                border: 'none',
                padding: '16px 32px', 
                borderRadius: '12px', 
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(208, 154, 30, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(208, 154, 30, 0.3)'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E5A82A 0%, #C69A0F 100%)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(208, 154, 30, 0.2)'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)'
                }
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49l2.83-2.83"/>
                  </svg>
                  Se publică...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Publică Anunț
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
                {getUserMessage()?.type === 'error' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                ) : getUserMessage()?.type === 'warning' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
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
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Titlu *</label>
          <input 
            placeholder='Ex: Rolex Submariner 2023' 
            required 
            value={form.title} 
            onChange={(e) => setForm({...form, title: e.target.value})}
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }} 
          />
        </div>
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Descriere detaliată *</label>
          <textarea 
            placeholder='Descrie starea, anul, orice defecte, accesorii incluse...' 
            required 
            value={form.description} 
            onChange={(e) => setForm({...form, description: e.target.value})}
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

        {/* Material selection for watches */}
        {form.category === 'Ceasuri' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Material Ceas *</label>
            <select 
              required 
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
              Materialul din care este făcut ceasul (carcasă și brățară).
            </p>
          </div>
        )}

        {/* Documents option - appears after material selection for watches */}
        {form.category === 'Ceasuri' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Acte *</label>
            <select 
              required 
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

        {/* Documents option for bags */}
        {form.category === 'Genți' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Acte *</label>
            <select 
              required 
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

        {/* Documents option for jewelry */}
        {form.category === 'Bijuterii' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Acte *</label>
            <select 
              required 
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

        {/* Documents option for art category */}
        {form.category === 'Artă' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Acte *</label>
            <select 
              required 
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
    </>
  )
}