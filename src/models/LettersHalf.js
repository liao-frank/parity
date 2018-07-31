import React from 'react';

const items = {
  'a':  {
    _parityName: 'ay'
  },
  'b':  {
    _parityName: 'bee'
  },
  'c':  {
    _parityName: 'see'
  },
  'd':  {
    _parityName: 'dee'
  },
  'e':  {
    _parityName: 'ee'
  }
};

export default {
  title: 'Letters',
  fetch: (callback) => {
    // map `_parityId`s into `Item` instances
    for (let id in items) {
      items[id]['_parityId'] = id;
    }

    callback(null, items);
  },
  renderItem: (item) => {
    return (
      <div>
        { JSON.stringify(item) }
      </div>
    );
  }
};
