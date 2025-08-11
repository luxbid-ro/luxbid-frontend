'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [personType, setPersonType] = useState<'fizica' | 'juridica'>('fizica')
  const [form, setForm] = useState({
    // Date comune
    email: '',
    password: '',
    
    // Persoană fizică
    firstName: '',
    lastName: '',
    cnp: '',
    phone: '',
    
    // Persoană juridică  
    companyName: '',
    cui: '',
    regCom: '',
    
    // Adresa de facturare (comună)
    address: '',
    city: '',
    county: '',
    postalCode: '',
    country: 'România'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const registrationData = {
        ...form,
        personType,
        name: personType === 'fizica' ? `${form.firstName} ${form.lastName}` : form.companyName
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('luxbid_token', data.accessToken)
        router.push('/dashboard')
      } else {
        const err = await res.json()
        setError(err.message || 'Eroare la înregistrare')
      }
    } catch (err) {
      setError('Eroare de conectare')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--ink)' }}>Înregistrare</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
        
        {/* Tip persoană */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--ink)' }}>Tip persoană</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                value="FIZICA"
                checked={personType === 'FIZICA'}
                onChange={(e) => setPersonType(e.target.value as 'FIZICA')}
                style={{ marginRight: '8px' }}
              />
              Persoană fizică
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                value="JURIDICA"
                checked={personType === 'JURIDICA'}
                onChange={(e) => setPersonType(e.target.value as 'JURIDICA')}
                style={{ marginRight: '8px' }}
              />
              Persoană juridică (Companie/Firmă)
            </label>
          </div>
        </div>

        {/* Date comune */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email *"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Parolă *"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>

        {/* Câmpuri pentru persoană fizică */}
        {personType === 'FIZICA' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Prenume *"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
              <input
                type="text"
                placeholder="Nume *"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="CNP (opțional)"
                value={form.cnp}
                onChange={(e) => setForm({ ...form, cnp: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
            </div>
          </>
        )}

        {/* Câmpuri pentru persoană juridică */}
        {personType === 'JURIDICA' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Denumirea companiei *"
                required
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="CUI *"
                required
                value={form.cui}
                onChange={(e) => setForm({ ...form, cui: e.target.value })}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
              <input
                type="text"
                placeholder="Nr. Reg. Com. *"
                required
                value={form.regCom}
                onChange={(e) => setForm({ ...form, regCom: e.target.value })}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
              />
            </div>
          </>
        )}

        {/* Telefon (comun) */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="tel"
            placeholder="Telefon *"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>

        {/* Adresa de facturare */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--ink)', fontSize: '18px' }}>Adresa de facturare</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Adresa completă (strada, numărul) *"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Orașul *"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="text"
              placeholder="Județul *"
              required
              value={form.county}
              onChange={(e) => setForm({ ...form, county: e.target.value })}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Cod poștal *"
              required
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="text"
              placeholder="Țara"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Se înregistrează...' : 'Înregistrare'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Ai deja cont? <a href="/auth/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Conectează-te</a>
        </p>
      </form>
    </div>
  )
}
