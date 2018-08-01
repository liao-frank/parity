import React from 'react';
import { getOtherHalf, RIGHT_HALF } from '../../utils/HalfHelper';
import MenuOptions from '../MenuOptions';
import MenuOptionsItem from '../MenuOptionsItem';

import './HalfMenuOptions.css';

const HalfMenuOptions = (props) => {
  const { showingHalf, halfState, dispatchers } = props;
  const otherHalf = getOtherHalf(showingHalf);
  const isRefreshing = halfState[showingHalf].isFetching ||
    halfState[otherHalf].isFetching;
  return (
    <MenuOptions>
      <MenuOptionsItem
        onClick={dispatchers.onToggleHalf}
      >
        <div
          className={
            'icon icon-12 icon-switch' +
            (showingHalf === RIGHT_HALF ? ' switched' : '')
          }
        ></div>
        Switch to { halfState[otherHalf].halfClass.title }
      </MenuOptionsItem>
      <div className="separator"></div>
      <MenuOptionsItem
        onClick={
          () => {
            [showingHalf, otherHalf].forEach((half) => {
              dispatchers.invalidateHalf(half);
              dispatchers.onFetch(half, halfState[half].halfClass.fetch);
            });
          }
        }
      >
        <div
          className={
            'icon icon-12 icon-refresh' + (isRefreshing ? ' refreshing' : '')
          }
        ></div>
        Refresh Records
      </MenuOptionsItem>
    </MenuOptions>
  );
};

export default HalfMenuOptions;
