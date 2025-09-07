import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Cum Funcționează LuxBid | Ghid Complet pentru Vânzători și Cumpărători',
  description: 'Învață cum să folosești LuxBid pentru vânzarea și cumpărarea obiectelor de lux. Ghid pas cu pas pentru vânzători și cumpărători cu sfaturi de siguranță.',
  keywords: 'cum funcționează LuxBid, ghid vânzare obiecte de lux, tutorial marketplace, sfaturi siguranță tranzacții',
  openGraph: {
    title: 'Cum Funcționează LuxBid | Ghid Complet',
    description: 'Ghid pas cu pas pentru vânzarea și cumpărarea obiectelor de lux pe LuxBid',
    type: 'website',
    url: 'https://luxbid.ro/how-it-works',
  },
  alternates: {
    canonical: 'https://luxbid.ro/how-it-works',
  }
}

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #D09A1E 0%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Cum Funcționează LuxBid
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#ccc', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ghidul complet pentru vânzarea și cumpărarea obiectelor de lux pe platforma noastră premium
          </p>
        </div>
      </section>

      {/* Navigation */}
      <div style={{ 
        background: '#fff', 
        padding: '20px 0', 
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: '0',
        zIndex: '100'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pentru-vanzatori" style={{ 
              color: '#D09A1E', 
              textDecoration: 'none', 
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '25px',
              background: 'rgba(208, 154, 30, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              Pentru Vânzători
            </a>
            <a href="#pentru-cumparatori" style={{ 
              color: '#D09A1E', 
              textDecoration: 'none', 
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '25px',
              background: 'rgba(208, 154, 30, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              Pentru Cumpărători
            </a>
            <a href="#siguranta" style={{ 
              color: '#D09A1E', 
              textDecoration: 'none', 
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '25px',
              background: 'rgba(208, 154, 30, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              Siguranță
            </a>
            <a href="#sfaturi" style={{ 
              color: '#D09A1E', 
              textDecoration: 'none', 
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '25px',
              background: 'rgba(208, 154, 30, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              Sfaturi de Succes
            </a>
          </div>
        </div>
      </div>

      {/* Pentru Vânzători */}
      <section id="pentru-vanzatori" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            🏪 Pentru Vânzători
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Pasul 1 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>📝</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 1: Creează Anunțul
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Completează formularul cu detalii precise</li>
                <li>Încarcă fotografii de calitate profesională</li>
                <li>Stabilește prețul realist și competitiv</li>
                <li>Adaugă descriere detaliată și onestă</li>
                <li>Selectează categoria și brandul corect</li>
              </ul>
            </div>

            {/* Pasul 2 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>📢</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 2: Publică și Promovează
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Anunțul devine vizibil instantaneu</li>
                <li>Apare în rezultatele de căutare</li>
                <li>Primești notificări pentru oferte</li>
                <li>Poți edita și actualiza oricând</li>
                <li>Acces la analytics de performanță</li>
              </ul>
            </div>

            {/* Pasul 3 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>💰</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 3: Gestionează Ofertele
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Primești notificări pentru toate ofertele</li>
                <li>Poți accepta, respinge sau negocia</li>
                <li>Chat privat cu cumpărătorii interesați</li>
                <li>Istoric complet al negocierilor</li>
                <li>Protecție împotriva spam-ului</li>
              </ul>
            </div>

            {/* Pasul 4 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>🤝</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 4: Finalizează Vânzarea
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Coordonare întâlnire sau livrare</li>
                <li>Verificare autenticitate și calitate</li>
                <li>Transfer proprietate și plată</li>
                <li>Confirmare tranzacție pe platformă</li>
                <li>Plata comisionului (doar la vânzare)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pentru Cumpărători */}
      <section id="pentru-cumparatori" style={{ 
        background: '#f8f9fa', 
        padding: '80px 20px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            🛍️ Pentru Cumpărători
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Pasul 1 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>🔍</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 1: Caută și Descoperă
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Folosește filtrele avansate de căutare</li>
                <li>Filtrează după preț, brand, locație</li>
                <li>Salvează anunțurile favorite</li>
                <li>Configurează alertă de preț</li>
                <li>Explorează categorii specializate</li>
              </ul>
            </div>

            {/* Pasul 2 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>📋</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 2: Analizează Detaliile
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Studiază fotografiile cu atenție</li>
                <li>Citește descrierea completă</li>
                <li>Verifică informațiile vânzătorului</li>
                <li>Analizează prețul de piață</li>
                <li>Verifică autenticitatea</li>
              </ul>
            </div>

            {/* Pasul 3 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>💬</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 3: Trimite Oferta
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Completează formularul de ofertă</li>
                <li>Adaugă mesaj personalizat</li>
                <li>Stabilește suma dorită</li>
                <li>Primești confirmare instantanee</li>
                <li>Urmărești statusul ofertei</li>
              </ul>
            </div>

            {/* Pasul 4 */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>✅</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Pasul 4: Finalizează Cumpărarea
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Chat privat cu vânzătorul</li>
                <li>Coordonare întâlnire sau livrare</li>
                <li>Verificare obiect înainte de plată</li>
                <li>Transfer proprietate sigur</li>
                <li>Confirmare tranzacție</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Siguranță */}
      <section id="siguranta" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            🛡️ Siguranță și Protecție
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Verificare Identitate */}
            <div style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '2px solid #D09A1E'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>🆔</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Verificare Identitate
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>KYC pentru utilizatori premium</li>
                <li>Verificare documente oficiale</li>
                <li>Badge de credibilitate</li>
                <li>Protecție împotriva fraudelor</li>
                <li>Monitorizare utilizatori suspecti</li>
              </ul>
            </div>

            {/* Anti-Fraud */}
            <div style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '2px solid #D09A1E'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>🔒</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Sistem Anti-Fraud
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Detectare prețuri suspecte</li>
                <li>Verificare branduri falsificate</li>
                <li>Monitorizare comportament suspect</li>
                <li>Prevenirea fraudelor de plată</li>
                <li>AI pentru detectare automată</li>
              </ul>
            </div>

            {/* Protecție Date */}
            <div style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '2px solid #D09A1E'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>🔐</div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Protecție Date GDPR
              </h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                <li>Conformitate GDPR completă</li>
                <li>Criptare date sensibile</li>
                <li>Dreptul la ștergere</li>
                <li>Export date personale</li>
                <li>Gestionează consimțământul</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sfaturi de Succes */}
      <section id="sfaturi" style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)', 
        color: 'white', 
        padding: '80px 20px' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: 'white', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            💡 Sfaturi de Succes
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px'
          }}>
            {/* Pentru Vânzători */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '30px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#D09A1E', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Pentru Vânzători
              </h3>
              <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
                <li>📸 Fotografii profesionale și multiple</li>
                <li>📝 Descrieri detaliate și oneste</li>
                <li>💰 Prețuri competitive și realiste</li>
                <li>⚡ Răspunde rapid la mesaje</li>
                <li>🔄 Actualizează anunțurile regulat</li>
                <li>⭐ Construiește reputația ta</li>
              </ul>
            </div>

            {/* Pentru Cumpărători */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '30px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#D09A1E', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Pentru Cumpărători
              </h3>
              <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
                <li>🔍 Cercetează vânzătorul</li>
                <li>📋 Verifică autenticitatea</li>
                <li>💬 Comunică clar și profesional</li>
                <li>🤝 Negociază cu respect</li>
                <li>✅ Verifică obiectul înainte de plată</li>
                <li>📄 Păstrează documentele</li>
              </ul>
            </div>

            {/* Siguranță Generală */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '30px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#D09A1E', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Siguranță Generală
              </h3>
              <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
                <li>🏢 Întâlniri în locuri publice</li>
                <li>👥 Adu pe cineva cu tine</li>
                <li>📱 Informează pe cineva</li>
                <li>💳 Evită plățile în numerar</li>
                <li>📸 Documentează tranzacția</li>
                <li>🚨 Raportează comportament suspect</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #D09A1E 0%, #FFD700 100%)', 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '24px' 
          }}>
            Gata să Începi?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Alătură-te comunității LuxBid și descoperă lumea obiectelor de lux
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/dashboard/add-listing" style={{
              background: 'white',
              color: '#D09A1E',
              padding: '16px 32px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              Începe să Vinzi
            </a>
            <a href="/oferte" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.3s ease',
              border: '2px solid white'
            }}>
              Explorează Anunțuri
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}