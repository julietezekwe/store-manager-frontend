/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import axios from 'axios';
import resolveError from '../helpers/resolveError';
import setHeader from '../helpers/setHeader';
import basePath from '../helpers/basePath';
import {
  SET_SALES,
  SET_SALES_REQUEST,
  SET_SALES_ERROR,

} from './types';

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
