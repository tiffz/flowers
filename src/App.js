/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import styles from './App.css';
import Sidebar from './Sidebar';
import useMousePosition from './useMousePosition';
import FlowerGrid from './FlowerGrid';
import Flower from './Flower';
import { FLOWER_DELETION_TOOL } from './consts';

const ENABLE_CURSOR = true;

function App() {
  const initialState = JSON.parse(localStorage.getItem('acnhFlowers')) || {};
  const mouse = useMousePosition();

  const [flowerLayout, setFlowerLayout] = useState(
    initialState.flowerLayout || {},
  );
  const [selectedFlower, setSelectedFlower] = useState(
    initialState.selectedFlower || 1,
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

  return (
    <>
      {ENABLE_CURSOR && mouse.x > 0 && mouse.y > 0 ? (
        <div
          className={styles.cursorTracker}
          style={{
            top: mouse.y + 8,
            left: mouse.x,
          }}
        >
          {selectedFlower === FLOWER_DELETION_TOOL ? (
            <img
              src="images/trash.png"
              alt="Erase flowers"
              title="Erase flowers"
            />
          ) : (
            <Flower id={selectedFlower} iconStyle={iconStyle} />
          )}
        </div>
      ) : (
        ''
      )}
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
        <FlowerGrid
          {...{
            tileSize,
            bgId,
            iconStyle,
            flowerLayout,
            setFlowerLayout,
            selectedFlower,
            mouse,
          }}
        />
      </div>
    </>
  );
}

export default App;
