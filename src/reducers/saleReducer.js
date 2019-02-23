import {
  SET_SALES,
  SET_SALES_REQUEST,
  SET_SALES_ERROR,
  SET_PERSONAL_SALES_REQUEST,
  SET_PERSONAL_SALES_ERROR,
  SET_PERSONAL_SALES,
  GET_CART_PRODUCT_REQUEST,
  GET_CART_PRODUCT_ERROR,
  GET_CART_PRODUCT,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  sales: [],
  mySales: [],
  error: '',
  cart: '',
  salesRecord: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SALES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SALES:
      return {
        ...state,
        sales: action.payload,
        isLoading: false,
      };
    case SET_SALES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_PERSONAL_SALES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PERSONAL_SALES:
      return {
        ...state,
        mySales: action.payload,
        isLoading: false,
      };
    case SET_PERSONAL_SALES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_CART_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_PRODUCT:
      return {
        ...state,
        cart: action.payload,
        isLoading: false,
      };
    case GET_CART_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CHECKOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        salesRecord: action.payload,
        isLoading: false,
      };
    case CHECKOUT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
