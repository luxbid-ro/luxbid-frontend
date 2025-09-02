import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soluționarea Disputelor - LuxBid',
  description: 'Procedura de soluționare a disputelor și medierea conflictelor pe platforma LuxBid.',
}

export default function DisputeResolutionPage() {
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
          Soluționarea Disputelor
        </h1>

        <div style={{
          color: '#333',
          lineHeight: '1.7',
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Ultima actualizare:</strong> 28.08.2025
          </p>
        </div>

        <div style={{ color: '#333', lineHeight: '1.7', fontSize: '16px' }}>
          {/* Introducere */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            1. Introducere
          </h2>
          <p style={{ marginBottom: '16px' }}>
            LuxBid se angajează să faciliteze soluționarea pașnică și echitabilă a disputelor între utilizatori. 
            Această procedură stabilește modalitățile prin care conflictele pot fi rezolvate rapid și eficient, 
            respectând drepturile tuturor părților implicate.
          </p>

          {/* Tipuri de dispute */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Tipuri de dispute
          </h2>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            {[
              {
                icon: '💰',
                title: 'Dispute financiare',
                desc: 'Probleme legate de prețuri, plăți sau rambursări'
              },
              {
                icon: '📦',
                title: 'Dispute privind produsele',
                desc: 'Calitate, autenticitate sau conformitate cu descrierea'
              },
              {
                icon: '🚚',
                title: 'Dispute de livrare',
                desc: 'Întârzieri, deteriorări sau probleme de transport'
              },
              {
                icon: '🤝',
                title: 'Dispute contractuale',
                desc: 'Nerespectarea termenilor acordați între părți'
              },
              {
                icon: '⚖️',
                title: 'Dispute de conduită',
                desc: 'Comportament inadecvat sau încălcarea regulilor'
              }
            ].map((type, index) => (
              <div key={index} style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>{type.icon}</span>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#D09A1E' }}>
                    {type.title}
                  </h4>
                  <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                    {type.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Procesul de soluționare */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Procesul de soluționare în 4 etape
          </h2>

          {/* Etapa 1 */}
          <div style={{
            border: '2px solid #D09A1E',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#D09A1E',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                background: '#D09A1E',
                color: '#fff',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700'
              }}>1</span>
              Comunicare directă (0-7 zile)
            </h3>
            <p style={{ marginBottom: '12px' }}>
              <strong>Obiectiv:</strong> Rezolvarea amiabilă între părți
            </p>
            <ul style={{ marginBottom: '12px', paddingLeft: '20px' }}>
              <li>Comunicarea se desfășoară prin sistemul de mesagerie LuxBid</li>
              <li>Părțile încearcă să ajungă la o înțelegere mutuală</li>
              <li>Documentarea tuturor încercărilor de comunicare</li>
              <li>Timp recomandat: 3-7 zile</li>
            </ul>
            <div style={{
              background: '#fff9f2',
              border: '1px solid #ffeaa7',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#856404'
            }}>
              <strong>💡 Consiliu:</strong> Majoritatea disputelor se rezolvă în această etapă prin dialog constructiv și bună-credință.
            </div>
          </div>

          {/* Etapa 2 */}
          <div style={{
            border: '2px solid #28a745',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#28a745',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                background: '#28a745',
                color: '#fff',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700'
              }}>2</span>
              Medierea LuxBid (7-14 zile)
            </h3>
            <p style={{ marginBottom: '12px' }}>
              <strong>Obiectiv:</strong> Intervenția unui mediator neutru
            </p>
            <ul style={{ marginBottom: '12px', paddingLeft: '20px' }}>
              <li>Un specialist LuxBid analizează cazul</li>
              <li>Se organizează sesiuni de mediere online</li>
              <li>Propuneri de soluții echitabile pentru ambele părți</li>
              <li>Documentarea întregului proces</li>
            </ul>
            <div style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#155724'
            }}>
              <strong>📞 Contact mediator:</strong> mediation@luxbid.ro | +40 21 XXX XXXX
            </div>
          </div>

          {/* Etapa 3 */}
          <div style={{
            border: '2px solid #ffc107',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#856404',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                background: '#ffc107',
                color: '#000',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700'
              }}>3</span>
              Arbitrajul intern (14-30 zile)
            </h3>
            <p style={{ marginBottom: '12px' }}>
              <strong>Obiectiv:</strong> Decizie obligatorie din partea LuxBid
            </p>
            <ul style={{ marginBottom: '12px', paddingLeft: '20px' }}>
              <li>Evaluarea completă a dovezilor prezentate</li>
              <li>Consultarea cu experți în domeniu (dacă e necesar)</li>
              <li>Luarea unei decizii obligatorii</li>
              <li>Comunicarea deciziei către ambele părți</li>
            </ul>
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#856404'
            }}>
              <strong>⚖️ Important:</strong> Decizia arbitrajului intern este obligatorie pentru utilizarea continuă a platformei.
            </div>
          </div>

          {/* Etapa 4 */}
          <div style={{
            border: '2px solid #dc3545',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#dc3545',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                background: '#dc3545',
                color: '#fff',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700'
              }}>4</span>
              Arbitrajul extern (30+ zile)
            </h3>
            <p style={{ marginBottom: '12px' }}>
              <strong>Obiectiv:</strong> Soluționarea prin instanțe competente
            </p>
            <ul style={{ marginBottom: '12px', paddingLeft: '20px' }}>
              <li>Recomandarea unor arbitri externi autorizați</li>
              <li>Facilitarea procesului de arbitraj extern</li>
              <li>Respectarea deciziilor arbitrale finale</li>
              <li>Colaborarea cu autoritățile competente</li>
            </ul>
            <div style={{
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#721c24'
            }}>
              <strong>🏛️ Arbitraj extern:</strong> Camera de Arbitraj Comercial București | Curtea de Arbitraj Comercial Internațional
            </div>
          </div>

          {/* Cum să inițiezi o dispută */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Cum să inițiezi o dispută
          </h2>

          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              Documentele necesare:
            </h4>
            <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', color: '#0c5460' }}>
              <li>Conversațiile/mesajele relevante</li>
              <li>Screenshot-uri ale listingului/tranzacției</li>
              <li>Dovezi de plată (dacă aplicabil)</li>
              <li>Fotografii ale produsului (dacă aplicabil)</li>
              <li>Alte documente suport</li>
            </ul>
            <p style={{ margin: '0', color: '#0c5460' }}>
              <strong>📧 Email:</strong> <a href="mailto:disputes@luxbid.ro" style={{ color: '#D09A1E' }}>disputes@luxbid.ro</a>
            </p>
          </div>

          {/* Drepturile părților */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Drepturile părților în dispută
          </h2>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {[
              'Dreptul la un proces echitabil și imparțial',
              'Dreptul de a fi ascultat și de a prezenta argumente',
              'Dreptul la reprezentare legală (în arbitrajul extern)',
              'Dreptul la confidențialitatea procesului',
              'Dreptul de a contesta deciziile arbitrale interne',
              'Dreptul la informare asupra tuturor etapelor procesului'
            ].map((right, index) => (
              <div key={index} style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓</span>
                <span>{right}</span>
              </div>
            ))}
          </div>

          {/* Taxe și costuri */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Taxe și costuri
          </h2>

          <div style={{
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#155724' }}>
              💰 Structura de costuri
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#155724' }}>
              <li><strong>Etapele 1-2:</strong> Gratuit pentru toți utilizatorii</li>
              <li><strong>Arbitrajul intern:</strong> 50 RON (se returnează dacă disputanta are câștig de cauză)</li>
              <li><strong>Arbitrajul extern:</strong> Conform tarifelor arbitrilor externi</li>
            </ul>
          </div>

          {/* Contact și asistență */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            7. Contact și asistență
          </h2>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <strong>📧 Departamentul Dispute:</strong> <a href="mailto:disputes@luxbid.ro" style={{ color: '#D09A1E' }}>disputes@luxbid.ro</a>
              </div>
              <div>
                <strong>📞 Telefon urgențe:</strong> +40 21 XXX XXXX
              </div>
              <div>
                <strong>🕒 Program:</strong> Luni - Vineri, 09:00 - 18:00
              </div>
              <div>
                <strong>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Chat live:
                </strong> Disponibil pe platformă în timpul programului
              </div>
            </div>
          </div>

          {/* Notă finală */}
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#856404' }}>
              <strong>🤝 Angajamentul nostru:</strong> LuxBid se angajează să faciliteze 
              rezolvarea rapidă și echitabilă a tuturor disputelor, menținând în același timp 
              un mediu sigur și de încredere pentru toți utilizatorii noștri.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
