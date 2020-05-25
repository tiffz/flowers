/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import styles from './App.css';
import Sidebar from './Sidebar';
import Flower from './Flower';
import {
  DEFAULT_DIMENSIONS,
  BACKGROUNDS,
  TILE_SIZES,
  NO_SELECTED_FLOWER,
  FLOWER_DELETION_TOOL,
} from './consts';

function mapRange(end, f) {
  const arr = [];
  for (let i = 0; i < end; i += 1) {
    arr[i] = f(i);
  }
  return arr;
}

function App() {
  const initialState = JSON.parse(localStorage.getItem('acnhFlowers')) || {};

  const [flowerLayout, setFlowerLayout] = useState(
    initialState.flowerLayout || {},
  );
  const [selectedFlower, setSelectedFlower] = useState(
    initialState.selectedFlower || NO_SELECTED_FLOWER,
  );
  const [bgId, setBgId] = useState(initialState.bgId || 0);
  const [iconStyle, setIconStyle] = useState(initialState.iconStyle || 0);
  const [tileSize, setTileSize] = useState(initialState.tileSize || 1);

  useEffect(() => {
    localStorage.setItem(
      'acnhFlowers',
      JSON.stringify({
        flowerLayout,
        selectedFlower,
        bgId,
        iconStyle,
        tileSize,
      }),
    );
  });

  const { canvasBg, tileBg } = BACKGROUNDS[bgId];
  const { size } = TILE_SIZES[tileSize];

  const flowerGrid = mapRange(DEFAULT_DIMENSIONS.width, (x) =>
    mapRange(DEFAULT_DIMENSIONS.height, (y) => {
      const key = `${x}-${y}`;
      const id = flowerLayout[key];
      const updateFlowerLayout = () => {
        if (selectedFlower === NO_SELECTED_FLOWER) return;
        const newLayout = {
          ...flowerLayout,
          [key]: selectedFlower,
        };

        // Delete the flower if the user is either using the eraser tool or
        // is clicking on a flower that's the same as the selected flower.
        if (selectedFlower === FLOWER_DELETION_TOOL || selectedFlower === id) {
          delete newLayout[key];
        }
        setFlowerLayout(newLayout);
      };

      return (
        <button
          type="button"
          className={styles.gridSquare}
          onClick={updateFlowerLayout}
          key={key}
          style={{ background: tileBg, width: size, height: size }}
        >
          <Flower id={id} iconStyle={iconStyle} />
        </button>
      );
    }),
  );

  return (
    <div className={styles.container}>
      <Sidebar
        {...{
          bgId,
          setBgId,
          setFlowerLayout,
          selectedFlower,
          setSelectedFlower,
          iconStyle,
          setIconStyle,
          tileSize,
          setTileSize,
        }}
      />
      <div className={styles.canvas} style={{ background: canvasBg }}>
        {flowerGrid}
      </div>
    </div>
  );
}

export default App;
