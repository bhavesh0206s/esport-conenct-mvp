import { OPEN_MODAL } from "./types";

export const modal = (bool) =>{
  return {
    type: OPEN_MODAL,
    payload: bool,
  };
};