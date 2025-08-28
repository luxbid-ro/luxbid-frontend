'use client'

import { useState, useCallback } from 'react'
import { moderateContent, ModerationResult, ContentToModerate, RiskLevel } from '@/utils/contentModeration'

interface UseModerationOptions {
  autoModerate?: boolean
  showWarnings?: boolean
  allowOverride?: boolean
}

export function useContentModeration(options: UseModerationOptions = {}) {
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [userOverride, setUserOverride] = useState(false)

  const {
    autoModerate = true,
    showWarnings = true,
    allowOverride = false
  } = options

  /**
   * Moderează conținut și returnează rezultatul
   */
  const moderate = useCallback((content: ContentToModerate): Promise<ModerationResult> => {
    return new Promise((resolve) => {
      setIsProcessing(true)
      
      // Simulare delay pentru processing (în realitate ar fi instant)
      setTimeout(() => {
        const result = moderateContent(content)
        setModerationResult(result)
        
        // Afișează warning dacă e cazul
        if (showWarnings && result.riskLevel !== RiskLevel.LOW) {
          setShowWarning(true)
        }
        
        setIsProcessing(false)
        resolve(result)
      }, 100)
    })
  }, [showWarnings])

  /**
   * Verifică dacă conținutul poate fi publicat
   */
  const canPublish = useCallback((result?: ModerationResult): boolean => {
    const currentResult = result || moderationResult
    if (!currentResult) return true
    
    // Dacă utilizatorul a override-uit warning-ul
    if (userOverride && allowOverride) return true
    
    // Bazat pe rezultatul moderării
    return currentResult.isAllowed
  }, [moderationResult, userOverride, allowOverride])

  /**
   * Override-uiește warning-ul (pentru utilizatori de încredere)
   */
  const overrideWarning = useCallback(() => {
    if (allowOverride) {
      setUserOverride(true)
      setShowWarning(false)
    }
  }, [allowOverride])

  /**
   * Reset moderare
   */
  const reset = useCallback(() => {
    setModerationResult(null)
    setShowWarning(false)
    setUserOverride(false)
    setIsProcessing(false)
  }, [])

  /**
   * Obține mesajul pentru utilizator bazat pe rezultatul moderării
   */
  const getUserMessage = useCallback((result?: ModerationResult): {
    type: 'info' | 'warning' | 'error'
    title: string
    message: string
    actions?: string[]
  } | null => {
    const currentResult = result || moderationResult
    if (!currentResult) return null

    switch (currentResult.riskLevel) {
      case RiskLevel.CRITICAL:
        return {
          type: 'error',
          title: 'Conținut respins',
          message: `Conținutul nu poate fi publicat din cauza problemelor detectate: ${currentResult.issues.join(', ')}`,
        }
      
      case RiskLevel.HIGH:
        return {
          type: 'warning',
          title: 'Conținut problematic',
          message: `Conținutul a fost marcat pentru revizie: ${currentResult.issues.join(', ')}`,
          actions: allowOverride ? ['override'] : ['edit']
        }
      
      case RiskLevel.MEDIUM:
        return {
          type: 'warning',
          title: 'Verifică conținutul',
          message: `Am detectat unele probleme minore: ${currentResult.issues.join(', ')}`,
          actions: ['continue', 'edit']
        }
      
      case RiskLevel.LOW:
        return {
          type: 'info',
          title: 'Conținut aprobat',
          message: 'Conținutul pare să fie în regulă și poate fi publicat.',
        }
      
      default:
        return null
    }
  }, [moderationResult, allowOverride])

  /**
   * Moderare în timp real pentru input-uri
   */
  const moderateRealTime = useCallback(async (content: ContentToModerate) => {
    if (!autoModerate) return
    
    // Debounce pentru a evita prea multe apeluri
    const debounced = setTimeout(async () => {
      await moderate(content)
    }, 500)

    return () => clearTimeout(debounced)
  }, [autoModerate, moderate])

  return {
    // State
    moderationResult,
    isProcessing,
    showWarning,
    userOverride,
    
    // Actions
    moderate,
    canPublish,
    overrideWarning,
    reset,
    moderateRealTime,
    
    // Helpers
    getUserMessage,
    
    // Computed
    hasIssues: moderationResult ? moderationResult.issues.length > 0 : false,
    riskLevel: moderationResult?.riskLevel,
    riskScore: moderationResult?.score || 0
  }
}

/**
 * Hook simplificat pentru verificare rapidă
 */
export function useQuickModeration() {
  const checkContent = useCallback((content: ContentToModerate): {
    allowed: boolean
    issues: string[]
    riskLevel: RiskLevel
  } => {
    const result = moderateContent(content)
    return {
      allowed: result.isAllowed,
      issues: result.issues,
      riskLevel: result.riskLevel
    }
  }, [])

  return { checkContent }
}
