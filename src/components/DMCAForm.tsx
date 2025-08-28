'use client'

import React, { useState } from 'react'

interface DMCAFormProps {
  contentUrl?: string
  contentTitle?: string
  isOpen: boolean
  onClose: () => void
}

export default function DMCAForm({ contentUrl, contentTitle, isOpen, onClose }: DMCAFormProps) {
  const [formData, setFormData] = useState({
    // Informații despre opera protejată
    copyrightedWork: '',
    copyrightOwner: '',
    
    // Informații despre încălcare
    infringingUrl: contentUrl || '',
    infringingDescription: '',
    
    // Informații de contact
    fullName: '',
    title: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    
    // Declarații
    goodFaithBelief: false,
    accuracyStatement: false,
    authorizedToAct: false,
    
    // Semnătura
    electronicSignature: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!formData.copyrightedWork.trim()) newErrors.push('Opera protejată este obligatorie')
    if (!formData.copyrightOwner.trim()) newErrors.push('Proprietarul drepturilor este obligatoriu')
    if (!formData.infringingUrl.trim()) newErrors.push('URL-ul încălcării este obligatoriu')
    if (!formData.infringingDescription.trim()) newErrors.push('Descrierea încălcării este obligatorie')
    if (!formData.fullName.trim()) newErrors.push('Numele complet este obligatoriu')
    if (!formData.address.trim()) newErrors.push('Adresa este obligatorie')
    if (!formData.city.trim()) newErrors.push('Orașul este obligatoriu')
    if (!formData.country.trim()) newErrors.push('Țara este obligatorie')
    if (!formData.email.trim()) newErrors.push('Email-ul este obligatoriu')
    if (!formData.goodFaithBelief) newErrors.push('Declarația de bună credință este obligatorie')
    if (!formData.accuracyStatement) newErrors.push('Declarația de acuratețe este obligatorie')
    if (!formData.authorizedToAct) newErrors.push('Autorizația de a acționa este obligatorie')
    if (!formData.electronicSignature.trim()) newErrors.push('Semnătura electronică este obligatorie')
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulare trimitere DMCA - în implementarea reală ar trimite la backend
      const dmcaReport = {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: 'masked_for_privacy'
      }
      
      console.log('DMCA Notice submitted:', dmcaReport)
      
      // Simulare delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      
      // Auto-close după 3 secunde
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setFormData({
          copyrightedWork: '',
          copyrightOwner: '',
          infringingUrl: '',
          infringingDescription: '',
          fullName: '',
          title: '',
          company: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          phone: '',
          email: '',
          goodFaithBelief: false,
          accuracyStatement: false,
          authorizedToAct: false,
          electronicSignature: ''
        })
        setErrors([])
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting DMCA notice:', error)
      setErrors(['A apărut o eroare la trimiterea notificării. Vă rugăm să încercați din nou.'])
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
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        {isSubmitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ margin: '0 0 16px 0', color: '#059669', fontSize: '24px' }}>
              Notificare DMCA trimisă cu succes
            </h2>
            <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
              Mulțumim pentru notificare. Echipa noastră va investiga în termen de 24-48 ore 
              și vă va contacta cu actualizări.
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
                ©️ Notificare DMCA
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
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666', fontWeight: '600' }}>
                  Raportezi încălcarea pentru:
                </p>
                <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                  {contentTitle}
                </p>
              </div>
            )}

            {errors.length > 0 && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>
                  Erori de validare:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f1d1d' }}>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Secțiunea 1: Opera protejată */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#D09A1E' }}>
                  1. Identificarea operei protejate
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Descrierea operei protejate prin drepturi de autor *
                  </label>
                  <textarea
                    value={formData.copyrightedWork}
                    onChange={(e) => setFormData({...formData, copyrightedWork: e.target.value})}
                    placeholder="Ex: Fotografie originală a unui ceas Rolex Submariner, realizată de mine în studioul personal..."
                    rows={3}
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
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Proprietarul drepturilor de autor *
                  </label>
                  <input
                    type="text"
                    value={formData.copyrightOwner}
                    onChange={(e) => setFormData({...formData, copyrightOwner: e.target.value})}
                    placeholder="Ex: John Doe Photography Studio"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Secțiunea 2: Încălcarea */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#D09A1E' }}>
                  2. Identificarea încălcării
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    URL-ul conținutului care încalcă drepturile *
                  </label>
                  <input
                    type="url"
                    value={formData.infringingUrl}
                    onChange={(e) => setFormData({...formData, infringingUrl: e.target.value})}
                    placeholder="https://www.luxbid.ro/oferte/123"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Descrierea încălcării *
                  </label>
                  <textarea
                    value={formData.infringingDescription}
                    onChange={(e) => setFormData({...formData, infringingDescription: e.target.value})}
                    placeholder="Explică cum conținutul încalcă drepturile tale de autor..."
                    rows={3}
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
                    required
                  />
                </div>
              </div>

              {/* Secțiunea 3: Informații de contact */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#D09A1E' }}>
                  3. Informații de contact
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Titlu/Funcție
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Fotograf, Proprietar"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Companie/Organizație
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Adresa *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Oraș *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Județ/Stat
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Cod poștal
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Țara *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Secțiunea 4: Declarații */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#D09A1E' }}>
                  4. Declarații obligatorii
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: formData.goodFaithBelief ? '#f0f9ff' : '#fff'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.goodFaithBelief}
                      onChange={(e) => setFormData({...formData, goodFaithBelief: e.target.checked})}
                      style={{ marginRight: '12px', marginTop: '4px' }}
                      required
                    />
                    <span style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      <strong>Declarația de bună credință:</strong> Am o bună credință că utilizarea materialului 
                      în cauză nu este autorizată de către proprietarul drepturilor de autor, agentul său sau legea.
                    </span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: formData.accuracyStatement ? '#f0f9ff' : '#fff'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.accuracyStatement}
                      onChange={(e) => setFormData({...formData, accuracyStatement: e.target.checked})}
                      style={{ marginRight: '12px', marginTop: '4px' }}
                      required
                    />
                    <span style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      <strong>Declarația de acuratețe:</strong> Informațiile din această notificare sunt corecte și, 
                      sub sancțiunea sperjurului, declar că sunt proprietarul drepturilor exclusive sau sunt autorizat 
                      să acționez în numele proprietarului.
                    </span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: formData.authorizedToAct ? '#f0f9ff' : '#fff'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.authorizedToAct}
                      onChange={(e) => setFormData({...formData, authorizedToAct: e.target.checked})}
                      style={{ marginRight: '12px', marginTop: '4px' }}
                      required
                    />
                    <span style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      <strong>Autorizația de a acționa:</strong> Confirm că sunt autorizat să trimit această 
                      notificare în numele proprietarului drepturilor de autor care pretind că au fost încălcate.
                    </span>
                  </label>
                </div>
              </div>

              {/* Secțiunea 5: Semnătura */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#D09A1E' }}>
                  5. Semnătura electronică
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Semnătura electronică (tastează numele complet) *
                  </label>
                  <input
                    type="text"
                    value={formData.electronicSignature}
                    onChange={(e) => setFormData({...formData, electronicSignature: e.target.value})}
                    placeholder="Ex: John Doe"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                    Prin tastarea numelui aici, confirmi că aceasta servește ca semnătură electronică validă.
                  </p>
                </div>
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
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: isSubmitting ? '#ccc' : '#dc2626',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite Notificare DMCA'}
                </button>
              </div>
            </form>

            <div style={{
              marginTop: '24px',
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
                <strong>⚠️ Avertisment legal:</strong> Depunerea unei notificări DMCA false poate avea 
                consecințe legale grave, inclusiv daune. Asigură-te că informațiile sunt corecte și 
                că ai drepturile asupra conținutului reclamat.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
