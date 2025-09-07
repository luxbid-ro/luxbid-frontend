'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Start timer when component mounts
  useEffect(() => {
    setTimeLeft(15 * 60); // 15 minutes
  }, []);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Te rugăm să introduci codul de 6 cifre');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Eroare la verificarea email-ului');
      }

      // Save user data to localStorage after successful verification
      if (data.user) {
        localStorage.setItem('luxbid_user_id', data.user.id);
        localStorage.setItem('luxbid_user_email', data.user.email);
        localStorage.setItem('luxbid_user_verified', 'true');
      }

      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Eroare la verificarea email-ului');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/auth/resend-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Eroare la retrimiterea codului');
      }

      // Reset timer
      setTimeLeft(15 * 60);
      setVerificationCode('');
      
      // Show success message briefly
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err: any) {
      setError(err.message || 'Eroare la retrimiterea codului');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (success && !isResending) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>✅</div>
          <h1 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '28px'
          }}>Email Verificat!</h1>
          <p style={{
            color: '#666',
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            Adresa ta de email a fost verificată cu succes. 
            Vei fi redirecționat către dashboard în câteva secunde...
          </p>
          <div style={{
            width: '100%',
            height: '4px',
            background: '#f0f0f0',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #D09A1E, #B8860B)',
              animation: 'progress 2s ease-in-out'
            }}></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>📧</div>
          <h1 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '28px'
          }}>Verifică Email-ul</h1>
          <p style={{
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Am trimis un cod de verificare la<br />
            <strong style={{ color: '#D09A1E' }}>{email}</strong>
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            color: '#c33'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerifyEmail}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '600'
            }}>
              Codul de verificare (6 cifre)
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setVerificationCode(value);
              }}
              placeholder="123456"
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '18px',
                textAlign: 'center',
                letterSpacing: '8px',
                fontFamily: 'monospace',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#D09A1E'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || verificationCode.length !== 6}
            style={{
              width: '100%',
              padding: '15px',
              background: isLoading || verificationCode.length !== 6 
                ? '#ccc' 
                : 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading || verificationCode.length !== 6 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginBottom: '20px'
            }}
          >
            {isLoading ? 'Se verifică...' : 'Verifică Email-ul'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p style={{
            color: '#666',
            margin: '0 0 10px 0',
            fontSize: '14px'
          }}>
            Codul expiră în: <strong style={{ color: timeLeft < 300 ? '#c33' : '#D09A1E' }}>
              {formatTime(timeLeft)}
            </strong>
          </p>
          {timeLeft === 0 && (
            <p style={{
              color: '#c33',
              margin: '0',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Codul a expirat! Te rugăm să ceri unul nou.
            </p>
          )}
        </div>

        <div style={{
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '20px'
        }}>
          <p style={{
            color: '#666',
            margin: '0 0 15px 0',
            fontSize: '14px'
          }}>
            Nu ai primit codul?
          </p>
          <button
            onClick={handleResendCode}
            disabled={isResending || timeLeft > 0}
            style={{
              background: 'none',
              border: '2px solid #D09A1E',
              color: '#D09A1E',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isResending || timeLeft > 0 ? 'not-allowed' : 'pointer',
              opacity: isResending || timeLeft > 0 ? 0.5 : 1,
              transition: 'all 0.3s'
            }}
          >
            {isResending ? 'Se trimite...' : 'Trimite din nou'}
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={() => router.push('/auth/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Înapoi la login
          </button>
        </div>
      </div>
    </div>
  );
}
