'use client'
import React from 'react'

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '40px 20px', background: '#fafafa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Cum Funcționează LuxBid?
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Ghidul complet pentru a înțelege cum să folosești platforma LuxBid pentru a vinde și cumpăra obiecte de lux în siguranță.
          </p>
        </div>

        {/* For Sellers */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          marginBottom: '60px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Pentru Vânzători
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Creează Contul
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Înregistrează-te gratuit ca persoană fizică sau juridică. Completează profilul cu datele de facturare pentru a fi gata să vinzi.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Publică Anunțul
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Adaugă fotografii de calitate, descriere detaliată, preț și toate detaliile importante. Cu cât mai multe informații, cu atât mai multe oferte.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Primești Oferte
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Cumpărătorii interesați îți vor trimite oferte prin platformă. Poți să comunici direct cu ei prin chat pentru detalii suplimentare.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                4
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Acceptă Oferta
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Când primești o ofertă care îți convine, o accepți. Toate celelalte oferte se vor respinge automat.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                5
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Finalizează Vânzarea
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Coordonează cu cumpărătorul livrarea sau ridicarea obiectului. După finalizare, plătești comisionul LuxBid (3% din suma vânzării).
              </p>
            </div>
          </div>
        </div>

        {/* For Buyers */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          marginBottom: '60px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Pentru Cumpărători
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Explorează Ofertele
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Navighează prin mii de obiecte de lux autentice. Filtrează după brand, categorie, preț sau locație pentru a găsi exact ce cauți.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Creează Contul
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Înregistrează-te gratuit pentru a putea face oferte și să comunici cu vânzătorii. Procesul este rapid și simplu.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Fă Oferta
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Vezi un obiect care îți place? Fă o ofertă cu suma dorită și un mesaj opțional. Vânzătorul va fi notificat imediat.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                4
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Comunică Direct
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Folosește chat-ul integrat pentru a discuta detalii, să întrebi întrebări sau să negociezi condițiile de livrare.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px',
                fontSize: '40px',
                color: '#fff',
                fontWeight: '700'
              }}>
                5
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
                Finalizează Cumpărarea
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                Când oferta ta este acceptată, coordonează cu vânzătorul livrarea sau ridicarea obiectului. Nu plătești comisioane LuxBid.
              </p>
            </div>
          </div>
        </div>

        {/* Safety & Security */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          marginBottom: '60px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Siguranță și Protecție
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Verificare Utilizatori
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Toți utilizatorii sunt verificați și au profiluri complete cu date de contact reale.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                💬
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Comunicare Sigură
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Chat-ul este monitorizat pentru a preveni fraudul și pentru a asigura comunicarea civilizată.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                📞
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Suport 24/7
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Echipa noastră este disponibilă pentru a te ajuta cu orice problemă sau întrebare.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                🔒
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Date Protejate
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Toate datele tale sunt criptate și protejate conform standardelor GDPR.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          marginBottom: '60px',
          color: '#fff'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Sfaturi pentru Succes
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
                Pentru Vânzători
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>📸</span>
                  <span>Fotografii de calitate înaltă din mai multe unghiuri</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>📝</span>
                  <span>Descriere detaliată cu toate specificațiile</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>💰</span>
                  <span>Preț realist bazat pe piață</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>⚡</span>
                  <span>Răspunde rapid la mesaje și oferte</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
                Pentru Cumpărători
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🔍</span>
                  <span>Verifică cu atenție fotografiile și descrierea</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>💬</span>
                  <span>Întreabă detalii suplimentare prin chat</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🤝</span>
                  <span>Fă oferte rezonabile și respectuoase</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>📱</span>
                  <span>Activează notificările pentru a nu rata oferte</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            marginBottom: '20px' 
          }}>
            Gata să Începi?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#666',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Alătură-te comunității LuxBid și descoperă o nouă modalitate de a vinde și cumpăra obiecte de lux.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              Începe Gratuit
            </button>
            <button style={{
              padding: '16px 32px',
              background: 'transparent',
              color: '#D09A1E',
              border: '2px solid #D09A1E',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}>
              Vezi Ofertele
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
