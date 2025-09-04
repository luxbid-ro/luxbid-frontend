import { useState, useEffect, useCallback } from 'react'

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

  const getStorageKey = (suffix: string) => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('luxbid_user_id') || 'guest' : 'server'
    return `luxbid_${suffix}_${userId}`
  }

  // Load favorites from localStorage (SSR safe)
  useEffect(() => {
    const loadFavorites = () => {
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
  }, [])

  // Save favorites to localStorage (SSR safe)
  const saveFavorites = useCallback((newFavorites: FavoriteListing[], newFavoriteIds: Set<string>) => {
    try {
      if (typeof window === 'undefined') return

      localStorage.setItem(getStorageKey('favorites'), JSON.stringify(newFavorites))
      localStorage.setItem(getStorageKey('favorite_ids'), JSON.stringify(Array.from(newFavoriteIds)))
      setFavorites(newFavorites)
      setFavoriteIds(newFavoriteIds)
    } catch (error) {
      console.error('Error saving favorites:', error)
    }
  }, [])

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
