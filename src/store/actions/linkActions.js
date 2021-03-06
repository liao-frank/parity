/*
  actions
 */

export const REQUEST_ALL_LINKS = 'REQUEST_ALL_LINKS';
export const RECEIVE_ALL_LINKS = 'RECEIVE_ALL_LINKS';
export const INVALIDATE_ALL_LINKS = 'INVALIDATE_ALL_LINKS';
export const RECEIVE_ADDED_LINKS = 'RECEIVE_ADDED_LINKS';
export const RECEIVE_DELETED_LINKS = 'RECEIVE_DELETED_LINKS';

/*
  creators
 */
const requestAllLinks = () => {
  return {
    type: REQUEST_ALL_LINKS
  };
};

export const receiveAllLinks = (links) => {
  return {
    type: RECEIVE_ALL_LINKS,
    links
  };
};

export const invalidateAllLinks = () => {
  return {
    type: INVALIDATE_ALL_LINKS
  };
};

const fetchAllLinks = (socket) => {
  return (dispatch) => {
    dispatch(requestAllLinks());
    return socket.emit('index-links', {});
  };
};

const shouldFetchAllLinks = (state) => {
  const { links } = state.linkState;
  if (!links) {
    return true;
  }
  else if (links.isFetching) {
    return false;
  }
  else if (Object.keys(links.fromLeft).length === 0 ||
  Object.keys(links.fromRight).length === 0) {
    return true;
  }
  return links.didInvalidate;
};

export const fetchLinksIfNeeded = () => {
  return (dispatch, getState) => {
    const state = getState();
    const socket = state.appState.socket;
    if (shouldFetchAllLinks(state)) {
      return dispatch(fetchAllLinks(socket));
    }
  };
};

export const receiveAddedLinks = (links) => {
  return {
    type: RECEIVE_ADDED_LINKS,
    links
  };
};

export const receiveDeletedLinks = (links) => {
  return {
    type: RECEIVE_DELETED_LINKS,
    links
  };
};
