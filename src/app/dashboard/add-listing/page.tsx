'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'

export default function AddListingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', category: '', desiredPrice: '', currency: 'RON' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: Create listing, 2: Upload images
  const [listingId, setListingId] = useState<string | null>(null)

  const createListing = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          desiredPrice: parseFloat(form.desiredPrice) || 0
        }),
      })
      
      if (!res.ok) throw new Error('Eroare la creare listare')
      
      const listing = await res.json()
      setListingId(listing.id)
      setStep(2) // Trece la upload imagini
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
          
          <ImageUpload 
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
            onChange={(e)=>setForm({...form,category:e.target.value})} 
            style={{ width: '100%', padding: 12, border:'1px solid #ddd', borderRadius: 8 }}
          >
            <option value=''>Alege categoria</option>
            <option value='Ceasuri'>Ceasuri</option>
            <option value='Genți'>Genți</option>
            <option value='Bijuterii'>Bijuterii</option>
            <option value='Artă'>Artă</option>
          </select>
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