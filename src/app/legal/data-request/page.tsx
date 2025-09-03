import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerere Date Personale - LuxBid',
  description: 'Formularul pentru exercitarea drepturilor GDPR: descărcarea, rectificarea sau ștergerea datelor personale.',
}

export default function DataRequestPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '40px 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '32px',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Cerere Date Personale GDPR
        </h1>

        <div style={{
          color: '#333',
          lineHeight: '1.7',
          fontSize: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Drepturile dvs. GDPR
            </h3>
            <p style={{ margin: '0', color: '#0c5460' }}>
              În conformitate cu GDPR, aveți dreptul să accesați, rectificați, ștergeți sau să solicitați 
              portabilitatea datelor personale. Utilizați formularul de mai jos pentru a face o cerere.
            </p>
          </div>

          {/* Formularul GDPR */}
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              color: '#1a1a1a'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              Formular de cerere
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Informații personale */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 12px 0',
                  color: '#D09A1E'
                }}>
                  1. Informații de identificare
                </h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '6px',
                        color: '#333'
                      }}>
                        Nume *
                      </label>
                      <input
                        type="text"
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Numele dvs. complet"
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '6px',
                        color: '#333'
                      }}>
                        Prenume *
                      </label>
                      <input
                        type="text"
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Prenumele dvs."
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#333'
                    }}>
                      Email LuxBid *
                    </label>
                    <input
                      type="email"
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Adresa de email înregistrată pe LuxBid"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '6px',
                      color: '#333'
                    }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Numărul de telefon (opțional)"
                    />
                  </div>
                </div>
              </div>

              {/* Tipul cererii */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 12px 0',
                  color: '#D09A1E'
                }}>
                  2. Tipul cererii GDPR
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    {
                      id: 'access',
                      title: 'Dreptul de acces',
                      desc: 'Solicit o copie a tuturor datelor personale pe care le dețineți despre mine'
                    },
                    {
                      id: 'rectification',
                      title: (
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Dreptul la rectificare
                        </span>
                      ),
                      desc: 'Solicit corectarea datelor personale inexacte sau incomplete'
                    },
                    {
                      id: 'erasure',
                      title: (
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <path d="M3 6h18"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                          </svg>
                          Dreptul la ștergere ("dreptul de a fi uitat")
                        </span>
                      ),
                      desc: 'Solicit ștergerea completă a datelor personale și a contului'
                    },
                    {
                      id: 'portability',
                      title: (
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          Dreptul la portabilitatea datelor
                        </span>
                      ),
                      desc: 'Solicit datele într-un format structurat pentru transfer către alt furnizor'
                    },
                    {
                      id: 'restriction',
                      title: (
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                          </svg>
                          Dreptul la restricționarea prelucrării
                        </span>
                      ),
                      desc: 'Solicit limitarea modului în care îmi sunt prelucrate datele'
                    },
                    {
                      id: 'objection',
                      title: (
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                          </svg>
                          Dreptul de opoziție
                        </span>
                      ),
                      desc: 'Mă opun prelucrării datelor personale bazate pe interesul legitim'
                    }
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '16px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: '#fff'
                      }}
                    >
                      <input
                        type="radio"
                        name="requestType"
                        value={option.id}
                        style={{ marginRight: '12px', marginTop: '2px' }}
                      />
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                          {option.title}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Detalii suplimentare */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 12px 0',
                  color: '#D09A1E'
                }}>
                  3. Detalii suplimentare
                </h3>

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '6px',
                    color: '#333'
                  }}>
                    Descrierea cererii (opțional)
                  </label>
                  <textarea
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Specificați detalii suplimentare despre cererea dvs..."
                  />
                </div>
              </div>

              {/* Verificarea identității */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 12px 0',
                  color: '#D09A1E'
                }}>
                  4. Verificarea identității
                </h3>

                <div style={{
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '6px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <p style={{ margin: '0', fontSize: '14px', color: '#856404' }}>
                    <strong><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12H1l6-6m0 0l6 6m-6-6v18"/></svg> Documente necesare:</strong> Pentru verificarea identității, va trebui să atașați 
                    o copie a unui document de identitate valid (CI, pașaport) la cererea trimisă pe email.
                  </p>
                </div>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    required
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    Confirm că sunt titular al contului și că voi furniza documentele 
                    necesare pentru verificarea identității prin email. *
                  </span>
                </label>
              </div>

              {/* GDPR compliance */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 12px 0',
                  color: '#D09A1E'
                }}>
                  5. Acceptarea termenilor
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      required
                      style={{ marginRight: '8px', marginTop: '2px' }}
                    />
                    <span style={{ fontSize: '14px' }}>
                      Am citit și înțeleg <a href="/legal/privacy-policy" style={{ color: '#D09A1E' }}>Politica de Confidențialitate</a> 
                      și confirm că informațiile furnizate sunt corecte. *
                    </span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      required
                      style={{ marginRight: '8px', marginTop: '2px' }}
                    />
                    <span style={{ fontSize: '14px' }}>
                      Înțeleg că cererea va fi procesată în conformitate cu GDPR și că voi primi 
                      un răspuns în termen de maximum 30 de zile calendaristice. *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit button - disabled for demo */}
              <div style={{
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#721c24' }}>
                  <strong>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Notă:
                  </strong> Acest formular este momentan în dezvoltare. 
                  Pentru cereri GDPR, vă rugăm să contactați direct DPO-ul nostru la 
                  <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}> dpo@luxbid.ro</a>.
                </p>
              </div>

              <button
                type="button"
                disabled
                style={{
                  width: '100%',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#ccc',
                  color: '#666',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'not-allowed'
                }}
              >
                Trimite cererea (în dezvoltare)
              </button>
            </form>
          </div>

          {/* Informații suplimentare */}
          <div style={{ marginTop: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#1a1a1a'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> Contact alternativ
            </h2>

            <div style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <strong>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email DPO:
                  </strong> <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}>dpo@luxbid.ro</a>
                </div>
                <div>
                  <strong><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> Telefon:</strong> +40 21 XXX XXXX
                </div>
                <div>
                  <strong>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    Program:
                  </strong> Luni - Vineri, 09:00 - 17:00
                </div>
                <div>
                  <strong>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Adresă poștală:
                  </strong> București, Sector 1, România
                </div>
              </div>

              <div style={{
                background: '#e8f4fd',
                border: '1px solid #bee5eb',
                borderRadius: '6px',
                padding: '12px',
                marginTop: '16px',
                fontSize: '14px',
                color: '#0c5460'
              }}>
                <strong>⏱️ Timp de procesare:</strong> Cererile GDPR sunt procesate în maximum 30 de zile calendaristice. 
                În cazuri complexe, termenul poate fi prelungit cu încă 60 de zile, cu notificare prealabilă.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
