'use client'

import React, { useState } from 'react'
import { REPORT_CATEGORIES } from '@/utils/contentModeration'

interface ContentReportModalProps {
  isOpen: boolean
  onClose: () => void
  contentId: string
  contentType: 'listing' | 'message' | 'profile'
  contentTitle?: string
}

export default function ContentReportModal({
  isOpen,
  onClose,
  contentId,
  contentType,
  contentTitle
}: ContentReportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCategory) {
      alert('Vă rugăm să selectați o categorie')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulare API call - în implementarea reală ar trimite la backend
      const report = {
        contentId,
        contentType,
        category: selectedCategory,
        description,
        timestamp: new Date().toISOString(),
        reporterId: 'current-user-id' // Ar veni din context
      }

      console.log('Content report:', report)
      
      // Simulare delay API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      
      // Auto-close după 2 secunde
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setSelectedCategory('')
        setDescription('')
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting report:', error)
      alert('A apărut o eroare. Vă rugăm să încercați din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        {isSubmitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              ✅
            </div>
            <h2 style={{
              margin: '0 0 16px 0',
              color: '#059669',
              fontSize: '24px'
            }}>
              Raport trimis cu succes
            </h2>
            <p style={{
              margin: 0,
              color: '#666',
              fontSize: '16px'
            }}>
              Mulțumim pentru raport. Echipa noastră va investiga în curând.
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '24px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                🚨 Raportează Conținut
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {contentTitle && (
              <div style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                border: '1px solid #e9ecef'
              }}>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '600'
                }}>
                  Raportezi:
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  color: '#333'
                }}>
                  {contentTitle}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  De ce raportezi acest conținut?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(REPORT_CATEGORIES).map(([key, label]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        backgroundColor: selectedCategory === key ? '#f0f9ff' : '#fff',
                        borderColor: selectedCategory === key ? '#0ea5e9' : '#e9ecef'
                      }}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={key}
                        checked={selectedCategory === key}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ marginRight: '12px' }}
                      />
                      <span style={{
                        fontSize: '14px',
                        color: '#333'
                      }}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Detalii suplimentare (opțional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrie problema în mai multe detalii..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    background: '#fff',
                    color: '#666',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={!selectedCategory || isSubmitting}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: selectedCategory && !isSubmitting ? '#dc2626' : '#ccc',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: selectedCategory && !isSubmitting ? 'pointer' : 'not-allowed'
                  }}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite Raport'}
                </button>
              </div>
            </form>

            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #f59e0b'
            }}>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#92400e'
              }}>
                <strong>📋 Notă:</strong> Rapoartele false sau abuzive pot duce la suspendarea contului. 
                Folosește această funcție doar pentru probleme legitime.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
