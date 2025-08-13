'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import NotificationBell from './NotificationBell'

function NavBarContent() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  // Check if we're on login or register pages
  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register'

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    checkMobile()
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

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    setSearchQuery(q)
    setActiveCategory(category)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (activeCategory) params.set('category', activeCategory)
    router.push(`/oferte?${params.toString()}`)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    router.push(`/oferte?category=${encodeURIComponent(category)}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('luxbid_token')
    setIsAuthed(false)
    router.push('/')
  }

  // Render simple navbar for auth pages
  if (isAuthPage) {
    return (
      <div className="nav" style={{ position: 'relative' }}>
        <div className="container nav-row" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          position: 'relative',
          padding: '16px 0',
          minHeight: '60px'
        }}>
          <a 
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: '28px',
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            <span style={{ color: '#D09A1E' }}>LUX</span><span style={{ color: '#111' }}>BID</span>
          </a>
        </div>
      </div>
    )
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
        >
          <span style={{ fontSize: '20px' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
          {!isMobile && <span>Menu</span>}
        </button>

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthed ? (
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
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              {!isMobile && <span>Account</span>}
            </a>
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
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              {!isMobile && <span>Log in</span>}
            </a>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Slide Menu - ALWAYS RENDER but transform off-screen */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '300px',
        background: '#fff',
        zIndex: 9999,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        overflowY: 'auto',
        boxShadow: mobileMenuOpen ? '2px 0 15px rgba(0,0,0,0.2)' : 'none',
        padding: '20px',
        border: '1px solid #ddd'
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
            letterSpacing: '1px'
          }}>
            <span style={{ color: '#D09A1E' }}>LUX</span><span style={{ color: '#111' }}>BID</span>
          </h2>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: '#f0f0f0',
              border: '1px solid #ccc',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Cumpara un obiect de lux</h3>
            
            <button onClick={() => { handleCategoryClick('Ceasuri'); setMobileMenuOpen(false); }} 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
              Ceasuri de lux
            </button>
            
            <button onClick={() => { handleCategoryClick('Genti'); setMobileMenuOpen(false); }} 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
              Genti de designer
            </button>
            
            <button onClick={() => { handleCategoryClick('Bijuterii'); setMobileMenuOpen(false); }} 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
              Bijuterii fine
            </button>
            
            <button onClick={() => { setActiveCategory(''); router.push('/oferte'); setMobileMenuOpen(false); }} 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', fontSize: '16px', color: '#666', cursor: 'pointer' }}>
              Exploreaza toate categoriile
            </button>
          </div>

          <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Vinde un obiect</h3>
            
            <a href="/dashboard/add-listing" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Ca vanzator privat
            </a>
            
            <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Devino dealer LuxBid
            </a>
            
            <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Evaluare gratuita
            </a>
          </div>

          <div style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Servicii</h3>
            
            <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Colectia mea
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
                  Contul Meu
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
                  Inregistrare
                </a>
              </>
            )}
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