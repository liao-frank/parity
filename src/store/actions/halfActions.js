/*
  actions
 */
export const REQUEST_HALF = 'REQUEST_HALF';
export const RECEIVE_HALF = 'RECEIVE_HALF';
export const INVALIDATE_HALF = 'INVALIDATE_HALF';
// export const ADD_HALF_ITEM = 'ADD_HALF_ITEM';
// export const DELETE_HALF_ITEM = 'DELETE_HALF_ITEM';

/*
  creators
 */
export const invalidateHalf = (half) => {
  return {
    type: INVALIDATE_HALF,
    half
  };;
}

const requestHalf = (half) => {
  return {
    type: REQUEST_HALF,
    half
  };
};

const receiveHalf = (half, items) => {
  return {
    type: RECEIVE_HALF,
    half,
    items,
    receivedAt: Date.now()
  };
};

const fetchHalf = (half, retriever) => {
  return (dispatch) => {
    dispatch(requestHalf(half));

    return retriever((err, items) => {
      if (err) {
        console.error(`Error when retrieving ${half}: ${err}`);
        items = {};
      }
      dispatch(receiveHalf(half, items));
    });
  };
};

const shouldFetchHalf = (half, state) => {
  const half = state[half];
  if (!half) {
    return true;
  }
  else if (half.isFetching) {
    return false;
  }
  else if (!half.items || Object.keys(half.items) === 0) {
    return true;
  }
  return half.didInvalidate;
};

export const fetchHalfIfNeeded(half) {
  return (dispatch, getState) => {
    if (shouldFetchHalf(half, getState())) {
      return dispatch(fetchHalf());
    }
  };
};
