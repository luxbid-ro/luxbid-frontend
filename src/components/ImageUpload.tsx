'use client'
import React, { useState, useCallback, useRef } from 'react'

interface ImageUploadProps {
  listingId: string
  onImagesUploaded: (images: any[]) => void
  maxImages?: number
}

export default function ImageUpload({ listingId, onImagesUploaded, maxImages = 10 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([])
  const [primaryIndex, setPrimaryIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.match(/\/(jpg|jpeg|png|webp)$/)) {
        alert(`${file.name} nu este un format de imagine valid`)
        return false
      }
      if (file.size > 15 * 1024 * 1024) {
        alert(`${file.name} este prea mare (max 15MB)`)
        return false
      }
      return true
    }).slice(0, maxImages)

    // Creez preview-uri
    const newPreviews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))

    setPreviews(prev => [...prev, ...newPreviews].slice(0, maxImages))
  }, [maxImages])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
    if (primaryIndex >= index && primaryIndex > 0) {
      setPrimaryIndex(prev => prev - 1)
    }
  }

  const uploadImages = async () => {
    if (previews.length === 0) return

    setUploading(true)
    const formData = new FormData()
    
    previews.forEach(preview => {
      formData.append('images', preview.file)
    })
    formData.append('primaryIndex', primaryIndex.toString())

    try {
      const token = localStorage.getItem('luxbid_token')
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
      

      
      const response = await fetch(`${base}/upload/images/${listingId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onImagesUploaded(result.images || [])
        setPreviews([])
        setPrimaryIndex(0)
        alert('Imaginile au fost încărcate cu succes!')
      } else {
        throw new Error(`Eroare la încărcare: ${response.status}`)
      }
    } catch (error) {
      alert('Eroare la încărcarea imaginilor')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Încarcă imagini de înaltă calitate</h3>
      <p style={{ color: '#666', fontSize: '0.9em', marginBottom: 15 }}>
        Pentru obiecte de lux, imaginile trebuie să fie cât mai clare. Max {maxImages} imagini, 15MB fiecare.
      </p>

      {/* Zona de drag & drop */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#9a7b0f' : '#ddd'}`,
          borderRadius: 12,
          padding: 40,
          textAlign: 'center',
          backgroundColor: dragActive ? '#faf9f6' : '#fff',
          cursor: 'pointer',
          marginBottom: 20,
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div style={{ fontSize: '2em', marginBottom: 10 }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m4-11h-1a2 2 0 0 0-2 2v1m4 0h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1m-4 0H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"/>
</svg></div>
        <p>Trage imaginile aici sau <strong>click pentru a selecta</strong></p>
        <p style={{ fontSize: '0.8em', color: '#999' }}>
          JPG, PNG, WebP - max 15MB per imagine
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Preview imagini */}
      {previews.length > 0 && (
        <div>
          <h4>Preview ({previews.length}/{maxImages})</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 15, marginBottom: 20 }}>
            {previews.map((preview, index) => (
              <div key={index} style={{ position: 'relative', border: primaryIndex === index ? '3px solid #9a7b0f' : '1px solid #ddd', borderRadius: 8 }}>
                <img 
                  src={preview.url} 
                  alt={`Preview ${index + 1}`}
                  style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }}
                />
                <button
                  onClick={() => removePreview(index)}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: 'rgba(255,0,0,0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 25,
                    height: 25,
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
                <button
                  onClick={() => setPrimaryIndex(index)}
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 5,
                    background: primaryIndex === index ? '#9a7b0f' : 'rgba(0,0,0,0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 6px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {primaryIndex === index ? 'PRINCIPAL' : 'Principal?'}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={uploadImages}
            disabled={uploading}
            className="btn btn-gold"
            style={{ marginTop: 10 }}
          >
            {uploading ? 'Se încarcă...' : `Încarcă ${previews.length} imagini`}
          </button>
        </div>
      )}
    </div>
  )
}
