import { LOADING } from "./types";

export const loading = (loading) => (dispatch) => {
  const id = Math.random().toString();
  dispatch({
    type: LOADING,
    payload: loading,
  });
};
