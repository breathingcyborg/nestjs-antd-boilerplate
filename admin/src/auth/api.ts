import axios from '../axios-client/instance';
import refreshAxios from '../axios-client/refresh-instance';
import { LoginRequest, TokenReponse, AuthUser, RefreshTokenRequest, RefreshTokenResponse } from './types';

const authApi = {
    async login(request : LoginRequest) {
        const { data } = await axios.post<TokenReponse>(
            '/auth/login', 
            request, 
            { requiresAuth: false }
        );
        return data;
    },

    async me() {
        const { data } = await axios.get<AuthUser>(
            '/auth/me', 
            { requiresAuth: true }
        );
        return data;
    },

    async refreshToken(request : RefreshTokenRequest) {
        const { data } = await refreshAxios.post<RefreshTokenResponse>(
            '/auth/refresh-token', 
            request, 
            { requiresAuth: false }
        );
        return data;
    },
}

export default authApi;