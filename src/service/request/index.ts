import axios from 'axios';
import type { AxiosInstance } from 'axios';
import {
  LoadingBarProviderInst,
  MessageProviderInst,
  useLoadingBar,
  useMessage,
} from 'naive-ui';

import { SnRequestInterceptors, SnRequestConfig } from './type';
import { relogin } from '@/router';

const DEFAULT_SHOWLOADING = true;

export default class SnRequest {
  instance: AxiosInstance;
  interceptors?: SnRequestInterceptors;
  showLoading?: boolean;
  loading?: LoadingBarProviderInst;
  message?: MessageProviderInst;

  constructor(config: SnRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config?.interceptors;
    this.showLoading = config?.showLoading ?? DEFAULT_SHOWLOADING;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 全局
    this.instance.interceptors.request.use(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.finish();
        this.message?.info((res.data as any).message);
        return res;
      },
      (err) => {
        this.loading?.error();
        this.message?.error(err.response.data.message);
        switch (err.response.status) {
          case 401:
            relogin();
        }
        return Promise.reject(err);
      },
    );
  }

  setLoadAndMessage(): void {
    this.loading = useLoadingBar();
    this.message = useMessage();
  }

  request<T>(config: SnRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (
        config.showLoading === true ||
        (config.showLoading === undefined && this.showLoading)
      ) {
        this.loading?.start();
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>(config: SnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: SnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  put<T>(config: SnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  delete<T>(config: SnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: SnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
