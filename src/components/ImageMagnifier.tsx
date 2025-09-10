'use client'
import React, { useState, useRef, useEffect } from 'react'

interface ImageMagnifierProps {
  src: string
  alt: string
  width?: number
  height?: number
  magnifierSize?: number
  zoomLevel?: number
  className?: string
  style?: React.CSSProperties
  enableMobile?: boolean
  onImageClick?: () => void
  onMagnifierStateChange?: (isActive: boolean) => void
}

export default function ImageMagnifier({
  src,
  alt,
  width = 400,
  height = 400,
  magnifierSize = 200,
  zoomLevel = 2.5,
  className = '',
  style = {},
  enableMobile = false,
  onImageClick,
  onMagnifierStateChange
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detectez dacă este mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }

    const updateImagePosition = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        setImgPosition({ x: rect.left, y: rect.top })
      }
    }

    checkMobile()
    updateImagePosition()
    
    window.addEventListener('scroll', updateImagePosition)
    window.addEventListener('resize', () => {
      checkMobile()
      updateImagePosition()
    })

    return () => {
      window.removeEventListener('scroll', updateImagePosition)
      window.removeEventListener('resize', updateImagePosition)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Verific dacă mouse-ul este în interiorul imaginii
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setShowMagnifier(false)
      onMagnifierStateChange?.(false)
      return
    }

    // Actualizez pozitiile în timp real
    setImgPosition({ x: rect.left, y: rect.top })
    setMousePosition({ x, y })

    // Calculez pozitia magnifier-ului cu offset pentru a evita overlapping
    let magnifierX = e.clientX + 20
    let magnifierY = e.clientY - magnifierSize / 2

    // Verific marginile ecranului și ajustez poziția
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (magnifierX + magnifierSize > windowWidth) {
      magnifierX = e.clientX - magnifierSize - 20
    }
    if (magnifierY < 0) {
      magnifierY = 10
    }
    if (magnifierY + magnifierSize > windowHeight) {
      magnifierY = windowHeight - magnifierSize - 10
    }

    setMagnifierPosition({ x: magnifierX, y: magnifierY })
    setShowMagnifier(true)
    onMagnifierStateChange?.(true)
  }

  const handleMouseEnter = () => {
    // Nu activez magnifier-ul automat la enter, doar la mousemove
    // Aceasta previne activarea când mouse-ul intră din zona butonului
  }

  const handleMouseLeave = () => {
    setShowMagnifier(false)
    onMagnifierStateChange?.(false)
  }

  const handleImageClick = () => {
    onImageClick?.()
  }

  // Pentru touch pe mobile (dacă este activat)
  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!enableMobile || !imageRef.current) return

    const touch = e.touches[0]
    const rect = imageRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setShowMagnifier(false)
      return
    }

    let magnifierX = touch.clientX + 20
    let magnifierY = touch.clientY - magnifierSize / 2

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (magnifierX + magnifierSize > windowWidth) {
      magnifierX = touch.clientX - magnifierSize - 20
    }
    if (magnifierY < 0) {
      magnifierY = 10
    }
    if (magnifierY + magnifierSize > windowHeight) {
      magnifierY = windowHeight - magnifierSize - 10
    }

    setMagnifierPosition({ x: magnifierX, y: magnifierY })
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        position: 'relative', 
        display: 'inline-block',
        cursor: showMagnifier ? 'none' : 'zoom-in',
        ...style 
      }}
      onMouseLeave={() => {
        setShowMagnifier(false)
        onMagnifierStateChange?.(false)
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
        onTouchStart={enableMobile ? handleMouseEnter : undefined}
        onTouchMove={enableMobile ? handleTouchMove : undefined}
        onTouchEnd={enableMobile ? handleMouseLeave : undefined}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: '12px',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />

      {/* Magnifier Circle */}
      {showMagnifier && (
        <div
          style={{
            position: 'fixed',
            left: `${magnifierPosition.x}px`,
            top: `${magnifierPosition.y}px`,
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            border: '3px solid #D09A1E',
            borderRadius: '50%',
            background: '#fff',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${(imageRef.current?.offsetWidth || width) * zoomLevel}px ${(imageRef.current?.offsetHeight || height) * zoomLevel}px`,
            backgroundPosition: `
              -${(mousePosition.x * zoomLevel) - magnifierSize / 2}px 
              -${(mousePosition.y * zoomLevel) - magnifierSize / 2}px
            `,
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animation: 'magnifierFadeIn 0.2s ease-out'
          }}
        />
      )}

      {/* Crosshair */}
      {showMagnifier && (
        <div
          style={{
            position: 'fixed',
            left: `${magnifierPosition.x + magnifierSize / 2}px`,
            top: `${magnifierPosition.y + magnifierSize / 2}px`,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1001
          }}
        >
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            width: '1px',
            height: '20px',
            background: '#D09A1E',
            transform: 'translateX(-50%)'
          }} />
          {/* Horizontal line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            height: '1px',
            width: '20px',
            background: '#D09A1E',
            transform: 'translateY(-50%)'
          }} />
        </div>
      )}

      {/* Hover overlay hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          opacity: showMagnifier ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)'
        }}
      >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              Treci cu mouse-ul pentru zoom
      </div>

      <style jsx>{`
        @keyframes magnifierFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
