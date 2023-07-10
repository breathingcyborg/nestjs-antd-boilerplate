import authApi from "./api"
import { LoginRequest } from "./types";
import getStore from "./store";

export class TokenError extends Error {}

export const login = async (request : LoginRequest) => {
    const response = await authApi.login(request);
    const store = getStore()
    await store.setTokens(response);
    await refetchUser()
}

export const refetchUser = async () => {
    const user = await authApi.me();
    const store = getStore();
    await store.setUser(user);
}

export const logout = async () => {
    const store = getStore();
    await store.setTokens(null);
    await store.setUser(null);
}

export const clearAuthState = async () => {
    const store = getStore();
    await store.setTokens(null);
    await store.setUser(null);
}

export const refreshToken = async () => {
    const store = getStore();
    let tokens = store.getTokens();
    if (!tokens || !tokens.refreshToken || !tokens.accessTokenExpiryTs || !tokens.refreshTokenExpiryTs) {
        throw new TokenError("access or refresh token missing");
    }

    const now = new Date();

    // access token is still valid
    const accessTokenExpiryDate = new Date(tokens.accessTokenExpiryTs * 1000);
    const accessTokenExpired = accessTokenExpiryDate.getTime() <= now.getTime();
    if (!accessTokenExpired) {
        return;
    }

        
    // refresh token has expired
    const refreshTokenExpiryDate = new Date(tokens.refreshTokenExpiryTs * 1000);
    const refreshTokenExpired = refreshTokenExpiryDate.getTime() <= now.getTime();
    if (refreshTokenExpired) {
        throw new TokenError("refresh token expired");
    }

    // get new access token and save it
    const refreshToken = tokens.refreshToken;
    const response = await authApi.refreshToken({ refreshToken });
    tokens = store.getTokens();
    await store.setTokens({
        refreshToken: tokens?.refreshToken || '',
        refreshTokenExpiryTs: tokens?.refreshTokenExpiryTs || 0,
        accessToken: response.accessToken,
        accessTokenExpiryTs: response.accessTokenExpiryTs
    });
}