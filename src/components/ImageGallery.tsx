'use client'
import React, { useState } from 'react'
import ImageMagnifier from './ImageMagnifier'
import { GalleryImage } from './OptimizedImage'

interface ImageGalleryProps {
  images: Array<{
    id: string
    imageUrl: string
    isPrimary: boolean
  }>
  className?: string
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [isMagnifierActive, setIsMagnifierActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectez mobile pentru a dezactiva magnifier-ul
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!images || images.length === 0) {
    return (
      <div className={`${className}`} style={{ 
        background: '#f5f5f5', 
        borderRadius: 12, 
        padding: 40, 
        textAlign: 'center',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '3em', marginBottom: 15, opacity: 0.5 }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m4-11h-1a2 2 0 0 0-2 2v1m4 0h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1m-4 0H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"/>
</svg></div>
        <p style={{ color: '#999', margin: 0 }}>Nu sunt disponibile imagini</p>
      </div>
    )
  }

  // Sortez imaginile: prima cea principală, apoi restul
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary) return -1
    if (b.isPrimary) return 1
    return 0
  })

  const currentImage = sortedImages[selectedIndex]

  return (
    <div className={className}>
      {/* Imaginea principală cu Magnifier și controale */}
      <div style={{ marginBottom: 15, position: 'relative' }}>
        <div 
          style={{ 
            position: 'relative', 
            borderRadius: 12, 
            overflow: 'hidden',
            background: '#f5f5f5'
          }}
          onMouseLeave={() => {
            setIsMagnifierActive(false)
          }}
        >
          
          {/* Săgeți navigare - stânga */}
          {sortedImages.length > 1 && selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(prev => prev - 1)
              }}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          {/* Săgeți navigare - dreapta */}
          {sortedImages.length > 1 && selectedIndex < sortedImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(prev => prev + 1)
              }}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}

          {/* Butoane inimioară și share - top right */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 8,
            zIndex: 200
          }}>
            {/* Buton inimioară */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                // Simulez toggle favorite
                const currentFilled = e.currentTarget.getAttribute('data-filled') === 'true'
                const newFilled = !currentFilled
                e.currentTarget.setAttribute('data-filled', String(newFilled))
                
                // Schimb culoarea inimii
                const svg = e.currentTarget.querySelector('svg')
                if (svg) {
                  svg.style.fill = newFilled ? '#ff4757' : 'none'
                  svg.style.stroke = newFilled ? '#ff4757' : 'currentColor'
                }
                
                // Feedback vizual
                e.currentTarget.style.transform = 'scale(1.2)'
                setTimeout(() => {
                  e.currentTarget.style.transform = 'scale(1)'
                }, 150)
                
                console.log('❤️ Favorite toggled:', newFilled ? 'Added' : 'Removed')
              }}
              data-filled="false"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                const filled = e.currentTarget.getAttribute('data-filled') === 'true'
                e.currentTarget.style.transform = filled ? 'scale(1)' : 'scale(1)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            {/* Buton share */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                
                // Încerc să folosesc Web Share API dacă este disponibil
                if (navigator.share) {
                  navigator.share({
                    title: 'Anunț LuxBid',
                    text: 'Verifică acest anunț pe LuxBid',
                    url: window.location.href
                  }).then(() => {
                    console.log('📤 Shared successfully')
                  }).catch((err) => {
                    console.log('📤 Share failed:', err)
                    fallbackShare()
                  })
                } else {
                  fallbackShare()
                }
                
                function fallbackShare() {
                  // Fallback: copiez URL-ul în clipboard
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    // Feedback vizual
                    const originalText = e.currentTarget.title
                    e.currentTarget.title = 'Link copiat!'
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.9)'
                    
                    setTimeout(() => {
                      e.currentTarget.title = originalText || 'Distribuie'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                    }, 2000)
                    
                    console.log('📋 URL copied to clipboard')
                  }).catch(() => {
                    console.log('📋 Clipboard copy failed')
                  })
                }
                
                // Animație click
                e.currentTarget.style.transform = 'scale(1.15)'
                setTimeout(() => {
                  e.currentTarget.style.transform = 'scale(1)'
                }, 150)
              }}
              title="Distribuie"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
          {isMobile ? (
            // Pe mobile afișez doar imaginea simplă cu click pentru zoom
            <img
              src={currentImage.imageUrl}
              alt={`Imagine ${selectedIndex + 1}`}
              onClick={() => setShowZoom(true)}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            />
          ) : (
            // Pe desktop folosesc magnifier-ul
            <ImageMagnifier
              src={currentImage.imageUrl}
              alt={`Imagine ${selectedIndex + 1}`}
              width={400}
              height={400}
              magnifierSize={220}
              zoomLevel={3.5}
              enableMobile={false}
              onImageClick={() => setShowZoom(true)}
              onMagnifierStateChange={setIsMagnifierActive}
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                cursor: 'zoom-in' // Indică că se poate face click pentru zoom
              }}
            />
          )}
          {currentImage.isPrimary && (
            <div style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'rgba(208, 154, 30, 0.95)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              backdropFilter: 'blur(4px)',
              zIndex: 10
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
</svg> PRINCIPALĂ
            </div>
          )}
          
        </div>
      </div>

      {/* Thumbnails - Chrono24 style: mari și pătrați */}
      {sortedImages.length > 1 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${Math.min(sortedImages.length, 6)}, 1fr)`, 
          gap: 12,
          marginTop: 16
        }}>
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedIndex === index ? '3px solid #9a7b0f' : '2px solid #e5e5e5',
                opacity: selectedIndex === index ? 1 : 0.8,
                background: '#f5f5f5',
                height: 100, // Mărit de la 60 la 100px
                aspectRatio: '1', // Forțez pătratul perfect
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.borderColor = '#ccc'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.opacity = '0.8'
                  e.currentTarget.style.borderColor = '#e5e5e5'
                }
              }}
            >
              <img
                src={image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {image.isPrimary && (
                <div style={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  background: '#9a7b0f',
                  color: 'white',
                  borderRadius: 3,
                  width: 12,
                  height: 12
                }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal pentru zoom */}
      {showZoom && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={() => setShowZoom(false)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img
              src={currentImage.imageUrl}
              alt={`Zoom imagine ${selectedIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 8
              }}
            />
            <button
              onClick={() => setShowZoom(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                fontSize: '20px',
                color: '#333'
              }}
            >
              ×
            </button>
            
            {/* Navigare în zoom */}
            {sortedImages.length > 1 && (
              <>
                {selectedIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedIndex(prev => prev - 1)
                    }}
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ‹
                  </button>
                )}
                {selectedIndex < sortedImages.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedIndex(prev => prev + 1)
                    }}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ›
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
