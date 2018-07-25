export const LEFT_HALF = 'LEFT_HALF';
export const RIGHT_HALF = 'RIGHT_HALF';

export const getOtherHalf = (half) => {
  if (half === LEFT_HALF) {
    return RIGHT_HALF;
  }
  else if (half === RIGHT_HALF) {
    return LEFT_HALF;
  }
  else {
    throw new Error('The number of kinds of halves is too damn high!');
  }
};

export const isValidHalf = (half) => {
  if ([LEFT_HALF, RIGHT_HALF].includes(half)) {
    return true;
  }
  return false;
}
