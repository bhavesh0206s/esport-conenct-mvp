import {GET_REVIEW_SUCCESS, LOADING} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEW_SUCCESS:
      return payload;
    default:
      return state;
  }
};
