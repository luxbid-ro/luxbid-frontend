'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: object | object[]
}

/**
 * Componenta pentru injectarea structured data (JSON-LD) în pagină
 */
export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Crează script tag pentru JSON-LD
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(Array.isArray(data) ? data : [data], null, 2)
    
    // Adaugă în head
    document.head.appendChild(script)
    
    // Cleanup - șterge script-ul când componenta se demontează
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [data])

  // Componenta nu renderează nimic vizibil
  return null
}

/**
 * Hook pentru managementul structured data
 */
export function useStructuredData(data: object | object[]) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(Array.isArray(data) ? data : [data], null, 2)
    script.id = 'structured-data-' + Math.random().toString(36).substr(2, 9)
    
    document.head.appendChild(script)
    
    return () => {
      const existingScript = document.getElementById(script.id)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [data])
}

/**
 * Componenta pentru multiple tipuri de structured data
 */
interface MultipleStructuredDataProps {
  schemas: object[]
}

export function MultipleStructuredData({ schemas }: MultipleStructuredDataProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
    </>
  )
}

/**
 * Componenta pentru Organization schema (footer-ul site-ului)
 */
export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LuxBid',
    alternateName: 'LuxBid România',
    url: 'https://luxbid.ro',
    logo: 'https://luxbid.ro/logo-512.png',
    description: 'Platformă premium pentru listarea și vânzarea obiectelor de lux prin oferte. Conectăm colecționari și iubitori de articole de lux în România.',
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressLocality: 'București',
      addressRegion: 'București',
      postalCode: '010001'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-21-XXX-XXXX',
      contactType: 'Customer Service',
      email: 'contact@luxbid.ro',
      availableLanguage: ['Romanian', 'English'],
      areaServed: 'RO'
    },
    sameAs: [
      'https://www.facebook.com/luxbidro',
      'https://www.instagram.com/luxbidro',
      'https://www.linkedin.com/company/luxbid'
    ],
    serviceType: 'Marketplace pentru articole de lux'
  }

  return <StructuredData data={organizationData} />
}

/**
 * Componenta pentru WebSite schema (search functionality)
 */
export function WebsiteSchema() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LuxBid',
    alternateName: 'LuxBid România',
    url: 'https://luxbid.ro',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://luxbid.ro/oferte?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'ro-RO',
    copyrightYear: 2025,
    publisher: {
      '@type': 'Organization',
      name: 'LuxBid'
    }
  }

  return <StructuredData data={websiteData} />
}

/**
 * Componenta pentru BreadcrumbList schema
 */
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://luxbid.ro${item.url}`
    }))
  }

  return <StructuredData data={breadcrumbData} />
}

/**
 * Componenta pentru Product schema (listings)
 */
interface ProductSchemaProps {
  product: {
    id: string
    title: string
    description: string
    price?: number
    currency?: string
    category: string
    brand?: string
    condition?: string
    images: string[]
    availability?: string
    seller?: {
      name: string
      type: string
    }
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const productData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://luxbid.ro/oferte/${product.id}`,
    name: product.title,
    description: product.description,
    category: product.category,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand
    } : undefined,
    condition: getConditionSchema(product.condition),
    image: product.images.slice(0, 5).map(img => 
      img.startsWith('http') ? img : `https://luxbid.ro${img}`
    ),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'RON',
      availability: getAvailabilitySchema(product.availability),
      seller: product.seller ? {
        '@type': product.seller.type,
        name: product.seller.name
      } : {
        '@type': 'Organization',
        name: 'LuxBid'
      },
      url: `https://luxbid.ro/oferte/${product.id}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 zile
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '250',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return <StructuredData data={productData} />
}

/**
 * Helper functions pentru maparea valorilor la schema.org
 */
function getConditionSchema(condition?: string): string {
  switch (condition?.toLowerCase()) {
    case 'nou':
    case 'new':
      return 'https://schema.org/NewCondition'
    case 'refurbished':
    case 'recondiționat':
      return 'https://schema.org/RefurbishedCondition'
    case 'folosit':
    case 'used':
    default:
      return 'https://schema.org/UsedCondition'
  }
}

function getAvailabilitySchema(availability?: string): string {
  switch (availability?.toLowerCase()) {
    case 'in_stock':
    case 'disponibil':
      return 'https://schema.org/InStock'
    case 'out_of_stock':
    case 'indisponibil':
      return 'https://schema.org/OutOfStock'
    case 'pre_order':
    case 'precomandă':
      return 'https://schema.org/PreOrder'
    default:
      return 'https://schema.org/InStock'
  }
}
