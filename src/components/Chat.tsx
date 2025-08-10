'use client'
import React, { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  createdAt: string
}

interface ChatProps {
  conversationId: string
  otherUserName: string
}

export default function Chat({ conversationId, otherUserName }: ChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const token = localStorage.getItem('luxbid_token')
    if (!token) return

    // Conectare la WebSocket
    const socketConnection = io(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/chat`, {
      auth: { token },
      transports: ['websocket'],
    })

    socketConnection.on('connect', () => {
      console.log('Connected to chat')
      setIsConnected(true)
      
      // Intră în conversație
      socketConnection.emit('joinConversation', { conversationId })
    })

    socketConnection.on('disconnect', () => {
      console.log('Disconnected from chat')
      setIsConnected(false)
    })

    socketConnection.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message])
      scrollToBottom()
    })

    socketConnection.on('userTyping', ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
      setOtherUserTyping(isTyping)
      
      if (isTyping) {
        // Oprește indicatorul după 3 secunde
        setTimeout(() => setOtherUserTyping(false), 3000)
      }
    })

    socketConnection.on('error', (error: any) => {
      console.error('Chat error:', error)
    })

    setSocket(socketConnection)

    return () => {
      socketConnection.emit('leaveConversation', { conversationId })
      socketConnection.disconnect()
    }
  }, [conversationId])

  // Încarcă mesajele existente
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const token = localStorage.getItem('luxbid_token')
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/chat/conversations/${conversationId}/messages`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        if (response.ok) {
          const messagesData = await response.json()
          setMessages(messagesData)
          setTimeout(scrollToBottom, 100)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    loadMessages()
  }, [conversationId])

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return

    socket.emit('sendMessage', {
      conversationId,
      content: newMessage.trim(),
    })

    setNewMessage('')
    stopTyping()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)

    if (!socket) return

    if (!isTyping) {
      setIsTyping(true)
      socket.emit('typing', { conversationId, isTyping: true })
    }

    // Reset typing timer
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping()
    }, 1000)
  }

  const stopTyping = () => {
    if (isTyping && socket) {
      setIsTyping(false)
      socket.emit('typing', { conversationId, isTyping: false })
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const currentUserId = socket?.id // Simplificat pentru demo

  return (
    <div style={{ 
      height: '500px', 
      border: '1px solid #ddd', 
      borderRadius: 12, 
      display: 'flex', 
      flexDirection: 'column',
      background: '#fff'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #eee', 
        background: '#f8f9fa',
        borderRadius: '12px 12px 0 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            background: isConnected ? '#4caf50' : '#f44336' 
          }} />
          <h4 style={{ margin: 0 }}>Chat cu {otherUserName}</h4>
        </div>
      </div>

      {/* Messages */}
      <div style={{ 
        flex: 1, 
        padding: '16px', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            fontStyle: 'italic',
            padding: '40px 20px'
          }}>
            Încep conversația! Scrie primul mesaj.
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === currentUserId
            
            return (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '8px 12px',
                    borderRadius: 12,
                    background: isOwnMessage ? '#9a7b0f' : '#f1f3f4',
                    color: isOwnMessage ? '#fff' : '#333',
                  }}
                >
                  <div style={{ fontSize: '0.9em', marginBottom: 4 }}>
                    {message.content}
                  </div>
                  <div style={{ 
                    fontSize: '0.7em', 
                    opacity: 0.7,
                    textAlign: 'right'
                  }}>
                    {formatTime(message.createdAt)}
                  </div>
                </div>
              </div>
            )
          })
        )}
        
        {/* Typing indicator */}
        {otherUserTyping && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            color: '#666',
            fontSize: '0.9em',
            fontStyle: 'italic'
          }}>
            <div style={{ display: 'flex', gap: 2 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite 0.5s' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#666', animation: 'pulse 1.5s infinite 1s' }} />
            </div>
            {otherUserName} scrie...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ 
        padding: '12px 16px', 
        borderTop: '1px solid #eee',
        background: '#f8f9fa',
        borderRadius: '0 0 12px 12px'
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <textarea
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scrie un mesaj..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 20,
              resize: 'none',
              minHeight: 36,
              maxHeight: 100,
              outline: 'none',
            }}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            style={{
              padding: '8px 16px',
              background: newMessage.trim() && isConnected ? '#9a7b0f' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: newMessage.trim() && isConnected ? 'pointer' : 'not-allowed',
              fontSize: '0.9em',
            }}
          >
            Trimite
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
