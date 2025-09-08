'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DeleteAccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    password: '',
    confirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.password) {
      setError('Parola este obligatorie')
      return
    }

    if (!formData.confirmation) {
      setError('Confirmarea este obligatorie')
      return
    }

    if (formData.confirmation !== 'ȘTERGE') {
      setError('Trebuie să scrii exact "ȘTERGE" pentru a confirma')
      return
    }

    setShowConfirmation(true)
  }

  const handleFinalDelete = async () => {
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) {
        router.push('/auth/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/users/account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: formData.password,
          confirmation: formData.confirmation
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Clear all local data
        localStorage.removeItem('luxbid_token')
        localStorage.removeItem('luxbid_user_id')
        localStorage.removeItem('luxbid_user_email')
        localStorage.removeItem('luxbid_user_verified')
        
        // Show success message
        alert('Contul a fost șters definitiv cu succes!')
        
        // Redirect to homepage
        router.push('/')
      } else {
        throw new Error(data.message || 'Eroare la ștergerea contului')
      }
    } catch (err: any) {
      setError(err.message || 'Eroare la ștergerea contului')
    } finally {
      setLoading(false)
      setShowConfirmation(false)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
    setFormData({ password: '', confirmation: '' })
    setError('')
  }

  if (showConfirmation) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - 60px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#ff4757',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px'
          }}>
            ⚠️
          </div>
          
          <h1 style={{ 
            color: '#2c3e50', 
            fontSize: '28px', 
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            Confirmare Ștergere Definitivă
          </h1>
          
          <p style={{ 
            color: '#7f8c8d', 
            fontSize: '16px', 
            lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            Ești sigur că vrei să ștergi definitiv contul <strong>{user?.email}</strong>?
          </p>
          
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#856404', marginBottom: '8px', fontSize: '14px' }}>
              ⚠️ Atenție! Această acțiune va șterge:
            </h3>
            <ul style={{ color: '#856404', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>Toate datele personale</li>
              <li>Toate anunțurile tale ({user?.listings?.length || 0} anunțuri)</li>
              <li>Istoricul conversațiilor</li>
              <li>Lista de favorite</li>
              <li>Toate setările contului</li>
            </ul>
            <p style={{ color: '#856404', fontSize: '14px', margin: '8px 0 0 0', fontWeight: 'bold' }}>
              Această acțiune este ireversibilă!
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: '#95a5a6',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              Anulează
            </button>
            
            <button
              onClick={handleFinalDelete}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Se șterge...' : 'Șterge Definitiv'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 60px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#e74c3c',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px'
        }}>
          🗑️
        </div>
        
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '28px', 
          marginBottom: '16px',
          fontWeight: '700',
          textAlign: 'center'
        }}>
          Ștergere Cont Definitivă
        </h1>
        
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '16px', 
          lineHeight: '1.6',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Dacă vrei să ștergi definitiv contul <strong>{user?.email}</strong>, 
          completează formularul de mai jos.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50',
              fontWeight: '600'
            }}>
              Parola contului
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Introdu parola contului"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50',
              fontWeight: '600'
            }}>
              Confirmare
            </label>
            <input
              type="text"
              name="confirmation"
              value={formData.confirmation}
              onChange={handleInputChange}
              placeholder="Scrie 'ȘTERGE' pentru a confirma"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
            />
            <p style={{ 
              color: '#7f8c8d', 
              fontSize: '12px', 
              marginTop: '4px',
              marginBottom: 0
            }}>
              Trebuie să scrii exact "ȘTERGE" pentru a confirma ștergerea
            </p>
          </div>
          
          {error && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            {loading ? 'Se procesează...' : 'Continuă cu Ștergerea'}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ 
            color: '#6c757d', 
            fontSize: '14px', 
            margin: 0
          }}>
            Nu vrei să ștergi contul? 
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px',
                marginLeft: '4px'
              }}
            >
              Întoarce-te la dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
