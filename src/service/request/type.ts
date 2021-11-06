import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface SnRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: AxiosError) => AxiosError;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: AxiosError) => AxiosError;
}

export interface SnRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SnRequestInterceptors<T>;
  showLoading?: boolean;
}
