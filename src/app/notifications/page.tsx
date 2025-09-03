'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotificationsPage() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    setIsAuthed(true)
    setLoading(false)
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
            {/* Example notifications */}
            <div style={{
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '12px',
              background: '#f8f9fa'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🎉</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                    Bun venit la LuxBid!
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    Contul tău a fost creat cu succes. Începe să explorezi ofertele premium.
                  </p>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    Acum 2 minute
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '12px',
              background: '#fff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>📢</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                    Sistem de notificări activat
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    De acum vei primi notificări pentru oferte noi, mesaje și actualizări importante.
                  </p>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    Acum 5 minute
                  </span>
                </div>
              </div>
            </div>

            {/* Empty state */}
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#666',
              fontStyle: 'italic'
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔕</span>
              <p>Nu ai notificări noi în acest moment.</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                Vei fi notificat despre oferte noi, mesaje și actualizări importante.
              </p>
            </div>
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
