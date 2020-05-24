/* eslint-disable react/prop-types */
import React from 'react';
import { FLOWERS, NO_SELECTED_FLOWER, FLOWER_DELETION_TOOL } from './consts';

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
      src={`images/flowers/${iconStyle}/${id}.png`}
      alt={flower.name}
      title={flower.name}
    />
  );
}

export default Flower;
