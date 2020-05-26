/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import styles from './App.css';
import Sidebar from './Sidebar';
import useMousePosition from './useMousePosition';
import FlowerGrid from './FlowerGrid';
import Flower from './Flower';
import { FLOWER_DELETION_TOOL, flowerSorts } from './consts';

const ENABLE_CURSOR = true;

const tools = Object.freeze({
  FLOWER_STAMP: 0,
  PAINT_BUCKET: 1,
  // TODO: Move, rectangle move
});

const DEFAULT_STATE = Object.freeze({
  flowerLayout: {},
  selectedFlower: 1,
  bgId: 0,
  iconStyle: 0,
  tileSize: 1,
  sortStyle: flowerSorts.BY_SPECIES,
  gridLines: 1,
});

function App() {
  const savedState = JSON.parse(localStorage.getItem('acnhFlowers')) || {};
  const initialState = {
    ...DEFAULT_STATE,
    ...savedState,
  };
  const mouse = useMousePosition();

  const [flowerLayout, setFlowerLayout] = useState(initialState.flowerLayout);
  const [selectedFlower, setSelectedFlower] = useState(
    initialState.selectedFlower,
  );
  const [bgId, setBgId] = useState(initialState.bgId);
  const [iconStyle, setIconStyle] = useState(initialState.iconStyle);
  const [tileSize, setTileSize] = useState(initialState.tileSize);
  const [sortStyle, setSortStyle] = useState(initialState.sortStyle);
  const [gridLines, setGridLines] = useState(initialState.gridLines);

  useEffect(() => {
    localStorage.setItem(
      'acnhFlowers',
      JSON.stringify({
        flowerLayout,
        selectedFlower,
        bgId,
        iconStyle,
        tileSize,
        sortStyle,
        gridLines,
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
            sortStyle,
            setSortStyle,
            gridLines,
            setGridLines,
          }}
        />
        <FlowerGrid
          {...{
            tileSize,
            bgId,
            iconStyle,
            gridLines,
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
