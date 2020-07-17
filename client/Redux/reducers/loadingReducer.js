import {LOADING} from '../actions/types';

const initialState = true;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return payload;
    default:
      return state;
  }
};
