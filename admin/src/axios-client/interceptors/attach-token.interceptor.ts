import { InternalAxiosRequestConfig } from "axios";
import getStore from "../../auth/store";

const attachTokenInterceptor = (config : InternalAxiosRequestConfig<any>) => {
    // no authentication requirement specified
    if (config.requiresAuth === undefined) {
        return config;
    }

    // access token not required
    if (config.requiresAuth === false) {
        return config;
    }

    // attach access token if present
    const accessToken = getStore().getTokens()?.accessToken;
    if (!!accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
}

export default attachTokenInterceptor;