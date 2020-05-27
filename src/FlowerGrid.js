/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import {
  tools,
  FLOWERS,
  RANDOM_FLOWER_OPTIONS,
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

function rectanglesIntersect(a, b) {
  if (
    a.left <= b.left + b.width &&
    a.left + a.width >= b.left &&
    a.top <= b.top + b.height &&
    a.top + a.height >= b.top
  ) {
    return true;
  }
  return false;
}

function normalizeRectangle(rectStart, end) {
  let start;
  let size;
  if (rectStart) {
    start = {
      top: Math.min(rectStart.y, end.y),
      left: Math.min(rectStart.x, end.x),
    };
    size = {
      width: Math.abs(end.x - rectStart.x),
      height: Math.abs(end.y - rectStart.y),
    };
  }
  return { start, size };
}

const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const mutateFlowersInLayout = (layout, keys, possibleValues) => {
  const nextLayout = { ...layout };
  keys.forEach((key) => {
    const newValue = randomChoice(possibleValues);
    // Delete the flower if the user is using the eraser tool.
    if (newValue === FLOWER_DELETION_TOOL) {
      // eslint-disable-next-line no-param-reassign
      delete nextLayout[key];
    } else {
      // eslint-disable-next-line no-param-reassign
      nextLayout[key] = newValue;
    }
  });
  return nextLayout;
};

const floodFill = (visited, flowerLayout, x, y, match, maxX, maxY) => {
  if (x < 0 || y < 0 || x >= maxX || y >= maxY) return [];

  const key = `${x}-${y}`;

  if (key in visited) return [];

  // eslint-disable-next-line no-param-reassign
  visited[key] = true;

  if (flowerLayout[key] === match) {
    return [
      key,
      ...floodFill(visited, flowerLayout, x + 1, y, match, maxX, maxY),
      ...floodFill(visited, flowerLayout, x - 1, y, match, maxX, maxY),
      ...floodFill(visited, flowerLayout, x, y + 1, match, maxX, maxY),
      ...floodFill(visited, flowerLayout, x, y - 1, match, maxX, maxY),
    ];
  }
  return [];
};

const applyPaintBucket = ({
  flowerLayout,
  setFlowerLayout,
  selectedFlower,
  width,
  height,
}) => ({ target }) => {
  if (selectedFlower === NO_SELECTED_FLOWER) return;
  let { x, y } = target.dataset;
  if (!x || !y) return;

  x = Number.parseInt(x, 10);
  y = Number.parseInt(y, 10);

  if (Number.isNaN(x) || Number.isNaN(y)) return;

  const key = `${x}-${y}`;
  const matchingColor = flowerLayout[key] || undefined;

  // Don't bother filling an identical color.
  if (matchingColor === selectedFlower) return;

  const updatedKeys = floodFill(
    {},
    flowerLayout,
    x,
    y,
    matchingColor,
    width,
    height,
  );

  setFlowerLayout(
    mutateFlowersInLayout(flowerLayout, updatedKeys, [selectedFlower]),
  );
};

const drawFlowerGrid = (
  save,
  { flowerRefs, flowerLayout, fillFlowers, start, size, width, height },
) => () => {
  if (!fillFlowers.length) return;

  const refs = flowerRefs.current;

  // Avoid calculating getBoundingClientRect() on every ref for performance.
  // We assume that all grid tiles will be the same size and have the same
  // amount of margins/padding between them.
  const firstRect = '0-0' in refs && refs['0-0'].getBoundingClientRect();
  const rightRect = '0-1' in refs && refs['0-1'].getBoundingClientRect();
  const bottomRect = '1-0' in refs && refs['1-0'].getBoundingClientRect();

  // Calculate which elements the rectangle intersects with.
  const drawnRectangle = { ...start, ...size };
  const mutatedKeys = [];
  let flowersChanged = false;
  const selectedFlower =
    fillFlowers.length === 1 ? fillFlowers[0] : NO_SELECTED_FLOWER;
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const key = `${i}-${j}`;

      const { width: w, height: h } = firstRect;
      let { top, left } = firstRect;
      if (j > 0) {
        left += j * (rightRect.left - firstRect.left);
      }
      if (i > 0) {
        top += i * (bottomRect.top - firstRect.top);
      }

      if (
        rectanglesIntersect({ top, left, width: w, height: h }, drawnRectangle)
      ) {
        mutatedKeys.push(key);

        const visitedFlower = refs[key].dataset.flower;
        flowersChanged =
          visitedFlower !== `${selectedFlower}` || flowersChanged;
      }
    }
  }

  save(
    mutateFlowersInLayout(
      flowerLayout,
      mutatedKeys,
      // If all intersecting flowers are the same as the current one, delete
      // flowers instead of drawing them.
      flowersChanged ? fillFlowers : [FLOWER_DELETION_TOOL],
    ),
  );
};

const generateOnMouseUp = (stateRefs) => {
  const finishRectangle = () => {
    const { current } = stateRefs;
    if (!current.rectStart) return;

    // Draw the added flowers.
    current.drawFlowerGrid();

    // Remove rectangle.
    current.setRectStart(undefined);

    window.removeEventListener('mouseup', finishRectangle);
  };
  return finishRectangle;
};

export default function FlowerGrid({
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
}) {
  const enableRectangleDraw = [tools.FLOWER_STAMP, tools.RANDOM].includes(
    currentTool,
  );
  const enableFloodFill = currentTool === tools.PAINT_BUCKET;
  const enableRandom = currentTool === tools.RANDOM;
  const { lineBg, tileBg } = BACKGROUNDS[bgId];
  const tileSizeStyle = TILE_SIZES[tileSize];
  const { width, height } = DEFAULT_DIMENSIONS;

  const flowerRefs = useRef({});

  // Rectangle start coordinates, based on page position.
  // mouse parameter is used for end coordinates.
  const [rectStart, setRectStart] = useState(undefined);

  const { start, size } = normalizeRectangle(rectStart, mouse);

  let fillFlowers =
    selectedFlower === NO_SELECTED_FLOWER ? [] : [selectedFlower];
  if (enableRandom) {
    // Remove flower delete tool.
    fillFlowers = FLOWERS.slice(1);
    const { color } = RANDOM_FLOWER_OPTIONS[randomOption];
    if (color) {
      fillFlowers = fillFlowers.filter((flower) => flower.color === color);
    }
    fillFlowers = fillFlowers.map(({ id }) => id);
  }

  const stateRefs = useRef({});
  stateRefs.current = {
    rectStart,
    setRectStart,
    drawFlowerGrid: drawFlowerGrid(setFlowerLayout, {
      flowerRefs,
      flowerLayout,
      fillFlowers,
      start,
      size,
      width,
      height,
    }),
  };

  const flowerGrid = mapRange(width, (x) =>
    mapRange(height, (y) => {
      const key = `${x}-${y}`;
      const id = flowerLayout[key];
      return (
        <div
          data-flower={id}
          data-key={key}
          data-x={x}
          data-y={y}
          ref={(el) => {
            flowerRefs.current[key] = el;
          }}
          className={styles.gridSquare}
          key={key}
          style={{
            backgroundColor: tileBg.color,
            backgroundImage: tileBg.img,
            backgroundSize: tileSizeStyle.size,
            width: tileSizeStyle.size,
            height: tileSizeStyle.size,
          }}
        >
          <Flower id={id} iconStyle={iconStyle} />
        </div>
      );
    }),
  );

  const startRectangle = (e) => {
    if (!enableRectangleDraw) return;
    // Only catch left clicks.
    if (e.button !== 0) return;
    const { pageX, pageY } = e;

    setRectStart({ x: pageX, y: pageY });

    window.addEventListener('mouseup', generateOnMouseUp(stateRefs));
  };

  let customCursor;
  if (enableFloodFill) {
    customCursor = 'url("images/paint-bucket.cur"), auto';
  }

  return (
    <>
      {rectStart ? <Rectangle start={start} size={size} /> : ''}
      <div
        className={`${styles.canvas} ${gridLines ? styles.gridLines : ''}`}
        style={{
          background: lineBg,
          cursor: customCursor,
        }}
        onClick={
          enableFloodFill
            ? applyPaintBucket({
                flowerLayout,
                setFlowerLayout,
                selectedFlower,
                rectStart,
                width,
                height,
              })
            : undefined
        }
        onMouseDown={startRectangle}
      >
        {flowerGrid}
      </div>
    </>
  );
}

function Rectangle({ start, size }) {
  if (!start || !size) return <></>;

  return (
    <div
      className={styles.rectangle}
      style={{
        top: start.top,
        left: start.left,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    />
  );
}
