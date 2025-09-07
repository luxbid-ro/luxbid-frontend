'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface VerificationDocument {
  id: string
  type: 'id_card' | 'passport' | 'driving_license' | 'utility_bill' | 'bank_statement'
  name: string
  description: string
  required: boolean
  uploaded: boolean
  verified: boolean
  file?: File
}

export default function KYCVerificationPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'not_started' | 'in_progress' | 'pending_review' | 'verified' | 'rejected'>('not_started')
  const [documents, setDocuments] = useState<VerificationDocument[]>([
    {
      id: '1',
      type: 'id_card',
      name: 'Carte de Identitate',
      description: 'Fața și spatele cărții de identitate',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      id: '2',
      type: 'passport',
      name: 'Pașaport',
      description: 'Pagina cu fotografia din pașaport',
      required: false,
      uploaded: false,
      verified: false
    },
    {
      id: '3',
      type: 'utility_bill',
      name: 'Factură Utilități',
      description: 'Factură recentă (electricitate, gaz, apă)',
      required: true,
      uploaded: false,
      verified: false
    },
    {
      id: '4',
      type: 'bank_statement',
      name: 'Extras de Cont',
      description: 'Extras bancar recent (opțional)',
      required: false,
      uploaded: false,
      verified: false
    }
  ])
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: ''
  })
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  // Check authentication
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
    
    // Load existing verification status
    const savedStatus = localStorage.getItem('luxbid_kyc_status')
    if (savedStatus) {
      setVerificationStatus(savedStatus as any)
    }
  }, [router])

  // Handle file upload
  const handleFileUpload = (documentId: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploaded: true, file }
        : doc
    ))
  }

  // Submit verification
  const submitVerification = async () => {
    setLoading(true)
    
    // Validate required documents
    const requiredDocs = documents.filter(doc => doc.required)
    const uploadedRequiredDocs = requiredDocs.filter(doc => doc.uploaded)
    
    if (uploadedRequiredDocs.length !== requiredDocs.length) {
      alert('Te rugăm să încarci toate documentele obligatorii')
      setLoading(false)
      return
    }

    // Validate personal info
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.dateOfBirth || !personalInfo.address) {
      alert('Te rugăm să completezi toate câmpurile obligatorii')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setVerificationStatus('pending_review')
      localStorage.setItem('luxbid_kyc_status', 'pending_review')
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'kyc_submitted', {
          event_category: 'verification',
          event_label: 'kyc_verification',
          value: documents.filter(doc => doc.uploaded).length
        })
      }
      
    } catch (error) {
      console.error('Error submitting verification:', error)
      alert('A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setLoading(false)
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Verificare Identitate (KYC)
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Completează verificarea identității pentru a accesa funcționalități premium și pentru a crește încrederea în tranzacții
          </p>
        </div>

        {/* Status Banner */}
        {verificationStatus !== 'not_started' && (
          <div style={{
            background: verificationStatus === 'verified' ? '#d4edda' : 
                        verificationStatus === 'rejected' ? '#f8d7da' : '#fff3cd',
            border: verificationStatus === 'verified' ? '1px solid #c3e6cb' : 
                    verificationStatus === 'rejected' ? '1px solid #f5c6cb' : '1px solid #ffeaa7',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {verificationStatus === 'verified' ? '✅' : 
               verificationStatus === 'rejected' ? '❌' : '⏳'}
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: verificationStatus === 'verified' ? '#155724' : 
                     verificationStatus === 'rejected' ? '#721c24' : '#856404',
              marginBottom: '8px'
            }}>
              {verificationStatus === 'verified' ? 'Verificare Completă' : 
               verificationStatus === 'rejected' ? 'Verificare Respinsă' : 'Verificare în Progres'}
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: verificationStatus === 'verified' ? '#155724' : 
                     verificationStatus === 'rejected' ? '#721c24' : '#856404'
            }}>
              {verificationStatus === 'verified' ? 'Identitatea ta a fost verificată cu succes. Poți accesa toate funcționalitățile premium.' : 
               verificationStatus === 'rejected' ? 'Verificarea a fost respinsă. Te rugăm să verifici documentele și să încerci din nou.' : 
               'Documentele tale sunt în curs de verificare. Vei primi un email când procesul este finalizat.'}
            </p>
          </div>
        )}

        {/* Benefits */}
        <div style={{
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#fff',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
            Beneficii Verificare Identitate
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🛡️ Securitate Mărită
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Tranzacții mai sigure și protecție îmbunătățită împotriva fraudelor
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                ⭐ Funcționalități Premium
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Acces la funcționalități avansate și comisioane reduse
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                🚀 Credibilitate Crescută
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Badge de verificare pentru a crește încrederea cumpărătorilor
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                💰 Suport Priorititar
              </h4>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Asistență dedicată și procesare mai rapidă a cererilor
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Informații Personale
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                Prenume *
              </label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
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
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                Nume *
              </label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
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
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                Data Nașterii *
              </label>
              <input
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
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
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                Număr Telefon
              </label>
              <input
                type="tel"
                value={personalInfo.phoneNumber}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+40 7XX XXX XXX"
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
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Adresă Completă *
            </label>
            <textarea
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Strada, numărul, orașul, județul"
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
              onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
            />
          </div>
        </div>

        {/* Document Upload */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Documente de Identitate
          </h3>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '20px',
                  background: doc.uploaded ? '#f8f9fa' : '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      {doc.name}
                      {doc.required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      {doc.description}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {doc.uploaded ? (
                      <span style={{ color: '#28a745', fontSize: '14px', fontWeight: '500' }}>
                        ✅ Încărcat
                      </span>
                    ) : (
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        ⏳ Neîncărcat
                      </span>
                    )}
                  </div>
                </div>
                
                <input
                  ref={(el) => fileInputRefs.current[doc.id] = el}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(doc.id, file)
                    }
                  }}
                  style={{ display: 'none' }}
                />
                
                <button
                  onClick={() => fileInputRefs.current[doc.id]?.click()}
                  style={{
                    background: doc.uploaded ? '#28a745' : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  {doc.uploaded ? 'Schimbă Document' : 'Încarcă Document'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Notice */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
            🔒 Confidențialitate și Securitate
          </h4>
          <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Toate documentele sunt criptate și stocate în siguranță</li>
            <li>Datele tale sunt folosite doar pentru verificarea identității</li>
            <li>Nu partajăm informațiile cu terțe părți</li>
            <li>Poți șterge datele oricând din setările contului</li>
            <li>Procesul de verificare durează de obicei 1-3 zile lucrătoare</li>
          </ul>
        </div>

        {/* Submit Button */}
        {verificationStatus === 'not_started' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={submitVerification}
              disabled={loading}
              style={{
                background: loading ? '#ccc' : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s ease',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Se procesează...' : 'Trimite pentru Verificare'}
            </button>
          </div>
        )}

        {/* Action Buttons for other statuses */}
        {verificationStatus === 'rejected' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setVerificationStatus('not_started')
                localStorage.setItem('luxbid_kyc_status', 'not_started')
              }}
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
              Încearcă Din Nou
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
