import axios from 'axios';
import { STATUS_CODE } from './api.constant';

import {baseAPIURL} from './api.config'
import  getToken  from "../helpers/getToken";
import {  withError, withData } from './api.helper';
// import toast from 'components/form/toast-message-container';

const axiosInstance = axios.create({
  baseURL:baseAPIURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  async (config) => {
    let endpoint = config.url;
     console.log("config data",config)
    const token = await getToken()
    if (token != null && !endpoint.includes('jwtToken')) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


axiosInstance.interceptors.response.use(
  (response) => {
    return withData(response.data);
  },
  async (error) => {
     const token = await getToken()
    if (error.message === STATUS_CODE.NETWORK_ERROR) {
     
      return withError(error.message);
    }

    const {
      response: {status},
    } = error;

    if (status === STATUS_CODE.UNAUTHORIZED && token) {
      return withError(error);
    }
    return withError(error.response ? error.response.data : error);
  },
);



export const get = (url, params)=> {
  return axiosInstance({
    method: 'get',
    url,
    params,
  }) 
};

export const post = (url, data) => {
  return axiosInstance({
    method: 'post',
    url,
    data,
  }) 
};

export const put = (url, data) => {
  return axiosInstance({
    method: 'put',
    url,
    data,
  })
};

export const remove = (url, params) => {
  return axiosInstance({
    method: 'delete',
    url,
    params,
  })
};