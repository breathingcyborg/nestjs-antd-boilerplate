import axios from 'axios';
import { API_BASE_URL, DEFAULT_REQUIRES_AUTH } from './constants';
import attachTokenInterceptor from './interceptors/attach-token.interceptor';
import clearAuthInterceptor from './interceptors/clear-auth.interceptor';
import refreshTokenInterceptor from './interceptors/refresh-token.interceptor';

const instance = axios.create({
    baseURL: API_BASE_URL,
    requiresAuth: DEFAULT_REQUIRES_AUTH,
});

instance.interceptors.request.use(refreshTokenInterceptor);
instance.interceptors.request.use(attachTokenInterceptor);
instance.interceptors.response.use(clearAuthInterceptor);

export default instance;