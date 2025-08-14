import BrandPageClient from './BrandPageClient'
import './brand-styles.css'

interface Props {
  params: { brand: string }
}

// Server Component for metadata generation
export async function generateMetadata({ params }: Props) {
  const brandName = decodeURIComponent(params.brand)
  
  return {
    title: `${brandName} - Ceasuri de Lux | LuxBid`,
    description: `Descoperă colecția de ceasuri ${brandName} disponibile pe LuxBid. Ceasuri premium ${brandName} pentru colecționari și iubitori de lux.`,
    keywords: `${brandName}, ceasuri ${brandName}, ceasuri de lux, ${brandName} România, vânzare ceasuri ${brandName}, cumpără ${brandName}`,
    openGraph: {
      title: `${brandName} - Ceasuri de Lux | LuxBid`,
      description: `Descoperă colecția de ceasuri ${brandName} disponibile pe LuxBid`,
      type: 'website',
      url: `https://luxbid.ro/branduri/${encodeURIComponent(brandName)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brandName} - Ceasuri de Lux | LuxBid`,
      description: `Descoperă colecția de ceasuri ${brandName} disponibile pe LuxBid`,
    },
    alternates: {
      canonical: `https://luxbid.ro/branduri/${encodeURIComponent(brandName)}`,
    },
  }
}

// Server Component that renders the Client Component
export default function BrandPage({ params }: Props) {
  return <BrandPageClient />
}


