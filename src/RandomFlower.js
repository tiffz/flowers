/* eslint-disable react/prop-types */
import React from 'react';
import { RANDOM_FLOWER_OPTIONS } from './consts';
import styles from './RandomFlower.css';

export default function RandomFlower({ option = 0, style }) {
  if (!(option in RANDOM_FLOWER_OPTIONS)) return <></>;
  const { name, styles: optionStyles } = RANDOM_FLOWER_OPTIONS[option];

  return (
    <div
      className={styles.randomFlower}
      style={{ ...style, ...optionStyles }}
      title={name}
    >
      ?
    </div>
  );
}
