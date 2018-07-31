import React from 'react';

const items = {
  '1':  {},
  '2':  {},
  '3':  {},
  '4':  {},
  '5':  {}
};

export default {
  title: 'Numbers',
  fetch: (callback) => {
    // map `_parityId`s into `Item` instances
    for (let id in items) {
      items[id]['_parityId'] = id;
    }

    setTimeout(() => {
      callback(null, items);
    }, 2000);
  },
  renderItem: (item) => {
    return (
      <div>
        { JSON.stringify(item) }
      </div>
    );
  }
};
