'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onClick?: () => void
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  fallbackSrc?: string
}

/**
 * Componenta optimizată pentru imagini cu fallback automat
 * Folosește next/image pentru performanță optimă
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onError,
  onClick,
  objectFit = 'cover',
  fallbackSrc
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
    onError?.(e)
  }

  // Generate a simple blur placeholder
  const generateBlurPlaceholder = (w: number = 10, h: number = 10): string => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
      </svg>`
    )}`
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    style: {
      ...style,
      objectFit,
    },
    quality,
    placeholder: placeholder === 'blur' ? 'blur' as const : 'empty' as const,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? generateBlurPlaceholder() : undefined),
    priority,
    sizes,
    onError: handleError,
    onClick,
  }

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    )
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    )
  }

  // Fallback pentru cazuri speciale
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        {...imageProps}
        fill
        style={{
          ...style,
          objectFit,
        }}
      />
    </div>
  )
}

/**
 * Hook pentru generarea placeholder-urilor bazate pe categorie
 */
export function useCategoryPlaceholder() {
  const getRandomPlaceholder = (category?: string): string => {
    const placeholders = {
      'Ceasuri': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1509048191080-d2b4cAGBVDE9?w=400&h=400&fit=crop&crop=center'
      ],
      'Genți': [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1544824724-c82dcf7c5a0f?w=400&h=400&fit=crop&crop=center'
      ],
      'Bijuterii': [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center'
      ],
      'default': [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center'
      ]
    }

    const categoryImages = placeholders[category as keyof typeof placeholders] || placeholders.default
    return categoryImages[Math.floor(Math.random() * categoryImages.length)]
  }

  return { getRandomPlaceholder }
}

/**
 * Componenta pentru imagini de listing cu optimizări specifice
 */
interface ListingImageProps {
  src?: string | null
  alt: string
  category?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function ListingImage({ 
  src, 
  alt, 
  category, 
  width = 400, 
  height = 400, 
  priority = false,
  className = '',
  style = {},
  onClick 
}: ListingImageProps) {
  const { getRandomPlaceholder } = useCategoryPlaceholder()
  
  return (
    <OptimizedImage
      src={src || getRandomPlaceholder(category)}
      alt={alt}
      width={width}
      height={height}
      fallbackSrc={getRandomPlaceholder(category)}
      priority={priority}
      placeholder="blur"
      quality={90}
      className={className}
      style={style}
      onClick={onClick}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
    />
  )
}

/**
 * Componenta pentru imagini în galerie cu lazy loading
 */
interface GalleryImageProps {
  src: string
  alt: string
  isActive?: boolean
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export function GalleryImage({ 
  src, 
  alt, 
  isActive = false, 
  onClick, 
  className = '',
  style = {} 
}: GalleryImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={400}
      priority={isActive} // Prioritize doar imaginea activă
      placeholder="blur"
      quality={85}
      className={className}
      style={style}
      onClick={onClick}
      sizes="400px"
    />
  )
}
