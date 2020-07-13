import { SET_ALERT} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [payload];
    default:
      return state;
  }
};
