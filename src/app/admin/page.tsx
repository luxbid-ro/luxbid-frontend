'use client'

import { useState, useEffect } from 'react'

interface Listing {
  id: string
  title: string
  price: number
  currency: string
  user: {
    email: string
    firstName: string
    lastName: string
  }
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (password === 'luxbid2024supreme') {
      setIsAuthed(true)
      loadData()
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [listingsRes, usersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`, {
          headers: { 'Authorization': 'Bearer admin-supreme-luxbid2024supreme' }
        })
      ])
      
      if (listingsRes.ok) setListings(await listingsRes.json())
      if (usersRes.ok) setUsers(await usersRes.json())
    } catch (err) {
      console.error('Error:', err)
    }
    setLoading(false)
  }

  const deleteListing = async (id: string) => {
    if (!confirm('Delete listing?')) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer admin-supreme-luxbid2024supreme' }
      })
      setListings(listings.filter(l => l.id !== id))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Delete user?')) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer admin-supreme-luxbid2024supreme' }
      })
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  if (!isAuthed) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui',
        zIndex: 999999
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h1 style={{ margin: '0 0 30px 0', color: '#1a1a1a' }}>Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#f8f9fa',
      fontFamily: 'system-ui',
      zIndex: 999999,
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: '16px 24px',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#212529' }}>LuxBid Admin</h1>
        <button
          onClick={() => setIsAuthed(false)}
          style={{
            padding: '8px 16px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: '24px' }}>
        {loading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#007bff' }}>{users.length}</h3>
            <p style={{ margin: 0, color: '#6c757d' }}>Total Users</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#28a745' }}>{listings.length}</h3>
            <p style={{ margin: 0, color: '#6c757d' }}>Total Listings</p>
          </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#ffc107' }}>
              {listings.reduce((sum, l) => sum + l.price, 0).toLocaleString()} RON
            </h3>
            <p style={{ margin: 0, color: '#6c757d' }}>Total Value</p>
          </div>
        </div>

        {/* Users */}
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '24px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #dee2e6' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Users ({users.length})</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>{user.email}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa', textAlign: 'center' }}>
                      <button
                        onClick={() => deleteUser(user.id)}
                        style={{
                          padding: '4px 8px',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Listings */}
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #dee2e6' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Listings ({listings.length})</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>{listing.title}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>
                      {listing.price.toLocaleString()} {listing.currency}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa' }}>
                      {listing.user.firstName} {listing.user.lastName}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f8f9fa', textAlign: 'center' }}>
                      <button
                        onClick={() => deleteListing(listing.id)}
                        style={{
                          padding: '4px 8px',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
