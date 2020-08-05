import {
  FETCHEVENTS_SUCCESS,
  ADDEVENT_SUCCESS,
  CLEAR_EVENTS,
  DELETE_MY_EVENT,
} from '../actions/types';

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
    case DELETE_MY_EVENT:
      console.log('DELETE_MY_EVENT-SUCCESSFUL');
      return {
        loading: false,
      };
    case CLEAR_EVENTS:
      console.log('CLEAREVENT-SUCCESSFUL');
      return {
        allEvents: [],
        loading: false,
      };
    default:
      return state;
  }
};
