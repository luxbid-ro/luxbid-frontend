import React from 'react'

export const metadata = {
  title: 'Conformitate și Reglementări - LuxBid',
  description: 'Conformitatea LuxBid cu GDPR, DSA și reglementările române și europene. Monitorizare automată și raportare transparentă.',
}

export default function CompliancePage() {
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
          Conformitate și Reglementări
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
              <path d="M9 12l2 2 4-4"></path>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
            </svg>
            Angajamentul nostru pentru conformitate
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#0c4a6e' }}>
            LuxBid se angajează să respecte toate reglementările legale aplicabile în România, 
            Uniunea Europeană și jurisdicțiile internaționale relevante. Conformitatea nu este 
            doar o obligație legală, ci o prioritate fundamentală pentru protecția utilizatorilor.
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
            1. Reglementări europene
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.1 GDPR (General Data Protection Regulation)
          </h3>
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#059669' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Conformitate GDPR 100%
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#064e3b' }}>
              <li>Politică de confidențialitate detaliată și transparentă</li>
              <li>Consentiment explicit pentru prelucrarea datelor</li>
              <li>Dreptul la acces, rectificare și ștergerea datelor</li>
              <li>Data Protection Officer (DPO) desemnat</li>
              <li>Politici clare de păstrare și ștergere date</li>
              <li>Notificarea încălcărilor în termen de 72 ore</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.2 DSA (Digital Services Act)
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Implementare DSA Completă
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li>Sistem de moderare conținut automat și manual</li>
              <li>Mecanisme de raportare utilizatori</li>
              <li>Transparență în procesele de moderare</li>
              <li>Proceduri de contestare și recurs</li>
              <li>Rapoarte de transparență regulate</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.3 Directive UE pentru e-commerce
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Directiva e-Commerce (2000/31/EC):</strong> Transparență furnizor servicii</li>
            <li><strong>Consumer Rights Directive:</strong> Protecția consumatorilor online</li>
            <li><strong>Alternative Dispute Resolution:</strong> Mecanisme ADR implementate</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Legislația română
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Lege 455/2001 - comerț electronic
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Informații obligatorii despre furnizor</li>
            <li>Proceduri clare pentru comenzi online</li>
            <li>Dreptul de retragere și restituire</li>
            <li>Obligații de informare către consumatori</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Protecția consumatorilor (OUG 34/2014)
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Practici comerciale corecte</li>
            <li>Informații clare și complete despre produse</li>
            <li>Proceduri de reclamații și rezolvare dispute</li>
            <li>Protecție împotriva practicilor înșelătoare</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Standarde internaționale
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 ISO/IEC 27001 - Managementul securității informației
          </h3>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#92400e' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <polyline points="23,4 23,10 17,10"/>
                <polyline points="1,20 1,14 7,14"/>
                <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15"/>
              </svg>
              În curs de implementare
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e' }}>
              <li>Evaluarea riscurilor de securitate</li>
              <li>Politici și proceduri de securitate</li>
              <li>Monitorizare și audit continuu</li>
              <li>Gestionarea incidentelor de securitate</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 SOC 2 Type II Compliance
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Security:</strong> Protecția împotriva accesului neautorizat</li>
            <li><strong>Availability:</strong> Disponibilitatea sistemului conform SLA</li>
            <li><strong>Confidentiality:</strong> Protecția informațiilor confidențiale</li>
            <li><strong>Processing Integrity:</strong> Procesarea corectă și completă</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Monitorizare și audit
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.1 Sistem automat de monitorizare
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
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tip Verificare</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Frecvență</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>GDPR Compliance</strong></td>
                  <td style={{ padding: '12px' }}>Zilnic</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Security Headers</strong></td>
                  <td style={{ padding: '12px' }}>Zilnic</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Content Moderation</strong></td>
                  <td style={{ padding: '12px' }}>În timp real</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>Data Retention</strong></td>
                  <td style={{ padding: '12px' }}>Săptămânal</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Legal Updates</strong></td>
                  <td style={{ padding: '12px' }}>Lunar</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
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
            4.2 Audituri externe
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Audit GDPR:</strong> Anual de către consultant specializat</li>
            <li><strong>Security Audit:</strong> Semestrial - penetration testing</li>
            <li><strong>Legal Compliance Review:</strong> Trimestrial</li>
            <li><strong>ISO 27001 Assessment:</strong> În preparare pentru certificare</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Raportare și transparență
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.1 Rapoarte publice
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Rapoarte de transparență
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li><strong>Trimestrial:</strong> Raport activități moderare conținut</li>
              <li><strong>Semestrial:</strong> Raport GDPR și drepturile utilizatorilor</li>
              <li><strong>Anual:</strong> Raport complet de conformitate și securitate</li>
              <li><strong>Ad-hoc:</strong> Rapoarte de incident și măsuri corective</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.2 Comunicarea cu autoritățile
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>ANSPDCP:</strong> Autoritatea Națională pentru Protecția Datelor</li>
            <li><strong>ANCOM:</strong> Pentru aspecte de comunicații electronice</li>
            <li><strong>ANPC:</strong> Autoritatea Națională pentru Protecția Consumatorilor</li>
            <li><strong>European Commission:</strong> Pentru DSA compliance</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Îmbunătățire continuă
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.1 Procesul de actualizare
          </h3>
          <ol style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Monitorizare legislativă:</strong> Tracking actualizări legale</li>
            <li><strong>Impact assessment:</strong> Evaluarea impactului asupra platformei</li>
            <li><strong>Implementare:</strong> Actualizarea politicilor și procedurilor</li>
            <li><strong>Training echipa:</strong> Educarea personalului</li>
            <li><strong>Testare:</strong> Verificarea conformității implementării</li>
            <li><strong>Documentare:</strong> Actualizarea documentației</li>
          </ol>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.2 Feedback și îmbunătățiri
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
                <polyline points="23,4 23,10 17,10"/>
                <polyline points="1,20 1,14 7,14"/>
                <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15"/>
              </svg>
              Ciclul de îmbunătățire
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#064e3b' }}>
              <li>Colectare feedback utilizatori și autorități</li>
              <li>Analiză gap-uri și oportunități de îmbunătățire</li>
              <li>Prioritizare based pe risc și impact</li>
              <li>Implementare măsuri corective și preventive</li>
              <li>Măsurare eficiență și monitoring rezultate</li>
            </ul>
          </div>

          <div style={{
            background: '#f8f9fa',
            border: '2px solid #D09A1E',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#D09A1E'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> Contact conformitate
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Compliance Officer:</strong><br />
                <a href="mailto:compliance@luxbid.ro" style={{ color: '#D09A1E' }}>compliance@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Data Protection Officer:</strong><br />
                <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}>dpo@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Legal Department:</strong><br />
                <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
              </p>
              <p style={{ margin: '0' }}>
                <strong>Telefon:</strong> +40 21 XXX XXXX
              </p>
            </div>
          </div>

          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '24px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#0c4a6e',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12H1l6-6m0 0l6 6m-6-6v18"/></svg> Conformitatea este o prioritate constantă. Documentația este actualizată 
              regulat pentru a reflecta cele mai recente cerințe legale și beste practici.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
