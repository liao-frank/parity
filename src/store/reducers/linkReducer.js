import {
  REQUEST_ALL_LINKS,
  RECEIVE_ALL_LINKS,
  INVALIDATE_ALL_LINKS,
  RECEIVE_ADDED_LINKS,
  RECEIVE_DELETED_LINKS
} from '../actions';
import ManyToMany from '../utils/ManyToMany';

export default (
  state = {
    links: new ManyToMany(),
    didInvalidate: false,
    isFetching: false
  },
  action
) => {
  let copyLinks;
  const { type, links } = action;

  switch(type) {
    case REQUEST_ALL_LINKS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };

    case RECEIVE_ALL_LINKS:
      const newLinks = new ManyToMany();
      action.links.forEach(l => newLinks.addLink(l));
      return {
        ...state,
        links: newLinks,
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      };

    case INVALIDATE_ALL_LINKS:
      return {
        ...state,
        didInvalidate: true
      };

    case RECEIVE_ADDED_LINKS:
      copyLinks = new ManyToMany(state.links);
      const addedLinks = Array.isArray(links) ? links : [links];
      addedLinks.forEach(l => copyLinks.addLink(l));
      return {
        ...state,
        links: copyLinks
      };

    case RECEIVE_DELETED_LINKS:
      copyLinks = new ManyToMany(state.links);
      const deletedLinks = Array.isArray(links) ? links : [links];
      deletedLinks.forEach(l => copyLinks.deleteLink(l));
      return {
        ...state,
        links: copyLinks
      };

    default:
      return state;
  }
};
