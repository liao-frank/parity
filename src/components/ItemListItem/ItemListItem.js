import React from 'react';

import './ItemListItem.css';

const ItemListItem = (props) => {
  const { item, onSelect, isSelected, accent, selectable } = props;
  return (
    <li
      className={
        'item-list-item ellipsis-overflow' +
        (isSelected ? ' selected' : '') +
        (selectable !== false ? ' selectable' : '')
      }
      onClick={() => {
        if (selectable !== false) {
          onSelect(item);
        }
      }}
    >
      { item._parityName  || item._parityId }
      <span className="accent">
        { accent }
      </span>
    </li>
  );
};

export default ItemListItem;
