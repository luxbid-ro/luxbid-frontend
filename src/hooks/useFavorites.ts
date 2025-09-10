import { useState, useEffect, useCallback } from 'react'
import { useCacheInvalidation } from './useCacheInvalidation'

export interface FavoriteListing {
  id: string
  title: string
  price: number
  currency: string
  images: string[]
  location: string
  createdAt: string
  category: string
  condition: string
  brand?: string
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteListing[]>([])
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  
  // Cache invalidation pentru favorites
  const { invalidateAPICache } = useCacheInvalidation()

  // Validate favorites against backend to remove deleted listings
  const validateFavorites = useCallback(async (favoritesToValidate: FavoriteListing[]) => {
    try {
      if (favoritesToValidate.length === 0) return favoritesToValidate

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'
      
      // Check each favorite listing to see if it still exists
      const validatedFavorites: FavoriteListing[] = []
      const orphanedIds: string[] = []

      for (const favorite of favoritesToValidate) {
        try {
          const response = await fetch(`${apiBaseUrl}/listings/${favorite.id}`)
          if (response.ok) {
            const listing = await response.json()
            // Check if listing is still active (not deleted)
            if (listing && listing.status !== 'REMOVED') {
              validatedFavorites.push(favorite)
            } else {
              orphanedIds.push(favorite.id)
              console.log(`🧹 Removing deleted/inactive listing from favorites: ${favorite.title}`)
            }
          } else if (response.status === 404) {
            // Listing doesn't exist anymore
            orphanedIds.push(favorite.id)
            console.log(`🧹 Removing deleted listing from favorites: ${favorite.title}`)
          } else {
            // Keep the favorite if we can't verify (network issues, etc.)
            validatedFavorites.push(favorite)
          }
        } catch (error) {
          // Keep the favorite if there's a network error
          console.warn(`⚠️ Could not validate favorite ${favorite.id}:`, error)
          validatedFavorites.push(favorite)
        }
      }

      // If we found orphaned favorites, clean them up
      if (orphanedIds.length > 0) {
        console.log(`🧹 Cleaned up ${orphanedIds.length} orphaned favorites`)
        const cleanedFavoriteIds = new Set(favoriteIds)
        orphanedIds.forEach(id => cleanedFavoriteIds.delete(id))
        
        // Update storage with cleaned favorites
        saveFavorites(validatedFavorites, cleanedFavoriteIds)
      }

      return validatedFavorites
    } catch (error) {
      console.error('❌ Error validating favorites:', error)
      // Return original favorites if validation fails
      return favoritesToValidate
    }
  }, [favoriteIds])

  const getStorageKey = (suffix: string) => {
    if (typeof window === 'undefined') return `luxbid_${suffix}_server`
    
    const token = localStorage.getItem('luxbid_token')
    const userId = token ? token.substring(0, 8) : 'guest'
    return `luxbid_${suffix}_${userId}`
  }

  // Load favorites from localStorage (SSR safe)
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false)
          return
        }

        const savedFavorites = localStorage.getItem(getStorageKey('favorites'))
        const savedFavoriteIds = localStorage.getItem(getStorageKey('favorite_ids'))

        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites)
          setFavorites(parsedFavorites)
          
          // Always validate favorites against backend (seamless cleanup)
          console.log('🔍 Auto-validating favorites for deleted listings...')
          validateFavorites(parsedFavorites).then(validatedFavorites => {
            if (validatedFavorites.length !== parsedFavorites.length) {
              console.log(`🧹 Auto-cleaned favorites: ${parsedFavorites.length} → ${validatedFavorites.length}`)
              setFavorites(validatedFavorites)
            } else {
              console.log('✅ All favorites are valid')
            }
          }).catch(error => {
            console.warn('⚠️ Favorites validation failed:', error)
          })
        }

        if (savedFavoriteIds) {
          const parsedIds = JSON.parse(savedFavoriteIds)
          setFavoriteIds(new Set(parsedIds))
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
        setFavorites([])
        setFavoriteIds(new Set())
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [validateFavorites])

  // Periodic validation of favorites (every 5 minutes when tab is active)
  useEffect(() => {
    if (typeof window === 'undefined' || favorites.length === 0) return

    const interval = setInterval(() => {
      if (!document.hidden && favorites.length > 0) {
        console.log('🔄 Periodic favorites validation...')
        validateFavorites(favorites).then(validatedFavorites => {
          if (validatedFavorites.length !== favorites.length) {
            console.log(`🧹 Periodic cleanup: ${favorites.length} → ${validatedFavorites.length}`)
            setFavorites(validatedFavorites)
          }
        }).catch(error => {
          console.warn('⚠️ Periodic validation failed:', error)
        })
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [favorites, validateFavorites])

  // Save favorites to localStorage (SSR safe)
  const saveFavorites = useCallback((newFavorites: FavoriteListing[], newFavoriteIds: Set<string>) => {
    try {
      if (typeof window === 'undefined') return

      localStorage.setItem(getStorageKey('favorites'), JSON.stringify(newFavorites))
      localStorage.setItem(getStorageKey('favorite_ids'), JSON.stringify(Array.from(newFavoriteIds)))
      setFavorites(newFavorites)
      setFavoriteIds(newFavoriteIds)
      
      // 🚀 PROFESSIONAL: Invalidare cache pentru favorites
      invalidateAPICache('/favorites')
    } catch (error) {
      console.error('Error saving favorites:', error)
    }
  }, [invalidateAPICache])

  // Add to favorites
  const addToFavorites = useCallback((listing: FavoriteListing) => {
    const newFavorites = [...favorites, listing]
    const newFavoriteIds = new Set(favoriteIds)
    newFavoriteIds.add(listing.id)

    saveFavorites(newFavorites, newFavoriteIds)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'favorite', {
        event_category: 'engagement',
        event_label: listing.id,
        custom_parameter_1: listing.category,
        custom_parameter_2: listing.brand || 'unknown'
      })
    }

    return true
  }, [favorites, favoriteIds, saveFavorites])

  // Remove from favorites
  const removeFromFavorites = useCallback((listingId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== listingId)
    const newFavoriteIds = new Set(favoriteIds)
    newFavoriteIds.delete(listingId)

    saveFavorites(newFavorites, newFavoriteIds)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'unfavorite', {
        event_category: 'engagement',
        event_label: listingId
      })
    }

    return true
  }, [favorites, favoriteIds, saveFavorites])

  // Check if listing is favorite
  const isFavorite = useCallback((listingId: string) => {
    return favoriteIds.has(listingId)
  }, [favoriteIds])

  // Toggle favorite status
  const toggleFavorite = useCallback((listing: FavoriteListing) => {
    if (isFavorite(listing.id)) {
      removeFromFavorites(listing.id)
      return false // Removed from favorites
    } else {
      addToFavorites(listing)
      return true // Added to favorites
    }
  }, [isFavorite, addToFavorites, removeFromFavorites])

  // Clear all favorites
  const clearAllFavorites = useCallback(() => {
    saveFavorites([], new Set())
  }, [saveFavorites])


  // Get favorites count
  const favoritesCount = favorites.length

  return {
    favorites,
    favoriteIds,
    favoritesCount,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites
  }
}

export default useFavorites
