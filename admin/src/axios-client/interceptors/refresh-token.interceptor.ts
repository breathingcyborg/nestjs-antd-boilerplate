import { InternalAxiosRequestConfig } from 'axios';
import { refreshToken, TokenError } from '../../auth/helper-methods';
import getStore from '../../auth/store';

const refreshTokenInterceptor = async (config : InternalAxiosRequestConfig<any>) => {
    // auth requirement not specified do nothing
    if (config.requiresAuth === undefined) {
        return config;
    }

    // auth not required
    if (config.requiresAuth === false) {
        return config;
    }
    
    // user is not logged in but auth is optional
    const user = getStore().getUser();
    const authOptional = config.requiresAuth === 'optional';
    if (!user && authOptional) {
        return config;
    }

    try {
        await refreshToken();
    } catch (e) {
        // error related to tokens presense / absense / expiration
        // return config so request fails with 401
        if (e instanceof TokenError) {
            return config;
        }

        // other error
        throw e;
    }

    return config;
}

export default refreshTokenInterceptor;