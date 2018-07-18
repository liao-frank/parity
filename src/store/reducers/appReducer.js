import {
  SET_SHOWING_HALF,
  TOGGLE_SHOWING_HALF,
  SET_SHOWING_ITEM,
  SET_SOCKET
} from '../actions';

const localStorage = window.localStorage;

export default (
  state = {
    showingHalf: localStorage.getItem('showingHalf') || 'left',
    showingItem: '',
    socket: null
  },
  action
) => {
  const { type, half, item } = action;
  switch(type) {
    case SET_SHOWING_HALF:
      localStorage.setItem('showingHalf', half);
      return {
        ...state,
        showingHalf: half
      };
    case TOGGLE_SHOWING_HALF:
      const newHalf = state.showingHalf === 'left' ? 'right' : 'left';
      localStorage.setItem('showingHalf', newHalf);
      return {
        ...state,
        showingHalf: newHalf
      };
    case SET_SHOWING_ITEM:
      return {
        ...state,
        showingItem: item
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    default:
      return state;
  }
};
