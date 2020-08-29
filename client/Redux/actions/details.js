import { OPEN_MODAL, SEND_EVENT_DETAILS } from "./types";
import { loading } from "./loading";

export const sendToEventCardDetails = (details, navigation) =>{
  loading(true)
  navigation.setParams({
    title: details.eventdetails.title
  })
  return {
    type: SEND_EVENT_DETAILS,
    payload: details,
  };
  loading(false)
};