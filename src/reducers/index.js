import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import saleReducer from './saleReducer';

export default combineReducers({
  login: userReducer,
  products: productReducer,
  sales: saleReducer,
});
