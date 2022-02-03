import { combineReducers } from 'redux';
import { vendor } from './vendors';
import { orders } from './orders';
import { cart } from './cart/reducers';
import { authReducer } from './auth';
import { checkout } from './checkout/redux';
export default combineReducers({
  auth: authReducer,
  vendor,
  cart,
  orders,
  checkout,
});
