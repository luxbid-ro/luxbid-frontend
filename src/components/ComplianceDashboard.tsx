'use client'

import React, { useState, useEffect } from 'react'
import { complianceMonitor, ComplianceReport, ComplianceCheck } from '@/utils/complianceMonitor'

interface ComplianceDashboardProps {
  adminView?: boolean
}

export default function ComplianceDashboard({ adminView = false }: ComplianceDashboardProps) {
  const [report, setReport] = useState<ComplianceReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadComplianceData()
  }, [])

  const loadComplianceData = async () => {
    setIsLoading(true)
    try {
      const newReport = await complianceMonitor.runComplianceCheck()
      setReport(newReport)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error loading compliance data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const runSpecificCheck = async (frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly') => {
    setIsLoading(true)
    try {
      const newReport = await complianceMonitor.runComplianceCheck(frequency)
      setReport(newReport)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error running specific check:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#22c55e' // green
    if (score >= 70) return '#f59e0b' // yellow
    return '#dc2626' // red
  }

  const getStatusIcon = (status: ComplianceCheck['status']): string => {
    switch (status) {
      case 'compliant': return '✅'
      case 'warning': return '⚠️'
      case 'violation': return '❌'
      default: return '❓'
    }
  }

  if (isLoading && !report) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        🔄 Încărcare raport compliance...
      </div>
    )
  }

  if (!report) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666'
      }}>
        <p>Nu sunt disponibile date de compliance.</p>
        <button
          onClick={loadComplianceData}
          style={{
            padding: '12px 24px',
            backgroundColor: '#D09A1E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Generează Raport
        </button>
      </div>
    )
  }

  const filteredCategories = selectedCategory === 'all' 
    ? Object.entries(report.categories)
    : Object.entries(report.categories).filter(([key]) => key === selectedCategory)

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: 0,
          color: '#1a1a1a'
        }}>
          📊 Compliance Dashboard
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={loadComplianceData}
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: isLoading ? '#ccc' : '#D09A1E',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {isLoading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: '700',
            color: getScoreColor(report.overallScore),
            marginBottom: '8px'
          }}>
            {report.overallScore}%
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#666'
          }}>
            Scor General
          </div>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#22c55e',
            marginBottom: '8px'
          }}>
            {report.compliantChecks}/{report.totalChecks}
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#666'
          }}>
            Verificări Conforme
          </div>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#dc2626',
            marginBottom: '8px'
          }}>
            {report.criticalIssues.length}
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#666'
          }}>
            Probleme Critice
          </div>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '8px'
          }}>
            Ultima Verificare
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333'
          }}>
            {lastUpdate?.toLocaleString('ro-RO') || 'N/A'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {adminView && (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            🚀 Acțiuni Rapide
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => runSpecificCheck('daily')}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#059669',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              📅 Verificări Zilnice
            </button>
            <button
              onClick={() => runSpecificCheck('weekly')}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0ea5e9',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              📆 Verificări Săptămânale
            </button>
            <button
              onClick={() => runSpecificCheck('monthly')}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              📋 Verificări Lunare
            </button>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#92400e'
          }}>
            💡 Recomandări
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#92400e'
          }}>
            {report.recommendations.map((rec, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Critical Issues */}
      {report.criticalIssues.length > 0 && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #dc2626',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#dc2626'
          }}>
            🚨 Probleme Critice
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {report.criticalIssues.map((issue, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '16px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>
                    {getStatusIcon(issue.status)} {issue.name}
                  </span>
                  <span style={{
                    background: '#dc2626',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {issue.score}%
                  </span>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#7f1d1d', fontSize: '14px' }}>
                  {issue.description}
                </p>
                <div style={{ fontSize: '12px', color: '#991b1b' }}>
                  {issue.details.map((detail, detailIndex) => (
                    <div key={detailIndex}>• {detail}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedCategory === 'all' ? '#D09A1E' : '#f8f9fa',
            color: selectedCategory === 'all' ? '#fff' : '#666',
            border: '1px solid #e9ecef',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Toate Categoriile
        </button>
        {Object.keys(report.categories).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedCategory === category ? '#D09A1E' : '#f8f9fa',
              color: selectedCategory === category ? '#fff' : '#666',
              border: '1px solid #e9ecef',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {filteredCategories.map(([categoryName, categoryData]) => (
          <div
            key={categoryName}
            style={{
              background: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#333'
              }}>
                {categoryName}
              </h3>
              <div style={{
                background: getScoreColor(categoryData.score),
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {categoryData.score}%
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {categoryData.checks.map((check, index) => (
                <div
                  key={index}
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '16px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '14px'
                    }}>
                      {getStatusIcon(check.status)} {check.name}
                    </span>
                    <span style={{
                      background: getScoreColor(check.score),
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {check.score}%
                    </span>
                  </div>
                  
                  <p style={{
                    margin: '0 0 8px 0',
                    color: '#666',
                    fontSize: '12px'
                  }}>
                    {check.description}
                  </p>

                  {check.details.length > 0 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#888'
                    }}>
                      {check.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>• {detail}</div>
                      ))}
                    </div>
                  )}

                  <div style={{
                    marginTop: '8px',
                    fontSize: '10px',
                    color: '#aaa'
                  }}>
                    Ultima verificare: {check.lastCheck?.toLocaleString('ro-RO') || 'Niciodată'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          📊 Raport generat automat • Ultima actualizare: {report.timestamp.toLocaleString('ro-RO')}
        </p>
        <p style={{ margin: 0 }}>
          Pentru întrebări despre compliance: <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
        </p>
      </div>
    </div>
  )
}
