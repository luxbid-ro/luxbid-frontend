// Top luxury jewelry brands for marketplace
export const JEWELRY_BRANDS = [
  'Cartier',
  'Tiffany & Co.',
  'Bulgari',
  'Van Cleef & Arpels',
  'Harry Winston',
  'Chopard',
  'Graff',
  'Piaget',
  'Boucheron',
  'Mikimoto'
] as const;

export type JewelryBrand = typeof JEWELRY_BRANDS[number];
