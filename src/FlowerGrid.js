/* eslint-disable react/prop-types */
import React from 'react';
import {
  DEFAULT_DIMENSIONS,
  BACKGROUNDS,
  TILE_SIZES,
  NO_SELECTED_FLOWER,
  FLOWER_DELETION_TOOL,
} from './consts';
import Flower from './Flower';
import styles from './FlowerGrid.css';

function mapRange(end, f) {
  const arr = [];
  for (let i = 0; i < end; i += 1) {
    arr[i] = f(i);
  }
  return arr;
}

export default function FlowerGrid({
  tileSize,
  bgId,
  iconStyle,
  flowerLayout,
  setFlowerLayout,
  selectedFlower,
}) {
  const { canvasBg, tileBg } = BACKGROUNDS[bgId];
  const { size } = TILE_SIZES[tileSize];

  return (
    <div className={styles.canvas} style={{ background: canvasBg }}>
      {mapRange(DEFAULT_DIMENSIONS.width, (x) =>
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
            if (
              selectedFlower === FLOWER_DELETION_TOOL ||
              selectedFlower === id
            ) {
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
      )}
    </div>
  );
}
