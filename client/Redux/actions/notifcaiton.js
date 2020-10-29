import axios from 'axios';
import { SET_ALERT, REMOVE_ALERT } from './types';
import {ipAddress} from '../ipaddress'
// We can use => dispatch => because of thunk middleware
export const setNotification = (notification) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: notification,
  });
};

export const setNotificationToken = async (token) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ token });

  try {
    const res = await axios.post(
      `http://${ipAddress}/api/notification/token`,
      body,
      config
    );
  } catch(e){
    console.log('error from setNotificationToken: ', e.message)
  }
};

export const sendNotification = async (title, detail) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title, detail });

  try {
    const res = await axios.post(
      `http://${ipAddress}/api/notification/send`,
      body,
      config
    );
  } catch(e){
    console.log('error from sendNotification: ', e.message)
  }
};
