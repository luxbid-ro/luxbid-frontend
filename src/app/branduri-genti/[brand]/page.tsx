import BagBrandPageClient from './BagBrandPageClient'

interface Props {
  params: { brand: string }
}

// Server Component for metadata generation
export async function generateMetadata({ params }: Props) {
  const brandName = decodeURIComponent(params.brand)
  
  return {
    title: `${brandName} - Genți de Lux | LuxBid`,
    description: `Descoperă colecția de genți ${brandName} disponibile pe LuxBid. Genți premium ${brandName} pentru pasionații de modă și lux.`,
    keywords: `${brandName}, genți ${brandName}, genți de lux, ${brandName} România, vânzare genți ${brandName}, cumpără ${brandName}`,
    openGraph: {
      title: `${brandName} - Genți de Lux | LuxBid`,
      description: `Descoperă colecția de genți ${brandName} disponibile pe LuxBid`,
      type: 'website',
      url: `https://luxbid.ro/branduri-genti/${encodeURIComponent(brandName)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brandName} - Genți de Lux | LuxBid`,
      description: `Descoperă colecția de genți ${brandName} disponibile pe LuxBid`,
    },
    alternates: {
      canonical: `https://luxbid.ro/branduri-genti/${encodeURIComponent(brandName)}`,
    },
  }
}

// Server Component that renders the Client Component
export default function BagBrandPage({ params }: Props) {
  return <BagBrandPageClient />
}
