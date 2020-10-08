import { USER_EVENT_INFO } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_EVENT_INFO:
      return payload;
    default:
      return state;
  }
};
