'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import NotificationBell from './NotificationBell'

function NavBarContent() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Start as mobile-first
  const router = useRouter()
  const searchParams = useSearchParams()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    
    // Check immediately
    checkMobile()
    
    // Also check after a small delay to ensure proper detection
    const timeout = setTimeout(checkMobile, 100)
    
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeout)
    }
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

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    setSearchQuery(q)
    setActiveCategory(category)
  }, [searchParams])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (activeCategory) params.set('category', activeCategory)
    router.push(`/oferte?${params.toString()}`)
  }

  // Handle category filter
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    router.push(`/oferte?category=${encodeURIComponent(category)}`)
  }

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
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* LEFT: Menu Button (Chrono24 style) */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px 12px',
            color: '#333',
            borderRadius: '4px',
            transition: 'background-color 0.2s ease',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ fontSize: '20px' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
          {!isMobile && <span>Menu</span>}
        </button>

        {/* CENTER: LuxBid Logo (Chrono24 style) */}
        <a className="brand" href="/" style={{ 
          fontSize: isMobile ? '22px' : '32px',
          fontWeight: '700',
          textDecoration: 'none',
          color: '#D09A1E',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          letterSpacing: '1px'
        }}>
          <span className="lux">LUX</span><span className="bid" style={{ color: '#111' }}>BID</span>
        </a>

        {/* RIGHT: Account (Chrono24 style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthed ? (
            <>
              <a href="/dashboard" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: '#333',
                padding: '8px 12px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '18px' }}>👤</span>
                {!isMobile && <span>Account</span>}
              </a>
            </>
          ) : (
            <a href="/auth/login" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#333',
              padding: '8px 12px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ fontSize: '18px' }}>👤</span>
              {!isMobile && <span>Log in</span>}
            </a>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Slide Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '300px',
        background: '#fff',
        zIndex: 1000,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #eee'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#D09A1E'
          }}>
            LUXBID
          </h2>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ✕
          </button>
        </div>
          {/* CHRONO24 STYLE MENU */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            
            {/* Buy a luxury item section */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Cumpără un obiect de lux</h3>
              
              <button onClick={() => { handleCategoryClick('Ceasuri'); setMobileMenuOpen(false); }} 
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
                Ceasuri de lux
              </button>
              
              <button onClick={() => { handleCategoryClick('Genți'); setMobileMenuOpen(false); }} 
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
                Genți de designer
              </button>
              
              <button onClick={() => { handleCategoryClick('Bijuterii'); setMobileMenuOpen(false); }} 
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
                Bijuterii fine
              </button>
              
              <button onClick={() => { setActiveCategory(''); router.push('/oferte'); setMobileMenuOpen(false); }} 
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
                Explorează toate categoriile
              </button>
            </div>

            {/* Sell section */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Vinde un obiect</h3>
              
              <a href="/dashboard/add-listing" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                Ca vânzător privat
              </a>
              
              <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                Devino dealer LuxBid
              </a>
              
              <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                Evaluare gratuită
              </a>
            </div>

            {/* Services section */}
            <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Servicii</h3>
              
              <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                Colecția mea
              </a>
              
              <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                LuxPulse
              </a>
              
              <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
                Magazin
              </a>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div style={{ 
              marginTop: '16px', 
              paddingTop: '16px', 
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '12px',
              flexDirection: 'column'
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
                    fontWeight: '500',
                    border: 'none'
                  }}>
                    Înregistrare
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NavBar() {
  return (
    <Suspense fallback={<div className="nav" style={{ height: '60px', background: '#fff' }} />}>
      <NavBarContent />
    </Suspense>
  )
}
// Force deployment trigger