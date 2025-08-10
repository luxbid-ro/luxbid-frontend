'use client'
import { useEffect, useState } from 'react'

export default function TestFetch() {
  const [status, setStatus] = useState('Loading...')
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('🔥 TestFetch useEffect running')
    
    // Test absolut
    fetch('http://localhost:4000/listings')
      .then(res => {
        console.log('📡 Response:', res.status, res.ok)
        return res.json()
      })
      .then(data => {
        console.log('📊 Data:', data)
        setData(data)
        setStatus(`Success! ${data.length} listings`)
      })
      .catch(err => {
        console.error('❌ Error:', err)
        setStatus(`Error: ${err.message}`)
      })
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Test Fetch</h1>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Data:</strong> {JSON.stringify(data, null, 2)}</p>
    </div>
  )
}
