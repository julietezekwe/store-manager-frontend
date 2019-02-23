/* eslint-disable no-undef */

import axios from 'axios';
import dotenv from 'dotenv';
import resolveError from '../helpers/resolveError';
import setHeader from '../helpers/setHeader';
import Notify from '../helpers/Notify';
import basePath from '../helpers/basePath';
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
} from './types';

dotenv.config();

export const setProductRequest = () => ({
  type: SET_PRODUCTS_REQUEST,
});

export const setProduct = payload => ({
  type: SET_PRODUCTS,
  payload,
});

export const setAProduct = payload => ({
  type: SET_A_PRODUCT,
  payload,
});
export const setProductError = error => ({
  type: SET_PRODUCTS_ERROR,
  error,
});

export const addProductequest = () => ({
  type: ADD_PRODUCTS_REQUEST,
});

export const addProductSuccess = payload => ({
  type: ADD_PRODUCTS,
  payload,
});

export const addProductError = error => ({
  type: ADD_PRODUCTS_ERROR,
  error,
});

export const editProductequest = () => ({
  type: EDIT_PRODUCTS_REQUEST,
});

export const editProductSuccess = payload => ({
  type: EDIT_PRODUCTS,
  payload,
});

export const editProductError = error => ({
  type: EDIT_PRODUCTS_ERROR,
  error,
});


export const deleteProductequest = () => ({
  type: DELETE_PRODUCTS_REQUEST,
});

export const deleteProductSuccess = payload => ({
  type: DELETE_PRODUCTS,
  payload,
});

export const deleteProductError = error => ({
  type: DELETE_PRODUCTS_ERROR,
  error,
});

export const getAllProducts = () => async (dispatch) => {
  dispatch(setProductRequest());
  setHeader();
  try {
    const data = axios.get(`${basePath}/All/products`);
    const [products] = await Promise.all([data]);
    const payload = products.data;
    dispatch(setProduct(payload.ProductsModel));
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(setProductError(errorMessage));
  }
};

export const addProduct = productDetails => async (dispatch) => {
  dispatch(addProductequest());
  setHeader();
  try {
    // eslint-disable-next-line no-undef
    const form = new FormData();
    form.append('upload_preset', 'julietPreset');
    form.append('file', productDetails.image);
    const upload = await axios
      .post('https://api.cloudinary.com/v1_1/julietezekwe/image/upload', form);
    const [uploadedImage] = await Promise.all([upload]);
    productDetails.image = uploadedImage.data.secure_url;
    const data = await axios.post(`${basePath}/products`, productDetails);
    const [productDetail] = await Promise.all([data]);
    dispatch(addProductSuccess(productDetail.data.productDetail));
    Notify.notifySuccess('Product has been added');
  } catch (error) {
    const errorMessage = resolveError(error);
    dispatch(addProductError());
    Notify.notifyError(`Error adding product. ${errorMessage}`);
  }
};


export const editProduct = productDetails => async (dispatch) => {
  dispatch(editProductequest());
  setHeader();
  try {
    const form = new FormData();
    form.append('upload_preset', 'julietPreset');
    form.append('file', productDetails.image);
    const upload = await axios
      .post('https://api.cloudinary.com/v1_1/julietezekwe/image/upload', form);
    const [uploadedImage] = await Promise.all([upload]);
    productDetails.image = uploadedImage.data.secure_url;
    const data = await axios
      .put(`${basePath}/products/${productDetails.id}`, productDetails);

    const [productDetail] = await Promise.all([data]);
    dispatch(editProductSuccess(productDetail.data.productDetail));
    Notify.notifySuccess('Product has been updated');
  } catch (error) {
    const errorMessage = resolveError(error);
    dispatch(editProductError());
    Notify.notifyError(`Error Updating product. ${errorMessage}`);
  }
};

export const deleteProduct = id => async (dispatch) => {
  dispatch(deleteProductequest());
  setHeader();
  return axios.delete(`${basePath}/products/${id}`)
    .then((response) => {
      dispatch(deleteProductSuccess(response.data));
      Notify.notifySuccess('Product has been deleted');
    })
    .catch((error) => {
      const errorMessage = resolveError(error);
      dispatch(deleteProductError());
      Notify.notifyError(`Error deleting product. ${errorMessage}`);
    });
};

export const getAproduct = id => async (dispatch) => {
  dispatch(setProductRequest());
  setHeader();
  try {
    const data = axios.get(`${basePath}/products/${id}`);
    const [product] = await Promise.all([data]);
    const payload = product.data.productDetail;
    dispatch(setAProduct(payload));
  } catch (error) {
    let errorMessage;
    if (error.response !== undefined
      && error.response.status === 401) {
      errorMessage = 'Unauthorized';
    } else {
      errorMessage = resolveError(error);
    }
    dispatch(setProductError(errorMessage));
  }
};
