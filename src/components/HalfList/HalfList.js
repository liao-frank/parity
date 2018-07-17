import React from 'react';
import HalfListItem from '../HalfListItem';

import './HalfList.css';

const HalfList = (props) => {
  const { half, items, links } = props;
  const itemsWithIds = Object.keys(items).map((_parityId) => {
    return {...items[_parityId], _parityId};
  });
  return (
    <ul className="half-list">
      { generateGroup(half, itemsWithIds, links) }
    </ul>
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
