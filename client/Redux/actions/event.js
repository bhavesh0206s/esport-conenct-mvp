import {
  FETCHEVENTS_SUCCESS,
  FETCHEVENTS_FAIL,
  ADDEVENT_SUCCESS,
  ADDEVENT_FAIL,
  GETSEARCHEDEVENTS,
  CLEARSEARCHEDEVENTS,
  DELETE_MY_EVENT,
  FETCH_EVENT_DETAIL
} from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { setAlert } from './alert';
import { getCurrentProfile, getHostCurrentProfile } from './profile';
import {loading} from './loading'


//  Fetch all events to show the users/players
export const fetchallEvents = () => async (dispatch) => {
  try {
    dispatch(loading(true))
    const res = await axios.get(`http://${ipAddress}/api/event/allevents`);
    dispatch({
      type: FETCHEVENTS_SUCCESS,
      payload: res.data,
    });
    dispatch(loading(false))
  } catch (err) {
    console.log(`error from fetchallevents : ${err.message}`);
    dispatch(loading(false))
  }
};

export const fetchEventDetails = (eventId) => async (dispatch) => {
  try {
    dispatch(loading(true))
    const res = await axios.get(`http://${ipAddress}/api/event/details/${eventId}`);
    dispatch({
      type: FETCH_EVENT_DETAIL,
      payload: res.data,
    });
    dispatch(loading(false))
  } catch (err) {
    console.log(`error from fetchEventDetails : ${err.message}`);
    dispatch(loading(false))
  }
};

// Add users Event
export const AddMyEvent = (eventdata) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(eventdata);
  console.log(body)
  try {
    const res = await axios.post(
      `http://${ipAddress}/api/event/add-event`,
      body,
      config
    );
    // console.log('signup res.data: ', res.data);
    dispatch({
      type: ADDEVENT_SUCCESS,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    console.log(`error from addmyevent : ${err.message}`);
  }
};

export const eventRegistration = ({
  registerinfo,
  teamsize,
  eventId,
  hostId,
  eventdetails,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    registerinfo,
    teamsize,
    eventId,
    hostId,
    eventdetails,
  });

  try {
    dispatch(loading(true));
    await axios.post(
      `http://${ipAddress}/api/event/register`,
      body,
      config
    );
    dispatch(fetchallEvents())
    dispatch(loading(false));
    dispatch(getCurrentProfile());
    dispatch(setAlert('Registraion Successfull!!'));
    // This will update our profile after we register for the event
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch(loading(false));
  }
};
// Get all searched events
// will bring bunch of events searched in input
export const getEvents = (eventname) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://${ipAddress}/api/event/searchedevents/${eventname}`
    );

    dispatch({
      type: GETSEARCHEDEVENTS,
      payload: res.data,
    });

  } catch (err) {
    console.log('error from searchEvent: ',err.message)
  }
};

export const deleteMyEvent = (eventDetails, username) => async (dispatch) => {
  try {
    dispatch(loading(true))
    
    const res = await axios.delete(
      `http://${ipAddress}/api/event/delete/${username}`,
      { 
        data: {eventDetails},
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: DELETE_MY_EVENT,
      payload: res.data,
    });
    dispatch(getCurrentProfile())
    dispatch(fetchallEvents())
    dispatch(loading(false))
    dispatch(setAlert('Event Deleted Successfully!!'))
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch(loading(false))
  }
};

export const deleteHostedEvent = (eventDetails, username) => async (dispatch) => {
  try {
    dispatch(loading(true))

    const res = await axios.delete(
      `http://${ipAddress}/api/event/host/delete/${username}`,
      { 
        data: {eventDetails},
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch(getHostCurrentProfile())
    dispatch(loading(false))
    dispatch(setAlert('Event Deleted Successfully!!'))
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch(loading(false))
  }
};
