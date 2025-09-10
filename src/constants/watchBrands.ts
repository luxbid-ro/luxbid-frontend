// Watch brands for luxury marketplace (sorted alphabetically A-Z)
export const WATCH_BRANDS = [
  'A. Lange & Söhne',
  'Audemars Piguet',
  'Breguet',
  'Breitling',
  'Cartier',
  'Girard Perregaux',
  'Hamilton',
  'Hublot',
  'IWC',
  'Jaeger-LeCoultre',
  'Jakob&Co.',
  'Longines',
  'NOMOS',
  'Omega',
  'Oris',
  'Panerai',
  'Patek Philippe',
  'Richard Mille',
  'Rolex',
  'Seiko',
  'Sinn',
  'TAG Heuer',
  'Tudor',
  'Ulysse Nardin',
  'Vacheron Constantin',
  'Zenith',
  'Altul'
] as const;

export type WatchBrand = typeof WATCH_BRANDS[number];
