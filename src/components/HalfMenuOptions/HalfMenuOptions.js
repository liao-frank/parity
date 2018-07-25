import React from 'react';
import { getOtherHalf, RIGHT_HALF } from '../../utils/HalfHelper';

import './HalfMenuOptions.css';

const HalfMenuOptions = (props) => {
  const { showingHalf, halfState, dispatchers } = props;
  const otherHalf = getOtherHalf(showingHalf);
  const isRefreshing = halfState[showingHalf].isFetching ||
    halfState[otherHalf].isFetching;
  return (
    <div className="half-menu-options">
      <div
        className="option ellipsis-overflow"
        onClick={dispatchers.onToggleHalf}
      >
        <div
          className={
            'icon icon-12 icon-switch' +
            (showingHalf === RIGHT_HALF ? ' switched' : '')
          }
        ></div>
        Switch to { halfState[otherHalf].halfClass.title }
      </div>
      <div className="separator"></div>
      <div
        className="option ellipsis-overflow"
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
      </div>
      {
        // (halfState[otherHalf].class.create) &&
        //   (<div className="option ellipsis-overflow">
        //     Create Record
        //   </div>)
      }
      {
        // (halfState[otherHalf].class.delete) &&
        //   (<div className="option ellipsis-overflow">
        //     Delete Record
        //   </div>)
      }
    </div>
  );
};

export default HalfMenuOptions;
