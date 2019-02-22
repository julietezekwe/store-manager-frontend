import userReducer from '../../reducers/userReducer';
import {
  SET_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_ERROR,
} from '../../actions/types';


describe('User Reducer', () => {
  it('should set get all users request', () => {
    const initialState = {
      isLoggingIn: false,
      users: {},
    };

    const action = {
      type: LOGIN_USER_REQUEST,
    };
    const loginUser = userReducer(initialState, action);
    expect(loginUser.isLoggingIn).toEqual(true);
  });
  it('should set logged in user', () => {
    const initialState = {
      isLoggedIn: false,
      user: {},
    };
    const payload = {
      id: 1,
      name: 'admin',
      email: 'admin@gmail.com',
    };
    const action = {
      type: SET_USER,
      payload,
    };
    const loggedInUser = userReducer(initialState, action);
    expect(loggedInUser.isLoggedIn).toEqual(true);
    expect(loggedInUser.isLoggingIn).toEqual(false);
    expect(loggedInUser.user.id).toEqual(1);
    expect(loggedInUser.user.email).toEqual('admin@gmail.com');
  });
  it('should set logging in user error', () => {
    const initialState = {
      isLoggedIn: false,
      user: {},
    };
    const error = 'There was a problem';
    const action = {
      type: LOGIN_USER_ERROR,
      error,
    };
    const loggedInUser = userReducer(initialState, action);
    expect(loggedInUser.isLoggingIn).toEqual(false);
    expect(loggedInUser.error).toEqual('There was a problem');
  });
});
