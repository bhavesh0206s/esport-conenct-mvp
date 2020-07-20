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
  // ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
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
      console.log('LOGIN/REGISTER-SUCCESSFULL');
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case CREATE_USERNAME:{
      console.log('CREATE_USERNAME-SUCCESSFULL')
      return{
        isAuthenticated: true,
        loading: false,
      }
    }
    case USER_LOADED:
      console.log('USERLOADING-SUCCESSFULL');
      return {
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      console.log('LOGIN/REGISTER-SUCCESSFULL');
      return {
        payload,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      console.log('AUTHERROR-SUCCESSFULL');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      console.log('LOUGOUT-SUCCESSFULL');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
