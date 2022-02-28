import * as http from '../api/http.api';

export const getCaterogies = () => {
  return http.get('/categories');
};

export const getRestaurant = () => {
  return http.get('/restaurants');
};

export const getProduct = () => {
  return http.get('/products');
};

export const getOrders = () => {
  return http.get('/orders');
};

export const getUsers = () => {
  return http.get('./users');
};
export const getAllMenu = () => {
  return http.get('./menu');
};
