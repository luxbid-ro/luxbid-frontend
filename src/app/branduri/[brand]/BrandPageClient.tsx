'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ListingImage } from '@/components/OptimizedImage'
import { WATCH_BRANDS } from '@/constants/watchBrands'

type Listing = {
  id: string
  title: string
  description: string
  category: string
  brand?: string
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

export default function BrandPageClient() {
  const params = useParams()
  const router = useRouter()
  const brandName = decodeURIComponent(params?.brand as string || '')
  
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Verify that the brand is valid
  const isValidBrand = WATCH_BRANDS.includes(brandName as any)

  useEffect(() => {
    if (!isValidBrand) {
      router.push('/oferte')
      return
    }

    const fetchBrandListings = async () => {
      // Fetch brand listings from API
      
      try {
        // Fetching from API
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
        const response = await fetch(`${apiUrl}/listings?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          mode: 'cors'
        })

        console.log('📡 API Response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          // Process API data
          
          // Filter by brand
          const brandListings = data.filter((listing: Listing) => 
            listing.brand === brandName && listing.category === 'Ceasuri'
          )
          
          // Filter listings by brand
          setListings(brandListings)
          
          if (brandListings.length === 0) {
            // No listings found for brand
          }
        } else {
          // API response not ok
          setListings([])
        }
      } catch (error) {
        // API connection failed
        // Show empty state
        setListings([])
      } finally {
        // Loading complete
        setLoading(false)
      }
    }

    fetchBrandListings()
  }, [brandName, isValidBrand, router])

  const getRandomPlaceholder = () => {
    return 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=200&fit=crop&crop=center'
  }

  if (!isValidBrand) {
    return null // Will redirect
  }

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #f3f3f3', 
              borderTop: '3px solid #D09A1E',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: '#666', fontSize: '16px' }}>Se încarcă anunțurile {brandName}...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px' }}>
            <h2 style={{ color: '#e74c3c', marginBottom: '16px' }}>Eroare</h2>
            <p style={{ color: '#666' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        {/* Brand Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
          borderRadius: '16px',
          color: '#fff'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: '900', 
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            {brandName}
          </h1>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Descoperă colecția de ceasuri {brandName} disponibile pe LuxBid
          </p>
          <div style={{ 
            marginTop: '24px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            {listings.length} {listings.length === 1 ? 'anunț găsit' : 'anunțuri găsite'}
          </div>
        </div>

        {/* Listings or Empty State */}
        {listings.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px', 
            background: '#fff', 
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px',
              opacity: 0.3
            }}>⌚</div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#333', 
              marginBottom: '16px' 
            }}>
              Momentan nu sunt anunțuri {brandName}
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: '16px', 
              marginBottom: '32px',
              maxWidth: '400px',
              margin: '0 auto 32px'
            }}>
              Fii primul care publică un ceas {brandName} pe LuxBid și ajută-i pe colecționari să îl găsească!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/dashboard/add-listing')}
                style={{
                  padding: '16px 32px',
                  background: '#D09A1E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(208, 154, 30, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(208, 154, 30, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(208, 154, 30, 0.3)'
                }}
              >
                📝 Publică un anunț {brandName}
              </button>
              <button
                onClick={() => router.push('/oferte')}
                style={{
                  padding: '16px 32px',
                  background: '#fff',
                  color: '#D09A1E',
                  border: '2px solid #D09A1E',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D09A1E'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.color = '#D09A1E'
                }}
              >
                🔍 Vezi toate anunțurile
              </button>
            </div>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map((listing) => (
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
                onClick={() => router.push(`/oferte/${listing.id}`)}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <ListingImage
                    src={listing.images && listing.images.length > 0 ? listing.images[0] : null}
                    alt={listing.title}
                    category={listing.category}
                    priority={false}
                    style={{ 
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  {/* Brand Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(208, 154, 30, 0.95)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {brandName}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  {/* Title */}
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: 'var(--ink)', 
                    marginBottom: '12px',
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
                      background: 'linear-gradient(135deg, #D09A1E, #B8860B)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '14px',
                      marginRight: '12px'
                    }}>
                      {listing.user.firstName?.charAt(0) || listing.user.companyName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                        {listing.user.firstName && listing.user.lastName 
                          ? `${listing.user.firstName} ${listing.user.lastName}`
                          : listing.user.companyName || 'Utilizator'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {new Date(listing.createdAt).toLocaleDateString('ro-RO')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to all brands */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => router.push('/oferte')}
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#D09A1E',
              border: '2px solid #D09A1E',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D09A1E'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#D09A1E'
            }}
          >
            ← Vezi toate anunțurile
          </button>
        </div>
      </div>
    </div>
  )
}
