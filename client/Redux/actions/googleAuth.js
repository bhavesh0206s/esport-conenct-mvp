import AsyncStorage from '@react-native-community/async-storage';
import { GOOGLE_LOGIN } from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { setAlert } from './alert';
import {
  getCurrentProfile,
  createProfile,
  createHostProfile,
  getHostCurrentProfile,
} from './profile';
import { loading } from './loading';

import * as Google from "expo-google-app-auth";


export const signInAsync = (navigation, fromHost = false) => async (
  dispatch
) => {
  try {
    dispatch(loading(true));
    const result = await Google.logInAsync({
      androidClientId: "360005122700-75e1422nmjkgmqeosg7oca3olhps9ea0.apps.googleusercontent.com",
      androidStandaloneAppClientId: "360005122700-9rqhfuk9tvsicq0sfb1p50docfvtg7pd.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });
    let googleAccessToken;
    if (result.type === 'success') {
      googleAccessToken = result.accessToken;
      console.log(result.user)
    } else {
      return { cancelled: true };
    }

    let resServer = await axios.post(
      `http://${ipAddress}/api/google/login`,
      result.user
    );

    await AsyncStorage.setItem('token', resServer.data.token);

    const authType = resServer.data.auth;

    dispatch({ type: GOOGLE_LOGIN, payload: [res.data.email, authType, fromHost] });

    const token = await AsyncStorage.getItem('token');

    navigation.navigate('GoogleUsername', { fromHost });

    if (token) {
      try {
        if (authType === 'signup') {
          dispatch(createProfile({ name: res.data.name }));
        }
        dispatch(getCurrentProfile());
      } catch (e) {
        console.log('error from google profile: ', e);
      }
    }
    dispatch(loading(false));
  }catch (e) {
    const errors = e.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      console.log('error from signup', errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch(loading(false));
  }
};


export const signInHostAsync = (navigation, fromHost = true) => async (
  dispatch
) => {
  try {
    dispatch(loading(true));
    const result = await Google.logInAsync({
      androidClientId: "360005122700-75e1422nmjkgmqeosg7oca3olhps9ea0.apps.googleusercontent.com",
      androidStandaloneAppClientId: "360005122700-9rqhfuk9tvsicq0sfb1p50docfvtg7pd.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });
    let googleAccessToken;
    if (result.type === 'success') {
      googleAccessToken = result.accessToken;
      console.log(result.user)
    } else {
      return { cancelled: true };
    }

    let resServer = await axios.post(
      `http://${ipAddress}/api/google/host/login`,
      res.data
    );

    await AsyncStorage.setItem('token', resServer.data.token);

    const authType = resServer.data.auth;
    
    dispatch({ type: GOOGLE_LOGIN, payload: [res.data.email, authType, fromHost] });

    const token = await AsyncStorage.getItem('token');

    navigation.navigate('GoogleUsername', { fromHost });

    if (token) {
      try {
        if (authType === 'signup') {
          dispatch(createHostProfile({ name: res.data.name }));
        }
        dispatch(getHostCurrentProfile());
      } catch (e) {
        console.log('error from google profile: ', e);
      }
    }
    dispatch(loading(false));
  } catch (e) {
    const errors = e.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      console.log('error from signup', errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch(loading(false));
  }
};
