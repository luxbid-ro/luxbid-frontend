'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface DataRequest {
  id: string
  type: 'data_export' | 'data_deletion' | 'data_correction' | 'consent_withdrawal'
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  requestedAt: string
  completedAt?: string
  description: string
  dataTypes: string[]
}

interface ConsentSettings {
  marketing: boolean
  analytics: boolean
  cookies: boolean
  thirdParty: boolean
  dataProcessing: boolean
}

export default function GDPRCompliancePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([])
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    marketing: true,
    analytics: true,
    cookies: true,
    thirdParty: false,
    dataProcessing: true
  })
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [newRequestType, setNewRequestType] = useState<'data_export' | 'data_deletion' | 'data_correction' | 'consent_withdrawal'>('data_export')
  const [newRequestDescription, setNewRequestDescription] = useState('')

  // Check authentication
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
    
    // Load saved consent settings
    const savedConsent = localStorage.getItem('luxbid_consent_settings')
    if (savedConsent) {
      setConsentSettings(JSON.parse(savedConsent))
    }
    
    // Load data requests
    loadDataRequests()
  }, [router])

  const loadDataRequests = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRequests: DataRequest[] = [
        {
          id: '1',
          type: 'data_export',
          status: 'completed',
          requestedAt: '2024-01-10T10:00:00Z',
          completedAt: '2024-01-12T14:30:00Z',
          description: 'Export complet al datelor personale',
          dataTypes: ['Profil utilizator', 'Istoric tranzacții', 'Mesaje', 'Preferințe']
        },
        {
          id: '2',
          type: 'data_correction',
          status: 'processing',
          requestedAt: '2024-01-14T09:15:00Z',
          description: 'Corectare adresă de email',
          dataTypes: ['Profil utilizator']
        }
      ]
      
      setDataRequests(mockRequests)
    } catch (error) {
      console.error('Error loading data requests:', error)
    }
  }

  // Handle consent change
  const handleConsentChange = (key: keyof ConsentSettings, value: boolean) => {
    const newConsent = { ...consentSettings, [key]: value }
    setConsentSettings(newConsent)
    localStorage.setItem('luxbid_consent_settings', JSON.stringify(newConsent))
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'consent_updated', {
        event_category: 'gdpr',
        event_label: key,
        value: value ? 1 : 0
      })
    }
  }

  // Submit new data request
  const submitDataRequest = async () => {
    if (!newRequestDescription.trim()) {
      alert('Te rugăm să completezi descrierea cererii')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newRequest: DataRequest = {
        id: `req-${Date.now()}`,
        type: newRequestType,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        description: newRequestDescription,
        dataTypes: getDataTypesForRequest(newRequestType)
      }
      
      setDataRequests(prev => [newRequest, ...prev])
      setNewRequestDescription('')
      setShowConsentModal(false)
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'data_request_submitted', {
          event_category: 'gdpr',
          event_label: newRequestType,
          value: 1
        })
      }
      
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setLoading(false)
    }
  }

  const getDataTypesForRequest = (type: string): string[] => {
    switch (type) {
      case 'data_export':
        return ['Profil utilizator', 'Istoric tranzacții', 'Mesaje', 'Preferințe', 'Date de autentificare']
      case 'data_deletion':
        return ['Toate datele personale']
      case 'data_correction':
        return ['Datele specificate în cerere']
      case 'consent_withdrawal':
        return ['Consimțământul pentru procesarea datelor']
      default:
        return []
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#28a745'
      case 'processing': return '#ffc107'
      case 'pending': return '#6c757d'
      case 'rejected': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'processing': return '⏳'
      case 'pending': return '📋'
      case 'rejected': return '❌'
      default: return '📋'
    }
  }

  if (isAuthenticated === null) {
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
          <p>Se verifică autentificarea...</p>
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            GDPR Compliance
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Gestionează-ți datele personale și consimțământul conform Regulamentului GDPR
          </p>
        </div>

        {/* GDPR Rights Overview */}
        <div style={{
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#fff',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
            Drepturile Tale GDPR
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                📋 Dreptul la Informare
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să știi ce date colectăm și cum le folosim
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                📤 Dreptul la Portabilitate
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să-ți exportezi datele într-un format portabil
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                ✏️ Dreptul la Rectificare
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să corectezi datele inexacte sau incomplete
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🗑️ Dreptul la Ștergere
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să-ți ștergi datele în anumite circumstanțe
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🚫 Dreptul la Opoziție
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să te opui procesării datelor tale
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                ⏸️ Dreptul la Restricționare
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Să restricționezi procesarea datelor
              </p>
            </div>
          </div>
        </div>

        {/* Consent Management */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Gestionează Consimțământul
          </h3>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              {
                key: 'marketing',
                title: 'Marketing și Comunicări',
                description: 'Primești emailuri despre oferte noi, promoții și actualizări despre platformă',
                icon: '📧'
              },
              {
                key: 'analytics',
                title: 'Analiză și Statistici',
                description: 'Colectăm date pentru a îmbunătăți experiența ta pe platformă',
                icon: '📊'
              },
              {
                key: 'cookies',
                title: 'Cookie-uri Esențiale',
                description: 'Cookie-uri necesare pentru funcționarea de bază a platformei',
                icon: '🍪'
              },
              {
                key: 'thirdParty',
                title: 'Parteneri Terți',
                description: 'Partajăm date cu parteneri de încredere pentru servicii îmbunătățite',
                icon: '🤝'
              },
              {
                key: 'dataProcessing',
                title: 'Procesarea Datelor',
                description: 'Procesăm datele tale pentru a oferi serviciile platformei',
                icon: '⚙️'
              }
            ].map((consent) => (
              <div
                key={consent.key}
                style={{
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '20px',
                  background: consentSettings[consent.key as keyof ConsentSettings] ? '#f8f9fa' : '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{consent.icon}</span>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                        {consent.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                      {consent.description}
                    </p>
                  </div>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={consentSettings[consent.key as keyof ConsentSettings]}
                      onChange={(e) => handleConsentChange(consent.key as keyof ConsentSettings, e.target.checked)}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#D09A1E'
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                      {consentSettings[consent.key as keyof ConsentSettings] ? 'Activat' : 'Dezactivat'}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Requests */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>
              Cereri GDPR ({dataRequests.length})
            </h3>
            <button
              onClick={() => setShowConsentModal(true)}
              style={{
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              + Cerere Nouă
            </button>
          </div>
          
          {dataRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Nicio cerere GDPR
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Poți face cereri pentru gestionarea datelor tale personale.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {dataRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    padding: '20px',
                    background: '#fafafa'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{getStatusIcon(request.status)}</span>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                          {request.type === 'data_export' ? 'Export Date' :
                           request.type === 'data_deletion' ? 'Ștergere Date' :
                           request.type === 'data_correction' ? 'Corectare Date' :
                           'Retragere Consimțământ'}
                        </h4>
                        <div style={{
                          background: getStatusColor(request.status),
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {request.status === 'completed' ? 'Completat' :
                           request.status === 'processing' ? 'În Procesare' :
                           request.status === 'pending' ? 'În Așteptare' : 'Respins'}
                        </div>
                      </div>
                      
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                        {request.description}
                      </p>
                      
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        <div>🕒 Cerut la: {new Date(request.requestedAt).toLocaleString('ro-RO')}</div>
                        {request.completedAt && (
                          <div>✅ Completat la: {new Date(request.completedAt).toLocaleString('ro-RO')}</div>
                        )}
                      </div>
                      
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <strong>Tipuri de date:</strong> {request.dataTypes.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Policy Summary */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Rezumat Politica de Confidențialitate
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                📊 Ce Date Colectăm
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Informații de profil (nume, email, telefon)</li>
                <li>Date de autentificare și securitate</li>
                <li>Istoricul tranzacțiilor și activităților</li>
                <li>Preferințele și setările utilizatorului</li>
                <li>Date de utilizare și performanță</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                🎯 Cum Folosim Datele
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Pentru a oferi serviciile platformei</li>
                <li>Pentru comunicări și notificări</li>
                <li>Pentru îmbunătățirea experienței utilizatorului</li>
                <li>Pentru securitate și prevenirea fraudelor</li>
                <li>Pentru analiză și statistici (cu consimțământ)</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                🔒 Securitatea Datelor
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Criptare end-to-end pentru date sensibile</li>
                <li>Acces restricționat și monitorizat</li>
                <li>Backup-uri regulate și sigure</li>
                <li>Audit-uri de securitate periodice</li>
                <li>Conformitate cu standardele GDPR</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact DPO */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
            Contactează DPO-ul Nostru
          </h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Pentru întrebări despre protecția datelor sau pentru a exercita drepturile tale GDPR
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:dpo@luxbid.ro"
              style={{
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              📧 dpo@luxbid.ro
            </a>
            <a
              href="tel:+40123456789"
              style={{
                background: 'transparent',
                color: '#D09A1E',
                border: '2px solid #D09A1E',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              📞 +40 123 456 789
            </a>
          </div>
        </div>

        {/* New Request Modal */}
        {showConsentModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
                Cerere GDPR Nouă
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Tipul Cererii
                </label>
                <select
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: '#fff'
                  }}
                >
                  <option value="data_export">Export Date Personale</option>
                  <option value="data_deletion">Ștergere Date Personale</option>
                  <option value="data_correction">Corectare Date Personale</option>
                  <option value="consent_withdrawal">Retragere Consimțământ</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Descrierea Cererii *
                </label>
                <textarea
                  value={newRequestDescription}
                  onChange={(e) => setNewRequestDescription(e.target.value)}
                  placeholder="Descrie în detaliu cererea ta..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowConsentModal(false)}
                  style={{
                    background: 'transparent',
                    color: '#666',
                    border: '1px solid #ddd',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Anulează
                </button>
                <button
                  onClick={submitDataRequest}
                  disabled={loading}
                  style={{
                    background: loading ? '#ccc' : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Se procesează...' : 'Trimite Cererea'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
