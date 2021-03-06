import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GOOGLE_LOGIN,
  CREATE_USERNAME,
  USER_LOADED_NO_USERNAME,
  // ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  isUserNameVerified: false,
  user: null,
  fromHost: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case GOOGLE_LOGIN:
      return {
        email: payload[0],
        isAuthenticated: payload[1] === "signin" ? true : false,
        loading: false,
        isUserNameVerified: payload[1] === "signin" ? true : false,
        fromHost: payload[2],
      };
    case CREATE_USERNAME: {
      console.log("CREATE_USERNAME-SUCCESSFULL");
      return {
        isAuthenticated: true,
        loading: false,
        isUserNameVerified: true,
      };
    }
    case USER_LOADED:
      console.log("USERLOADING-SUCCESSFULL");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        fromHost: payload.fromHost,
        isUserNameVerified: true,
      };
    case USER_LOADED_NO_USERNAME:
      console.log("USER_LOADED_NO_USERNAME-SUCCESSFULL");
      return {
        ...state,
        fromHost: payload.fromHost,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      console.log("LOGIN/REGISTER-SUCCESSFULL");
      return {
        payload,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      console.log("AUTHERROR-SUCCESSFULL");
      return {
        isAuthenticated: false,
        loading: false,
        isUserNameVerified: false,
      };
    case LOGOUT:
      console.log("LOUGOUT-SUCCESSFULL");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        isUserNameVerified: false,
      };
    default:
      return state;
  }
};
