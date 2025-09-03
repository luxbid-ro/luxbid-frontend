import React from 'react'

export const metadata = {
  title: 'Procedura DMCA - LuxBid',
  description: 'Procedura DMCA pentru raportarea încălcărilor drepturilor de autor pe platforma LuxBid. Instrucțiuni complete pentru notificări.',
}

export default function DMCAPage() {
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
          Procedura DMCA
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
            1. Despre DMCA
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Digital Millennium Copyright Act (DMCA) este o legislație americană care oferă un cadru pentru 
            raportarea și eliminarea conținutului care încalcă drepturile de autor. LuxBid respectă DMCA 
            și răspunde prompt la notificările valide de încălcare a drepturilor de autor.
          </p>

          <div style={{
            background: '#f8f9fa',
            border: '2px solid #D09A1E',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
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
              Agent DMCA Desemnat
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Nume:</strong> Maria Ionescu
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Email:</strong> <a href="mailto:dmca@luxbid.ro" style={{ color: '#D09A1E', textDecoration: 'underline' }}>dmca@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Telefon:</strong> +40 21 XXX XXXX
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Adresă:</strong> București, Sector 1, România
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>Program:</strong> Luni - Vineri, 09:00 - 17:00
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Cum să depui o notificare DMCA
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Informații necesare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Pentru a depune o notificare DMCA validă, trebuie să incluzi următoarele informații:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Identificarea operei protejate prin drepturi de autor</li>
            <li>Identificarea materialului care încalcă drepturile</li>
            <li>Informații de contact (nume, adresă, telefon, email)</li>
            <li>Declarația de bună credință</li>
            <li>Declarația de acuratețe</li>
            <li>Semnătura fizică sau electronică</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Format notificare
          </h3>
          
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <strong>NOTIFICARE DMCA</strong><br /><br />
            
            <strong>1. Identificarea operei protejate:</strong><br />
            [Descrie opera protejată prin drepturi de autor]<br /><br />
            
            <strong>2. Identificarea materialului care încalcă:</strong><br />
            URL: [Link către listarea/conținutul problematic]<br />
            Descriere: [Explică cum încalcă drepturile]<br /><br />
            
            <strong>3. Informații de contact:</strong><br />
            Nume: [Numele complet]<br />
            Adresă: [Adresa completă]<br />
            Telefon: [Număr de telefon]<br />
            Email: [Adresa de email]<br /><br />
            
            <strong>4. Declarația de bună credință:</strong><br />
            &quot;Am o bună credință că utilizarea materialului în cauză nu este autorizată 
            de către proprietarul drepturilor de autor, agentul său sau legea.&quot;<br /><br />
            
            <strong>5. Declarația de acuratețe:</strong><br />
            &quot;Informațiile din această notificare sunt corecte și, sub sancțiunea 
            sperjurului, sunt proprietarul drepturilor exclusive sau sunt autorizat să 
            acționez în numele proprietarului.&quot;<br /><br />
            
            <strong>6. Semnătura:</strong><br />
            [Semnătura fizică sau electronică]<br />
            Data: [Data notificării]
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Procesul nostru de răspuns
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 Timpul de răspuns
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Confirmarea primirii:</strong> Maximum 24 de ore</li>
            <li><strong>Evaluarea inițială:</strong> 1-3 zile lucrătoare</li>
            <li><strong>Acțiune (dacă e necesară):</strong> Maximum 7 zile lucrătoare</li>
            <li><strong>Notificarea părților:</strong> În termen de 24 ore de la acțiune</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 Acțiuni posibile
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Eliminarea conținutului:</strong> Ștergerea listării problematice</li>
            <li><strong>Suspendarea temporară:</strong> Dezactivarea contului utilizatorului</li>
            <li><strong>Avertisment:</strong> Notificare către utilizator</li>
            <li><strong>Respingerea:</strong> Dacă notificarea nu este validă</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Counter-Notification (Contestarea)
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Dacă crezi că conținutul tău a fost eliminat prin eroare, poți depune o counter-notification 
            care trebuie să includă:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Identificarea materialului eliminat</li>
            <li>Declarația sub sancțiunea sperjurului că eliminarea a fost o eroare</li>
            <li>Consimțământul la jurisdicția instanțelor</li>
            <li>Informații de contact complete</li>
            <li>Semnătura fizică sau electronică</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Politica de repeat infringer
          </h2>
          <p style={{ marginBottom: '16px' }}>
            LuxBid are o politică de toleranță zero pentru încălcările repetate:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Prima încălcare:</strong> Avertisment și eliminarea conținutului</li>
            <li><strong>A doua încălcare:</strong> Suspendare temporară (30 zile)</li>
            <li><strong>A treia încălcare:</strong> Suspendare permanentă a contului</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Prevenirea încălcărilor
          </h2>
          
          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Consiliere pentru utilizatori
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c5460' }}>
              <li>Nu încărca imagini de pe internet fără permisiune</li>
              <li>Folosește doar fotografii proprii ale obiectelor</li>
              <li>Nu copia descrieri de pe alte site-uri</li>
              <li>Respectă mărcile comerciale în titluri și descrieri</li>
              <li>Când ai dubii, contactează echipa noastră</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            7. Informații de contact
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Pentru notificări DMCA sau întrebări despre drepturile de autor:
          </p>
          
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Email prioritar:</strong> <a href="mailto:dmca@luxbid.ro" style={{ color: '#D09A1E' }}>dmca@luxbid.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Email secundar:</strong> <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Telefon:</strong> +40 21 XXX XXXX
            </p>
            <p style={{ margin: '0 0 0 0' }}>
              <strong>Adresă poștală:</strong> LuxBid SRL, București, Sector 1, România
            </p>
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
              color: '#856404'
            }}>
              <strong>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Atenție:
              </strong> Depunerea unei notificări DMCA false poate avea consecințe legale. 
              Asigură-te că ai drepturile asupra conținutului înainte de a face o reclamație.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
