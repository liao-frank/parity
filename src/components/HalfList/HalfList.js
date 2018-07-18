import React from 'react';
import HalfListItem from '../HalfListItem';

import './HalfList.css';

const HalfList = (props) => {
  const { showingHalf, halfState, links } = props;
  const { items, isFetching } = halfState[showingHalf];
  const itemsWithIds = Object.keys(items).map((_parityId) => {
    return {...items[_parityId], _parityId};
  });
  return (
    !isFetching ? (
      <ul className="half-list">
        { generateGroup(showingHalf, itemsWithIds, links) }
      </ul>
    ) :
    (
      <div className="half-list">
        <p className="loading-message">
          Loading
          <div className="icon icon-16 icon-refresh"></div>
        </p>
      </div>
    )
  );
};

const generateGroup = (half, items, links) => {
  return items.map((item) => {
    return (
      <HalfListItem
        key={item._parityId}
        item={item}
        links={links.getLinks(half, item._parityId)}
      />
    );
  });
};

export default HalfList;
