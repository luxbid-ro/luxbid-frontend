/**
 * Content Moderation System pentru LuxBid
 * Sistem automat de filtrare și moderare conținut
 */

// Lista de cuvinte interzise (extinsibilă)
const FORBIDDEN_WORDS = [
  // Limbaj ofensator
  'fuck', 'shit', 'bitch', 'asshole', 'damn', 'piss', 'crap',
  // Limbaj românesc ofensator
  'pula', 'muie', 'futut', 'cacat', 'mortii', 'dracu', 'naiba',
  // Spam indicators
  'click here', 'free money', 'guaranteed', 'make money fast',
  'no risk', 'risk free', 'call now', 'act now', 'limited time',
  // Scam indicators
  'nigerian prince', 'lottery winner', 'inheritance', 'urgent transfer',
  'western union', 'wire transfer', 'bank account', 'credit card',
  // Fake indicators
  'replica', 'fake', 'copy', 'counterfeit', 'imitation'
]

// Patterns suspecte pentru descrieri
const SUSPICIOUS_PATTERNS = [
  /\b(replica|fake|copy|counterfeit|imitation)\b/gi,
  /\b(stolen|hot|no questions)\b/gi,
  /\b(wire.?transfer|western.?union|moneygram)\b/gi,
  /\b(whatsapp|telegram|signal).?\+?\d+/gi,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Email addresses
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/gi, // Phone numbers
  /\b(http|https|www\.)/gi, // URLs
  /(.)\1{4,}/gi, // Repeated characters (aaaaa)
]

// Categorii de risc
export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ModerationResult {
  isAllowed: boolean
  riskLevel: RiskLevel
  issues: string[]
  score: number // 0-100, 100 = highest risk
  autoAction?: 'approve' | 'flag' | 'reject'
}

export interface ContentToModerate {
  title?: string
  description?: string
  userEmail?: string
  userRole?: 'user' | 'verified' | 'admin'
  images?: string[]
  price?: number
  category?: string
}

/**
 * Analizează conținut pentru moderare
 */
export function moderateContent(content: ContentToModerate): ModerationResult {
  const issues: string[] = []
  let score = 0

  // Verifică cuvinte interzise
  const text = `${content.title || ''} ${content.description || ''}`.toLowerCase()
  
  for (const word of FORBIDDEN_WORDS) {
    if (text.includes(word.toLowerCase())) {
      issues.push(`Conține limbaj nepotrivit: "${word}"`)
      score += 15
    }
  }

  // Verifică patterns suspecte
  for (const pattern of SUSPICIOUS_PATTERNS) {
    const matches = text.match(pattern)
    if (matches) {
      matches.forEach(match => {
        issues.push(`Pattern suspect detectat: "${match}"`)
        score += 10
      })
    }
  }

  // Verifică prețuri suspecte
  if (content.price) {
    if (content.price < 10) {
      issues.push('Preț neobișnuit de mic pentru articole de lux')
      score += 20
    }
    if (content.price > 1000000) {
      issues.push('Preț neobișnuit de mare')
      score += 10
    }
  }

  // Verifică lungimea descrierii
  const descLength = content.description?.length || 0
  if (descLength < 20) {
    issues.push('Descriere prea scurtă')
    score += 5
  }
  if (descLength > 5000) {
    issues.push('Descriere suspicioasă de lungă')
    score += 10
  }

  // Verifică majuscule excesive
  const upperCaseRatio = (content.description?.match(/[A-Z]/g)?.length || 0) / descLength
  if (upperCaseRatio > 0.3) {
    issues.push('Prea multe majuscule (posibil spam)')
    score += 15
  }

  // Verifică repetarea caracterelor
  if (content.description && /(.)\1{4,}/.test(content.description)) {
    issues.push('Caractere repetate suspect')
    score += 10
  }

  // Determină nivelul de risc
  let riskLevel: RiskLevel
  let autoAction: 'approve' | 'flag' | 'reject'

  if (score >= 70) {
    riskLevel = RiskLevel.CRITICAL
    autoAction = 'reject'
  } else if (score >= 50) {
    riskLevel = RiskLevel.HIGH
    autoAction = 'flag'
  } else if (score >= 25) {
    riskLevel = RiskLevel.MEDIUM
    autoAction = 'flag'
  } else {
    riskLevel = RiskLevel.LOW
    autoAction = 'approve'
  }

  // Ajustare bazată pe rolul utilizatorului
  if (content.userRole === 'verified') {
    score *= 0.7 // Reducere 30% pentru utilizatori verificați
  } else if (content.userRole === 'admin') {
    score = 0 // Administratorii nu sunt moderați
    autoAction = 'approve'
  }

  return {
    isAllowed: score < 70,
    riskLevel,
    issues,
    score: Math.min(100, Math.max(0, score)),
    autoAction
  }
}

/**
 * Verifică dacă un utilizator poate posta (rate limiting)
 */
export function checkUserPostingLimits(userEmail: string, userRole: string): boolean {
  // În implementarea reală, aceasta ar verifica baza de date
  // Pentru acum, returnăm true
  return true
}

/**
 * Raportează conținut pentru moderare manuală
 */
export interface ContentReport {
  contentId: string
  contentType: 'listing' | 'message' | 'profile'
  reporterId: string
  reason: string
  category: 'spam' | 'inappropriate' | 'fake' | 'fraud' | 'other'
  description?: string
  timestamp: Date
}

/**
 * Categorii de raportare
 */
export const REPORT_CATEGORIES = {
  spam: 'Spam sau conținut repetitiv',
  inappropriate: 'Conținut inadecvat sau ofensator',
  fake: 'Produs fals sau contrafăcut',
  fraud: 'Înșelătorie sau fraudă',
  other: 'Altă problemă'
} as const

/**
 * Acțiuni automate pentru moderare
 */
export function getAutoModerationAction(result: ModerationResult): {
  action: string
  reason: string
  requiresHumanReview: boolean
} {
  switch (result.autoAction) {
    case 'reject':
      return {
        action: 'Conținut respins automat',
        reason: `Scor de risc prea mare (${result.score}/100): ${result.issues.join(', ')}`,
        requiresHumanReview: true
      }
    case 'flag':
      return {
        action: 'Conținut marcat pentru revizie',
        reason: `Scor de risc moderat (${result.score}/100): ${result.issues.join(', ')}`,
        requiresHumanReview: true
      }
    case 'approve':
      return {
        action: 'Conținut aprobat automat',
        reason: `Scor de risc scăzut (${result.score}/100)`,
        requiresHumanReview: false
      }
    default:
      return {
        action: 'Revizie manuală necesară',
        reason: 'Nu s-a putut determina acțiunea automată',
        requiresHumanReview: true
      }
  }
}
