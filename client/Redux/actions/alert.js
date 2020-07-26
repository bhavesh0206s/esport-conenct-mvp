import { SET_ALERT, REMOVE_ALERT } from './types';

// We can use => dispatch => because of thunk middleware
export const setAlert = (msg, alertType=null, timeout = 3000) => (dispatch) => {
  const id = Math.random().toString();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
