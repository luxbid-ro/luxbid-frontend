'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import NotificationBell from './NotificationBell'
import { WATCH_BRANDS } from '@/constants/watchBrands'
import { BAG_BRANDS } from '@/constants/bagBrands'
import { JEWELRY_BRANDS } from '@/constants/jewelryBrands'

function NavBarContent() {
  const pathname = usePathname()
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [brandsMenuOpen, setBrandsMenuOpen] = useState(false)
  
  // Don't render NavBar on admin pages
  if (pathname?.includes('/admin-supreme') || pathname?.includes('/admin')) {
    return null
  }
  const [bagBrandsMenuOpen, setBagBrandsMenuOpen] = useState(false)
  const [jewelryBrandsMenuOpen, setJewelryBrandsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      console.log('Click outside detected, target:', target)
      if (!target.closest('[data-menu="hamburger"]') && !target.closest('[data-menu="account"]') && !target.closest('[data-menu="brands"]') && !target.closest('[data-menu="bag-brands"]') && !target.closest('[data-menu="jewelry-brands"]')) {
        console.log('Closing menus due to outside click')
        setMobileMenuOpen(false)
        setAccountMenuOpen(false)
        setBrandsMenuOpen(false)
        setBagBrandsMenuOpen(false)
        setJewelryBrandsMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              height: '29.5px'
            }}
          >
            <span style={{ 
              color: '#D09A1E',
              fontSize: '24px'
            }}>Lux</span><span style={{ 
              color: '#111',
              fontSize: '24px'
            }}>Bid</span>
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
          data-menu="hamburger"
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
          <span style={{ fontSize: '20px' }}>
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </span>
          {!isMobile && <span>Menu</span>}
        </button>

        <a className="brand" href="/" style={{ 
          fontWeight: '700',
          textDecoration: 'none',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          height: '29.5px'
        }}>
          <span className="lux" style={{ 
            color: '#D09A1E',
            fontSize: '24px'
          }}>Lux</span><span className="bid" style={{ 
            color: '#111',
            fontSize: '24px'
          }}>Bid</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Bell Icon for Notifications */}
          <NotificationBell />


          {/* Heart Icon for Favorites */}
          <button
            onClick={(e) => {
              e.preventDefault()
              if (isAuthed) {
                window.location.href = '/favorites'
              } else {
                window.location.href = '/auth/login'
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#333' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {/* Favorites count badge - only show if authenticated */}
            {isAuthed && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '8px',
                height: '8px',
                background: '#e53e3e',
                borderRadius: '50%',
                fontSize: '10px',
                color: '#fff',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}></span>
            )}
          </button>


          {/* Account Menu */}
          <div style={{ position: 'relative' }} data-menu="account">
            <button 
              onClick={() => {
                console.log('Account button clicked, isAuthed:', isAuthed)
                if (isAuthed) {
                  console.log('User is authenticated, opening menu')
                  setAccountMenuOpen(!accountMenuOpen)
                } else {
                  console.log('User not authenticated, redirecting to login')
                  router.push('/auth/login')
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: '#333',
                padding: '8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#333' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {!isMobile && <span>{isAuthed ? 'Cont' : 'Conectare'}</span>}
            </button>


          </div>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
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

      {/* Account Menu Overlay - Only show if authenticated */}
      {accountMenuOpen && isAuthed && (
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
          onClick={() => setAccountMenuOpen(false)}
        />
      )}

      {/* Slide Menu - ALWAYS RENDER but transform off-screen */}
      <div 
        data-menu="hamburger"
        style={{
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
        }}
      >
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
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            height: '29.5px'
          }}>
            <span style={{ 
              color: '#D09A1E',
              fontSize: '24px'
            }}>Lux</span><span style={{ 
              color: '#111',
              fontSize: '24px'
            }}>Bid</span>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Descoperă Luxul Section */}
          <div style={{ padding: '16px 0' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Descoperă Luxul</h3>
            
            {/* Watch Brands */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setBrandsMenuOpen(!brandsMenuOpen)}
                data-menu="brands"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '12px 0', 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '16px', 
                  color: '#333', 
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Ceasuri Premium
                <span style={{ fontSize: '12px', color: '#999', transform: brandsMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
              </button>
              
              {brandsMenuOpen && (
                <div 
                  data-menu="brands"
                  style={{ 
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    marginTop: '4px'
                  }}
                >
                  {WATCH_BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        router.push(`/branduri/${encodeURIComponent(brand)}`);
                        setBrandsMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        color: '#333',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f5f5f5'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#f8f9fa'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bag Brands */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setBagBrandsMenuOpen(!bagBrandsMenuOpen)}
                data-menu="bag-brands"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '12px 0', 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '16px', 
                  color: '#333', 
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Genți Designer
                <span style={{ fontSize: '12px', color: '#999', transform: bagBrandsMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
              </button>
              
              {bagBrandsMenuOpen && (
                <div 
                  data-menu="bag-brands"
                  style={{ 
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    marginTop: '4px'
                  }}
                >
                  {BAG_BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        router.push(`/branduri-genti/${encodeURIComponent(brand)}`);
                        setBagBrandsMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        color: '#333',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f5f5f5'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#f8f9fa'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Jewelry Brands */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setJewelryBrandsMenuOpen(!jewelryBrandsMenuOpen)}
                data-menu="jewelry-brands"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '12px 0', 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '16px', 
                  color: '#333', 
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Bijuterii Exclusiv
                <span style={{ fontSize: '12px', color: '#999', transform: jewelryBrandsMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
              </button>
              
              {jewelryBrandsMenuOpen && (
                <div 
                  data-menu="jewelry-brands"
                  style={{ 
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    marginTop: '4px'
                  }}
                >
                  {JEWELRY_BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        router.push(`/branduri-bijuterii/${encodeURIComponent(brand)}`);
                        setJewelryBrandsMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        color: '#333',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f5f5f5'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#f8f9fa'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => { setActiveCategory(''); router.push('/oferte?featured=true'); setMobileMenuOpen(false); }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 0', 
                background: 'none', 
                border: 'none', 
                fontSize: '16px', 
                color: '#333', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Colecții Speciale
              <span style={{ fontSize: '12px', color: '#999' }}>›</span>
            </button>
            
            <button 
              onClick={() => { setActiveCategory(''); router.push('/oferte'); setMobileMenuOpen(false); }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 0', 
                background: 'none', 
                border: 'none', 
                fontSize: '16px', 
                color: '#333', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Toate Ofertele
              <span style={{ fontSize: '12px', color: '#999' }}>›</span>
            </button>
          </div>

          {/* Servicii LuxBid Section */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Servicii LuxBid</h3>
            
            <a 
              href="/dashboard/add-listing" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                display: 'block', 
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 16px', 
                background: '#D09A1E',
                color: '#fff',
                textDecoration: 'none', 
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            >
              Listează Premium
            </a>
            
            <a 
              href="/evaluation" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 0', 
                textDecoration: 'none', 
                fontSize: '16px', 
                color: '#666' 
              }}
            >
              Evaluare Gratuită
            </a>
            
            <a 
              href="/authentication" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 0', 
                textDecoration: 'none', 
                fontSize: '16px', 
                color: '#666' 
              }}
            >
              Autentificare Certificată
            </a>
            
            <a 
              href="/support" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                width: '100%', 
                textAlign: 'left', 
                padding: '12px 0', 
                textDecoration: 'none', 
                fontSize: '16px', 
                color: '#666' 
              }}
            >
              Asistență Personală
            </a>
          </div>
          
          {/* Despre Platforma */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Despre Platforma</h3>
            
            <a href="/about" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Despre LuxBid
            </a>
            
            <a href="/partners" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Parteneri Oficiali
            </a>
            
            <a href="/testimonials" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Testimoniale
            </a>
          </div>

          {/* Legal */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Informații Legale</h3>
            
            <a href="/legal/terms-conditions" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              Termeni și Condiții
            </a>
            
            <a href="/legal/privacy-policy" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              Politica de Confidențialitate
            </a>
            
            <a href="/legal/cookie-policy" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              Politica Cookies
            </a>
          </div>
          

        </div>
      </div>

      {/* Account Slide Menu - FROM RIGHT TO LEFT - Only for authenticated users */}
      {isAuthed && (
        <div 
          data-menu="account"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            width: '300px',
            background: '#fff',
            zIndex: 9999,
            transform: accountMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            overflowY: 'auto',
            boxShadow: accountMenuOpen ? '-2px 0 15px rgba(0,0,0,0.2)' : 'none',
            padding: '20px',
            border: '1px solid #ddd'
          }}
        >
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
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            height: '29.5px'
          }}>
            <span style={{ 
              color: '#D09A1E',
              fontSize: '24px'
            }}>Lux</span><span style={{ 
              color: '#111',
              fontSize: '24px'
            }}>Bid</span>
          </h2>
          <button 
            onClick={() => setAccountMenuOpen(false)}
            style={{
              background: '#f0f0f0',
              border: '1px solid #ccc',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Dashboard Principal */}
          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Contul meu
          </a>
          
          <a href="/dashboard/my-listings" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Colecția mea
          </a>
          
          <a href="/favorites" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Favorituri
          </a>
          
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
          
          {/* Activități */}
          <a href="/mesaje" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Mesaje
          </a>
          
          <a href="/notifications" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Notificări
          </a>
          
          <a href="/history" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Istoric
          </a>
          
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
          
          {/* Acțiuni Rapide */}
          <a href="/oferte" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#D09A1E',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px',
            fontWeight: '500',
            background: 'rgba(208, 154, 30, 0.1)'
          }}>
            Cumpără Acum
          </a>
          
          <a href="/dashboard/add-listing" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#D09A1E',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px',
            fontWeight: '500',
            background: 'rgba(208, 154, 30, 0.1)'
          }}>
            Listează Premium
          </a>
          
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
          
          {/* Setări */}
          <a href="/profile/edit" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Profil
          </a>
          
          <a href="/preferences" onClick={() => setAccountMenuOpen(false)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            textDecoration: 'none',
            color: '#333',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}>
            Preferințe
          </a>
          
          
          <button 
            onClick={() => {
              handleLogout()
              setAccountMenuOpen(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              color: '#333',
              borderRadius: '6px',
              transition: 'background-color 0.2s ease',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontSize: '16px'
            }}
          >
            Deconectare
          </button>
        </div>
        </div>
      )}
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