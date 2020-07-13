import { LOADING } from "./types";

// We can use => dispatch => because of thunk middleware
export const loading = (loading) => (dispatch) => {
  const id = Math.random().toString();
  dispatch({
    type: LOADING,
    payload: loading,
  });
};
