import {
  SET_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  user: JSON.parse(localStorage.getItem('user')) || {},
  error: null,
  isLoggingIn: true,
  isLoadingUsers: false,
  users: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case SET_USER:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error,
      };
    default:
      return state;
  }
};
