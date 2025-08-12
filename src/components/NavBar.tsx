'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import NotificationBell from './NotificationBell'

export default function NavBar() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const check = () => setIsAuthed(!!localStorage.getItem('luxbid_token'))
    check()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'luxbid_token') check()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Track active category from URL
  useEffect(() => {
    const category = searchParams?.get('category') || ''
    setActiveCategory(category)
  }, [searchParams])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/oferte?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/oferte')
    }
  }

  // Handle category filter
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    router.push(`/oferte?category=${encodeURIComponent(category)}`)
  }

  // Get style for category button
  const getCategoryButtonStyle = (category: string) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: activeCategory === category ? '#D09A1E' : 'inherit',
    fontSize: 'inherit',
    fontWeight: activeCategory === category ? '600' : 'normal',
    borderBottom: activeCategory === category ? '2px solid #D09A1E' : '2px solid transparent',
    paddingBottom: '8px',
    transition: 'all 0.2s ease'
  })

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('luxbid_token')
    setIsAuthed(false)
    router.push('/')
  }

  return (
    <div className="nav" style={{ position: 'relative' }}>
      <div className="container nav-row" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}>
        <a className="brand" href="/" style={{ 
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: '700',
          textDecoration: 'none',
          color: '#D09A1E',
          flexShrink: 0
        }}>
          <span className="lux">Lux</span><span className="bid" style={{ color: '#111' }}>Bid</span>
        </a>
        
        {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: isMobile ? 'block' : 'none',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            position: 'relative',
            zIndex: 1001
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Desktop Menu - HIDDEN ON MOBILE */}
        <nav style={{
          display: isMobile ? 'none' : 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <button 
            type="button"
            onClick={() => handleCategoryClick('Ceasuri')}
            style={getCategoryButtonStyle('Ceasuri')}
          >
            Ceasuri
          </button>
          <button 
            type="button"
            onClick={() => handleCategoryClick('Genți')}
            style={getCategoryButtonStyle('Genți')}
          >
            Genți
          </button>
          <button 
            type="button"
            onClick={() => handleCategoryClick('Bijuterii')}
            style={getCategoryButtonStyle('Bijuterii')}
          >
            Bijuterii
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveCategory('')
              router.push('/oferte')
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: !activeCategory ? '#D09A1E' : 'inherit',
              fontSize: 'inherit',
              fontWeight: !activeCategory ? '600' : 'normal',
              borderBottom: !activeCategory ? '2px solid #D09A1E' : '2px solid transparent',
              paddingBottom: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            Toate Ofertele
          </button>
        </nav>
        {/* Search - HIDDEN ON MOBILE */}
        <div style={{
          display: isMobile ? 'none' : 'block',
          flex: 1,
          maxWidth: '300px',
          margin: '0 20px'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'contents' }}>
            <div className="search-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Caută ceasuri, genți, bijuterii..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  position: 'absolute', 
                  right: '8px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  cursor: 'pointer',
                  opacity: 0 
                }}
              >
                🔍
              </button>
            </div>
          </form>
        </div>
        
        {/* Auth Buttons - RESPONSIVE */}
        <div style={{
          display: isMobile ? 'none' : 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {isAuthed ? (
            <>
              <NotificationBell />
              <a className="btn btn-outline" href="/mesaje" style={{ marginRight: '8px' }}>
                💬 Mesaje
              </a>
              <a className="btn btn-outline" href="/dashboard">
                Contul Meu
              </a>
              <button 
                onClick={handleLogout}
                className="btn"
                style={{ 
                  background: '#f5f5f5', 
                  color: '#666', 
                  border: '1px solid #ddd',
                  marginLeft: '8px'
                }}
              >
                Deconectare
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-outline" href="/auth/login">
                Conectare
              </a>
              <a className="btn btn-gold" href="/auth/register">
                Înregistrare
              </a>
            </>
          )}
        </div>
      </div>
      
              {/* Mobile Navigation Menu */}
        {mobileMenuOpen && isMobile && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #eee',
            borderTop: 'none',
            zIndex: 1000,
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxHeight: '80vh',
            overflowY: 'auto',
            width: '100vw',
            marginLeft: '-16px' // Offset container padding
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => {
                handleCategoryClick('Ceasuri')
                setMobileMenuOpen(false)
              }}
              style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: activeCategory === 'Ceasuri' ? '#D09A1E' : '#fff',
                color: activeCategory === 'Ceasuri' ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: '500'
              }}
            >
              Ceasuri
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Genți')
                setMobileMenuOpen(false)
              }}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: activeCategory === 'Genți' ? '#D09A1E' : '#fff',
                color: activeCategory === 'Genți' ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px'
              }}
            >
              Genți
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Bijuterii')
                setMobileMenuOpen(false)
              }}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: activeCategory === 'Bijuterii' ? '#D09A1E' : '#fff',
                color: activeCategory === 'Bijuterii' ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px'
              }}
            >
              Bijuterii
            </button>
            <button 
              onClick={() => {
                setActiveCategory('')
                router.push('/oferte')
                setMobileMenuOpen(false)
              }}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: !activeCategory ? '#D09A1E' : '#fff',
                color: !activeCategory ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px'
              }}
            >
              Toate Ofertele
            </button>
            
            {/* Mobile Auth Buttons */}
            <div style={{ 
              marginTop: '16px', 
              paddingTop: '16px', 
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '12px'
            }}>
              {isAuthed ? (
                <>
                  <a href="/dashboard" style={{
                    flex: 1,
                    padding: '16px',
                    background: '#f8f9fa',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    border: '1px solid #ddd'
                  }}>
                    👤 Contul Meu
                  </a>
                  <button 
                    onClick={handleLogout}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: '#fff',
                      color: '#666',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Deconectare
                  </button>
                </>
              ) : (
                <>
                  <a href="/auth/login" style={{
                    flex: 1,
                    padding: '16px',
                    background: '#fff',
                    color: '#333',
                    textDecoration: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Conectare
                  </a>
                  <a href="/auth/register" style={{
                    flex: 1,
                    padding: '16px',
                    background: '#D09A1E',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Înregistrare
                  </a>
                </>
              )}
            </div>

            {/* Mobile Search */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Caută..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      minHeight: '48px'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      padding: '16px',
                      background: '#D09A1E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      minWidth: '60px'
                    }}
                  >
                    🔍
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
