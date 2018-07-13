import {
  REQUEST_ALL_LINKS,
  RECEIVE_ALL_LINKS,
  INVALIDATE_ALL_LINKS,
  RECEIVE_ADDED_LINKS,
  RECEIVE_DELETED_LINKS
} from '../actions/linkActions';

export default (
  state = {
    links: {
      byLeft: {},
      byRight: {},
      didInvalidate: false,
      isFetching: false
    }
  },
  action
) => {
  switch(action.type) {
    case REQUEST_ALL_LINKS:
      return Object.assign({}, state, {
        links: Object.assign({}, state.links, {
          isFetching: true,
          didInvalidate: false
        })
      });
    case RECEIVE_ALL_LINKS:
      return Object.assign({}, state, {
        links: Object.assign({}, state.links, mapLinks(action.links), {
          isFetching: false,
          didInvalidate: false,
          lastUpdated: action.receivedAt
        })
      });
    case INVALIDATE_ALL_LINKS:
      return Object.assign({}, state, {
        links: Object.assign({}, state.links, {
          didInvalidate: true
        })
      });
    case RECEIVE_ADDED_LINKS:
      const {
        byLeft: addedByLeft,
        byRight: addedByRight
      } = mapLinks(action.links);
      return Object.assign({}, state, {
        links: Object.assign({}, state.links, {
          byLeft: Object.assign({}, state.links.byLeft, addedByLeft),
          byRight: Object.assign({}, state.links.byRight, addedByRight)
        })
      });
    case RECEIVE_DELETED_LINKS:
      const {
        byLeft: deletedByLeft,
        byRight: deletedByRight
      } = unmapLinks(action.links);
      return Object.assign({}, state, {
        links: Object.assign({}, state.links, {
          byLeft: Object.assign({}, state.links.byLeft, deletedByLeft),
          byRight: Object.assign({}, state.links.byRight, deletedByRight)
        })
      });
  }
};

const mapLinks = (links) => {
  const maps = {
    byLeft: {},
    byRight: {}
  };

  links.forEach((link) => {
    const { leftId, rightId } = link;
    maps.byLeft[leftId] = link;
    maps.byRight[rightId] = link;
  });

  return maps;
};

// an unmap is just an object for (un)assigning into previous map
const unmapLinks = (links) => {
  const unmaps = {
    byLeft: {},
    byRight: {}
  };

  links.forEach((link) => {
    const { leftId, rightId } = link;
    unmaps.byLeft[leftId] = undefined;
    unmaps.byRight[rightId] = undefined;
  });

  return unmaps;
}
