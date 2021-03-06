import React from 'react';
import AutoFixedSizeList from '../AutoFixedSizeList';

import './ItemList.css';

const ItemList = (props) => {
  const { items, isFetching, generateListItem } = props;


  if (isFetching) {
    return (
      <div className="list">
        <p>
          Loading
          <span className="icon icon-16 icon-refresh"></span>
        </p>
      </div>
    );
  }
  else if (items.length === 0) {
    return (
      <div className="list">
        <p>
          Nothing to see here.
        </p>
      </div>
    );
  }
  else {
    return (
      <AutoFixedSizeList className="list">
        { items.map(generateListItem) }
      </AutoFixedSizeList>
    );
  }
};

export default ItemList;
