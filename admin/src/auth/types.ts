import { UserRead } from '../users/types';
import { UserRole } from '../users/enums';

export interface TokenReponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiryTs: number;
    refreshTokenExpiryTs: number;
}

export interface AuthUser extends UserRead {
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    accessTokenExpiryTs: number;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}
