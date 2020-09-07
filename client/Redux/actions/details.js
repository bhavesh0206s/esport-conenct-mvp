import { SEND_PARTICIPANTS_DETAILS, SEND_EVENT_DETAILS } from "./types";
import { loading } from "./loading";

export const sendToEventCardDetails = (details, navigation) =>{

  navigation.setParams({
    title: details.eventdetails.title
  })

  return {
    type: SEND_EVENT_DETAILS,
    payload: details,
  };

};
