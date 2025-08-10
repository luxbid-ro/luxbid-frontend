'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import NotificationBell from './NotificationBell'

export default function NavBar() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
    router.push(`/oferte?category=${encodeURIComponent(category)}`)
  }

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
        <nav className="nav-menu">
          <button 
            onClick={() => handleCategoryClick('Ceasuri')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Ceasuri
          </button>
          <button 
            onClick={() => handleCategoryClick('Genți')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Genți
          </button>
          <button 
            onClick={() => handleCategoryClick('Bijuterii')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Bijuterii
          </button>
          <button 
            onClick={() => router.push('/oferte')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Oferte
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
              <a className="btn btn-outline" href="/mesaje" style={{ marginRight: '8px' }}>
                💬 Mesaje
              </a>
              <NotificationBell />
              <a className="btn btn-outline" href="/dashboard">Contul Meu</a>
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
              <a className="btn btn-outline" href="/auth/login">Conectare</a>
              <a className="btn btn-gold" href="/auth/register">Înregistrare</a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
