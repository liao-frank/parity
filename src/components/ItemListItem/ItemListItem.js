import React from 'react';

import './ItemListItem.css';

const ItemListItem = (props) => {
  const { item, onSelect, isSelected, accent, selectable } = props;
  const { _parityId, _parityName, _paritySearchName } = item;
  let content;
  if (_paritySearchName) {
    let nodes = _paritySearchName.split(/(<em>|<\/em>)/);
    let wrap = false;
    nodes = nodes.map((node, index, array) => {
      if (node === '<em>') {
        wrap = true;
        return null;
      }
      else if (node === '</em>' || !node) {
        return null;
      }
      else if (wrap) {
        wrap = false;
        return (<em key={node}>{ node }</em>);
      }
      return node;
    });
    content = nodes;
  }
  else {
    content = _parityName || _parityId;
  }

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
      { content }
      <span className="accent">
        { accent }
      </span>
    </li>
  );
};

export default ItemListItem;
