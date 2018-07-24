import React from 'react';

import './PlaygroundItem.css';

const PlaygroundItem = (props) => {
  const { item, renderer } = props;

  return (
    <div className="playground-item">
      <h3 className="header">{item._parityName || item._parityId}</h3>
      { renderer(item) }
    </div>
  );
};

export default PlaygroundItem;
