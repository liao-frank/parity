import {
  STORE_SOCKET
} from '../actions';

export default (
  state = {
    socket: null
  },
  action
) => {
  switch(action.type) {
    case STORE_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    default:
      return state;
  }
};
