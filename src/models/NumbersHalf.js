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

class NumbersHalf extends Half {
  static fetch(callback) {
    setTimeout(() => {
      for (let id in items) {
        items[id]['_parityId'] = id;
      }
      callback(null, items);
    }, 2000);
  }
}

NumbersHalf.title = 'Numbers';
export default NumbersHalf;
