'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import NotificationBell from './NotificationBell'

export default function NavBar() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

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
    <div className="nav">
      <div className="container nav-row">
        <a className="brand" href="/"><span className="lux">Lux</span><span className="bid">Bid</span></a>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-only mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '8px',
            display: 'none'
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <nav className="nav-menu">
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
        <div className="nav-search">
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
        <div className="nav-actions">
          {isAuthed ? (
            <>
              <NotificationBell />
              <a className="btn btn-outline mobile-hidden" href="/mesaje" style={{ marginRight: '8px' }}>
                💬 Mesaje
              </a>
              <a className="btn btn-outline" href="/dashboard">
                <span className="mobile-hidden">Contul Meu</span>
                <span className="mobile-only">👤</span>
              </a>
              <button 
                onClick={handleLogout}
                className="btn mobile-hidden"
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
                <span className="mobile-hidden">Conectare</span>
                <span className="mobile-only">IN</span>
              </a>
              <a className="btn btn-gold" href="/auth/register">
                <span className="mobile-hidden">Înregistrare</span>
                <span className="mobile-only">UP</span>
              </a>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #eee',
          borderTop: 'none',
          zIndex: 1000,
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => {
                handleCategoryClick('Ceasuri')
                setMobileMenuOpen(false)
              }}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: activeCategory === 'Ceasuri' ? '#D09A1E' : '#fff',
                color: activeCategory === 'Ceasuri' ? '#fff' : '#333',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px'
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
            
            {/* Mobile Search */}
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
              <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Caută..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 16px',
                      background: '#D09A1E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
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
