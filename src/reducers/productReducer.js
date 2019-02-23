import {
  SET_PRODUCTS,
  SET_A_PRODUCT,
  SET_PRODUCTS_REQUEST,
  SET_PRODUCTS_ERROR,
  ADD_PRODUCTS,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_ERROR,
  EDIT_PRODUCTS,
  EDIT_PRODUCTS_REQUEST,
  EDIT_PRODUCTS_ERROR,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: true,
  isAdding: false,
  products: [],
  product: {},
  productDetail: {},
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case SET_A_PRODUCT:
      return {
        ...state,
        productDetail: action.payload,
        isLoading: false,
      };
    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case ADD_PRODUCTS_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        isAdding: false,
      };
    case ADD_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        isAdding: false,
      };
    case EDIT_PRODUCTS_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case EDIT_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        isAdding: false,
      };
    case EDIT_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        isAdding: false,
      };
    case DELETE_PRODUCTS_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        isAdding: false,
      };
    case DELETE_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        isAdding: false,
      };
    default:
      return state;
  }
};
