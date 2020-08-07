import {
  GET_PROFILES,
  GET_MYPROFILE,
  PROFILE_ERROR,
  CLEAR_MYPROFILE,
  CLEAR_PROFILES,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  MYPROFILE_ERROR,
  SETPARTICULARUSER,
  CLEARPARTICULARUSER,
  PARTICULARUSER_ERROR,
  GETPARTICULARUSER,
  UPADTE_MYPROFILE,
  GET_PROFILE
} from '../actions/types';

const initialState = {
  userProfile: null,
  particularUser: null,
  profiles: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MYPROFILE:
    case UPDATE_PROFILE:
      console.log('GETMYPROFILE-SUCCESSFULL');
      return {
        ...state,
        userProfile: payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        particularUser: payload,
        loading: false,
      };
      case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false,
        };
    case UPADTE_MYPROFILE:
      console.log('UPADTE_MYPROFILE-SUCCESSFULL');
      return {
        ...state,
        userProfile: payload,
        loading: false,
      };
    case SETPARTICULARUSER:
    case GETPARTICULARUSER:
      return {
        ...state,
        particularUser: payload,
        loading: false,
      };
    case CLEARPARTICULARUSER:
      return {
        ...state,
        particularUser: null,
        loading: false,
      };
    // case PROFILE_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false,
    //     profile: null,
    //   };
    // case PROFILES_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false,
    //     profiles: [],
    //   };
    case CLEAR_MYPROFILE:
      console.log('CLEARMYPROFILE - SUCCESSFULL');
      return {
        ...state,
        userProfile: null,
        // loading: false,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
};
