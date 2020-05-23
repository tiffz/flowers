import React, { useState } from 'react';
import styles from './App.css';
import { FLOWERS, DEFAULT_DIMENSIONS } from './consts';

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
        <button
          type="button"
          className={styles['grid-square']}
          onClick={updateFlowerLayout}
          key={key}
        >
          <Flower id={id} />
        </button>
      );
    }),
  );

  return (
    <div className={styles.container}>
      <div className={styles.canvas}>{flowerGrid}</div>
      <div className={styles.sidebar}>
        <h2>Flowers</h2>
        {FLOWERS.map((_, id) => (
          <Flower id={id} key={FLOWERS[id] || ''} />
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
