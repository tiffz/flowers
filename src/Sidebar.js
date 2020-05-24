/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ToolsIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';

import Flower from './Flower';
import { StyledTabs, StyledTab } from './StyledTabs';
import styles from './Sidebar.css';
import {
  FLOWERS,
  BACKGROUNDS,
  ICON_STYLES,
  TILE_SIZES,
  NO_SELECTED_FLOWER,
  FLOWER_DELETION_TOOL,
} from './consts';

function Sidebar({
  bgId,
  setBgId,
  setFlowerLayout,
  selectedFlower,
  setSelectedFlower,
  iconStyle,
  setIconStyle,
  tileSize,
  setTileSize,
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
          }}
        />
      ) : (
        <Tools {...{ iconStyle, selectedFlower, setSelectedFlower }} />
      )}
    </div>
  );
}

function Tools({ iconStyle, selectedFlower, setSelectedFlower }) {
  return (
    <>
      <h2>Flowers</h2>
      <div className={styles.flowerSelector}>
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
              className={`${styles.flowerSelectorButton} ${
                selected ? styles.selected : ''
              }`}
              key={name || 'Delete tool'}
            >
              {content}
            </button>
          );
        })}
      </div>
    </>
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
}) {
  return (
    <>
      <BackgroundSelector bgId={bgId} setBgId={setBgId} />
      <button
        type="button"
        className={styles.button}
        onClick={() => setIconStyle((iconStyle + 1) % ICON_STYLES.length)}
      >
        <Flower id={1} iconStyle={iconStyle} />
        Switch flower style
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
        <a href="https://github.com/tiffz/flowers">available on Github</a>.
      </p>
    </>
  );
}

function BackgroundSelector({ bgId, setBgId }) {
  return (
    <div className={styles.backgroundSelector}>
      {BACKGROUNDS.map(({ tileBg }, id) => {
        const selected = id === bgId;
        return (
          <button
            key={tileBg}
            type="button"
            className={`${styles.bgButton} ${selected ? styles.selected : ''}`}
            aria-label={`Change background to ${tileBg}`}
            style={{ background: tileBg }}
            onClick={() => setBgId(id)}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
