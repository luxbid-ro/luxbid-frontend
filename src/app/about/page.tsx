'use client'

import React from 'react'

export default function AboutPage() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '60px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '60px 40px',
        borderRadius: '16px'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8831A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          <span style={{ color: '#D09A1E' }}>Lux</span><span style={{ color: '#111' }}>Bid</span>
        </h1>
        <p style={{ 
          fontSize: '24px', 
          color: '#666', 
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Marketplace-ul premium pentru obiectele de lux din România
        </p>
      </div>

      {/* Our Story */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '36px', 
          marginBottom: '30px', 
          color: '#111',
          textAlign: 'center'
        }}>
          Povestea Noastră
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              color: '#555',
              marginBottom: '20px'
            }}>
              <strong>LuxBid</strong> a fost creată din pasiunea pentru obiectele de lux autentice și dorința de a oferi o platformă sigură și de încredere pentru colecționarii și iubitorii de bunuri premium din România.
            </p>
            <p style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              color: '#555'
            }}>
              Înțelegem valoarea investiției în piese de calitate superioară și ne-am dedicat să construim cel mai sigur mediu online pentru tranzacționarea acestora.
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #D09A1E 0%, #B8831A 100%)',
            borderRadius: '16px',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Misiunea Noastră</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: '0.9' }}>
              Să democratizăm accesul la obiectele de lux autentice și să creăm o comunitate de pasionați care să poată colecționa, vinde și descoperí piese unice în siguranță.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '36px', 
          marginBottom: '40px', 
          color: '#111',
          textAlign: 'center'
        }}>
          Ce Oferim
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              ),
              title: 'Ceasuri de Lux',
              description: 'Rolex, Patek Philippe, Audemars Piguet și multe alte branduri prestigioase'
            },
            {
              icon: '👜',
              title: 'Genți Designer',
              description: 'Hermès, Chanel, Louis Vuitton - autenticitate garantată'
            },
            {
              icon: '💎',
              title: 'Bijuterii Premium',
              description: 'Piese unice de la designeri renumiti și case de bijuterii'
            },
            {
              icon: '🔒',
              title: 'Siguranță Maximă',
              description: 'Verificarea autenticității și tranzacții protejate'
            },
            {
              icon: '🤝',
              title: 'Expertiză',
              description: 'Echipă de specialiști pentru evaluare și consultanță'
            },
            {
              icon: '📱',
              title: 'Experiență Modernă',
              description: 'Platformă intuitivă adaptată pentru toate dispozitivele'
            }
          ].map((item, index) => (
            <div key={index} style={{
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ 
                fontSize: '20px', 
                marginBottom: '15px', 
                color: '#111',
                fontWeight: '600'
              }}>
                {item.title}
              </h3>
              <p style={{ 
                fontSize: '16px', 
                color: '#666', 
                lineHeight: '1.6'
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '16px',
          padding: '50px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            marginBottom: '40px', 
            color: '#111'
          }}>
            Valorile Noastre
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px'
          }}>
            <div>
              <h3 style={{ color: '#D09A1E', fontSize: '20px', marginBottom: '15px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                Autenticitate
              </h3>
              <p style={{ color: '#666' }}>Fiecare obiect este verificat de experți</p>
            </div>
            <div>
              <h3 style={{ color: '#D09A1E', fontSize: '20px', marginBottom: '15px' }}>🛡️ Încredere</h3>
              <p style={{ color: '#666' }}>Tranzacții sigure și protejate</p>
            </div>
            <div>
              <h3 style={{ color: '#D09A1E', fontSize: '20px', marginBottom: '15px' }}>🌟 Excelență</h3>
              <p style={{ color: '#666' }}>Standard înalt de calitate în tot ce facem</p>
            </div>
            <div>
              <h3 style={{ color: '#D09A1E', fontSize: '20px', marginBottom: '15px' }}>🤝 Respect</h3>
              <p style={{ color: '#666' }}>Tratăm fiecare client ca un partener</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '32px', 
          marginBottom: '20px', 
          color: '#111'
        }}>
          Alătură-te Comunității LuxBid
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto 30px auto'
        }}>
          Descoperă, colecționează și vinde obiectele de lux pe care le iubești într-un mediu sigur și profesional.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="/oferte" 
            style={{
              background: '#D09A1E',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'background 0.2s ease'
            }}
          >
            Explorează Ofertele
          </a>
          <a 
            href="/dashboard/add-listing" 
            style={{
              background: 'transparent',
              color: '#D09A1E',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '2px solid #D09A1E',
              transition: 'all 0.2s ease'
            }}
          >
            Vinde un Obiect
          </a>
        </div>
      </section>
    </div>
  )
}
