import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tarife Transparente | LuxBid - Comisioane și Prețuri',
  description: 'Descoperă tarifele transparente LuxBid. Comisioane competitive, planuri flexibile pentru vânzători și dealerii. Plătești doar când vânzi cu adevărat.',
  keywords: 'tarife LuxBid, comisioane marketplace, prețuri platformă lux, costuri vânzare obiecte de lux',
  openGraph: {
    title: 'Tarife Transparente | LuxBid',
    description: 'Comisioane competitive și planuri flexibile pentru vânzători de obiecte de lux',
    type: 'website',
    url: 'https://luxbid.ro/pricing',
  },
  alternates: {
    canonical: 'https://luxbid.ro/pricing',
  }
}

export default function PricingPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '40px 20px', background: '#fafafa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            Tarife Transparente
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Platforma LuxBid funcționează pe principiul "succesul tău este succesul nostru". 
            Plătești doar când vânzi cu adevărat.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px', 
          marginBottom: '80px' 
        }}>
          {/* Free Plan */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid #e9ecef',
            position: 'relative',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>
                Explorare Gratuită
              </h3>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#28a745', marginBottom: '10px' }}>
                GRATUIT
              </div>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Pentru cumpărători și explorare
              </p>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#28a745', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Acces complet la toate anunțurile</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#28a745', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Fă oferte nelimitate</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#28a745', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Chat direct cu vânzătorii</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#28a745', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Notificări în timp real</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#28a745', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Lista de favorite</span>
              </li>
            </ul>
            
            <button style={{
              width: '100%',
              padding: '16px',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}>
              Începe Gratuit
            </button>
          </div>

          {/* Seller Plan */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 15px 40px rgba(208, 154, 30, 0.2)',
            border: '3px solid #D09A1E',
            position: 'relative',
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              color: '#fff',
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              CEL MAI POPULAR
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>
                Vânzător Premium
              </h3>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#D09A1E', marginBottom: '10px' }}>
                3%
              </div>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Comision doar la vânzări reușite
              </p>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Toate funcțiile gratuite</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Publicare anunțuri nelimitată</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Statistici avansate de vânzare</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Suport prioritar</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Promovare în rezultatele de căutare</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#D09A1E', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Comision doar la vânzări reușite</span>
              </li>
            </ul>
            
            <button style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              Începe să Vinzi
            </button>
          </div>

          {/* Business Plan */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid #e9ecef',
            position: 'relative',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>
                Dealer Premium
              </h3>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#6f42c1', marginBottom: '10px' }}>
                2%
              </div>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Pentru dealerii cu volum mare
              </p>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Toate funcțiile Premium</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Comision redus (2%)</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Bulk listing (încărcare în masă)</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>API personalizat</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Manager dedicat</span>
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#6f42c1', marginRight: '12px', fontSize: '18px' }}>✓</span>
                <span style={{ color: '#333' }}>Raportare avansată</span>
              </li>
            </ul>
            
            <button style={{
              width: '100%',
              padding: '16px',
              background: '#6f42c1',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}>
              Contactează-ne
            </button>
          </div>
        </div>

        {/* How It Works */}
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
            Cum Funcționează Comisionul?
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
                color: '#fff',
                fontWeight: '700'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Publici Anunțul
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Creezi anunțul cu fotografii și descriere detaliată. Complet gratuit.
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
                Primești Oferte
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Cumpărătorii fac oferte prin platformă. Tu alegi cea mai bună.
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
                Finalizezi Vânzarea
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Accepti oferta și finalizezi tranzacția. Plătești comisionul doar acum.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '20px', 
          padding: '60px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            textAlign: 'center', 
            marginBottom: '50px' 
          }}>
            Întrebări Frecvente
          </h2>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Când plătesc comisionul?
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Comisionul se plătește doar când vânzarea este finalizată cu succes. 
                Dacă nu vinzi nimic, nu plătești nimic.
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Cum se calculează comisionul?
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Comisionul se calculează din suma finală a vânzării. 
                De exemplu: pentru o vânzare de 10.000 RON, comisionul este 300 RON (3%).
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Există costuri ascunse?
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Nu. Toate costurile sunt transparente. Nu există taxe de înregistrare, 
                costuri lunare sau alte taxe ascunse.
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '15px' }}>
                Pot să îmi modific planul?
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Da, poți să treci la planul Dealer Premium oricând. 
                Contactează-ne pentru a discuta condițiile.
              </p>
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
            Gata să Începi?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px', 
            opacity: 0.9 
          }}>
            Alătură-te comunității LuxBid și începe să vinzi obiecte de lux astăzi.
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
              Contactează-ne
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
