'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceAlerts, PriceAlert } from '@/hooks/usePriceAlerts'

export default function PriceAlertsPage() {
  const router = useRouter()
  const { 
    alerts, 
    loading, 
    activeAlertsCount,
    createAlert, 
    updateAlert, 
    deleteAlert, 
    toggleAlert,
    requestNotificationPermission 
  } = usePriceAlerts()
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    listingTitle: '',
    currentPrice: '',
    targetPrice: '',
    currency: 'EUR',
    category: '',
    brand: '',
    notificationType: 'both' as 'email' | 'push' | 'both'
  })

  // Check authentication
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
  }, [router])

  // Request notification permission on mount
  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission()
    }
  }, [isAuthenticated, requestNotificationPermission])

  // Handle create alert
  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newAlert.listingTitle || !newAlert.currentPrice || !newAlert.targetPrice) {
      alert('Te rugăm să completezi toate câmpurile obligatorii')
      return
    }

    const currentPrice = parseFloat(newAlert.currentPrice)
    const targetPrice = parseFloat(newAlert.targetPrice)

    if (targetPrice >= currentPrice) {
      alert('Prețul țintă trebuie să fie mai mic decât prețul curent')
      return
    }

    createAlert({
      listingId: `manual_${Date.now()}`,
      listingTitle: newAlert.listingTitle,
      currentPrice,
      targetPrice,
      currency: newAlert.currency,
      category: newAlert.category,
      brand: newAlert.brand || undefined,
      notificationType: newAlert.notificationType,
      userEmail: localStorage.getItem('luxbid_user_email') || undefined
    })

    // Reset form
    setNewAlert({
      listingTitle: '',
      currentPrice: '',
      targetPrice: '',
      currency: 'EUR',
      category: '',
      brand: '',
      notificationType: 'both'
    })
    setShowCreateForm(false)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate price difference
  const getPriceDifference = (current: number, target: number) => {
    const difference = current - target
    const percentage = ((difference / current) * 100).toFixed(1)
    return { difference, percentage }
  }

  if (isAuthenticated === null || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #D09A1E',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Se încarcă alertele de preț...</p>
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

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#D09A1E' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Alerte de Preț
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px' }}>
            Primești notificări când prețurile obiectelor de lux scad la nivelul dorit
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#D09A1E', marginBottom: '8px' }}>
              {activeAlertsCount}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Alerte Active</div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#28a745', marginBottom: '8px' }}>
              {alerts.filter(alert => !alert.isActive).length}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Alerte Pausate</div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#6f42c1', marginBottom: '8px' }}>
              {alerts.length}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Total Alerte</div>
          </div>
        </div>

        {/* Create Alert Button */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              color: '#fff',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {showCreateForm ? 'Anulează' : 'Creează Alertă Nouă'}
          </button>
        </div>

        {/* Create Alert Form */}
        {showCreateForm && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
              Creează Alertă de Preț
            </h2>
            
            <form onSubmit={handleCreateAlert}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Titlul Obiectului *
                  </label>
                  <input
                    type="text"
                    value={newAlert.listingTitle}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, listingTitle: e.target.value }))}
                    placeholder="ex: Rolex Submariner 2023"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Categorie
                  </label>
                  <select
                    value={newAlert.category}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: '#fff'
                    }}
                  >
                    <option value="">Selectează categoria</option>
                    <option value="Ceasuri">Ceasuri</option>
                    <option value="Genți">Genți</option>
                    <option value="Bijuterii">Bijuterii</option>
                    <option value="Artă">Artă</option>
                    <option value="Îmbrăcăminte">Îmbrăcăminte</option>
                    <option value="Încălțăminte">Încălțăminte</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    value={newAlert.brand}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="ex: Rolex, Hermès, Tiffany"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Preț Curent *
                  </label>
                  <input
                    type="number"
                    value={newAlert.currentPrice}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, currentPrice: e.target.value }))}
                    placeholder="45000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Preț Țintă *
                  </label>
                  <input
                    type="number"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
                    placeholder="40000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Monedă
                  </label>
                  <select
                    value={newAlert.currency}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, currency: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: '#fff'
                    }}
                  >
                    <option value="EUR">EUR</option>
                    <option value="RON">RON</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    Tip Notificare
                  </label>
                  <select
                    value={newAlert.notificationType}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, notificationType: e.target.value as 'email' | 'push' | 'both' }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: '#fff'
                    }}
                  >
                    <option value="both">Email + Push</option>
                    <option value="email">Doar Email</option>
                    <option value="push">Doar Push</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  Creează Alertă
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '80px 20px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px', color: '#cbd5e0' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              Niciun alert de preț încă
            </h3>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              Creează alerte pentru a fi notificat când prețurile obiectelor de lux scad la nivelul dorit
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Creează Primul Alert
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {alerts.map((alert) => {
              const { difference, percentage } = getPriceDifference(alert.currentPrice, alert.targetPrice)
              
              return (
                <div
                  key={alert.id}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: alert.isActive ? '2px solid #D09A1E' : '2px solid #e5e5e5',
                    opacity: alert.isActive ? 1 : 0.7
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        {alert.listingTitle}
                      </h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                        {alert.category && <span>📂 {alert.category}</span>}
                        {alert.brand && <span>🏷️ {alert.brand}</span>}
                        <span>📅 {formatDate(alert.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        style={{
                          padding: '8px 12px',
                          background: alert.isActive ? '#28a745' : '#6c757d',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        {alert.isActive ? '⏸️ Pause' : '▶️ Resume'}
                      </button>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        style={{
                          padding: '8px 12px',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Preț Curent</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
                        {alert.currentPrice.toLocaleString('ro-RO')} {alert.currency}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Preț Țintă</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#D09A1E' }}>
                        {alert.targetPrice.toLocaleString('ro-RO')} {alert.currency}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Economie Potențială</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#28a745' }}>
                        {difference.toLocaleString('ro-RO')} {alert.currency} ({percentage}%)
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Notificare</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                        {alert.notificationType === 'both' ? '📧📱 Email + Push' : 
                         alert.notificationType === 'email' ? '📧 Email' : '📱 Push'}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
