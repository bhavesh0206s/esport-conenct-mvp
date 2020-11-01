import {
  FETCHEVENTS_SUCCESS,
  ADDEVENT_SUCCESS,
  CLEAR_EVENTS,
  DELETE_MY_EVENT,
  FETCH_EVENT_DETAIL,
  POSTREVIEW_SUCCESS,
} from "../actions/types";

const initialState = {
  allEvents: [],
  loading: true,
  searchedevents: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHEVENTS_SUCCESS:
      console.log("FETCHEVENTS-SUCCESSFUL");
      return {
        allEvents: [...payload],
        loading: false,
      };
    case FETCH_EVENT_DETAIL:
      console.log("FETCH_EVENT_DETAIL");
      return {
        eventDetail: payload,
        loading: false,
      };
    case ADDEVENT_SUCCESS:
      // We don't have to deal with data because its automatically saving data in profile
      console.log("ADDEVENT-SUCCESSFUL");
      return {
        loading: false,
      };
    case DELETE_MY_EVENT:
      console.log("DELETE_MY_EVENT-SUCCESSFUL");
      return {
        loading: false,
      };
    case CLEAR_EVENTS:
      console.log("CLEAREVENT-SUCCESSFUL");
      return {
        allEvents: [],
        loading: false,
      };
    case POSTREVIEW_SUCCESS:
      console.log("POSTREVIW-SUCCESSFUL");
      return {
        allEvents: [
          ...allEvents,
          allEvents
            .find((event) => {
              event._id == payload.eventDetails._id;
            })
            .reviews.push(payload.postReviewInfo),
        ],
        loading: false,
      };
    default:
      return state;
  }
};
