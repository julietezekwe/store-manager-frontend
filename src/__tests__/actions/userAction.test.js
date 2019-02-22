/* eslint-disable max-len */
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/types';
import { loginUser } from '../../actions/usersAction';

describe('Login actions', () => {
  const mockStore = configureStore([thunk]);
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
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiam9pbmVkIjoiMjAxOS0wMi0xNFQxNDowOTo1MC40NzhaIiwiaWF0IjoxNTUwODAwNzM0LCJleHAiOjE1NTExNjA3MzR9.lxSXfDQEvRPj6PYy5RPuO_5QoYVs6dV01Od4KBW-cRc',
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
      return store.dispatch(loginUser(user.user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(localStorage.getItem('user'))
            .toEqual('{"id":1,"name":"admin","username":"admin","email":"admin@gmail.com","role":"admin","joined":"2019-02-14T14:09:50.478Z","iat":1550800734,"exp":1551160734,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiam9pbmVkIjoiMjAxOS0wMi0xNFQxNDowOTo1MC40NzhaIiwiaWF0IjoxNTUwODAwNzM0LCJleHAiOjE1NTExNjA3MzR9.lxSXfDQEvRPj6PYy5RPuO_5QoYVs6dV01Od4KBW-cRc"}');
          done();
        });
    },
  );
});
