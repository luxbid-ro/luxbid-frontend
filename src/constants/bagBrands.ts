// Luxury bag brands for marketplace (sorted alphabetically A-Z)
export const BAG_BRANDS = [
  'Balenciaga',
  'Bottega Veneta',
  'Bulgari',
  'Burberry',
  'Celine',
  'Chanel',
  'Coach',
  'Dior',
  'Dolce & Gabbana',
  'Fendi',
  'Givenchy',
  'Goyard',
  'Gucci',
  'Hermès',
  'Loewe',
  'Louis Vuitton',
  'Mansur Gavriel',
  'Marc Jacobs',
  'Michael Kors',
  'Polene',
  'Prada',
  'Saint Laurent',
  'Salvatore Ferragamo',
  'Staud',
  'Valentino',
  'Versace'
] as const;

export type BagBrand = typeof BAG_BRANDS[number];
