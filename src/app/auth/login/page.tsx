'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('luxbid_token', data.accessToken)
        router.push('/dashboard')
      } else {
        const err = await res.json()
        setError(err.message || 'Eroare la conectare')
      }
    } catch (err) {
      setError('Eroare de conectare')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)' }}>
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
        <div style={{ marginBottom: '24px' }}>
          <input
            type="password"
            placeholder="Parolă"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
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
      </form>
    </div>
  )
}
