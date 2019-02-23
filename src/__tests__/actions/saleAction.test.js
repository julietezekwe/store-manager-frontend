import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/types';
import {
  getAllSales,
} from '../../actions/salesAction';

describe('Products actions', () => {
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`dispatches SET_SALES_REQUEST and
  SET_SALES_ERROR when fetching sales fail`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'error',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_SALES_REQUEST,
      },
      {
        type: actionTypes.SET_SALES_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAllSales()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
