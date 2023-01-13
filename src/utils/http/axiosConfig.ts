import axios from 'axios';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../config';

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.defaults.withCredentials = true;

service.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    // eslint-disable-next-line no-param-reassign
    config.headers!.authorization = `Bearer ${token}`;
    const params = config.data?.params;
    if (!params) {
      return config;
    }
    Object.keys(params).forEach((vo) => {
      if (!params[vo]) delete params[vo];
    });
    return config;
  },
  (error) => {
    return error;
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(`error--${error.response?.status}`, 'error');
    const errorMsg = error.response?.data?.message;
    if (errorMsg) toast.error(errorMsg);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(error);
  }
);

export default service;
