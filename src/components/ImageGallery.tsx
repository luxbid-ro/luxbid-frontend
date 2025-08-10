'use client'
import React, { useState } from 'react'

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
        <div style={{ fontSize: '3em', marginBottom: 15, opacity: 0.5 }}>📷</div>
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
      {/* Imaginea principală */}
      <div style={{ marginBottom: 15 }}>
        <div 
          style={{ 
            position: 'relative', 
            borderRadius: 12, 
            overflow: 'hidden',
            cursor: 'zoom-in',
            background: '#f5f5f5'
          }}
          onClick={() => setShowZoom(true)}
        >
          <img
            src={currentImage.imageUrl}
            alt={`Imagine ${selectedIndex + 1}`}
            style={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              display: 'block'
            }}
          />
          {currentImage.isPrimary && (
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#9a7b0f',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: '0.8em',
              fontWeight: 600
            }}>
              PRINCIPALĂ
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: '0.8em'
          }}>
            🔍 Click pentru zoom
          </div>
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
                opacity: selectedIndex === index ? 1 : 0.7
              }}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: 60,
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
