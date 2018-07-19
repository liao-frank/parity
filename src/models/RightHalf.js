import Half from './Half';

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

class RightHalf extends Half {
  static fetch() {
    return [
      null,
      items
    ];
  }
}

export default RightHalf;
