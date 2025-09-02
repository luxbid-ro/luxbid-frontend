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
          <span style={{ fontSize: '20px' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
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
          <button 
            onClick={() => {
              if (isAuthed) {
                router.push('/notifications')
              } else {
                router.push('/auth/login')
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {/* Notification badge - only show if authenticated */}
            {isAuthed && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '8px',
                height: '8px',
                background: '#D09A1E',
                borderRadius: '50%',
                fontSize: '10px',
                color: '#fff',
                fontWeight: 'bold'
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
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {/* Buy Section */}
          <div style={{ padding: '16px 0' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Cumpără un obiect de lux</h3>
            
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
                Cumpără ceas după brand
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
                Cumpără geantă după brand
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
                Caută bijuterii după brand
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
              Explorează categoriile
              <span style={{ fontSize: '12px', color: '#999' }}>›</span>
            </button>
          </div>

          {/* Sell Section */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Vinde un obiect de lux</h3>
            
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
              Publică anunțul tău
            </a>
          </div>
          
          {/* Services */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Servicii</h3>
            
            <a href="/dashboard/my-listings" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>⌚</span> Anunțurile mele
            </a>
            
            <a href="/oferte" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>🔍</span> Explorează ofertele
            </a>
            
            <a href="/mesaje" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>💬</span> Mesajele mele
            </a>
          </div>

          {/* About */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Despre</h3>
            
            <a href="/about" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>ℹ️</span> Despre LuxBid
            </a>
            
            <a href="/faq" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>❓</span> FAQ
            </a>
            
            <a href="/contact" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              <span>✉️</span> Contact
            </a>
          </div>

          {/* Legal */}
          <div style={{ padding: '16px 0', borderTop: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>Legal</h3>
            
            <a href="/legal/terms-conditions" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              <span>📋</span> Termeni și Condiții
            </a>
            
            <a href="/legal/privacy-policy" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              <span>🔐</span> Politica de Confidențialitate
            </a>
            
            <a href="/legal/cookie-policy" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 0', textDecoration: 'none', fontSize: '14px', color: '#666' }}>
              <span>🍪</span> Politica Cookies
            </a>
          </div>
          
          {/* Only show logout button if authenticated */}
          {isAuthed && (
            <div style={{ 
              marginTop: '16px', 
              paddingTop: '16px', 
              borderTop: '1px solid #eee'
            }}>
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
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
            </div>
          )}
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
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Prezentare generală
          </a>
          
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Mesaje
          </a>
          
          <a href="/oferte" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cumpără
          </a>
          
          <a href="/dashboard/add-listing" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            Vinde
          </a>
          
          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Lista de dorințe
          </a>
          
          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Căutări salvate
          </a>
          
          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            Colecția de ceasuri
          </a>

          <a href="/dashboard" onClick={() => setAccountMenuOpen(false)} style={{
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z"/>
              <path d="M22 7l-10 5L2 7"/>
            </svg>
            Cronografia
          </a>

          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
          
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Profil
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Notificări
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
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