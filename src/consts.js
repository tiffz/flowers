// Flower IDs start from 1 and are monotonically increasing.
// Each flower has an image named after its ID.
export const FLOWERS = Object.freeze([
  '',
  { name: 'Black Cosmos', species: 'Cosmos', color: 'Black' },
  { name: 'Orange Cosmos', species: 'Cosmos', color: 'Orange' },
  { name: 'Pink Cosmos', species: 'Cosmos', color: 'Pink' },
  { name: 'Red Cosmos', species: 'Cosmos', color: 'Red' },
  { name: 'White Cosmos', species: 'Cosmos', color: 'White' },
  { name: 'Yellow Cosmos', species: 'Cosmos', color: 'Yellow' },
  { name: 'Blue Hyacinth', species: 'Hyacinth', color: 'Blue' },
  { name: 'Orange Hyacinth', species: 'Hyacinth', color: 'Orange' },
  { name: 'Pink Hyacinth', species: 'Hyacinth', color: 'Pink' },
  { name: 'Purple Hyacinth', species: 'Hyacinth', color: 'Purple' },
  { name: 'Red Hyacinth', species: 'Hyacinth', color: 'Red' },
  { name: 'White Hyacinth', species: 'Hyacinth', color: 'White' },
  { name: 'Yellow Hyacinth', species: 'Hyacinth', color: 'Yellow' },
  { name: 'Black Lily', species: 'Lily', color: 'Black' },
  { name: 'Orange Lily', species: 'Lily', color: 'Orange' },
  { name: 'Pink Lily', species: 'Lily', color: 'Pink' },
  { name: 'Red Lily', species: 'Lily', color: 'Red' },
  { name: 'White Lily', species: 'Lily', color: 'White' },
  { name: 'Yellow Lily', species: 'Lily', color: 'Yellow' },
  { name: 'Green Mum', species: 'Mum', color: 'Green' },
  { name: 'Pink Mum', species: 'Mum', color: 'Pink' },
  { name: 'Purple Mum', species: 'Mum', color: 'Purple' },
  { name: 'Red Mum', species: 'Mum', color: 'Red' },
  { name: 'White Mum', species: 'Mum', color: 'White' },
  { name: 'Yellow Mum', species: 'Mum', color: 'Yellow' },
  { name: 'Blue Pansy', species: 'Pansy', color: 'Blue' },
  { name: 'Orange Pansy', species: 'Pansy', color: 'Orange' },
  { name: 'Purple Pansy', species: 'Pansy', color: 'Purple' },
  { name: 'Red Pansy', species: 'Pansy', color: 'Red' },
  { name: 'White Pansy', species: 'Pansy', color: 'White' },
  { name: 'Yellow Pansy', species: 'Pansy', color: 'Yellow' },
  { name: 'Black Rose', species: 'Rose', color: 'Black' },
  { name: 'Blue Rose', species: 'Rose', color: 'Blue' },
  { name: 'Gold Rose', species: 'Rose', color: 'Gold' },
  { name: 'Orange Rose', species: 'Rose', color: 'Orange' },
  { name: 'Pink Rose', species: 'Rose', color: 'Pink' },
  { name: 'Purple Rose', species: 'Rose', color: 'Purple' },
  { name: 'Red Rose', species: 'Rose', color: 'Red' },
  { name: 'White Rose', species: 'Rose', color: 'White' },
  { name: 'Yellow Rose', species: 'Rose', color: 'Yellow' },
  { name: 'Black Tulip', species: 'Tulip', color: 'Black' },
  { name: 'Orange Tulip', species: 'Tulip', color: 'Orange' },
  { name: 'Pink Tulip', species: 'Tulip', color: 'Pink' },
  { name: 'Purple Tulip', species: 'Tulip', color: 'Purple' },
  { name: 'Red Tulip', species: 'Tulip', color: 'Red' },
  { name: 'White Tulip', species: 'Tulip', color: 'White' },
  { name: 'Yellow Tulip', species: 'Tulip', color: 'Yellow' },
  { name: 'Blue Windflower', species: 'Windflower', color: 'Blue' },
  { name: 'Orange Windflower', species: 'Windflower', color: 'Orange' },
  { name: 'Pink Windflower', species: 'Windflower', color: 'Pink' },
  { name: 'Purple Windflower', species: 'Windflower', color: 'Purple' },
  { name: 'Red Windflower', species: 'Windflower', color: 'Red' },
  { name: 'White Windflower', species: 'Windflower', color: 'White' },
  { name: 'Lily of the Valley', species: 'Lily of the Valley', color: 'White' },
]);

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
