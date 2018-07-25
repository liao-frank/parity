import {
  SET_SHOWING_HALF,
  TOGGLE_SHOWING_HALF,
  SET_SHOWING_ITEM,
  SET_SOCKET,
  SET_SEARCH_FILTER,
  SET_LINK_FILTER,
  TOGGLE_ACTIVE_LINKS_ONLY,
  TOGGLE_LINK_PANEL
} from '../actions';
import { getOtherHalf, isValidHalf, LEFT_HALF } from '../../utils/HalfHelper';

const localStorage = window.localStorage;
let defaultShowingHalf = localStorage.getItem('showingHalf');
if (!isValidHalf(defaultShowingHalf)) {
  defaultShowingHalf = LEFT_HALF;
}
let defaultActiveLinksOnly = localStorage.getItem('activeLinksOnly') &&
  localStorage.getItem('activeLinksOnly').match(/true/);
let defaultLinkPanel = localStorage.getItem('linkPanel') &&
  localStorage.getItem('linkPanel').match(/true/);

export default (
  state = {
    showingHalf: defaultShowingHalf,
    showingItem: {},
    socket: null,
    searchFilter: '',
    linkFilter: '',
    activeLinksOnly: defaultActiveLinksOnly,
    linkPanel: defaultLinkPanel
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
      const newHalf = getOtherHalf(state.showingHalf);
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
    case SET_LINK_FILTER:
      return {
        ...state,
        linkFilter: filter
      };
    case TOGGLE_ACTIVE_LINKS_ONLY:
      const nextActiveLinksOnly = !state.activeLinksOnly;
      localStorage.setItem('activeLinksOnly', nextActiveLinksOnly);
      return {
        ...state,
        activeLinksOnly: nextActiveLinksOnly
      };
    case TOGGLE_LINK_PANEL:
      const nextLinkPanel = !state.linkPanel;
      localStorage.setItem('linkPanel', nextLinkPanel);
      return {
        ...state,
        linkPanel: nextLinkPanel
      };
    default:
      return state;
  }
};
