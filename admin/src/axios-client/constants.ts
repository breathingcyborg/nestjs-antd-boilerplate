import { AxiosRequestConfig } from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * 
 * set to true if most api endpoints require auth
 * set to false if most api endpoints dont require auth
 * set to "optional" if most api endpoints have optional authentication
 * 
 */
export const DEFAULT_REQUIRES_AUTH : AxiosRequestConfig['requiresAuth'] = true;