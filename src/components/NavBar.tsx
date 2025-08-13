'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import NotificationBell from './NotificationBell'

function NavBarContent() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
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
      if (!target.closest('[data-menu="hamburger"]') && !target.closest('[data-menu="account"]')) {
        setMobileMenuOpen(false)
        setAccountMenuOpen(false)
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
              width: '51.86px',
              height: '29.5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>LUX</span>
            <span style={{ 
              color: '#111',
              width: '42.95px', 
              height: '29.5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>BID</span>
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
            width: '51.86px',
            height: '29.5px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>LUX</span>
          <span className="bid" style={{ 
            color: '#111',
            width: '42.95px', 
            height: '29.5px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>BID</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Bell Icon for Notifications */}
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'background-color 0.2s ease',
            position: 'relative'
          }}>
            🔔
            {/* Notification badge */}
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
          </button>

          {/* Account Menu */}
          <div style={{ position: 'relative' }} data-menu="account">
            <button 
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
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
              <span style={{ fontSize: '18px' }}>👤</span>
              {!isMobile && <span>{isAuthed ? 'Cont' : 'Conectare'}</span>}
            </button>

            {/* Account Dropdown Menu */}
            {accountMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                width: '280px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 10000,
                marginTop: '8px',
                padding: '16px'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#333',
                  textAlign: 'center',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #eee'
                }}>
                  Cont
                </h3>

                {isAuthed ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="/dashboard" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>📊</span> Prezentare generală
                    </a>
                    
                    <a href="/mesaje" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>✉️</span> Mesaje
                    </a>
                    
                    <a href="/oferte" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>🛒</span> Cumpără
                    </a>
                    
                    <a href="/dashboard/add-listing" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>🏷️</span> Vinde
                    </a>
                    
                    <a href="/dashboard" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>❤️</span> Lista de dorințe
                    </a>
                    
                    <a href="/dashboard" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>🔍</span> Căutări salvate
                    </a>
                    
                    <a href="/dashboard" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>⌚</span> Colecția de ceasuri
                    </a>

                    <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
                    
                    <a href="/profile/edit" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>👤</span> Profil
                    </a>
                    
                    <a href="/dashboard" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      color: '#333',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span>🔔</span> Notificări
                    </a>
                    
                    <button 
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        background: 'none',
                        border: 'none',
                        color: '#333',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s ease',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <span>🚪</span> Deconectare
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href="/auth/login" style={{
                      padding: '12px',
                      background: '#fff',
                      color: '#333',
                      textDecoration: 'none',
                      border: '2px solid #D09A1E',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}>
                      Conectare
                    </a>
                    <a href="/auth/register" style={{
                      padding: '12px',
                      background: '#D09A1E',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                      border: 'none',
                      transition: 'all 0.2s ease'
                    }}>
                      Înregistrare
                    </a>
                    
                    <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#666', 
                      margin: '8px 0',
                      textAlign: 'center'
                    }}>
                      Ajută-ne să îmbunătățim LuxBid pentru toată lumea!
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#999', 
                      margin: '4px 0',
                      textAlign: 'center'
                    }}>
                      Participă la cercetări compensate și testează funcționalități noi, nepublicate.
                    </p>
                    <a href="/auth/register" style={{
                      fontSize: '14px',
                      color: '#D09A1E',
                      textDecoration: 'underline',
                      textAlign: 'center',
                      display: 'block',
                      marginTop: '8px'
                    }}>
                      Înregistrează-te acum
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
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
              width: '51.86px',
              height: '29.5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>LUX</span>
            <span style={{ 
              color: '#111',
              width: '42.95px', 
              height: '29.5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>BID</span>
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
              Cumpără după brand
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
            
            <a href="/dashboard" onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', textDecoration: 'none', fontSize: '16px', color: '#666' }}>
              Colecția de ceasuri
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
                  📊 Dashboard
                </a>
                <a href="/profile/edit" style={{
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
                  ⚙️ Editează Profilul
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