import JewelryBrandPageClient from './JewelryBrandPageClient'

interface Props {
  params: { brand: string }
}

// Server Component for metadata generation
export async function generateMetadata({ params }: Props) {
  const brandName = decodeURIComponent(params.brand)
  
  return {
    title: `${brandName} - Bijuterii de Lux | LuxBid`,
    description: `Descoperă colecția de bijuterii ${brandName} disponibile pe LuxBid. Bijuterii premium ${brandName} pentru colecționari și iubitori de lux.`,
    keywords: `${brandName}, bijuterii ${brandName}, bijuterii de lux, ${brandName} România, vânzare bijuterii ${brandName}, cumpără ${brandName}`,
    openGraph: {
      title: `${brandName} - Bijuterii de Lux | LuxBid`,
      description: `Descoperă colecția de bijuterii ${brandName} disponibile pe LuxBid`,
      type: 'website',
      url: `https://luxbid.ro/branduri-bijuterii/${encodeURIComponent(brandName)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brandName} - Bijuterii de Lux | LuxBid`,
      description: `Descoperă colecția de bijuterii ${brandName} disponibile pe LuxBid`,
    },
    alternates: {
      canonical: `https://luxbid.ro/branduri-bijuterii/${encodeURIComponent(brandName)}`,
    },
  }
}

// Server Component that renders the Client Component
export default function JewelryBrandPage({ params }: Props) {
  return <JewelryBrandPageClient />
}
