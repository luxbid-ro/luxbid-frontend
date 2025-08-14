'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/auth/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const err = await res.json()
        setError(err.message || 'A apărut o eroare. Te rog încearcă din nou.')
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Eroare de conectare cu serverul. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', paddingTop: '60px' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 6px rgba(0,0,0,.1)', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ margin: '0 auto' }}>
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </div>
          <h2 style={{ color: 'var(--ink)', marginBottom: '16px' }}>Email trimis cu succes!</h2>
          <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
            Dacă email-ul <strong>{email}</strong> există în sistem, vei primi instrucțiuni pentru resetarea parolei în câteva minute.
          </p>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '14px' }}>
            Verifică și folderul de spam. Link-ul expiră în 1 oră.
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            style={{ 
              background: 'var(--gold)', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Înapoi la Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', paddingTop: '60px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <h2 style={{ color: 'var(--ink)', marginBottom: '8px' }}>Ai uitat parola?</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Introdu adresa de email și îți vom trimite instrucțiuni pentru resetarea parolei.
          </p>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
        
        <div style={{ marginBottom: '24px' }}>
          <input
            type="email"
            placeholder="Adresa de email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: loading ? '#ccc' : 'var(--gold)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: '700', 
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Se trimite...' : 'Trimite instrucțiuni'}
        </button>
        
        <p style={{ textAlign: 'center', color: '#666' }}>
          Îți amintești parola? <a href="/auth/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Conectează-te</a>
        </p>
      </form>
    </div>
  )
}
