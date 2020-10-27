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
  UPDATE_PROFILE,
  UPADTE_MYPROFILE,
  GET_PROFILE,
  GET_HOST_PROFILE,
} from "./types";
import { ipAddress } from "../ipaddress";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { loading } from "./loading";
import { setAlert } from "./alert";
import { fetchallEvents } from "./event";

// Get current users profile
// This will run when user will login, to save his data in store and use it
export const getCurrentProfile = () => async (dispatch) => {
  try {
    console.log("getting profile........");
    dispatch(loading(true));
    const res = await axios.get(`http://${ipAddress}/api/profile/me`);
    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    dispatch(loading(false));
    console.log("profile added.....");
  } catch (err) {
    console.log("error from getCurrentProfile: ", err.message);
    dispatch(loading(false));
  }
};

export const getHostCurrentProfile = () => async (dispatch) => {
  try {
    console.log("getting host profile........");
    dispatch(loading(true));
    const res = await axios.get(`http://${ipAddress}/api/profile/host`);
    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    dispatch(loading(false));
    console.log("host profile added.....");
  } catch (err) {
    console.log("error from getHostCurrentProfile: ", err.message);
    dispatch(loading(false));
  }
};

// Create or update profile
// Both will work same because in backend routes we set the profile post req as findOneAndUpdate
// in that upsert was true so if user has no profile then it will be created or update
export const createProfile = (formData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    };

    console.log("creating profile.........");

    const body = JSON.stringify(formData);

    const res = await axios.post(
      `http://${ipAddress}/api/profile/me`,
      body,
      config
    );

    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    console.log("profile created........");
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log("error from createProfile: ", err.message);
  }
};

export const createHostProfile = (formData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    };

    console.log("creating host profile.........");

    const body = JSON.stringify(formData);

    const res = await axios.post(
      `http://${ipAddress}/api/profile/host`,
      body,
      config
    );

    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
    console.log("host profile created........");
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log("error from createProfile: ", err.message);
  }
};

export const upadteProfile = (formData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    };
    console.log("upadating profile.........");

    const res = await axios.post(
      `http://${ipAddress}/api/profile/update/me`,
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: UPADTE_MYPROFILE,
      payload: res.data,
    });
    dispatch(getCurrentProfile());
    console.log("profile Updated");
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log("error from upadteProfile: ", err.message);
  }
};

export const upadteHostProfile = (formData) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    };
    console.log("upadating host profile.........");

    const res = await axios.post(
      `http://${ipAddress}/api/profile/update/host`,
      formData,
      config
    );

    dispatch({
      type: UPADTE_MYPROFILE,
      payload: res.data,
    });
    dispatch(getCurrentProfile());
    console.log("host profile Updated");
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log("error from upadteHostProfile: ", err.message);
  }
};

// Get all profiles
// will bring bunch of users searched in input
export const getProfile = (username) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axios.get(
      `http://${ipAddress}/api/profile/userbyname/${username}`
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(loading(false));
  } catch (err) {
    console.log("error from getProfiles : ", err.message);
    dispatch(loading(false));
  }
};

export const getProfiles = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://${ipAddress}/api/profiles/usersbyname/${username}`
    );

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from getProfiles : ", err.message);
  }
};

// Get profile by ID
// get info about a particular user
export const getProfileById = (user_id, navigation) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axios.get(
      `http://${ipAddress}/api/profile/userbyid/${user_id}`
    );

    dispatch({
      type: GETPARTICULARUSER,
      payload: res.data,
    });
    navigation.setParams({ HostProfileTitle: res.data.name });
    dispatch(loading(false));
  } catch (err) {
    console.log("error from getProfileById : ", err.message);
    dispatch(loading(false));
  }
};

export const getHostProfileById = (
  host_id,
  navigation,
  allowNav = true
) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axios.get(
      `http://${ipAddress}/api/profile/host-by-id/${host_id}`
    );

    dispatch({
      type: GETPARTICULARUSER,
      payload: res.data,
    });
    if (allowNav) {
      navigation.setParams({ HostProfileTitle: res.data.name });
    }
    dispatch(loading(false));
  } catch (err) {
    console.log("error from getProfileById : ", err.message);
    dispatch(loading(false));
  }
};

// Register user/team in an event

// // Delete account & profile
// export const deleteAccount = () => async (dispatch) => {
//   try {
//     await axios.delete(`http://${ipAddress}/api/profile/`);

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
