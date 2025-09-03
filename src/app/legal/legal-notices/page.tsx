import React from 'react'

export const metadata = {
  title: 'Mențiuni Legale - LuxBid',
  description: 'Mențiuni legale și informații despre societatea LuxBid SRL. Date de contact, licențe și conformitate.',
}

export default function LegalNoticesPage() {
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
          Mențiuni Legale
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
            1. Informații despre societate
          </h2>

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
              🏢 LuxBid SRL
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Denumirea completă:</strong> LuxBid Societate cu Răspundere Limitată
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>CUI:</strong> RO XXXXXXXX (în curs de înregistrare)
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Nr. de înregistrare:</strong> J40/XXXX/2025
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Sediul social:</strong> București, Sector 1, România
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Capital social:</strong> XXX.XXX RON
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Domeniul de activitate:</strong> Servicii de intermediere online pentru obiecte de lux
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>TVA:</strong> RO XXXXXXXX
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Informații de contact
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#0369a1', fontSize: '18px' }}>
                📧 Contact General
              </h4>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Email principal:</strong><br />
                <a href="mailto:contact@luxbid.ro" style={{ color: '#D09A1E' }}>contact@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Telefon:</strong><br />
                +40 21 XXX XXXX
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>Program:</strong><br />
                Luni - Vineri: 09:00 - 18:00<br />
                Sâmbătă: 10:00 - 14:00
              </p>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #22c55e',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#15803d', fontSize: '18px' }}>
                ⚖️ Contact Legal
              </h4>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Email legal:</strong><br />
                <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>DPO:</strong><br />
                <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E' }}>dpo@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>DMCA:</strong><br />
                <a href="mailto:dmca@luxbid.ro" style={{ color: '#D09A1E' }}>dmca@luxbid.ro</a>
              </p>
            </div>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Informații despre site
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 Găzduire și infrastructură
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Furnizor găzduire:</strong> Render.com (Cloud Infrastructure)</li>
            <li><strong>CDN:</strong> Cloudflare</li>
            <li><strong>Backup date:</strong> Zilnic, păstrate 30 zile</li>
            <li><strong>Certificat SSL:</strong> Let's Encrypt (renewed automat)</li>
            <li><strong>Monitorizare:</strong> 24/7 monitoring și alerting</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 Tehnologii utilizate
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Frontend:</strong> Next.js 15, React, TypeScript</li>
            <li><strong>Backend:</strong> Node.js, NestJS, Prisma ORM</li>
            <li><strong>Baza de date:</strong> PostgreSQL</li>
            <li><strong>Stocare imagini:</strong> Cloudinary</li>
            <li><strong>Email:</strong> Google Workspace SMTP</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Drepturi de proprietate intelectuală
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.1 Marca LuxBid
          </h3>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#92400e' }}>
              © Marca înregistrată
            </p>
            <p style={{ margin: '0', color: '#92400e' }}>
              Marca "LuxBid" și logourile asociate sunt proprietatea exclusivă a LuxBid SRL. 
              Utilizarea neautorizată este interzisă și poate atrage răspunderea legală.
            </p>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.2 Conținut platform
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Toate elementele platformei sunt protejate prin drepturi de autor:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Design și interfața utilizator</li>
            <li>Codul sursă și algoritmii</li>
            <li>Textele și materialele informative</li>
            <li>Structura bazei de date</li>
            <li>Funcționalitățile unice</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            4.3 Conținut utilizatori
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Utilizatorii păstrează drepturile asupra conținutului încărcat, dar acordă LuxBid:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Licență non-exclusivă de afișare pe platformă</li>
            <li>Dreptul de moderare și editare pentru conformitate</li>
            <li>Licența de arhivare pentru scopuri legale</li>
            <li>Dreptul de utilizare în materiale promoționale (cu acordul)</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Licențe și certificate
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.1 Autorizații de funcționare
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Licența de comerț electronic:</strong> În curs de obținere</li>
            <li><strong>Autorizație GDPR:</strong> Conformitate completă</li>
            <li><strong>Certificare securitate:</strong> SSL/TLS</li>
            <li><strong>Conformitate DSA:</strong> Implementat conform EU</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            5.2 Licențe software
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Utilizăm exclusiv software cu licențe legale:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Framework-uri open source (MIT, Apache 2.0)</li>
            <li>Servicii cloud cu contracte comerciale valide</li>
            <li>Biblioteci de cod cu licențe compatibile</li>
            <li>Fonturi cu licențe comerciale sau open source</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Responsabilitate socială
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.1 Sustenabilitate
          </h3>
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#059669' }}>
              🌱 Angajament pentru mediu
            </p>
            <p style={{ margin: '0', color: '#064e3b' }}>
              Prin promovarea revânzării obiectelor de lux, contribuim la economia circulară 
              și reducerea deșeurilor. Utilizăm infrastructură cloud verde și măsuri de 
              eficiență energetică.
            </p>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            6.2 Combaterea fraudei
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Colaborăm activ cu autoritățile pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Prevenirea vânzării de obiecte furate</li>
            <li>Combaterea contrafacerii</li>
            <li>Raportarea activităților suspecte</li>
            <li>Educarea utilizatorilor despre riscuri</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            7. Proceduri de reclamații
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            7.1 Canal de reclamații
          </h3>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600' }}>
              📝 Procedura de reclamații
            </p>
            <ol style={{ margin: '0', paddingLeft: '20px' }}>
              <li><strong>Transmitere:</strong> Email la complaints@luxbid.ro</li>
              <li><strong>Confirmare:</strong> Răspuns automat în 24h</li>
              <li><strong>Investigație:</strong> Analiză în 3-5 zile lucrătoare</li>
              <li><strong>Rezoluție:</strong> Răspuns final în maximum 15 zile</li>
              <li><strong>Escaladare:</strong> Instanțele competente dacă e necesar</li>
            </ol>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            7.2 Mediere și arbitraj
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Pentru disputele complexe, oferim:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Servicii de mediere prin parteneri certificați</li>
            <li>Arbitraj commercial prin Camera de Comerț București</li>
            <li>Proceduri ADR conform reglementărilor UE</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            8. Actualizări și modificări
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Aceste mențiuni legale pot fi actualizate pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Conformitatea cu noile reglementări</li>
            <li>Modificări în structura societății</li>
            <li>Îmbunătățiri ale serviciilor</li>
            <li>Actualizări tehnologice</li>
          </ul>

          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#0369a1' }}>
              📮 Notificări despre modificări
            </p>
            <p style={{ margin: '0', color: '#0369a1' }}>
              Modificările importante vor fi comunicate utilizatorilor prin email și 
              afișate pe site cu minimum 30 zile înainte de intrarea în vigoare.
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '18px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> Contact pentru mențiuni legale
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              Email: <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              Telefon: +40 21 XXX XXXX
            </p>
            <p style={{ margin: '0' }}>
              Program: Luni - Vineri, 09:00 - 17:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
