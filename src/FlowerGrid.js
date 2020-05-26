/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
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

const mutateFlowersInLayout = (layout, keys, newValue) => {
  const nextLayout = { ...layout };
  keys.forEach((key) => {
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

const floodFill = ({ flowerLayout, setFlowerLayout, selectedFlower }) => ({
  target,
}) => {
  if (selectedFlower === NO_SELECTED_FLOWER) return;
  let { x, y } = target.dataset;
  if (!x || !y) return;

  x = Number.parseInt(x, 10);
  y = Number.parseInt(y, 10);

  if (Number.isNaN(x) || Number.isNaN(y)) return;

  // TODO: traverse flower layout.

  setFlowerLayout(mutateFlowersInLayout(flowerLayout, [], selectedFlower));
};

const drawFlowerGrid = (
  save,
  { flowerRefs, flowerLayout, selectedFlower, start, size, width, height },
) => () => {
  if (selectedFlower === NO_SELECTED_FLOWER) return;

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
      flowersChanged ? selectedFlower : FLOWER_DELETION_TOOL,
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
  flowerLayout,
  setFlowerLayout,
  selectedFlower,
  mouse,
}) {
  const { lineBg, tileBg } = BACKGROUNDS[bgId];
  const tileSizeStyle = TILE_SIZES[tileSize];
  const { width, height } = DEFAULT_DIMENSIONS;

  const flowerRefs = useRef({});

  // Rectangle start coordinates, based on page position.
  // mouse parameter is used for end coordinates.
  const [rectStart, setRectStart] = useState(undefined);

  const { start, size } = normalizeRectangle(rectStart, mouse);

  const stateRefs = useRef({});
  stateRefs.current = {
    rectStart,
    setRectStart,
    drawFlowerGrid: drawFlowerGrid(setFlowerLayout, {
      flowerRefs,
      flowerLayout,
      selectedFlower,
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
    // Only catch left clicks.
    if (e.button !== 0) return;
    const { pageX, pageY } = e;

    setRectStart({ x: pageX, y: pageY });

    window.addEventListener('mouseup', generateOnMouseUp(stateRefs));
  };

  return (
    <>
      {rectStart ? <Rectangle start={start} size={size} /> : ''}
      <div
        className={`${styles.canvas} ${gridLines ? styles.gridLines : ''}`}
        style={{ background: lineBg }}
        onClick={
          undefined &&
          floodFill({
            flowerLayout,
            setFlowerLayout,
            selectedFlower,
            rectStart,
          })
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
