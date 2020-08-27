import {SEND_EVENT_DETAILS} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_EVENT_DETAILS:
      return payload;
    default:
      return state;
  }
};
