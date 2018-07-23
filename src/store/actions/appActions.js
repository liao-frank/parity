/*
  actions
 */
export const SET_SHOWING_HALF = 'SET_SHOWING_HALF';
export const TOGGLE_SHOWING_HALF = 'TOGGLE_SHOWING_HALF';
export const SET_SHOWING_ITEM = 'SET_SHOWING_ITEM';
export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';
export const SET_SOCKET = 'SET_SOCKET';
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const SET_LINK_FILTER = 'SET_LINK_FILTER';
export const TOGGLE_ACTIVE_LINKS_ONLY = 'TOGGLE_ACTIVE_LINKS_ONLY';
export const TOGGLE_LINK_PANEL = 'TOGGLE_LINK_PANEL';

export const setShowingHalf = (half) => {
  return {
    type: SET_SHOWING_HALF,
    half
  };
};

export const toggleShowingHalf = () => {
  return {
    type: TOGGLE_SHOWING_HALF
  };
};

export const setShowingItem = (item) => {
  return {
    type: SET_SHOWING_ITEM,
    item
  };
};

export const addToast = (toast) => {
  return {
    type: ADD_TOAST,
    toast
  };
};

export const removeToast = (id) => {
  return {
    type: REMOVE_TOAST,
    id
  };
};

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    socket
  };
};

export const setSearchFilter = (filter) => {
  return {
    type: SET_SEARCH_FILTER,
    filter
  };
};

export const setLinkFilter = (filter) => {
  return {
    type: SET_LINK_FILTER,
    filter
  };
};

export const toggleActiveLinksOnly = () => {
  return {
    type: TOGGLE_ACTIVE_LINKS_ONLY
  };
};

export const toggleLinkPanel = () => {
  return {
    type: TOGGLE_LINK_PANEL
  };
};
