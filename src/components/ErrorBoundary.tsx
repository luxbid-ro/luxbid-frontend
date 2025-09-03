'use client'
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to monitoring service (add your service here)
    console.error('🚨 Error Boundary caught an error:', error)
    console.error('📍 Error Info:', errorInfo)
    
    // TODO: Send to error tracking service like Sentry
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.handleReset} />
      }

      // Default error UI
      return (
        <div style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '40px 20px',
          textAlign: 'center',
          background: '#fafafa',
          borderRadius: '12px',
          border: '1px solid #eee'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</svg></div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
            Oops! Ceva nu a mers bine
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', maxWidth: '400px' }}>
            A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să reîncarci pagina.
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginBottom: '24px', 
              padding: '16px', 
              background: '#fff', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              maxWidth: '500px',
              textAlign: 'left'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
                Detalii eroare (development)
              </summary>
              <pre style={{ fontSize: '12px', color: '#d32f2f', whiteSpace: 'pre-wrap' }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 24px',
                background: '#D09A1E',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#B8831A'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#D09A1E'}
            >
              Încearcă din nou
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: '#fff',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Reîncarcă pagina
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Custom fallback component for specific use cases
export function ApiErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div style={{
      padding: '32px',
      textAlign: 'center',
      background: '#fff5f5',
      border: '1px solid #fed7d7',
      borderRadius: '12px',
      margin: '20px 0'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '16px' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</svg></div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e53e3e', marginBottom: '8px' }}>
        Eroare de conectare
      </h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Nu am putut încărca datele. Verifică conexiunea la internet și încearcă din nou.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 20px',
          background: '#e53e3e',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Încearcă din nou
      </button>
    </div>
  )
}
