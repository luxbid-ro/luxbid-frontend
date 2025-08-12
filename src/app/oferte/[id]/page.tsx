'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

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
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      
      try {
        console.log(`🔗 Fetching listing from: ${base}/listings/${id}`)
        
        // Fetch listing details with timeout and cache busting
        const listingRes = await fetch(`${base}/listings/${id}?t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          mode: 'cors',
          credentials: 'omit'
        })
        
        console.log(`📊 Response status: ${listingRes.status} ${listingRes.statusText}`)
        console.log(`📋 Response headers:`, Object.fromEntries(listingRes.headers.entries()))
        
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
            console.error(`❌ Empty response body`)
            setListing(null)
          }
        } else {
          console.error(`❌ HTTP Error: ${listingRes.status} - ${listingRes.statusText}`)
          const errorText = await listingRes.text()
          console.error(`❌ Error response body:`, errorText)
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
          const imagesRes = await fetch(`${base}/upload/images/${id}?t=${Date.now()}`, { 
            headers: {
              ...headers,
              'Cache-Control': 'no-cache'
            },
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
          const offersRes = await fetch(`${base}/offers/listing/${id}?t=${Date.now()}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache'
            },
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
      } catch (fetchError) {
        console.error(`💥 Network/Fetch Error:`, fetchError)
        console.error(`🔧 Error name: ${fetchError.name}`)
        console.error(`🔧 Error message: ${fetchError.message}`)
        console.error(`🔧 Error stack:`, fetchError.stack)
        setListing(null)
      }
    }
    fetchData()
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

  if (!listing) return <div style={{ padding: 40 }}>Se încarcă...</div>

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 30 }}>
          {/* Coloana imaginilor */}
          <div>
            <ImageGallery images={images} />
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
                  ✏️ Editează listarea
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
                    ✅ Oferta ta este egală sau mai mare decât prețul dorit de vânzător
                  </p>
                ) : (
                  <p style={{ margin: 0, color: 'orange', fontSize: '0.9em' }}>
                    💡 Oferta ta este sub prețul dorit ({((parseFloat(amount) / listing.desiredPrice) * 100).toFixed(0)}% din prețul dorit)
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
                          {offer.status === 'ACCEPTED' ? '✓ Acceptată' : '✗ Refuzată'}
                        </span>
                        
                        {offer.status === 'ACCEPTED' && (
                          <div style={{ marginTop: '12px', padding: '12px', background: '#e8f5e8', borderRadius: '8px', border: '1px solid #4CAF50' }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#2E7D32', fontWeight: '600' }}>
                              🎉 Oferta acceptată! Contactele sunt acum disponibile.
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
                              💬 Deschide Chat Privat
                            </a>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                              📧 Email: {offer.user?.email || 'Se încarcă...'}
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
    </section>
  )
}
