import {GETSEARCHEDEVENTS, CLEARSEARCHEDEVENTS} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GETSEARCHEDEVENTS:
      return [...payload];
    case CLEARSEARCHEDEVENTS:
      console.log('CLEARSEARCHEDEVENTS-SUCCESSFUL');
      return [];
    default:
      return state;
  }
};
