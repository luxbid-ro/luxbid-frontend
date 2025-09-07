'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface MarketData {
  totalListings: number
  totalViews: number
  totalOffers: number
  averagePrice: number
  conversionRate: number
  topCategories: Array<{ category: string; count: number; avgPrice: number }>
  priceTrends: Array<{ month: string; avgPrice: number; listings: number }>
  competitorAnalysis: Array<{ platform: string; avgPrice: number; listings: number }>
}

export default function MarketAnalyticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months')

  // Check authentication
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('luxbid_token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    
    setIsAuthenticated(true)
  }, [router])

  // Fetch market data
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchMarketData = async () => {
      setLoading(true)
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockData: MarketData = {
          totalListings: 15420,
          totalViews: 284750,
          totalOffers: 8930,
          averagePrice: 12500,
          conversionRate: 12.5,
          topCategories: [
            { category: 'Ceasuri', count: 4850, avgPrice: 18500 },
            { category: 'Genți', count: 3200, avgPrice: 8500 },
            { category: 'Bijuterii', count: 2800, avgPrice: 12000 },
            { category: 'Artă', count: 2100, avgPrice: 25000 },
            { category: 'Îmbrăcăminte', count: 1800, avgPrice: 3500 },
            { category: 'Încălțăminte', count: 1670, avgPrice: 2800 }
          ],
          priceTrends: [
            { month: 'Ian 2024', avgPrice: 11800, listings: 1200 },
            { month: 'Feb 2024', avgPrice: 12100, listings: 1350 },
            { month: 'Mar 2024', avgPrice: 11900, listings: 1420 },
            { month: 'Apr 2024', avgPrice: 12300, listings: 1580 },
            { month: 'Mai 2024', avgPrice: 12600, listings: 1650 },
            { month: 'Iun 2024', avgPrice: 12500, listings: 1720 }
          ],
          competitorAnalysis: [
            { platform: 'LuxBid', avgPrice: 12500, listings: 15420 },
            { platform: 'OLX Lux', avgPrice: 11800, listings: 8900 },
            { platform: 'eMAG Marketplace', avgPrice: 13200, listings: 5600 },
            { platform: 'Facebook Marketplace', avgPrice: 9800, listings: 12300 }
          ]
        }
        
        setMarketData(mockData)
      } catch (error) {
        console.error('Error fetching market data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [isAuthenticated, selectedCategory, selectedTimeframe])

  if (isAuthenticated === null || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #D09A1E',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Se încarcă analiza pieței...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!marketData) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'red' }}>
          <h2>Eroare la încărcarea datelor</h2>
          <p>Te rugăm să încerci din nou mai târziu.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#D09A1E' }}>
              <path d="M3 3v18h18"/>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
            </svg>
            Analiza Pieței de Lux
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px' }}>
            Insights și statistici pentru a-ți optimiza strategia de vânzare pe platforma LuxBid
          </p>
        </div>

        {/* Filters */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Categorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
                minWidth: '150px'
              }}
            >
              <option value="all">Toate categoriile</option>
              <option value="ceasuri">Ceasuri</option>
              <option value="genti">Genți</option>
              <option value="bijuterii">Bijuterii</option>
              <option value="arta">Artă</option>
              <option value="imbracaminte">Îmbrăcăminte</option>
              <option value="incaltaminte">Încălțăminte</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Perioada
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
                minWidth: '150px'
              }}
            >
              <option value="1month">Ultima lună</option>
              <option value="3months">Ultimele 3 luni</option>
              <option value="6months">Ultimele 6 luni</option>
              <option value="1year">Ultimul an</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#D09A1E', marginBottom: '8px' }}>
              {marketData.totalListings.toLocaleString('ro-RO')}
            </div>
            <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Total Anunțuri</div>
            <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
              ↗️ +12% față de luna trecută
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#28a745', marginBottom: '8px' }}>
              {marketData.totalViews.toLocaleString('ro-RO')}
            </div>
            <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Total Vizualizări</div>
            <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
              ↗️ +8% față de luna trecută
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#6f42c1', marginBottom: '8px' }}>
              {marketData.totalOffers.toLocaleString('ro-RO')}
            </div>
            <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Total Oferte</div>
            <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
              ↗️ +15% față de luna trecută
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc3545', marginBottom: '8px' }}>
              {marketData.averagePrice.toLocaleString('ro-RO')} €
            </div>
            <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Preț Mediu</div>
            <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
              ↗️ +5% față de luna trecută
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#17a2b8', marginBottom: '8px' }}>
              {marketData.conversionRate}%
            </div>
            <div style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Rata Conversie</div>
            <div style={{ fontSize: '14px', color: '#28a745', marginTop: '8px' }}>
              ↗️ +2% față de luna trecută
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          
          {/* Top Categories */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
              Top Categorii
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {marketData.topCategories.map((category, index) => (
                <div key={category.category} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: `linear-gradient(135deg, ${['#D09A1E', '#28a745', '#6f42c1', '#dc3545', '#17a2b8', '#ffc107'][index]} 0%, ${['#B8860B', '#20c997', '#5a32a3', '#c82333', '#138496', '#e0a800'][index]} 100%)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      {category.category}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {category.count.toLocaleString('ro-RO')} anunțuri • Preț mediu: {category.avgPrice.toLocaleString('ro-RO')} €
                    </div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#D09A1E' }}>
                    {((category.count / marketData.totalListings) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Trends */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>
              Evoluția Prețurilor
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {marketData.priceTrends.map((trend, index) => (
                <div key={trend.month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#666', minWidth: '80px' }}>
                    {trend.month}
                  </div>
                  <div style={{ flex: 1, margin: '0 16px' }}>
                    <div style={{
                      height: '8px',
                      background: 'linear-gradient(90deg, #D09A1E 0%, #B8860B 100%)',
                      borderRadius: '4px',
                      width: `${(trend.avgPrice / 13000) * 100}%`
                    }}></div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', minWidth: '80px', textAlign: 'right' }}>
                    {trend.avgPrice.toLocaleString('ro-RO')} €
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px' }}>
            Analiza Concurenței
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {marketData.competitorAnalysis.map((competitor, index) => (
              <div key={competitor.platform} style={{
                border: competitor.platform === 'LuxBid' ? '2px solid #D09A1E' : '2px solid #e5e5e5',
                borderRadius: '12px',
                padding: '20px',
                background: competitor.platform === 'LuxBid' ? '#faf9f6' : '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: competitor.platform === 'LuxBid' ? 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)' : '#f0f0f0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: competitor.platform === 'LuxBid' ? '#fff' : '#666',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {competitor.platform === 'LuxBid' ? 'LB' : competitor.platform.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                      {competitor.platform}
                    </div>
                    {competitor.platform === 'LuxBid' && (
                      <div style={{ fontSize: '12px', color: '#D09A1E', fontWeight: '500' }}>
                        Platforma ta
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Preț Mediu</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
                    {competitor.avgPrice.toLocaleString('ro-RO')} €
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Anunțuri</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                    {competitor.listings.toLocaleString('ro-RO')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div style={{
          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#fff',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
            Insights și Recomandări
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                📈 Oportunități de Creștere
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '8px' }}>• Categoria "Artă" are cel mai mare preț mediu (25,000 €)</li>
                <li style={{ marginBottom: '8px' }}>• Ceasurile premium au cea mai mare cerere</li>
                <li style={{ marginBottom: '8px' }}>• Rata de conversie este în creștere (+2%)</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                🎯 Strategii de Preț
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '8px' }}>• Prețurile sunt în creștere cu 5% lunar</li>
                <li style={{ marginBottom: '8px' }}>• LuxBid are prețuri competitive față de concurență</li>
                <li style={{ marginBottom: '8px' }}>• Optimizează descrierile pentru mai multe vizualizări</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                💡 Recomandări Specifice
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '8px' }}>• Folosește fotografii de calitate înaltă</li>
                <li style={{ marginBottom: '8px' }}>• Activează notificările pentru oferte noi</li>
                <li style={{ marginBottom: '8px' }}>• Răspunde rapid la mesaje pentru conversii mai mari</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
            Gata să Optimizezi Vânzările?
          </h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Folosește aceste insights pentru a-ți îmbunătăți strategia de vânzare și a crește conversiile.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Dashboard Vânzări
            </button>
            <button
              onClick={() => router.push('/oferte')}
              style={{
                background: 'transparent',
                color: '#D09A1E',
                border: '2px solid #D09A1E',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Vezi Ofertele
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
