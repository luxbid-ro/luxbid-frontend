'use client'
import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Notification = {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  data?: any
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userCreatedAt, setUserCreatedAt] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  // Fetch user profile to get creation date
  const fetchUserProfile = async () => {
    try {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUserCreatedAt(data.createdAt)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/notifications/unread-count`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/notifications?limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mark notifications as read
  const markAsRead = async (notificationIds: string[]) => {
    try {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/notifications/mark-read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notificationIds })
      })

      if (response.ok) {
        // Update local state
        setNotifications(prev => 
          prev.map(notif => 
            notificationIds.includes(notif.id) 
              ? { ...notif, isRead: true }
              : notif
          )
        )
        fetchUnreadCount() // Refresh count
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

      // Marchează și welcome message-ul ca citit
      if (isNewUser() && !welcomeMessageRead) {
        markWelcomeAsRead()
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com'}/notifications/mark-all-read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if unread
    if (!notification.isRead) {
      // Pentru welcome message (notificare de sistem), marchează local
      if (notification.id === 'welcome' && isNewUser()) {
        markWelcomeAsRead()
      } else {
        // Pentru notificări reale din backend
        markAsRead([notification.id])
      }
    }

    // Navigate based on notification type
    const data = notification.data ? JSON.parse(notification.data) : {}
    
    switch (notification.type) {
      case 'NEW_OFFER':
        window.location.href = '/dashboard/my-listings'
        break
      case 'OFFER_ACCEPTED':
        if (data.offerId) {
          window.location.href = `/chat/${data.offerId}`
        }
        break
      case 'NEW_MESSAGE':
        if (data.conversationId) {
          window.location.href = `/chat/${data.conversationId}`
        }
        break
      default:
        break
    }
    
    setIsOpen(false)
  }

  // Check if user is new (< 24 hours)
  const isNewUser = () => {
    if (!userCreatedAt) return false
    const createdDate = new Date(userCreatedAt)
    const now = new Date()
    const diffInHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60)
    return diffInHours < 24
  }

  // State pentru a urmări dacă welcome message-ul a fost citit
  const [welcomeMessageRead, setWelcomeMessageRead] = useState(false)

  // Load welcome message read status din localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('luxbid_token')
      if (token) {
        const saved = localStorage.getItem(`luxbid_welcome_read_${token}`)
        if (saved === 'true') {
          setWelcomeMessageRead(true)
        }
      }
    }
  }, [])

  // Save welcome message read status în localStorage
  const markWelcomeAsRead = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('luxbid_token')
      if (token) {
        localStorage.setItem(`luxbid_welcome_read_${token}`, 'true')
        setWelcomeMessageRead(true)
      }
    }
  }

  // Calculează numărul real de notificări necitite
  const getRealUnreadCount = () => {
    if (notifications.length > 0) {
      return unreadCount // Notificări reale din backend
    }
    
    // Pentru utilizatori noi cu welcome message
    if (isNewUser() && !welcomeMessageRead) {
      return 1 // Welcome message necitit
    }
    
    return 0 // Nu sunt notificări necitite
  }

  // Generate notifications for display
  const getDisplayNotifications = () => {
    if (notifications.length > 0) {
      return notifications
    }

    // If no real notifications, show appropriate message based on user age
    if (isNewUser()) {
      return [{
        id: 'welcome',
        type: 'SYSTEM',
        title: 'Bun venit la LuxBid!',
        message: 'Contul tău a fost creat cu succes. Începe să explorezi ofertele premium.',
        isRead: welcomeMessageRead, // Folosește state local
        createdAt: userCreatedAt || new Date().toISOString()
      }]
    } else {
      return [{
        id: 'no-notifications',
        type: 'SYSTEM', 
        title: 'Nu ai notificări noi în acest moment',
        message: 'Vei fi notificat despre oferte noi, mesaje și actualizări importante.',
        isRead: true,
        createdAt: new Date().toISOString()
      }]
    }
  }

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInMinutes < 1) return 'Acum câteva secunde'
    if (diffInMinutes < 60) return `Acum ${diffInMinutes} minute`
    if (diffInHours < 24) return `Acum ${diffInHours} ore`
    if (diffInDays === 1) return 'Ieri'
    if (diffInDays < 7) return `Acum ${diffInDays} zile`
    if (diffInDays < 30) return `Acum ${Math.floor(diffInDays / 7)} săptămâni`
    if (diffInDays < 365) return `Acum ${Math.floor(diffInDays / 30)} luni`
    return `Acum ${Math.floor(diffInDays / 365)} ani`
  }

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'NEW_OFFER': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
      case 'OFFER_ACCEPTED': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
      case 'NEW_MESSAGE': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
      case 'LISTING_EXPIRED': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      )
      case 'SYSTEM': return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
      )
      default: return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      )
    }
  }

  // Calculate dropdown position when opening
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const newPosition = {
        top: rect.bottom + window.scrollY + 5, // Extra 5px spacing
        right: window.innerWidth - rect.right
      }
      
      console.log('🔔 NotificationBell positioning:', {
        buttonRect: rect,
        scrollY: window.scrollY,
        windowWidth: window.innerWidth,
        finalPosition: newPosition,
        page: window.location.pathname
      })
      
      setDropdownPosition(newPosition)
    }
  }

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // Don't close if clicking on dropdown or button
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        console.log('🔔 Click inside dropdown - staying open')
        return
      }
      
      if (buttonRef.current && buttonRef.current.contains(target)) {
        console.log('🔔 Click on button - handled by onClick')
        return
      }
      
      // Close dropdown for outside clicks
      console.log('🔔 Click outside - closing dropdown')
      setIsOpen(false)
    }

    // Close dropdown on scroll
    const handleScroll = () => {
      console.log('🔔 Scroll detected - closing dropdown')
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true) // true = capture all scroll events
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen])

  // Fetch unread count on mount and set up interval
  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('luxbid_token')
    if (!token) return

    fetchUserProfile()
    fetchUnreadCount()
    
    // Refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  // Don't render if not logged in (SSR safe)
  const [token, setToken] = useState<string | null>(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('luxbid_token')
      setToken(storedToken)
    }
  }, [])
  
  if (!token) return null

  // Render dropdown content
  const renderDropdown = () => {
    if (!isOpen || typeof window === 'undefined') return null

    return createPortal(
      <div 
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: Math.max(dropdownPosition.top, 60), // Minimum 60px from top
          right: Math.max(dropdownPosition.right, 10), // Minimum 10px from right
          background: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: 12,
          width: 350,
          maxHeight: 400,
          overflow: 'hidden',
          zIndex: 999999,
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <h3 style={{ margin: 0, fontSize: '1em', fontWeight: 600 }}>
            Notificări ({getRealUnreadCount()} necitite)
          </h3>
          {getRealUnreadCount() > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                background: 'none',
                border: 'none',
                color: '#9a7b0f',
                fontSize: '0.8em',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Marchează toate
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
              Se încarcă...
            </div>
          ) : (
            getDisplayNotifications().map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  background: notification.isRead ? 'transparent' : '#fef7e3',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  gap: 12
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = notification.isRead ? '#f8fafc' : '#fef3c7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = notification.isRead ? 'transparent' : '#fef7e3'
                }}
              >
                <div style={{ fontSize: '1.2em', flexShrink: 0 }}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: notification.isRead ? 400 : 600,
                    fontSize: '0.9em',
                    marginBottom: 4,
                    color: '#1a202c'
                  }}>
                    {notification.title}
                  </div>
                  <div style={{
                    fontSize: '0.8em',
                    color: '#4a5568',
                    lineHeight: 1.4,
                    marginBottom: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {notification.message}
                  </div>
                  <div style={{ fontSize: '0.7em', color: '#718096' }}>
                    {formatTimeAgo(notification.createdAt)}
                  </div>
                </div>
                {!notification.isRead && (
                  <div style={{
                    width: 8,
                    height: 8,
                    background: '#9a7b0f',
                    borderRadius: '50%',
                    flexShrink: 0,
                    marginTop: 6
                  }} />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer - ENHANCED: Button pentru pagina notificări */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <button
            onClick={() => {
              setIsOpen(false) // Închide dropdown-ul
              window.location.href = '/notifications' // Navighează la pagina notificări
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'linear-gradient(90deg, #B07410 0%, #C28414 48%, #A66B0A 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9em',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(176, 116, 16, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #9F6A0F 0%, #B17813 48%, #95600A 100%)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(176, 116, 16, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #B07410 0%, #C28414 48%, #A66B0A 100%)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(176, 116, 16, 0.3)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Vezi toate notificările
          </button>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon */}
      <button
        ref={buttonRef}
        onClick={() => {
          if (!isOpen) {
            updateDropdownPosition()
            fetchNotifications()
            // Marchează welcome message-ul ca citit pentru utilizatorii noi
            if (isNewUser() && !welcomeMessageRead) {
              markWelcomeAsRead()
            }
          }
          setIsOpen(!isOpen)
        }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.2em',
          cursor: 'pointer',
          position: 'relative',
          padding: '8px 12px',
          borderRadius: '50%',
          transition: 'background-color 0.2s',
          color: '#333',
          outline: 'none',        // Elimină cercul galben
          boxShadow: 'none',      // Elimină shadow
          WebkitTapHighlightColor: 'transparent', // Safari/iOS
          WebkitAppearance: 'none' // WebKit browsers
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {getRealUnreadCount() > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: 2,
            background: '#e53e3e',
            color: 'white',
            borderRadius: '50%',
            minWidth: 18,
            height: 18,
            fontSize: '0.7em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {getRealUnreadCount() > 99 ? '99+' : getRealUnreadCount()}
          </span>
        )}
      </button>

      {/* Render dropdown using portal */}
      {renderDropdown()}
    </div>
  )
}
