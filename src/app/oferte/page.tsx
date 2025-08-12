'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Listing = {
  id: string
  title: string
  description: string
  category: string
  price: number
  currency: string
  createdAt: string
  images: string[]
  user: {
    id: string
    email: string
    firstName?: string
    lastName?: string
    companyName?: string
  }
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

  // Mock data for demonstration
  const mockListings = [
    {
      id: '1',
      title: 'Rolex Submariner 2023',
      description: 'Ceas de lux Rolex Submariner, model 2023, perfect stare, cutie originală și certificat. Prețul este ferm.',
      category: 'Ceasuri',
      price: 45000,
      currency: 'EUR',
      createdAt: '2024-08-12T10:00:00Z',
      images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop'],
      user: {
        id: '1',
        email: 'demo@luxbid.ro',
        firstName: 'Alexandru',
        lastName: 'Popescu'
      }
    },
    {
      id: '2',
      title: 'Hermès Birkin Bag',
      description: 'Geantă Hermès Birkin din piele autentică, culoare negru, mărimea 35cm. Vine cu cutie și certificat de autenticitate.',
      category: 'Genți',
      price: 25000,
      currency: 'EUR',
      createdAt: '2024-08-12T09:30:00Z',
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop'],
      user: {
        id: '2',
        email: 'maria@luxbid.ro',
        firstName: 'Maria',
        lastName: 'Ionescu'
      }
    },
    {
      id: '3',
      title: 'Inel cu Diamant Tiffany & Co',
      description: 'Inel de logodnă Tiffany & Co cu diamant de 2 carate, aur alb 18k. Certificat GIA inclus.',
      category: 'Bijuterii',
      price: 15000,
      currency: 'EUR',
      createdAt: '2024-08-12T09:00:00Z',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop'],
      user: {
        id: '3',
        email: 'cristina@luxbid.ro',
        firstName: 'Cristina',
        lastName: 'Marin'
      }
    }
  ]

  // Fetch listings from real API
  const fetchListings = useCallback(async () => {
    setLoading(true)
    setError('')
    
    try {
      console.log('🔄 Fetching from API...', process.env.NEXT_PUBLIC_API_BASE_URL)
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      const response = await fetch(`${apiUrl}/listings`)
      
      console.log('📡 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📦 API Data received:', data.length, 'listings')
        
        if (data.length > 0) {
          setListings(data)
          setLoading(false)
          console.log('✅ Real data loaded from API')
        } else {
          console.warn('⚠️ API returned empty, using mock data')
          setListings(mockListings)
          setLoading(false)
        }
      } else {
        console.warn('⚠️ API response not ok, using mock data')
        setListings(mockListings)
        setLoading(false)
      }
    } catch (err) {
      console.error('❌ API connection failed:', err)
      console.log('🔄 Using mock data as fallback')
      setListings(mockListings)
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
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: '#666' }}>
            {filteredListings.length} {filteredListings.length === 1 ? 'ofertă găsită' : 'oferte găsite'}
          </p>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '16px', color: '#666' }}>Nu s-au găsit oferte</h3>
            <p style={{ color: '#999' }}>Încearcă să modifici criteriile de căutare</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}>
            {filteredListings.map((listing) => (
              <div 
                key={listing.id} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,.1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,.1)'
                }}
                onClick={() => window.location.href = `/oferte/${listing.id}`}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={listing.images && listing.images.length > 0 ? listing.images[0] : getRandomPlaceholder(listing.category)}
                    alt={listing.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = getRandomPlaceholder(listing.category)
                    }}
                  />
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {listing.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  {/* Title */}
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: 'var(--ink)', 
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {listing.title}
                  </h3>

                  {/* Description */}
                  <p style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    lineHeight: '1.5',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {listing.description}
                  </p>

                  {/* Price */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '800', 
                      color: '#D09A1E'
                    }}>
                      {listing.price?.toLocaleString()} {listing.currency}
                    </div>
                  </div>

                  {/* User Info */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    paddingTop: '16px',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#D09A1E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginRight: '12px'
                    }}>
                      {listing.user?.firstName?.charAt(0) || listing.user?.email?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>
                        {listing.user?.firstName && listing.user?.lastName 
                          ? `${listing.user.firstName} ${listing.user.lastName}` 
                          : listing.user?.companyName || 'Utilizator'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {new Date(listing.createdAt).toLocaleDateString('ro-RO')}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '16px',
                      background: '#D09A1E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#B8831A'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#D09A1E'}
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/oferte/${listing.id}`
                    }}
                  >
                    Vezi Detalii
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function OfertesPage() {
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