'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span> Contactează-ne
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Suntem aici să te ajutăm! Scrie-ne și îți vom răspunde în cel mai scurt timp.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '50px',
        alignItems: 'start'
      }}>
        {/* Contact Form */}
        <div style={{
          background: 'white',
          border: '1px solid #eee',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '30px',
            color: '#111',
            fontWeight: '600'
          }}>
            Trimite-ne un mesaj
          </h2>

          {submitStatus === 'success' && (
            <div style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              color: '#155724'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Mesajul tău a fost trimis cu succes! Îți vom răspunde în curând.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Nume complet *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #eee',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #eee',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Subiect *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #eee',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box',
                  background: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              >
                <option value="">Selectează subiectul</option>
                <option value="support">Suport tehnic</option>
                <option value="selling">Întrebări despre vânzare</option>
                <option value="buying">Întrebări despre cumpărare</option>
                <option value="authentication">Autentificare obiecte</option>
                <option value="partnership">Parteneriat</option>
                <option value="press">Presă și media</option>
                <option value="other">Altele</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Mesaj *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Scrie-ne întrebarea sau mesajul tău..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #eee',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'Inter, sans-serif'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#ccc' : '#D09A1E',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              {isSubmitting ? (
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9"/>
                  </svg>
                  Se trimite...
                </span>
              ) : (
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Trimite mesajul
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Quick Contact */}
          <div style={{
            background: 'linear-gradient(135deg, #D09A1E 0%, #B8831A 100%)',
            borderRadius: '16px',
            padding: '30px',
            color: 'white'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Contact rapid
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <strong>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email:
                </strong><br />
                <a href="mailto:contact@luxbid.ro" style={{ color: 'white', opacity: '0.9' }}>
                  contact@luxbid.ro
                </a>
              </div>
              <div>
                <strong>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Telefon:
                </strong><br />
                <a href="tel:+40755123456" style={{ color: 'white', opacity: '0.9' }}>
                  +40 755 123 456
                </a>
              </div>
              <div>
                <strong>⏰ Program:</strong><br />
                <span style={{ opacity: '0.9' }}>Luni - Vineri: 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div style={{
            background: 'white',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              marginBottom: '15px',
              color: '#111',
              fontWeight: '600'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Întrebări frecvente
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Înainte să ne scrii, verifică dacă nu cumva răspunsul la întrebarea ta se află în secțiunea FAQ.
            </p>
            <a
              href="/faq"
              style={{
                background: '#f8f9fa',
                color: '#D09A1E',
                padding: '12px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                border: '2px solid #D09A1E',
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}
            >
              Vezi FAQ
            </a>
          </div>

          {/* Social Media */}
          <div style={{
            background: 'white',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '30px'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              marginBottom: '15px',
              color: '#111',
              fontWeight: '600'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              Urmărește-ne
            </h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Rămâi la curent cu noutățile din lumea obiectelor de lux.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href="#" style={{
                background: '#1877f2',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="#" style={{
                background: '#1da1f2',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
                Twitter
              </a>
              <a href="#" style={{
                background: '#e4405f',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Emergency Support */}
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '16px',
            padding: '25px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '10px',
              color: '#856404',
              fontWeight: '600'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Suport urgent
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#856404', 
              lineHeight: '1.5',
              margin: '0'
            }}>
              Pentru probleme urgente legate de tranzacții active, ne poți contacta direct la telefon în timpul programului de lucru.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
