// Flower IDs start from 1 and are monotonically increasing.
// Each flower has an image named after its ID.
export const FLOWERS = Object.freeze([
  '',
  { id: 1, name: 'Black Cosmos', species: 'Cosmos', color: 'Black' },
  { id: 2, name: 'Orange Cosmos', species: 'Cosmos', color: 'Orange' },
  { id: 3, name: 'Pink Cosmos', species: 'Cosmos', color: 'Pink' },
  { id: 4, name: 'Red Cosmos', species: 'Cosmos', color: 'Red' },
  { id: 5, name: 'White Cosmos', species: 'Cosmos', color: 'White' },
  { id: 6, name: 'Yellow Cosmos', species: 'Cosmos', color: 'Yellow' },
  { id: 7, name: 'Blue Hyacinth', species: 'Hyacinth', color: 'Blue' },
  { id: 8, name: 'Orange Hyacinth', species: 'Hyacinth', color: 'Orange' },
  { id: 9, name: 'Pink Hyacinth', species: 'Hyacinth', color: 'Pink' },
  { id: 10, name: 'Purple Hyacinth', species: 'Hyacinth', color: 'Purple' },
  { id: 11, name: 'Red Hyacinth', species: 'Hyacinth', color: 'Red' },
  { id: 12, name: 'White Hyacinth', species: 'Hyacinth', color: 'White' },
  { id: 13, name: 'Yellow Hyacinth', species: 'Hyacinth', color: 'Yellow' },
  { id: 14, name: 'Black Lily', species: 'Lily', color: 'Black' },
  { id: 15, name: 'Orange Lily', species: 'Lily', color: 'Orange' },
  { id: 16, name: 'Pink Lily', species: 'Lily', color: 'Pink' },
  { id: 17, name: 'Red Lily', species: 'Lily', color: 'Red' },
  { id: 18, name: 'White Lily', species: 'Lily', color: 'White' },
  { id: 19, name: 'Yellow Lily', species: 'Lily', color: 'Yellow' },
  { id: 20, name: 'Green Mum', species: 'Mum', color: 'Green' },
  { id: 21, name: 'Pink Mum', species: 'Mum', color: 'Pink' },
  { id: 22, name: 'Purple Mum', species: 'Mum', color: 'Purple' },
  { id: 23, name: 'Red Mum', species: 'Mum', color: 'Red' },
  { id: 24, name: 'White Mum', species: 'Mum', color: 'White' },
  { id: 25, name: 'Yellow Mum', species: 'Mum', color: 'Yellow' },
  { id: 26, name: 'Blue Pansy', species: 'Pansy', color: 'Blue' },
  { id: 27, name: 'Orange Pansy', species: 'Pansy', color: 'Orange' },
  { id: 28, name: 'Purple Pansy', species: 'Pansy', color: 'Purple' },
  { id: 29, name: 'Red Pansy', species: 'Pansy', color: 'Red' },
  { id: 30, name: 'White Pansy', species: 'Pansy', color: 'White' },
  { id: 31, name: 'Yellow Pansy', species: 'Pansy', color: 'Yellow' },
  { id: 32, name: 'Black Rose', species: 'Rose', color: 'Black' },
  { id: 33, name: 'Blue Rose', species: 'Rose', color: 'Blue' },
  { id: 34, name: 'Gold Rose', species: 'Rose', color: 'Gold' },
  { id: 35, name: 'Orange Rose', species: 'Rose', color: 'Orange' },
  { id: 36, name: 'Pink Rose', species: 'Rose', color: 'Pink' },
  { id: 37, name: 'Purple Rose', species: 'Rose', color: 'Purple' },
  { id: 38, name: 'Red Rose', species: 'Rose', color: 'Red' },
  { id: 39, name: 'White Rose', species: 'Rose', color: 'White' },
  { id: 40, name: 'Yellow Rose', species: 'Rose', color: 'Yellow' },
  { id: 41, name: 'Black Tulip', species: 'Tulip', color: 'Black' },
  { id: 42, name: 'Orange Tulip', species: 'Tulip', color: 'Orange' },
  { id: 43, name: 'Pink Tulip', species: 'Tulip', color: 'Pink' },
  { id: 44, name: 'Purple Tulip', species: 'Tulip', color: 'Purple' },
  { id: 45, name: 'Red Tulip', species: 'Tulip', color: 'Red' },
  { id: 46, name: 'White Tulip', species: 'Tulip', color: 'White' },
  { id: 47, name: 'Yellow Tulip', species: 'Tulip', color: 'Yellow' },
  { id: 48, name: 'Blue Windflower', species: 'Windflower', color: 'Blue' },
  { id: 49, name: 'Orange Windflower', species: 'Windflower', color: 'Orange' },
  { id: 50, name: 'Pink Windflower', species: 'Windflower', color: 'Pink' },
  { id: 51, name: 'Purple Windflower', species: 'Windflower', color: 'Purple' },
  { id: 52, name: 'Red Windflower', species: 'Windflower', color: 'Red' },
  { id: 53, name: 'White Windflower', species: 'Windflower', color: 'White' },
  {
    id: 54,
    name: 'Lily of the Valley',
    species: 'Lily of the Valley',
    color: 'White',
  },
]);

export const FLOWER_SPECIES_ORDER = Object.freeze([
  'Cosmos',
  'Hyacinth',
  'Lily',
  'Mum',
  'Pansy',
  'Rose',
  'Tulip',
  'Windflower',
  'Lily of the Valley',
]);

export const FLOWER_COLOR_ORDER = Object.freeze([
  'Black',
  'Purple',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Red',
  'Pink',
  'White',
  'Gold',
]);

export const flowerSorts = Object.freeze({
  BY_SPECIES: 0,
  BY_COLOR: 1,
});

export const BACKGROUNDS = Object.freeze([
  { name: 'Light Mode', canvasBg: 'none', tileBg: 'white' },
  { name: 'Dark Mode', canvasBg: '#141617', tileBg: '#232d32' },
  { name: 'Grass', canvasBg: '#C0C62F', tileBg: '#589B4A' },
  { name: 'Dirt', canvasBg: '#D0A96C', tileBg: '#DDB57C' },
  { name: 'Dark Dirt', canvasBg: '#AC6E49', tileBg: '#B3754F' },
  { name: 'Sand', canvasBg: '#E7C87B', tileBg: '#F4E6BA' },
]);

export const ICON_STYLES = Object.freeze(['Clothes', 'Inventory']);

export const TILE_SIZES = Object.freeze([
  { name: 'Small', size: '32px' },
  { name: 'Medium', size: '48px' },
  { name: 'Large', size: '64px' },
]);

export const DEFAULT_DIMENSIONS = Object.freeze({ width: 30, height: 30 });

export const NO_SELECTED_FLOWER = -1;
export const FLOWER_DELETION_TOOL = 0;
