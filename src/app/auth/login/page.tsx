'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('luxbid_token', data.accessToken)
        if (data?.user?.id) {
          localStorage.setItem('luxbid_user_id', data.user.id)
        }
        router.push('/dashboard')
      } else {
        const err = await res.json()
        console.log('Login error response:', err)
        if (res.status === 401) {
          setError('Email sau parolă incorectă. Te rog verifică datele introduse.')
        } else {
          setError(err.message || `Eroare la conectare (${res.status})`)
        }
      }
    } catch (err) {
      console.log('Network error:', err)
      setError('Eroare de conectare cu serverul. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', paddingTop: '60px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--ink)' }}>Conectare</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Parolă"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '12px 48px 12px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {showPassword ? (
              // Eye closed icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#666' }}>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              // Eye open icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#666' }}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Se conectează...' : 'Conectare'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Nu ai cont? <a href="/auth/register" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Înregistrează-te</a>
        </p>
        <p style={{ textAlign: 'center', marginTop: '12px' }}>
          <a href="/auth/forgot-password" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Ai uitat parola?</a>
        </p>
        {error.includes('incorectă') && (
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Dacă contul a fost creat recent și nu funcționează, 
            <a href="/auth/register" style={{ color: 'var(--gold)', textDecoration: 'none' }}> recreează contul</a>.
          </p>
        )}
      </form>
    </div>
  )
}
