export interface JwtPayload {
    id: string
    tokenType: 'refresh' | 'access'
}

export const isAccessTokenPayload = (payload: JwtPayload) => {
    return payload && payload.tokenType && payload.tokenType === 'access';
}

export const isRefreshTokenPayload = (payload: JwtPayload) => {
    return payload && payload.tokenType && payload.tokenType === 'refresh';
}