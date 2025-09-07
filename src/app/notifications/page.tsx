'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotificationsPage() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userCreatedAt, setUserCreatedAt] = useState<string | null>(null)
  const [welcomeMessageRead, setWelcomeMessageRead] = useState(false)
  const router = useRouter()

  // Fetch user profile to get creation date
  const fetchUserProfile = async () => {
    try {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('👤 Notifications page - User profile fetched:', {
          id: data.id,
          email: data.email,
          createdAt: data.createdAt,
          createdAtType: typeof data.createdAt,
          createdAtDate: new Date(data.createdAt).toISOString(),
          isValidDate: !isNaN(new Date(data.createdAt).getTime())
        })
        setUserCreatedAt(data.createdAt)
      } else {
        console.log('❌ Failed to fetch user profile:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  // Check if user is new (< 24 hours)
  const isNewUser = () => {
    if (!userCreatedAt) {
      console.log('❌ No userCreatedAt found in notifications page')
      return false
    }
    
    const createdDate = new Date(userCreatedAt)
    const now = new Date()
    
    // Check if date is valid
    if (isNaN(createdDate.getTime())) {
      console.log('❌ Invalid date format in notifications page:', userCreatedAt)
      return false
    }
    
    const diffInMs = now.getTime() - createdDate.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    
    // Debug logging
    console.log('🔍 Notifications page - User age check:', {
      userCreatedAt,
      createdDate: createdDate.toISOString(),
      now: now.toISOString(),
      diffInMs,
      diffInHours: diffInHours.toFixed(2),
      diffInDays: diffInDays.toFixed(2),
      isNew: diffInHours < 24,
      isOld: diffInDays > 1
    })
    
    return diffInHours < 24
  }

  // Load welcome message read status din localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('luxbid_token')
      if (token) {
        const saved = localStorage.getItem(`luxbid_welcome_read_${token}`)
        if (saved === 'true') {
          setWelcomeMessageRead(true)
        }
      }
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    setIsAuthed(true)
    setLoading(false)
    fetchUserProfile()
  }, [router])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--surface)'
      }}>
        <div>Se încarcă...</div>
      </div>
    )
  }

  if (!isAuthed) {
    return null
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--surface)', 
      padding: '40px 20px' 
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          background: '#fff', 
          padding: '32px', 
          borderRadius: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '32px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </span>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                Notificări
              </h1>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Rămâi la curent cu toate activitățile tale
              </p>
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(() => {
              const userIsNew = isNewUser()
              console.log('🔔 Notifications page - Display logic:', {
                userIsNew,
                welcomeMessageRead,
                userCreatedAt
              })

              // Show welcome message only for new users who haven't read it
              if (userIsNew && !welcomeMessageRead) {
                console.log('✅ Notifications page - Showing welcome message for new user')
                return (
                  <div style={{
                    padding: '16px',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    background: '#f8f9fa'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                          Bun venit la LuxBid!
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                          Contul tău a fost creat cu succes. Începe să explorezi ofertele premium.
                        </p>
                        <span style={{ fontSize: '12px', color: '#999' }}>
                          {userCreatedAt ? new Date(userCreatedAt).toLocaleDateString('ro-RO') : 'Recent'}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }

              // Show no notifications message for old users
              console.log('ℹ️ Notifications page - Showing no notifications message for old user')
              return (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  </span>
                  <p>Nu ai notificări noi în acest moment.</p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    Vei fi notificat despre oferte noi, mesaje și actualizări importante.
                  </p>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Notification Settings */}
        <div style={{ 
          background: '#fff', 
          padding: '32px', 
          borderRadius: '16px'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
            Setări notificări
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ width: '18px', height: '18px' }}
              />
              <span>Oferte noi în categoriile de interes</span>
            </label>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ width: '18px', height: '18px' }}
              />
              <span>Mesaje de la cumpărători/vânzători</span>
            </label>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ width: '18px', height: '18px' }}
              />
              <span>Actualizări despre listările mele</span>
            </label>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                style={{ width: '18px', height: '18px' }}
              />
              <span>Newsletter LuxBid</span>
            </label>
          </div>

          <button style={{
            marginTop: '24px',
            padding: '12px 24px',
            background: '#D09A1E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Salvează setările
          </button>
        </div>
      </div>
    </div>
  )
}
