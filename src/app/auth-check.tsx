'use client'
import { useEffect } from 'react'

export default function AuthCheck() {
  useEffect(() => {
    // Force a server request to trigger middleware
    if (typeof window !== 'undefined') {
      const hasAuthed = sessionStorage.getItem('luxbid_basic_auth')
      if (!hasAuthed) {
        // Make a request to trigger Basic Auth
        fetch('/', { 
          method: 'HEAD',
          credentials: 'include' 
        }).catch(() => {
          // If unauthorized, force page reload to trigger middleware
          window.location.reload()
        })
      }
    }
  }, [])

  return null
}
