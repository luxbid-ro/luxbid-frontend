import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Cariere la LuxBid | Oportunități de Angajare în Tech',
  description: 'Alătură-te echipei LuxBid! Descoperă oportunitățile de cariere în tech, beneficii competitive și cultura companiei pentru marketplace-ul de lux.',
  keywords: 'cariere LuxBid, joburi tech România, oportunități angajare, beneficii companie tech',
  openGraph: {
    title: 'Cariere la LuxBid | Oportunități de Angajare',
    description: 'Alătură-te echipei LuxBid și construiește viitorul marketplace-ului de lux',
    type: 'website',
    url: 'https://luxbid.ro/careers',
  },
  alternates: {
    canonical: 'https://luxbid.ro/careers',
  }
}

export default function CareersPage() {
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
            Cariere la LuxBid
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Alătură-te echipei care transformă modul în care românii vând și cumpără obiecte de lux. 
            Construim viitorul pieței de lux digitale din România.
          </p>
        </div>

        {/* Why Join Us */}
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
            De Ce Să Te Alături Echipei Noastre?
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
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#fff'
              }}>
                🚀
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Impact Real
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Contribui la democratizarea accesului la obiecte de lux și la crearea unei piețe mai transparente.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                💡
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Inovație Continuă
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Lucrezi cu tehnologii de vârf și contribui la dezvoltarea de soluții inovatoare pentru industria de lux.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                👥
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Echipa de Top
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Colaborezi cu profesioniști experimentați din diverse domenii: tech, lux, marketing și business.
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
                📈
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Creștere Rapidă
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Beneficiezi de oportunități de dezvoltare profesională într-o companie în expansiune rapidă.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
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
            Poziții Deschise
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '30px' 
          }}>
            {/* Position 1 */}
            <div style={{
              border: '2px solid #e9ecef',
              borderRadius: '15px',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                  Senior Frontend Developer
                </h3>
                <span style={{
                  padding: '6px 12px',
                  background: '#D09A1E',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Full-time
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                Cautăm un developer React/Next.js experimentat pentru a dezvolta și îmbunătăți interfața utilizator a platformei LuxBid.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                  Cerințe:
                </h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                  <li>3+ ani experiență cu React/Next.js</li>
                  <li>Cunoaștere TypeScript</li>
                  <li>Experiență cu CSS-in-JS</li>
                  <li>Portofoliu de proiecte complexe</li>
                </ul>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Aplică Acum
              </button>
            </div>

            {/* Position 2 */}
            <div style={{
              border: '2px solid #e9ecef',
              borderRadius: '15px',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                  Backend Developer (Node.js)
                </h3>
                <span style={{
                  padding: '6px 12px',
                  background: '#28a745',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Full-time
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                Dezvoltă și menține API-urile backend pentru platforma LuxBid folosind Node.js, NestJS și PostgreSQL.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                  Cerințe:
                </h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                  <li>3+ ani experiență cu Node.js</li>
                  <li>Cunoaștere NestJS și Prisma</li>
                  <li>Experiență cu PostgreSQL</li>
                  <li>Înțelegere microservicii</li>
                </ul>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Aplică Acum
              </button>
            </div>

            {/* Position 3 */}
            <div style={{
              border: '2px solid #e9ecef',
              borderRadius: '15px',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                  Marketing Manager
                </h3>
                <span style={{
                  padding: '6px 12px',
                  background: '#6f42c1',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Full-time
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                Conduci strategiile de marketing digital și dezvolți campanii pentru a crește awareness-ul brandului LuxBid.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                  Cerințe:
                </h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                  <li>4+ ani experiență în marketing digital</li>
                  <li>Cunoaștere Google Ads și Facebook Ads</li>
                  <li>Experiență cu analytics și tracking</li>
                  <li>Background în industria de lux (preferabil)</li>
                </ul>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Aplică Acum
              </button>
            </div>

            {/* Position 4 */}
            <div style={{
              border: '2px solid #e9ecef',
              borderRadius: '15px',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                  Customer Success Manager
                </h3>
                <span style={{
                  padding: '6px 12px',
                  background: '#dc3545',
                  color: '#fff',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Full-time
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                Asiguri satisfacția clienților și dezvolți strategii pentru îmbunătățirea experienței utilizatorilor.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>
                  Cerințe:
                </h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                  <li>2+ ani experiență în customer success</li>
                  <li>Abilități excelente de comunicare</li>
                  <li>Cunoaștere CRM și analytics</li>
                  <li>Orientare spre rezultate</li>
                </ul>
              </div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Aplică Acum
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
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
            Beneficii și Compensații
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
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>💰</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Salariu Competitiv
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Salarii peste media pieței pentru toate pozițiile, plus bonusuri bazate pe performanță.
              </p>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏠</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Work from Home
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Flexibilitate completă: lucrezi de acasă, din birou sau hibrid, cum îți convine.
              </p>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Dezvoltare Profesională
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Buget anual pentru cursuri, conferințe și certificări. Susținem învățarea continuă.
              </p>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏥</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Asigurări Medicale
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Asigurări medicale private pentru tine și familia ta, plus asigurări de viață.
              </p>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Equity Package
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Acțiuni în companie pentru toți angajații. Beneficiezi de creșterea valorii companiei.
              </p>
            </div>
            
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🍕</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Team Building
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Evenimente regulate, team building-uri și activități pentru a construi relații puternice în echipă.
              </p>
            </div>
          </div>
        </div>

        {/* Culture */}
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
            Cultura Noastră
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
                Valori Noastre
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🎯</span>
                  <span>Transparență în toate interacțiunile</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🚀</span>
                  <span>Inovație și îmbunătățire continuă</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🤝</span>
                  <span>Colaborare și respect reciproc</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>⭐</span>
                  <span>Excelență în tot ce facem</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
                Ce Înseamnă Să Lucrezi la LuxBid
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>💡</span>
                  <span>Ideile tale sunt ascultate și implementate</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🌱</span>
                  <span>Crești profesional într-un mediu dinamic</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🎉</span>
                  <span>Celebrezi succesele împreună cu echipa</span>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>🌟</span>
                  <span>Contribui la o misiune cu impact real</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Process */}
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
            Procesul de Aplicare
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ textAlign: 'center' }}>
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
                color: '#fff',
                fontWeight: '700'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Aplică Online
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Trimite CV-ul și scrisoarea de intenție prin formularul nostru online.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                color: '#fff',
                fontWeight: '700'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Screening Initial
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Echipa HR verifică aplicația și programează un apel telefonic de 15 minute.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                color: '#fff',
                fontWeight: '700'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Interviu Tehnic
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Discuție cu echipa tehnică despre experiența ta și provocări practice.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                color: '#fff',
                fontWeight: '700'
              }}>
                4
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Interviu Final
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Întâlnire cu managementul pentru a discuta despre fit-ul cultural și viitorul rol.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                color: '#fff',
                fontWeight: '700'
              }}>
                5
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Bun Venit în Echipă!
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Primești oferta și începi aventura ta la LuxBid cu onboarding complet.
              </p>
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
            Gata să Te Alături Echipei?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#666',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Dacă nu găsești poziția potrivită, trimite-ne CV-ul tău. 
            Căutăm mereu talente excepționale pentru a ne extinde echipa.
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
              Vezi Pozițiile Deschise
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
              Trimite CV-ul
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
