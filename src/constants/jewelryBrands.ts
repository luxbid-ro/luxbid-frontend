// Top luxury jewelry brands for marketplace (sorted alphabetically A-Z)
export const JEWELRY_BRANDS = [
  'Boucheron',
  'Bulgari',
  'Cartier',
  'Chopard',
  'Graff',
  'Harry Winston',
  'Mikimoto',
  'Piaget',
  'Tiffany & Co.',
  'Van Cleef & Arpels',
  'Altul'
] as const;

export type JewelryBrand = typeof JEWELRY_BRANDS[number];
