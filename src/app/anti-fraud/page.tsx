'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface FraudAlert {
  id: string
  type: 'suspicious_price' | 'duplicate_listing' | 'fake_brand' | 'suspicious_user' | 'payment_fraud'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  listingId?: string
  userId?: string
  detectedAt: string
  status: 'pending' | 'investigating' | 'resolved' | 'false_positive'
  confidence: number
  actions: string[]
}

interface FraudStats {
  totalAlerts: number
  resolvedAlerts: number
  falsePositives: number
  activeInvestigations: number
  blockedUsers: number
  protectedListings: number
}

export default function AntiFraudPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([])
  const [fraudStats, setFraudStats] = useState<FraudStats | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all')

  // Check authentication
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
  }, [router])

  // Load fraud data
  useEffect(() => {
    if (!isAuthenticated) return

    const loadFraudData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockAlerts: FraudAlert[] = [
          {
            id: '1',
            type: 'suspicious_price',
            severity: 'high',
            title: 'Preț Suspect - Rolex Submariner',
            description: 'Prețul este cu 80% sub valoarea pieței pentru acest model',
            listingId: 'listing-123',
            detectedAt: '2024-01-15T10:30:00Z',
            status: 'investigating',
            confidence: 95,
            actions: ['Verifică autenticitatea', 'Contactează vânzătorul', 'Suspendă anunțul']
          },
          {
            id: '2',
            type: 'duplicate_listing',
            severity: 'medium',
            title: 'Anunț Duplicat Detectat',
            description: 'Același obiect listat de 3 utilizatori diferiți',
            listingId: 'listing-456',
            detectedAt: '2024-01-15T09:15:00Z',
            status: 'pending',
            confidence: 88,
            actions: ['Verifică proprietatea', 'Unifică anunțurile', 'Notifică utilizatorii']
          },
          {
            id: '3',
            type: 'fake_brand',
            severity: 'critical',
            title: 'Brand Falsificat - Hermès',
            description: 'Produs marcă Hermès cu caracteristici de falsificare',
            listingId: 'listing-789',
            detectedAt: '2024-01-15T08:45:00Z',
            status: 'resolved',
            confidence: 92,
            actions: ['Anunț suspendat', 'Utilizator blocat', 'Raportat autorităților']
          },
          {
            id: '4',
            type: 'suspicious_user',
            severity: 'high',
            title: 'Activitate Suspectă Utilizator',
            description: 'Utilizator nou cu multiple anunțuri de lux în prima zi',
            userId: 'user-456',
            detectedAt: '2024-01-15T07:20:00Z',
            status: 'investigating',
            confidence: 85,
            actions: ['Verifică identitatea', 'Solicită documente', 'Monitorizează activitatea']
          },
          {
            id: '5',
            type: 'payment_fraud',
            severity: 'critical',
            title: 'Tentativă Fraudă de Plată',
            description: 'Card de credit furat folosit pentru tranzacție',
            listingId: 'listing-321',
            detectedAt: '2024-01-15T06:30:00Z',
            status: 'resolved',
            confidence: 98,
            actions: ['Tranzacție anulată', 'Utilizator blocat', 'Raportat bancă']
          }
        ]

        const mockStats: FraudStats = {
          totalAlerts: 127,
          resolvedAlerts: 89,
          falsePositives: 12,
          activeInvestigations: 26,
          blockedUsers: 8,
          protectedListings: 156
        }

        setFraudAlerts(mockAlerts)
        setFraudStats(mockStats)
      } catch (error) {
        console.error('Error loading fraud data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFraudData()
  }, [isAuthenticated])

  // Filter alerts
  const filteredAlerts = fraudAlerts.filter(alert => {
    const statusMatch = selectedFilter === 'all' || alert.status === selectedFilter
    const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity
    return statusMatch && severityMatch
  })

  // Handle alert action
  const handleAlertAction = (alertId: string, action: string) => {
    setFraudAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'investigating' }
        : alert
    ))
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'fraud_action_taken', {
        event_category: 'security',
        event_label: action,
        value: alertId
      })
    }
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#28a745'
      case 'medium': return '#ffc107'
      case 'high': return '#fd7e14'
      case 'critical': return '#dc3545'
      default: return '#6c757d'
    }
  }

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🟠'
      case 'critical': return '🔴'
      default: return '⚪'
    }
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
          <p>Se încarcă sistemul anti-fraud...</p>
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            Sistem Anti-Fraud
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Monitorizare și protecție avansată împotriva fraudelor și activităților suspecte
          </p>
        </div>

        {/* Stats Overview */}
        {fraudStats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc3545', marginBottom: '8px' }}>
                {fraudStats.totalAlerts}
              </div>
              <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Total Alerte</div>
              <div style={{ fontSize: '14px', color: '#dc3545', marginTop: '8px' }}>
                🔴 +5% față de săptămâna trecută
              </div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#28a745', marginBottom: '8px' }}>
                {fraudStats.resolvedAlerts}
              </div>
              <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Rezolvate</div>
              <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
                ✅ {((fraudStats.resolvedAlerts / fraudStats.totalAlerts) * 100).toFixed(1)}% rata succes
              </div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffc107', marginBottom: '8px' }}>
                {fraudStats.activeInvestigations}
              </div>
              <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>În Investigare</div>
              <div style={{ fontSize: '14px', color: '#ffc107', marginTop: '8px' }}>
                ⏳ Investigări active
              </div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#6f42c1', marginBottom: '8px' }}>
                {fraudStats.blockedUsers}
              </div>
              <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Utilizatori Blocați</div>
              <div style={{ fontSize: '14px', color: '#6f42c1', marginTop: '8px' }}>
                🚫 Protecție activă
              </div>
            </div>
            
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#17a2b8', marginBottom: '8px' }}>
                {fraudStats.protectedListings}
              </div>
              <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Anunțuri Protejate</div>
              <div style={{ fontSize: '14px', color: '#17a2b8', marginTop: '8px' }}>
                🛡️ Monitorizate automat
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Status
            </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              style={{
                padding: '10px 16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
                minWidth: '150px'
              }}
            >
              <option value="all">Toate</option>
              <option value="pending">În așteptare</option>
              <option value="investigating">În investigare</option>
              <option value="resolved">Rezolvate</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Severitate
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as any)}
              style={{
                padding: '10px 16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
                minWidth: '150px'
              }}
            >
              <option value="all">Toate</option>
              <option value="low">Scăzută</option>
              <option value="medium">Medie</option>
              <option value="high">Înaltă</option>
              <option value="critical">Critică</option>
            </select>
          </div>
        </div>

        {/* Fraud Detection Types */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Tipuri de Detectare Fraudă
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              border: '2px solid #dc3545',
              borderRadius: '12px',
              padding: '20px',
              background: '#fff5f5'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#dc3545', marginBottom: '12px' }}>
                🔍 Prețuri Suspecte
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Detectează prețuri anormal de mici pentru obiecte de lux autentice
              </p>
              <div style={{ fontSize: '12px', color: '#dc3545', fontWeight: '500' }}>
                AI-powered • 95% acuratețe
              </div>
            </div>
            
            <div style={{
              border: '2px solid #ffc107',
              borderRadius: '12px',
              padding: '20px',
              background: '#fffbf0'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#ffc107', marginBottom: '12px' }}>
                📋 Anunțuri Duplicate
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Identifică același obiect listat de multiple utilizatori
              </p>
              <div style={{ fontSize: '12px', color: '#ffc107', fontWeight: '500' }}>
                Image recognition • 88% acuratețe
              </div>
            </div>
            
            <div style={{
              border: '2px solid #dc3545',
              borderRadius: '12px',
              padding: '20px',
              background: '#fff5f5'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#dc3545', marginBottom: '12px' }}>
                🏷️ Branduri Falsificate
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Detectează produse falsificate folosind analiza imaginilor
              </p>
              <div style={{ fontSize: '12px', color: '#dc3545', fontWeight: '500' }}>
                ML algorithms • 92% acuratețe
              </div>
            </div>
            
            <div style={{
              border: '2px solid #fd7e14',
              borderRadius: '12px',
              padding: '20px',
              background: '#fff8f0'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#fd7e14', marginBottom: '12px' }}>
                👤 Utilizatori Suspecti
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Monitorizează comportamentul anormal și activitatea suspectă
              </p>
              <div style={{ fontSize: '12px', color: '#fd7e14', fontWeight: '500' }}>
                Behavioral analysis • 85% acuratețe
              </div>
            </div>
            
            <div style={{
              border: '2px solid #dc3545',
              borderRadius: '12px',
              padding: '20px',
              background: '#fff5f5'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#dc3545', marginBottom: '12px' }}>
                💳 Fraude de Plată
              </h4>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Detectează carduri furate și încercări de plată frauduloase
              </p>
              <div style={{ fontSize: '12px', color: '#dc3545', fontWeight: '500' }}>
                Payment verification • 98% acuratețe
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Alerte Fraudă ({filteredAlerts.length})
          </h3>
          
          {filteredAlerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Nicio alertă fraudă!
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Platforma este curată și securizată.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    border: `2px solid ${getSeverityColor(alert.severity)}`,
                    borderRadius: '12px',
                    padding: '20px',
                    background: '#fafafa',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{getSeverityIcon(alert.severity)}</span>
                        <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                          {alert.title}
                        </h4>
                        <div style={{
                          background: getSeverityColor(alert.severity),
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {alert.severity}
                        </div>
                      </div>
                      
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                        {alert.description}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#666' }}>
                        <span>🕒 {new Date(alert.detectedAt).toLocaleString('ro-RO')}</span>
                        <span>🎯 {alert.confidence}% încredere</span>
                        {alert.listingId && <span>📄 ID: {alert.listingId}</span>}
                        {alert.userId && <span>👤 User: {alert.userId}</span>}
                      </div>
                    </div>
                    
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: alert.status === 'resolved' ? '#28a745' : 
                                  alert.status === 'investigating' ? '#ffc107' : '#6c757d',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {alert.status === 'resolved' ? 'Rezolvat' :
                       alert.status === 'investigating' ? 'Investigare' :
                       alert.status === 'pending' ? 'În așteptare' : 'Fals pozitiv'}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {alert.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleAlertAction(alert.id, action)}
                        style={{
                          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
