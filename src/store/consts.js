export const initialState() {
  left: {
    data: {},
    isFetching: false,
    didInvalidate: false
  },
  right: {
    data: {},
    isFetching: false,
    didInvalidate: false
  },
  links: {
    data: {
      fromLeft: {},
      fromRight: {}
    },
    isFetching: false,
    didInvalidate: false
  },
  showing: {
    half: undefined,
    id: undefined
  },
  toasts: {},
  orientation: 'normal',
  socket: undefined
};
