/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styles from './App.css';
import {
  FLOWERS,
  DEFAULT_DIMENSIONS,
  BACKGROUNDS,
  ICON_STYLES,
  TILE_SIZES,
} from './consts';

const NO_SELECTED_FLOWER = -1;
const FLOWER_DELETION_TOOL = 0;

function mapRange(end, f) {
  const arr = [];
  for (let i = 0; i < end; i += 1) {
    arr[i] = f(i);
  }
  return arr;
}

function App() {
  const [flowerLayout, setFlowerLayout] = useState({});
  const [selectedFlower, setSelectedFlower] = useState(NO_SELECTED_FLOWER);
  const [bgId, setBgId] = useState(0);
  const [iconStyle, setIconStyle] = useState(0);
  const [tileSize, setTileSize] = useState(1);

  const { canvasBg, tileBg } = BACKGROUNDS[bgId];
  const { size } = TILE_SIZES[tileSize];

  const flowerGrid = mapRange(DEFAULT_DIMENSIONS.width, (x) =>
    mapRange(DEFAULT_DIMENSIONS.height, (y) => {
      const key = `${x}-${y}`;
      const id = flowerLayout[key] || 0;
      const updateFlowerLayout = () => {
        if (selectedFlower === NO_SELECTED_FLOWER) return;
        const newLayout = {
          ...flowerLayout,
          [key]: selectedFlower,
        };
        if (selectedFlower === FLOWER_DELETION_TOOL) {
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
          setTileSize,
        }}
      />
      <div className={styles.canvas} style={{ background: canvasBg }}>
        {flowerGrid}
      </div>
    </div>
  );
}

function Sidebar({
  bgId,
  setBgId,
  setFlowerLayout,
  selectedFlower,
  setSelectedFlower,
  iconStyle,
  setIconStyle,
  setTileSize,
}) {
  return (
    <div className={styles.sidebar}>
      {BACKGROUNDS.map(({ tileBg }, id) => {
        const selected = id === bgId;
        return (
          <button
            type="button"
            className={`${styles.bgButton} ${selected ? styles.selected : ''}`}
            aria-label={`Change background to ${tileBg}`}
            style={{ background: tileBg }}
            onClick={() => setBgId(id)}
          />
        );
      })}
      <button
        type="button"
        onClick={() => setIconStyle((iconStyle + 1) % ICON_STYLES.length)}
      >
        Switch icon style
      </button>
      Tile size:{' '}
      {TILE_SIZES.map(({ name }, id) => (
        <button type="button" onClick={() => setTileSize(id)}>
          {name}
        </button>
      ))}
      <button
        type="button"
        onClick={() =>
          // eslint-disable-next-line no-alert
          window.confirm('Are you sure you want clear your flowers?') &&
          setFlowerLayout({})
        }
      >
        Clear flowers
      </button>
      <h2>Flowers</h2>
      {FLOWERS.map(({ name }, id) => {
        let content = <Flower id={id} iconStyle={iconStyle} />;
        if (id === FLOWER_DELETION_TOOL) {
          content = (
            <img
              src="images/trash.png"
              alt="Erase flowers"
              title="Erase flowers"
            />
          );
        }
        const selected = selectedFlower === id;
        return (
          <button
            type="button"
            onClick={() =>
              setSelectedFlower(selected ? NO_SELECTED_FLOWER : id)
            }
            className={`${styles.flowerSelector} ${
              selected ? styles.selected : ''
            }`}
            key={name}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

function Flower({ id = NO_SELECTED_FLOWER, iconStyle = 0 }) {
  if (
    id === NO_SELECTED_FLOWER ||
    id === FLOWER_DELETION_TOOL ||
    id >= FLOWERS.length
  ) {
    return <></>;
  }
  const flower = FLOWERS[id];
  return (
    <img
      className={styles.flower}
      src={`images/flowers/${iconStyle}/${id}.png`}
      alt={flower.name}
      title={flower.name}
    />
  );
}

export default App;
