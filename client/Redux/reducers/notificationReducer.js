import { SET_NOTIFICATION } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATION:
      return payload;
    default:
      return state;
  }
};
