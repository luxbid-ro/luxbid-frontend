'use client'
import React, { useState, useEffect, useRef } from 'react'

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
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
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
      const token = localStorage.getItem('luxbid_token')
      if (!token) return

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
      markAsRead([notification.id])
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

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Acum câteva minute'
    if (diffInHours < 24) return `Acum ${diffInHours} ore`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return 'Ieri'
    if (diffInDays < 7) return `Acum ${diffInDays} zile`
    return date.toLocaleDateString('ro-RO')
  }

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'NEW_OFFER': return '💰'
      case 'OFFER_ACCEPTED': return '🎉'
      case 'NEW_MESSAGE': return '💬'
      case 'LISTING_EXPIRED': return '⏰'
      case 'SYSTEM': return '🔔'
      default: return '📢'
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch unread count on mount and set up interval
  useEffect(() => {
    const token = localStorage.getItem('luxbid_token')
    if (!token) return

    fetchUnreadCount()
    
    // Refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  // Don't render if not logged in
  const token = localStorage.getItem('luxbid_token')
  if (!token) return null

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) fetchNotifications()
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
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unreadCount > 0 && (
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
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: 12,
          width: 350,
          maxHeight: 400,
          overflow: 'hidden',
          zIndex: 1000,
          border: '1px solid #e2e8f0'
        }}>
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
              Notificări ({unreadCount} necitite)
            </h3>
            {unreadCount > 0 && (
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
            ) : notifications.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
                Nu ai notificări
              </div>
            ) : (
              notifications.map((notification) => (
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

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              textAlign: 'center'
            }}>
              <a
                href="/dashboard/notifications"
                style={{
                  color: '#9a7b0f',
                  textDecoration: 'none',
                  fontSize: '0.8em',
                  fontWeight: 500
                }}
              >
                Vezi toate notificările →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
