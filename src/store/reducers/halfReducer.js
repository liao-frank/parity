import {
  SET_HALF_CLASS,
  REQUEST_HALF,
  RECEIVE_HALF,
  INVALIDATE_HALF
} from '../actions';
import { LEFT_HALF, RIGHT_HALF } from '../../utils/HalfHelper';

export default (
  state = {
    [LEFT_HALF]: {
      halfClass: {},
      items: {},
      didInvalidate: false,
      isFetching: false
    },
    [RIGHT_HALF]: {
      halfClass: {},
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
      if (halfClass && typeof halfClass === 'function') {
        halfClass.title = halfClass.title || halfClass.name.match(/(\w*)Half/)[1];
      }
      return {
        ...state,
        [half]: {
          ...state[half],
          halfClass: halfClass || {}
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
