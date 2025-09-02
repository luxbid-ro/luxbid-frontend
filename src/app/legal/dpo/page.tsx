import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Protection Officer - LuxBid',
  description: 'Contactați Responsabilul cu Protecția Datelor (DPO) al LuxBid pentru întrebări despre confidențialitate și protecția datelor personale.',
}

export default function DPOPage() {
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
          Data Protection Officer (DPO)
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

        <div style={{ color: '#333', lineHeight: '1.7', fontSize: '16px' }}>
          {/* Introducere */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            1. Despre Data Protection Officer
          </h2>
          <p style={{ marginBottom: '16px' }}>
            În conformitate cu Regulamentul General privind Protecția Datelor (GDPR), LuxBid a desemnat un 
            Data Protection Officer (DPO) - Responsabil cu Protecția Datelor pentru a supraveghea 
            conformitatea cu reglementările de protecție a datelor și pentru a fi punctul de contact 
            pentru toate aspectele legate de confidențialitate.
          </p>

          {/* Contact DPO */}
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
              📧 Contact DPO
            </h3>
            <div style={{ fontSize: '16px' }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Nume:</strong> Ana-Maria Popescu
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Email:</strong> <a href="mailto:dpo@luxbid.ro" style={{ color: '#D09A1E', textDecoration: 'underline' }}>dpo@luxbid.ro</a>
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Telefon:</strong> +40 21 XXX XXXX
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Adresă poștală:</strong> București, Sector 1, România
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>Program:</strong> Luni - Vineri, 09:00 - 17:00
              </p>
            </div>
          </div>

          {/* Responsabilități DPO */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Responsabilitățile DPO
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Supravegherea conformității
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Monitorizarea respectării GDPR și a legislației naționale</li>
            <li>Efectuarea de audituri periodice de protecție a datelor</li>
            <li>Evaluarea impactului asupra protecției datelor (DPIA)</li>
            <li>Colaborarea cu autoritatea de supraveghere (ANSPDCP)</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Consultanță și training
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Oferirea de consiliere cu privire la obligațiile de protecție a datelor</li>
            <li>Formarea personalului în domeniul protecției datelor</li>
            <li>Dezvoltarea de politici și proceduri de confidențialitate</li>
            <li>Gestionarea solicitărilor privind drepturile persoanelor vizate</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.3 Punctul de contact
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Intermediar între LuxBid și autoritățile de supraveghere</li>
            <li>Contact pentru persoanele vizate privind drepturile lor</li>
            <li>Gestionarea reclamațiilor și cererilor legate de protecția datelor</li>
            <li>Coordonarea răspunsului la încălcări de securitate</li>
          </ul>

          {/* Când să contactați DPO */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Când să contactați DPO
          </h2>

          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
              📞 Contactați DPO pentru:
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#0c5460' }}>
              <li>Exercitarea drepturilor GDPR (acces, rectificare, ștergere, etc.)</li>
              <li>Întrebări despre prelucrarea datelor personale</li>
              <li>Reclamații privind confidențialitatea</li>
              <li>Raportarea incidentelor de securitate</li>
              <li>Solicitări de informații despre politicile noastre</li>
              <li>Retragerea consimțământului pentru prelucrarea datelor</li>
            </ul>
          </div>

          {/* Drepturile persoanelor vizate */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Drepturile dvs. GDPR
          </h2>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            {[
              {
                title: 'Dreptul de acces',
                desc: 'Puteți solicita o copie a datelor personale pe care le deținem despre dvs.'
              },
              {
                title: '✏️ Dreptul la rectificare',
                desc: 'Puteți cere corectarea datelor inexacte sau completarea celor incomplete.'
              },
              {
                title: '🗑️ Dreptul la ștergere',
                desc: 'Puteți solicita ștergerea datelor personale în anumite circumstanțe.'
              },
              {
                title: '⏸️ Dreptul la restricționare',
                desc: 'Puteți cere limitarea prelucrării datelor în situații specifice.'
              },
              {
                title: '📤 Dreptul la portabilitate',
                desc: 'Puteți primi datele în format structurat pentru transfer către alt furnizor.'
              },
              {
                title: '🚫 Dreptul de opoziție',
                desc: 'Puteți vă opune prelucrării bazate pe interesul legitim.'
              }
            ].map((right, index) => (
              <div key={index} style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#D09A1E' }}>
                  {right.title}
                </h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  {right.desc}
                </p>
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
            5. Procesul de soluționare
          </h2>

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#856404' }}>
              ⏱️ Timp de răspuns
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#856404' }}>
              <li><strong>Confirmarea primirii:</strong> Maximum 48 de ore</li>
              <li><strong>Răspuns complet:</strong> Maximum 30 de zile calendar</li>
              <li><strong>Cazuri complexe:</strong> Extensie de 60 de zile (cu notificare)</li>
              <li><strong>Situații urgente:</strong> Răspuns în aceeași zi lucrătoare</li>
            </ul>
          </div>

          {/* Contact alternativ */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Contact alternativ și escaladare
          </h2>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}>
              📞 Contact general LuxBid
            </h4>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Email:</strong> <a href="mailto:contact@luxbid.ro" style={{ color: '#D09A1E' }}>contact@luxbid.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Telefon:</strong> +40 21 XXX XXXX
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}>
              🏛️ Autoritatea Națională (ANSPDCP)
            </h4>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Site:</strong> <a href="https://dataprotection.ro" target="_blank" style={{ color: '#D09A1E' }}>dataprotection.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Email:</strong> <a href="mailto:anspdcp@dataprotection.ro" style={{ color: '#D09A1E' }}>anspdcp@dataprotection.ro</a>
            </p>
            <p style={{ margin: '0 0 0 0' }}>
              <strong>Telefon:</strong> +40 21 252 5599
            </p>
          </div>

          {/* Notă finală */}
          <div style={{
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#155724' }}>
              <strong>💡 Notă importantă:</strong> DPO-ul nostru este independent și 
              poate fi contactat direct, fără a trece prin alte departamente. 
              Confidențialitatea comunicării cu DPO este garantată.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
