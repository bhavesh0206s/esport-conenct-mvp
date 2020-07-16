import {OPEN_MODAL} from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return payload;
    default:
      return state;
  }
};
