// Watch brands for luxury marketplace
export const WATCH_BRANDS = [
  'Rolex',
  'Omega',
  'Patek Philippe',
  'Audemars Piguet',
  'Breitling',
  'Tudor',
  'Cartier',
  'Panerai',
  'IWC',
  'Seiko',
  'Jaeger-LeCoultre',
  'TAG Heuer',
  'Hublot',
  'Zenith',
  'Vacheron Constantin',
  'Longines',
  'A. Lange & Söhne',
  'Richard Mille',
  'Breguet',
  'Ulysse Nardin',
  'Hamilton',
  'NOMOS',
  'Oris',
  'Sinn',
  'Jakob&Co.',
  'Girard Perregaux'
] as const;

export type WatchBrand = typeof WATCH_BRANDS[number];
