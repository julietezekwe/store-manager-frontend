/* eslint-disable max-len */
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/types';
import basePath from '../../helpers/basePath';
import * as actionCreators from '../../actions/usersAction';

const mockStore = configureStore([thunk]);
let store;

beforeEach(() => {
  moxios.install();
  store = mockStore({});
});
afterEach(() => moxios.uninstall());

describe('Login actions', () => {
  const user = {
    user: {
      email: 'admin@gmail.com',
      password: 'admin',
      role: 'admin',
    },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiam9pbmVkIjoiMjAxOS0wMi0xNFQxNDowOTo1MC40NzhaIiwiaWF0IjoxNTUwODAwNzM0LCJleHAiOjE1NTExNjA3MzR9.lxSXfDQEvRPj6PYy5RPuO_5QoYVs6dV01Od4KBW-cRc', // eslint-disable-line
  };

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'dispatches LOGIN_USER_REQUEST action, SET_USER action and LOGIN_USER_ERROR action',
    (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: user,
        });
      });
      const expectedActions = [{
        type: actionTypes.LOGIN_USER_REQUEST,
      }, {
        payload: {
          id: 1,
          email: 'admin@gmail.com',
          username: 'admin',
          role: 'admin',
          exp: 1551160734,
          iat: 1550800734,
          joined: '2019-02-14T14:09:50.478Z',
          name: 'admin',
        },
        type: actionTypes.SET_USER,
      },
      {
        error: 'There was an error',
        type: actionTypes.LOGIN_USER_ERROR,
      },

      ];
      const store = mockStore({});
      return store.dispatch(actionCreators.loginUser(user.user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(localStorage.getItem('user'))
            .toEqual('{"id":1,"name":"admin","username":"admin","email":"admin@gmail.com","role":"admin","joined":"2019-02-14T14:09:50.478Z","iat":1550800734,"exp":1551160734}');
          done();
        });
    },
  );
});

it('creates GET_USERS_REQUEST', async () => {
  const action = await store.dispatch(actionCreators.getUserRequest());
  expect(store.getActions()[0].type).toEqual(action.type);
});

it('creates SET_USERS', async (done) => {
  const users = {
    UsersModel: [
      {
        id: 3,
        name: 'ogechi ibe',
        username: 'ogechi',
        email: 'ogechi@gmail.com',
        role: 'attendant',
        joined: '2019-02-14T14:09:50.477Z',
      },
    ],
  };
  moxios.stubRequest(`${basePath}/api/v1/auth/login`, {
    status: 200,
    response: users,
  });
  const expectedActions = { type: actionTypes.SET_USERS };
  await store.dispatch(actionCreators.getUserSuccess(users));
  expect(store.getActions()[0].type).toEqual(expectedActions.type);
  expect(store.getActions()[0].payload).toEqual(users);
  done();
});

it('creates SET_USERS_ERROR', async (done) => {
  const usersError = {
    isLoading: false,
    UsersModel: [],
    message: 'Unauthorized',
  };
  moxios.stubRequest(`${basePath}/api/v1/sales`, {
    status: 401,
    response: usersError,
  });
  const expectedActions = { type: actionTypes.GET_USERS_ERROR };
  await store.dispatch(actionCreators.getUserFailure(usersError));
  expect(store.getActions()[0].type).toEqual(expectedActions.type);
  expect(store.getActions()[0].error).toEqual(usersError);
  done();
});

it('creates DELETE_USER_ERROR', async (done) => {
  const usersError = {
    message: 'Unauthorized',
  };
  moxios.stubRequest(`${basePath}/api/v1/users/3`, {
    status: 500,
    response: usersError,
  });
  const expectedActions = { type: actionTypes.DELETE_USER_ERROR };
  await store.dispatch(actionCreators.deleteUserError(usersError));
  expect(store.getActions()[0].type).toEqual(expectedActions.type);
  expect(store.getActions()[0].error).toEqual(usersError);
  done();
});
it(`dispatches ADD_USER_REQUEST and
ADD_USER_ERROR when adding user fails`, (done) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 500,
      response: 'error',
    });
  });
  const expectedActions = [
    {
      type: actionTypes.ADD_USER_REQUEST,
    },
    {
      type: actionTypes.ADD_USER_ERROR,
    },
  ];
  const store = mockStore({});
  return store.dispatch(actionCreators.addUser()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
it(`dispatches EDIT_USER_REQUEST and
  EDIT_USER_ERROR when editing products`, (done) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 500,
      response: 'ERROR',
    });
  });
  const expectedActions = [
    {
      type: actionTypes.EDIT_USER_REQUEST,
    },
    {
      type: actionTypes.EDIT_USER_ERROR,
    },
  ];
  const store = mockStore({});
  return store.dispatch(actionCreators.editUser({})).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
it(`dispatches DELETE_USER_REQUEST and
  DELETE_USER_ERROR when editing products`, (done) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 500,
      response: 'ERROR',
    });
  });
  const expectedActions = [
    {
      type: actionTypes.DELETE_USER_REQUEST,
    },
    {
      type: actionTypes.DELETE_USER_ERROR,
    },
  ];
  const store = mockStore({});
  return store.dispatch(actionCreators.deleteUser(1)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
it('creates DELETE_USER_SUCCESS', async () => {
  moxios.stubRequest(`${basePath}/users/2`, {
    status: 200,
  });
  const store = mockStore({});
  const expectedActions = { type: actionTypes.DELETE_USER };
  await store.dispatch(actionCreators.deleteUserSuccess('deleted'));
  expect(store.getActions()[0].type).toEqual(expectedActions.type);
  expect(store.getActions()[0].payload).toEqual('deleted');
});
it('creates EDIT_USER_SUCCESS', async () => {
  moxios.stubRequest(`${basePath}/users/1`, {
    status: 201,
  });
  const store = mockStore({});
  const expectedActions = { type: actionTypes.EDIT_USER };
  await store.dispatch(actionCreators.editUserSuccess('Edited'));
  expect(store.getActions()[0].type).toEqual(expectedActions.type);
  expect(store.getActions()[0].payload).toEqual('Edited');
});
