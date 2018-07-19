import {
  SET_SHOWING_HALF,
  TOGGLE_SHOWING_HALF,
  SET_SHOWING_ITEM,
  SET_SOCKET,
  SET_SEARCH_FILTER
} from '../actions';

const localStorage = window.localStorage;
let defaultShowingHalf = localStorage.getItem('showingHalf');
if (defaultShowingHalf !== 'left' && defaultShowingHalf !== 'right') {
  defaultShowingHalf = 'left';
}

export default (
  state = {
    showingHalf: defaultShowingHalf,
    showingItem: {},
    socket: null,
    searchFilter: ''
  },
  action
) => {
  const { type, half, item, filter } = action;
  switch(type) {
    case SET_SHOWING_HALF:
      localStorage.setItem('showingHalf', half);
      return {
        ...state,
        showingHalf: half,
        showingItem: {}
      };
    case TOGGLE_SHOWING_HALF:
      const newHalf = state.showingHalf === 'left' ? 'right' : 'left';
      localStorage.setItem('showingHalf', newHalf);
      return {
        ...state,
        showingHalf: newHalf,
        showingItem: {}
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
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: filter
      };
    default:
      return state;
  }
};
