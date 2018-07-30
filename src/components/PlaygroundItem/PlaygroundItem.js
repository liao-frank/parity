import React from 'react';

import './PlaygroundItem.css';

const PlaygroundItem = (props) => {
  const { item, renderer } = props;

  const itemRender = renderer ? (
    <div className="playground-item-render">
      {
        item && Object.keys(item).length > 1 ? (
          renderer(item)
        ) : (
          <p>No item data available right now.</p>
        )
      }
    </div>
  ) : null;

  return (
    <div
      className={'playground-item' + (renderer ? '' : ' no-render')}
    >
      <h3 className="header">
        {item._parityName || item._parityId}
      </h3>
        { itemRender }
    </div>
  );
};

export default PlaygroundItem;
