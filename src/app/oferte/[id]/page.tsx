'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { LazyImageGallery } from '@/components/LazyComponents'
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData'
import { generateSEOMetadata } from '@/utils/seo'
import { usePriceAlerts } from '@/hooks/usePriceAlerts'

export default function ListingDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [listing, setListing] = useState<any>(null)
  const [offers, setOffers] = useState<any[]>([])
  const [images, setImages] = useState<any[]>([])
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('RON')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [showPriceAlertForm, setShowPriceAlertForm] = useState(false)
  const [priceAlertTarget, setPriceAlertTarget] = useState('')
  
  // Price Alerts hook
  const { createAlert, hasAlertForListing, getAlertForListing } = usePriceAlerts()

  useEffect(() => {
    // Detectez dacă este mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const fetchData = async () => {
      if (!id) return
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      
      try {
        console.log(`🔗 Fetching listing from: ${base}/listings/${id}`)
        
        // Optimized listing fetch with smart caching
        const listingRes = await fetch(`${base}/listings/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300', // 5 minute cache
          },
          next: { revalidate: 300 }, // Next.js cache
          mode: 'cors',
          credentials: 'omit'
        })
        
        console.log(`📊 Response status: ${listingRes.status} ${listingRes.statusText}`)
        console.log(`📥 Response headers:`, Object.fromEntries(listingRes.headers.entries()))
        
        let listingData = null
        if (listingRes.ok) {
          const responseText = await listingRes.text()
          console.log(`📄 Raw response:`, responseText)
          
          if (responseText.trim()) {
            try {
              listingData = JSON.parse(responseText)
              console.log(`✅ Listing data received:`, listingData)
              setListing(listingData)
            } catch (jsonError) {
              console.error(`❌ JSON Parse Error:`, jsonError)
              console.error(`❌ Invalid JSON response:`, responseText)
              setListing(null)
            }
          } else {
            console.error(`📭 Empty response body`)
            setListing(null)
          }
        } else {
          console.error(`💥 HTTP Error: ${listingRes.status} - ${listingRes.statusText}`)
          const errorText = await listingRes.text()
          console.error(`📄 Error response body:`, errorText)
          setListing(null)
        }
      
        // Check if current user is the owner
        const token = localStorage.getItem('luxbid_token')
        if (token && listingData) {
          try {
            const userRes = await fetch(`${base}/users/me?t=${Date.now()}`, {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
              },
              mode: 'cors'
            })
            if (userRes.ok) {
              const userData = await userRes.json()
              setIsOwner(userData.id === listingData.sellerId)
            }
          } catch (e) {
            console.error('Error checking ownership:', e)
          }
        }
      
      // Use images from listing data or fallback to backend upload endpoint
      if (listingData && listingData.images && listingData.images.length > 0) {
        // Convert string array to ImageGallery format
        const formattedImages = listingData.images.map((url: string, index: number) => ({
          id: `${id}-${index}`,
          imageUrl: url,
          isPrimary: index === 0
        }))
        setImages(formattedImages)
      } else {
        // Fallback: try to fetch from upload endpoint
        try {
          const headers: any = {}
          if (token) {
            headers.Authorization = `Bearer ${token}`
          }
          const imagesRes = await fetch(`${base}/upload/images/${id}`, { 
            headers: {
              ...headers,
              'Cache-Control': 'public, max-age=600' // 10 minute cache for images
            },
            next: { revalidate: 600 },
            mode: 'cors'
          })
          if (imagesRes.ok) {
            const imagesData = await imagesRes.json()
            // Convert to ImageGallery format
            const formattedImages = imagesData.map((url: string, index: number) => ({
              id: `${id}-upload-${index}`,
              imageUrl: url,
              isPrimary: index === 0
            }))
            setImages(formattedImages)
          }
        } catch (e) {
          console.error('Error fetching images:', e)
        }
      }

      // Fetch offers if user is owner
      if (token && listingData) {
        try {
          const offersRes = await fetch(`${base}/offers/listing/${id}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'public, max-age=60' // 1 minute cache for offers (more dynamic)
            },
            next: { revalidate: 60 },
            mode: 'cors'
          })
          if (offersRes.ok) {
            const offersData = await offersRes.json()
            setOffers(offersData)
          }
        } catch (e) {
          console.error('Error fetching offers:', e)
        }
      }
      } catch (fetchError: any) {
        console.error(`💥 Network/Fetch Error:`, fetchError)
        console.error(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> Error name: ${fetchError?.name}`)
        console.error(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> Error message: ${fetchError?.message}`)
        console.error(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> Error stack:`, fetchError?.stack)
        setListing(null)
      }
    }
    fetchData()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [id])

  const makeOffer = async () => {
    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return (window.location.href = '/auth/login')
      
      setLoading(true)
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      const res = await fetch(`${base}/offers`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        mode: 'cors',
        body: JSON.stringify({ listingId: id, amount: Number(amount), currency }),
      })
      
      if (res.ok) {
        setMessage('Oferta a fost trimisă!')
        setAmount('')
        // Refresh offers if user is owner
        if (isOwner) {
          const offersRes = await fetch(`${base}/offers/listing/${id}?t=${Date.now()}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache'
            },
            mode: 'cors'
          })
          if (offersRes.ok) {
            setOffers(await offersRes.json())
          }
        }
      } else {
        setMessage('Eroare la trimiterea ofertei')
      }
    } catch (e) {
      setMessage('Eroare la trimiterea ofertei')
    } finally {
      setLoading(false)
    }
  }

  const acceptOffer = async (offerId: string) => {
    try {
      const token = localStorage.getItem('luxbid_token')
      if (!token) return
      
      setLoading(true)
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      const res = await fetch(`${base}/offers/${offerId}/accept`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        mode: 'cors'
      })
      
      if (res.ok) {
        setMessage('Oferta a fost acceptată!')
        // Refresh offers
        const offersRes = await fetch(`${base}/offers/listing/${id}?t=${Date.now()}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          },
          mode: 'cors'
        })
        if (offersRes.ok) {
          setOffers(await offersRes.json())
        }
      } else {
        setMessage('Eroare la acceptarea ofertei')
      }
    } catch (e) {
      setMessage('Eroare la acceptarea ofertei')
    } finally {
      setLoading(false)
    }
  }

  // Create price alert
  const handleCreatePriceAlert = () => {
    if (!priceAlertTarget || !listing) return
    
    const targetPrice = parseFloat(priceAlertTarget)
    const currentPrice = listing.desiredPrice || listing.price || 0
    
    if (targetPrice >= currentPrice) {
      setMessage('Prețul țintă trebuie să fie mai mic decât prețul curent')
      return
    }
    
    createAlert({
      listingId: listing.id,
      listingTitle: listing.title,
      currentPrice,
      targetPrice,
      currency: listing.currency || 'RON',
      category: listing.category,
      brand: listing.brand,
      notificationType: 'both',
      userEmail: localStorage.getItem('luxbid_user_email') || undefined
    })
    
    setMessage('Alertă de preț creată cu succes! Vei fi notificat când prețul va scădea.')
    setShowPriceAlertForm(false)
    setPriceAlertTarget('')
  }

  if (!listing) return <div style={{ padding: 40 }}>Se încarcă...</div>

  return (
    <section className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: isMobile ? 20 : 40, 
          marginBottom: 30 
        }}>
          {/* Coloana imaginilor */}
          <div>
            <LazyImageGallery 
              images={images} 
              listing={listing ? {
                id: listing.id,
                title: listing.title,
                price: listing.desiredPrice || 0,
                currency: listing.currency || 'RON',
                category: listing.category,
                condition: listing.condition,
                brand: listing.brand
              } : undefined}
            />
          </div>
          
          {/* Coloana detaliilor */}
          <div>
            <h2 style={{ marginTop: 0 }}>{listing.title}</h2>
            <p style={{ color: '#666', marginBottom: 20, lineHeight: 1.6 }}>{listing.description}</p>
            <p style={{ color: '#9a7b0f', fontWeight: 700, marginBottom: 10 }}>Categorie: {listing.category}</p>
            
            {/* Preț dorit de vânzător */}
            <div style={{ 
              background: '#faf9f6', 
              border: '2px solid #9a7b0f', 
              borderRadius: 12, 
              padding: 20, 
              marginBottom: 30,
              textAlign: 'center'
            }}>
              <h3 style={{ margin: 0, color: '#9a7b0f', fontSize: '1.2em' }}>Prețul dorit de vânzător</h3>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#9a7b0f', marginTop: 5 }}>
                {listing.desiredPrice?.toLocaleString('ro-RO') || '0'} {listing.currency || 'RON'}
              </div>
              <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '0.9em' }}>
                Poți face orice ofertă - vânzătorul va decide dacă o acceptă
              </p>
            </div>

            {/* Price Alert Section - only for non-owners */}
            {!isOwner && (
              <div style={{ 
                background: '#f8f9fa', 
                border: '2px solid #e9ecef', 
                borderRadius: 12, 
                padding: 20, 
                marginBottom: 30,
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '1.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#D09A1E' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  Alertă de Preț
                </h3>
                
                {hasAlertForListing(listing.id) ? (
                  <div style={{ color: '#28a745', fontSize: '0.9em' }}>
                    ✅ Ai deja un alert activ pentru acest obiect
                    <br />
                    <a href="/price-alerts" style={{ color: '#D09A1E', textDecoration: 'none', fontWeight: '500' }}>
                      Vezi alertele mele →
                    </a>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '0.9em' }}>
                      Primești notificare când prețul scade la nivelul dorit
                    </p>
                    
                    {!showPriceAlertForm ? (
                      <button
                        onClick={() => setShowPriceAlertForm(true)}
                        style={{
                          background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                          color: '#fff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        Creează Alertă de Preț
                      </button>
                    ) : (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <input
                          type="number"
                          placeholder="Preț țintă"
                          value={priceAlertTarget}
                          onChange={(e) => setPriceAlertTarget(e.target.value)}
                          style={{
                            padding: '10px 12px',
                            border: '2px solid #e5e5e5',
                            borderRadius: '8px',
                            fontSize: '14px',
                            width: '120px',
                            outline: 'none'
                          }}
                        />
                        <span style={{ fontSize: '14px', color: '#666' }}>{listing.currency || 'RON'}</span>
                        <button
                          onClick={handleCreatePriceAlert}
                          disabled={!priceAlertTarget}
                          style={{
                            background: 'linear-gradient(135deg, #D09A1E 0%, #B8860B 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            opacity: priceAlertTarget ? 1 : 0.6
                          }}
                        >
                          Creează
                        </button>
                        <button
                          onClick={() => {
                            setShowPriceAlertForm(false)
                            setPriceAlertTarget('')
                          }}
                          style={{
                            background: 'transparent',
                            color: '#666',
                            border: '1px solid #ddd',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          Anulează
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Edit button for owner */}
            {isOwner && (
              <div style={{ marginBottom: 30 }}>
                <a 
                  href={`/dashboard/edit-listing/${listing.id}`}
                  className="btn btn-gold"
                  style={{ 
                    textDecoration: 'none',
                    display: 'inline-block',
                    marginRight: 15
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Editează listarea
                </a>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  Modifică titlul, descrierea, categoria sau prețul
                </span>
              </div>
            )}
        
            {/* Make offer form - only for non-owners */}
            {!isOwner && (
              <div style={{ marginBottom: 40 }}>
                <h3>Fă o ofertă</h3>
                <p style={{ color: '#666', fontSize: '0.9em', marginBottom: 15 }}>
                  Vânzătorul dorește <strong>{listing.desiredPrice?.toLocaleString('ro-RO')} {listing.currency}</strong>, dar poți face orice ofertă.
                </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                type="number"
                step="0.01"
                min="1"
                placeholder="Suma ta"
                value={amount} 
                onChange={(e)=>setAmount(e.target.value)} 
                style={{ 
                  padding: 10, 
                  border: '1px solid #ddd', 
                  borderRadius: 8,
                  width: 150
                }} 
              />
              <select 
                value={currency} 
                onChange={(e)=>setCurrency(e.target.value)} 
                style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
              >
                <option value="RON">RON</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
              <button 
                className='btn btn-gold' 
                onClick={makeOffer}
                disabled={loading || !amount || parseFloat(amount) <= 0}
              >
                {loading ? 'Se trimite...' : 'Fă ofertă'}
              </button>
            </div>
            
            {/* Indicator vizual pentru oferta relativă la prețul dorit */}
            {parseFloat(amount) > 0 && listing.desiredPrice && (
              <div style={{ marginTop: 12, padding: 10, background: '#f9f9f9', borderRadius: 8 }}>
                {parseFloat(amount) >= listing.desiredPrice ? (
                  <p style={{ margin: 0, color: 'green', fontSize: '0.9em' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Oferta ta este egală sau mai mare decât prețul dorit de vânzător
                  </p>
                ) : (
                  <p style={{ margin: 0, color: 'orange', fontSize: '0.9em' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Oferta ta este sub prețul dorit ({((parseFloat(amount) / listing.desiredPrice) * 100).toFixed(0)}% din prețul dorit)
                  </p>
                )}
              </div>
            )}
            {message && <p style={{ marginTop: 12, color: message.includes('Eroare') ? 'red' : 'green' }}>{message}</p>}
          </div>
        )}

        {/* Show offers for owner */}
        {isOwner && (
          <div style={{ marginBottom: 40 }}>
            <h3>Oferte primite ({offers.length})</h3>
            {offers.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>Nu ai primit încă oferte pentru această listare.</p>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {offers.map((offer) => (
                  <div key={offer.id} className="card" style={{ position: 'relative' }}>
                    <h4>Ofertă de {offer.buyer.name || 'Utilizator'}</h4>
                    <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#9a7b0f' }}>
                      {offer.amount} {offer.currency}
                    </p>
                    <p style={{ fontSize: '0.9em', color: '#666' }}>
                      Data: {new Date(offer.createdAt).toLocaleDateString('ro-RO')}
                    </p>
                    {offer.status === 'PENDING' ? (
                      <button 
                        className='btn btn-gold' 
                        onClick={() => acceptOffer(offer.id)}
                        disabled={loading}
                        style={{ marginTop: 10 }}
                      >
                        {loading ? 'Se acceptă...' : 'Acceptă oferta'}
                      </button>
                    ) : (
                      <div style={{ marginTop: 10 }}>
                        <span style={{ 
                          color: offer.status === 'ACCEPTED' ? 'green' : 'red',
                          fontWeight: 'bold',
                          display: 'block',
                          marginBottom: 8
                        }}>
                          {offer.status === 'ACCEPTED' ? (
                            <span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', color: 'green' }}>
                                <path d="M9 12l2 2 4-4"/>
                              </svg>
                              Acceptată
                            </span>
                          ) : (
                            <span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', color: 'red' }}>
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                              Refuzată
                            </span>
                          )}
                        </span>
                        
                        {offer.status === 'ACCEPTED' && (
                          <div style={{ marginTop: '12px', padding: '12px', background: '#e8f5e8', borderRadius: '8px', border: '1px solid #4CAF50' }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#2E7D32', fontWeight: '600' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                              Oferta acceptată! Contactele sunt acum disponibile.
                            </p>
                            <a 
                              href={`/chat/${offer.id}`}
                              className="btn btn-gold"
                              style={{ 
                                fontSize: '14px',
                                padding: '10px 20px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                marginRight: '12px'
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              Deschide Chat Privat
                            </a>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                              </svg>
                              Email: {offer.user?.email || 'Se încarcă...'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {message && <p style={{ marginTop: 12, color: message.includes('Eroare') ? 'red' : 'green' }}>{message}</p>}
          </div>
        )}
          </div>
        </div>
      </div>

      {/* SEO Structured Data */}
      {listing && (
        <>
          <ProductSchema 
            product={{
              id: listing.id,
              title: listing.title,
              description: listing.description,
              price: listing.price,
              currency: listing.currency || 'RON',
              category: listing.category,
              brand: listing.brand,
              condition: listing.condition || 'folosit',
              images: images.map((img: any) => img.imageUrl),
              availability: 'in_stock',
              seller: {
                name: 'LuxBid',
                type: 'Organization'
              }
            }}
          />
          <BreadcrumbSchema 
            items={[
              { name: 'Acasă', url: '/' },
              { name: 'Oferte', url: '/oferte' },
              { name: listing.category, url: `/oferte?category=${encodeURIComponent(listing.category)}` },
              { name: listing.title, url: `/oferte/${listing.id}` }
            ]}
          />
        </>
      )}
    </section>
  )
}
