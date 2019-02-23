/* eslint-disable no-undef */
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import resolveError from '../helpers/resolveError';
import setHeader from '../helpers/setHeader';
import Notify from '../helpers/Notify';
import basePath from '../helpers/basePath';
import { setCart } from '../helpers/setCart';
import {
  SET_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_ERROR,
  SET_USERS,
  GET_USERS_REQUEST,
  GET_USERS_ERROR,
  ADD_USER,
  ADD_USER_REQUEST,
  ADD_USER_ERROR,
  EDIT_USER,
  EDIT_USER_REQUEST,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_REQUEST,
  DELETE_USER_ERROR,
} from './types';


export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = payload => ({
  type: SET_USER,
  payload,
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

export const getUserRequest = () => ({
  type: GET_USERS_REQUEST,
});

export const getUserSuccess = payload => ({
  type: SET_USERS,
  payload,
});

export const getUserFailure = error => ({
  type: GET_USERS_ERROR,
  error,
});


export const addUserequest = () => ({
  type: ADD_USER_REQUEST,
});

export const addUserSuccess = payload => ({
  type: ADD_USER,
  payload,
});

export const addUserError = error => ({
  type: ADD_USER_ERROR,
  error,
});

export const editUserequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = payload => ({
  type: EDIT_USER,
  payload,
});

export const editUserError = error => ({
  type: EDIT_USER_ERROR,
  error,
});


export const deleteUserequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = payload => ({
  type: DELETE_USER,
  payload,
});

export const deleteUserError = error => ({
  type: DELETE_USER_ERROR,
  error,
});
export const loginUser = (user, props) => async (dispatch) => {
  dispatch(loginUserRequest());

  try {
    const data = await axios.post(`${basePath}/auth/login`, user);
    const [userDetails] = await Promise.all([data]);

    const userDetail = await jwtDecode(userDetails.data.token);

    const payload = { ...userDetail };
    await dispatch(loginUserSuccess(payload));
    await localStorage.setItem('user', JSON.stringify(payload));
    await localStorage.setItem('token', userDetails.data.token);
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

export const getAllUsers = () => async (dispatch) => {
  setHeader();
  dispatch(getUserRequest());
  try {
    const data = await axios.get(`${basePath}/users`);
    const [usersDetails] = await Promise.all([data]);
    const payload = usersDetails.data;
    dispatch(getUserSuccess(payload));
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(getUserFailure(errorMessage));
    Notify.notifyError(`Error. ${errorMessage}`);
  }
};

export const addUser = userDetails => async (dispatch) => {
  dispatch(addUserequest());
  setHeader();
  try {
    const data = await axios.post(`${basePath}/auth/createUser`, userDetails);
    const [userDetail] = await Promise.all([data]);
    dispatch(addUserSuccess(userDetail.data.userDetail));
    Notify.notifySuccess('User has been added');
  } catch (error) {
    const errorMessage = resolveError(error);
    dispatch(addUserError());
    Notify.notifyError(`Error adding User. ${errorMessage}`);
  }
};

export const editUser = userDetails => async (dispatch) => {
  dispatch(editUserequest());
  setHeader();
  try {
    const data = await axios
      .put(`${basePath}/users/${userDetails.id}`, userDetails);

    const [userDetail] = await Promise.all([data]);
    dispatch(editUserSuccess(userDetail.data.userDetail));
    Notify.notifySuccess('User has been updated');
  } catch (error) {
    const errorMessage = resolveError(error);
    dispatch(editUserError());
    Notify.notifyError(`Error Updating user. ${errorMessage}`);
  }
};

export const deleteUser = id => async (dispatch) => {
  dispatch(deleteUserequest());
  setHeader();
  return axios.delete(`${basePath}/users/${id}`)
    .then((response) => {
      dispatch(deleteUserSuccess(response.data));
      Notify.notifySuccess('User has been deleted');
    })
    .catch((error) => {
      const errorMessage = resolveError(error);
      dispatch(deleteUserError());
      Notify.notifyError(`Error deleting user. ${errorMessage}`);
    });
};
