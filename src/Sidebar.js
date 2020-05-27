/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ToolsIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import LoadIcon from '@material-ui/icons/FolderOpen';
import FlowerStampIcon from '@material-ui/icons/LocalFlorist';
import PaintBucketIcon from '@material-ui/icons/FormatColorFill';
import RandomIcon from '@material-ui/icons/HelpOutlineRounded';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

import Flower from './Flower';
import RandomFlower from './RandomFlower';
import LoadDialog from './LoadDialog';
import { StyledTabs, StyledTab } from './StyledTabs';
import styles from './Sidebar.css';
import {
  tools,
  FLOWERS,
  FLOWER_COLOR_ORDER,
  FLOWER_SPECIES_ORDER,
  RANDOM_FLOWER_OPTIONS,
  flowerSorts,
  BACKGROUNDS,
  ICON_STYLES,
  TILE_SIZES,
  NO_SELECTED_FLOWER,
  FLOWER_DELETION_TOOL,
} from './consts';

function saveStateAsFile() {
  const data = localStorage.getItem('acnhFlowers');
  const a = document.createElement('a');
  const file = new Blob([data], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = 'ACNH-flowers.json';
  a.click();
}

function Sidebar({
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
}) {
  const [selectedTab, setTab] = useState(0);
  return (
    <div className={styles.sidebar}>
      <StyledTabs value={selectedTab} onChange={(e, v) => setTab(v)}>
        <StyledTab icon={<ToolsIcon />} label="Tools" />
        <StyledTab icon={<SettingsIcon />} label="Settings" />
      </StyledTabs>
      {selectedTab === 1 ? (
        <Settings
          {...{
            bgId,
            setBgId,
            setFlowerLayout,
            iconStyle,
            setIconStyle,
            tileSize,
            setTileSize,
            gridLines,
            setGridLines,
          }}
        />
      ) : (
        <Tools
          {...{
            undo,
            redo,
            currentTool,
            setTool,
            iconStyle,
            sortStyle,
            setSortStyle,
            selectedFlower,
            setSelectedFlower,
            randomOption,
            setRandomOption,
          }}
        />
      )}
    </div>
  );
}

function Tools({
  undo,
  redo,
  currentTool,
  setTool,
  iconStyle,
  sortStyle,
  setSortStyle,
  selectedFlower,
  setSelectedFlower,
  randomOption,
  setRandomOption,
}) {
  const updateSort = () => {
    setSortStyle((sortStyle + 1) % Object.keys(flowerSorts).length);
  };
  const sortByColor = sortStyle === flowerSorts.BY_COLOR;
  let sortedFlowers = [];
  if (sortByColor) {
    sortedFlowers = FLOWER_COLOR_ORDER.flatMap((c) =>
      FLOWERS.filter(({ color }) => c === color),
    );
  } else {
    sortedFlowers = FLOWER_SPECIES_ORDER.flatMap((s) =>
      FLOWERS.filter(({ species }) => s === species),
    );
  }
  return (
    <>
      <div className={styles.toolBar}>
        <button
          type="button"
          title="Flower stamp"
          className={`${styles.button} ${
            currentTool === tools.FLOWER_STAMP ? styles.selected : ''
          }`}
          onClick={() => setTool(tools.FLOWER_STAMP)}
        >
          <FlowerStampIcon
            className={styles.icon}
            htmlColor="var(--accent-color)"
          />
        </button>
        <button
          type="button"
          title="Paint bucket tool"
          className={`${styles.button} ${
            currentTool === tools.PAINT_BUCKET ? styles.selected : ''
          }`}
          onClick={() => setTool(tools.PAINT_BUCKET)}
        >
          <PaintBucketIcon
            className={styles.icon}
            htmlColor="var(--accent-color)"
          />
        </button>
        <button
          type="button"
          title="Random flower tool"
          className={`${styles.button} ${
            currentTool === tools.RANDOM ? styles.selected : ''
          }`}
          onClick={() => setTool(tools.RANDOM)}
        >
          <RandomIcon className={styles.icon} htmlColor="var(--accent-color)" />
        </button>

        <button
          type="button"
          className={styles.button}
          title="Undo"
          onClick={undo}
        >
          <UndoIcon className={styles.icon} />
        </button>
        <button
          type="button"
          className={styles.button}
          title="Redo"
          onClick={redo}
        >
          <RedoIcon className={styles.icon} />
        </button>
      </div>
      {currentTool === tools.RANDOM ? (
        <>
          <h2>Random flower tool</h2>
          <div className={styles.randomSelector}>
            {RANDOM_FLOWER_OPTIONS.map(({ name }, id) => (
              <button
                type="button"
                className={id === randomOption ? styles.selected : ''}
                key={name}
                title={name}
                onClick={() => setRandomOption(id)}
              >
                <RandomFlower option={id} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>
            Flowers{' '}
            <button
              type="button"
              className={styles.smallButton}
              onClick={updateSort}
              style={{ marginRight: '0px', width: '150px' }}
            >
              Sort by: {sortByColor ? 'Color' : 'Species'}
            </button>
          </h2>
          <div className={styles.flowerSelector}>
            <FlowerButton
              id={FLOWER_DELETION_TOOL}
              {...{ iconStyle, selectedFlower, setSelectedFlower }}
            />
            {sortedFlowers.map(({ id }) => (
              <FlowerButton
                key={id}
                id={id}
                {...{ iconStyle, selectedFlower, setSelectedFlower }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function FlowerButton({ id, iconStyle, selectedFlower, setSelectedFlower }) {
  let content = <Flower id={id} iconStyle={iconStyle} />;
  if (id === FLOWER_DELETION_TOOL) {
    content = (
      <img src="images/trash.png" alt="Erase flowers" title="Erase flowers" />
    );
  }
  const selected = selectedFlower === id;
  return (
    <button
      type="button"
      onClick={() => setSelectedFlower(selected ? NO_SELECTED_FLOWER : id)}
      className={`${styles.flowerSelectorButton} ${
        selected ? styles.selected : ''
      }`}
    >
      {content}
    </button>
  );
}

function Settings({
  bgId,
  setBgId,
  setFlowerLayout,
  iconStyle,
  setIconStyle,
  tileSize,
  setTileSize,
  gridLines,
  setGridLines,
}) {
  const [dialogOpen, setOpen] = React.useState(false);
  return (
    <>
      <LoadDialog
        open={dialogOpen}
        setOpen={setOpen}
        setFlowerLayout={setFlowerLayout}
      />
      <BackgroundSelector bgId={bgId} setBgId={setBgId} />
      <button
        type="button"
        className={styles.button}
        onClick={() => setIconStyle((iconStyle + 1) % ICON_STYLES.length)}
      >
        <Flower id={1} iconStyle={iconStyle} />
        Switch flower style
      </button>
      <button
        type="button"
        className={`${styles.button} ${gridLines ? styles.selected : ''}`}
        onClick={() => setGridLines(gridLines ? 0 : 1)}
      >
        Grid lines: {gridLines ? 'On' : 'Off'}
      </button>
      <div className={styles.buttonGroup}>
        {TILE_SIZES.map(({ name }, id) => (
          <button
            type="button"
            key={name}
            className={id === tileSize ? styles.selected : ''}
            onClick={() => setTileSize(id)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.importExport}>
        <button
          style={{ marginRight: '16px' }}
          type="button"
          className={styles.button}
          title="Save as file"
          onClick={saveStateAsFile}
        >
          <SaveIcon htmlColor="#00B0FF" className={styles.icon} />
          Save...
        </button>
        <button
          style={{ marginLeft: '0px' }}
          type="button"
          className={styles.button}
          title="Load from file"
          onClick={() => setOpen(true)}
        >
          <LoadIcon htmlColor="#F9A825" className={styles.icon} />
          Load...
        </button>
      </div>
      <button
        type="button"
        className={`${styles.button} ${styles.tertiary}`}
        onClick={() =>
          // eslint-disable-next-line no-alert
          window.confirm('Are you sure you want clear your flowers?') &&
          setFlowerLayout({})
        }
      >
        <ClearIcon htmlColor="#FF8A80" className={styles.icon} />
        Clear flowers
      </button>
      <h2>About</h2>
      <p>
        ACNH Flower Planner is a tool to help you plan flower layouts in Animal
        Crossing: New Horizons.
      </p>
      <p>
        Source code{' '}
        <a
          href="https://github.com/tiffz/flowers"
          target="_blank"
          rel="noreferrer"
        >
          available on Github
        </a>
        .
      </p>
    </>
  );
}

function BackgroundSelector({ bgId, setBgId }) {
  return (
    <div className={styles.backgroundSelector}>
      {BACKGROUNDS.map(({ name, tileBg }, id) => {
        const selected = id === bgId;
        return (
          <button
            key={name}
            type="button"
            className={`${styles.bgButton} ${selected ? styles.selected : ''}`}
            aria-label={`Change background to ${tileBg}`}
            style={{
              backgroundColor: tileBg.color,
              backgroundImage: tileBg.img,
              backgroundSize: '100%',
            }}
            onClick={() => setBgId(id)}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
