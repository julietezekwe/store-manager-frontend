/* eslint-disable import/prefer-default-export */
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import resolveError from '../helpers/resolveError';
import basePath from '../helpers/basePath';
import Notify from '../helpers/Notify';
import { setCart } from '../helpers/setCart';
import {
  SET_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_ERROR,
} from './types';


const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = payload => ({
  type: SET_USER,
  payload,
});

const loginUserFailure = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

export const loginUser = (user, props) => async (dispatch) => {
  dispatch(loginUserRequest());

  try {
    const data = await axios.post(`${basePath}/auth/login`, user);
    const [userDetails] = await Promise.all([data]);

    const userDetail = await jwtDecode(userDetails.data.token);

    const payload = { ...userDetail, token: userDetails.data.token };
    await dispatch(loginUserSuccess(payload));
    await localStorage.setItem('user', JSON.stringify(payload));
    await localStorage.setItem('isLoggedIn', true);
    if (payload.role === 'attendant') setCart(payload);
    if (userDetail.role === 'admin') {
      props.history.push('/admin');
    } else props.history.push('/attendant');
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(loginUserFailure(errorMessage));
    Notify.notifyError(`Login Error. ${errorMessage}`);
  }
};
