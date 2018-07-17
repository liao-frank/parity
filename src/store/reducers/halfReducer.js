import {
  SET_HALF_CLASS,
  REQUEST_HALF,
  RECEIVE_HALF,
  INVALIDATE_HALF
} from '../actions';

export default (
  state = {
    left: {
      class: {},
      items: {},
      didInvalidate: false,
      isFetching: false
    },
    right: {
      class: {},
      items: {},
      didInvalidate: false,
      isFetching: false
    }
  },
  action
) => {
  const { type, half, halfClass } = action;
  switch(type) {
    case SET_HALF_CLASS:
      return {
        ...state,
        [half]: {
          ...state[half],
          class: halfClass || {}
        }
      };
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
