import {
  GET_MYPROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  MYPROFILE_ERROR,
  SETPARTICULARUSER,
  CLEARPARTICULARUSER,
  CLEAR_PROFILES,
  PARTICULARUSER_ERROR,
  GETPARTICULARUSER,
  CLEAR_MYPROFILE,
} from './types';
import { ipAddress } from '../ipaddress';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Get current users profile
// This will run when user will login, to save his data in store and use it
export const getCurrentProfile = () => async (dispatch) => {
  try {
    console.log('getting profile........');
    const res = await axios.get(`http://${ipAddress}:3000/api/profile/me`);
    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    console.log('profile added........');
  } catch (err) {
    dispatch({
      type: CLEAR_MYPROFILE,
      payload: { msg: 'Failed and error in getCurrentProfile' },
    });
  }
};

// Create or update profile
// Both will work same because in backend routes we set the profile post req as findOneAndUpdate
// in that upsert was true so if user has no profile then it will be created or update
export const createProfile = (formData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
    };

    console.log('creating profile.........');

    const body = JSON.stringify(formData);

    const res = await axios.post(
      `http://${ipAddress}:3000/api/profile/me`,
      body,
      config
    );

    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    console.log('profile created........');
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log(err.message);

    dispatch({
      type: CLEAR_MYPROFILE,
      payload: { msg: 'Failed and error in createProfile' },
    });
  }
};

// Get all profiles
// will bring bunch of users searched in input
export const getProfiles = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://${ipAddress}:3000/api/profile/user/${username}`
    );

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEAR_PROFILES,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
// get info about a particular user
export const getProfileById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://${ipAddress}:3000/api/profile/user/${user_id}`
    );

    dispatch({
      type: GETPARTICULARUSER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PARTICULARUSER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Delete account & profile
// export const deleteAccount = () => async (dispatch) => {
//   try {
//     await axios.delete(`http://${ipAddress}:3000/api/profile/`);

//     dispatch({ type: ACCOUNT_DELETED });

//     dispatch(setAlert('Your account has been permanantly deleted'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // SetParticularUser
// export const setParticularUser = (data) => async (dispatch) => {
//   dispatch({
//     type: SETPARTICULARUSER,
//     payload: data,
//   });
// };

// // ClearParticularUser
// export const clearParticularUser = () => async (dispatch) => {
//   dispatch({
//     type: CLEARPARTICULARUSER,
//   });
// };
// // ClearProfiles
// export const clearProflies = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_PROFILES,
//   });
// };

// or or or or or

// SetParticularUser
// This func is used when in search input multiple users appears and when one of them is clicked
// then his profile will be stored in particularuser
export const setParticularUser = (data) => {
  dispatch({
    type: SETPARTICULARUSER,
    payload: data,
  });
};

// ClearParticularUser
export const clearParticularUser = () => {
  dispatch({
    type: CLEARPARTICULARUSER,
  });
};
// ClearProfiles
export const clearProflies = () => {
  dispatch({
    type: CLEAR_PROFILES,
  });
};
