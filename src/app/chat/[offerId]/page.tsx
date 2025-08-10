'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Chat from '@/components/Chat'

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const offerId = params?.offerId as string
  
  const [conversation, setConversation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadConversation = async () => {
      try {
        const token = localStorage.getItem('luxbid_token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/chat/offer/${offerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (response.ok) {
          const data = await response.json()
          setConversation(data)
        } else if (response.status === 403) {
          setError('Această ofertă nu a fost încă acceptată sau nu aveți acces.')
        } else {
          setError('Eroare la încărcarea conversației.')
        }
      } catch (err) {
        setError('Eroare la încărcarea conversației.')
      } finally {
        setLoading(false)
      }
    }

    if (offerId) {
      loadConversation()
    }
  }, [offerId, router])

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div>Se încarcă conversația...</div>
      </div>
    )
  }

  if (error) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>🚫 Acces restricționat</h2>
          <p style={{ color: '#666', marginBottom: 20 }}>{error}</p>
          <p style={{ fontSize: '0.9em', color: '#999' }}>
            Chat-ul privat devine disponibil doar după acceptarea ofertei.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn btn-gold"
          >
            Înapoi la Dashboard
          </button>
        </div>
      </section>
    )
  }

  if (!conversation) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Conversație indisponibilă</h2>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn btn-gold"
          >
            Înapoi la Dashboard
          </button>
        </div>
      </section>
    )
  }

  // Determină cine este celălalt utilizator
  const currentUserId = localStorage.getItem('luxbid_user_id') // Vom adăuga asta
  const otherUser = conversation.seller.id === currentUserId 
    ? conversation.buyer 
    : conversation.seller

  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <button 
              onClick={() => router.back()}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#9a7b0f', 
                cursor: 'pointer',
                marginBottom: 10
              }}
            >
              ← Înapoi
            </button>
            
            <h2 style={{ margin: '0 0 8px 0' }}>
              Chat pentru: {conversation.listing.title}
            </h2>
            
            <div style={{ 
              display: 'flex', 
              gap: 20, 
              fontSize: '0.9em', 
              color: '#666',
              flexWrap: 'wrap'
            }}>
              <span>
                <strong>Vânzător:</strong> {conversation.seller.name}
              </span>
              <span>
                <strong>Cumpărător:</strong> {conversation.buyer.name}
              </span>
            </div>
          </div>

          {/* Chat Component */}
          <Chat 
            conversationId={conversation.id}
            otherUserName={otherUser.name}
          />

          {/* Footer Info */}
          <div style={{ 
            marginTop: 20, 
            padding: 16, 
            background: '#f8f9fa', 
            borderRadius: 8,
            fontSize: '0.9em',
            color: '#666'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              💬 <strong>Chat privat securizat</strong> - Mesajele sunt criptate și vizibile doar pentru voi doi.
            </p>
            <p style={{ margin: 0 }}>
              🤝 Folosiți acest chat pentru a finaliza detaliile tranzacției în siguranță.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
