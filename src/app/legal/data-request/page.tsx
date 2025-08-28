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
              🛡️ Drepturile dvs. GDPR
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
              📋 Formular de cerere
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
                      title: '🔍 Dreptul de acces',
                      desc: 'Solicit o copie a tuturor datelor personale pe care le dețineți despre mine'
                    },
                    {
                      id: 'rectification',
                      title: '✏️ Dreptul la rectificare',
                      desc: 'Solicit corectarea datelor personale inexacte sau incomplete'
                    },
                    {
                      id: 'erasure',
                      title: '🗑️ Dreptul la ștergere ("dreptul de a fi uitat")',
                      desc: 'Solicit ștergerea completă a datelor personale și a contului'
                    },
                    {
                      id: 'portability',
                      title: '📤 Dreptul la portabilitatea datelor',
                      desc: 'Solicit datele într-un format structurat pentru transfer către alt furnizor'
                    },
                    {
                      id: 'restriction',
                      title: '⏸️ Dreptul la restricționarea prelucrării',
                      desc: 'Solicit limitarea modului în care îmi sunt prelucrate datele'
                    },
                    {
                      id: 'objection',
                      title: '🚫 Dreptul de opoziție',
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
                    <strong>📋 Documente necesare:</strong> Pentru verificarea identității, va trebui să atașați 
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
                  <strong>🚧 Notă:</strong> Acest formular este momentan în dezvoltare. 
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
              📞 Contact alternativ
            </h2>

            <div style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <strong>📧 Email DPO:</strong> <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}>dpo@luxbid.ro</a>
                </div>
                <div>
                  <strong>📞 Telefon:</strong> +40 21 XXX XXXX
                </div>
                <div>
                  <strong>🕒 Program:</strong> Luni - Vineri, 09:00 - 17:00
                </div>
                <div>
                  <strong>📍 Adresă poștală:</strong> București, Sector 1, România
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
