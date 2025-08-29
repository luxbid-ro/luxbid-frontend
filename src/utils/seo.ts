import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  locale?: string
  siteName?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  price?: {
    amount: string
    currency: string
  }
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order'
  condition?: 'new' | 'refurbished' | 'used'
  brand?: string
  category?: string
}

const defaultConfig = {
  siteName: 'LuxBid',
  locale: 'ro_RO',
  type: 'website' as const,
  image: '/og-default.jpg', // Vom crea imaginea asta
  author: 'LuxBid Team'
}

/**
 * Generează metadata optimizată pentru SEO
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultConfig.image,
    url,
    type = defaultConfig.type,
    locale = defaultConfig.locale,
    siteName = defaultConfig.siteName,
    publishedTime,
    modifiedTime,
    author = defaultConfig.author,
    section,
    price,
    availability,
    condition,
    brand,
    category
  } = config

  const fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`
  const fullUrl = url ? `https://luxbid.ro${url}` : 'https://luxbid.ro'

  // Construiește structura de metadata Next.js 15
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg'
        }
      ],
      locale,
      type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@LuxBidRO',
      site: '@LuxBidRO'
    },

    // JSON-LD structured data pentru produse de lux
    other: {
      // Schema.org Product markup
      ...(type === 'product' && {
        'product:price:amount': price?.amount,
        'product:price:currency': price?.currency,
        'product:availability': availability,
        'product:condition': condition,
        'product:brand': brand,
        'product:category': category
      }),
      
      // Canonical URL
      'canonical': fullUrl,
      
      // Robots directives
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      
      // Additional meta tags
      'theme-color': '#D09A1E',
      'format-detection': 'telephone=no',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default'
    },

    // Icons
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#D09A1E' }
      ]
    },

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION
      }
    }
  }

  return metadata
}

/**
 * Generates structured data (JSON-LD) for luxury products
 */
export function generateProductStructuredData(product: {
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
}) {
  return {
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
    condition: product.condition || 'https://schema.org/UsedCondition',
    image: product.images.slice(0, 5), // Primele 5 imagini
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'RON',
      availability: product.availability || 'https://schema.org/InStock',
      seller: product.seller ? {
        '@type': product.seller.type,
        name: product.seller.name
      } : {
        '@type': 'Organization',
        name: 'LuxBid'
      },
      url: `https://luxbid.ro/oferte/${product.id}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100'
    }
  }
}

/**
 * Generates BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://luxbid.ro${item.url}`
    }))
  }
}

/**
 * Generates Organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LuxBid',
    alternateName: 'LuxBid România',
    url: 'https://luxbid.ro',
    logo: 'https://luxbid.ro/logo.png',
    description: 'Platformă premium pentru listarea și vânzarea obiectelor de lux prin oferte',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressLocality: 'București',
      addressRegion: 'București'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-21-XXX-XXXX',
      contactType: 'Customer Service',
      email: 'contact@luxbid.ro',
      availableLanguage: ['Romanian', 'English']
    },
    sameAs: [
      'https://www.facebook.com/luxbidro',
      'https://www.instagram.com/luxbidro',
      'https://www.linkedin.com/company/luxbid'
    ]
  }
}

/**
 * Optimizes keywords for luxury items
 */
export function generateLuxuryKeywords(category: string, brand?: string, title?: string): string[] {
  const baseKeywords = [
    'obiecte de lux România',
    'vânzare articole premium',
    'cumpărare lux second hand',
    'marketplace lux'
  ]

  const categoryKeywords: Record<string, string[]> = {
    'Ceasuri': [
      'ceasuri de lux',
      'ceasuri premium',
      'Rolex România',
      'Omega ceasuri',
      'ceasuri elveșiene',
      'cronografe lux'
    ],
    'Genți': [
      'genți de lux',
      'genți designer',
      'Hermès România',
      'Louis Vuitton genți',
      'Chanel bags',
      'genți premium second hand'
    ],
    'Bijuterii': [
      'bijuterii de lux',
      'diamante România',
      'aur premium',
      'bijuterii designer',
      'Cartier bijuterii',
      'Tiffany România'
    ]
  }

  let keywords = [...baseKeywords, ...(categoryKeywords[category] || [])]

  if (brand) {
    keywords.push(
      `${brand} România`,
      `${brand} second hand`,
      `${brand} autentice`
    )
  }

  if (title) {
    // Extract specific model or type from title
    const words = title.toLowerCase().split(' ')
    keywords.push(...words.filter(word => word.length > 3))
  }

  return keywords.slice(0, 15) // Limit la 15 keywords
}

/**
 * Creates SEO-friendly URL slug
 */
export function createSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .slice(0, 60) // Limit length
}

/**
 * Validates and optimizes meta description
 */
export function optimizeMetaDescription(description: string): string {
  if (!description) return ''
  
  // Limit to 155 characters for optimal SEO
  if (description.length <= 155) return description
  
  // Find last complete sentence within limit
  const truncated = description.substring(0, 155)
  const lastSentence = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')
  
  const cutoff = lastSentence > 100 ? lastSentence + 1 : lastSpace
  
  return description.substring(0, cutoff) + '...'
}
