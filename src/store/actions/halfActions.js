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
  };
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

    const onRetrieve = (err, items) => {
      if (err) {
        console.error(`Error when retrieving ${half}: ${err}`);
        items = {};
      }
      else {
        dispatch(receiveHalf(half, items));
      }
    };

    const [err, items] = retriever(onRetrieve) || [];
    if (err || items) {
      onRetrieve(err, items);
    }
  };
};

const shouldFetchHalf = (half, state) => {
  const halfData = state[half];
  if (!halfData) {
    return true;
  }
  else if (halfData.isFetching) {
    return false;
  }
  else if (!halfData.items || Object.keys(halfData.items) === 0) {
    return true;
  }
  return halfData.didInvalidate;
};

export const fetchHalfIfNeeded = (half, retriever) => {
  return (dispatch, getState) => {
    if (shouldFetchHalf(half, getState())) {
      return dispatch(fetchHalf(half, retriever));
    }
  };
};
