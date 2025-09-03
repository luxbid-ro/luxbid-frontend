'use client'

import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // General
  {
    category: 'General',
    question: 'Ce este LuxBid?',
    answer: 'LuxBid este marketplace-ul premium pentru obiectele de lux din România. Conectăm vânzătorii și cumpărătorii de ceasuri, genți, bijuterii și alte obiecte de lux autentice.'
  },
  {
    category: 'General',
    question: 'Cum funcționează platforma?',
    answer: 'Vânzătorii își publică obiectele de lux pe platformă, iar cumpărătorii pot face oferte. Facilitam comunicarea prin chat și asigurăm tranzacții sigure.'
  },
  {
    category: 'General',
    question: 'Este gratuit să folosesc LuxBid?',
    answer: 'Înregistrarea și navigarea pe platformă sunt gratuite. Aplicăm o mică comision doar la finalizarea unei tranzacții de succes.'
  },

  // Vânzare
  {
    category: 'Vânzare',
    question: 'Cum îmi vând obiectul pe LuxBid?',
    answer: 'Creează un cont, completează profilul, apoi publică anunțul tău cu fotografii de calitate și descriere detaliată. Vei primi oferte de la cumpărători interesați.'
  },
  {
    category: 'Vânzare',
    question: 'Ce fotografii trebuie să încarc?',
    answer: 'Recomandăm cel puțin 5-8 fotografii de înaltă calitate: vedere generală, detalii aproape, numărul de serie, cutia și documentele (dacă există).'
  },
  {
    category: 'Vânzare',
    question: 'Cât timp rămâne activ anunțul meu?',
    answer: 'Anunțurile rămân active timp de 90 de zile. Poți să le reînnoiești gratuit din dashboard-ul tău.'
  },
  {
    category: 'Vânzare',
    question: 'Pot să modific prețul după publicare?',
    answer: 'Da, poți modifica prețul, descrierea și fotografiile oricând din secțiunea "Anunțurile mele".'
  },

  // Cumpărare
  {
    category: 'Cumpărare',
    question: 'Cum fac o ofertă?',
    answer: 'Navighezi la obiectul dorit și apeși "Fă o ofertă". Introduci suma și un mesaj optional. Vânzătorul va fi notificat și poate accepta sau contrapropune.'
  },
  {
    category: 'Cumpărare',
    question: 'Cum știu că obiectul este autentic?',
    answer: 'Încurajăm verificarea de către experți independenți. Pentru tranzacții mari, recomandăm întâlnirea personală sau serviciile unui expert în autentificare.'
  },
  {
    category: 'Cumpărare',
    question: 'Pot să returnez un obiect?',
    answer: 'Politica de returnare depinde de acordul dintre cumpărător și vânzător. Recomandăm discutarea acestor detalii înainte de finalizarea tranzacției.'
  },
  {
    category: 'Cumpărare',
    question: 'Ce metode de plată acceptați?',
    answer: 'Acceptăm transfer bancar, plata cu cardul și, pentru sume mari, cash la întâlnirea personală. Toate tranzacțiile sunt securizate.'
  },

  // Siguranță
  {
    category: 'Siguranță',
    question: 'Cum vă asigurați că tranzacțiile sunt sigure?',
    answer: 'Verificăm identitatea utilizatorilor, monitorizăm activitatea suspicioasă și oferim sistem de rating. Pentru sume mari, recomandăm întâlnirea într-un loc sigur.'
  },
  {
    category: 'Siguranță',
    question: 'Ce fac dacă am o problemă cu o tranzacție?',
    answer: 'Contactează-ne imediat prin chat sau email. Echipa noastră va media și va ajuta la rezolvarea disputei în mod echitabil.'
  },
  {
    category: 'Siguranță',
    question: 'Cum raportez un utilizator suspect?',
    answer: 'Folosește butonul "Raportează" din profilul utilizatorului sau contactează-ne direct. Luăm în serios toate raportările și investigăm prompt.'
  },

  // Cont și Profil
  {
    category: 'Cont',
    question: 'Cum îmi creez un cont?',
    answer: 'Apasă "Înregistrare", completează formularul cu datele tale și verifică adresa de email. Vei putea naviga și face oferte imediat.'
  },
  {
    category: 'Cont',
    question: 'Pot să îmi șterge contul?',
    answer: 'Da, poți să îți ștergi contul din secțiunea "Setări cont". Datele tale vor fi eliminate conform GDPR în maximum 30 de zile.'
  },
  {
    category: 'Cont',
    question: 'Cum îmi schimb parola?',
    answer: 'Mergi la "Profil" > "Securitate" și apasă "Schimbă parola". Vei primi un link de resetare pe email.'
  }
]

const categories = ['Toate', 'General', 'Vânzare', 'Cumpărare', 'Siguranță', 'Cont']

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('Toate')
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'Toate' || item.category === selectedCategory
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '20px',
          color: '#111',
          fontWeight: '800'
        }}>
          <span style={{ color: '#D09A1E' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span> Întrebări Frecvente
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Găsește răspunsuri rapide la întrebările despre LuxBid
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
                      placeholder="Caută în întrebări..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '16px',
            border: '2px solid #eee',
            borderRadius: '12px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
          onBlur={(e) => e.target.style.borderColor = '#eee'}
        />
      </div>

      {/* Category Filter */}
      <div style={{ 
        marginBottom: '40px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '10px 20px',
              border: '2px solid #D09A1E',
              borderRadius: '25px',
              background: selectedCategory === category ? '#D09A1E' : 'transparent',
              color: selectedCategory === category ? 'white' : '#D09A1E',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredFAQs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#666',
            fontSize: '18px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Nu am găsit întrebări care să se potrivească cu căutarea ta.
          </div>
        ) : (
          filteredFAQs.map((item, index) => {
            const globalIndex = faqData.indexOf(item)
            const isOpen = openItems.includes(globalIndex)
            
            return (
              <div
                key={globalIndex}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <button
                  onClick={() => toggleItem(globalIndex)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: isOpen ? '#f8f9fa' : 'white',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111'
                  }}
                >
                  <span style={{ paddingRight: '20px' }}>
                    <span style={{ 
                      background: '#D09A1E', 
                      color: 'white', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      marginRight: '12px'
                    }}>
                      {item.category}
                    </span>
                    {item.question}
                  </span>
                  <span style={{ 
                    fontSize: '20px', 
                    color: '#D09A1E',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    +
                  </span>
                </button>
                
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    background: 'white',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: '#555',
                      margin: '15px 0 0 0'
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Contact CTA */}
      <div style={{
        marginTop: '60px',
        padding: '40px',
        background: 'linear-gradient(135deg, #D09A1E 0%, #B8831A 100%)',
        borderRadius: '16px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>
          Nu ai găsit răspunsul?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
          Echipa noastră este aici să te ajute cu orice întrebare
        </p>
        <a
          href="/contact"
          style={{
            background: 'white',
            color: '#D09A1E',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Contactează-ne
        </a>
      </div>
    </div>
  )
}
