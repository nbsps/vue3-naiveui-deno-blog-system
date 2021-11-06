// service 统一出口
import SnRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
import store from '@/store';

export const sRequest = new SnRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // token
      if (config.headers && store.state.login.token) {
        config.headers.Authorization = store.state.login.token;
      }

      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
  },
});
