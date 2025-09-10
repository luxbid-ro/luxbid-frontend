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
      {/* Imaginea principală cu Magnifier */}
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
                borderRadius: '12px'
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
          
          {/* Click pentru zoom complet - întotdeauna vizibil, cu z-index mare pentru a fi deasupra magnifier-ului */}
          <button
            onClick={() => setShowZoom(true)}
            onMouseEnter={() => setIsMagnifierActive(false)} // Dezactivez magnifier-ul când intru pe buton
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              zIndex: 1500, // Mai mare decât magnifier-ul (1000)
              transition: 'all 0.2s ease',
              pointerEvents: 'auto' // Asigur că butonul este clickabil
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(208, 154, 30, 0.9)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'
            }}
          >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              {isMobile ? 'Zoom' : 'Zoom complet'}
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${Math.min(sortedImages.length, 6)}, 1fr)`, 
          gap: 8 
        }}>
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedIndex === index ? '3px solid #9a7b0f' : '1px solid #ddd',
                opacity: selectedIndex === index ? 1 : 0.7,
                background: '#f5f5f5',
                height: 60
              }}
              onClick={() => setSelectedIndex(index)}
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
                  top: 2,
                  left: 2,
                  background: '#9a7b0f',
                  color: 'white',
                  borderRadius: 2,
                  width: 8,
                  height: 8
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
