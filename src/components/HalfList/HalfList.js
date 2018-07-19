import React from 'react';
import HalfListItem from '../HalfListItem';

import './HalfList.css';

const HalfList = (props) => {
  const { items, isFetching } = props;


  if (isFetching) {
    return (
      <div className="menu-list">
        <p>
          Loading
          <span className="icon icon-16 icon-refresh"></span>
        </p>
      </div>
    );
  }
  else if (items.length === 0) {
    return (
      <div className="menu-list">
        <p>
          Nothing to see here.
        </p>
      </div>
    );
  }
  else {
    return (
      <ul className="menu-list">
        { generateGroup(props, items) }
      </ul>
    );
  }
};

const generateGroup = (props, items) => {
  const {
    showingHalf: half,
    showingItem,
    links,
    onSelectItem
  } = props;
  return items.map((item) => {
    return (
      <HalfListItem
        key={item._parityId}
        item={item}
        isSelected={showingItem._parityId === item._parityId}
        links={links.getLinks(half, item._parityId)}
        onSelectItem={onSelectItem}
      />
    );
  });
};

export default HalfList;
