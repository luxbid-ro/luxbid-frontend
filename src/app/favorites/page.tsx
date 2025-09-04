'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import { useFavorites } from '@/hooks/useFavorites'

interface FavoriteListing {
  id: string
  title: string
  price: number
  currency: string
  images: string[]
  location: string
  createdAt: string
  category: string
  condition: string
  brand?: string
}

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites, loading, removeFromFavorites } = useFavorites()

  // Check if user is authenticated
  React.useEffect(() => {
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
  }, [router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <NavBar />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #D09A1E',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px' }}>Se încarcă favoritele...</p>
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

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <NavBar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#e53e3e' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Anunțurile mele favorite
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Anunțurile pe care le-ai salvat pentru mai târziu
          </p>
        </div>

        {favorites.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: '#cbd5e0' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '12px'
            }}>
              Niciun anunț favorit încă
            </h3>
            <p style={{
              color: '#666',
              fontSize: '16px',
              marginBottom: '24px',
              maxWidth: '400px',
              margin: '0 auto 24px'
            }}>
              Salvează anunțurile care îți plac apăsând pe inimioara din dreptul fiecărui anunț
            </p>
            <button
              onClick={() => router.push('/oferte')}
              style={{
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#B8831A'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#D09A1E'}
            >
              Explorează ofertele
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {favorites.map((listing) => (
              <div
                key={listing.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onClick={() => router.push(`/oferte/${listing.id}`)}
              >
                {/* Image */}
                <div style={{
                  height: '200px',
                  background: listing.images && listing.images.length > 0
                    ? `url(${listing.images[0]})`
                    : '#f8f9fa',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {!listing.images || listing.images.length === 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: '#cbd5e0'
                    }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                    </div>
                  )}

                  {/* Remove from favorites button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromFavorites(listing.id)
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(229, 62, 62, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(229, 62, 62, 1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(229, 62, 62, 0.9)'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#fff' }}>
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {listing.title}
                  </h3>

                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#D09A1E',
                    marginBottom: '8px'
                  }}>
                    {listing.price.toLocaleString('ro-RO')} {listing.currency}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <span>{listing.location}</span>
                    <span>{listing.condition}</span>
                  </div>

                  {listing.brand && (
                    <div style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      {listing.brand}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{
            background: '#fed7d7',
            border: '1px solid #feb2b2',
            color: '#c53030',
            padding: '16px',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <strong>Eroare:</strong>
            </div>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
