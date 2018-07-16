import {
  REQUEST_HALF,
  RECEIVE_HALF,
  INVALIDATE_HALF
} from '../actions';

export default (
  state = {
    left: {
      items: {},
      didInvalidate: false,
      isFetching: false
    },
    right: {
      items: {},
      didInvalidate: false,
      isFetching: false
    }
  },
  action
) => {
  const { type, half } = action;
  switch(type) {
    case REQUEST_HALF:
      return {
        ...state,
        [half]: {
          ...state[half],
          isFetching: true,
          didInvalidate: false
        }
      };
    case RECEIVE_HALF:
      return {
        ...state,
        [half]: {
          ...state[half],
          isFetching: false,
          didInvalidate: false,
          items: action.items,
          lastUpdated: action.receivedAt
        }
      };
    case INVALIDATE_HALF:
      return {
        ...state,
        [half]: {
          ...state[half],
          didInvalidate: true
        }
      };
    default:
      return state;
  }
};
