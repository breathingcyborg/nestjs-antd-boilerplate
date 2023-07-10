import { AxiosRequestConfig, } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    requiresAuth?: boolean | 'optional';
  }
}