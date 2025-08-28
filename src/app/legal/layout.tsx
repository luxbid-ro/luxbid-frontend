import React from 'react'
import CookieBanner from '@/components/CookieBanner'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import AgeVerificationModal from '@/components/AgeVerificationModal'

// Layout simplu pentru paginile legale - FĂRĂ BasicAuth, dar cu componente esențiale
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header simplu pentru paginile legale */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <a href="/" style={{
            textDecoration: 'none',
            fontSize: '24px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            <span style={{ color: '#D09A1E' }}>Lux</span>
            <span style={{ color: '#000' }}>Bid</span>
          </a>
          <div style={{
            fontSize: '14px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🏛️</span>
            <span>Informații Legale</span>
          </div>
        </div>
      </header>

      {/* Conținutul principal */}
      <main>
        {children}
      </main>

      {/* Footer simplu pentru paginile legale */}
      <footer style={{
        background: '#f8f9fa',
        borderTop: '1px solid #e5e5e5',
        padding: '32px 0',
        marginTop: '40px'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            fontSize: '14px'
          }}>
            <a
              href="/legal/privacy-policy"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Politica de Confidențialitate
            </a>
            <a
              href="/legal/terms-conditions"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Termeni și Condiții
            </a>
            <a
              href="/legal/cookie-policy"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Politica Cookie-uri
            </a>
            <a
              href="/legal/dpo"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              DPO
            </a>
            <a
              href="/legal/dispute-resolution"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Soluționarea Disputelor
            </a>
            <a
              href="/legal/data-request"
              style={{
                color: '#666',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Cerere Date GDPR
            </a>
            <a
              href="/"
              style={{
                color: '#D09A1E',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              ← Înapoi la LuxBid
            </a>
          </div>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#999'
          }}>
            © 2025 LuxBid. Toate drepturile rezervate.
          </p>
          <p style={{
            margin: '8px 0 0 0',
            fontSize: '12px',
            color: '#999'
          }}>
            Pentru întrebări legale: <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
          </p>
        </div>
      </footer>

      {/* Componente esențiale */}
      <CookieBanner />
      <AccessibilityWidget />
      <AgeVerificationModal />
    </>
  )
}
