'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Loading componente pentru fallback
const ComponentLoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    background: '#f8f9fa',
    borderRadius: '12px',
    border: '2px dashed #dee2e6'
  }}>
    <div style={{
      textAlign: 'center',
      color: '#6c757d'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #D09A1E',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 12px'
      }} />
      <p style={{ margin: 0, fontSize: '14px' }}>Se încarcă...</p>
    </div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

const GalleryLoadingSpinner = () => (
  <div style={{
    background: '#f5f5f5',
    borderRadius: '12px',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #e9ecef',
      borderTop: '4px solid #D09A1E',
      borderRadius: '50%',
      animation: 'spin 1.2s linear infinite'
    }} />
    <p style={{ 
      margin: 0, 
      color: '#6c757d', 
      fontSize: '16px',
      fontWeight: '500' 
    }}>
      Se încarcă galeria...
    </p>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

const UploadLoadingSpinner = () => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    background: '#f8f9fa',
    borderRadius: '12px',
    border: '2px dashed #D09A1E'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #D09A1E',
      borderTop: '3px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 12px'
    }} />
    <p style={{ margin: 0, color: '#6c757d' }}>Încărcare modul upload...</p>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// Dynamic imports pentru componente mari
export const LazyImageGallery = dynamic(
  () => import('./ImageGallery'),
  {
    loading: GalleryLoadingSpinner,
    ssr: false // Disable SSR pentru performanță
  }
)

export const LazyImageUpload = dynamic(
  () => import('./ImageUpload'),
  {
    loading: UploadLoadingSpinner,
    ssr: false
  }
)

export const LazyImageMagnifier = dynamic(
  () => import('./ImageMagnifier'),
  {
    loading: ComponentLoadingSpinner,
    ssr: false
  }
)

// Modal components - încarcă doar când e necesar
export const LazyCookieBanner = dynamic(
  () => import('./CookieBanner'),
  {
    loading: () => null, // Nu afișa loader pentru cookie banner
    ssr: false
  }
)



export const LazyAccessibilityWidget = dynamic(
  () => import('./AccessibilityWidget'),
  {
    loading: () => null,
    ssr: false
  }
)

// Chat components - lazy loading pentru chat
export const LazyChatInterface = dynamic(
  () => import('@/app/chat/[offerId]/page').then(mod => ({ default: mod.default })).catch(() => ({ default: () => null })),
  {
    loading: () => (
      <div style={{
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #D09A1E',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 12px'
          }} />
          <p style={{ margin: 0, color: '#6c757d' }}>Se încarcă chat-ul...</p>
        </div>
      </div>
    ),
    ssr: false
  }
)

// Brand page components
export const LazyBrandPageClient = dynamic(
  () => import('@/app/branduri/[brand]/BrandPageClient'),
  {
    loading: ComponentLoadingSpinner,
    ssr: false
  }
)

export const LazyJewelryBrandPageClient = dynamic(
  () => import('@/app/branduri-bijuterii/[brand]/JewelryBrandPageClient'),
  {
    loading: ComponentLoadingSpinner,
    ssr: false
  }
)

export const LazyBagBrandPageClient = dynamic(
  () => import('@/app/branduri-genti/[brand]/BagBrandPageClient'),
  {
    loading: ComponentLoadingSpinner,
    ssr: false
  }
)

// Utility function pentru lazy loading bazat pe condiții
export function createConditionalLazyComponent<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  condition: () => boolean,
  fallback?: ComponentType<T>
) {
  return dynamic(
    async () => {
      if (condition()) {
        return await importFn()
      }
      return { default: fallback || (() => null) }
    },
    {
      loading: ComponentLoadingSpinner,
      ssr: false
    }
  )
}

// Hook pentru lazy loading condiționat
export function useLazyLoad(shouldLoad: boolean) {
  return shouldLoad
}

// Preload function pentru critical components
export function preloadCriticalComponents() {
  // Preload componentele importante
  if (typeof window !== 'undefined') {
    // Preload doar dacă suntem în browser
    setTimeout(() => {
      import('./ImageGallery')
      import('./ImageUpload')
    }, 2000) // Preload după 2 secunde
  }
}
