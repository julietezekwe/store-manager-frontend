import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/types';
import basePath from '../../helpers/basePath';
import {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getAproduct,
  deleteProductSuccess,
  editProductSuccess,
} from '../../actions/productsAction';

describe('Products actions', () => {
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`dispatches SET_PRODUCTS_REQUEST and
  SET_PRODUCTS when fetching products`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'ok',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.SET_PRODUCTS,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAllProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches SET_PRODUCTS_REQUEST and
  SET_PRODUCTS_ERROR when fetching products`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'error',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.SET_PRODUCTS_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAllProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches SET_PRODUCTS_REQUEST and
  SET_A_PRODUCT when fetching A product`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'ok',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.SET_A_PRODUCT,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAproduct()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches SET_PRODUCTS_REQUEST and
  SET_PRODUCTS_ERROR when fetching A product`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'error',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.SET_PRODUCTS_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAproduct()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches ADD_PRODUCTS_REQUEST and
  ADD_PRODUCTS_ERROR when adding products fails`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'error',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.ADD_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.ADD_PRODUCTS_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(addProduct()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches EDIT_PRODUCTS_REQUEST and
  EDIT_PRODUCTS_ERROR when editing products`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'ERROR',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.EDIT_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.EDIT_PRODUCTS_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(editProduct({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it(`dispatches DELETE_PRODUCTS_REQUEST and
  DELETE_PRODUCTS_ERROR when editing products`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: 'ERROR',
      });
    });
    const expectedActions = [
      {
        type: actionTypes.DELETE_PRODUCTS_REQUEST,
      },
      {
        type: actionTypes.DELETE_PRODUCTS_ERROR,
      },
    ];
    const store = mockStore({});
    return store.dispatch(deleteProduct(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('creates DELETE_PRODUCT', async () => {
    moxios.stubRequest(`${basePath}/products/2`, {
      status: 200,
    });
    const store = mockStore({});
    const expectedActions = { type: actionTypes.DELETE_PRODUCTS };
    await store.dispatch(deleteProductSuccess('deleted'));
    expect(store.getActions()[0].type).toEqual(expectedActions.type);
    expect(store.getActions()[0].payload).toEqual('deleted');
  });
  it('creates EDIT_PRODUCT', async () => {
    moxios.stubRequest(`${basePath}/products/1`, {
      status: 201,
    });
    const store = mockStore({});
    const expectedActions = { type: actionTypes.EDIT_PRODUCTS };
    await store.dispatch(editProductSuccess('Edited'));
    expect(store.getActions()[0].type).toEqual(expectedActions.type);
    expect(store.getActions()[0].payload).toEqual('Edited');
  });
});
