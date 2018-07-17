import {
  SET_SHOWING_HALF,
  SET_SHOWING_ITEM,
  SET_SOCKET
} from '../actions';

export default (
  state = {
    showingHalf: 'left',
    showingItem: '',
    socket: null
  },
  action
) => {
  const { type, half, item } = action;
  switch(type) {
    case SET_SHOWING_HALF:
      return {
        ...state,
        showingHalf: half
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
