// Luxury bag brands for marketplace
export const BAG_BRANDS = [
  'Louis Vuitton',
  'Hermès',
  'Chanel',
  'Gucci',
  'Prada',
  'Dior',
  'Bottega Veneta',
  'Saint Laurent',
  'Balenciaga',
  'Celine',
  'Fendi',
  'Givenchy',
  'Valentino',
  'Loewe',
  'Goyard',
  'Bulgari',
  'Burberry',
  'Versace',
  'Dolce & Gabbana',
  'Salvatore Ferragamo',
  'Coach',
  'Michael Kors',
  'Marc Jacobs',
  'Mansur Gavriel',
  'Polene',
  'Staud'
] as const;

export type BagBrand = typeof BAG_BRANDS[number];
