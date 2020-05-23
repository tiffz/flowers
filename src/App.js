import React, { useState } from 'react';
import styles from './App.css';

// Flower IDs start from 1 and are monotonically increasing.
// Each flower has an image named after its ID.
const FLOWERS = Object.freeze([
  '',
  'Black Cosmos',
  'Orange Cosmos',
  'Pink Cosmos',
  'Red Cosmos',
  'White Cosmos',
  'Yellow Cosmos',
  'Blue Hyacinth',
  'Orange Hyacinth',
  'Pink Hyacinth',
  'Purple Hyacinth',
  'Red Hyacinth',
  'White Hyacinth',
  'Yellow Hyacinth',
  'Black Lily',
  'Orange Lily',
  'Pink Lily',
  'Red Lily',
  'White Lily',
  'Yellow Lily',
  'Green Mum',
  'Pink Mum',
  'Purple Mum',
  'Red Mum',
  'White Mum',
  'Yellow Mum',
  'Blue Pansy',
  'Purple Pansy',
  'Red Pansy',
  'Orange Pansy',
  'White Pansy',
  'Yellow Pansy',
  'Black Rose',
  'Blue Rose',
  'Gold Rose',
  'Orange Rose',
  'Pink Rose',
  'Purple Rose',
  'Red Rose',
  'White Rose',
  'Yellow Rose',
  'Black Tulip',
  'Orange Tulip',
  'Pink Tulip',
  'Purple Tulip',
  'Red Tulip',
  'White Tulip',
  'Yellow Tulip',
  'Blue Windflower',
  'Orange Windflower',
  'Pink Windflower',
  'Purple Windflower',
  'Red Windflower',
  'White Windflower',
  'Lily of the Valley',
]);

const DEFAULT_DIMENSIONS = Object.freeze({ width: 50, height: 50 });

function mapRange(end, f) {
  const arr = [];
  for (let i = 0; i < end; i += 1) {
    arr[i] = f(i);
  }
  return arr;
}

function App() {
  const [flowerLayout, setFlowerLayout] = useState({});

  const flowerGrid = mapRange(DEFAULT_DIMENSIONS.width, (x) =>
    mapRange(DEFAULT_DIMENSIONS.height, (y) => {
      const key = `${x}-${y}`;
      const id = flowerLayout[key] || 0;
      const updateFlowerLayout = () => {
        setFlowerLayout({
          ...flowerLayout,
          [key]: id + 1,
        });
      };
      return (
        <button type="button" onClick={updateFlowerLayout}>
          <Flower id={id} />
        </button>
      );
    }),
  );

  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        flower drawing area.
        {flowerGrid}
      </div>
      <div className={styles.sidebar}>
        <h2>Flowers</h2>
        {FLOWERS.map((_, id) => (
          <Flower id={id} />
        ))}
      </div>
    </div>
  );
}

function Flower({ id }) {
  if (id < 1 || id >= FLOWERS.length) return <></>;
  const flower = FLOWERS[id];
  return (
    <img
      className={styles.flower}
      src={`images/flowers/${id}.png`}
      alt={flower}
      title={flower}
    />
  );
}

export default App;
