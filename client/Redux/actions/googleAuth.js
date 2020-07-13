import { AsyncStorage } from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { GOOGLE_LOGIN, GOOGLE_LOGOUT, GET_CACHED_AUTH_ASYNC } from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { loadUser } from './auth';
import { setAlert } from './alert';
import { getCurrentProfile, createProfile } from './profile';
import { loading } from './loading';

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ['profile', 'email'],
  clientId:
    '467702790820-h5khac5p024mdudn3956thvg0jns445i.apps.googleusercontent.com',
};

export const signInAsync = () => async (dispatch) => {
  try {
    let authState = await AppAuth.authAsync(config);
    let res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authState.accessToken}`
    );

    let resServer = await axios.post(
      `http://${ipAddress}:3000/api/google/login`,
      res.data
    );

    await AsyncStorage.setItem('token', resServer.data.token);

    dispatch({ type: GOOGLE_LOGIN, payload: resServer.data });

    const token = await AsyncStorage.getItem('token');

    if (token) {
      try {
        dispatch(createProfile({ name: res.data.name }));
        dispatch(getCurrentProfile());
      } catch (e) {
        console.log('error from google profile: ', e);
      }
    }
  } catch (e) {
    const errors = e.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      console.log('error from signup', errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};
