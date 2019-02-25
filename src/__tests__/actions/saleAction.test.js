import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/types';
import {
  getAllSales, handleCheckout, getAllCartProducts,
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
  it(`dispatches CHECKOUT_REQUEST and
  GET_CART_PRODUCT_ERROR when fetching sales fail`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: 'Unauthorized',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.CHECKOUT_REQUEST,
      },
      {
        type: actionTypes.CHECKOUT_ERROR,
        error: 'Unauthorized',
      },
    ];
    const store = mockStore({});
    return store.dispatch(handleCheckout(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches CHECKOUT_REQUEST and
  GET_CART_PRODUCT_ERROR when fetching sales fail with 500`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: undefined,
      });
    });
    const expectedActions = [
      {
        type: actionTypes.CHECKOUT_REQUEST,
      },
      {
        type: actionTypes.CHECKOUT_ERROR,
        error: undefined,
      },
    ];
    const store = mockStore({});
    return store.dispatch(handleCheckout(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches CHECKOUT_REQUEST and
  CHECKOUT_SUCCESS when fetching sales fail`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: 'Successfully added sale(s)',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.CHECKOUT_REQUEST,
      },
      {
        type: actionTypes.CHECKOUT_SUCCESS,
        payload: 'Successfully added sale(s)',
      },
    ];
    const store = mockStore({});
    return store.dispatch(handleCheckout(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches GET_CART_PRODUCT_REQUEST and
  GET_CART_PRODUCT_ERROR when fetching cartsales fail`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'There was an error',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.GET_CART_PRODUCT_REQUEST,
      },
      {
        error: 'There was an error',
        type: actionTypes.GET_CART_PRODUCT_ERROR,
      },
    ];

    const store = mockStore({});
    return store.dispatch(getAllCartProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches GET_CART_PRODUCT_REQUEST
   when fetching cartsales fail`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    const expectedActions = [
      {
        type: actionTypes.GET_CART_PRODUCT_REQUEST,
      },
    ];
    const cartProducts = [2, 3, 10];

    const store = mockStore({});
    return store.dispatch(getAllCartProducts(cartProducts)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
