import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Povești de Succes | LuxBid - Testimoniale și Cazuri Reale',
  description: 'Descoperă poveștile de succes ale utilizatorilor LuxBid. Testimoniale reale, cazuri de studiu și statistici impresionante de vânzări.',
  keywords: 'povești succes LuxBid, testimoniale utilizatori, cazuri studiu marketplace lux, statistici vânzări',
  openGraph: {
    title: 'Povești de Succes | LuxBid',
    description: 'Testimoniale reale și cazuri de studiu ale utilizatorilor LuxBid',
    type: 'website',
    url: 'https://luxbid.ro/success-stories',
  },
  alternates: {
    canonical: 'https://luxbid.ro/success-stories',
  }
}

export default function SuccessStoriesPage() {
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
            Povești de Succes
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Descoperă cum LuxBid a transformat modul în care oamenii vând și cumpără obiecte de lux în România.
          </p>
        </div>

        {/* Featured Success Stories */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '40px', 
          marginBottom: '80px' 
        }}>
          {/* Story 1 */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                👨‍💼
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                Alexandru M.
              </h3>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Vânzător de ceasuri premium
              </p>
            </div>
            
            <blockquote style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#333',
              fontStyle: 'italic',
              marginBottom: '20px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #D09A1E'
            }}>
              "Am vândut peste 15 ceasuri Rolex prin LuxBid în ultimele 6 luni. Platforma mă ajută să găsesc cumpărători serioși și să negociez în siguranță. Comisionul de 3% este foarte rezonabil pentru serviciul oferit."
            </blockquote>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              borderRadius: '12px',
              color: '#fff'
            }}>
              <span style={{ fontWeight: '600' }}>Vânzări totale:</span>
              <span style={{ fontWeight: '700', fontSize: '18px' }}>€45,000</span>
            </div>
          </div>

          {/* Story 2 */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                👩‍💼
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                Maria C.
              </h3>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Cumpărătoare de bijuterii de lux
              </p>
            </div>
            
            <blockquote style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#333',
              fontStyle: 'italic',
              marginBottom: '20px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #28a745'
            }}>
              "Am găsit bijuteriile perfecte pentru nunta mea prin LuxBid. Vânzătorul a fost foarte profesional, am comunicat prin chat și am finalizat tranzacția în siguranță. Recomand cu încredere!"
            </blockquote>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '12px',
              color: '#fff'
            }}>
              <span style={{ fontWeight: '600' }}>Economii realizate:</span>
              <span style={{ fontWeight: '700', fontSize: '18px' }}>€2,500</span>
            </div>
          </div>

          {/* Story 3 */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                🏢
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                LuxStore SRL
              </h3>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Dealer autorizat de genți de lux
              </p>
            </div>
            
            <blockquote style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#333',
              fontStyle: 'italic',
              marginBottom: '20px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #6f42c1'
            }}>
              "Ca dealer autorizat, LuxBid ne-a permis să extindem clientela semnificativ. Bulk listing și comisionul redus de 2% ne-au făcut platforma principală pentru vânzări online."
            </blockquote>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
              borderRadius: '12px',
              color: '#fff'
            }}>
              <span style={{ fontWeight: '600' }}>Crescere vânzări:</span>
              <span style={{ fontWeight: '700', fontSize: '18px' }}>+300%</span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
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
            LuxBid în Cifre
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#D09A1E',
                marginBottom: '10px'
              }}>
                2,500+
              </div>
              <p style={{ fontSize: '18px', color: '#666', fontWeight: '500' }}>
                Utilizatori Activi
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#28a745',
                marginBottom: '10px'
              }}>
                15,000+
              </div>
              <p style={{ fontSize: '18px', color: '#666', fontWeight: '500' }}>
                Obiecte de Lux Listate
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#6f42c1',
                marginBottom: '10px'
              }}>
                €2.5M+
              </div>
              <p style={{ fontSize: '18px', color: '#666', fontWeight: '500' }}>
                Valoare Tranzacții
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#dc3545',
                marginBottom: '10px'
              }}>
                98%
              </div>
              <p style={{ fontSize: '18px', color: '#666', fontWeight: '500' }}>
                Satisfacție Clienți
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
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
            Ce Spun Utilizatorii Noștri
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #D09A1E'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Platforma perfectă pentru obiecte de lux. Interfața este elegantă și ușor de folosit."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#D09A1E',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  R
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Radu P.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Cumpărător</p>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #28a745'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Am vândut prima mea geantă Hermès în doar 3 zile. Comisionul este foarte rezonabil."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#28a745',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  A
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Ana M.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Vânzătoare</p>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #6f42c1'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Suportul client este excepțional. M-au ajutat cu orice întrebare am avut."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#6f42c1',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  C
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Cristian L.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Dealer</p>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #dc3545'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Siguranța tranzacțiilor este prioritatea lor. Mă simt în siguranță să fac oferte mari."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#dc3545',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  M
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Mihai D.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Colecționar</p>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #ffc107'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Varietatea de obiecte este impresionantă. Găsesc mereu ceva interesant."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#ffc107',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  E
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Elena S.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Cumpărătoare</p>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              borderLeft: '4px solid #17a2b8'
            }}>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: '#333', 
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Procesul de vânzare este simplu și rapid. Recomand cu încredere!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#17a2b8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  D
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1a1a1a', margin: 0 }}>Daniel R.</p>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Vânzător</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
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
            Alătură-te Comunității de Succes
          </h2>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px', 
            opacity: 0.9 
          }}>
            Fii următorul nostru succes story. Începe să vinzi sau să cumpări obiecte de lux astăzi.
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
              Începe Gratuit
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
              Vezi Ofertele
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
