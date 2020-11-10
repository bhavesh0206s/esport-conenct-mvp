import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import searchEventReducer from './searchEventReducer';
import detailsReducer from './detailsReducer';
import userEventReducer from './userEventReducer';
import notificationReducer from './notificationReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  alert: alertReducer,
  loading: loadingReducer,
  event: eventReducer,
  modal: modalReducer,
  searchEvent: searchEventReducer,
  details: detailsReducer,
  userEventInfo: userEventReducer,
  notification: notificationReducer,
  reviews: reviewReducer,
});
