//
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_LOGO_URL: string
  readonly VITE_API_LOGIN_URL: string
  readonly VITE_APP_TITLE: string
  readonly REFRESH_TOKEN_KEY?: string
  readonly ACCESS_TOKEN_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


/******************
 *
To fix typescript checking after using this interceptor

request.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  console.error('Request error', error)
  return Promise.reject(error)
})

******************/
import "axios";

declare module "axios" {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
