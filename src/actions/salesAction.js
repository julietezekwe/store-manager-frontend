
import axios from 'axios';
import resolveError from '../helpers/resolveError';
import setHeader from '../helpers/setHeader';
import basePath from '../helpers/basePath';
import { setCart } from '../helpers/setCart';
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

} from './types';
import Notify from '../helpers/Notify';


export const setSalesRequest = () => ({
  type: SET_SALES_REQUEST,
});

export const setSales = payload => ({
  type: SET_SALES,
  payload,
});

export const setSalesError = error => ({
  type: SET_SALES_ERROR,
  error,
});

export const setPersonalSalesRequest = () => ({
  type: SET_PERSONAL_SALES_REQUEST,
});

export const setPersonalSales = payload => ({
  type: SET_PERSONAL_SALES,
  payload,
});

export const setPersonalSalesError = error => ({
  type: SET_PERSONAL_SALES_ERROR,
  error,
});

export const cartProductRequest = () => ({
  type: GET_CART_PRODUCT_REQUEST,
});

export const cartProductSuccess = payload => ({
  type: GET_CART_PRODUCT,
  payload,
});

export const cartProductError = error => ({
  type: GET_CART_PRODUCT_ERROR,
  error,
});

export const checkoutRequest = () => ({
  type: CHECKOUT_REQUEST,
});

export const checkoutSuccess = payload => ({
  type: CHECKOUT_SUCCESS,
  payload,
});

export const checkoutError = error => ({
  type: CHECKOUT_ERROR,
  error,
});

export const getAllSales = () => async (dispatch) => {
  dispatch(setSalesRequest());
  setHeader();
  let totalQuantitySold = 0;
  let totalAmount = 0;
  const productsSold = [];
  try {
    const data = axios.get(`${basePath}/sales`);
    const [sales] = await Promise.all([data]);
    let payload = sales.data;
    await payload.SalesModel.map((sale) => {
      totalQuantitySold += sale.quantity;
      totalAmount += sale.price * sale.quantity;
      if (productsSold.indexOf(sale.productid) === -1) {
        productsSold.push(sale.productid);
      }
      return true;
    });
    const totalProductsSold = productsSold.length;
    payload = {
      ...payload, totalQuantitySold, totalAmount, totalProductsSold,
    };
    dispatch(setSales(payload));
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(setSalesError(errorMessage));
  }
};

export const getPersonalSales = () => async (dispatch) => {
  dispatch(setPersonalSalesRequest());
  setHeader();
  let totalProducts = 0;
  let amount = 0;
  const totalSales = [];
  axios.get(`${basePath}/user/sales`)
    .then((response) => {
      let payload = response.data.saleDetail;
      payload.map((sale) => {
        totalProducts += sale.quantity;
        amount += sale.price * sale.quantity;
        if (totalSales.indexOf(sale.salesid) === -1) {
          totalSales.push(sale.salesid);
        }
        return true;
      });
      const records = { totalProducts, amount, totalSales: totalSales.length };
      payload = response.data;
      payload = { ...payload, records };
      dispatch(setPersonalSales(payload));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response !== undefined
      && error.response.status === 401) {
        errorMessage = 'Unauthorized';
      } else {
        errorMessage = resolveError(error);
      }
      dispatch(setPersonalSalesError(errorMessage));
    });
};

export const getAllCartProducts = cartProducts => async (dispatch) => {
  dispatch(cartProductRequest());
  setHeader();
  try {
   
    let totalPrice = 0;
    let cartProductDetails = [];
    let payload;
    let count = 1;
    await cartProducts.map(async (id) => {
      const data = await axios.get(`${basePath}/products/${id}`);
      const [cartDetails] = await Promise.all([data]);

      cartProductDetails = [
        ...cartProductDetails,
        cartDetails.data.productDetail,
      ];
      totalPrice += cartDetails.data.productDetail[0].price;
      payload = { cartProductDetails, totalPrice };
      if (count === cartProducts.length) {
        dispatch(cartProductSuccess(payload));
      } else count += 1;
    });
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(cartProductError(errorMessage));
  }
};

export const handleCheckout = id => async (dispatch) => {
  dispatch(checkoutRequest());
  setHeader();
  try {
    const { rows } = document.getElementById('checkout');
    const sales = [];
    for (let i = 1; i < rows.length - 2; i += 1) {
      const sale = {
        productId: rows[i].cells[3].innerHTML,
        productName: rows[i].cells[1].innerHTML,
        quantity: rows[i].cells[5].innerHTML,
      };
      sales.push(sale);
    }
    const data = await axios.post(`${basePath}/sales`, { sales });
    const [salesRecord] = await Promise.all([data]);
    const payload = salesRecord.data;
    dispatch(checkoutSuccess(payload));
    Notify.notifySuccess('Successfully added sale(s)');
    localStorage.removeItem(`${id}`);
    localStorage.removeItem('cartCount', 0);
    const user = { id };
    setCart(user);
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
        && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    Notify.notifyError(`Error adding product. ${errorMessage}`);
    dispatch(checkoutError(errorMessage));
  }
};
