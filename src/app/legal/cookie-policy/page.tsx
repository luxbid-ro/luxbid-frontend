import React from 'react'

export const metadata = {
  title: 'Politica Cookie-uri - LuxBid',
  description: 'Politica de utilizare a cookie-urilor pe platforma LuxBid. Informații despre tipurile de cookie-uri folosite și drepturile utilizatorilor.',
}

export default function CookiePolicyPage() {
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
          Politica Cookie-uri
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
          
          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Ce sunt cookie-urile?
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Cookie-urile sunt fișiere mici de text care sunt stocate pe dispozitivul dvs. atunci când vizitați un site web. 
            Acestea ne ajută să vă oferim o experiență mai bună, să ne amintim preferințele dvs. și să înțelegem 
            cum utilizați platforma noastră.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Tipuri de cookie-uri folosite
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            1. Cookie-uri necesare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului și nu pot fi dezactivate. 
            Ele includ:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Cookie-uri de sesiune pentru autentificare</li>
            <li>Cookie-uri pentru securitate și prevenirea fraudei</li>
            <li>Cookie-uri pentru funcționarea coșului de cumpărături</li>
            <li>Cookie-uri pentru preferințele de limbă</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            2. Cookie-uri funcționale
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Acestea îmbunătățesc funcționalitatea site-ului și permit personalizarea experienței:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Salvarea preferințelor de afișare</li>
            <li>Memorarea filtrelor de căutare</li>
            <li>Personalizarea layout-ului</li>
            <li>Salvarea preferințelor de notificări</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3. Cookie-uri de analiză
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Ne ajută să înțelegem cum este folosit site-ul pentru a-l îmbunătăți:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Numărul de vizitatori și paginile vizitate</li>
            <li>Timpul petrecut pe site</li>
            <li>Analiza traficului și a comportamentului utilizatorilor</li>
            <li>Identificarea problemelor tehnice</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4. Cookie-uri de marketing
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Folosite pentru a vă oferi anunțuri relevante și pentru măsurarea eficacității campaniilor:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Personalizarea anunțurilor</li>
            <li>Tracking pentru conversii</li>
            <li>Remarketing și retargeting</li>
            <li>Analiza performanței publicitare</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Cookie-uri de la terți
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Pe site-ul nostru pot exista cookie-uri setate de servicii terțe, cum ar fi:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Google Analytics:</strong> Pentru analiza traficului</li>
            <li><strong>CloudFlare:</strong> Pentru securitate și performanță</li>
            <li><strong>Cloudinary:</strong> Pentru optimizarea imaginilor</li>
            <li><strong>Font providers:</strong> Pentru încărcarea fonturilor</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Cum să gestionezi cookie-urile
          </h2>
          
          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            Prin banner-ul nostru
          </h3>
          <p style={{ marginBottom: '16px' }}>
            La prima vizită, veți vedea un banner cu opțiuni pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Acceptarea tuturor cookie-urilor</li>
            <li>Acceptarea doar a celor necesare</li>
            <li>Personalizarea preferințelor</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            Prin browser
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți gestiona cookie-urile prin setările browser-ului:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
            <li><strong>Firefox:</strong> Opțiuni → Confidențialitate și securitate</li>
            <li><strong>Safari:</strong> Preferințe → Confidențialitate</li>
            <li><strong>Edge:</strong> Setări → Cookie-uri și permisiuni site</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Perioada de stocare
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Cookie-urile au perioade diferite de stocare:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Session cookies:</strong> Se șterg când închideți browser-ul</li>
            <li><strong>Cookie-uri persistente:</strong> Rămân până la 2 ani sau până la ștergerea manuală</li>
            <li><strong>Cookie-uri de securitate:</strong> 24 ore pentru prevenirea atacurilor</li>
            <li><strong>Cookie-uri de preferințe:</strong> 1 an pentru a vă aminti alegerile</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Drepturile dvs.
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Conform GDPR, aveți următoarele drepturi:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Dreptul de a fi informat despre folosirea cookie-urilor</li>
            <li>Dreptul de a vă da sau retrage consimțământul</li>
            <li>Dreptul de a accesa datele colectate prin cookie-uri</li>
            <li>Dreptul de a șterge cookie-urile și datele asociate</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            Contact
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Pentru întrebări despre politica de cookie-uri, ne puteți contacta:
          </p>
          <ul style={{ marginBottom: '32px', paddingLeft: '20px' }}>
            <li><strong>Email:</strong> dpo@luxbid.ro</li>
            <li><strong>Adresă:</strong> București, România</li>
            <li><strong>Telefon:</strong> +40 XXX XXX XXX</li>
          </ul>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              <strong>Notă:</strong> Această politică de cookie-uri poate fi actualizată periodic pentru a reflecta 
              modificările în practicile noastre sau în cerințele legale. Vă recomandăm să verificați această 
              pagină din când în când.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
