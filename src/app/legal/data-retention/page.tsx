import React from 'react'

export const metadata = {
  title: 'Politica de Păstrare Date - LuxBid',
  description: 'Politica de păstrare și ștergere date conform GDPR. Perioade de retenție și procese automate pentru protecția datelor.',
}

export default function DataRetentionPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      padding: '40px 0',
      background: '#fff'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '32px',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Politica de Păstrare Date
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
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Data intrării în vigoare:</strong> 28.08.2025
          </p>
        </div>

        <div style={{
          background: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: '#0369a1'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-4"/>
              <path d="M9 9v.01"/>
              <path d="M9 12v.01"/>
              <path d="M9 15v.01"/>
              <path d="M9 18v.01"/>
            </svg>
            Principii generale
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#0c4a6e' }}>
            LuxBid respectă principiile GDPR de minimizare și limitare în timp a datelor. 
            Păstrăm datele doar cât timp este necesar pentru scopurile declarate și 
            îndeplinirea obligațiilor legale.
          </p>
        </div>

        <div style={{
          color: '#333',
          lineHeight: '1.7',
          fontSize: '16px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            1. Categorii de date și perioade de păstrare
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.1 Date conturi utilizatori
          </h3>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #D09A1E' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tip Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Perioada Păstrare</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Justificare</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Date profil activ</strong></td>
                  <td style={{ padding: '12px' }}>Cât timp contul este activ</td>
                  <td style={{ padding: '12px' }}>Furnizarea serviciilor</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Date profil șters</strong></td>
                  <td style={{ padding: '12px' }}>30 zile</td>
                  <td style={{ padding: '12px' }}>Recuperare cont accidentală</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Email + parola hash</strong></td>
                  <td style={{ padding: '12px' }}>7 ani după ștergere</td>
                  <td style={{ padding: '12px' }}>Prevenire fraudă, obligații fiscale</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>IP și log-uri acces</strong></td>
                  <td style={{ padding: '12px' }}>12 luni</td>
                  <td style={{ padding: '12px' }}>Securitate și prevenire abuzuri</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.2 Listări și anunțuri
          </h3>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #D09A1E' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tip Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Perioada Păstrare</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Justificare</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Listări active</strong></td>
                  <td style={{ padding: '12px' }}>Cât timp sunt publicate</td>
                  <td style={{ padding: '12px' }}>Furnizarea serviciilor</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Listări șterse/expirate</strong></td>
                  <td style={{ padding: '12px' }}>6 luni</td>
                  <td style={{ padding: '12px' }}>Disputuri, investigații fraudă</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Imagini produse</strong></td>
                  <td style={{ padding: '12px' }}>6 luni după ștergere</td>
                  <td style={{ padding: '12px' }}>Copyright, dispute DMCA</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Moderare și rapoarte</strong></td>
                  <td style={{ padding: '12px' }}>2 ani</td>
                  <td style={{ padding: '12px' }}>Audit compliance, îmbunătățire algoritmi</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.3 Comunicări și mesaje
          </h3>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #D09A1E' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tip Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Perioada Păstrare</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Justificare</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Mesaje între utilizatori</strong></td>
                  <td style={{ padding: '12px' }}>3 ani</td>
                  <td style={{ padding: '12px' }}>Disputuri comerciale, investigații</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Email-uri automate</strong></td>
                  <td style={{ padding: '12px' }}>1 an</td>
                  <td style={{ padding: '12px' }}>Audit comunicări, debugging</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Notificări push</strong></td>
                  <td style={{ padding: '12px' }}>6 luni</td>
                  <td style={{ padding: '12px' }}>Optimizare servicii</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Support tickets</strong></td>
                  <td style={{ padding: '12px' }}>5 ani</td>
                  <td style={{ padding: '12px' }}>Îmbunătățire servicii, referințe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Procese automate de ștergere
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Ștergere automată zilnică
          </h3>
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#059669' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
              Job automated - 02:00 AM zilnic
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#064e3b' }}>
              <li>Sesiuni expirate (peste 30 zile)</li>
              <li>Token-uri reset parolă expirate</li>
              <li>Cache-uri temporare și fișiere temp</li>
              <li>Log-uri de debug (peste 7 zile)</li>
              <li>Notificări citite (peste 90 zile)</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Ștergere automată săptămânală
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg> Job automated - Duminica, 03:00 AM
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li>Conturi marcate pentru ștergere (peste 30 zile)</li>
              <li>Listări expirate (peste 6 luni)</li>
              <li>Email-uri bounce permanente</li>
              <li>Rapoarte moderare rezolvate (peste 2 ani)</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.3 Ștergere automată lunară
          </h3>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fde047',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#ca8a04' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Job automated - 1 luna, 04:00 AM
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e' }}>
              <li>Imagini orfane (fără listări asociate)</li>
              <li>Backup-uri vechi (peste 12 luni)</li>
              <li>Log-uri acces anonimizate (peste 12 luni)</li>
              <li>Statistici aggregated (recomputing)</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Cereri manual de ștergere
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 Dreptul la ștergere (GDPR Art. 17)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Utilizatorii pot cere ștergerea datelor în următoarele cazuri:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Datele nu mai sunt necesare pentru scopurile inițiale</li>
            <li>Utilizatorul își retrage consimțământul</li>
            <li>Datele au fost prelucrate ilegal</li>
            <li>Ștergerea este necesară pentru conformitatea legală</li>
            <li>Datele au fost colectate pentru servicii societății informaționale (minori)</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 Limitări ale dreptului la ștergere
          </h3>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Excepții legale
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#7f1d1d' }}>
              Nu putem șterge datele când păstrarea este necesară pentru:
            </p>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#7f1d1d' }}>
              <li>Exercitarea liberității de expresie și informare</li>
              <li>Îndeplinirea obligațiilor legale</li>
              <li>Îndeplinirea sarcinilor de interes public</li>
              <li>Constatarea, exercitarea sau apărarea drepturilor în instanță</li>
              <li>Motive de interes public în domeniul sănătății publice</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.3 Procesul de ștergere manuală
          </h3>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12H1l6-6m0 0l6 6m-6-6v18"/></svg> Timeline procesare cerere</h4>
            <ol style={{ margin: '0', paddingLeft: '20px' }}>
              <li><strong>Ziua 0:</strong> Primirea cererii prin email/formular</li>
              <li><strong>Ziua 1:</strong> Confirmare primire și verificare identitate</li>
              <li><strong>Ziua 3-5:</strong> Analiză legală și tehnică</li>
              <li><strong>Ziua 7-15:</strong> Executarea ștergerii (dacă aprobată)</li>
              <li><strong>Ziua 16-30:</strong> Confirmare finalizare către utilizator</li>
            </ol>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Arhivare și backup
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.1 Politica de backup
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Backup-uri zilnice:</strong> Păstrate 30 zile</li>
            <li><strong>Backup-uri săptămânale:</strong> Păstrate 12 săptămâni</li>
            <li><strong>Backup-uri lunare:</strong> Păstrate 12 luni</li>
            <li><strong>Backup-uri anuale:</strong> Păstrate 7 ani (date esențiale)</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.2 Arhivare cold storage
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Datele cu valoare istorică/legală sunt arhivate în cold storage:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Tranzacții și contracte importante</li>
            <li>Comunicări oficiale și documente legale</li>
            <li>Log-uri de audit și security events</li>
            <li>Date necesare pentru obligații fiscale</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Monitorizare și audit
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.1 Audit lunar
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Raport automatizat lunar
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li>Volume de date șterse automat</li>
              <li>Cereri manuale de ștergere procesate</li>
              <li>Timpul mediu de răspuns la cereri</li>
              <li>Anomalii în procesele de ștergere</li>
              <li>Compliance cu timpii declarați</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.2 Alerting și notificări
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Alert automat:</strong> Job-uri de ștergere eșuate</li>
            <li><strong>Warning:</strong> Volume mari de date aproape de limita timpului</li>
            <li><strong>Reminder:</strong> Cereri manuale aproape de deadline</li>
            <li><strong>Report:</strong> Rapoarte trimestriale către DPO</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Contact și cereri
          </h2>

          <div style={{
            background: '#f8f9fa',
            border: '2px solid #D09A1E',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#D09A1E'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Pentru cereri de ștergere date
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Email principal:</strong> <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}>dpo@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Email secundar:</strong> <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Formular online:</strong> <a href="/legal/data-request" style={{ color: '#D09A1E' }}>Cerere Date GDPR</a>
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Telefon:</strong> +40 21 XXX XXXX
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>Program:</strong> Luni - Vineri, 09:00 - 17:00
              </p>
            </div>
          </div>

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#856404',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              ⏰ Această politică este revizuită anual și actualizată conform evoluției 
              reglementărilor și a bunelor practici în domeniu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
