import Half from './Half';

const items = {
  '1':  {

  },
  '2':  {

  },
  '3':  {

  },
  '4':  {

  },
  '5':  {

  }
};

class LeftHalf extends Half {
  static fetch(callback) {
    setTimeout(() => {
      for (let id in items) {
        items[id]['_parityId'] = id;
      }
      callback(null, items);
    }, 2000);
  }
}

export default LeftHalf;
