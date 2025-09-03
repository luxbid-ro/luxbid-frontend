import React from 'react'

export const metadata = {
  title: 'Securitate și Protecție - LuxBid',
  description: 'Măsurile de securitate implementate pe platforma LuxBid. SSL, HSTS, monitorizare și protecția datelor utilizatorilor.',
}

export default function SecurityPage() {
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
          Securitate și Protecție
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
          background: '#f0fdf4',
          border: '2px solid #22c55e',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: '#15803d'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Angajamentul nostru pentru securitate
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#14532d' }}>
            LuxBid implementează măsuri de securitate de ultimă generație pentru a proteja 
            datele utilizatorilor și integritatea platformei. Securitatea nu este doar o 
            prioritate, ci fundamentul pe care am construit întregul serviciu.
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
            1. Securitatea comunicației
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.1 Criptare end-to-end
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              HTTPS/TLS 1.3
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li>Toate comunicațiile sunt criptate cu TLS 1.3</li>
              <li>Certificate SSL/TLS cu validare extinsă (EV)</li>
              <li>HTTP Strict Transport Security (HSTS) activat</li>
              <li>Certificate Transparency monitoring</li>
              <li>Perfect Forward Secrecy (PFS)</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.2 Headers de securitate
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
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Header</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Funcție</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>HSTS</strong></td>
                  <td style={{ padding: '12px' }}>Forțează HTTPS</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>CSP</strong></td>
                  <td style={{ padding: '12px' }}>Previne XSS</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>X-Frame-Options</strong></td>
                  <td style={{ padding: '12px' }}>Anti-clickjacking</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '12px' }}><strong>X-Content-Type-Options</strong></td>
                  <td style={{ padding: '12px' }}>Anti-MIME sniffing</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Referrer-Policy</strong></td>
                  <td style={{ padding: '12px' }}>Control informații referrer</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Activ</td>
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
            2. Protecția datelor utilizatorilor
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Criptare date sensibile
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Parole:</strong> Hash-uire cu bcrypt (salt rounds: 12)</li>
            <li><strong>Date personale:</strong> AES-256 encryption la nivel de bază de date</li>
            <li><strong>Sesiuni:</strong> JWT cu RS256 signing</li>
            <li><strong>Comunicații:</strong> Criptare end-to-end pentru mesaje</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Autentificare și autorizare
          </h3>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#92400e' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Măsuri de protecție cont
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e' }}>
              <li>Autentificare cu două factori (2FA) disponibilă</li>
              <li>Rate limiting pentru încercări de login</li>
              <li>Detectare activitate suspicioasă</li>
              <li>Session timeout automat</li>
              <li>Logout automat pe device-uri multiple</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Securitatea infrastructurii
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 Cloud security
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Hosting:</strong> Render.com cu SOC 2 Type II compliance</li>
            <li><strong>CDN:</strong> Cloudflare cu DDoS protection</li>
            <li><strong>Database:</strong> PostgreSQL cu encryption at rest</li>
            <li><strong>Backups:</strong> Criptate și distribuite geografic</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 Monitoring și alerting
          </h3>
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#059669' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Monitorizare 24/7
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#064e3b' }}>
              <li>Real-time security event monitoring</li>
              <li>Automated intrusion detection</li>
              <li>Log analysis și anomaly detection</li>
              <li>Uptime monitoring și alerting</li>
              <li>Performance și security metrics</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Prevenirea atacurilor
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.1 Protecție DDoS
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Cloudflare DDoS protection cu 154+ Tbps capacitate</li>
            <li>Rate limiting pe endpoint-uri sensibile</li>
            <li>Geo-blocking pentru țări cu risc ridicat</li>
            <li>Bot management și challenge solving</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.2 Protecție aplicație web
          </h3>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Web Application Firewall (WAF)
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#7f1d1d' }}>
              <li>SQL injection prevention</li>
              <li>Cross-site scripting (XSS) blocking</li>
              <li>Command injection detection</li>
              <li>File upload scanning</li>
              <li>OWASP Top 10 protection</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Audit și compliance
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.1 Audituri externe
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Penetration testing:</strong> Trimestrial de către firme specializate</li>
            <li><strong>Vulnerability scanning:</strong> Săptămânal automat</li>
            <li><strong>Code security review:</strong> La fiecare update major</li>
            <li><strong>Compliance audit:</strong> Anual pentru GDPR/SOC2</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.2 Certificări și standarde
          </h3>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              Conformitate
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li><strong>GDPR:</strong> General Data Protection Regulation</li>
              <li><strong>SOC 2 Type II:</strong> Security, Availability, Confidentiality</li>
              <li><strong>ISO 27001:</strong> Information Security Management (în curs)</li>
              <li><strong>PCI DSS:</strong> Pentru procesarea plăților (viitor)</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Raportarea vulnerabilităților
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.1 Bug bounty program
          </h3>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> Responsible disclosure
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#0c4a6e' }}>
              Încurajăm cercetătorii în securitate să raporteze vulnerabilitățile responsabil:
            </p>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
              <li><strong>Email:</strong> security@luxbid.ro</li>
              <li><strong>PGP Key:</strong> Disponibilă pe cerere</li>
              <li><strong>Response time:</strong> Maximum 24 ore</li>
              <li><strong>Recompense:</strong> În funcție de severitate</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.2 Procesul de remediere
          </h3>
          <ol style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Raportare:</strong> Primirea raportului de vulnerabilitate</li>
            <li><strong>Triaj:</strong> Evaluarea severității în 24h</li>
            <li><strong>Investigație:</strong> Analiza detaliată în 48-72h</li>
            <li><strong>Patch:</strong> Dezvoltarea și testarea fix-ului</li>
            <li><strong>Deploy:</strong> Implementarea urgentă în producție</li>
            <li><strong>Verificare:</strong> Confirmarea rezolvării complete</li>
          </ol>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            7. Educație și conștientizare
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            7.1 Resurse pentru utilizatori
          </h3>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#92400e' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Bune practici de securitate
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e' }}>
              <li>Folosește parole puternice și unice</li>
              <li>Activează autentificarea cu două factori</li>
              <li>Nu împărtăși niciodată credențialele</li>
              <li>Verifică conexiunea HTTPS înainte de login</li>
              <li>Raportează activitatea suspicioasă imediat</li>
            </ul>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            7.2 Training echipa
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Training lunar de security awareness</li>
            <li>Simulări de phishing și social engineering</li>
            <li>Code review obligatoriu pentru modificări</li>
            <li>Participare la conferințe de securitate</li>
          </ul>

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> Contact securitate
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Pentru raportarea vulnerabilităților:</strong><br />
                <a href="mailto:security@luxbid.ro" style={{ color: '#D09A1E' }}>security@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Pentru întrebări generale de securitate:</strong><br />
                <a href="mailto:info@luxbid.ro" style={{ color: '#D09A1E' }}>info@luxbid.ro</a>
              </p>
              <p style={{ margin: '0' }}>
                <strong>Telefon urgent (24/7):</strong> +40 21 XXX XXXX
              </p>
            </div>
          </div>

          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '24px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#064e3b',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Securitatea este o responsabilitate comună. Împreună construim cea mai sigură 
              platformă pentru tranzacții cu obiecte de lux din România.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
