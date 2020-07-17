import { LOADING } from "./types";

export const loading = (loading) => {
  return {
    type: LOADING,
    payload: loading,
  };
};
