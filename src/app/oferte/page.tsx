'use client'
import React, { useState, useEffect, useCallback } from 'react'
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

export default function OfertePage() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Search & Filter states - initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('newest')

  // Update states when URL params change
  useEffect(() => {
    const newQuery = searchParams.get('q') || ''
    const newCategory = searchParams.get('category') || ''
    
    setSearchQuery(newQuery)
    setSelectedCategory(newCategory)
  }, [searchParams])

  const loadListings = useCallback(async () => {
    try {
      setLoading(true)
      console.log('🔍 Loading listings with filters:', { searchQuery, selectedCategory, sortBy })
      
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      const params = new URLSearchParams()
      
      if (searchQuery.trim()) params.append('q', searchQuery.trim())
      if (selectedCategory) params.append('category', selectedCategory)
      
      const url = `${base}/listings${params.toString() ? '?' + params.toString() : ''}`
      console.log('📡 Fetching:', url)
      
      const response = await fetch(url)
      
      if (response.ok) {
        let data = await response.json()
        console.log('📊 Data received:', data.length, 'listings')
        
        // Client-side sorting since backend doesn't support all sort options
        if (sortBy === 'oldest') {
          data = data.sort((a: Listing, b: Listing) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        } else if (sortBy === 'title') {
          data = data.sort((a: Listing, b: Listing) => a.title.localeCompare(b.title))
        }
        // 'newest' is already default from backend (orderBy: { createdAt: 'desc' })
        
        setListings(data)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err: any) {
      console.error('❌ Fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    loadListings()
  }, [loadListings])

  console.log('🔄 Render - loading:', loading, 'listings:', listings.length, 'error:', error)

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <h2>Se încarcă listările...</h2>
          <p>Debug: loading={String(loading)}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <h2>Eroare la încărcarea listărilor</h2>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Încearcă din nou</button>
        </div>
      </section>
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadListings() // This will use current searchQuery state
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('newest')
  }

  const getPrimaryImage = (listing: Listing) => {
    const primaryImg = listing.images?.find(img => img.isPrimary)
    return primaryImg?.imageUrl || listing.images?.[0]?.imageUrl || null
  }

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 20 }}>Explorează Oferte de Lux</h2>
          
          {/* Search & Filter Bar */}
          <div style={{ 
            background: '#fff', 
            padding: 20, 
            borderRadius: 12, 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: 30 
          }}>
            <form onSubmit={handleSearch} style={{ marginBottom: 15 }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr auto auto auto auto', 
                gap: 15, 
                alignItems: 'center' 
              }}>
                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Caută ceasuri, genți, bijuterii..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      fontSize: '1em'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#fff',
                      color: '#000',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      padding: '6px 12px',
                      cursor: 'pointer'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </div>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    minWidth: 150
                  }}
                >
                  <option value="">Toate categoriile</option>
                  <option value="Ceasuri">Ceasuri</option>
                  <option value="Genți">Genți</option>
                  <option value="Bijuterii">Bijuterii</option>
                  <option value="Artă">Artă</option>
                </select>
                
                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    minWidth: 130
                  }}
                >
                  <option value="newest">Cele mai noi</option>
                  <option value="oldest">Cele mai vechi</option>
                  <option value="title">Alfabetic</option>
                </select>
                
                {/* Clear Filters */}
                <button
                  type="button"
                  onClick={clearFilters}
                  style={{
                    padding: '12px 16px',
                    background: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  Resetează
                </button>
                
                {/* Results Count */}
                <div style={{ 
                  fontSize: '0.9em', 
                  color: '#666',
                  textAlign: 'center',
                  minWidth: 100
                }}>
                  {listings.length} rezultate
                </div>
              </div>
            </form>
            
            {/* Active Filters Display */}
            {(searchQuery || selectedCategory) && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9em', color: '#666' }}>Filtre active:</span>
                {searchQuery && (
                  <span style={{
                    background: '#9a7b0f',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: '0.8em'
                  }}>
                    "{searchQuery}"
                  </span>
                )}
                {selectedCategory && (
                  <span style={{
                    background: '#9a7b0f',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: '0.8em'
                  }}>
                    {selectedCategory}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Results */}
        {listings.length === 0 && !loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>📭 Nu s-au găsit rezultate</h3>
            <p style={{ color: '#666', marginBottom: 20 }}>
              {searchQuery || selectedCategory 
                ? 'Încearcă să modifici filtrele sau caută altceva.' 
                : 'Nu există listări momentan.'}
            </p>
            {(searchQuery || selectedCategory) && (
              <button 
                onClick={clearFilters}
                className="btn btn-gold"
                style={{ marginRight: 15 }}
              >
                Resetează filtrele
              </button>
            )}
            <a href="/dashboard/add-listing" className="btn btn-gold">
              Adaugă prima listare
            </a>
          </div>
        ) : (
          <div className="grid">
            {listings.map((listing) => {
              const primaryImage = getPrimaryImage(listing)
              return (
                <a 
                  key={listing.id} 
                  href={`/oferte/${listing.id}`} 
                  className="card" 
                  style={{ textDecoration: 'none', overflow: 'hidden' }}
                >
                  {/* Image */}
                  {primaryImage ? (
                    <div style={{ 
                      height: 200, 
                      backgroundImage: `url(${primaryImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      marginBottom: 15
                    }} />
                  ) : (
                    <div style={{ 
                      height: 200, 
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      marginBottom: 15
                    }}>
                      📸 Fără imagine
                    </div>
                  )}
                  
                  {/* Content */}
                  <h3 style={{ marginBottom: 8 }}>{listing.title}</h3>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.9em', 
                    marginBottom: 10,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {listing.description}
                  </p>
                  
                  {/* Preț de pornire */}
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ 
                      color: '#9a7b0f', 
                      fontWeight: 700, 
                      fontSize: '1.1em',
                      background: '#faf9f6',
                      padding: '4px 8px',
                      borderRadius: 6,
                      border: '1px solid #e6d7a3'
                    }}>
                      Preț dorit: {listing.desiredPrice.toLocaleString('ro-RO')} {listing.currency}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#9a7b0f', fontWeight: 700, fontSize: '0.9em' }}>
                      {listing.category}
                    </span>
                    <span style={{ color: '#999', fontSize: '0.8em' }}>
                      {new Date(listing.createdAt).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}