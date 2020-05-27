/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import styles from './App.css';
import Sidebar from './Sidebar';
import useMousePosition from './useMousePosition';
import FlowerGrid from './FlowerGrid';
import Flower from './Flower';
import RandomFlower from './RandomFlower';
import { FLOWER_DELETION_TOOL, flowerSorts, tools } from './consts';

const DEFAULT_STATE = Object.freeze({
  flowerLayout: {},
  currentTool: tools.FLOWER_STAMP,
  selectedFlower: 1,
  randomOption: 0,
  bgId: 0,
  iconStyle: 0,
  tileSize: 1,
  sortStyle: flowerSorts.BY_SPECIES,
  gridLines: 1,
});

const ENABLE_CURSOR = true;

const MAX_UNDO_STACK = 100;

function App() {
  const savedState = JSON.parse(localStorage.getItem('acnhFlowers')) || {};
  const initialState = {
    ...DEFAULT_STATE,
    ...savedState,
  };
  const mouse = useMousePosition();

  const [flowerLayout, setFlowerLayoutRaw] = useState(
    initialState.flowerLayout,
  );
  const [currentTool, setTool] = useState(initialState.currentTool);
  const [selectedFlower, setSelectedFlower] = useState(
    initialState.selectedFlower,
  );
  const [randomOption, setRandomOption] = useState(initialState.randomOption);
  const [bgId, setBgId] = useState(initialState.bgId);
  const [iconStyle, setIconStyle] = useState(initialState.iconStyle);
  const [tileSize, setTileSize] = useState(initialState.tileSize);
  const [sortStyle, setSortStyle] = useState(initialState.sortStyle);
  const [gridLines, setGridLines] = useState(initialState.gridLines);

  // Local storage management.
  useEffect(() => {
    localStorage.setItem(
      'acnhFlowers',
      JSON.stringify({
        flowerLayout,
        currentTool,
        selectedFlower,
        bgId,
        iconStyle,
        tileSize,
        sortStyle,
        gridLines,
      }),
    );
  });

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const setFlowerLayout = (next) => {
    // Add current flower layout to undoStack.
    setUndoStack([flowerLayout, ...undoStack].slice(0, MAX_UNDO_STACK));
    setRedoStack([]);
    setFlowerLayoutRaw(next);
  };

  const undo = () => {
    if (!undoStack.length) return;

    const nextState = undoStack[0];

    setUndoStack(undoStack.slice(1));
    setRedoStack([flowerLayout, ...redoStack]);

    setFlowerLayoutRaw(nextState);
  };

  const redo = () => {
    if (!redoStack.length) return;

    const nextState = redoStack[0];

    setRedoStack(redoStack.slice(1));
    setUndoStack([flowerLayout, ...undoStack]);

    setFlowerLayoutRaw(nextState);
  };

  useEffect(() => {
    const hotKeys = (e) => {
      const meta = e.ctrlKey || e.metaKey;
      if (e.key === 'z' && meta) {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };
    window.addEventListener('keydown', hotKeys);

    return () => window.removeEventListener('keydown', hotKeys);
  });

  let cursorContent;
  if (ENABLE_CURSOR) {
    const showFlowerCursor = [tools.FLOWER_STAMP, tools.PAINT_BUCKET].includes(
      currentTool,
    );
    const showRandomCursor = currentTool === tools.RANDOM;

    if (showFlowerCursor) {
      cursorContent =
        selectedFlower === FLOWER_DELETION_TOOL ? (
          <img
            src="images/trash.png"
            alt="Erase flowers"
            title="Erase flowers"
          />
        ) : (
          <Flower id={selectedFlower} iconStyle={iconStyle} />
        );
    } else if (showRandomCursor) {
      cursorContent = (
        <RandomFlower option={randomOption} style={{ width: 24, height: 24 }} />
      );
    }
  }

  return (
    <>
      {cursorContent && mouse.x > 0 && mouse.y > 0 ? (
        <div
          className={styles.cursorTracker}
          style={{
            top: mouse.y + 8,
            left: mouse.x,
          }}
        >
          {cursorContent}
        </div>
      ) : (
        ''
      )}
      <div className={styles.container}>
        <Sidebar
          {...{
            undo,
            redo,
            bgId,
            setBgId,
            setFlowerLayout,
            currentTool,
            setTool,
            selectedFlower,
            setSelectedFlower,
            randomOption,
            setRandomOption,
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
            currentTool,
            flowerLayout,
            setFlowerLayout,
            selectedFlower,
            randomOption,
            mouse,
          }}
        />
      </div>
    </>
  );
}

export default App;
