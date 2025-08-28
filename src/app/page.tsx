'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const check = () => setIsAuthed(!!localStorage.getItem('luxbid_token'))
    check()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'luxbid_token') check()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/oferte?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/oferte')
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/oferte?category=${encodeURIComponent(category)}`)
  }

  const handleVindeClick = () => {
    if (isAuthed) {
      router.push('/dashboard/add-listing')
    } else {
      router.push('/auth/register')
    }
  }

  return (
    <>
      {/* NavBar global in layout */}

      <section className="hero">
        <div className="container hero-inner">
                <h1>Toți cumpărătorii de lux, la un clic distanță.</h1>
      <p>Ceasuri, genți și bijuterii de lux</p>
          <div className="cta-row">
            <button type="button" onClick={handleVindeClick} className="btn-cta">Vinde un Obiect</button>
            <a href="/oferte" className="btn-cta">Explorează Ofertele</a>
          </div>
        </div>
      </section>

      <div className="surface">
        <div className="container search-row">
          <form onSubmit={handleSearch} style={{ display: 'contents' }}>
            <div className="search-big">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Caută ceasuri, genți, bijuterii..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="filter-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg> Caută
            </button>
          </form>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2>Categorii Populare</h2>
          {/* Updated styles - black borders like notification bell */}
          <div className="grid-2x2">
            <div 
              className="card" 
              onClick={() => handleCategoryClick('Ceasuri')}
            >
              <div style={{marginBottom: '14px', display: 'flex', justifyContent: 'center'}}>
                <img src="/icons/ceas.svg" width="64" height="64" alt="Ceas de lux" style={{filter: 'none'}} />
              </div>
              <h3>Ceasuri de Lux</h3>
              <p>Rolex, Patek Philippe, Audemars Piguet</p>
            </div>
            <div 
              className="card"
              onClick={() => handleCategoryClick('Genți')}
            >
              <div style={{marginBottom: '14px', display: 'flex', justifyContent: 'center'}}>
                <img src="/icons/geanta.svg" width="64" height="64" alt="Geantă de designer" style={{filter: 'none'}} />
              </div>
              <h3>Genți de Designer</h3>
              <p>Hermès, Chanel, Louis Vuitton, Gucci</p>
            </div>
            <div 
              className="card"
              onClick={() => handleCategoryClick('Bijuterii')}
            >
              <div style={{marginBottom: '14px', display: 'flex', justifyContent: 'center'}}>
                <img src="/icons/inel.svg" width="64" height="64" alt="Inel cu diamant" style={{filter: 'none'}} />
              </div>
              <h3>Bijuterii Fine</h3>
              <p>Diamante, aur, pietre prețioase</p>
            </div>
            <div 
              className="card"
              onClick={() => handleCategoryClick('Artă')}
            >
              <div style={{marginBottom: '14px', display: 'flex', justifyContent: 'center'}}>
                <img src="/icons/tablou.svg?v=3" width="64" height="64" alt="Tablou de artă" style={{filter: 'none'}} />
              </div>
              <h3>Artă & Colecții</h3>
              <p>Picturi, sculpturi, colecții rare</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px',
            padding: '20px 0'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '24px', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              <a 
                href="/legal/privacy-policy" 
                style={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D09A1E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                Politica de Confidențialitate
              </a>
              <a 
                href="/legal/terms-conditions" 
                style={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D09A1E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                Termeni și Condiții
              </a>
              <a 
                href="/legal/cookie-policy" 
                style={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D09A1E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                Politica Cookie-uri
              </a>
              <a 
                href="mailto:contact@luxbid.ro" 
                style={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D09A1E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                Contact
              </a>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>
              © 2025 LuxBid. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
