'use client'
import React from 'react'

export default function PressPage() {
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
            Presa Despre LuxBid
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Descoperă cum media și industria de lux din România văd platforma LuxBid și impactul său asupra pieței de obiecte de lux.
          </p>
        </div>

        {/* Press Coverage */}
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
            Articole Recente
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '40px' 
          }}>
            {/* Article 1 */}
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '15px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                Forbes România
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                  "LuxBid: Revoluția Digitală în Piața de Lux Românească"
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  "Platforma LuxBid transformă modul în care românii vând și cumpără obiecte de lux, 
                  oferind o alternativă sigură și transparentă la piețele tradiționale."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#D09A1E', fontWeight: '600' }}>15 Martie 2024</span>
                  <button style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: '#D09A1E',
                    border: '1px solid #D09A1E',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Citește mai mult
                  </button>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '15px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                Ziarul Financiar
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                  "Startup-ul Românesc Care Vrea să Democratizeze Luxul"
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  "Cu peste 2.5 milioane de euro în tranzacții în primul an, LuxBid demonstrează 
                  că piața de lux din România este gata pentru digitalizare."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#28a745', fontWeight: '600' }}>8 Martie 2024</span>
                  <button style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: '#28a745',
                    border: '1px solid #28a745',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Citește mai mult
                  </button>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '15px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                StartupCafe
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                  "LuxBid: De la Idee la 15.000+ Obiecte Listate în 12 Luni"
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  "Interviu exclusiv cu fondatorii LuxBid despre provocările construirii unei platforme 
                  de lux în România și planurile de expansiune regională."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6f42c1', fontWeight: '600' }}>22 Februarie 2024</span>
                  <button style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: '#6f42c1',
                    border: '1px solid #6f42c1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Citește mai mult
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Mentions */}
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
            Mențiuni în Media
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                Forbes România
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                Ziarul Financiar
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                StartupCafe
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                Business Review
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                Capital
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                height: '80px',
                background: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#666'
              }}>
                TechCrunch
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
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
            Premii și Recunoașteri
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              borderRadius: '15px',
              color: '#fff'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                🏆
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
                Startup of the Year 2024
              </h3>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Romanian Startup Awards
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '15px',
              color: '#fff'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                🥇
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
                Best E-commerce Platform
              </h3>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Digital Excellence Awards
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
              borderRadius: '15px',
              color: '#fff'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                ⭐
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
                Innovation in Luxury
              </h3>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                Luxury Business Awards
              </p>
            </div>
          </div>
        </div>

        {/* Press Kit */}
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
            Press Kit
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px' 
          }}>
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                📸
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Imagini de Brand
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Logo-uri, imagini de produs și materiale vizuale pentru articole
              </p>
              <button style={{
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Descarcă
              </button>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                📊
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Statistici Platformă
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Date actualizate despre utilizatori, tranzacții și creștere
              </p>
              <button style={{
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Descarcă
              </button>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                👥
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Echipa Fondatoare
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Biografii și fotografii ale echipei de conducere
              </p>
              <button style={{
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Descarcă
              </button>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                📝
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Comunicat de Presă
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Ultimele comunicate și anunțuri importante
              </p>
              <button style={{
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Descarcă
              </button>
            </div>
          </div>
        </div>

        {/* Contact Press */}
        <div style={{ 
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)', 
          borderRadius: '20px', 
          padding: '60px 40px', 
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            marginBottom: '20px' 
          }}>
            Contact Presă
          </h2>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px', 
            opacity: 0.9 
          }}>
            Pentru întrebări despre LuxBid, interviuri sau materiale de presă, 
            contactează echipa noastră de comunicare.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '16px 32px',
              background: '#fff',
              color: '#D09A1E',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              Contactează Presa
            </button>
            <button style={{
              padding: '16px 32px',
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}>
              Programează Interviu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
