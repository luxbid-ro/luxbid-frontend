'use client'

import React, { useState } from 'react'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  itemType: 'listing' | 'user' | 'message'
  itemId: string
  itemTitle?: string
}

const reportReasons = {
  listing: [
    { id: 'fake', label: 'Produs fals/contrafăcut', severity: 'high' },
    { id: 'misleading', label: 'Descriere înșelătoare', severity: 'medium' },
    { id: 'stolen', label: 'Produs furat', severity: 'high' },
    { id: 'inappropriate', label: 'Conținut inadecvat', severity: 'medium' },
    { id: 'spam', label: 'Spam/Publicitate', severity: 'low' },
    { id: 'copyright', label: 'Încălcare drepturi de autor', severity: 'high' },
    { id: 'other', label: 'Altul', severity: 'medium' }
  ],
  user: [
    { id: 'harassment', label: 'Hărțuire/Amenințări', severity: 'high' },
    { id: 'fraud', label: 'Activitate frauduloasă', severity: 'high' },
    { id: 'fake_profile', label: 'Profil fals', severity: 'medium' },
    { id: 'inappropriate', label: 'Comportament inadecvat', severity: 'medium' },
    { id: 'spam', label: 'Spam/Mesaje nedorite', severity: 'low' },
    { id: 'other', label: 'Altul', severity: 'medium' }
  ],
  message: [
    { id: 'harassment', label: 'Hărțuire/Amenințări', severity: 'high' },
    { id: 'hate_speech', label: 'Discurs instigator', severity: 'high' },
    { id: 'inappropriate', label: 'Conținut inadecvat', severity: 'medium' },
    { id: 'spam', label: 'Spam', severity: 'low' },
    { id: 'other', label: 'Altul', severity: 'medium' }
  ]
}

export default function ReportModal({ isOpen, onClose, itemType, itemId, itemTitle }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedReason) return

    setIsSubmitting(true)

    try {
      // Simulăm API call - în viitor va fi înlocuit cu call real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Submit report

      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
        setSelectedReason('')
        setDescription('')
      }, 2000)
    } catch (error) {
      // Failed to submit report
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const reasons = reportReasons[itemType]
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getItemTypeLabel = () => {
    switch (itemType) {
      case 'listing': return 'anunțul'
      case 'user': return 'utilizatorul'
      case 'message': return 'mesajul'
      default: return 'elementul'
    }
  }

  return (
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
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '24px',
        fontFamily: 'Inter, sans-serif'
      }}>
        {submitSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
            <h3 style={{ color: '#28a745', marginBottom: '8px' }}>
              Raport trimis cu succes!
            </h3>
            <p style={{ color: '#666', margin: '0' }}>
              Echipa noastră va investiga cazul în cel mai scurt timp.
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ margin: '0', color: '#1a1a1a', fontSize: '20px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</svg> Raportează {getItemTypeLabel()}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {itemTitle && (
              <div style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px'
              }}>
                <strong>Element raportat:</strong> {itemTitle}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#333'
                }}>
                  Motivul raportării:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {reasons.map((reason) => (
                    <label
                      key={reason.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        border: selectedReason === reason.id ? '2px solid #D09A1E' : '1px solid #e9ecef',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selectedReason === reason.id ? '#fff9f2' : '#fff',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason.id}
                        checked={selectedReason === reason.id}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        style={{ marginRight: '12px' }}
                      />
                      <span style={{ flexGrow: 1 }}>{reason.label}</span>
                      <span style={{
                        fontSize: '12px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: getSeverityColor(reason.severity),
                        color: '#fff',
                        fontWeight: '500'
                      }}>
                        {reason.severity === 'high' ? 'Urgent' : 
                         reason.severity === 'medium' ? 'Moderat' : 'Minor'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Detalii suplimentare (opțional):
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Oferiți mai multe detalii despre problemă..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{
                background: '#e8f4fd',
                border: '1px solid #bee5eb',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#0c5460'
              }}>
                <strong>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              Notă:
            </strong> Raporturile false sau abuzive pot duce la restricții ale contului. 
                Toate raporturile sunt investigate de echipa noastră de moderare.
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
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    background: '#fff',
                    color: '#666',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  disabled={!selectedReason || isSubmitting}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: selectedReason && !isSubmitting ? '#dc3545' : '#ccc',
                    color: '#fff',
                    cursor: selectedReason && !isSubmitting ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    transition: 'background 0.2s'
                  }}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite raport'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
