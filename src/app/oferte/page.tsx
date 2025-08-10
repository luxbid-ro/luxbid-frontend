'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Listing = {
  id: string
  title: string
  description: string
  category: string
  desiredPrice: number
  currency: string
  createdAt: string
  images: Array<{
    id: string
    imageUrl: string
    isPrimary: boolean
  }>
}

function OfertesContent() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    setSearchQuery(q)
    setSelectedCategory(category)
  }, [searchParams])

  // Fetch listings
  const fetchListings = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/listings`)
      
      if (response.ok) {
        const data = await response.json()
        setListings(data)
      } else {
        setError('Eroare la încărcarea ofertelor')
      }
    } catch (err) {
      setError('Eroare de conectare la server')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  // Filter listings based on search and category
  useEffect(() => {
    let filtered = listings

    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(listing => 
        listing.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    setFilteredListings(filtered)
  }, [listings, searchQuery, selectedCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter is handled by useEffect
  }

  const getRandomPlaceholder = (category: string) => {
    const placeholders = {
      'Ceasuri': 'https://via.placeholder.com/300x200/f0f0f0/666?text=Ceas+de+Lux',
      'Genți': 'https://via.placeholder.com/300x200/f0f0f0/666?text=Geanta+Designer',
      'Bijuterii': 'https://via.placeholder.com/300x200/f0f0f0/666?text=Bijuterie+Fina',
      'Artă': 'https://via.placeholder.com/300x200/f0f0f0/666?text=Opera+de+Arta'
    }
    return placeholders[category as keyof typeof placeholders] || 'https://via.placeholder.com/300x200/f0f0f0/666?text=Obiect+de+Lux'
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #D09A1E', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Se încarcă ofertele...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'red' }}>
          <h2>❌ Eroare</h2>
          <p>{error}</p>
          <button onClick={fetchListings} style={{ padding: '10px 20px', marginTop: '16px', background: '#D09A1E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Încearcă din nou
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '20px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--ink)', marginBottom: '16px' }}>
            Oferte Disponibile
          </h1>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Descoperă colecția noastră de obiecte de lux și fă o ofertă pentru cele care te atrag
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Caută ceasuri, genți, bijuterii..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>
              <button 
                type="submit"
                style={{ 
                  background: '#fff',
                  color: '#000',
                  border: '1px solid #ddd',
                  borderRadius: '12px', 
                  padding: '16px 24px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                Caută
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>Categorie</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Toate', 'Ceasuri', 'Genți', 'Bijuterii', 'Artă'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'Toate' ? '' : category)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '24px',
                    border: '2px solid',
                    borderColor: selectedCategory === (category === 'Toate' ? '' : category) ? '#D09A1E' : '#e5e5e5',
                    background: selectedCategory === (category === 'Toate' ? '' : category) ? '#D09A1E' : '#fff',
                    color: selectedCategory === (category === 'Toate' ? '' : category) ? '#fff' : '#666',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory) && (
            <div style={{ marginTop: '24px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>Filtre active:</span>
                {searchQuery && (
                  <span style={{ padding: '4px 12px', background: '#D09A1E', color: '#fff', borderRadius: '16px', fontSize: '12px' }}>
                    Căutare: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
                {selectedCategory && (
                  <span style={{ padding: '4px 12px', background: '#D09A1E', color: '#fff', borderRadius: '16px', fontSize: '12px' }}>
                    Categorie: {selectedCategory}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                Se afișează {filteredListings.length} din {listings.length} oferte
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredListings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--ink)' }}>Nu am găsit oferte</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              {searchQuery || selectedCategory 
                ? 'Încearcă să modifici filtrele sau să cauți altceva'
                : 'Nu există oferte disponibile momentan'
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('') }}
                style={{ padding: '12px 24px', background: '#D09A1E', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Șterge toate filtrele
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredListings.map(listing => (
              <div key={listing.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,.1)', transition: 'transform 0.2s ease', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '4/3', background: '#f5f5f5', position: 'relative' }}>
                  {listing.images?.length > 0 ? (
                    <img 
                      src={listing.images.find(img => img.isPrimary)?.imageUrl || listing.images[0]?.imageUrl} 
                      alt={listing.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                      color: '#999',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      📷 Fără imagine
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600' }}>
                    {listing.category}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px', lineHeight: '1.4' }}>
                    {listing.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                    {listing.description.length > 100 ? `${listing.description.substring(0, 100)}...` : listing.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '20px', fontWeight: '700', color: '#D09A1E', margin: 0 }}>
                        {listing.desiredPrice.toLocaleString()} {listing.currency}
                      </p>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Preț dorit</p>
                    </div>
                    <button
                      onClick={() => window.location.href = `/oferte/${listing.id}`}
                      style={{ padding: '10px 20px', background: '#D09A1E', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                    >
                      Vezi detalii
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function OfertePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #D09A1E', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Se încarcă...</p>
        </div>
      </div>
    }>
      <OfertesContent />
    </Suspense>
  )
}
