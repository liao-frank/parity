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
      callback(null, items);
    }, 2000);
  }
}

export default LeftHalf;