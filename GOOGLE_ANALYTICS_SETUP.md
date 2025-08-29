# 📊 GOOGLE ANALYTICS 4 SETUP - LUXBID

## **🚀 CONFIGURARE RAPIDĂ**

### **1. Creează Google Analytics 4 Property**
1. Accesează [Google Analytics](https://analytics.google.com/)
2. Creează un nou account sau folosește unul existent
3. Adaugă o proprietate nouă pentru **LuxBid**
4. Selectează **GA4** (Google Analytics 4)
5. Configurează:
   - **Property Name:** LuxBid Marketplace
   - **Reporting Time Zone:** Europe/Bucharest
   - **Currency:** Romanian Leu (RON)

### **2. Obține Measurement ID**
1. În GA4, mergi la **Admin** → **Data Streams**
2. Adaugă **Web Stream** pentru `luxbid.ro`
3. Copiază **Measurement ID** (format: `G-XXXXXXXXXX`)

### **3. Configurează Environment Variables**
Creează fișierul `.env.local` cu:

```bash
# Google Analytics 4 Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Replace cu Measurement ID real

# Optional: Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

---

## **📈 EVENIMENTE TRACKING IMPLEMENTATE**

### **🏠 Core Events**
- ✅ **Page Views** - Automatic pentru toate paginile
- ✅ **User Registration** - Cont nou creat
- ✅ **User Login** - Autentificare utilizator
- ✅ **Search** - Căutări în platformă
- ✅ **Error Tracking** - Erori JavaScript

### **💎 Luxury Marketplace Events**
- ✅ **Listing View** - Vizualizare produs de lux
- ✅ **Brand Page View** - Vizitare pagină brand (Rolex, Hermès, etc.)
- ✅ **Category View** - Explorare categorii (Ceasuri, Genți, Bijuterii)
- ✅ **Image Zoom** - Interacțiune cu galeria foto
- ✅ **Price Filter** - Filtrare după preț
- ✅ **Share Listing** - Distribuire pe social media

### **💰 Conversion Events**
- ✅ **Offer Submission** - Ofertă depusă pentru produs
- ✅ **Chat Initiation** - Inițiere conversație cu vânzătorul
- ✅ **Listing Creation** - Listare produs nou
- ✅ **Contact Seller** - Contact direct cu vânzătorul

### **⚡ Performance Events**
- ✅ **Web Vitals** - LCP, FCP, CLS, FID tracking
- ✅ **Page Load Time** - Viteza încărcare pagini
- ✅ **Bundle Load** - Performanță JavaScript
- ✅ **Resource Loading** - Optimizare assets

---

## **🎯 CUSTOM DIMENSIONS CONFIGURATE**

### **📊 User Properties**
```javascript
// Setate automat în aplicație
{
  user_type: 'buyer' | 'seller' | 'both',
  preferred_category: 'Ceasuri' | 'Genți' | 'Bijuterii',
  price_range: 'under_1000' | '1000_5000' | '5000_plus',
  signup_date: '2025-01-01'
}
```

### **🏷️ Event Parameters**
```javascript
// Pentru fiecare event luxury
{
  listing_id: 'unique_listing_id',
  category: 'Ceasuri' | 'Genți' | 'Bijuterii',
  brand: 'Rolex' | 'Hermès' | 'Cartier' | etc.,
  price_range: 'calculated_range',
  currency: 'RON' | 'EUR'
}
```

---

## **🔧 IMPLEMENTARE TEHNICĂ**

### **📦 Componente Implementate**
1. **`GoogleAnalytics.tsx`** - Script loading și configurare
2. **`useAnalytics.ts`** - React hooks pentru tracking
3. **`analytics.ts`** - Core Analytics class
4. **Performance Integration** - Web Vitals → GA4

### **🎪 Utilizare în Componente**
```typescript
import { useAnalytics, useLuxuryAnalytics } from '@/hooks/useAnalytics'

function ListingPage() {
  const { trackListing } = useAnalytics()
  const { trackBrandView } = useLuxuryAnalytics()
  
  const handleView = () => {
    trackListing('view', {
      id: 'listing-123',
      title: 'Rolex Submariner',
      category: 'Ceasuri',
      brand: 'Rolex',
      price: 8500,
      currency: 'EUR'
    })
  }
}
```

### **📊 Event Tracking Examples**
```typescript
// Ofertă depusă
analytics.trackOfferSubmission({
  listingId: 'listing-123',
  offerAmount: 7500,
  currency: 'EUR',
  category: 'Ceasuri',
  brand: 'Rolex'
})

// Căutare
analytics.trackSearch('Rolex Submariner', 15, {
  category: 'Ceasuri',
  price_min: 5000,
  price_max: 10000
})

// Eroare
analytics.trackError(new Error('API call failed'), 'listing_load')
```

---

## **🛡️ GDPR COMPLIANCE**

### **🍪 Consent Management**
```typescript
import { useAnalyticsConsent } from '@/hooks/useAnalytics'

const { setConsent } = useAnalyticsConsent()

// După acceptarea cookie-urilor
setConsent({
  analytics: true,
  marketing: false, 
  functional: true,
  personalization: false
})
```

### **🔒 Privacy Settings**
- ✅ **IP Anonymization** - Activată automat
- ✅ **Consent Mode** - Respectă preferințele utilizatorului
- ✅ **Data Retention** - 14 luni pentru evenimente
- ✅ **Cross-domain Tracking** - Dezactivat pentru privacy

---

## **📈 RAPOARTE ȘI DASHBOARDS**

### **🎯 KPI-uri Principale**
1. **User Engagement**
   - Page views per session
   - Average session duration
   - Bounce rate per category

2. **Luxury Marketplace Metrics**
   - Listing views per category
   - Brand popularity (Rolex vs Hermès vs Cartier)
   - Price range preferences

3. **Conversion Funnel**
   - Listing view → Offer submission
   - Registration → First listing
   - Chat initiation → Deal completion

4. **Performance Metrics**
   - Page load times
   - Web Vitals scores
   - Error rates

### **📊 Custom Reports Recomandate**
1. **Luxury Brand Performance**
   - Top brands by engagement
   - Average time per brand page
   - Conversion rate by brand

2. **Category Analysis**
   - Ceasuri vs Genți vs Bijuterii performance
   - Seasonal trends per category
   - Price sensitivity analysis

3. **User Journey Analysis**
   - Registration → First offer path
   - Search → Purchase intent flow
   - Mobile vs Desktop behavior

---

## **🚀 NEXT STEPS**

### **✅ IMPLEMENTAT**
- ✅ GA4 setup complet
- ✅ Toate evenimente luxury marketplace
- ✅ Performance tracking integration
- ✅ GDPR compliance
- ✅ Error tracking

### **📋 TODO**
- [ ] **Google Tag Manager** - Pentru tracking avansat
- [ ] **Enhanced Ecommerce** - Transaction tracking
- [ ] **Audience Segments** - Luxury buyer personas
- [ ] **Goal Configuration** - Conversion objectives
- [ ] **Attribution Models** - Multi-touch attribution

---

## **🔧 TROUBLESHOOTING**

### **❌ Probleme Comune**
1. **Events nu apar în GA4**
   - Verifică Measurement ID în `.env.local`
   - Verifică console pentru erori JavaScript
   - GA4 poate avea delay de până la 24h pentru rapoarte

2. **Real-time events nu funcționează**
   - Mergi în GA4 → Reports → Realtime
   - Testează cu incognito mode
   - Verifică network tab în DevTools

3. **Consent mode issues**
   - Verifică localStorage pentru consent
   - Testează cu cookie-uri goale
   - Verifică console pentru consent errors

### **🔍 Debug Mode**
```bash
# În .env.local
NEXT_PUBLIC_GA_DEBUG=true
```

Activează console logging pentru toate evenimente GA4.

---

**📊 LUXBID ANALYTICS IMPLEMENTATION COMPLETE! 🚀**
