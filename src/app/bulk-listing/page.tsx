'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface BulkListingItem {
  id: string
  title: string
  description: string
  category: string
  brand: string
  price: number
  currency: string
  condition: string
  location: string
  images: string[]
  status: 'pending' | 'processing' | 'success' | 'error'
  error?: string
}

export default function BulkListingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'upload' | 'review' | 'process' | 'complete'>('upload')
  const [bulkItems, setBulkItems] = useState<BulkListingItem[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    
    // Simulate CSV parsing
    const mockData: BulkListingItem[] = [
      {
        id: '1',
        title: 'Rolex Submariner 2023',
        description: 'Ceas de lux Rolex Submariner, model 2023, perfect stare',
        category: 'Ceasuri',
        brand: 'Rolex',
        price: 45000,
        currency: 'EUR',
        condition: 'Nou',
        location: 'București',
        images: [],
        status: 'pending'
      },
      {
        id: '2',
        title: 'Hermès Birkin Bag',
        description: 'Geantă Hermès Birkin din piele autentică',
        category: 'Genți',
        brand: 'Hermès',
        price: 25000,
        currency: 'EUR',
        condition: 'Foarte bună',
        location: 'Cluj-Napoca',
        images: [],
        status: 'pending'
      },
      {
        id: '3',
        title: 'Tiffany & Co Diamond Ring',
        description: 'Inel cu diamant Tiffany & Co, aur alb 18k',
        category: 'Bijuterii',
        brand: 'Tiffany & Co',
        price: 15000,
        currency: 'EUR',
        condition: 'Nou',
        location: 'Timișoara',
        images: [],
        status: 'pending'
      }
    ]

    setBulkItems(mockData)
    setStep('review')
  }

  // Process bulk listings
  const processBulkListings = async () => {
    setStep('process')
    setLoading(true)
    setUploadProgress(0)

    for (let i = 0; i < bulkItems.length; i++) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success/error
      const success = Math.random() > 0.1 // 90% success rate
      
      setBulkItems(prev => prev.map((item, index) => 
        index === i 
          ? { 
              ...item, 
              status: success ? 'success' : 'error',
              error: success ? undefined : 'Eroare la încărcarea imaginilor'
            }
          : item
      ))
      
      setUploadProgress(((i + 1) / bulkItems.length) * 100)
    }

    setLoading(false)
    setStep('complete')
  }

  // Reset process
  const resetProcess = () => {
    setStep('upload')
    setBulkItems([])
    setUploadProgress(0)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Bulk Listing
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Încarcă multiple obiecte de lux simultan folosind un fișier CSV pentru dealerii cu volum mare
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {[
            { key: 'upload', label: '1. Încarcă CSV', icon: '📁' },
            { key: 'review', label: '2. Verifică Datele', icon: '👀' },
            { key: 'process', label: '3. Procesează', icon: '⚙️' },
            { key: 'complete', label: '4. Finalizat', icon: '✅' }
          ].map((stepItem, index) => (
            <div
              key={stepItem.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '25px',
                background: step === stepItem.key ? 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)' : '#fff',
                color: step === stepItem.key ? '#fff' : '#666',
                border: step === stepItem.key ? 'none' : '2px solid #e5e5e5',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{stepItem.icon}</span>
              <span>{stepItem.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'upload' && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
              Încarcă Fișierul CSV
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Descarcă template-ul CSV, completează-l cu datele obiectelor tale și încarcă-l aici pentru procesare automată.
            </p>

            {/* Download Template */}
            <div style={{ marginBottom: '32px' }}>
              <button
                onClick={() => {
                  // Create and download CSV template
                  const csvContent = 'title,description,category,brand,price,currency,condition,location\n"Rolex Submariner 2023","Ceas de lux Rolex Submariner","Ceasuri","Rolex",45000,"EUR","Nou","București"\n"Hermès Birkin Bag","Geantă Hermès Birkin","Genți","Hermès",25000,"EUR","Foarte bună","Cluj-Napoca"'
                  const blob = new Blob([csvContent], { type: 'text/csv' })
                  const url = window.URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'luxbid-bulk-template.csv'
                  a.click()
                  window.URL.revokeObjectURL(url)
                }}
                style={{
                  background: 'transparent',
                  color: '#D09A1E',
                  border: '2px solid #D09A1E',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginRight: '16px'
                }}
              >
                📥 Descarcă Template CSV
              </button>
            </div>

            {/* File Upload */}
            <div
              style={{
                border: '2px dashed #D09A1E',
                borderRadius: '12px',
                padding: '40px',
                background: '#faf9f6',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files[0]
                if (file && file.type === 'text/csv') {
                  handleFileUpload({ target: { files: [file] } } as any)
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                {selectedFile ? selectedFile.name : 'Fă click sau trage fișierul CSV aici'}
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Suportă fișiere CSV până la 10MB
              </p>
            </div>

            {/* CSV Format Info */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                Format CSV necesar:
              </h4>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                <div><strong>title:</strong> Titlul obiectului</div>
                <div><strong>description:</strong> Descrierea detaliată</div>
                <div><strong>category:</strong> Ceasuri, Genți, Bijuterii, Artă, Îmbrăcăminte, Încălțăminte</div>
                <div><strong>brand:</strong> Brandul obiectului</div>
                <div><strong>price:</strong> Prețul în numere (fără simboluri)</div>
                <div><strong>currency:</strong> RON, EUR, USD</div>
                <div><strong>condition:</strong> Nou, Foarte bună, Bună, Acceptabilă</div>
                <div><strong>location:</strong> Orașul unde se află obiectul</div>
              </div>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>
                Verifică Datele ({bulkItems.length} obiecte)
              </h2>
              <button
                onClick={resetProcess}
                style={{
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Anulează
              </button>
            </div>

            <div style={{ marginBottom: '24px', display: 'grid', gap: '16px' }}>
              {bulkItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '16px',
                    background: '#fafafa'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {item.description}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
                        <span>📂 {item.category}</span>
                        <span>🏷️ {item.brand}</span>
                        <span>💰 {item.price.toLocaleString('ro-RO')} {item.currency}</span>
                        <span>📍 {item.location}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={processBulkListings}
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
                Procesează {bulkItems.length} Obiecte
              </button>
            </div>
          </div>
        )}

        {step === 'process' && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
              Procesare în Curs...
            </h2>
            
            {/* Progress Bar */}
            <div style={{
              background: '#f0f0f0',
              borderRadius: '10px',
              height: '20px',
              marginBottom: '24px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                  height: '100%',
                  width: `${uploadProgress}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
              {uploadProgress.toFixed(0)}% completat ({bulkItems.filter(item => item.status !== 'pending').length} din {bulkItems.length})
            </p>

            {/* Status List */}
            <div style={{ maxHeight: '300px', overflowY: 'auto', textAlign: 'left' }}>
              {bulkItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ fontSize: '16px', minWidth: '20px' }}>
                    {item.status === 'pending' ? '⏳' : 
                     item.status === 'processing' ? '⚙️' :
                     item.status === 'success' ? '✅' : '❌'}
                  </div>
                  <div style={{ flex: 1, fontSize: '14px', color: '#333' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {item.status === 'pending' ? 'În așteptare' :
                     item.status === 'processing' ? 'Se procesează...' :
                     item.status === 'success' ? 'Succes' : 'Eroare'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
              Procesare Finalizată!
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#28a745', marginBottom: '8px' }}>
                  {bulkItems.filter(item => item.status === 'success').length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Succes</div>
              </div>
              
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc3545', marginBottom: '8px' }}>
                  {bulkItems.filter(item => item.status === 'error').length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Erori</div>
              </div>
              
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#D09A1E', marginBottom: '8px' }}>
                  {bulkItems.length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Total</div>
              </div>
            </div>

            {bulkItems.filter(item => item.status === 'error').length > 0 && (
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#856404', marginBottom: '12px' }}>
                  Erori găsite:
                </h4>
                {bulkItems.filter(item => item.status === 'error').map((item, index) => (
                  <div key={item.id} style={{ fontSize: '14px', color: '#856404', marginBottom: '4px' }}>
                    • {item.title}: {item.error}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Vezi Dashboard
              </button>
              <button
                onClick={resetProcess}
                style={{
                  background: 'transparent',
                  color: '#D09A1E',
                  border: '2px solid #D09A1E',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Încarcă Alt Fișier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
