import {
  FETCHEVENTS_SUCCESS,
  FETCHEVENTS_FAIL,
  ADDEVENT_SUCCESS,
  ADDEVENT_FAIL,
  CLEAR_EVENTS,
  CLEARSEARCHEDEVENTS,
  GETSEARCHEDEVENTS,
} from '../actions/types';

// I have kept this initial state an object so when in future we want to add more stuff we can easily do in object
const initialState = {
  allEvents: [],
  loading: true,
  searchedevents: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHEVENTS_SUCCESS:
      console.log('FETCHEVENTS-SUCCESSFUL');
      return {
        allEvents: [...payload],
        loading: false,
      };
    case ADDEVENT_SUCCESS:
      // We don't have to deal with data because its automatically saving data in profile
      console.log('ADDEVENT-SUCCESSFUL');
      return {
        loading: false,
      };
    case GETSEARCHEDEVENTS:
      console.log('GETSEARCHEDEVENTS-SUCCESSFUL');
      return {
        searchedevents: [...payload],
        loading: false,
      };
    case CLEAR_EVENTS:
      console.log('CLEAREVENT-SUCCESSFUL');
      return {
        allEvents: [],
        loading: false,
      };
    case CLEARSEARCHEDEVENTS:
      console.log('CLEARSEARCHEDEVENTS-SUCCESSFUL');
      return {
        searchedevents: [],
        loading: false,
      };
    default:
      return state;
  }
};
