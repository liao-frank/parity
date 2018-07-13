/*
  actions
 */
export const TOGGLE_ORIENTATION = 'TOGGLE_ORIENTATION';
export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

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

export const toggleOrientation = () => {
  return {
    type: TOGGLE_ORIENTATION
  };
};
