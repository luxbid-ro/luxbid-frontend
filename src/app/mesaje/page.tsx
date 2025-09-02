'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Conversation = {
  offerId: string
  otherUser: {
    id: string
    name: string
    email: string
  }
  listing: {
    id: string
    title: string
    images?: string[]
  }
  lastMessage: {
    content: string
    createdAt: string
    senderId: string
  }
  unreadCount: number
}

export default function MesajePage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('luxbid_token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/messages/conversations`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setConversations(data)
        } else {
          setError('Eroare la încărcarea conversațiilor')
        }
      } catch (err) {
        setError('Eroare de conectare la server')
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Ieri'
    } else if (diffDays < 7) {
      return `${diffDays} zile`
    } else {
      return date.toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit' })
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #D09A1E', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Se încarcă mesajele...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '20px' }}>
        <div style={{ textAlign: 'center', color: 'red' }}>
          <h2>❌ Eroare</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', padding: '20px 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--ink)', marginBottom: '16px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '12px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Mesajele Tale
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Conversații din oferte acceptate
          </p>
        </div>

        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D09A1E" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--ink)' }}>Nu ai mesaje încă</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Mesajele vor apărea aici când cineva acceptă o ofertă de pe listările tale
            </p>
            <a 
              href="/oferte" 
              style={{ 
                display: 'inline-block',
                padding: '12px 24px', 
                background: '#D09A1E', 
                color: '#fff', 
                textDecoration: 'none',
                borderRadius: '8px', 
                fontWeight: '600'
              }}
            >
              Explorează Ofertele
            </a>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
            {conversations.map((conversation, index) => (
              <div 
                key={conversation.offerId}
                onClick={() => router.push(`/chat/${conversation.offerId}`)}
                style={{ 
                  display: 'flex', 
                  padding: '20px',
                  borderBottom: index < conversations.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Imagine produs */}
                <div style={{ width: '60px', height: '60px', marginRight: '16px', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {conversation.listing.images && conversation.listing.images.length > 0 ? (
                    <img 
                      src={conversation.listing.images[0]} 
                      alt={conversation.listing.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: '#999', fontSize: '24px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21,15 16,10 5,21"></polyline>
                      </svg>
                    </span>
                  )}
                </div>

                {/* Conținut conversație */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: 'var(--ink)', 
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '60%'
                    }}>
                      {conversation.otherUser.name}
                    </h3>
                    <span style={{ fontSize: '12px', color: '#999', whiteSpace: 'nowrap' }}>
                      {formatDate(conversation.lastMessage.createdAt)}
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    margin: '0 0 4px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    Produs: {conversation.listing.title}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#333', 
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                      marginRight: '8px'
                    }}>
                      {conversation.lastMessage.content}
                    </p>
                    
                    {conversation.unreadCount > 0 && (
                      <span style={{ 
                        backgroundColor: '#D09A1E', 
                        color: '#fff', 
                        borderRadius: '12px', 
                        padding: '2px 8px', 
                        fontSize: '12px',
                        fontWeight: '600',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
