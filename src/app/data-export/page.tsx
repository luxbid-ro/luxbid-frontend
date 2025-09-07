'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ExportData {
  id: string
  type: 'profile' | 'listings' | 'messages' | 'transactions' | 'preferences' | 'complete'
  name: string
  description: string
  size: string
  lastUpdated: string
  included: string[]
}

interface ExportRequest {
  id: string
  dataTypes: string[]
  format: 'json' | 'csv' | 'pdf'
  status: 'pending' | 'processing' | 'ready' | 'expired'
  requestedAt: string
  expiresAt: string
  downloadUrl?: string
}

export default function DataExportPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [exportRequests, setExportRequests] = useState<ExportRequest[]>([])
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const [showExportModal, setShowExportModal] = useState(false)

  const exportDataTypes: ExportData[] = [
    {
      id: 'profile',
      type: 'profile',
      name: 'Profil Utilizator',
      description: 'Informații de bază, preferințe și setări cont',
      size: '2.5 KB',
      lastUpdated: '2024-01-15T10:30:00Z',
      included: ['Nume complet', 'Email', 'Telefon', 'Adresă', 'Data înregistrării', 'Preferințe notificări']
    },
    {
      id: 'listings',
      type: 'listings',
      name: 'Anunțurile Mele',
      description: 'Toate anunțurile create, editate sau șterse',
      size: '15.2 KB',
      lastUpdated: '2024-01-15T09:15:00Z',
      included: ['Titluri anunțuri', 'Descrieri', 'Prețuri', 'Categorii', 'Imagini', 'Status', 'Istoric modificări']
    },
    {
      id: 'messages',
      type: 'messages',
      name: 'Mesaje și Conversații',
      description: 'Toate mesajele trimise și primite',
      size: '8.7 KB',
      lastUpdated: '2024-01-15T08:45:00Z',
      included: ['Mesaje trimise', 'Mesaje primite', 'Conversații', 'Atașamente', 'Data mesajelor']
    },
    {
      id: 'transactions',
      type: 'transactions',
      name: 'Istoric Tranzacții',
      description: 'Toate tranzacțiile și activitățile financiare',
      size: '5.3 KB',
      lastUpdated: '2024-01-15T07:20:00Z',
      included: ['Tranzacții efectuate', 'Oferte făcute', 'Istoric plăți', 'Comisioane', 'Rambursări']
    },
    {
      id: 'preferences',
      type: 'preferences',
      name: 'Preferințe și Setări',
      description: 'Configurări cont și preferințe utilizator',
      size: '1.8 KB',
      lastUpdated: '2024-01-15T06:30:00Z',
      included: ['Setări notificări', 'Preferințe afișare', 'Limba', 'Timezone', 'Consimțământ GDPR']
    },
    {
      id: 'complete',
      type: 'complete',
      name: 'Export Complet',
      description: 'Toate datele personale într-un singur fișier',
      size: '33.5 KB',
      lastUpdated: '2024-01-15T05:15:00Z',
      included: ['Toate categoriile de mai sus', 'Date de autentificare', 'Log-uri activitate', 'Cookie-uri']
    }
  ]

  // Check authentication
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
    loadExportRequests()
  }, [router])

  const loadExportRequests = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRequests: ExportRequest[] = [
        {
          id: '1',
          dataTypes: ['profile', 'listings'],
          format: 'json',
          status: 'ready',
          requestedAt: '2024-01-10T10:00:00Z',
          expiresAt: '2024-01-17T10:00:00Z',
          downloadUrl: '/api/export/download/1'
        },
        {
          id: '2',
          dataTypes: ['complete'],
          format: 'pdf',
          status: 'processing',
          requestedAt: '2024-01-14T14:30:00Z',
          expiresAt: '2024-01-21T14:30:00Z'
        }
      ]
      
      setExportRequests(mockRequests)
    } catch (error) {
      console.error('Error loading export requests:', error)
    }
  }

  const handleDataTypeToggle = (dataType: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType) 
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    )
  }

  const submitExportRequest = async () => {
    if (selectedDataTypes.length === 0) {
      alert('Te rugăm să selectezi cel puțin un tip de date pentru export')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newRequest: ExportRequest = {
        id: `export-${Date.now()}`,
        dataTypes: selectedDataTypes,
        format: selectedFormat,
        status: 'processing',
        requestedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      }
      
      setExportRequests(prev => [newRequest, ...prev])
      setSelectedDataTypes([])
      setShowExportModal(false)
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'data_export_requested', {
          event_category: 'data_export',
          event_label: selectedFormat,
          value: selectedDataTypes.length
        })
      }
      
    } catch (error) {
      console.error('Error submitting export request:', error)
      alert('A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setLoading(false)
    }
  }

  const downloadExport = (requestId: string) => {
    // Simulate download
    const data = {
      message: 'Aceasta este o simulare de export de date',
      timestamp: new Date().toISOString(),
      dataTypes: exportRequests.find(r => r.id === requestId)?.dataTypes || []
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `luxbid-export-${requestId}.json`
    a.click()
    window.URL.revokeObjectURL(url)
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'data_export_downloaded', {
        event_category: 'data_export',
        event_label: requestId,
        value: 1
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return '#28a745'
      case 'processing': return '#ffc107'
      case 'pending': return '#6c757d'
      case 'expired': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return '✅'
      case 'processing': return '⏳'
      case 'pending': return '📋'
      case 'expired': return '❌'
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Date Personale
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Descarcă-ți datele personale în format JSON, CSV sau PDF conform dreptului GDPR la portabilitate
          </p>
        </div>

        {/* Benefits */}
        <div style={{
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#fff',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
            De Ce Să-ți Exportezi Datele?
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                📋 Backup Personal
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Păstrează o copie de siguranță a datelor tale importante
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🔄 Portabilitate
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Transferă datele către alte platforme sau servicii
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                📊 Analiză Personală
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Analizează propriile date pentru insights personale
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🛡️ Transparență
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Vezi exact ce date avem despre tine și cum le folosim
              </p>
            </div>
          </div>
        </div>

        {/* Data Types Selection */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>
              Selectează Tipurile de Date
            </h3>
            <button
              onClick={() => setShowExportModal(true)}
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
              + Export Nou
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {exportDataTypes.map((dataType) => (
              <div
                key={dataType.id}
                style={{
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '20px',
                  background: selectedDataTypes.includes(dataType.id) ? '#f8f9fa' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleDataTypeToggle(dataType.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <input
                        type="checkbox"
                        checked={selectedDataTypes.includes(dataType.id)}
                        onChange={() => handleDataTypeToggle(dataType.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#D09A1E'
                        }}
                      />
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                        {dataType.name}
                      </h4>
                      <div style={{
                        background: '#f0f0f0',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        {dataType.size}
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                      {dataType.description}
                    </p>
                    
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      <strong>Include:</strong> {dataType.included.join(', ')}
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      Ultima actualizare: {new Date(dataType.lastUpdated).toLocaleString('ro-RO')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Requests History */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Istoric Export-uri ({exportRequests.length})
          </h3>
          
          {exportRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Nicio cerere de export
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Creează primul export pentru a descărca datele tale.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {exportRequests.map((request) => (
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
                          Export {request.format.toUpperCase()}
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
                          {request.status === 'ready' ? 'Gata' :
                           request.status === 'processing' ? 'Se procesează' :
                           request.status === 'pending' ? 'În așteptare' : 'Expirat'}
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        <strong>Tipuri de date:</strong> {request.dataTypes.join(', ')}
                      </div>
                      
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                        <div>🕒 Cerut la: {new Date(request.requestedAt).toLocaleString('ro-RO')}</div>
                        <div>⏰ Expiră la: {new Date(request.expiresAt).toLocaleString('ro-RO')}</div>
                      </div>
                    </div>
                    
                    {request.status === 'ready' && (
                      <button
                        onClick={() => downloadExport(request.id)}
                        style={{
                          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        📥 Descarcă
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export Modal */}
        {showExportModal && (
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
                Configurează Export-ul
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Format Export
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: '#fff'
                  }}
                >
                  <option value="json">JSON (Recomandat)</option>
                  <option value="csv">CSV (Tabelar)</option>
                  <option value="pdf">PDF (Document)</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  Tipuri de Date Selectate ({selectedDataTypes.length})
                </label>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  {selectedDataTypes.length === 0 ? 'Niciun tip selectat' : selectedDataTypes.join(', ')}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  Selectează tipurile de date din lista de mai sus
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowExportModal(false)}
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
                  onClick={submitExportRequest}
                  disabled={loading || selectedDataTypes.length === 0}
                  style={{
                    background: loading || selectedDataTypes.length === 0 ? '#ccc' : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: loading || selectedDataTypes.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Se procesează...' : 'Creează Export'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Information */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
            ℹ️ Informații Importante
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                ⏱️ Timp de Procesare
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Export-uri simple: 5-10 minute</li>
                <li>Export-uri complete: 30-60 minute</li>
                <li>Veți primi email când este gata</li>
                <li>Link-ul expiră în 7 zile</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                🔒 Securitate
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Export-urile sunt criptate</li>
                <li>Accesibil doar prin contul tău</li>
                <li>Nu conțin parole sau date sensibile</li>
                <li>Ștergere automată după expirare</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                📞 Suport
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Asistență pentru export-uri</li>
                <li>Formate personalizate disponibile</li>
                <li>Răspuns în 24 de ore</li>
                <li>Contact: support@luxbid.ro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
